# Logix Federal Credit Union — Build Plan

> **Source:** https://www.logixbanking.com/
> **Analyzed:** 2026-10-09
> **Sections:** 30 (30 template, 0 custom). That's 28 placed components plus the header and footer.

---

## Page Sections (top to bottom)

| # | What's on the page | What we'll use | Variant | Confidence | Notes |
|---|-------------------|----------------|---------|------------|-------|
| 1 | _White logo row with utility links and search, orange category nav bar_ | Header | With Logo Image | High | Partial design (manual) |
| 2 | _Full-bleed photo of a member by her truck, "Auto Loan Rates as Low as 3.24% APR*" on a dark panel, login card on the right_ | Hero | Default | Medium | Login card dropped |
| 3 | _Centered "How Can You Bank Smarter Today?" intro_ | Heading CTA | Centered | High | Featured/Personal/Business tabs dropped |
| 4 | _Three cards with orange icon tiles: High Rate Savings, Adjustable Rate Mortgage, Personal Loans_ | Three Column CTA | With Icons | High | Reuses existing |
| 5 | _Centered "Better Rates to Help You Thrive" + View All Rates_ | Heading CTA | Centered | Medium | Button moves above the rates |
| 6 | _Four rate columns: Mortgage 7.09%, Credit Cards 11.99%, Auto 3.24%, Certificates 3.70%_ | Four Column CTA | Default | Medium | Big-number styling lost |
| 7 | _Gray band: "Why Members Choose Logix" with paragraph and bullets_ | Heading CTA | Default | Medium | Bullets folded into the text |
| 8 | _Two 5-star Yelp reviews with orange quote marks_ | Testimonials | Default | High | |
| 9 | _Relationship Rewards: Gold Tier benefits text beside a balance-calculator graphic_ | Promo CTA | Default | Medium | Reuses existing; graphic becomes an image |
| 10 | _Beach-swimmer photo, then "Strengthen Your Financial Wellness"_ | Promo CTA | Default + `reverse` | High | Reuses existing |
| 11 | _Centered "Smarter Banking with Logix" intro_ | Heading CTA | Centered | High | |
| 12 | _Product icon links, row 1: Checking, Certificates, Credit Cards, Auto Loans_ | Four Column CTA | Default | Medium | 4×2 grid split into two rows |
| 13 | _Product icon links, row 2: Mortgage, Home Equity, Personal Loans, View All Rates_ | Four Column CTA | Default | Medium | |
| 14 | _"Your Southern California Credit Union" + Schedule Appointment, branch slider on the right_ | Promo CTA | Default | Medium | Reuses existing; slider becomes one branch photo |
| 15 | _Family moving in, then "Discover Home Rewards"_ | Promo CTA | Default + `reverse` | High | |
| 16 | _Four Home Rewards benefits with orange icons_ | Four Column CTA | Default | Medium | |
| 17 | _"Your Path to a Better Credit Score" beside the robot mascot on a credit gauge_ | Promo CTA | Default | High | |
| 18 | _Pale-blue band: "Want to Join the Logix Community? We'd Love That!"_ | Heading CTA | Centered | High | |
| 19 | _Two cards: Open an Account / Visit a Branch_ | Two Column CTA | Default | High | Reuses existing |
| 20 | _"Become a Member" strip with an orange checkmark_ | Heading CTA | Compact | Low | Checkmark/card style lost |
| 21 | _Centered "Smarter Banking, Fueled by Heart" + 96% stat_ | Heading CTA | Centered | High | |
| 22 | _Three community photo cards: Giving Back, Sponsorships, Community Stars_ | Three Column CTA | Default | High | "Logix Team" badge dropped |
| 23 | _"Visit Us Today / Serving You Across 18 Convenient Local Branches" + 2 buttons_ | Heading CTA | Default | Medium | Find an ATM button dropped |
| 24 | _Three branch cards: Bouquet Canyon, Bridgeport, Burbank_ | Three Column CTA | Default | High | |
| 25 | _Gray band: "Questions? We're here for you!"_ | Heading CTA | Centered | High | |
| 26 | _Four contact cards: Call Us, Appointment, Visit Us, Contact Us_ | Four Column CTA | Default | Medium | |
| 27 | _"Frequently Asked Questions" heading_ | Heading CTA | Centered | High | |
| 28 | _11-question FAQ accordion_ | Questions | Single Column | High | Answers come from the live page |
| 29 | _Disclosures small print_ | Heading CTA | Compact | Low | No small-print component |
| 30 | _Footer: link columns, help contacts, orange member CTA, dark legal bar_ | Footer | Default | High | Partial design (manual) |

---

## Sections that need attention

> [!WARNING]
> These are low-confidence matches. Review before approving.

| # | What's on the page | Issue | Suggestion |
|---|-------------------|-------|------------|
| 20 | _"Become a Member" strip_ | Slim heading only; checkmark/card styling lost | Keep, or drop it (it repeats section 18) |
| 29 | _Disclosures small print_ | No small-print component | Keep as a Compact heading strip, or drop it |

Interactive pieces that won't be reproduced: the hero login card (2), the product tabs (3) and the branch slider (14).

---

## Variant Decisions

| # | Component | Variant | Why this variant |
|---|-----------|---------|-----------------|
| 1 | Header | With Logo Image | Image logo |
| 3, 5, 11, 18, 21, 25, 27 | Heading CTA | Centered | Centered section intros |
| 4 | Three Column CTA | With Icons | Icon tiles on the cards |
| 10, 15 | Promo CTA | Default + SXA style `reverse` | Image on the left (no code change) |
| 20, 29 | Heading CTA | Compact | Slim strips |
| 28 | Questions | Single Column | Single-column FAQ |
| 30 | Footer | Default | Keeps all 4 link columns (With Socials only renders 2) |

---

## Components by type

### Will be added automatically (API-addable)

28 components: Hero ×1, Heading CTA ×11, Three Column CTA ×3, Four Column CTA ×5, Two Column CTA ×1, Promo CTA ×5, Testimonials ×1 (2 reviews), Questions ×1 (11 Q&As).
5 of them reuse components already on the copied Home page (positions 4, 9, 10, 14, 19).

### Must be placed or edited manually

| # | Component | Where it lives | What to do |
|---|-----------|---------------|------------|
| 1 | Header | Header partial design | Logix logo, nav labels |
| 30 | Footer | Footer partial design | Columns, copyright |
| — | Carousel, Five Column CTA, Article List, Documents List, App Promo | Home page (left over from Prospera) | Remove in Pages |

### Custom components needed

None. All sections matched existing components.

---

## Build Order

```
Phase 1 — Sitecore content (positions 2–29, top to bottom)
Phase 2 — Theme: .site-logix tokens, Roboto, site-theme.ts → LogixFederalCreditUnion
Phase 3 — Custom components: none
```
