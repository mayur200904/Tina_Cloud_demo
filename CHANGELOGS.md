# Changelog — WoC Starter Template

Changes to the `woc-starter` template and the `woc-builder` agent skill.

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
