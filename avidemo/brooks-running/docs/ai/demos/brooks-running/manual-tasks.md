# Manual Tasks — Brooks Running homepage

## 1. Set variants
See `variant-checklist.md` (4 Heading CTA components → Centered ×3, Compact ×1).

## 2. Remove leftover Prospera components from Home (Pages)
These sit below the Brooks content and cannot be removed via the API:
Carousel, Promo CTA ×3, Five Column CTA, Three Column CTA, Two Column CTA ("Two Column CTA 1"), Article List, Documents List, App Promo (10 total).

## 3. Optional section backgrounds
Brooks uses a warm off-white band behind "Gear built for every run" / tiles / "Ready for the season", and a navy band for the Run Happy strip. If the site's Styles offer background options for these components, apply them in Pages (theme tokens: `--bg-main` = #f8f5f0, `--bg-saturated` = #1b3889).

## 4. Header (partial design)
Header uses the Default (text logo) variant; nav links come from page items. To match Brooks, rename/add top-level pages (New Arrivals, Women, Men, Shoe Finder) or supply the Brooks logo for the WithLogoImage variant.

## 5. Footer
Footer now uses `Brooks Running - Footer` (Default variant, 4 link columns, `#` links). Logo image is empty — add the Brooks logo if you have it. The old `Footer 1`, `Address`, `Contact info` items under Footer/Data are unused.

## 6. Unused placeholder datasources
Adding components via the API auto-created empty datasources under Home/Data that are now unused:
Hero, Heading_CTA, Four_Column_CTA, Hero_2, Heading_CTA_2, Two_Column_CTA_2, Hero_3, Heading_CTA_3, Four_Column_CTA_2, Heading_CTA_4.

## 7. Link verification
All CTAs point to brooksrunning.com; category, reflective, weather-gear, Run Club and Run Happy URLs are best guesses (site could not be crawled). Story cards link to the blog index.

## Personalization (optional)
Create extra datasources in Home/Data named `Brooks Running - <Component> - <Segment>`, then in Pages: select component → Personalize → add condition → assign datasource.

## Category page (/running-shoes)
- Set the **Run Happy** Heading CTA to the **Compact** variant.
- Optional: apply a background style to the series tiles.
- The Breadcrumb reads the page tree (Home / Running shoes); Brooks shows "Home / Running".
- `images/category/` holds the raw 200-file download (third-party retailer images) — keep it out of git; only `images/category-selected/` is needed.
