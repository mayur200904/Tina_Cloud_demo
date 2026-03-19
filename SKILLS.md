# WoC Agent Skills Map

This file defines which skill is responsible for each phase of autonomous site generation.

## Skill Routing

### 1) `brief-intake`

Purpose:
- normalize raw user input into a build-ready brief

Inputs:
- website description
- niche/industry
- optional ingredients (services, offers, pricing, testimonials)

Output:
- structured brief with business facts, audience, CTA, and content inventory

### 2) `woc-design` (existing)

Purpose:
- convert brief into Design Spec with page-level intent and token direction

Must include:
- Client Character
- Visual Concept
- Surprise Element
- Per-page Experience Map

### 3) `tina-modeler`

Purpose:
- build page collections and field schema in `tina/config.ts`

Hard rules:
- deterministic config
- explicit `match.include` per page
- field names synchronized with TSX and content files

### 4) `woc-builder` (existing)

Purpose:
- implement pages and content from Design Spec + schema

Must do:
- custom page TSX
- matching markdown frontmatter
- settings JSON population
- motion/components usage per current project conventions

### 5) `tina-auth-integrator`

Purpose:
- configure admin authentication path using TinaCloud strategy

Modes:
- hosted mode (default): use cloud client/token envs
- self-hosted API mode: add TinaCloud auth provider route/config

### 6) `quality-gate`

Purpose:
- verify generated site is build-safe and CMS-safe

Checks:
- `npm run dev` and admin route availability
- `npm run build` passes
- no schema/query key drift
- no broken links in nav/footer CTAs

## Skill-to-Repo Mapping

- Primary implementation starter: `woc-starter-v2/`
- Legacy reference only: `woc-starter-v1/`
- Skill references:
  - `.agents/skills/woc-design/SKILL.md`
  - `.agents/skills/woc-builder/SKILL.md`
  - `.agents/skills/frontend-design/SKILL.md`
  - `.agents/skills/vercel-react-best-practices/SKILL.md`

## Minimal Invocation Contract (for agents)

Before code generation, produce this object internally:

```json
{
  "projectTarget": "woc-starter-v2",
  "pages": ["home", "about", "services", "contact"],
  "authMode": "hosted" ,
  "requiredEnv": ["TINA_CLIENT_ID", "TINA_TOKEN"],
  "designSpecReady": true,
  "schemaReady": true
}
```

If `authMode` is `self-hosted-tinacloud-auth`, add:

```json
{
  "requiredEnv": [
    "NEXT_PUBLIC_TINA_CLIENT_ID",
    "TINA_PUBLIC_IS_LOCAL",
    "TINA_TOKEN"
  ]
}
```

## Failure Policy

- If schema generation fails, stop and fix schema before editing TSX.
- If Tina query type generation fails, do not continue with page implementation.
- If build fails after page edits, revert only the failing page changes, not global settings.