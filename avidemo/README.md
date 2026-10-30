# avidemo

Custom Sitecore XM Cloud head applications built in this fork for demos and client work. Each subfolder is a standalone, independently runnable Next.js app — see [CLAUDE.md](../CLAUDE.md) for the full set of conventions this repo follows.

## Adding a new demo

1. **Name the folder** with a short, lowercase, kebab-case slug for the client or demo (e.g. `prospera`, `acme-retail`). Avoid generic names like `demo` or `test` since this folder will hold many demos over time.
2. **Scaffold or copy** the app into `avidemo/<slug>/`. Treat `/examples` as read-only reference — copy patterns and shared utilities in rather than importing across folders (no monorepo linking; see CLAUDE.md's "File Organization" guidance).
3. **Set up environment files** following the same pattern as `/examples`: copy `.env.remote.example` to `.env.local` and fill in `SITECORE_EDGE_CONTEXT_ID`, `NEXT_PUBLIC_DEFAULT_SITE_NAME`, `NEXT_PUBLIC_SITECORE_EDGE_CONTEXT_ID`, and `SITECORE_EDITING_SECRET`. Never commit `.env.local` or any file containing real secrets.
4. **Wire it into deployment when it's ready** by adding a `renderingHosts` entry for it in [xmcloud.build.json](../xmcloud.build.json), following the pattern of the existing entries. 
5. **Regenerate the component map** after adding or renaming sidecar props files: `npm run sitecore-tools:generate-map` from within the demo's folder.

## Choosing which sites deploy

By default a deploy installs only Prospera, the template site. Every other site's items stay in `authoring/items/` (so `ser pull` and `ser validate` still cover them) but are left out of the deploy. To turn a site on, make both edits in [xmcloud.build.json](../xmcloud.build.json), commit, redeploy, then publish the site to Edge:

| Site | Editing host — set `"enabled": true` | Add to `deployItems.modules` |
| --- | --- | --- |
| guidestone | `guidestone` | `"guidestone"` |
| Logix Federal Credit Union | `logix` | `"logix"` |
| Cooley (Legal collection) | `cooley` | `"cooley"` |
| Brooks Running (Fitness collection) | `brooks-running` | `"brooks-running"` |
| Healthcare / Nova Medical (industry-verticals collection) | `healthcare` | `"Project.IndustryVerticals"`, plus `"Project.Healthcare-Content"` and `"Project.Healthcare-Media"` under `postActions.actions.scsModules` |
| Example kits (Solterra, Alaris, SYNC, Skate Park, basic) | `nextjsstarter`, `kit-nextjs-article-starter`, `kit-nextjs-location-starter`, `kit-nextjs-product-starter`, `basic-nextjs` | `"Project.click-click-launch"` |

The example-kit module holds only the kits' templates, renderings, settings, media and Click Click Launch scripts — none of their site content is serialized, so turning it on doesn't create those sites by itself.

Always keep `system`, `nextjs-starter` and `prosperabank` in `deployItems.modules`; every other site depends on `prosperabank`. Items deployed this way are items as resources (IAR): authors can edit them, but deleting one doesn't stick — remove its `.yml` from the repo and redeploy instead. If you push a site's module with `dotnet sitecore ser push` instead, don't also list it in `deployItems`.

## Before sharing a demo with a client

- Remove or genericize any references to other clients (comments, sample content, commit history in copied files, screenshots).
- Check `.env.local` and any `*.deploysecret.config` files are not committed and don't contain another client's or environment's secrets.
- Review analytics/tracking IDs, API keys, and third-party integrations are pointed at the right environment.
- Confirm the demo runs cleanly from a fresh `npm install && npm run dev` in its own folder — it should not depend on anything outside `avidemo/<slug>/`.
