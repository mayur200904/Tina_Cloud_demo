# Changelog — WoC Starter Template

Changes to the `woc-starter` template and the `woc-builder` agent skill.
Newest entries are always at the top.

---

## [1.0.2] — 2026-03-19

### TinaCloud + monorepo reliability update (`woc-starter-v2`)

#### Hosted TinaCloud integration stabilized
- Validated full hosted flow on `main` (`mode:check`, `tinacms build`, `npm run build`).
- Confirmed branch/index/schema checks pass when TinaCloud project configuration is aligned.

#### Route-structure fix for Next.js type/build stability
- Moved self-hosted API route from `pages/api/tina/[...routes].ts` to `src/pages/api/tina/[...routes].ts`.
- Removed root `pages/` API route to avoid mixed root/src routing conflicts.
- Eliminated `.next/types/validator.ts` errors caused by duplicate route-root inference.

#### Faster operator validation
- Added `npm run verify:hosted` to run hosted mode checks in one command:
	- `mode:check`
	- `tinacms build`
	- `next build`

#### Operational lessons captured
- In monorepo-style repository layouts, configure TinaCloud project path correctly (Path To Tina) and refresh branch indexing/webhooks when branches are not detected.
- Avoid rerunning `npx @tinacms/cli init` at repository root when project already exists in a subdirectory.

#### Validation outcomes
- `npx tsc --noEmit` ✅
- `npx tinacms build` ✅
- `npm run build` ✅

---

## [1.0.1] — 2026-02-20

### Netlify / static-export hardening

Five fixes backported to the `woc-starter-next` template to ensure every future client project deploys flawlessly out of the box on Netlify (or any static host).

#### `next.config.ts`
- Added `output: 'export'` — generates a fully static `out/` directory, no Node.js server required.
- Added `images: { unoptimized: true }` — disables Next.js image optimisation (incompatible with static export).

#### `netlify.toml` *(new)*
- Tells Netlify to run `npm run build` and publish the `out/` directory.
- Adds a `[[redirects]]` rule so all `/admin/*` routes fall through to `admin/index.html` (TinaCMS admin is a SPA).

#### `package.json`
- Added `"type": "module"` — silences the PostCSS ESM compatibility warning.
- Added `"preview"` script (`npm run build && npx serve@latest out`) for testing the production bundle locally.

#### `src/app/[[...slug]]/page.tsx`
- Imports `notFound` from `next/navigation`.
- Early-returns `notFound()` for any slug segment that contains a `.` (catches stray asset requests, e.g. `.png`, `.svg`, that leak into the catch-all route).
- Wraps the `client.queries.page()` call in `.catch(() => null)`.
- Guards against a missing/empty `pageRes` and returns `notFound()` instead of crashing.

#### `public/vite.svg` *(new)*
- Placeholder SVG so the TinaCMS admin's default favicon request resolves without hitting the catch-all route.

---

## [1.0.0] — 2026-02-20 ⚠️ BREAKING

### Full rewrite — Astro → Next.js App Router

**Stack:** Next.js 16 (App Router) + Tailwind CSS v4 + TinaCMS 3 + TinaCloud

**Why:** TinaCMS visual/contextual editing (`useTina` hook) requires a React-based framework. It is not supported in Astro. This version unlocks the full side-by-side visual editing experience.

**Breaking changes:**
- Template directory renamed: `woc-starter/` (Astro) → `woc-starter-next/` (Next.js)
- All block components: `.astro` → `.tsx` React components
- `BaseLayout.astro` → `BaseLayout.tsx` (uses `useState` for mobile nav)
- `src/pages/[...slug].astro` → `src/app/[[...slug]]/page.tsx` (App Router catch-all)
- CSS location: `src/styles/global.css` → `src/app/globals.css` (same token system, same class names)
- Dev command: still `npm run dev` (tinacms dev -c "next dev")

**Unchanged:**
- `tina/config.ts` — schema is identical
- `content/pages/index.md` — same markdown format
- `content/settings/global.json` — same JSON schema
- All design token variable names (`--color-primary`, etc.)
- All BEM class names (`.woc-hero`, `.btn-primary`, etc.)
- `woc-builder` agent — still writes the same 3 files

#### Visual Editing
- `src/app/[[...slug]]/page.tsx` — Server Component, parallel-fetches page + settings
- `src/app/[[...slug]]/page.client.tsx` — Client Component, wraps `useTina` for live editing
- Admin: `http://localhost:3001/admin/index.html`

---

## [0.1.0] — 2026-02-20

### Initial release

**Stack:** Astro 5 + Tailwind CSS v4 + TinaCMS 3 + TinaCloud

---

#### Block Library

| Block | Layout Variants / Notes |
|---|---|
| `HeroBlock` | image-right, image-left, centered, full-bleed |
| `ServiceGridBlock` | 2 / 3 / 4 column grid |
| `ContentSplitBlock` | image left or right |
| `StatsBarBlock` | renders on primary color background |
| `TestimonialCarouselBlock` | CSS-only auto-cycle, dot navigation |
| `LogoCloudBlock` | greyscale with hover color reveal |
| `FAQBlock` | native `<details>/<summary>` accordion |
| `ContactFormBlock` | Formspree, optional address sidebar |

#### Design Token System
- `src/styles/global.css` — `@theme` block with color, typography, spacing, shape, shadow, nav tokens
- Utility classes: `.btn-primary`, `.btn-secondary`, `.woc-card`, `.woc-container`, `.woc-section`, `.woc-divider`
- Typography scale: `.woc-eyebrow`, `.woc-h1`, `.woc-h2`, `.woc-h3`, `.woc-lead`

#### Layout & Routing
- `BaseLayout.astro` — sticky nav, mobile drawer, footer, Google Fonts injection. All content from TinaCMS `settings`.
- `src/pages/[...slug].astro` — dynamic block renderer mapping TinaCMS `__typename` to Astro components.

#### TinaCMS Schema (`tina/config.ts`)
- `page` collection with 8 block templates
- `settings` global collection: siteName, nav links, nav CTA, social, footer, copyright, Google Fonts URL

#### Content Skeleton
- `content/pages/index.md` — all 8 blocks in order, all values empty
- `content/settings/global.json` — placeholder settings

#### Agent Skill
- `.agents/skills/woc-builder/SKILL.md` — 4-step workflow
- `references/niche-profiles.md` — 4 profiles (Corporate, SMB, Industrial, Startup) with exact CSS tokens and Google Fonts URLs
- `references/block-catalog.md` — block selection logic by niche
- `references/interview-checklist.md` — client intake questions

#### Bug fixes in this release
- Import paths in `[...slug].astro` corrected (`../../` → `../`)
- Removed unused `client` import from `BaseLayout.astro`
- Removed `required: true` from all block-template fields to fix TinaCMS GraphQL union codegen error
