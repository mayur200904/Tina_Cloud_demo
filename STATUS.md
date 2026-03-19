# Repository Status Snapshot

Date: 2026-03-19
Project focus: `woc-starter-v2` (primary), `woc-starter-v1` (legacy reference)

## 1) What was the initial status (before this work)

- `woc-starter-v2` had starter placeholder pages with repeated inline placeholder blocks.
- Tina setup was mostly hosted-only in `woc-starter-v2/tina/config.ts`.
- No toggleable self-hosted Tina backend route existed.
- Admin route implementation used script injection pattern instead of redirect.
- `woc-starter-v2/next.config.ts` had static export mode, which blocks API routes needed for self-hosted Tina backend.
- No explicit testing playbook and no auth mode switch automation scripts.

## 2) What has been done so far (file-wise)

### Root-level governance and operator docs

- Added `AGENTS.md`
  - Defines autonomous operating manual, Tina non-negotiables, auth modes, execution pipeline, and file boundaries.
- Added `SKILLS.md`
  - Defines skill routing (`brief-intake`, `woc-design`, `woc-builder`, `tina-auth-integrator`, `quality-gate`).
- Updated `prompt-templates.md`
  - Added rapid "Template 0 — Tina CMS Rapid Build (Minutes)" for fast autonomous generation.

### `woc-starter-v2` auth/runtime hardening

- Updated `woc-starter-v2/tina/config.ts`
  - Added mode switches for hosted vs self-hosted behavior.
  - Added `contentApiUrlOverride` when self-hosted mode is enabled.
  - Added admin auth toggle support via env flags.
- Added `woc-starter-v2/pages/api/tina/[...routes].ts`
  - Introduced self-hosted Tina backend scaffold.
  - Includes guarded behavior for disabled mode and missing generated database client.
- Updated `woc-starter-v2/next.config.ts`
  - Removed static export mode to enable API route support.
- Updated `woc-starter-v2/.env.example`
  - Added env vars for mode switching and public client id.
- Updated `woc-starter-v2/package.json` and `woc-starter-v2/package-lock.json`
  - Added `@tinacms/auth` and `@tinacms/datalayer`.
  - Added mode scripts: `mode:status`, `mode:hosted`, `mode:self-hosted`, `mode:check`.
- Added `woc-starter-v2/scripts/tina-mode.mjs`
  - Implements mode status/switch/check behavior.

### `woc-starter-v2` app cleanup and placeholder de-duplication

- Updated `woc-starter-v2/src/app/admin/[[...slug]]/page.tsx`
  - Replaced script injection with redirect to `/admin/index.html`.
- Updated `woc-starter-v2/src/components/BaseLayout.tsx`
  - Safer nav/footer link handling.
  - Cleaner defaults; reduced fragile hardcoded behavior.
- Added `woc-starter-v2/src/components/StarterPageShell.tsx`
  - Shared starter shell to replace repeated placeholder blocks.
- Updated pages to use shared shell:
  - `woc-starter-v2/src/app/page.tsx`
  - `woc-starter-v2/src/app/about/page.tsx`
  - `woc-starter-v2/src/app/services/page.tsx`
  - `woc-starter-v2/src/app/contact/page.tsx`
- Updated `woc-starter-v2/src/app/globals.css`
  - Added starter-shell utility classes.

### `woc-starter-v2` process docs and repo hygiene

- Added `woc-starter-v2/README.md`
  - Setup, auth mode behavior, and mode scripts usage.
- Added `woc-starter-v2/TESTING.md`
  - Task list and best-practice validation flow.
- Updated `woc-starter-v2/.gitignore`
  - Added `.env.local` ignore entry to prevent local env artifacts from polluting changes.

## 3) Current status (right now)

### Working tree summary

Current changed files are expected for this implementation pass and include:
- root docs (`AGENTS.md`, `SKILLS.md`, `prompt-templates.md`, this `STATUS.md`)
- v2 auth/config/runtime/docs/page updates listed above.

### Validation state

- TypeScript check passes:
  - `npx tsc --noEmit` ✅
- Auth mode status currently reports:
  - mode: `hosted`
  - `Client ID configured: no`
  - `TINA_TOKEN configured: no`

### Main blocker to full completion

- Credential-backed E2E validation is still pending due to missing real Tina environment variables.

## 4) What we are actually doing

We are turning this repository into a reliable autonomous website generation system that can:
- produce a client website in minutes from a brief,
- keep all displayed content Tina-editable,
- support TinaCloud hosted mode by default,
- optionally switch to self-hosted Tina backend mode safely,
- avoid schema/content/query mismatches and brittle hardcoding.

## 5) Execution plan (next steps)

1. Populate real env credentials in local env for hosted mode:
   - `TINA_CLIENT_ID`
   - `TINA_TOKEN`
2. Run strict hosted checks:
   - `npm run mode:hosted`
   - `npm run mode:check`
   - `npm run dev` and verify `/admin/index.html`
   - `npm run build`
3. If self-hosted mode is required, run:
   - set `TINA_SELF_HOSTED_AUTH=true`
   - set `NEXT_PUBLIC_TINA_CLIENT_ID` + `TINA_TOKEN`
   - run `npm run mode:check`
   - verify `/api/tina/gql` and admin edit/save flow
4. Fix only blockers found during E2E and close with release gate from `woc-starter-v2/TESTING.md`.

## 6) Quick command sequence for next run

From `woc-starter-v2/`:

```bash
npm run mode:status
npm run mode:hosted
npm run mode:check
npm run dev
npm run build
```

If self-hosted is needed after hosted validation:

```bash
npm run mode:self-hosted
npm run mode:check
npm run dev
npm run build
```
