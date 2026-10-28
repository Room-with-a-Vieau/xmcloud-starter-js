# Booth University College — Demo Build Summary

> **Client:** Booth University College
> **Source:** https://boothuc.ca/
> **Built:** 2026-10-28
> **Page:** `/sitecore/content/Education/BoothUniversityCollege/Home`
> **Code:** `avidemo/booth-uc` (rendering host `booth-uc`)

> [!IMPORTANT]
> **The page isn't assembled yet.** The Agent API's `add_component_on_page` and `set_component_datasource` failed with a CM GraphQL error (`renderings` field missing on `Query`). You're placing the components in Pages yourself; see [manual-tasks.md](manual-tasks.md) §1. All datasources are ready.

---

## Build Overview

| Metric | Count |
|---|---|
| Template components used | 7 (+ Header, Footer partial designs) |
| Custom components built | 0 |
| Custom variants created | 0 (existing Prospera variants chosen) |
| Datasource items created | 7 |
| Fields populated | 53 |
| Images uploaded (Media Library) | 11 / 11 mapped |

---

## Component Inventory

| # | Component | Variant | Datasource | Status |
|---|---|---|---|---|
| 1 | Header | WithLogoImage | partial design | ⚠️ Manual |
| 2 | Hero | Default | Booth UC - Hero | ⚠️ Place in Pages |
| 3 | Stats Counter | Default | Booth UC - Stats Counter | ⚠️ Place in Pages |
| 4 | Features | Default | Booth UC - Features | ⚠️ Place in Pages |
| 5 | Heading CTA | Default | Booth UC - Heading CTA - Academics | ⚠️ Place in Pages |
| 6 | Five Column CTA | Default | Booth UC - Five Column CTA | ⚠️ On page, rewire datasource |
| 7 | CTA Banner | Default | Booth UC - CTA Banner - Recent News | ⚠️ Place in Pages |
| 8 | Heading CTA | Default | Booth UC - Heading CTA - Upcoming Events | ⚠️ Place in Pages |
| 9 | Footer | WithSocials | shared footer datasource | ⚠️ Manual |

---

## Theme

| Setting | Value |
|---|---|
| Primary color | `#031d33` (navy) |
| Colored text / links | `#00447c` (Booth blue) |
| Accent | `#b5121b` (crest red) |
| Tinted sections | `#f0f0f0` |
| Heading font | `Crimson Pro` (Google Fonts, same font as the live site) |
| Body font | `Helvetica Neue` system stack (the live site uses a licensed Helvetica Neue) |
| Roundness | `0` (square) |
| Delivery method | site-theme-class: `.site-booth-uc`, mapped to `BoothUniversityCollege` and the default in `src/lib/site-theme.ts` |
| Google Fonts | Crimson Pro added to the `_fonts.scss` import; a `.site-booth-uc h1–h6` rule applies it to headings |

Theme file: `docs/ai/themes/booth-uc.theme.yaml`. The theme hasn't been checked in a browser yet; it shows up once `avidemo/booth-uc` is built or deployed.

---

## Image Upload Summary

**Target:** Sitecore Media Library, `/sitecore/media library/Project/Education/BoothUniversityCollege/` (Content Hub not used)

| Result | Count |
|---|---|
| Uploaded | 11 |
| Failed | 0 |
| Downloaded but not used | 3 (news graphics with no matching field) |

| Media item | Used in | Source size |
|---|---|---|
| `booth-hero-students-campus-steps` | Hero Image | 2000 × 1333 |
| `booth-undergraduate-studies` | Features Image1 | 1500 × 976 |
| `booth-continuing-studies` | Features Image2 | 1613 × 1075 |
| `booth-school-of-business` | Five Column CTA Image1, Stats Counter Image2 | 3600 × 2400 |
| `booth-school-of-social-work` | Five Column CTA Image2 | 1000 × 1500 |
| `booth-school-of-humanities-social-sciences` | Five Column CTA Image3 | 3600 × 2400 |
| `booth-school-for-continuing-studies` | Five Column CTA Image4 | 1025 × 1284 |
| `booth-school-of-graduate-studies` | Five Column CTA Image5 | 3600 × 4800 |
| `booth-campus-banner` | CTA Banner Image | 3600 × 2400 |
| `booth-convocation` | Stats Counter Image1 | 1500 × 1000 |
| `booth-logo-white` (SVG) | CTA Banner Icon; header/footer logo (manual) | 189 × 77 |

---

## Manual Tasks

Full list: [manual-tasks.md](manual-tasks.md). In short:

1. **Assemble Home in Pages:** remove 9 Prospera components, place 6, rewire Five Column CTA, then delete the auto-created placeholder datasources.
2. **Header:** WithLogoImage variant, Booth logo, rename nav pages to About / Admissions / Programs / Students / Library / News and Events.
3. **Footer:** WithSocials variant, address, links, socials, degree statement.
4. **Home metadata:** Title still reads "PLAY! Financial".
5. **CTA Banner:** pick the accent background style if the band isn't red.
6. **Personalization (optional):** `Booth UC - <Component> - <Segment>` items.

Variant quick reference: [variant-checklist.md](variant-checklist.md).
