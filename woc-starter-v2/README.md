# WoC Starter v2 (Websites In Minutes Infrastructure)

Prompt-driven website generation infrastructure with TinaCMS editing.

> CI note: repository intentionally keeps this starter in infrastructure mode.

## Stack

- Next.js (App Router)
- TinaCMS + TinaCloud
- Tailwind CSS
- TypeScript

## Infrastructure Mode (Current)

This repo is intentionally kept as a generic baseline:
- no client-specific design or business copy
- editable Tina schema for home/about/services/contact
- ready for one-prompt website generation workflow

To generate a full website from prompt input, use the root file:
- `../prompt-templates.md` → **Template MASTER — One Prompt Autonomous Orchestration**

Mandatory design/CMS guardrails for agent runs:
- `../AGENTS.md`
- `../RULEBOOK.md`
- `../DESIGN-EXCELLENCE-CHECKLIST.md`

## Quick Start

```bash
npm install
npm run dev
```

Open:
- Site: http://localhost:3000
- Tina admin: http://localhost:3000/admin/index.html

Then provide your client brief prompt to the agent and regenerate pages.

## Required Environment Variables

## Mode Switch Commands

From `woc-starter-v2/`:

```bash
npm run mode:status
npm run mode:hosted
npm run mode:self-hosted
npm run mode:check
```

These commands update/check `.env.local` flags so agents can switch auth strategy safely.

## TinaCloud Monorepo Setup (Important)

This repository hosts the app in `woc-starter-v2/`, so in TinaCloud project configuration:

- Set **Path To Tina** to `woc-starter-v2`.
- If branch indexing still fails, try `woc-starter-v2/tina` as fallback.
- Use **Refresh Webhooks** and **Refresh Branches / Reindex** after changing repository/path.

If this is misconfigured, Tina build will fail with branch/index errors even when credentials are correct.

### Default (TinaCloud hosted mode)

- `TINA_CLIENT_ID`
- `TINA_TOKEN`

Use this mode for most projects in this repo.

Hosted validation command:

```bash
set -a && source .env && set +a && GITHUB_BRANCH=main npx tinacms build
```

One-command hosted readiness check:

```bash
npm run verify:hosted
```

This runs `mode:check`, `tinacms build`, and `next build` with values loaded from `.env`.

### Advanced (self-hosted content API + TinaCloud auth provider)

Only if explicitly needed:
- `NEXT_PUBLIC_TINA_CLIENT_ID`
- `TINA_SELF_HOSTED_AUTH=true`
- `TINA_PUBLIC_IS_LOCAL`
- `TINA_TOKEN`

Also requires backend auth route wiring and `contentApiUrlOverride` in `tina/config.ts`.

When enabled, Tina requests are routed through `/api/tina/gql`.

## Builder Workflow (Schema First)

1. Define page collections and fields in `tina/config.ts`.
2. Create matching content files in `content/pages/*.md`.
3. Implement page TSX that reads the exact same field names.
4. Keep `content/settings/global.json` aligned with navigation/footer usage.
5. Validate with `npm run build`.

## Non-Negotiable Rules

- Do not edit `tina/__generated__/` by hand.
- Keep `defineConfig` deterministic.
- Keep schema keys, TSX reads, and frontmatter keys identical.
- Every user-facing string should be CMS-editable.

## Common Failure Points

- Field name mismatch between schema and page code.
- Missing `match.include` in page collections.
- Editing generated Tina files directly.
- Hardcoded content in TSX that bypasses Tina.
