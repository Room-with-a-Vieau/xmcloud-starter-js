# Cooley — Build Plan

> **Source:** https://www.cooley.com/
> **Analyzed:** 2026-10-02
> **Sections:** 5 (5 template, 0 custom). Covers the top of the page only; the screenshot and scrape stop at the resource cards.

---

## Page Sections (top to bottom)

| # | What's on the page | What we'll use | Variant | Confidence | Notes |
|---|-------------------|----------------|---------|------------|-------|
| 1 | Crimson "Cooley" wordmark, search, hamburger | Header | WithLogoImage | High | Partial design: swap the logo manually |
| 2 | Huge centered serif headline "Counsel, beyond convention." with floating photo tiles | Hero | Default | Medium | One image instead of the floating tile collage |
| 3 | Rotating news panel (LA28 announcement, Uber financing) with arrows | Carousel | Default | Medium | Renders as a full-width carousel under the hero, not inside it |
| 4 | Small "RESOURCES" label | Heading CTA | Compact | Medium | "Pause motion" toggle not reproduced |
| 5 | Three square resource cards: "Public C…", "IPO GO", "Cooley GO" | Three Column CTA | Default | High | Cards use images rather than solid color blocks |

---

## Sections that need attention

| # | What's on the page | Issue | Suggestion |
|---|-------------------|-------|------------|
| 2 | Floating photo-tile collage around the headline | Hero has a single image | Accept one image, or build a custom Hero variant in Phase 5.5 |
| 3 | News slider inside the hero | Carousel is its own full-width band | Accept, or a custom Hero variant could embed it later |
| — | Everything below the resource cards | Not captured | Send a full-page screenshot to extend the plan |

---

## Variant Decisions

| # | Component | Variant | Why this variant |
|---|-----------|---------|-----------------|
| 1 | Header | WithLogoImage | The wordmark is an image |
| 4 | Heading CTA | Compact | Slim section label, not a full heading block |

---

## Components by type

### Will be added automatically (API-addable)
| # | Component | Datasource needed | Page action |
|---|-----------|------------------|-------------|
| 2 | Hero | Simple (1 item) | **Add** at the top of `headless-main` |
| 3 | Carousel | List (parent + 2 slides) | **Reuse** the existing Carousel, re-wired to Cooley content |
| 4 | Heading CTA | Simple (1 item) | **Add** before the Three Column CTA |
| 5 | Three Column CTA | Simple (1 item) | **Reuse** the existing Three Column CTA, re-wired |

### Must be placed manually
| # | Component | Where it lives | What to do |
|---|-----------|---------------|------------|
| 1 | Header | Header partial design | Upload the Cooley logo and set it in Pages |

### Leftover Prospera components (manual cleanup)
Promo CTA ×3, Five Column CTA, Two Column CTA, Article List, Documents List and App Promo are still on the copied Home page. The MCP can't remove them; delete them in Pages.

### Custom components needed
None. All sections matched template components.

---

## Build Order

```
Phase 3 — Sitecore content (create datasources under Home/Data):
  1. Hero
  2. Carousel (+2 slides)
  3. HeadingCta
  4. ThreeColumnCta

Phase 4 — Apply theme (.site-cooley tokens + Newsreader/Arimo fonts)

Phase 6 — Assemble Home: add Hero + HeadingCta, re-wire Carousel + Three Column CTA
```

---

## Approval Questions

1. **Does the section-to-component mapping look correct?**
2. **Do you want pixel-perfect custom variants** (Phase 5.5) or are the existing Prospera variants sufficient? I recommend the existing variants, because the Phase 5.5 tooling still targets the old component library.

> Reply "approved" to proceed, or describe any changes needed.
