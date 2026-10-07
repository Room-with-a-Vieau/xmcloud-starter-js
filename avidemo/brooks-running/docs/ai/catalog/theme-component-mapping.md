# Theme-to-Component Mapping Guide (Prospera component library)

How an extracted client theme (`docs/ai/themes/<client-kebab>.theme.yaml`) is applied to this
app, and how the theme's `tone` fields drive variant selection in Phase 2.

The previous version of this guide described a different component library (`uiim`,
`--brand-*` variables in `globals.css`). Prospera components do **not** read `--brand-*`;
they read the per-site tokens below.

## 1. How Prospera themes work

| Piece | File | What it holds |
|---|---|---|
| Color + shape tokens | `src/assets/sass/abstracts/vars/_colors.scss` | One block per theme class: `.site-financial`, `.site-services`, … |
| Font family | `src/assets/sass/base/fonts/_fonts.scss` | `--font-family` per theme class + the Google Fonts `@import` |
| Theme selection | `src/lib/site-theme.ts` | Maps the Sitecore **site name** (`page.siteName`) to a theme class |

The layout puts the theme class on `<body>`, so every component picks up the tokens.

## 2. Brand palette → Prospera tokens

The extract-theme skill still produces the generic `--brand-*` palette (`cssVariables` in the
theme YAML). Map it to Prospera tokens like this:

| Prospera token | From theme | Notes |
|---|---|---|
| `--text-body` | `--brand-fg` | body copy color |
| `--text-body-inverted` | `--brand-primary-foreground` | text on saturated backgrounds |
| `--text-colored` | `--brand-primary` | headings/links in brand color |
| `--text-accent` | `--brand-accent` | eyebrows, accents |
| `--text-footer` | `--brand-footer-fg` | |
| `--bg-body` | `--brand-bg` | page background |
| `--bg-main` | `--brand-muted` | tinted section background |
| `--bg-main-alt` | `--brand-muted` | alternate tinted background |
| `--bg-color` | lightened `--brand-primary` (or `--brand-secondary` if light) | soft brand fill |
| `--bg-saturated` | `--brand-primary` | buttons, strong bands |
| `--bg-accent` | `--brand-accent` | |
| `--bg-footer` | `--brand-footer-bg` | |
| `--border-color` | `--brand-border` | |
| `--hr-color` | `--brand-bg` | |
| `--roundness` | `--brand-radius` (or `--brand-card-radius`) | `0` for square brands |
| `--font-family` | `--brand-body-font` (heading font if only one) | in `_fonts.scss` |

## 3. Applying a client theme (Phase 4)

Do this **only in the customer copy** (`avidemo/<customer-folder>/`), never in `avidemo/prospera`.

1. **Tokens** — append a light block to `_colors.scss`, named after the client:
   ```scss
   // <Client name>
   body.site-<client-kebab>,
   .site-<client-kebab> {
     --text-body: …;
     /* …all tokens from the table above… */
     --roundness: …;
   }
   ```
   Add a matching `.dark` block only if the demo needs dark mode (copy the light values with
   swapped body/background colors).
2. **Fonts** — in `_fonts.scss`, add the client's Google Fonts family to the `@import` URL and:
   ```scss
   .site-<client-kebab> { --font-family: '<Font>', Helvetica, Arial, sans-serif; }
   ```
3. **Theme selection** — in `src/lib/site-theme.ts`, add `'<SiteName>': 'site-<client-kebab>'`
   to `SITE_THEME_CLASS_MAP` **and** set `DEFAULT_SITE_THEME_CLASS = 'site-<client-kebab>'`.
   `<SiteName>` is the Sitecore site definition name (`SiteName` on
   `Settings/Site Grouping/<site>`), which skinned-demo-setup sets to the customer system name.
4. Record `themeDelivery: "site-theme-class"` in `demo-progress.yaml`.

## 4. Variant selection from `tone`

Variants are named React exports (see `variants` in `component-registry.yaml`). Selection is a
manual step in Pages (see the variant checklist), so these rules only choose what goes on that
checklist.

| Component | Observation / `tone` value | Variant |
|---|---|---|
| Carousel / Hero / HeroBanner | `tone.heroStyle: full-bleed-image` or rotating slides | `Carousel` (`Default`) if slides, else `Hero` |
| | `tone.heroStyle: split-image-text` | `HeroBanner` |
| | `tone.heroStyle: centered-overlay` / `minimal-text` | `Hero`, or `ParallaxBanner` for a mid-page band |
| CtaBanner | image dominates the band | `LargeImage` |
| PromoCta | text over a background image | `WithBackgroundImage` |
| HeadingCta | centered section intro | `Centered`; page title block → `PageHeading`; slim strip → `Compact` |
| ThreeColumnCta | icon tiles | `WithIcons` (small tiles → `WithIconsCompact`) |
| Quote | no author block | `Simple` |
| Questions | single column | `SingleColumn` |
| ArticleList | 3 cards across | `ThreeColumn`; dense grid → `Grid`; compact list → `Simplified` |
| Header | image logo | `WithLogoImage` |
| Footer | social icons | `WithSocials` |

When `tone.cardStyle` is `flat`/`square`, prefer `--roundness: 0`; `rounded` → `0.75rem`–`1rem`.
