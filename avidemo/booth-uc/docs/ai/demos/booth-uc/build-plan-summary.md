# Booth University College — Build Plan

> **Source:** https://boothuc.ca/
> **Analyzed:** 2026-10-28
> **Sections:** 9 (9 template, 0 custom)

---

## Page Sections (top to bottom)

| # | What's on the page | What we'll use | Variant | Confidence | Notes |
|---|-------------------|----------------|---------|------------|-------|
| 1 | _Crest logo, utility links and six-item nav in white over the hero photo_ | Header | WithLogoImage | High | Partial design, manual |
| 2 | _Navy-tinted campus photo, "Education for a Better World", search box, "Explore Programs" link, wave edge_ | Hero | Default | Medium | Search box and wave are lost |
| 3 | _Three crest badges: 18 class size, 14:1 ratio, 20+ programs, plus a "Why Booth UC?" button_ | Stats Counter | Default | Medium | Plain numbers, not badges; button dropped |
| 4 | _Gray band: "Your Path to a Better World" intro, then Undergraduate and Continuing Studies rows with photos and link lists_ | Features | Default | Medium | One shared link instead of per-row link lists |
| 5 | _"Academics" heading with a one-line intro_ | Heading CTA | Default | High | |
| 6 | _Five navy-tinted photo tiles, one per school, with uppercase names_ | Five Column CTA | Default | High | Reuses the instance already on Home; one row instead of 3 + 2 |
| 7 | _Red "Recent News" band with headline, date, summary, photo and a "Read All News" button_ | CTA Banner | Default | Medium | Shows one item, not a slider |
| 8 | _"Upcoming Events" heading and a "View All Events" button (no events listed)_ | Heading CTA | Default | Medium | |
| 9 | _Navy footer: crest, address, links, social icons, degree-granting statement_ | Footer | WithSocials | High | Partial design, manual |

---

## Sections that need attention

> [!NOTE]
> All sections matched with medium or high confidence, and no custom work is needed. The medium ones lose a detail from the live site:

| # | What's lost | Option |
|---|-------------|--------|
| 2 | Hero search box and wave divider | A Phase 5.5 custom Hero variant |
| 3 | Crest-badge shapes and the "Why Booth UC?" button | A custom StatsCounter variant |
| 4 | Per-program link lists beside each row | A custom Features variant, or accept one "Explore Programs" link |
| 7 | News rotation | Swap to Carousel (rotates, but its branch template may block wiring) |

---

## Variant Decisions

| # | Component | Variant | Why this variant |
|---|-----------|---------|-----------------|
| 1 | Header | WithLogoImage | The logo is the crest image, not text |
| 9 | Footer | WithSocials | The footer shows Facebook, Instagram, YouTube and LinkedIn icons |

---

## Components by type

### Will be added automatically (API-addable)

| # | Component | Datasource needed |
|---|-----------|------------------|
| 2 | Hero | Simple (1 item) |
| 3 | Stats Counter | Simple (1 item) |
| 4 | Features | Simple (1 item) |
| 5 | Heading CTA (Academics) | Simple (1 item) |
| 6 | Five Column CTA | Simple (1 item), rewired on the existing instance |
| 7 | CTA Banner (Recent News) | Simple (1 item) |
| 8 | Heading CTA (Upcoming Events) | Simple (1 item) |

### Must be placed manually

| # | Component | Where it lives | What to do |
|---|-----------|---------------|------------|
| 1 | Header | Header partial design | Set the WithLogoImage variant, upload the Booth crest logo, rename nav pages |
| 9 | Footer | Footer partial design | Update the footer datasource text and socials, set WithSocials |

### Custom components needed

None. All sections matched template components.

### Cleanup on Home

Nine Prospera components already on Home aren't in this plan: Carousel, Promo CTA ×3, Three Column CTA, Two Column CTA, Article List, Documents List and App Promo. They need removing in Pages. The MCP has a `remove_component_on_page` tool, so I can remove them for you if you approve.

---

## Build Order

```
Phase 1 — Sitecore content (create datasource items):
  1. Hero
  2. StatsCounter
  3. Features
  4. HeadingCta (Academics)
  5. FiveColumnCta (rewire the existing instance)
  6. CtaBanner (Recent News)
  7. HeadingCta (Upcoming Events)

Phase 2 — Apply theme (.site-booth-uc tokens, Crimson Pro headings)

Phase 3 — Custom components: none
```
