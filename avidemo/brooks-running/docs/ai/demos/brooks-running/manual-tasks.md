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

## My Account section (`/my-account`, built 2026-10-26)

Plan: `my-account-plan.md`. Pages: Dashboard (`/my-account`) plus order-history, gear-recommendations, addresses, payment-methods and settings. Every page uses a Column Splitter (3/9, gray sidebar). The sidebar holds the shared Rich Text `my-account/Data/MA_-_Sidebar_Header` and a Navigation rendering (root `my-account`, AddRoot, level 1, Flattened). The Run Happy strip at the bottom uses the shared `Brooks Running - Run Happy Promise` item with the Compact variant. Layouts, variants and styles were all set through Authoring GraphQL, so nothing has to be done in Pages.

### 1. Deploy the rendering host (required)
The sidebar uses the new **Navigation → Vertical** variant (`src/components/navigation/Navigation.tsx` + `_component-navigation-vertical.scss`). Until the `brooks-running` rendering host is redeployed, Pages and the live site show an orange "missing React implementation" box in its place.

### 2. Publish
Nothing is published yet: the 6 pages, their `Data` folders, the 2 new variant definitions (`Headless Variants/Navigation/Vertical`, `Headless Variants/Heading CTA/PageHeading`) and the 4 images in `Project/Fitness/BrooksRunning/My Account`.

### 3. Header account icon
The header has no account icon. To link to My Account, add a link to `/my-account` in the Header partial design. My Account has NavigationFilter set, so it stays out of the top nav.

### 4. Link check
"Shop Cascadia 20" points to `https://www.brooksrunning.com/en_us/cascadia-20-mens-trail-running-shoe/`, which is a best guess. The Run Club, events and Shoe Finder links are also guesses. "Log out" goes to Home.

### 5. Local preview
`.env.local` has empty values for `SITECORE_EDGE_CONTEXT_ID` and `SITECORE_EDITING_SECRET`, so `npm run dev` fails with MV-007. The pages were checked with Pages screenshots instead.

### Not reproduced
The Run Club badge beside "Welcome", the membership QR code, and the light-aqua announcement strip.

**Update 2026-10-26:** the images are done. The user supplied AVIFs, which were converted to JPEG/PNG and uploaded to `Project/Fitness/BrooksRunning/Its Your Run` (IDs in `images/its-your-run/image-manifest.json`), then assigned to all fields. Section 1 above is complete.
The 3rd Hero's title overlapped the lettering in its photo. The caption now lives in a new Heading CTA under it (`IYR_-_Heading_Not_Serious`), and that Hero's Title is blank.
Variants (section 2) are still open.
