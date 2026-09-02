# avidemo

Custom Sitecore XM Cloud head applications built in this fork for demos and client work. Each subfolder is a standalone, independently runnable Next.js app — see [CLAUDE.md](../CLAUDE.md) for the full set of conventions this repo follows.

## Adding a new demo

1. **Name the folder** with a short, lowercase, kebab-case slug for the client or demo (e.g. `gsf`, `acme-retail`). Avoid generic names like `demo` or `test` since this folder will hold many demos over time.
2. **Scaffold or copy** the app into `avidemo/<slug>/`. Treat `/examples` as read-only reference — copy patterns and shared utilities in rather than importing across folders (no monorepo linking; see CLAUDE.md's "File Organization" guidance).
3. **Set up environment files** following the same pattern as `/examples`: copy `.env.remote.example` to `.env.local` and fill in `SITECORE_EDGE_CONTEXT_ID`, `NEXT_PUBLIC_DEFAULT_SITE_NAME`, `NEXT_PUBLIC_SITECORE_EDGE_CONTEXT_ID`, and `SITECORE_EDITING_SECRET`. Never commit `.env.local` or any file containing real secrets.
4. **Wire it into deployment when it's ready** by adding a `renderingHosts` entry for it in [xmcloud.build.json](../xmcloud.build.json), following the pattern of the existing entries. Leave `enabled: false` until the demo is actually deploy-ready.
5. **Regenerate the component map** after adding or renaming sidecar props files: `npm run sitecore-tools:generate-map` from within the demo's folder.

## Before sharing a demo with a client

- Remove or genericize any references to other clients (comments, sample content, commit history in copied files, screenshots).
- Check `.env.local` and any `*.deploysecret.config` files are not committed and don't contain another client's or environment's secrets.
- Review analytics/tracking IDs, API keys, and third-party integrations are pointed at the right environment.
- Confirm the demo runs cleanly from a fresh `npm install && npm run dev` in its own folder — it should not depend on anything outside `avidemo/<slug>/`.
