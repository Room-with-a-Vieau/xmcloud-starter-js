# Kelsey-Seybold Clinic — Build Plan

> **Source:** https://www.kelsey-seybold.com/
> **Analyzed:** 2026-10-30
> **Sections:** 10 (10 template, 0 custom)

---

## Page Sections (top to bottom)

| # | What's on the page | What we'll use | Variant | Confidence | Notes |
|---|-------------------|----------------|---------|------------|-------|
| 1 | _Teal utility bar over a white nav with the Kelsey-Seybold logo_ | Header | WithLogoImage | Medium | Partial design, manual |
| 2 | _Photo of a man with a tablet, white "NEW! Virtual Specialty CareNOW" card and orange ConnectNOW button_ | Promo CTA | WithBackgroundImage | Medium | Reuses existing instance |
| 3 | _Teal "Book an Appointment" panel: Same-Day Care, Adult Primary Care, Specialty Care, Pediatrics_ | Four Column CTA | Default | Low | Vertical panel becomes a row of tiles |
| 4 | _Four gray icon cards: Virtual Urgent Care, Call to Schedule, Find a Doctor, Find a Location_ | Four Column CTA | Default | High | |
| 5 | _Two teal photo cards: Specialty Care, Kelsey-Seybold for Seniors_ | Two Column CTA | Default | High | Reuses existing instance |
| 6 | _Slim insurance strip: "In-Network With 50+ Insurance Plans…" + green button_ | Heading CTA | Compact | Medium | Variant item to create |
| 7 | _"Healthy Living Resources" intro + two article cards_ | Features | Default | Medium | |
| 8 | _"Keep Up with Kelsey!" intro + Towne Lake news card_ | Promo CTA | Default | Medium | Reuses existing instance |
| 9 | _Teal band: "Kelsey-Seybold Clinic", one line, Primary Care / Specialty Care buttons_ | Heading CTA | Centered | Medium | Second button dropped |
| 10 | _White footer: link columns, socials, legal links, teal copyright bar_ | Footer | WithSocials | Medium | Partial design, manual |

---

## Sections that need attention

> [!WARNING]
> Review before approving.

| # | What's on the page | Issue | Suggestion |
|---|-------------------|-------|------------|
| 2–3 | _Split hero: promo photo left, teal booking panel right_ | No Prospera component holds both halves; they stack | Accept the stack, or build a custom variant in Phase 5.5 |
| 3 | _Vertical booking list in a teal panel_ | Four Column CTA renders a horizontal row and has no panel heading | Accept, or Phase 5.5 variant |
| 7–8 | _Two side-by-side columns (resources / news)_ | Features and Promo CTA each take the full width, so the columns stack | Accept the stack |
| 9 | _Two CTA buttons_ | Heading CTA has one link field | Keep "Primary Care" only |

---

## Variant Decisions

| # | Component | Variant | Why this variant |
|---|-----------|---------|-----------------|
| 1 | Header | WithLogoImage | Image wordmark, not a text logo |
| 2 | Promo CTA | WithBackgroundImage | White text card floating over a full photo |
| 6 | Heading CTA | Compact | Slim one-line strip; Variant Definition item must be created |
| 9 | Heading CTA | Centered | Centered intro band; Variant Definition item must be created |
| 10 | Footer | WithSocials | Social icon row present |

---

## Components by type

### Will be added automatically (API-addable)

| # | Component | Datasource needed |
|---|-----------|------------------|
| 2 | Promo CTA | Simple (1 item) |
| 3 | Four Column CTA | Simple (1 item) |
| 4 | Four Column CTA | Simple (1 item) |
| 5 | Two Column CTA | Simple (1 item) |
| 6 | Heading CTA | Simple (1 item) |
| 7 | Features | Simple (1 item) |
| 8 | Promo CTA | Simple (1 item) |
| 9 | Heading CTA | Simple (1 item) |

### Must be placed manually

| # | Component | Where it lives | What to do |
|---|-----------|---------------|------------|
| 1 | Header | Header partial design | Set the logo image and variant in Pages |
| 10 | Footer | Footer partial design | Edit the footer datasource and variant |

Existing Prospera components not in the plan (remove in Pages): Carousel, Five Column CTA, Three Column CTA, one Promo CTA, Article List, Documents List, App Promo.

### Custom components needed

None. Every section matched a template component.

---

## Build Order

```
Phase 1 — Sitecore content (create datasource items):
  1. Promo CTA — Virtual Specialty CareNOW hero
  2. Four Column CTA — Book an Appointment
  3. Four Column CTA — Quick actions
  4. Two Column CTA — Specialty Care / Seniors
  5. Heading CTA — Insurance strip
  6. Features — Healthy Living Resources
  7. Promo CTA — Keep Up with Kelsey!
  8. Heading CTA — Closing band

Phase 2 — Apply theme (.site-kelsey-seybold tokens + Roboto/Lato)

Phase 3 — Custom components: none
```

---

## Approval Questions

1. **Does the section-to-component mapping look correct?**
2. **Do you want pixel-perfect custom variants** (Phase 5.5), or are the existing Prospera variants enough?
