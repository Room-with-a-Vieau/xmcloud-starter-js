# Healthcare (Nova Medical)

## Overview

A patient-focused healthcare demo site, **Nova Medical**, ported from the FY27 industry verticals repo ([Room-with-a-Vieau/FY27-verticals](https://github.com/Room-with-a-Vieau/FY27-verticals/tree/main/industry-verticals/healthcare), release 4.1.1). The original was a Pages Router app on Content SDK 1.x. This copy runs on the App Router with Content SDK 2.x, Next.js 16 and `next-intl`. Its shell (routing, proxy, API routes, i18n) comes from [`examples/basic-nextjs`](../../examples/basic-nextjs).

- Sitecore site: `nova-medical`, in the `industry-verticals` site collection
- Rendering host: `healthcare` (see [`xmcloud.build.json`](../../xmcloud.build.json))
- Languages: `en`, `fr-FR`, `es-ES`
- Styling: Tailwind 4 theme variables in [`src/assets`](src/assets), class-based dark mode via `next-themes`

## Run locally

```bash
cd avidemo/healthcare
cp .env.remote.example .env.local   # set NEXT_PUBLIC_DEFAULT_SITE_NAME=nova-medical plus the Edge context IDs and editing secret
npm install
npm run dev
```

Open **http://localhost:3000**.

## Sitecore items

Serialized items live in [`authoring/items/industry-verticals`](../../authoring/items/industry-verticals):

| Module | Contents | How it deploys |
| --- | --- | --- |
| `Project.IndustryVerticals` | Tenant templates, renderings, placeholder settings, branches, and the `nova-medical` site root | `deployItems.modules` |
| `Project.Healthcare-Content` | Pages, data, dictionary, presentation | `postActions.scsModules` |
| `Project.Healthcare-Media` | Media library items | `postActions.scsModules` |

The tenant templates and renderings are shared by every FY27 vertical. The other verticals' site roots were trimmed out, so adding one later means restoring its `sites-*` include and media rule in `common.module.json`.

## New demos based on Nova Medical

Run the `skinned-demo-setup` skill (`.claude/skills/skinned-demo-setup/SKILL.md`) and choose `nova-medical` as the base site. It copies the site with the Sites API and this folder to `avidemo/<customer>`, then skins the copy through its `Settings/Theme Settings` item (Step 2H). There's no `docs/ai` demo kit here, so Prospera's `sitecore-build-demo` step doesn't apply.

## Porting notes

- Every Sitecore component is a client component (`'use client'`), the same as Prospera. This keeps `useSitecore`, `withDatasourceCheck` and nested `Placeholder` working unchanged. `PartialDesignDynamicPlaceholder` stays a server component and uses `AppPlaceholder`.
- `HeroBanner` reads dictionary entries with `useTranslations(page.siteName)`. A missing key returns an empty string, so the hard-coded fallback text still shows.
- `ThemeEditor` no longer uses `next/head`. It renders a `<style precedence>` element and font `<link>`s, which React 19 hoists into `<head>`, and it updates the `:root` variables on the client.
- The FY27 Storybook stories, Vitest, Percy and Husky setup were not carried over.
