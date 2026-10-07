# Brooks Running — Build Plan

> **Source:** https://www.brooksrunning.com/ (homepage screenshot; site blocks scraping)
> **Analyzed:** 2026-10-07
> **Sections:** 13 on the page (11 built, 2 not reproduced) + cleanup of 9 leftover Prospera components

---

## Page Sections (top to bottom)

| # | What's on the page | What we'll use | Variant | Confidence | Notes |
|---|-------------------|----------------|---------|------------|-------|
| 1 | _Light-aqua strip: "Members get free shipping. Join us"_ | — | — | Low | No matching component; omitted |
| 2 | _Utility links over a navy nav bar with BROOKS wordmark, 4 nav links, search, account, cart_ | Header | Default | Medium | Partial design, manual |
| 3 | _Full-bleed runner photo, "ENERGIZE EVERY STRIDE", two underlined CTAs_ | Hero | Default | High | Only one CTA fits |
| 4 | _Centered heading "Gear built for every run" on off-white_ | Heading CTA | Centered | High | |
| 5 | _Four square photo tiles: Women's/Men's Shoes and Apparel_ | Four Column CTA | Default | High | |
| 6 | _Full-bleed photo, "MORE HOURS TO RUN", line + CTA_ | Hero | Default | High | |
| 7 | _Eyebrow "FALL ARRIVALS", heading "Ready for the season"_ | Heading CTA | Centered | High | |
| 8 | _Two large photo tiles: Cold-Weather Gear, Wet-Weather Gear_ | Two Column CTA | Default | Medium | Labels sit below images, not on them |
| 9 | _Full-bleed photo, "BROOKS RUN CLUB", line + "Learn more"_ | Hero | Default | High | |
| 10 | _Centered heading "Stories to transform your run"_ | Heading CTA | Centered | High | |
| 11 | _Four article cards: photo, category + date, title, read time_ | Four Column CTA | Default | Medium | Static cards, not real articles |
| 12 | _Slim navy band, Run Happy badge, "Take it for a 90-day trial run…"_ | Heading CTA | Compact | Low | No badge image; navy depends on an available background style |
| 13 | _Footer: newsletter, socials, four link columns, legal row_ | Footer | WithSocials | Medium | Partial design; no email form; 3 social links max |

---

## Sections that need attention

> [!WARNING]
> Review these before approving.

| # | What's on the page | Issue | Suggestion |
|---|-------------------|-------|------------|
| 1 | _Announcement strip_ | No component, and it sits above the header | Omit (recommended) |
| 3 | _Hero with two CTAs_ | Hero has one link | Keep "Shop Ghost Amp", drop "Shop Road Running Gear" |
| 11 | _Article cards_ | Static tiles, no real article pages | Fine for a homepage demo. Alternative: create 4 Article pages and use Article List |
| 12 | _Run Happy band_ | No badge image; navy band only if a background style exists | Accept a text-only strip |
| — | _9 leftover Prospera components_ | Can't be removed via MCP | Remove in Pages (listed in manual tasks) |

---

## Variant Decisions

| # | Component | Variant | Why this variant |
|---|-----------|---------|-----------------|
| 4, 7, 10 | Heading CTA | Centered | Centered section titles |
| 12 | Heading CTA | Compact | Short single-line strip |
| 13 | Footer | WithSocials | Social icons in the footer |

---

## Components by type

### Will be added automatically (API-addable)

| # | Component | Datasource needed |
|---|-----------|------------------|
| 3, 6, 9 | Hero ×3 | Simple (1 item each) |
| 4, 7, 10, 12 | Heading CTA ×4 | Simple (1 item each) |
| 5, 11 | Four Column CTA ×2 | Simple (1 item each) |
| 8 | Two Column CTA | Simple (1 item; reuses the instance already on the page) |

### Must be placed manually

| # | Component | Where it lives | What to do |
|---|-----------|---------------|------------|
| 2 | Header | Header partial design | Nav labels come from page items; keep the text logo or swap in a Brooks logo |
| 13 | Footer | Footer partial design | I write the content; you confirm it shows in the partial design |

### Custom components needed

None for the homepage. The ProductGrid for the category page is a separate follow-up.

---

## Build Order

```
Phase 1 — Sitecore content (create datasource items):
  1. Hero — Energize every stride
  2. Heading CTA — Gear built for every run
  3. Four Column CTA — category tiles
  4. Hero — More hours to run
  5. Heading CTA — Ready for the season
  6. Two Column CTA — cold/wet weather (reuse existing)
  7. Hero — Brooks Run Club
  8. Heading CTA — Stories to transform your run
  9. Four Column CTA — stories
  10. Heading CTA (Compact) — Run Happy promise
  11. Footer content

Phase 2 — Apply theme (.site-brooks-running tokens, Barlow body, Barlow Condensed headings)

Phase 3 — Custom components: none
```

---

## Approval Questions

1. **Does the section-to-component mapping look correct?**
2. **Do you want pixel-perfect custom variants** (Phase 5.5), or are the existing Prospera variants sufficient?
