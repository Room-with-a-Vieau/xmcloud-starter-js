#!/usr/bin/env node
/**
 * Generate docs/ai/manifests/sitecore-manifest.yaml from the serialized Sitecore
 * items (Sitecore CLI YAML) so the manifest always matches the component library
 * this app actually ships.
 *
 * Template / rendering IDs come from serialization (shared, stable across site copies).
 * Site-dependent locations are stored as paths only — a copied site (Sites API copy)
 * gets new item IDs, so those are resolved at run time against the live site.
 *
 * Usage (from the app root, e.g. avidemo/prospera):
 *   node docs/ai/scripts/generate-manifest.mjs \
 *     [--authoring ../../authoring/items/prosperabank] \
 *     [--project docs/ai/config/project.yaml] \
 *     [--out docs/ai/manifests/sitecore-manifest.yaml]
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, basename } from 'node:path';
import yaml from 'js-yaml';

const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : fallback;
};

const AUTHORING = arg('authoring', '../../authoring/items/prosperabank');
const PROJECT = arg('project', 'docs/ai/config/project.yaml');
const OUT = arg('out', 'docs/ai/manifests/sitecore-manifest.yaml');
const COMPONENTS_DIR = 'src/components';

const TEMPLATE_FIELD = '455a3e98-a627-4b40-8035-e683a0331ac7';
const TEMPLATE_SECTION = 'e269fbb5-3750-427a-9149-7aa950b49301';

const project = yaml.load(readFileSync(PROJECT, 'utf-8'));
const { serializedSiteRoot, renderingsRoot, projectTemplatesRoot } = project;
if (!serializedSiteRoot || !renderingsRoot || !projectTemplatesRoot) {
  console.error('ERROR: project.yaml needs serializedSiteRoot, renderingsRoot and projectTemplatesRoot');
  process.exit(1);
}

const walk = (dir, out = []) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (name.endsWith('.yml')) out.push(p);
  }
  return out;
};

// Index every serialized item by lower-cased path and by ID.
const byPath = new Map();
const byId = new Map();
for (const file of walk(AUTHORING)) {
  let doc;
  try {
    doc = yaml.load(readFileSync(file, 'utf-8').replace(/^﻿/, ''));
  } catch {
    continue;
  }
  if (!doc?.ID || !doc?.Path) continue;
  const item = { id: doc.ID.toLowerCase(), path: doc.Path, template: doc.Template?.toLowerCase(), doc };
  byPath.set(doc.Path.toLowerCase(), item);
  byId.set(item.id, item);
}

const shared = (item, hint) => item?.doc.SharedFields?.find((f) => f.Hint === hint)?.Value ?? '';
const guid = (id) => `{${id.replace(/[{}]/g, '').toUpperCase()}}`;
const childrenOf = (path) => {
  const prefix = path.toLowerCase() + '/';
  return [...byPath.values()].filter(
    (i) => i.path.toLowerCase().startsWith(prefix) && !i.path.slice(prefix.length).includes('/')
  );
};
const resolveRef = (value) => {
  const v = String(value || '').trim();
  if (!v) return undefined;
  if (v.startsWith('/')) return byPath.get(v.toLowerCase());
  return byId.get(v.replace(/[{}]/g, '').toLowerCase());
};

const templateFields = (tpl) =>
  childrenOf(tpl.path)
    .filter((s) => s.template === TEMPLATE_SECTION)
    .flatMap((section) =>
      childrenOf(section.path)
        .filter((f) => f.template === TEMPLATE_FIELD)
        .map((f) => ({
          name: basename(f.path),
          type: shared(f, 'Type') || 'Single-Line Text',
          section: basename(section.path),
          sort: Number(shared(f, '__Sortorder') || 0),
        }))
    )
    .sort((a, b) => a.sort - b.sort)
    .map(({ name, type, section }) => ({ name, type, section }));

const describeTemplate = (tpl) =>
  tpl && { name: basename(tpl.path), path: tpl.path, itemId: guid(tpl.id), fields: templateFields(tpl) };

// React files: map componentName → file + named exports (variants).
const reactIndex = new Map();
const walkTsx = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walkTsx(p);
    else if (/\.tsx$/.test(name) && !/\.(props|dev)\.tsx$/.test(name)) {
      const key = name.replace(/\.tsx$/, '').toLowerCase();
      if (!reactIndex.has(key)) reactIndex.set(key, p);
    }
  }
};
walkTsx(COMPONENTS_DIR);
const reactFor = (componentName) => {
  const file = reactIndex.get(componentName.toLowerCase());
  if (!file) return { filePath: '', variants: [] };
  const src = readFileSync(file, 'utf-8');
  const variants = [...src.matchAll(/^export\s+(?:const|function)\s+([A-Z]\w*)/gm)].map((m) => m[1]);
  return { filePath: relative('.', file), variants: [...new Set(variants)] };
};

const variantsRoot = `${serializedSiteRoot}/Presentation/Headless Variants`;
const headlessVariantsFor = (names) => {
  for (const n of names) {
    const container = byPath.get(`${variantsRoot}/${n}`.toLowerCase());
    if (container) {
      return {
        containerName: basename(container.path),
        variants: childrenOf(container.path).map((v) => basename(v.path)),
      };
    }
  }
  return { containerName: '', variants: [] };
};

const renderingItems = [...byPath.values()].filter(
  (i) => i.path.toLowerCase().startsWith(renderingsRoot.toLowerCase() + '/') && shared(i, 'componentName')
);

const components = renderingItems
  .map((r) => {
    const componentName = shared(r, 'componentName');
    const category = r.path.slice(renderingsRoot.length + 1).split('/')[0];
    const dsTemplateRef = shared(r, 'Datasource Template');
    const dsLocation = shared(r, 'Datasource Location');
    // Branch templates (/sitecore/templates/Branches/...) are not serialized here; fall back to
    // the component template named in the Datasource Location query (@@templatename='X').
    const locationTemplateName = /@@templatename='([^']+)'/.exec(dsLocation)?.[1];
    const dsTemplate =
      resolveRef(dsTemplateRef) ??
      (locationTemplateName &&
        byPath.get(`${projectTemplatesRoot}/Components/${locationTemplateName}`.toLowerCase()));
    const datasourceBranch = /\/Branches\//i.test(dsTemplateRef) ? dsTemplateRef : '';
    const sv = dsTemplate && resolveRef(shared(dsTemplate, '__Standard values'));
    const masters = String(shared(sv, '__Masters') || '')
      .split('|')
      .map(resolveRef)
      .filter(Boolean);
    const childTemplate = masters.find((m) => m.path.toLowerCase().startsWith(projectTemplatesRoot.toLowerCase()));
    const kind = !dsTemplate ? 'context-only' : childTemplate ? 'list' : 'simple';
    const react = reactFor(componentName);
    const otherProps = shared(r, 'OtherProperties');

    return {
      name: componentName,
      displayName: basename(r.path),
      kind,
      category,
      status: react.filePath ? 'complete' : 'missing-react',
      react: { filePath: react.filePath, componentMapKey: componentName, variants: react.variants },
      templates: {
        datasource: describeTemplate(dsTemplate) ?? null,
        child: describeTemplate(childTemplate) ?? null,
      },
      rendering: {
        name: basename(r.path),
        path: r.path,
        itemId: guid(r.id),
        componentName,
        datasourceTemplatePath: dsTemplate?.path ?? '',
        datasourceBranch,
        datasourceLocationQuery: dsLocation,
        parametersTemplateId: shared(r, 'Parameters Template'),
        autoDatasource: /IsAutoDatasourceRendering=true/i.test(otherProps),
      },
      datasourceFolder: {
        mode: 'page-data',
        relativePath: 'Home/Data',
        note: 'Create client datasources under the target page Data folder (resolve its ID at run time).',
      },
      headlessVariants: headlessVariantsFor([basename(r.path), componentName]),
    };
  })
  .sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));

const manifest = {
  generatedBy: 'docs/ai/scripts/generate-manifest.mjs',
  generatedAt: new Date().toISOString(),
  source: { authoring: AUTHORING, serializedSiteRoot },
  project: {
    sdk: project.sdk,
    renderingsRoot,
    projectTemplatesRoot,
    siteRelative: {
      homePage: 'Home',
      pageDataFolder: 'Home/Data',
      headlessVariants: 'Presentation/Headless Variants',
      availableRenderings: 'Presentation/Available Renderings',
    },
    note: 'Site-relative paths are joined to /sitecore/content/<siteCollection>/<siteName> from project.yaml.',
  },
  components,
};

writeFileSync(
  OUT,
  `# GENERATED — do not hand-edit. Re-run: node docs/ai/scripts/generate-manifest.mjs\n` +
    yaml.dump(manifest, { lineWidth: 200, noRefs: true })
);

// Registry for the Site Analyzer: manifest facts + hand-maintained matching hints.
const KEYWORDS = arg('keywords', 'docs/ai/catalog/component-keywords.yaml');
const REGISTRY = arg('registry', 'docs/ai/catalog/component-registry.yaml');
const keywords = existsSync(KEYWORDS) ? yaml.load(readFileSync(KEYWORDS, 'utf-8')) ?? {} : {};
const fieldSummary = (tpl) => (tpl?.fields ?? []).map(({ name, type }) => ({ name, type }));
const registry = components
  .filter((c) => keywords[c.name]?.placeable !== false)
  .map((c) => ({
    id: c.name,
    name: c.displayName,
    manifestName: c.name,
    kind: c.kind,
    role: keywords[c.name]?.role ?? 'section',
    category: c.category,
    variants: c.react.variants,
    visualKeywords: keywords[c.name]?.visualKeywords ?? [],
    variantSelectionHints: keywords[c.name]?.variantSelectionHints ?? {},
    parentFields: fieldSummary(c.templates.datasource),
    childFields: fieldSummary(c.templates.child),
  }));
const missingHints = registry.filter((r) => !r.visualKeywords.length).map((r) => r.id);
writeFileSync(
  REGISTRY,
  `# GENERATED — edit component-keywords.yaml, then re-run: node docs/ai/scripts/generate-manifest.mjs\n` +
    `# Used by the Site Analyzer (Phase 2) to match page sections to components.\n` +
    yaml.dump({ components: registry }, { lineWidth: 200, noRefs: true })
);
console.log(`[registry] ${registry.length} matchable components → ${REGISTRY}`);
if (missingHints.length) console.warn(`WARN: no visualKeywords for: ${missingHints.join(', ')}`);

const counts = components.reduce((acc, c) => ((acc[c.kind] = (acc[c.kind] || 0) + 1), acc), {});
console.log(`[manifest] ${components.length} components → ${OUT}`, counts);
for (const c of components) {
  console.log(
    `  ${c.category.padEnd(13)} ${c.name.padEnd(22)} ${c.kind.padEnd(12)} react=${c.react.filePath ? 'ok' : 'MISSING'} variants=${c.react.variants.join(',')}${c.templates.child ? ` child=${c.templates.child.name}` : ''}`
  );
}
if (!existsSync(COMPONENTS_DIR)) console.warn('WARN: run from the app root so React files resolve');
