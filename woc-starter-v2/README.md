# WoC Starter v2 (Next.js + TinaCMS)

Autonomous website starter focused on fast client delivery with TinaCMS editing.

## Stack

- Next.js (App Router)
- TinaCMS + TinaCloud
- Tailwind CSS
- TypeScript

## What this starter is for

- Generate a complete multi-page marketing website from a short brief.
- Keep all content editable in Tina admin.
- Support fast iteration by agents and non-technical editors.

## Quick Start

```bash
npm install
npm run dev
```

Open:
- Site: http://localhost:3000
- Tina admin: http://localhost:3000/admin/index.html

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

### Default (TinaCloud hosted mode)

- `TINA_CLIENT_ID`
- `TINA_TOKEN`

Use this mode for most projects in this repo.

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
