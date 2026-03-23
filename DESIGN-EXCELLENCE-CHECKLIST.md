# Design Excellence Checklist (CMS-Friendly)

Use this checklist before any WoC website handoff.

## A) First Impression
- Hero has one clear focal point in first 3 seconds.
- Headline remains readable over imagery/overlays.
- Primary CTA is visible without searching.

## B) Anti-Congestion
- Headline and body sizes are balanced (no oversized dense text blocks).
- Paragraph line length is kept readable (`~45-80` chars when practical).
- Group spacing hierarchy is clear (between-group spacing > within-group spacing).
- Content does not visually collapse on mobile breakpoints.

## C) Hierarchy and Rhythm
- Sections alternate visual weight (heavy/light/surface rhythm).
- Every section has one dominant purpose and one next action.
- Typography scale is consistent across routes.

## D) CMS Safety
- All business-facing runtime copy is Tina-backed.
- Schema keys match TSX reads and content keys exactly.
- Visual editing sidebar shows page fields on all editable routes.
- `experimental___selectFormByFormId()` is present where required.

## E) Performance and Accessibility
- No avoidable async waterfalls in route fetch paths.
- Client bundles are limited to necessary interactive sections.
- Text contrast and focus states are acceptable.

## F) Closure Threshold
- Design rubric score: `>= 26/30`
- `npm run verify:visual-editing`: pass
- Hosted checks (`mode:check`, `tinacms build`, `npm run build`): pass unless blocked by TinaCloud indexing lag (must be documented)
