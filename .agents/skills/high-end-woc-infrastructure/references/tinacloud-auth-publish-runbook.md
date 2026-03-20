# TinaCloud Auth + Publish Runbook

## Hosted Mode Baseline
- `clientId: process.env.TINA_CLIENT_ID ?? ""`
- `token: process.env.TINA_TOKEN ?? ""`
- Admin URL: `/admin/index.html`

## Environment Requirements
- `TINA_CLIENT_ID`
- `TINA_TOKEN`
- optional branch var (when used): `GITHUB_BRANCH`

## Validation Steps
1. `npm run mode:check`
2. `npx tinacms build`
3. `npm run build`

## Publish Proof Procedure
1. Capture remote hash before publish.
2. Edit content in Tina admin and publish.
3. Capture remote hash after publish.
4. Confirm hash changed and latest commit corresponds to publish.

## Common Failure Causes
- Remote Tina schema/index lag behind local schema
- Branch mismatch (local vs TinaCloud target)
- Missing/incorrect env variables
- Wrong Path-to-Tina setting in TinaCloud project config
