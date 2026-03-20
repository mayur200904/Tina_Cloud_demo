# Rulebook Compliance Report Template

Use this template at the end of every implementation task before declaring completion.

---

## A) Task Metadata

- Date:
- Agent:
- Task summary:
- Primary target path:
- Tina mode used: hosted / self-hosted

## B) North-Star Alignment

- Client-ready in minutes objective supported? yes / no
- Deterministic Tina-safe objective preserved? yes / no
- TinaCloud save-to-GitHub reliability preserved? yes / no
- If any item is no, state blocker:

## B.1) Mandatory Skill Stack Evidence

- `high-end-woc-infrastructure` loaded and applied? yes / no
- `woc-design` loaded and applied? yes / no
- `woc-builder` loaded and applied? yes / no
- `frontend-design` loaded and applied? yes / no
- `vercel-react-best-practices` loaded and applied? yes / no
- Optional `web-design-guidelines` run? yes / no / n/a
- If any mandatory item is no, closure blocked: yes / no

## C) Files + Schema Contract

### Changed files
- [path]

### Schema keys added or modified
- Collection:
- Field keys:

### 3-way key parity check
- Schema keys == TSX keys: pass / fail
- Schema keys == content keys: pass / fail
- Drift details (if fail):

## D) Editability Coverage

- All runtime business content Tina-backed? yes / no
- Any intentional non-editable runtime content? list and justify:
- Hardcoded CTA/service/testimonial/pricing copy present? yes / no

## E) Visual Editing Contract Evidence (Required)

- Server → client split present for each editable page? pass / fail
- `useTina({ query, variables, data })` implemented on each editable page? pass / fail
- Runtime render reads `useTina` data (not raw server response)? pass / fail
- `experimental___selectFormByFormId()` added where multiple forms/hooks exist? yes / no / n/a
- Tina sidebar fields visible in admin for home/about/services/contact? pass / fail
- If fail, list affected route(s) and root cause:

## F) Validation Evidence

- visual-editing preflight: pass / fail
- mode check: pass / fail
- Tina build: pass / fail
- app build: pass / fail

Paste concise output evidence:
- visual-editing preflight output:
- mode check output:
- Tina build output:
- app build output:

## G) Publishing Proof (Required if save/publish touched)

- Branch verified:
- Remote hash before:
- Remote hash after:
- Commit message observed:
- Proof status: pass / fail

## H) Design Quality Rubric (0–5 each)

- Brand specificity:
- Visual hierarchy:
- Typography quality:
- Rhythm and spacing:
- Conversion clarity:
- Motion restraint and purpose:

- Total score (/30):
- Meets minimum 22/30: yes / no

### H.1) High-End Design Gate Evidence (Required)

- Hero has first-3-second client-specific impact? pass / fail
- Typography hierarchy is distinct and consistent? pass / fail
- Section rhythm alternates visual weight (no monotone stacking)? pass / fail
- Motion is purposeful and restrained (no decorative-only animation)? pass / fail
- Mobile readability and CTA clarity validated? pass / fail
- If any fail, list route + root cause:

## H.2) React/Next Best-Practice Evidence (Required)

- Async waterfalls avoided on key routes? pass / fail
- Bundle discipline maintained (no unnecessary client-heavy imports)? pass / fail
- Client/server boundaries respected? pass / fail
- Critical regressions against `vercel-react-best-practices` present? yes / no
- If any fail, list file(s) and correction plan:

## I) Hard Gate Result

- Any hard gate failed? yes / no
- If yes, task closure blocked: yes / no

## J) Final Declaration

- Rulebook-compliant completion: yes / no
- Residual risks:
- Next recommended action:
