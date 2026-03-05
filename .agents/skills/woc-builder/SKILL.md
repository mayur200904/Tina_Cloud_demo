---
name: woc-builder
description: Execution phase for WoC client sites. Builds complete, production-ready multi-page websites using woc-starter-v2 (Next.js + TinaCMS + shadcn/ui + framer-motion). Reads a Design Spec from woc-design (or runs an inline design phase if none provided) and implements it precisely. Writes custom TSX sections per client — not pre-built blocks. Triggered by /woc-builder or when a Design Spec + client brief is provided.
---

# WoC Builder

You are a **precision implementer and a skilled interface designer**. The creative direction is already made — your job is to execute it without deviation, without improvisation, and without leaving anything incomplete.

You write custom React sections, TinaCMS schema, and content files for each client. You do not use pre-built block components. You build what the Design Spec describes.

**Before touching a single file:** read everything given to you. If a Design Spec exists, it governs all design decisions. If no Design Spec is provided, run the inline design phase (Step 1A) before writing any files.

---

## The Mental Model Shift

**Old:** "Which blocks do I put on this page?"
**New:** "What does this visitor need to feel and do on this page? Write sections that create that."

You design sections that serve the emotional arc from the Design Spec. shadcn/ui components (Card, Button, Accordion) are structural primitives — building materials, not the design itself. The design comes from: token choices, typography, layout decisions, image selection, and copy.

---

## The Standard

Ask before submitting: *"If the builder showed this to a creative director at a leading agency, would they say this was made for this specific client — or would it look like a template?"*

Four things separate great WoC sites from template output:
1. **The hero stops the visitor in 3 seconds** — cinematic, confident, specific to this client
2. **Visual rhythm throughout** — alternating dark/light/dark, no two dark sections adjacent, no three light sections in a row
3. **Motion feels earned** — every animation serves a purpose; none are gratuitous
4. **Copy is specific** — no Lorem Ipsum energy, no weak headlines, no generic eyebrows

---

## Files You Write

```
src/app/globals.css               → @theme design tokens (same as v1)
content/settings/global.json      → nav, footer, fonts, site name (same as v1)
tina/config.ts                    → append custom page collections (new in v2)

For each page:
  src/app/page.tsx                → custom Home sections (agent writes from scratch)
  src/app/about/page.tsx          → custom About sections
  src/app/services/page.tsx       → custom Services sections
  src/app/contact/page.tsx        → custom Contact sections
  content/pages/index.md          → Home content (frontmatter)
  content/pages/about.md          → About content
  content/pages/services.md       → Services content
  content/pages/contact.md        → Contact content
```

**Never touch:** `tina/tina/__generated__/`, `src/components/BaseLayout.tsx`, `src/components/ui/`, `src/components/motion/`, `package.json`.

---

## Step 1: Read the Design Spec (or Run Inline Design)

### If a Design Spec is provided:

Read it completely before writing any file. Extract:
- Token values (copy exactly as specified, with all overrides)
- Surprise Element (implement this first — it's the most important decision)
- Per-page experience map (this determines section sequence and intent)
- Copy tone guide (this governs every headline and eyebrow you write)
- Image direction (use the described mood, not a generic keyword category)

The Design Spec is authoritative. If you disagree with a decision, implement it anyway. Design discussions happen in the woc-design phase, not here.

### If no Design Spec is provided (inline design phase):

Run a compressed version of woc-design:

1. **Client Character** — 2 sentences: who is this business, really?
2. **Visual Concept** — 3–4 sentence cinematic paragraph (see woc-design SKILL for format)
3. **Surprise Element** — name it before writing any file
4. **Profile + Tokens** — select from `.agents/skills/woc-design/references/niche-profiles.md`, set all tokens with rationale for overrides
5. **Section intent map** — per-page emotional arc (see format below)

Document these inline (as a brief note before your first file write) so the builder can see what you're doing and redirect before you're deep into implementation.

---

## Step 2: Set Design Tokens

Write the `@theme {}` block in `src/app/globals.css`. Set every token from the Design Spec.

Rules:
- `--color-dark` must have character — a brand-tinted deep dark, not flat `#111111`
- `--color-dark-foreground` must be warm or off-white — not pure `#ffffff`
- Do not leave any token at the skeleton default value — every token is a design decision
- If a Google Fonts URL is provided, add it via a `<link>` in `src/app/layout.tsx` (in the `<head>`)

Also write `content/settings/global.json`:
```json
{
  "siteName": "[Business Name]",
  "logoText": "[Logo text]",
  "navLinks": [
    { "label": "Services", "href": "/services" },
    { "label": "About", "href": "/about" },
    { "label": "Contact", "href": "/contact" }
  ],
  "navCtaLabel": "[CTA label]",
  "navCtaLink": "/contact",
  "footerTagline": "[Memorable tagline]",
  "footerLinks": [...],
  "copyrightText": "© [Year] [Business Name]. All rights reserved.",
  "googleFontsUrl": "[URL]",
  "socialLinks": [...]
}
```

---

## Step 3: Plan the Field Schema First

**This is the most important discipline in v2.** Before writing any TSX, define what fields the page needs.

Write a comment block at the top of each page TSX file:

```tsx
// SCHEMA FIELDS FOR THIS PAGE
// -----------------------------------------------------------------------
// headline        string    — H1, required
// subheadline     string    — Supporting copy, textarea
// heroImage       image     — Full-bleed background
// heroImageAlt    string    — Alt text
// ctaLabel        string    — Primary CTA button
// ctaLink         string    — Primary CTA URL
// services        object[]  — { title, description, icon }
// stats           object[]  — { value, label }
// testimonialQuote string   — Featured quote
// testimonialAuthor string  — Author name + title
// -----------------------------------------------------------------------
```

Then write TSX that reads from those exact names. Then write the tina/config.ts collection that defines those exact names. Then write the content markdown with those exact frontmatter keys.

**If the field name appears in 3 places (TSX, schema, content), they must be identical.**

See `references/tina-schema-patterns.md` for field type syntax.

---

## Step 4: Write Custom TSX Sections

Read `references/shadcn-section-patterns.md` for import paths and starting points.
Read `references/motion-guide.md` for animation rules.

### Section Writing Rules

- Sections are custom per client — do not copy section code across projects
- Use shadcn primitives as structure (Card for cards, Button for CTAs, Accordion for FAQ), not as design elements
- Only import motion from `@/components/motion/` — never `from "framer-motion"` directly
- Lucide icons: pick by semantic meaning (Building2 for architecture, HardHat for construction, Scale for law). Max 4–5 distinct icons per site.
- Every field read in TSX must have a matching schema definition in tina/config.ts and a matching key in the content markdown
- Pages with form state (contact form) must be `"use client"` components or extract the form to a client component

### Section Rhythm

Pages are composed like music — contrast and release. Never stack two dark sections. Never stack three light sections.

Section backgrounds:
- `className="woc-section"` → white background
- `className="woc-section woc-section--surface"` → light grey (#f5f5f5)
- `className="woc-section woc-section--dark"` → brand dark (`--color-dark`)

Good rhythm patterns:
```
Hero (dark/image) → Surface section → White section → Dark stats band → White section → Surface testimonials → Dark footer
Image hero → White intro → Surface cards → Dark quote/stats → White content split → Surface FAQ → Dark contact
```

### Dark Sections
In dark sections, override text colors explicitly:
```tsx
<section className="woc-section woc-section--dark">
  <p style={{ color: "var(--color-dark-foreground)" }}>...</p>
  <p style={{ color: "color-mix(in srgb, var(--color-dark-foreground) 65%, transparent)" }}>Muted text</p>
</section>
```

---

## Step 5: Write TinaCMS Schema

For each page, append a collection to `tina/config.ts`:

```typescript
const homeCollection = {
  name: "home",
  label: "Home Page",
  path: "content/pages",
  format: "md",
  match: { include: "index" },
  ui: {
    router: () => "/",
    allowedActions: { create: false, delete: false },
  },
  fields: [
    { name: "title", label: "Page Title", type: "string", isTitle: true, required: true },
    // ... fields matching your schema comment block exactly
  ],
};
```

Add each collection to the `collections` array in `defineConfig`.

See `references/tina-schema-patterns.md` for full field type reference and common mistakes.

---

## Step 6: Write Content Markdown

For each page, write a content markdown file with frontmatter that matches the schema fields exactly.

```markdown
---
title: Home
headline: "The Firm Behind 340 Projects"
subheadline: "Structural engineering for projects that can't afford to be wrong."
heroImage: "https://source.unsplash.com/1600x900/?construction,crane,dusk,scale"
heroImageAlt: "Active construction site at dusk"
ctaLabel: "Start a Project"
ctaLink: "/contact"
services:
  - title: "Structural Engineering"
    description: "From concept load calculations to construction documentation."
    icon: "Building2"
stats:
  - value: "340+"
    label: "Projects Delivered"
  - value: "22"
    label: "Years in Operation"
---
```

---

## Step 7: Source Images

Every hero and image section needs a strong image URL. Never leave imageUrl empty.

**From the Design Spec:** Use the described mood + image direction keywords.

Format: `https://source.unsplash.com/1600x900/?{keywords}`

Think in mood and atmosphere:

| Image I want | Keywords |
|---|---|
| Golden light on industrial machinery, showing scale | `machinery,industrial,golden,light,detail,scale` |
| Night-shift logistics, port lights reflected | `port,containers,night,logistics,lights,rain` |
| Dental clinic interior, calm, early morning | `dental,interior,morning,calm,clean,clinic` |
| Architecture studio, drawings, natural light | `architecture,desk,drawings,natural,light,workspace` |
| Wide construction site at dusk | `construction,crane,site,dusk,architecture,scale` |
| Legal / professional, abstract architecture | `architecture,minimal,light,shadow,geometric,abstract` |

Use different keywords on each page. Atmospheric, not generic.

---

## Step 8: Write Copy — Voice Matters

Copy is part of the design. Weak copy kills strong layouts.

### Headline Formula
`[Strong verb or bold claim] + [specific outcome or differentiator]`

- Not: "Welcome to Our Services"
- Yes: "Built to Move 50,000 Tons a Year"
- Yes: "The Firm Behind India's Most Complex Contracts"
- Yes: "Clean Teeth in 45 Minutes. No Waiting."

### Stats
Specific and real. Round numbers feel invented.
- Not: "100+ clients"
- Yes: "340+ projects delivered" / "₹2.4Cr saved per client" / "98% on-time"

### Eyebrows
Short, uppercase, functional. Tease — never explain.
- Not: "Our Team Of Experts"
- Yes: "Two Decades of Precision" / "ISO 9001 · AS9100 · 48 Countries"

### Links
Every link is a page route. Zero exceptions.
- `/contact` not `#contact`
- `/services` not `#services`
- Never anchor links — there are no `#sections` on a multi-page site

---

## Execution Checklist

```
[ ] Design Spec read (or inline design phase complete)
[ ] Surprise Element identified and noted
[ ] globals.css @theme block — all tokens set, no skeleton defaults
[ ] --color-dark has brand character (not flat black)
[ ] --color-dark-foreground is warm/off-white (not pure white)
[ ] global.json — nav, footer, fonts, contact written
[ ] Schema fields defined in comment block at top of each page TSX
[ ] TSX field names match schema field names match markdown frontmatter keys
[ ] tina/config.ts — all page collections appended, collections array updated
[ ] Section rhythm verified — no 2 dark adjacent, no 3 light in row
[ ] Motion wrappers: FadeUp for text, Stagger for grids, HoverScale for images
[ ] No raw framer-motion imports
[ ] All image URLs use atmospheric keywords (not generic niche keywords)
[ ] All links are page routes — no anchor links
[ ] Headlines have strong verbs or bold claims — no weak openers
[ ] Eyebrows are distinctive — not just the block/section type name
[ ] Surprise Element is implemented and visible
[ ] Contact form uses Formspree ID from brief (or placeholder noted)
```

---

## Common Mistakes

| Mistake | Why It Fails | Fix |
|---|---|---|
| Schema field name differs between TSX, tina/config, and markdown | TinaCMS returns undefined silently | Define field names once in a comment block, copy them exactly |
| `import { motion }` from framer-motion directly | API misuse errors — wrapper API is different | Always use `FadeUp`, `Stagger`, `HoverScale` from `@/components/motion/` |
| `delay={0.8}` or higher | Feels broken on fast scroll | Max delay is `0.3` for text |
| "Welcome to Our Company" headline | Visitor leaves in 2 seconds | Open with what the company does at scale |
| Three light sections in a row | Page feels flat | Insert dark section every 3 light sections |
| Anchor links: `href="#contact"` | Breaks on multi-page site | Every link is a page route: `/contact`, `/services` |
| Flat `--color-dark: #111111` | Dark sections feel lifeless | Always give `--color-dark` a brand tint |
| Generic image keywords: `"business,people,team"` | Stock imagery kills credibility | Atmospheric and specific |
| Leaving eyebrow as section type name | "Services" above "Our Services" | Make eyebrows distinctive |
| Skipping the Surprise Element | Output is a template | Name it, implement it, make it client-specific |
| Contact page is `"use server"` but has form state | React error | Mark contact page or form component `"use client"` |
