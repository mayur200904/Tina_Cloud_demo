# Changelog — WoC Starter Template

Changes to the `woc-starter` template and the `woc-builder` agent skill.

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
