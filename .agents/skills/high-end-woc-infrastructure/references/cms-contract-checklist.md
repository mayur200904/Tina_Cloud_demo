# CMS Contract Checklist

## Field Parity (Must Pass)
For every editable value, key names must match exactly across:
1. `tina/config.ts` field `name`
2. TSX data read key
3. markdown/json content key

## Visual Editing (Must Pass)
Per editable route:
- server fetch includes `query`, `variables`, `data`
- client page uses `useTina({ query, variables, data })`
- render reads from rehydrated `data`
- if multiple forms/hooks: `experimental___selectFormByFormId()` is implemented

## Preflight Gate
Run and pass:
- `npm run verify:visual-editing`

If it fails, stop and fix before build/publish checks.

## Failure Conditions
- Empty Tina sidebar on editable route
- Key mismatch (schema vs TSX vs content)
- Hardcoded business content in TSX bypassing CMS
