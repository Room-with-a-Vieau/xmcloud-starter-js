# Brooks Running — Demo Summary

> **Site:** /sitecore/content/Fitness/BrooksRunning (rendering host `brooks-running`)
> **Code:** avidemo/brooks-running
> **Source:** https://www.brooksrunning.com/ (homepage screenshot; site blocks scraping)
> **Built:** 2026-10-07

## Build Overview

| Item | Count |
|---|---|
| Template sections placed | 10 on Home + footer |
| Custom components | 0 |
| Custom variants | 0 (existing Prospera variants) |
| Datasource items created | 11 |
| Images uploaded (Media Library) | 13 / 13 |
| Variant Definitions added | 2 (Heading CTA: Centered, Compact) |

## Component Inventory (Home, top to bottom)

| # | Section | Component | Datasource | Status |
|---|---|---|---|---|
| 1 | Energize every stride | Hero | Brooks Running - Hero Energize | ✅ Wired |
| 2 | Gear built for every run | Heading CTA | Brooks Running - Heading Gear | ✅ Wired ⚠️ Needs variant (Centered) |
| 3 | Category tiles | Four Column CTA | Brooks Running - Category Tiles | ✅ Wired |
| 4 | More hours to run | Hero | Brooks Running - Hero Reflective | ✅ Wired |
| 5 | Fall arrivals / Ready for the season | Heading CTA | Brooks Running - Heading Season | ✅ Wired ⚠️ Needs variant (Centered) |
| 6 | Cold/wet-weather gear | Two Column CTA | Brooks Running - Weather Gear | ✅ Wired |
| 7 | Brooks Run Club | Hero | Brooks Running - Hero Run Club | ✅ Wired |
| 8 | Stories to transform your run | Heading CTA | Brooks Running - Heading Stories | ✅ Wired ⚠️ Needs variant (Centered) |
| 9 | Story cards | Four Column CTA | Brooks Running - Stories | ✅ Wired |
| 10 | Run Happy promise | Heading CTA | Brooks Running - Run Happy Promise | ✅ Wired ⚠️ Needs variant (Compact) |
| — | Footer (partial design) | Footer (Default) | Brooks Running - Footer | ✅ Wired |

## Theme

`.site-brooks-running` (default theme class for this app): navy #1b3889, text #0e1320, warm off-white #f8f5f0, aqua #b8dde1, square corners. Barlow body, Barlow Condensed uppercase headings; hero CTAs are white underlined links. Fonts load via `<link>` in `src/app/layout.tsx`. Takes effect on next dev-server restart / rendering-host deploy.

## Image Upload Summary

> [!NOTE]
> All 13 user-supplied images uploaded to `/sitecore/media library/Project/Fitness/BrooksRunning`. See `images/image-manifest.json` for media item IDs.

## Deviations from the approved plan

- Footer uses the **Default** variant (4 link columns, no socials) instead of WithSocials (only 2 columns).
- A new Two Column CTA was added in position instead of reusing the existing one (the API cannot reorder components).

## Manual Tasks

See `manual-tasks.md` and `variant-checklist.md`.

## Category page — /running-shoes (added 2026-10-07)

| # | Section | Component | Datasource |
|---|---|---|---|
| 1 | Breadcrumb | Breadcrumb (context) | — |
| 2 | Ghost / Glycerin / Adrenaline GTS / Best sellers tiles | Four Column CTA | Brooks_Running_-_Series_Tiles |
| 3 | Sidebar + filters + 24 products + 2 promos | **Product Grid (new)** | Brooks Running - Product Grid |
| 4 | SEO copy (5 sections) | Rich Text | Brooks_Running_-_Running_Shoes_SEO_Copy |
| 5 | Run Happy promise | Heading CTA | Run_Happy_placeholder (filled with Run Happy copy) |

**New component:** `src/components/pagecontent/ProductGrid.tsx` + `_component-product-grid.scss`. Sitecore templates `Product Grid`, `Product Grid Product`, `Product Grid Promo` and rendering `Product Grid` live in the new `authoring/items/brooks-running` module (`/sitecore/templates/Project/BrooksRunning`, `/sitecore/layout/Renderings/Project/BrooksRunning`). The rendering uses a GraphQL ComponentQuery (datasource fields + children). Registered in the site's Available Renderings → Custom Demo, with a Default headless variant.

**Images:** 30 selected from the user's mass download (`images/category-selected/`), uploaded to `Project/Fitness/BrooksRunning/Running Shoes`. Sizes are invented demo data (women 5–12, men 7–15, unisex 5–15).
