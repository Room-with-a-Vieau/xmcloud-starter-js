# Booth University College — Manual Tasks

Page: `/sitecore/content/Education/BoothUniversityCollege/Home`
Every datasource below already exists under `Home/Data` and is filled in. In Pages you only place components and pick datasources.

## 1. Assemble the Home page in Pages (~10 min)

Open **Home** in Pages. Everything goes in the main content area (`headless-main`).

### 1a. Remove the Prospera components (9)

Select each one on the canvas and delete it:

- [ ] Carousel (top slider)
- [ ] Promo CTA ×3
- [ ] Three Column CTA
- [ ] Two Column CTA
- [ ] Article List
- [ ] Documents List
- [ ] App Promo

Keep **Five Column CTA**. It's reused in step 1b.

### 1b. Build the page top to bottom

For each row: add the component (if it isn't already there), click it, then **Datasource → Change datasource →** choose the item.

| # | Component (Pages name) | Datasource item (`Home/Data/…`) | Variant |
|---|---|---|---|
| 1 | Hero | `Booth UC - Hero` | Default |
| 2 | Stats Counter | `Booth UC - Stats Counter` | Default |
| 3 | Features | `Booth UC - Features` | Default |
| 4 | Heading CTA | `Booth UC - Heading CTA - Academics` | Default |
| 5 | Five Column CTA (already on the page; move it here) | `Booth UC - Five Column CTA` | Default |
| 6 | CTA Banner | `Booth UC - CTA Banner - Recent News` | Default |
| 7 | Heading CTA | `Booth UC - Heading CTA - Upcoming Events` | Default |

- [ ] Every new component you drag in makes Pages create its own placeholder datasource (e.g. `Hero 1`). After you switch to the `Booth UC - …` item, delete those placeholders from `Home/Data` (Content Editor) so authors don't pick them later.
- [ ] **Five Column CTA must be rewired.** It currently points at a Prospera item outside this site, so it shows Prospera content until you change it.
- [ ] **CTA Banner background:** the live site's news band is crest red. If the banner renders white, open the component's **Styles** and pick the accent/colored background style.

## 2. Header (partial design)

- [ ] Set the Header variant to **WithLogoImage**.
- [ ] Logo: `/sitecore/media library/Project/Education/BoothUniversityCollege/booth-logo-white` (white crest + wordmark, meant for the navy hero).
- [ ] Nav is built from the page tree. It still shows Prospera pages (Personal, Business, Retirement planning, Articles, Get a loan, …). To match Booth, rename or hide them so the top level reads **About, Admissions, Programs, Students, Library, News and Events**.

## 3. Footer (partial design)

The footer datasource is shared site content. Update it in Pages or Content Editor and set the variant to **WithSocials**:

| Field | Value |
|---|---|
| Image1 (logo) | `booth-logo-white` (same media item as the header) |
| Text1 | 290 Vaughan Street, Winnipeg, Manitoba R3B 2N8 CANADA |
| Text2 | Links: [Contact Us](https://boothuc.ca/about/our-people/contact-us/), [Land Acknowledgement](https://boothuc.ca/about/our-story/land-acknowledgement/), [Unsubscribe](https://boothuc.ca/news-and-events/news/unsubscribe/) |
| Text4 | Booth University College is authorized to grant degrees, diplomas, and certificates of standing by the Province of Manitoba through The Degree Granting Act and The Salvation Army William and Catherine Booth University College Incorporation Act. |
| Copyright | © 2026 Booth University College |
| SocialLink1–3 | [Facebook](https://www.facebook.com/BoothUC/), [Instagram](https://www.instagram.com/booth_uc/), [LinkedIn](https://www.linkedin.com/school/booth-university-college) (only three slots, so YouTube is dropped) |

## 4. Page metadata

- [ ] Home's `Title` is still **"PLAY! Financial"** and `NavigationTitle` is **"Financial"**. Set them to **Booth University College** / **Home**.

## 5. Link verification

All links point at the live boothuc.ca and were taken from its page code:

- [ ] Hero / Features → https://boothuc.ca/programs/explore-programs/
- [ ] School tiles → `boothuc.ca/programs/our-schools/view-school/…`. The Graduate Studies tile goes to the MBA program page, the same as on the live site.
- [ ] Recent News → https://boothuc.ca/news-and-events/news/
- [ ] Upcoming Events → https://boothuc.ca/news-and-events/events/

## 6. Things the template components can't show

These are the gaps you accepted in the build plan, so you can explain them in the demo:

- Hero has no search box and no wave divider.
- Stats show plain numbers instead of crest badges, and there's no "Why Booth UC?" button.
- The "Your Path" rows have one shared "Explore Programs" link instead of a link list per row.
- Recent News is a single story (Booth UC Sunday), not a slider.
- Upcoming Events is just a heading and a button. The live site had no events listed when captured.

## 7. Personalization (optional)

To show different content to different audiences, create extra datasource items in `Home/Data` named `Booth UC - <Component> - <Segment>`. For example, `Booth UC - Hero - Salvationist Students` or `Booth UC - Hero - Continuing Studies`. Then in Pages, select the component → **Personalize** → add a condition → assign the item.
