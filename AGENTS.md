# Autonomous WoC Agents — Operating Manual

This file is the source of truth for all autonomous agents working in this repository.

## Mission

Generate high-quality client websites in minutes from a short brief, with:
- TinaCMS content modeling
- Tina visual editing compatibility
- TinaCloud authentication for admin editing
- zero broken schema/query contracts

## Canonical Build Target

- Build target is `woc-starter-v2/`.
- `woc-starter-v1/` is legacy reference material only.
- Never mix implementation styles between v1 and v2 in the same client run.

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
5. Collections must use explicit `match.include` for each page file.
6. Any route with editor forms must not break if a page is missing; return `notFound()` safely.

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

For static shell pages, ensure upgrade path to visual editing remains clear and non-breaking.

### Step 5 — Validate Before Handoff

Run:
- `npm run dev` (admin reachable)
- `npm run build` (schema/codegen/build clean)

Definition of done:
- no schema/key mismatch
- all page links are route links (no orphan anchors)
- no missing image/content keys that crash rendering

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
- Every generated site remains editable by non-technical users in Tina admin.