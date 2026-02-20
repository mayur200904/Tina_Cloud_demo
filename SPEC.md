# WoC Starter — Specification

This document governs development of the `woc-starter` template itself. It is for contributors maintaining and evolving the template — not for builders using it to build client sites.

---

## What This Repo Is

`woc-starter` is a **fork-once template**. Builders copy it per client, run the `woc-builder` agent skill, and ship. The template must stay:

- **Design-agnostic** — zero hardcoded client colors, fonts, or copy anywhere in `.astro` or `.ts` files
- **CMS-complete** — every piece of user-editable content must be reachable via TinaCMS
- **Non-breaking** — a client editing content through the admin UI cannot break the layout

---

## Repository Structure

```
vibesite/                          ← this repo (the WoC platform)
├── SPEC.md                        ← you are here
├── CHANGELOG.md                   ← template changelog
├── woc-starter/                   ← the Astro template (what gets forked)
│   ├── src/
│   │   ├── components/blocks/     ← one .astro file per CMS block
│   │   ├── layouts/BaseLayout.astro
│   │   ├── pages/[...slug].astro
│   │   └── styles/global.css      ← design token system only
│   ├── content/
│   │   ├── pages/index.md         ← empty skeleton (no client content)
│   │   └── settings/global.json   ← empty settings skeleton
│   ├── tina/config.ts             ← CMS schema
│   └── .env.example
└── .agents/
    └── skills/woc-builder/        ← the agent skill for building client sites
        ├── SKILL.md
        └── references/
```

---

## Core Rules for Template Contributors

### 1. Blocks are schema-bound
Every value displayed by a block component **must** be a prop sourced from TinaCMS. No inline strings. No config objects with copy. If text appears on screen, it must be editable in the CMS.

### 2. Design tokens, not inline styles
All visual decisions live in `global.css` inside the `@theme` block. Block components reference CSS variables only — never hardcoded hex values, pixel sizes, or font names.

### 3. The block/schema contract is strict
The Astro component prop names must match the TinaCMS field `name` values exactly. Breaking this silently breaks the CMS editing experience without a runtime error.

### 4. The skeleton stays empty
`content/pages/index.md` must contain the full block structure with empty/placeholder values only. It must never contain demo client content. Same for `content/settings/global.json`.

### 5. Schema nullability
Do not use `required: true` on fields that share names across multiple block templates. TinaCMS generates a GraphQL union type — conflicting nullability across the union causes codegen to fail. All block-level fields should be optional at the schema level; validation is the CMS UI's job.

---

## Adding a New Block

1. `src/components/blocks/NewBlock.astro` — all data via `Props`, tokens via CSS vars, no hardcoded content
2. `tina/config.ts` — add a `template` entry under the `blocks` field. All field names must match the component's `Props` interface
3. `src/pages/[...slug].astro` — add a `case 'PageBlocksNewBlock':` to the switch
4. Update the block table in `.agents/skills/woc-builder/SKILL.md`
5. Update `references/block-catalog.md` with niche guidance for the new block
6. Add a note to `CHANGELOG.md`

---

## Dev Workflow

```bash
cd woc-starter
npm install
npm run dev          # TinaCMS local server + Astro dev server
npm run build        # tinacms build && astro build (requires TINA_CLIENT_ID + TINA_TOKEN for cloud)
```

For local dev without TinaCloud credentials, `npm run dev` works fully in local mode (no env vars needed).

---

## Versioning

- **Patch** (0.0.x) — bug fixes, copy/token corrections
- **Minor** (0.x.0) — new blocks, new design token profiles, skill reference updates  
- **Major** (x.0.0) — breaking changes to block schema or component prop interfaces

When bumping a version that changes the block schema, note the exact field changes in `CHANGELOG.md` so builders know if their forked client repos need a manual migration.
