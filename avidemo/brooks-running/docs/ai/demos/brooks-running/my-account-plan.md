# Brooks Running — My Account Plan

> **Status:** Built 2026-10-26; see demo-summary.md and manual-tasks.md
> **Source:** `~/Downloads/www.brooksrunning.com_en_us_account_dashboard_.png`, `~/Downloads/www.brooksrunning.com_en_us_recommendations_.png`
> **Planned:** 2026-10-26

---

## Page tree

```
Home
└── my-account              → Dashboard (the "My Account" URL is the dashboard)
    ├── order-history
    ├── gear-recommendations
    ├── addresses
    ├── payment-methods
    └── settings
```

- `my-account` gets **NavigationFilter** set so it doesn't show in the header nav (same issue as It's Your Run).
- The header's account icon links to `/my-account`, which is a manual Header partial-design task.
- The Run Happy strip and Footer come from the existing partial designs, so nothing needs to change there.

## Shared layout (every page)

**Column Splitter** with 2 columns (3/12 sidebar on a `--bg-main` off-white background, 9/12 main):

| Column | Content | Component |
|---|---|---|
| Left | "My Account" + "Log out" link | Rich Text (one shared datasource under `my-account/Data`) |
| Left | Dashboard / Order history / Gear recommendations / Addresses / Payment methods / Settings, with the active page highlighted in navy | **⚠️ See recommendation 1** |
| Right | Page content (below) | — |

## Pages

### 1. Dashboard (`/my-account`)

| # | Screenshot section | Component | Variant | Content |
|---|---|---|---|---|
| 1 | Welcome / Hi, Andrew | Heading CTA | PageHeading | Heading "Welcome", Text "Hi, Andrew" |
| 2 | Grey "No orders within the last 12 months" panel | Promo CTA | Default | **Replaced by the new-shoe blurb:** Title "Your Cascadias have put in the miles", Text "It's been over four years since you picked up the Cascadia 16 in 2022. Most trail shoes are ready to retire after 300–500 miles, so you might be due for a fresh pair. The all-new Cascadia 20 adds a Vibram MegaGrip outsole and more cushioning.", Image `cascadia-20-mens.jpg`, Link "See your recommendation" → gear-recommendations, Link2 "Order history" → order-history |
| 3 | Three cards: BRC Perks / BRC membership / Find the perfect shoe | Three Column CTA | Default | Perks ("BRC member since March 2013" + perk list), membership (QR code image optional, otherwise text only), Shoe Finder (runner photo + "Try Shoe Finder") |

The Run Club badge in the top-right corner is left out, because Heading CTA has no image field. Optionally, it could go into the Rich Text sidebar header instead.

### 2. Order history (`/my-account/order-history`)

Four orders about three years apart. Each order uses the Cascadia that was current at the time:

All orders are **Men's Cascadia, size 10.5**.

| Order date | Product | Why this version | Price | Image |
|---|---|---|---|---|
| Jun 14, 2013 | Men's Cascadia 8 | Reviewed Jan–Apr 2013 | $120 | `images/my-account/cascadia-8-mens.jpg` |
| Aug 9, 2016 | Men's Cascadia 11 | Previewed Jan 2016 (Cascadia 12 is 2017) | $120 | `images/my-account/cascadia-11-mens.jpg` |
| Sep 21, 2019 | Men's Cascadia 14 | Reviewed Jun–Jul 2019 | $130 | `images/my-account/cascadia-14-mens.jpg` |
| May 3, 2022 | Men's Cascadia 16 | Released Aug 2021 (Cascadia 17 is 2023) | $130 | `images/my-account/cascadia-16-mens.jpg` |

Note: the Cascadia 11 and 14 photos may be the 2025 Cascadia 1 reissue rather than the originals. Kept as supplied per user decision (2026-10-26).

| # | Section | Component | Variant | Content |
|---|---|---|---|---|
| 1 | "Order History" | Heading CTA | PageHeading | Text: "4 orders since 2013" |
| 2 | Order cards, newest first | **Four Column CTA** | Default | Per card: Image = shoe, Title = "Cascadia 16", Text = "Ordered May 3, 2022 · Order #BR-2022-05873 · Size 10.5 · $130 · Delivered", Link = "Buy again" (pointing to the Cascadia 20, since older versions are discontinued) |

Four orders fit Four Column CTA's four slots exactly, so no code is needed. **See recommendation 2** for the alternative.

### 3. Gear recommendations (`/my-account/gear-recommendations`)

| # | Section | Component | Variant | Content |
|---|---|---|---|---|
| 1 | "Gear Recommendations" | Heading CTA | PageHeading | — |
| 2 | **New:** top pick | Promo CTA | Default | Eyebrow "Recommended for you", Title "Cascadia 20", Text "You've run four generations of Cascadia since 2013. Version 20 is the biggest update yet: Vibram MegaGrip with 4 mm lugs, nitrogen-infused DNA Flash v2 cushioning, a more open mesh upper, and TrailAdapt.", Image `cascadia-20-mens.jpg`, Link "Shop Cascadia 20", Link2 "Compare to my Cascadia 16" → order-history |
| 3 | "Find the perfect shoe for you" panel (from the screenshot) | Promo CTA | Default | Runner photo, "Try Shoe Finder" |

### 4–6. Addresses, Payment methods, Settings

These pages aren't in the screenshots, so each gets a Heading CTA (PageHeading) plus one Rich Text block of demo content:

- **Addresses:** one default shipping address (fictional)
- **Payment methods:** "Visa ending 4242, expires 08/28"
- **Settings:** email preferences, preferred units (mi/km), "Run Club member"

---

## Recommendations

### 1. Sidebar navigation: new variant — ✅ Option A chosen (2026-10-26)

The existing **Navigation** rendering is hard-wired as the horizontal header menu, with the hamburger and `navigation-horizontal` class. It has no vertical layout and no active-page state.

| Option | Work | Result |
|---|---|---|
| **A. Add a `Vertical` variant to `Navigation.tsx` (recommended)** | About 40 lines of TSX plus a small SCSS block. It renders the same `Fields` tree as a vertical list and marks the item whose `Href` matches the current route. One shared datasource is placed on all six pages, rooted at `my-account`. | Navy active row, as in the screenshot. Adding a page updates the menu automatically. |
| B. No code: Rich Text link list | Six separate Rich Text datasources, one per page, each with the current link bolded | Works, but the active state is a manual bold rather than a navy bar, and adding a page means editing all six |

The new variant also needs a Variant Definition (`Vertical`) under the site's Headless Variants → Navigation.

### 2. Order history: Four Column CTA now, a component later if needed

Four Column CTA covers the four-order requirement without code. A dedicated **Order History** component (with an order header, status, line items and Buy again/Review buttons) is only worth building if the demo needs more than four orders or a table-style layout. I don't recommend it for this request.

---

## Images

| Need | Have it? |
|---|---|
| Cascadia 20 (men's) | ✅ `images/category-selected/cascadia-20-mens.jpg` (already uploaded for the category page) |
| Cascadia 8, 11, 14 and 16 product shots | ✅ Supplied 2026-10-26 and staged as JPGs in `images/my-account/` (the AVIF and WebP originals were converted). All four kept as supplied. |
| Runner photo for the Shoe Finder panel | ✅ A lifestyle image from `images/lifestyle-selected/` can stand in |
| Run Club QR code / badge | Optional; leave out |

---

## Open questions

1. ~~Men's or women's?~~ **Men's.** The recommendation uses `cascadia-20-mens.jpg`.
2. ~~Shoe size?~~ **10.5.**
3. ~~Sidebar: option A or B?~~ **Option A: new `Vertical` Navigation variant.**
4. ~~Images?~~ **Supplied.** All four kept as supplied.

## Build order (once approved)

1. Create the `my-account` page and its 5 child pages (Page template), and set NavigationFilter on `my-account`
2. Add the Column Splitter plus the sidebar Rich Text and navigation on each page
3. Create datasources under `my-account/Data` (`MA_-_*`) and place the components listed above
4. Add the `Navigation` `Vertical` variant and SCSS, run generate-map, add the Variant Definition
5. Upload any supplied shoe images to `Project/Fitness/BrooksRunning/My Account`
6. Update `manual-tasks.md` and `variant-checklist.md` (PageHeading ×6, Navigation → Vertical, header account-icon link)

**Layout risk:** Heading CTA and Promo CTA wrap their content in `container container-wide`. Inside a 9/12 column this may add extra padding, which I'll check in the preview. If it does, the fix is an SXA style on the column rather than a code change.
