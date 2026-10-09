# Logix Federal Credit Union — Demo Summary

**Site:** `/sitecore/content/Financial/LogixFederalCreditUnion` · **App:** `avidemo/logix` · **Source:** https://www.logixbanking.com/

## Build overview

| Item | Count |
|---|---|
| Sections in build plan | 30 (28 on page + header/footer) |
| Template components | 28 |
| Custom components / variants | 0 (existing Prospera variants) |
| Datasources populated | 28 (+13 child items: 2 reviews, 11 FAQs) |
| Images uploaded (Media Library) | 28 / 28 |
| Components on page, wired | 28 / 28, in build-plan order |
| Variants set via layout | 11 renderings + 2 Image Left styles |

## Component inventory

| # | Component | Variant | Status |
|---|---|---|---|
| 2 | Hero | Default | ✅ Wired |
| 3 | Heading CTA | Centered | ✅ Wired |
| 4 | Three Column CTA | WithIcons | ✅ Wired |
| 5 | Heading CTA | Centered | ✅ Wired |
| 6 | Four Column CTA (rates) | Default | ✅ Wired |
| 7 | Heading CTA (Why Members) | Default | ✅ Wired |
| 8 | Testimonials (2) | Default | ✅ Wired (layout XML) |
| 9 | Promo CTA (Relationship Rewards) | Default | ✅ Wired (reused) |
| 10 | Promo CTA (Financial Wellness) | Default + Image Left | ✅ Wired (reused) |
| 11–13 | Heading CTA + 2× Four Column CTA (products) | Centered / Default | ✅ Wired |
| 14 | Promo CTA (SoCal Credit Union) | Default | ✅ Wired (reused) |
| 15 | Promo CTA (Home Rewards) | Default + Image Left | ✅ Wired |
| 16 | Four Column CTA (Home Rewards benefits) | Default | ✅ Wired |
| 17 | Promo CTA (Credit Score) | Default | ✅ Wired |
| 18 | Heading CTA (Join) | Centered | ✅ Wired |
| 19 | Two Column CTA (Open Account / Visit Branch) | Default | ✅ Wired (reused) |
| 20 | Heading CTA (Become a Member) | Compact | ✅ Wired |
| 21–22 | Heading CTA + Three Column CTA (community) | Centered / Default | ✅ Wired |
| 23–24 | Heading CTA + Three Column CTA (branches) | Default | ✅ Wired |
| 25–26 | Heading CTA + Four Column CTA (contact) | Centered / Default | ✅ Wired |
| 27–28 | Heading CTA + Questions (11) | Centered / SingleColumn | ✅ Wired (layout XML) |
| 29 | Heading CTA (Disclosures) | Compact | ✅ Wired |
| 1, 30 | Header / Footer | WithLogoImage / Default | ⚠️ Manual (partial designs) |

## Theme
Teal `#2d789d` buttons/links, orange `#ef5418` accents, slate `#2b353e` text, `#f9f9f9` muted bands, Roboto, 4px buttons / 16px cards.
Delivered as `.site-logix` tokens layered over `.site-financial` component styles (`site-theme.ts` maps `LogixFederalCreditUnion` → `site-financial site-logix`).

## Image upload summary
28/28 uploaded to `/sitecore/media library/Project/Financial/LogixFederalCreditUnion` (hero, rewards graphic, photos, branch photos, 13 orange icons converted SVG→PNG, logo). Source photos for community cards are only 316×237 on logixbanking.com.

## Manual tasks
See `manual-tasks.md`: remove 6 leftover Prospera components, set up header/footer partial designs.
