---
name: high-end-woc-infrastructure
description: Infrastructure-first operating package for agents that must generate high-end websites in minutes with TinaCMS editability, TinaCloud auth, and objective quality/publish gates.
license: Internal WoC usage
---

# High-End WoC Infrastructure

Use this skill when the user asks to generate or operate a premium-quality website system with strict CMS safety, visual-editing reliability, and TinaCloud publishing proof.

## Mission

Ship high-end websites in minutes while guaranteeing:
1. design quality is client-specific (not template-like),
2. every runtime business value is Tina-editable,
3. admin editing can publish to GitHub via TinaCloud.

## Required Co-Skills (Mandatory)

For any website design/build run, also load and apply:
- `woc-design`
- `woc-builder`
- `frontend-design`
- `vercel-react-best-practices`

Optional final QA:
- `web-design-guidelines`

Do not start implementation unless these are active.

## One-Prompt Orchestration (Time Saver)

When user intent is "build website from detailed brief", run this flow in one request:
1. Apply infrastructure constraints from this skill.
2. Generate/confirm Design Spec (`woc-design` behavior).
3. Implement pages/schema/content (`woc-builder` behavior).
4. Execute objective gates and report pass/fail evidence.

Do not wait for extra prompting between phases unless a true blocker exists (missing credentials, missing required business data, or failed hard gate needing user decision).

## Read First (Mandatory)

Before writing code, read and enforce:
- `RULEBOOK.md`
- `AGENTS.md`
- `RULEBOOK-COMPLIANCE-REPORT.md`

Then follow this execution order.

## Execution Order (Hard)

1. **Design intent first**
   - Produce/confirm Design Spec (Client Character, Visual Concept, Surprise Element, page intent map).
   - If missing, run design phase before implementation.

2. **Schema-first implementation**
   - Define fields in `tina/config.ts` first.
   - Match field keys across schema, TSX reads, and content files exactly.
   - Use explicit `match.include` per page collection.

3. **Visual editing contract**
   - For every editable route, implement server + client split:
     - server passes `query`, `variables`, `data`
     - client uses `useTina({ query, variables, data })`
     - runtime render reads from `useTina` data
   - If multiple forms/hooks exist, set `experimental___selectFormByFormId()`.

4. **Auth mode and publish path**
   - Default: TinaCloud hosted auth.
   - Ensure env + branch + path alignment for TinaCloud and repo.

5. **Objective gates before close**
   - `npm run verify:visual-editing`
   - `npm run mode:check`
   - `npx tinacms build`
   - `npm run build`
   - Admin save/publish proof with remote commit hash change.

## Required Runbooks

Read these references while executing:
- Design quality system: `references/high-end-design-system.md`
- CMS contract checks: `references/cms-contract-checklist.md`
- TinaCloud auth + publish: `references/tinacloud-auth-publish-runbook.md`
- Final pass/fail sign-off: `references/signoff-matrix.md`

## Non-Negotiables

- No hardcoded business-facing runtime copy in TSX.
- No completion claim without command evidence.
- Empty Tina sidebar on editable route = failure.
- No merge/deploy when preflight/build gates fail.
- In one-prompt mode, return phase-wise outputs (Design → Build → Validate → Next action) for fast human approval.
- No generic/template visual output; result must be client-specific and high-end.
- Design quality and React/Next best-practice quality are both hard requirements.

## High-End Quality Gate (Hard)

Before closure, confirm all:
1. Design rubric score `>= 22/30`.
2. First-3-second hero impact is specific to client character.
3. Typography hierarchy and section rhythm are intentional and consistent.
4. Motion is purposeful (no decorative-only animation noise).
5. Mobile readability + CTA clarity hold on key routes.
6. `vercel-react-best-practices` critical checks are respected (async waterfalls, bundle discipline, client/server boundaries).

If any item fails, task remains open.
