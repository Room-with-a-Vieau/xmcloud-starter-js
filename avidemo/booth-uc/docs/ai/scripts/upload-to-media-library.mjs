#!/usr/bin/env node
/**
 * Upload demo images to the Sitecore Media Library via the XM Cloud Authoring GraphQL API.
 *
 * Media Library images (<image mediaid="…" />) render everywhere — preview, the live site and
 * the Pages editor. Content Hub DAM references only render in Pages when the CM's DAM connector
 * is configured for that exact Content Hub instance, so prefer this script for demos.
 *
 * Reads <images-dir>/image-manifest.json (from content-extractor.mjs) and writes back, per image:
 *   mediaItemId, mediaItemPath, imageFieldXml (<image mediaid="{…}" alt="…" />), uploadStatus
 *
 * Auth: client-credentials JWT from SITECORE_AUTOMATION_CLIENT_ID / SITECORE_AUTOMATION_CLIENT_SECRET.
 *
 * Usage (from the app root):
 *   node docs/ai/scripts/upload-to-media-library.mjs \
 *     --images-dir docs/ai/demos/<client>/images \
 *     --cm-host https://xmc-xxxx.sitecorecloud.io \
 *     --media-folder "Project/<Collection>/<Site>"   # relative to /sitecore/media library
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, basename, extname } from 'node:path';

const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : fallback;
};

const imagesDir = arg('images-dir');
const cmHost = (arg('cm-host') || process.env.SITECORE_CM_HOST || '').replace(/\/$/, '');
const mediaFolder = (arg('media-folder') || '').replace(/^\/+|\/+$/g, '');
const clientId = process.env.SITECORE_AUTOMATION_CLIENT_ID;
const clientSecret = process.env.SITECORE_AUTOMATION_CLIENT_SECRET;

if (!imagesDir || !cmHost || !mediaFolder) {
  console.error('ERROR: --images-dir, --cm-host (or SITECORE_CM_HOST) and --media-folder are required');
  process.exit(1);
}
if (!clientId || !clientSecret) {
  console.error('ERROR: export SITECORE_AUTOMATION_CLIENT_ID and SITECORE_AUTOMATION_CLIENT_SECRET');
  process.exit(1);
}

const tokenRes = await fetch('https://auth.sitecorecloud.io/oauth/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'client_credentials',
    audience: 'https://api.sitecorecloud.io',
  }),
});
if (!tokenRes.ok) {
  console.error(`ERROR: token request failed: HTTP ${tokenRes.status}`);
  process.exit(1);
}
const { access_token: token } = await tokenRes.json();

const manifestPath = join(imagesDir, 'image-manifest.json');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
const escapeAttr = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;');

const MIME = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', gif: 'image/gif', webp: 'image/webp', svg: 'image/svg+xml' };

const authoring = async (query, variables) => {
  const res = await fetch(`${cmHost}/sitecore/api/authoring/graphql/v1`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  return res.json();
};

const record = (entry, rawId, itemPath, status) => {
  const id = `{${rawId.toUpperCase()}}`;
  Object.assign(entry, {
    mediaItemId: id,
    mediaItemPath: itemPath,
    imageFieldXml: `<image mediaid="${id}" alt="${escapeAttr(entry.alt)}" />`,
    uploadStatus: status,
  });
  console.log(`  OK  ${entry.localFile} → ${itemPath} ${id} (${status})`);
};

let ok = 0;
for (const entry of manifest) {
  const itemName = basename(entry.localFile, extname(entry.localFile));
  const itemPath = `${mediaFolder}/${itemName}`;
  try {
    // Media items cannot be overwritten (upload fails with "already defined") — reuse an existing one.
    const existing = await authoring(
      'query($p: String!) { item(where: { path: $p }) { itemId path } }',
      { p: `/sitecore/media library/${itemPath}` }
    );
    if (existing?.data?.item?.itemId) {
      const raw = existing.data.item.itemId.replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5');
      record(entry, raw, existing.data.item.path, 'existing-media-library');
      ok++;
      continue;
    }

    const gql = await fetch(`${cmHost}/sitecore/api/authoring/graphql/v1`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: 'mutation($p: String!) { uploadMedia(input: { itemPath: $p }) { presignedUploadUrl } }',
        variables: { p: itemPath },
      }),
    });
    const gqlJson = await gql.json();
    const uploadUrl = gqlJson?.data?.uploadMedia?.presignedUploadUrl;
    if (!uploadUrl) throw new Error(JSON.stringify(gqlJson.errors ?? gqlJson).slice(0, 300));

    const form = new FormData();
    const type = MIME[extname(entry.localFile).slice(1).toLowerCase()] ?? 'application/octet-stream';
    form.append('', new Blob([readFileSync(join(imagesDir, entry.localFile))], { type }), entry.localFile);
    const up = await fetch(uploadUrl, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: form });
    if (!up.ok) throw new Error(`upload HTTP ${up.status}`);
    const { Id, ItemPath } = await up.json();

    record(entry, Id, ItemPath, 'uploaded-media-library');
    ok++;
  } catch (e) {
    Object.assign(entry, { uploadStatus: 'failed', uploadError: String(e.message ?? e) });
    console.error(`  FAIL ${entry.localFile}: ${entry.uploadError}`);
  }
}

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`Uploaded ${ok}/${manifest.length} → ${manifestPath}`);
process.exit(ok === manifest.length ? 0 : 1);
