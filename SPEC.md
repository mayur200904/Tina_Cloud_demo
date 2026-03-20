# WoC Starter — Specification

This document governs development of the `woc-starter-next` template itself. It is for contributors maintaining and evolving the template — not for builders using it to build client sites.

---

## What This Repo Is

`woc-starter-next` is a **fork-once template**. Builders copy it per client, run the `woc-builder` agent skill, and ship. The template must stay:

- **Design-agnostic** — zero hardcoded client colors, fonts, or copy anywhere in `.tsx` or `.ts` files
- **CMS-complete** — every piece of user-editable content must be reachable via TinaCMS
- **Non-breaking** — a client editing content through the admin UI cannot break the layout
- **Visually editable** — all pages support TinaCMS side-by-side visual editing via `useTina`

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 (`@theme` token system) |
| CMS | TinaCMS 3 + TinaCloud |
| Language | TypeScript |
| Deploy target | Vercel |

---

## Repository Structure

```
vibesite/                              ← this repo (the WoC platform)
├── SPEC.md                            ← you are here
├── CHANGELOGS.md                      ← template changelog
├── woc-starter-next/                  ← the Next.js template (what gets forked)
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx             ← root layout (imports globals.css)
│   │   │   ├── globals.css            ← design token system only
│   │   │   ├── [[...slug]]/
│   │   │   │   ├── page.tsx           ← Server Component: fetch page + settings
│   │   │   │   └── page.client.tsx    ← Client Component: useTina visual editing
│   │   │   └── admin/page.tsx         ← redirects to TinaCMS static admin SPA
│   │   └── components/
│   │       ├── BaseLayout.tsx         ← nav + footer (useState for mobile menu)
│   │       ├── Blocks.tsx             ← __typename → block component dispatcher
│   │       └── blocks/                ← one .tsx file per CMS block
│   ├── content/
│   │   ├── pages/index.md             ← empty skeleton (no client content)
│   │   └── settings/global.json       ← empty settings skeleton
│   ├── tina/config.ts                 ← CMS schema
│   └── .env.example
└── .agents/
    └── skills/woc-builder/            ← the agent skill for building client sites
        ├── SKILL.md
        └── references/
```

---

## Core Rules for Template Contributors

### 1. Blocks are schema-bound
Every value displayed by a block component **must** be a prop sourced from TinaCMS. No inline strings. No config objects with copy. If text appears on screen, it must be editable in the CMS.

### 2. Design tokens, not inline styles
All visual decisions live in `globals.css` inside the `@theme` block. Block components reference CSS variables only — never hardcoded hex values, pixel sizes, or font names.

### 3. The block/schema contract is strict
The React component prop names must match the TinaCMS field `name` values exactly. Breaking this silently breaks the CMS editing experience without a runtime error.

### 4. The skeleton stays empty
`content/pages/index.md` must contain the full block structure with empty/placeholder values only. It must never contain demo client content. Same for `content/settings/global.json`.

### 5. Schema nullability
Do not use `required: true` on fields that share names across multiple block templates. TinaCMS generates a GraphQL union type — conflicting nullability across the union causes codegen to fail. All block-level fields should be optional at the schema level; validation is the CMS UI's job.

### 6. `use client` boundaries
Mark a block `'use client'` only when it genuinely needs browser APIs or React state (e.g. `TestimonialCarouselBlock`, `ContactFormBlock`, `BaseLayout`). Purely presentational blocks are server-compatible and do not need the directive.

### 7. Visual editing contract
Every page fetches `query` + `variables` + `data` from the TinaCMS client, then passes them into `useTina` in `page.client.tsx`. Never short-circuit this — skipping it breaks visual editing in edit mode.

Hard constraints:
- Page runtime rendering must use data returned by `useTina`, not the raw server response.
- If a route includes multiple Tina queries/forms, `experimental___selectFormByFormId()` is required to force the page document form in the sidebar.
- Empty Tina sidebar is a release blocker.

---

## Adding a New Block

1. `src/components/blocks/NewBlock.tsx` — all data via typed props, tokens via CSS vars, no hardcoded content. Add `'use client'` only if the block needs state.
2. `tina/config.ts` — add a `template` entry under the `blocks` field. All field names must match the component's props interface.
3. `src/components/Blocks.tsx` — add a `case 'PageBlocksNewBlock':` to the switch.
4. Update the block table in `.agents/skills/woc-builder/SKILL.md`.
5. Update `references/block-catalog.md` with niche guidance for the new block.
6. Add a note to `CHANGELOGS.md`.

---

## Dev Workflow

```bash
cd woc-starter-next
npm install
npm run dev          # tinacms dev + next dev → http://localhost:3000
                     # TinaCMS admin: http://localhost:3000/admin/index.html
npm run build        # tinacms build && next build (requires TINA_CLIENT_ID + TINA_TOKEN for cloud)
```

For local dev without TinaCloud credentials, `npm run dev` works fully in local mode (no env vars needed). Changes save directly to local markdown/JSON files.

---

## Versioning

- **Patch** (0.0.x) — bug fixes, copy/token corrections
- **Minor** (0.x.0) — new blocks, new design token profiles, skill reference updates
- **Major** (x.0.0) — breaking changes to block schema, component prop interfaces, or framework stack

When bumping a version that changes the block schema, note the exact field changes in `CHANGELOGS.md` so builders know if their forked client repos need a manual migration.
