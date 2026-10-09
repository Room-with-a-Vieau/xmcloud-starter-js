# Logix Federal Credit Union — Manual Tasks

Open **Home** of `LogixFederalCreditUnion` (Financial collection) in Pages.

## 1. Remove leftover Prospera components (~1 min)
The Agent API cannot remove components. Delete these from the Home page:

| Where on the page | Component | Datasource |
|---|---|---|
| Top (above the Logix hero) | Carousel | Carousel - Default |
| After "Unlock Exclusive Logix Benefits" | Five Column CTA | Available Services |
| After Five Column CTA | Three Column CTA | Three Column CTA 1 ("Stay in the know") |
| Bottom, after Disclosures | Article List | articles |
| Bottom | Documents List | Documents List 1 |
| Bottom | App Promo | App Promo - Personal |

## 2. Header and footer (partial designs)
- **Header:** set the variant to **WithLogoImage** and the logo to `/sitecore/media library/Project/Financial/LogixFederalCreditUnion/logix-logo`. Update nav labels to Checking & Savings, Credit Cards, Auto & Other Loans, Mortgage & Home Equity, Investments & Insurance, Business.
- **Footer:** keep the **Default** variant (WithSocials only renders 2 columns). Titles: Why Logix? / Our Services / Useful Links / Resources. Copyright: "© 2026 Logix Federal Credit Union. All rights reserved. NMLS ID: 503781. Federally insured by NCUA."

## 3. Rendering host
If an editing host is created later, set `RenderingHost` on `Settings/Site Grouping/LogixFederalCreditUnion` to `logix`.

## 4. Link verification
All CTAs point to live `https://www.logixbanking.com/...` pages (rates, loans, branches, financial-wellness, home-rewards). External: custars.org, logixfcu.coconutcalendar.com, app.logixbanking.com (membership application).

## 5. Personalization (optional)
Create extra datasources under `Home/Data` named `Logix - <Component> - <Segment>` (e.g. `Logix - Hero - First-Time Buyers`), then in Pages: select the component → Personalize → add a condition → assign the datasource.
