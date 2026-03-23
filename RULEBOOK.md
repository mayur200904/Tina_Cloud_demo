# Best Website Agent Rulebook

Mandatory operating policy for all autonomous website-generation runs in this repository.

This rulebook exists to enforce three outcomes on every run:
1. premium design quality,
2. deterministic Tina-safe implementation,
3. reliable editor publishing with real GitHub commits.

Required companion checklist:
- `DESIGN-EXCELLENCE-CHECKLIST.md` must be applied and referenced in the final handoff.

---

## 1) Non-Negotiable North Star

Every task must align with all three:
- Build client-ready websites in minutes.
- Keep Tina schema/content/rendering deterministic and safe.
- Ensure editors can save through TinaCloud and produce real GitHub commits.

If any one is not met, the task is incomplete.

Mandatory capability-load rule:
- For website generation/redesign tasks, agent must load and apply:
	`high-end-woc-infrastructure`, `woc-design`, `woc-builder`, `frontend-design`, `designing-beautiful-websites`, `vercel-react-best-practices`, `web-design-guidelines`.
- If mandatory skills are not loaded, implementation and closure are blocked.

---

## 2) 4-Layer Control System (Consistency Engine)

### Layer A — Workflow Control (strict phase order)

Allowed execution order:
1. Brief intake
2. Design spec
3. Schema model
4. TSX implementation
5. Content files
6. Auth/publishing wiring
7. Quality gates

Hard stop rules:
- No TSX reads before schema keys exist.
- No content file keys before schema fields exist.
- No "done" state before quality gates pass.

### Layer B — Contract Control (schema/key safety)

For every editable value, enforce key parity across:
- `tina/config.ts` schema field `name`
- TSX data read key
- markdown/json content key

Failure policy:
- Any key mismatch = block completion.

### Layer C — Validation Control (build/runtime safety)

Hosted-mode required checks:
- `npm run verify:visual-editing`
- `npm run mode:check`
- `npx tinacms build`
- `npm run build`

Contextual-editing required checks (for every page collection route):
- Server page fetch returns `query`, `variables`, and `data` from Tina client.
- Route render is delegated to a client component using `useTina({ query, variables, data })`.
- Runtime UI reads from `useTina` rehydrated data, not directly from server props.
- If page uses multiple Tina documents/hooks, explicitly set `experimental___selectFormByFormId()` to the page document form ID.
- Preflight script `npm run verify:visual-editing` must pass before hosted checks proceed.

CI enforcement policy:
- CI must execute `npm run verify:visual-editing` as a required gate before Tina/Next build steps.
- If preflight fails, pipeline status must be failed and merge/deploy is blocked.
- Do not override or bypass a failed preflight with manual approval notes.
- Repository enforcement file: `.github/workflows/visual-editing-gate.yml`.
- Full hosted verification enforcement file: `.github/workflows/hosted-verification-gate.yml`.
- Compliance report structure enforcement file: `.github/workflows/compliance-report-gate.yml`.

Publishing/saving changes require proof:
- capture remote commit hash from GitHub branch after save.

### Layer E — High-End Design + Web Best-Practices Control

Mandatory for every generated website:
- apply high-end design standards from `high-end-woc-infrastructure` and `frontend-design`
- apply high-end design standards from `designing-beautiful-websites` for hierarchy/spacing/clarity checks
- apply performance/architecture standards from `vercel-react-best-practices`
- keep design quality and technical quality balanced; neither can regress the other

Required implementation checks:
- no generic/template visual output; design must be client-specific
- clear typography hierarchy and section rhythm
- no congested type blocks (heading/body sizing and spacing must remain readable)
- paragraph measure and spacing must preserve readability across breakpoints
- motion must support narrative/conversion intent, not decoration-only noise
- responsive behavior must preserve hierarchy and CTA clarity on mobile
- avoid async waterfalls and unnecessary client bundle growth in Next.js pages

Failure policy:
- if design rubric < `26/30`, fail
- if critical React/Next best-practice violations are present (waterfalls/bundle misuse), fail
- if fixing performance degrades Tina editability contract, fail and rework

### Layer D — Regression Control (model consistency over time)

Maintain a fixed eval set of representative client briefs.

For any prompt/skill/policy change:
- run quality rubric scoring,
- compare against baseline,
- reject if score regresses or any hard gate fails.

---

## 3) Hallucination Prevention Policy

The agent must not invent schema keys, content keys, routes, or publishing outcomes.

Mandatory anti-hallucination controls:
- Evidence-first claims: completion statements must be backed by tool output.
- Ground-truth checkpoints: schema generation, build output, and git history checks must be observed.
- No inferred success: "save worked" is invalid without remote hash change when publishing was in scope.
- Constrained write surfaces: edit only approved project paths unless explicitly needed.

---

## 4) Admin Leverage First Rule

If admin cannot edit it in Tina, it should not ship.

Required:
- Every business-facing string in runtime UI must map to Tina content/settings schema.
- Avoid hardcoded runtime copy except static framework chrome.
- Collections must use explicit `match.include` for controlled page mapping.
- Any page intended for visual editing must expose Tina form fields in the sidebar; if the sidebar is empty, task is not complete.

Disallowed:
- hardcoded CTA labels, service lists, testimonial text, pricing copy, section body copy in TSX.

---

## 5) Deterministic Tina-Safe Rules

### Config determinism
- `tina/config.ts` must not use runtime-random schema logic (`Date.now()`, `Math.random()`, time-varying schema shape).

### Tina generated files policy
- Do not hand-edit `tina/__generated__/`.
- Keep `tina-lock.json` current and committed when schema changes require it.

### Monorepo/path correctness
- TinaCloud "Path To Tina" must match repository layout.
- If branch indexing drifts, use dashboard controls (refresh webhooks/reindex) and re-validate.

---

## 6) Design Quality Enforcement (without sacrificing editability)

Design quality is required, but never by bypassing CMS editability.

Score each build from 0–5 on:
1. Brand specificity
2. Visual hierarchy
3. Typography quality
4. Rhythm/spacing consistency
5. Conversion clarity
6. Motion restraint and purpose

Release target:
- total score >= 26/30,
- and all hard gates pass.

Hard gates override score:
- schema mismatch, build failure, non-editable critical content, or missing publish proof (when required) => fail.

Web best-practice coupling rule:
- high design score does not waive architecture/performance quality.
- architecture/performance optimization does not waive design quality or CMS editability.

---

## 7) Prompt Consistency Pattern

Use this sequence for generation:
1. "Generate plan only" (no code)
2. Approve/adjust plan
3. Schema manifest
4. TSX/content implementation
5. Validation output summary

Prompt constraints:
- Require explicit Surprise Element tied to client character.
- Require section experience-map before writing code.
- Require editable-content coverage statement in final report.

---

## 8) Completion Checklist (must be explicit in handoff)

Before closing a task, provide:
- Which files changed
- Which schema keys were introduced/updated
- Evidence that mandatory skill stack was loaded and applied
- Output evidence for `npm run verify:visual-editing`
- Validation outputs for hosted checks
- Editability confirmation (all runtime business content Tina-backed)
- Visual editing proof (server+client `useTina` contract implemented and sidebar fields visible on all edited pages)
- High-end design evidence (rubric scoring with justification)
- Design checklist evidence (`DESIGN-EXCELLENCE-CHECKLIST.md` item review)
- React/Next best-practice evidence (critical checks reviewed: waterfalls, bundle discipline, client/server boundaries)
- Remote commit hash proof if save/publish flow was touched

If one item is missing, status must remain "in progress".

---

## 9) Escalation Rules

If any hard gate fails:
1. stop new feature edits,
2. fix root cause first,
3. rerun gates,
4. continue only after green state.

Never bypass failed gates with narrative explanation.

---

## 10) Scope Guard

Primary target:
- `woc-starter-v2/`

Single-target policy:
- This repository uses only `woc-starter-v2/` for implementation and delivery.

---

## 11) Mandatory Handoff Artifact

Every completed task must include a filled compliance handoff based on:
- `RULEBOOK-COMPLIANCE-REPORT.md`
- `COMPLIANCE-REPORT-LATEST.md` (filled, no placeholder values)

Closure policy:
- If either compliance report artifact is missing or contains unresolved placeholders, task is not complete.
