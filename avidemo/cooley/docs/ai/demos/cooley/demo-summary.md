# Cooley — Demo Build Summary

> **Source:** https://www.cooley.com/ · **Site:** `/sitecore/content/Legal/Cooley` · **Code:** `avidemo/cooley`
> **Built:** 2026-10-05 · **Variants:** existing Prospera variants (no pixel-perfect pass)

## Build Overview
| Metric | Count |
|---|---|
| Template components used | 4 (Hero, Carousel, Heading CTA, Three Column CTA) + Header (manual) |
| Custom components | 0 |
| Custom variants | 0. Added one missing variant definition: Heading CTA / Compact |
| Datasource items with Cooley content | 4 (+3 carousel slides) |
| Images uploaded to Content Hub | 2 / 2 |

## Component Inventory (Home, `headless-main`)
| # | Component | Datasource | Status |
|---|---|---|---|
| 1 | Hero | Cooley - Hero | ✅ Wired: "Counsel, beyond convention." |
| 2 | Carousel | Carousel - Default (Cooley's copy, rewritten) | ✅ 3 Cooley news slides (see note) |
| 3 | Heading CTA | Cooley - Resources Heading | ✅ Wired · ⚠️ Needs variant Compact |
| 4 | Three Column CTA | Cooley - Resources | ✅ Public Company Resource Hub / IPO GO / Cooley GO |
| — | Header | partial design | ✅ WithLogoImage with the Cooley wordmark |

**Carousel note:** `set_component_datasource` fails for the Carousel because its branch template is missing from the environment. So the existing Cooley-site copy `Carousel - Default` was updated in place with 3 Cooley headlines (LA28, Uber bridge financing, Top M&A/PE rankings).

## Theme
Code: `.site-cooley` class (mapped from site name `Cooley` in `src/lib/site-theme.ts`).
- **Colors:** crimson `#FD1434`, burgundy `#33040E`, white, blush `#FFF2F4`, lavender `#E6EAFF`; square corners.
- **Fonts:** Newsreader for headings (in place of GT Sectra) and Arimo for body (in place of Arial Nova).
- **Hero override:** centered crimson serif headline on white, with no image (`src/assets/sass/_site-cooley.scss`).
- **Takes effect after redeploying the cooley editing host and rendering host.**

## Image Upload Summary
All images are **Sitecore Media Library** items under `/sitecore/media library/Project/Legal/Cooley/` (`cooley-office`, `cooley-brand`, `cooley-logo-red`), so they render in Pages, preview and the live site. The Content Hub copies below are no longer referenced; they showed as placeholders in Pages.

| File | Used on | Content Hub asset | Size |
|---|---|---|---|
| cooley-office.jpg | Carousel slides 1 and 3 | 83766 (approved, public link) | 1792×1008 |
| cooley-brand.jpg | Carousel slide 2 | 83771 (approved, public link) | 1200×630 |

The hero photo tiles and news thumbnails on cooley.com are only 195–456px, too small to use full-width, so they were skipped on purpose.

## Manual Tasks
See [manual-tasks.md](manual-tasks.md):
1. Deploy the theme code
2. Set variants (Heading CTA → Compact, Header → WithLogoImage)
3. Swap the header logo
4. Remove the leftover Prospera components and unused data items
5. Optionally fix the Uber slide link and add personalization

## Not Covered
Sections below the resource cards (latest news list, video, practices tabs) were outside the approved plan. Extracted content for them is in `extracted-content.json` if you want to extend the demo.

## Output Files
- **Pipeline:** `demo-progress.yaml`, `build-plan.yaml`, `content-map.yaml`
- **Reference:** `build-plan-summary.md`, `demo-summary.md`, `manual-tasks.md`, `variant-checklist.md`
- **Assets:** `images/` (uploaded set + manifest), `images-full-extract/` (everything the extractor captured), `../../themes/cooley*`
