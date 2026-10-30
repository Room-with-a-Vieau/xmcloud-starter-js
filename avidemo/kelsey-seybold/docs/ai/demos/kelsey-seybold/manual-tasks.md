# Manual Tasks — Kelsey-Seybold Clinic

Site: `/sitecore/content/healthcare/Kelsey-Seybold` · Home page ID `7e5bd7f4-1987-4434-89fc-d3969e27982d`

## Done (2026-10-30)
- Variants set in layout XML: Promo CTA WithBackgroundImage, Heading CTA Compact and Centered.
- The 8 leftover Prospera components were removed from Home; the page order now matches kelsey-seybold.com.
- Header: the "PLAY! finance" rich-text logo and the Header LogoImage now use the Kelsey-Seybold wordmark (`ks-logo` in the Media Library).
- Footer: logo, four link columns (Appointments, Find Us, Services, About Us), legal links and copyright now come from kelsey-seybold.com. The Default variant is kept because WithSocials renders only 2 columns.

## 1. Header navigation
The nav links (Personal, Business, Retirement planning, Articles, Get a loan) come from the copied Prospera page tree. Rename or hide those pages to match Locations / Specialties / About Us / Medicare Advantage / Health Plans.

## 2. Workflow
The two Promo CTA datasources (`Kelsey-Seybold - Promo CTA - …`) were created in the **Draft** workflow state. Approve them before publishing.

## 3. Editing host
Done: the `kelsey-seybold` editing host exists and `RenderingHost` is set. Its 500 (missing search variables) was fixed by hand on 2026-10-30.

## 4. Content gaps to know about
- Section 9 dropped the second "Specialty Care" button (Heading CTA has one link).
- Section 7 article cards have no per-article links (Features has no item link field).
- Booking options link to /make-an-appointment; on the live site they open a scheduling modal.

## 5. Link verification
All links point to kelsey-seybold.com, mykelseyonline.com or seniors.kelsey-seybold.com; `tel:7134420427` for the phone CTA.

## Personalization (optional)
Create extra datasources in `Home/Data` named `Kelsey-Seybold - <Component> - <Segment>` (e.g. `Kelsey-Seybold - Promo CTA - Virtual Specialty CareNOW - Seniors`), then in Pages: select component → Personalize → add condition → assign datasource.
