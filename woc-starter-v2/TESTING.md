# WoC v2 Testing Playbook

Use this checklist after any agent-generated change.

## Task List (Execution Order)

1. Install/refresh dependencies.
2. Validate TypeScript errors.
3. Start local dev and verify site + admin routes.
4. Validate Tina schema/codegen/build.
5. Verify CMS editing on all pages.
6. Verify auth mode behavior (hosted and, if enabled, self-hosted).

## Commands

```bash
npm install
npm run mode:status
npm run dev
npm run build
```

## Best Testing Approach

### 1) Fast local correctness first

- Open `/` and ensure layout renders.
- Open `/admin/index.html` and ensure Tina admin loads.
- Navigate to `/about`, `/services`, `/contact` and ensure no runtime errors.

### 2) Schema-to-UI contract validation

For every editable field:
- Field exists in `tina/config.ts`
- Field exists in matching markdown/json content file
- Field is read in TSX using the same key

This catches the most common silent Tina failures.

### 3) Build-time validation

Run `npm run build` and treat failures as blockers.
- Tina codegen/schema errors must be fixed before page edits continue.
- Next.js type errors must be fixed before deployment.

### 4) Auth mode checks

#### Hosted mode (default)
- `TINA_SELF_HOSTED_AUTH=false`
- Ensure admin login works with cloud credentials.
- Ensure `/api/tina/gql` returns disabled message/404 behavior.

#### Self-hosted auth mode
- `TINA_SELF_HOSTED_AUTH=true`
- Set `NEXT_PUBLIC_TINA_CLIENT_ID` and `TINA_TOKEN`
- Set `TINA_PUBLIC_IS_LOCAL` as needed
- Ensure Tina requests resolve through `/api/tina/gql`
- Ensure admin login flow succeeds and edits persist

### 5) Regression checks

- No hardcoded content strings in page implementations (except starter shell placeholders).
- No manual edits under `tina/__generated__/`.
- No anchor-only nav links for multi-page routes.
- No broken imports in `src/app` and `src/components`.

## Release Gate

A change is ready only when:
- `npm run build` passes
- Admin opens and edits save
- All intended routes render without errors
- Auth mode behavior matches selected environment toggles
