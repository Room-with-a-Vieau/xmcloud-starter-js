# Variant Selection Checklist — Brooks Running

Open **Home** (BrooksRunning site) in Pages and set these variants. Default-variant components need no action.

| # | Component (position on page) | Current | Needed | Variant item |
|---|---|---|---|---|
| 1 | Heading CTA — "Gear built for every run" (2nd) | Default | Centered | {06B5DEAF-CCE4-4272-8E63-43B8673E0EC3} |
| 2 | Heading CTA — "Ready for the season" (5th) | Default | Centered | {06B5DEAF-CCE4-4272-8E63-43B8673E0EC3} |
| 3 | Heading CTA — "Stories to transform your run" (8th) | Default | Centered | {06B5DEAF-CCE4-4272-8E63-43B8673E0EC3} |
| 4 | Heading CTA — "Take it for a 90-day trial run." (10th) | Default | Compact | {56E7976A-3A27-49F2-B7B5-AB31BD4BB004} |

Steps per component: click it on the canvas → right pane **Design** tab → pick the variant.
Estimated time: ~2 minutes.

## It's Your Run page (`/its-your-run`)

| # | Component (position on page) | Current | Needed | Variant item |
|---|---|---|---|---|
| 1 | Three Column CTA — "Shop in person / Find your run / Check out our blog" (6th) | Default | WithIcons | {D51EFB17-F0D7-4BD3-A7B0-D783A7556EC8} (created 2026-10-23) |
| 2 | Heading CTA — "Take it for a 90-day trial run." (7th) | Centered | Compact | {56E7976A-3A27-49F2-B7B5-AB31BD4BB004} |

## My Account pages (`/my-account` and children)

Nothing to do. The variants were set through Authoring GraphQL (`FieldNames`): page headings → PageHeading {4B26F8A9-6246-41B3-8BB1-DC3ED5067B08} (created 2026-10-26), sidebar Navigation → Vertical {270A2E00-7397-4EE0-9D50-BE819B4E321C} (created 2026-10-26; needs the code deploy), and Run Happy → Compact.

**Update 2026-10-26:** variants were set through the Authoring API (`__Final Renderings` FieldNames). Heading CTA Run Happy → Compact, and the new caption Heading CTA (`IYR_-_Heading_Not_Serious`) → Default.
Three Column CTA was tried as WithIcons, but that variant shrinks the illustrations into small icon circles and drops the buttons. It was reverted to Default, which matches the live page better. The WithIcons Variant Definition item is still there but unused.
