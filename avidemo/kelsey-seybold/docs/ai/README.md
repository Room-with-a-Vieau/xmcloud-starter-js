# docs/ai — demo builder kit (Prospera)

Entry point: `skills/sitecore-build-demo.md` (usually started by the repo-root
`skinned-demo-setup` skill against a copy of this app).

## Generated files — do not hand-edit

| File | Source |
|---|---|
| `manifests/sitecore-manifest.yaml` | `authoring/items/prosperabank` serialization + `src/components/**` |
| `catalog/component-registry.yaml` | the manifest + `catalog/component-keywords.yaml` |

Regenerate after adding, renaming or re-serializing components (run from the app root):

```bash
node docs/ai/scripts/generate-manifest.mjs
```

Edit matching hints for the Site Analyzer in `catalog/component-keywords.yaml`.

## Configuration

`config/project.yaml` holds the target site (`siteCollection` / `siteName`) and the shared
library roots. skinned-demo-setup rewrites the site values in each customer copy.

## Legacy files

`*.fmc-legacy.yaml` are the manifest/registry this kit originally shipped with, for a
different component library (`fmc-custom-demo`, `src/components/uiim/`). They are kept for
reference only. The component-authoring skills (`sitecore-create-*-component`,
`sitecore-create-demo-variants`, `sitecore-validate-manifest`) and `rules/03-react-uiim-shadcn.md`
still describe that library; the core demo path (build-demo Phases 0–4 and 6–7) does not
depend on them.
