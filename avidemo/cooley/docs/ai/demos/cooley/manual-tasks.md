# Cooley — Manual Tasks

Page: `/sitecore/content/Legal/Cooley/Home` (open it in Pages).

## 0. Deploy the theme first
The Cooley theme lives in code (`avidemo/cooley`). Commit and push, then redeploy the **cooley** editing host and rendering host. Until then, Pages shows Cooley content in Prospera's styling.

## 1. Variant Selection (~1 min)
| # | Component | Current | Needed |
|---|-----------|---------|--------|
| 1 | Heading CTA ("Resources") | Default | **Compact** |

Click the component, open the **Design** tab, and pick the variant.

## 2. Context-Only Components
- **Header logo:** done. The Header partial design now uses the WithLogoImage variant with the Cooley wordmark (`/sitecore/media library/Project/Legal/Cooley/cooley-logo-red`). The old "PLAY! finance" Rich Text in `header-left` is no longer rendered by this variant.

## 3. Cleanup
**Leftover Prospera components on Home:** remove these in Pages. The MCP can't delete them.
- Promo CTA (3 instances: "Promo CTA 1" ×2, "Promo CTA 2")
- Five Column CTA ("Available Services")
- Two Column CTA, Article List, Documents List, App Promo

Once they're removed, the page order is Hero → Carousel → Heading CTA → Three Column CTA, matching the build plan.

**Unused datasource items** under `Home/Data` (safe to delete):
- `Cooley - Carousel` and its 2 slides. The API couldn't wire it (see below), so the Cooley slides went into `Carousel - Default` instead.
- `Cooley_-_Hero_Placement` and `Cooley_-_Resources_Heading_Placement`, auto-created by `add_component_on_page` and replaced with the Cooley items.

## 4. Link Verification
- **Carousel slide 2 (Uber):** links to the Cooley news listing. The exact article URL wasn't captured, so replace it if you want a direct link.
- **Resource cards:** link to cooley.com/hub/pubco, ipogo.cooley.com and cooleygo.com.

## 5. Personalization (Optional)
Create extra datasource items next to the Cooley ones in `Home/Data`, named `Cooley - <Component> - <Segment>` (e.g. `Cooley - Hero - Founders`). Then in Pages, select the component, choose **Personalize**, add a condition, and assign the datasource.

## Known environment issue
The Carousel, Accordion, Questions and Testimonials renderings use branch templates under `/sitecore/templates/Branches/Project/Verticals/`. Those don't exist in this environment, so the Agent API (and possibly Pages' "create new datasource") fails for these components with a 404. Serialize or recreate the branch templates to fix this.
