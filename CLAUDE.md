# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository. This file was read and updated by a human on Wednesday, Oct 7, 2026. Or at least, everything above "Architecture."

## Repository Overview

A working fork of the Sitecore **XM Cloud Front End Application Starter Kits**, used to build and demo custom XM Cloud head applications for client work. XM Cloud is not SitecoreAI CMS.

- `/avidemo/` — Custom head apps for demos and client work. **New head apps go here.**
- `/examples/` — Reference starters this fork was seeded from; kept as-is for reference and copying. Treat a new head app under `/examples` as misplaced, not out-of-scope.
- `/authoring/` — Serialized Sitecore items (`authoring/items/**/*.module.json`, one module per site) and platform code
- `/local-containers/` — Docker setup for a local Sitecore CM. Not used as of last human edit to this file.
- `xmcloud.build.json` — XM Cloud deploy config: one `renderingHosts` entry per app, toggled with `enabled`
- `sitecore.json` — Sitecore CLI root config (serialization modules, plugins)

**Custom head apps (`/avidemo`):** 
`prospera` (rendering host `prosperabank`) is used as a template for future apps & sites. It was copied from the following repo: https://github.com/sc-jzi/prospera

`guidestone` & `cooley` are the other two custom head apps, both based on prospera. Each is a Content SDK App Router app using `next-intl`, and each ships its own `CLAUDE.md` → `AGENTS.md`, `.cursor/rules/`, `Skills.md`, and `.agents/skills/`. `avidemo/README.md` covers adding a new demo and the checklist before sharing one with a client.

**Reference starters (`/examples`):**
- `basic-nextjs` — Minimal Next.js starter
- `basic-nextjs-pages-router` — Pages Router variant (deploy disabled)
- `kit-nextjs-article-starter` — **Solterra & Co.**, editorial lifestyle brand
- `kit-nextjs-location-finder` — **Alaris**, car brand with location finder
- `kit-nextjs-product-listing` — **SYNC**, audio gear product listing
- `kit-nextjs-skate-park` — Component showcase
- `basic-spa` — Angular SPA + Node proxy, a separate pnpm workspace (deploy disabled)

The kits use Tailwind + Shadcn/ui, personalization via URL parameters, component variants, and `en`/`en-CA` localization via `next-localization`.

**Stack:** Next.js 16 (App Router everywhere except `basic-nextjs-pages-router`), Sitecore Content SDK 2.x (`@sitecore-content-sdk/nextjs`), TypeScript strict, Tailwind with container queries, Shadcn/ui, Framer Motion, Lucide.

## Guidance Precedence

This file is the default for the whole repo. A head app under `/avidemo/<app>` ships its own guidance, and where that guidance is more specific it **wins for that app** — including its choice of libraries and component-file layout. Read the app's own files before applying the component conventions below to code inside it. This file still governs repo structure, safety rules, and deployment, and is the sole source for `/examples`. Cursor equivalents live in `.cursor/rules/`.

## Commands

There is no root `package.json`. Every app is standalone (own `package.json`, no monorepo linking — copy shared utilities, don't import across apps). Run commands from inside the app's folder.

```bash
cp .env.remote.example .env.local   # then fill in the env vars below
npm install
npm run dev                         # generate-map + sitecore-tools build, then next dev + map watcher in parallel
npm run build                       # generate-map → sitecore-tools build → next build (what XM Cloud deploy runs)
npm run lint                        # ESLint over src/
npm run sitecore-tools:generate-map # regenerate .sitecore/component-map.ts
```

Only the `/examples` Next.js kits have tests and extra checks. The `/avidemo` apps currently ship only `dev`/`build`/`lint`/`start`.

```bash
npm run type-check                  # tsc --noEmit
npm run format:check                # prettier (not in every kit)
npm test                            # jest (next/jest, config in jest.config.js)
npm run test:unit                   # jest, excluding the geo suite
npm run test:geo                    # only GEO/AI-crawler tests
npx jest path/to/File.test.tsx      # single file
npx jest -t "test name"             # single test by name
```

Required env vars: `SITECORE_EDGE_CONTEXT_ID`, `NEXT_PUBLIC_SITECORE_EDGE_CONTEXT_ID`, `NEXT_PUBLIC_DEFAULT_SITE_NAME`, `SITECORE_EDITING_SECRET`.

## Architecture

**Routing:** `src/app/[site]/[locale]/[[...path]]/page.tsx` is the catch-all. It fetches layout data in a Server Component through `src/lib/sitecore-client.ts`, calls `notFound()` for missing routes, and uses `draftMode()` plus editing search params for preview and the Pages editor. Only `basic-nextjs-pages-router` uses `src/pages/[[...path]].tsx`.

**Request pipeline:** `src/proxy.ts` (Next 16's replacement for `middleware.ts`) chains Content SDK proxies with `defineProxy(...)` from `@sitecore-content-sdk/nextjs/proxy`: `LocaleProxy`, `AppRouterMultisiteProxy`, `RedirectsProxy`, `PersonalizeProxy`.

**API routes:** `src/app/api/**/route.ts`, built from Content SDK helpers in `@sitecore-content-sdk/nextjs/route-handler` (e.g. `createRobotsRouteHandler`, sitemap, editing).

**Component registration:** `sitecore-tools project component generate-map` scans `src/components` and writes `.sitecore/component-map.ts`, which maps Sitecore rendering names to modules. Each named export of a component file (`Default`, `ThreeUp`, `ImageBottom`, ...) becomes a rendering variant. Anything that is not a rendering must be listed in `componentMap.exclude` in the app's `sitecore.cli.config.ts`: `ui/**`, `atoms/**`, `content-sdk/*`, and sidecar files (`**/*.props.ts(x)`, `*.util.ts`, `*.schema.ts`, `*.context.ts`, ...). After adding or renaming components or sidecars, rerun `generate-map` and check that `.sitecore/component-map.ts` contains no sidecar registrations.

**Content SDK imports.** Use the wrong submodule and the build breaks:

| Where | Import from |
| --- | --- |
| Components (client or server) | `@sitecore-content-sdk/nextjs` only (`Text`, `RichText`, `Image`, `Link`, `Field`, `ImageField`, `LinkField`, `useSitecore`, `Placeholder`, ...) |
| `src/lib/sitecore-client.ts` and server utilities | `/client` (`SitecoreClient`) |
| `src/proxy.ts` | `/proxy` |
| `src/app/api/**/route.ts` | `/route-handler`, `/editing` |
| `sitecore.config.ts` | `/config` |
| `sitecore.cli.config.ts` | `/config-cli`, `/tools` |

Never import `/config`, `/config-cli`, `/tools`, or `/client` in a component. Don't import the Content SDK in `next.config.*`.

## Component Conventions (`/examples` kits)

`/avidemo` apps may organize components differently; follow their own guidance.

**Layout:** kebab-case directory, PascalCase main file, props in a sidecar:

```
src/components/hero/
  Hero.tsx          # rendering logic + exported variants (Default, ImageBottom, ...)
  hero.props.ts     # HeroParams, HeroFields, HeroProps (extends ComponentProps from @/lib/component-props)
```

Avoid splitting variants into `.dev.tsx` files unless the component is too large to maintain otherwise. Name types `HeroProps`, `HeroFields`, and `HeroParams`. Params use `[key: string]: any` for flexible rendering parameters.

**Field shape varies:** some renderings receive flat fields (`fields.titleRequired`), while GraphQL-datasource renderings receive `fields.data.datasource.<field>.jsonValue`. Check the component's props file rather than assuming.

**Rendering rules:**
- Content can be missing at any level, so destructure and access defensively (`fields?.data?.datasource`, `const { x } = fields || {}`). Never write `fields.data.datasource.title` unguarded.
- Return `<NoDataFallback componentName="Hero" />` (`@/utils/NoDataFallback`) when the datasource is missing.
- Render fields with the Content SDK field components (`Text`, `RichText`, `Image`, `Link`) so inline editing works. Use the SDK's `NextImage` for XM Cloud media, not `next/image` directly.
- Exported variants read `useSitecore().page.mode.isEditing` and pass it down as `isPageEditing`. In editing mode, render empty fields anyway so authors can fill them in: `(title?.value || isPageEditing) && <Text field={title} />`.
- Reuse kit helpers: `cn()` from `@/lib/utils`, `Default as ImageWrapper` from `@/components/image/ImageWrapper.dev`, `ButtonBase` from `@/components/button-component/ButtonComponent`, and Shadcn components from `@/components/ui/`.
- i18n in the kits: `useI18n` from `next-localization` with keys from `@/variables/dictionary` (`dictionaryKeys.HERO_SubmitCTALabel`).
- Use container-query Tailwind classes (`@container`, `@md:`). Interactive components need `'use client'`, ARIA attributes, and a `prefers-reduced-motion` check for animation.

**Tests:** Test each component with and without a datasource, in editing mode, and for every exported variant. Mock data must match the XM Cloud field shape (`{ value, editable }`). Mocks and helpers live in `src/__tests__/mocks` and `src/__tests__/test-utils`. Consider Design Library, Pages editor, preview, and hosted (Vercel) rendering.

## Safety Rules

**Never edit generated files:** `node_modules/`, `.next/`, `dist/`, `out/`, `build/`, `.cache/`, `.sitecore/` (except `component-map.ts`), lock files, and source maps.

**Avoid editing:** `scjssconfig.json`, `.sitecore/user.json`, `Dockerfile`, `docker-compose*.yml`, `.github/workflows/`, and deployment configs.

**Never modify:** `*.itempackage`, `*.sicpackage`, archives (`*.tgz`, `*.zip`), and binaries.

**Environment files:** Never commit `.env.local`, `.env.*.local`, or `*.deploysecret.config`, and ask before editing them.
