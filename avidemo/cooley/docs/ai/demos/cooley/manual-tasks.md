# Cooley — Manual Tasks

Page: `/sitecore/content/Legal/Cooley/Home` (open it in Pages).

## 0. Deploy the theme first
The Cooley theme lives in code (`avidemo/cooley`). Commit and push, then redeploy the **cooley** editing host and rendering host. Until then, Pages shows Cooley content in Prospera's styling.

## 1. Variant Selection
Done: Heading CTA is set to Compact (you set it on v3; carried into v4).

## 2. Context-Only Components
- **Header logo:** done. The Header partial design now uses the WithLogoImage variant with the Cooley wordmark (`/sitecore/media library/Project/Legal/Cooley/cooley-logo-red`). The old "PLAY! finance" Rich Text in `header-left` is no longer rendered by this variant.

## 3. Cleanup
**Leftover Prospera components:** removed in Home **version 4** (version 3 is kept as a fallback). Page order: Hero → Carousel → Heading CTA → Three Column CTA.

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
