# Autonomous WoC Agents — Operating Manual

This file is the source of truth for all autonomous agents working in this repository.

Mandatory companion policy:
- `RULEBOOK.md` is required reading and enforcement for every run.
- `DESIGN-EXCELLENCE-CHECKLIST.md` is required for UI/design sign-off on every generated site.
- If any `RULEBOOK.md` hard gate fails, task closure is not allowed.
- `RULEBOOK-COMPLIANCE-REPORT.md` must be used for final handoff evidence.

## Mission

Generate high-quality client websites in minutes from a short brief, with:
- TinaCMS content modeling
- Tina visual editing compatibility
- TinaCloud authentication for admin editing
- zero broken schema/query contracts
- premium, client-specific visual quality (non-template output)

## Mandatory Skill Stack (Load Before Design/Build)

For any website generation or redesign task, agents must load and apply:
- `high-end-woc-infrastructure`
- `woc-design`
- `woc-builder`
- `frontend-design`
- `designing-beautiful-websites` (installed from `skills.sh`)
- `vercel-react-best-practices`
- `web-design-guidelines` (installed from `skills.sh`, required final review)

If these skills are not loaded, the task is not ready for implementation.

## North-star Gate (Mandatory Before Task Closure)

Every agent must pass this gate before declaring work complete.

Primary motive for this directory/workspace:
- Build an autonomous website-building system that ships client-ready sites in minutes.
- Keep Tina schema/content/rendering deterministic, safe, and non-breaking.
- Ensure editors can authenticate in TinaCloud and publish changes that create real GitHub commits.

Required right-path checks:
1. Does the change improve generation speed, CMS safety, or editor publishing reliability?
2. Does the implementation avoid hardcoded, non-editable runtime content?
3. Are schema keys aligned across `tina/config.ts`, content files, and TSX reads?
4. For hosted mode, do these checks pass: `npm run mode:check`, `npx tinacms build`, `npm run build`?
5. If save/publishing behavior changed, was a real remote commit hash verified on GitHub?

If any answer is "no", the task remains open.

## Canonical Build Target

- Build target is `woc-starter-v2/`.
- This repository now standardizes on a single implementation path (`woc-starter-v2/`).

## TinaCMS Non-Negotiables

1. `tina/config.ts` must remain deterministic.
   - No `Date.now()`, `Math.random()`, or runtime-dependent schema shape.
2. Every editable value must be declared in Tina schema first.
3. Field names must match across all three locations:
   - schema field `name`
   - TSX data reads
   - markdown/json keys
4. Visual editing requires server + client split when editing page content:
   - server fetch: `query`, `variables`, `data`
   - client re-hydration: `useTina({ query, variables, data })`
   - runtime render must read from `useTina` returned `data` (not stale server object)
   - if multiple Tina queries/hooks are present on a page, provide
     `experimental___selectFormByFormId()` and select the page document form ID
     (ex: `content/pages/${variables.relativePath}`)
5. Collections must use explicit `match.include` for each page file.
6. Any route with editor forms must not break if a page is missing; return `notFound()` safely.
7. Empty Tina sidebar means visual-editing contract failure; do not close task until fields appear.

## Authentication Modes (TinaCloud)

Use one of these modes explicitly per project.

### Mode A: TinaCloud Hosted (default for this repo)

- Keep in `tina/config.ts`:
  - `clientId: process.env.TINA_CLIENT_ID ?? ""`
  - `token: process.env.TINA_TOKEN ?? ""`
- Use scripts:
  - `dev`: `tinacms dev -c "next dev"`
  - `build`: `tinacms build && next build`
- Admin path: `/admin/index.html`

### Mode B: Self-hosted Content API + TinaCloud Auth Provider (advanced)

Only use when explicitly requested.

Required additions:
- `@tinacms/auth`
- Tina backend route using `TinaCloudBackendAuthProvider`
- `contentApiUrlOverride: "/api/tina/gql"` in `defineConfig`
- `admin.auth.useLocalAuth` controlled by `TINA_PUBLIC_IS_LOCAL`
- Public env var: `NEXT_PUBLIC_TINA_CLIENT_ID`

## Agent Execution Pipeline

### Step 1 — Intake

Collect:
- site type, niche, target users
- services/offers
- differentiators, stats, testimonials
- pages needed (default: home/about/services/contact)
- tone and visual direction
- CTA and contact details

### Step 2 — Design Direction

- Run `woc-design` (or inline equivalent) and produce a Design Spec.
- Identify one explicit Surprise Element.
- Apply `frontend-design` + `designing-beautiful-websites` standards while shaping concept, typography, layout rhythm, spacing scale, and motion intent.

### Step 2.5 — High-End Design & UX Gate (Mandatory)

Before coding, confirm:
- visual concept is specific to this client (not profile-default language)
- hero creates a strong first-3-second impression
- page rhythm alternates visual weight (no monotone stacking)
- typography has clear hierarchy and brand character
- typography density is controlled (no congested headline/body blocks)
- content line-length and spacing are readable on desktop and mobile
- motion is purposeful and restrained (no decorative-only animation)
- mobile readability and CTA clarity are preserved

If any item fails, redesign before implementation.

### Step 2.6 — Anti-Congestion Rules (Mandatory)

When implementing generated designs:
- limit main paragraph line length to readable measure (`~45–80` characters)
- avoid oversized heading blocks that crowd the viewport
- maintain group spacing rule: more space between groups than inside groups
- avoid large copy overlays with low contrast on busy imagery
- ensure CTA buttons remain visible and not visually merged with surrounding text

If any anti-congestion rule fails, implementation is not ready.

### Step 3 — Schema-First Build

For each page:
1. define fields in `tina/config.ts`
2. create matching content file in `content/pages/*.md`
3. implement TSX reading the exact same keys

Always keep `content/settings/global.json` aligned with `BaseLayout` requirements.

### Step 4 — Rendering + Editing Contract

For page rendering patterns that need visual editing:
- server component fetches Tina query
- client component uses `useTina`
- if multiple forms are possible, explicitly select page form with
   `experimental___selectFormByFormId()`

For static shell pages, ensure upgrade path to visual editing remains clear and non-breaking.

### Step 5 — Validate Before Handoff

Run:
- `npm run dev` (admin reachable)
- `npm run verify:visual-editing` (fails if editable routes miss server/client `useTina` contract)
- `npm run build` (schema/codegen/build clean)
- apply and document `DESIGN-EXCELLENCE-CHECKLIST.md` checks

Also enforce:
- high-end design rubric score `>= 22/30` (brand specificity, hierarchy, typography, rhythm, conversion clarity, motion restraint)
- enhanced release target `>= 26/30` for production handoff
- Next.js/React best-practice checks from `vercel-react-best-practices` (especially async waterfalls, bundle size, and client/server boundaries)
- run `web-design-guidelines` review against edited routes/components before closure
- no regressions against Tina editability or `useTina` runtime contract

CI requirement:
- `verify:visual-editing` is a required pre-build gate in CI.
- If it fails, do not proceed to merge or deploy.

Definition of done:
- no schema/key mismatch
- all page links are route links (no orphan anchors)
- no missing image/content keys that crash rendering
- Tina visual editing sidebar shows correct form fields on each editable page
- mandatory skill stack usage is evidenced in handoff report
- design rubric and React/Next best-practice evidence are documented in handoff report
- `web-design-guidelines` findings and fixes are documented in handoff report

## File Boundaries for Agents

### Usually editable

- `woc-starter-v2/src/app/**/*.tsx`
- `woc-starter-v2/content/pages/*.md`
- `woc-starter-v2/content/settings/global.json`
- `woc-starter-v2/tina/config.ts`
- `woc-starter-v2/src/app/globals.css`

### Do not edit unless required

- `woc-starter-v2/tina/__generated__/`
- shared UI primitives under `woc-starter-v2/src/components/ui/`

## Remove/Ignore Unhelpful Patterns

- Ignore generic Next.js starter README content.
- Avoid hardcoded page copy in TSX.
- Avoid design decisions inside schema files.
- Avoid one-off field names that cannot scale to CMS updates.

## Quality Bar

- Fast first draft (minutes), but schema-safe.
- Production-safe defaults over flashy one-offs.
- High-end, client-specific visual direction over generic component assembly.
- Best-practice React/Next.js implementation quality must hold alongside design quality.
- Every generated site remains editable by non-technical users in Tina admin.
