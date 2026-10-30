# Kelsey-Seybold Clinic — Demo Summary

> **Source:** https://www.kelsey-seybold.com/ · **Built:** 2026-10-30
> **Site:** `/sitecore/content/healthcare/Kelsey-Seybold` · **Code:** `avidemo/kelsey-seybold`

## Build Overview

| | |
|---|---|
| Template components | 10 sections (8 on Home, Header/Footer in partial designs) |
| Custom components | 0 |
| Custom variants | 0 (existing Prospera variants) |
| Datasource items created | 8 |
| Images uploaded | 14 / 14 (Media Library, `Project/healthcare/Kelsey-Seybold`) |
| Variant definitions created | 2 (Heading CTA Compact, Centered) |

## Component Inventory

| # | Section | Component | Variant | Status |
|---|---------|-----------|---------|--------|
| 1 | Utility bar + nav | Header | WithLogoImage | Partial design, manual |
| 2 | Virtual Specialty CareNOW hero | Promo CTA | WithBackgroundImage | ✅ Wired, variant set |
| 3 | Book an Appointment | Four Column CTA | Default | ✅ Wired |
| 4 | Quick actions | Four Column CTA | Default | ✅ Wired |
| 5 | Specialty Care / Seniors | Two Column CTA | Default | ✅ Wired |
| 6 | Insurance strip | Heading CTA | Compact | ✅ Wired, variant set |
| 7 | Healthy Living Resources | Features | Default | ✅ Wired |
| 8 | Keep Up with Kelsey! | Promo CTA | Default | ✅ Wired |
| 9 | Closing band | Heading CTA | Centered | ✅ Wired, variant set |
| 10 | Footer | Footer | WithSocials | Partial design, manual |

## Theme

`.site-kelsey-seybold` in `_colors.scss`, mapped to site `Kelsey-Seybold` and made the default in `src/lib/site-theme.ts`.

| Token | Value |
|---|---|
| `--text-colored` / `--bg-saturated` | #007899 teal |
| `--text-accent` | #007fa3 bright teal |
| `--bg-accent` | #ab0032 crimson |
| `--bg-main` | #f4f4f4 |
| `--bg-color` | #dff3f9 |
| `--text-body` | #23282a |
| `--roundness` | 0.25rem |
| Fonts | Lato body, Roboto headings (h1–h4) |

## Images

All 14 uploaded to the Media Library. The four booking icons are white SVGs on the live site; they were recolored teal and rasterized to PNG because the Next image optimizer rejects SVG.

## Manual Tasks

See `manual-tasks.md`: variants, cleanup, header logo and footer are done. Remaining: header navigation (Prospera page tree) and approving the Draft Promo CTA items before publishing.
