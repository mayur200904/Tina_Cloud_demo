# Repository Status Snapshot

Date: 2026-03-19
Project focus: `woc-starter-v2` (primary), `woc-starter-v1` (legacy reference)

## 1) Intent (locked)

Build an autonomous website generation system that can produce client-ready websites in minutes with:
- schema-first TinaCMS modeling,
- editable page content + settings in Tina admin,
- TinaCloud hosted authentication by default,
- optional self-hosted backend mode,
- predictable build-safe engineering defaults.

## 2) What is implemented

### Governance + operator docs
- `AGENTS.md` added
- `SKILLS.md` added
- `prompt-templates.md` extended with rapid Tina build template

### Tina/runtime hardening in `woc-starter-v2`
- `tina/config.ts` supports hosted and self-hosted toggle paths
- `.env.example` and mode scripts support deterministic auth-mode operations
- `next.config.ts` no longer uses static export mode
- Tina API route scaffold is now served from `src/pages/api/tina/[...routes].ts`

### App cleanup
- Admin route redirects to `/admin/index.html`
- Shared starter shell component replaces repeated placeholders
- Base layout link handling hardened

### Process + validation assets
- `woc-starter-v2/README.md` and `woc-starter-v2/TESTING.md` added
- `.env.local` ignored to avoid local secret/state churn in git

## 3) Latest resolved blockers

1. **TinaCloud indexing not seeing branches**
   - Root cause: TinaCloud project path/branch indexing configuration in a monorepo-style repo.
   - Resolution: project/branch settings corrected in TinaCloud; branch checks now pass.

2. **Build failure from mixed route roots (`src/app` + root `pages`)**
   - Root cause: duplicate route trees caused `.next/types/validator.ts` import path errors.
   - Resolution: API route moved to `src/pages/api/...` and root `pages/api/...` removed.

## 4) Current validation status

- `npm run mode:check` ✅
- `npx tinacms build` ✅ (client, token, branch, indexing, schema checks pass)
- `npm run build` ✅
- `npx tsc --noEmit` ✅

## 5) Current work-in-progress git delta

Expected finalization set includes:
- delete `woc-starter-v2/pages/api/tina/[...routes].ts`
- add `woc-starter-v2/src/pages/api/tina/[...routes].ts`
- refresh Tina generated files under `woc-starter-v2/tina/__generated__/`

## 6) Next execution focus

1. Commit and push the validated route-structure fix + generated artifacts.
2. Verify Tina checklist steps 3/4 by logging in at `/admin/index.html` and saving an edit.
3. Start first true “minutes build” run from a real brief using the rapid template.

## 7) North-star alignment check (must pass before closing any task)

Primary motive for this directory/workspace:
- Build an autonomous website-building system that ships client-ready sites in minutes.
- Keep TinaCMS schema/content/rendering contracts deterministic and non-breaking.
- Ensure non-technical editors can authenticate and publish content through TinaCloud with real Git commits.

Right-path gate for every change:
1. Does this improve generation speed, CMS safety, or editor reliability?
2. Does this avoid hardcoded, non-editable values in the runtime UI?
3. Does this preserve schema key parity across Tina schema, content files, and TSX reads?
4. Does hosted mode still pass: `npm run mode:check`, `npx tinacms build`, `npm run build`?
5. If a save flow was touched, was a real remote commit hash observed on GitHub?

If any answer is "no", treat the work as incomplete.
