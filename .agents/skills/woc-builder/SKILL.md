---
name: woc-builder
description: Execution phase for WoC client sites. Builds complete, production-ready multi-page websites using the woc-starter-next template (Next.js + TinaCMS). Reads a Design Spec from woc-design (or runs an inline design phase if none provided) and implements it precisely. Triggered by /woc-builder or when a Design Spec + client brief is provided.
---

# WoC Builder

You are a **precision implementer**. The design decisions are already made — your job is to execute them without deviation, without improvisation, and without leaving anything incomplete.

You write `globals.css`, `global.json`, and all content markdown files. You do not touch `.tsx` files, `tina/config.ts`, or `package.json`.

**Before touching a single file:** read everything given to you. If a Design Spec exists, it governs all design decisions. If no Design Spec is provided, run the inline design phase (Step 1A) before writing any files.

---

## The Standard

Ask before submitting: *"If the builder showed this to a creative director at a leading agency, would they say this was made for this specific client — or would it look like a template?"*

Four things separate great WoC sites from template output:
1. **The hero stops the visitor in 3 seconds** — cinematic, confident, specific to this client
2. **Visual rhythm throughout** — alternating dark/light/dark sections, no two dark sections adjacent, no three light sections in a row
3. **Motion feels earned** — every animation serves a purpose; none are gratuitous
4. **Copy is specific** — no Lorem Ipsum energy, no weak headlines, no generic eyebrows

---

## Files You Write

```
src/app/globals.css          → design tokens (@theme block only)
content/settings/global.json → nav, footer, fonts, site name
content/pages/index.md       → Home
content/pages/about.md       → About
content/pages/services.md    → Services
content/pages/contact.md     → Contact
(+ additional pages from brief)
```

**Never touch:** `.tsx` files, `tina/config.ts`, `package.json`, `tina/` directory.

---

## Step 1: Read the Design Spec (or Run Inline Design)

### If a Design Spec is provided:

Read it completely before writing any file. Extract:
- Token values (copy exactly as specified, with all overrides)
- Surprise Element (implement this first — it's the most important decision)
- Per-page experience map (this determines block sequence and section variants)
- Copy tone guide (this governs every headline and eyebrow you write)
- Image direction (use the described mood, not a generic keyword category)

The Design Spec is authoritative. If you disagree with a decision, implement it anyway. Design discussions happen in the woc-design phase, not here.

### If no Design Spec is provided (inline design phase):

Run a compressed version of woc-design:

1. **Client Character** — 2 sentences: who is this business, really?
2. **Visual Concept** — 3–4 sentence cinematic paragraph (see woc-design SKILL for format)
3. **Surprise Element** — name it before writing any file
4. **Profile + Tokens** — select from `.agents/skills/woc-design/references/niche-profiles.md`, set all tokens with rationale for overrides
5. **Experience map** — per-page block sequence with emotional intent

Document these inline (as a brief note before your first file write) so the builder can see what you're doing and redirect before you're deep into implementation.

---

## Step 2: Set Design Tokens

Write the `@theme {}` block in `src/app/globals.css`. Set every token from the Design Spec.

Rules:
- `--color-dark` must have character — a brand-tinted deep dark, not flat `#111111`
- `--color-dark-foreground` must be warm or off-white — not pure `#ffffff`
- Do not leave any token at the skeleton default value — every token is a design decision

Also update `content/settings/global.json`:
```json
{
  "siteName": "[Business Name]",
  "nav": [
    { "label": "Home", "href": "/" },
    { "label": "About", "href": "/about" },
    { "label": "Services", "href": "/services" },
    { "label": "Contact", "href": "/contact" }
  ],
  "footerTagline": "[Short, memorable tagline — sounds like something they'd actually say]",
  "footerEmail": "[email]",
  "footerPhone": "[phone]",
  "googleFontsUrl": "[URL from profile token set]"
}
```

---

## Step 3: Build Each Page

Read `references/block-catalog.md` for field syntax. Read `references/animation-library.md` to understand which layout choices trigger which animations.

For each block you place, answer:
- What is the **visual job** of this section? (hook / establish / detail / trust / convert)
- What does the visitor **feel** when they arrive here?
- What is the **contrast** with the section before it?
- Which **layout variant** best serves the mood?

### Section Rhythm — Read This Carefully

Pages are composed like music — rise and fall, tension and release. Vary the visual weight.

**Good rhythm patterns:**
```
Full-bleed dark hero → light stats band → white service cards → dark split or statsBar → off-white split → light testimonials → dark footer
Full-bleed image hero → cream logoCloud → dark gradient statsBar → light grid → split image right → dark contactForm footer
Centered editorial hero → light logoCloud → accent statsBar → white split → dark testimonials → light FAQ → dark contact
```

**Rules:**
- Never stack two dark sections
- Never stack three light sections
- Insert a dark section (statsBar, contactForm, testimonialCarousel dark variant) every 3 light sections minimum
- The hero and footer together create the bookend contrast for the whole page

### Animations Fire Automatically

You don't control animation classes from markdown. You control animation quality through layout and template choices:

| Choice you make | Animation result |
|---|---|
| `layout: "full-bleed"` hero | Parallax bg + animated scroll indicator |
| `layout: "image-right"` hero | Offset shape reveal + image zoom hover |
| `layout: "centered"` hero | Clean centered fade-up |
| `serviceGrid` with `columns: 3` | Staggered card cascade (80ms intervals) |
| `statsBar` block | CountUp from zero on scroll + ghost bg number |
| `logoCloud` block | Infinite marquee + grayscale→color hover |
| `contentSplit` block | Floating badge chip + image scale hover |

More blocks = more scroll moments. A page with 6 blocks gives 6 distinct arrival experiences.

See `references/animation-library.md` for full capability reference.

---

## Step 4: Write Content — Voice Matters

Copy is part of the design. Weak copy kills strong layouts.

### Headline Formula
`[Strong verb or bold claim] + [specific outcome or differentiator]`

- Not: "Welcome to Our Services"
- Yes: "Built to Move 50,000 Tons a Year"
- Yes: "The Firm Behind India's Most Complex Contracts"
- Yes: "Clean Teeth in 45 Minutes. No Waiting."

### Stats
Make them specific and real. Round numbers feel invented.
- Not: "100+ clients"
- Yes: "340+ projects delivered" / "₹2.4Cr saved per client on average" / "98% on-time delivery rate"

### Eyebrows
Short, uppercase, functional. Tease — never explain.
- Not: "Our Team Of Experts"
- Yes: "Two Decades of Precision" / "ISO 9001 · AS9100 · 48 Countries"

### Links
Every link is a page route. Zero exceptions.
- `/contact` not `#contact`
- `/services` not `#services`
- Never use anchor links — there are no anchor sections on a multi-page site

### Copy Tone
Follow the Copy Tone Guide from the Design Spec exactly. If no Spec, derive it from the visual concept and client character you wrote in Step 1A.

---

## Step 5: Source Images

Every hero and contentSplit needs a strong image. Never leave imageUrl empty.

**From the Design Spec:** Use the described mood + image direction keywords.

**Constructing keywords — think in mood, not category:**

Ask: *What atmospheric quality does this image need?* Then translate.

| Mood description | Keywords |
|---|---|
| Golden light on industrial machinery, showing scale | `machinery,industrial,golden,light,detail,scale` |
| Night-shift logistics, port lights reflected | `port,containers,night,logistics,lights,rain` |
| Dental clinic interior, calm, early morning | `dental,interior,morning,calm,clean,clinic` |
| Architecture studio, drawings, natural light | `architecture,desk,drawings,natural,light,workspace` |
| Wide-angle construction site at dusk | `construction,crane,site,dusk,architecture,scale` |
| Corporate city view from an executive office | `city,office,window,skyline,architecture,view` |
| Legal / professional, abstract architecture | `architecture,minimal,light,shadow,geometric,abstract` |
| Warm retail interior, soft lighting | `retail,interior,warm,light,shelves,calm` |

Format: `https://source.unsplash.com/1600x900/?{keywords}`

Use different keywords on each page. Use atmospheric words, not generic category words.

---

## Execution Checklist

```
[ ] Design Spec read (or inline design phase complete)
[ ] Surprise Element identified and noted
[ ] globals.css @theme block — all tokens set, no skeleton defaults remaining
[ ] --color-dark has brand character (not flat black)
[ ] --color-dark-foreground is warm or off-white (not pure white)
[ ] global.json written — nav, footer, fonts, contact
[ ] index.md — hero is cinematic, visual rhythm verified
[ ] about.md — opens with conviction, earns trust, humanizes
[ ] services.md — each service is specific and differentiated
[ ] contact.md — frictionless, one trust signal near the form
[ ] Every link is a page route (no anchor links anywhere)
[ ] No weak headlines — every headline has a strong verb or bold claim
[ ] No generic eyebrows — every eyebrow is distinctive
[ ] No two dark sections adjacent
[ ] Image URLs use atmospheric keywords (not generic niche keywords)
[ ] Surprise Element is implemented and visible
```

---

## Common Mistakes

| Mistake | Why It Fails | Fix |
|---|---|---|
| "Welcome to Our Company" headline | Visitor leaves in 2 seconds | Open with what the company does at scale — the actual value |
| Same layout on every hero | Every page feels identical | Mix `full-bleed`, `image-right`, `centered` across pages |
| Three light sections in a row | Page feels flat and lifeless | Insert dark statsBar or dark contactForm as a break |
| Using anchor links | Breaks on multi-page site — there are no `#services` sections | Every link must be a page route, always |
| Writing `primaryCtaLink: "#contact"` | Hash links point to an anchor on the current page — it doesn't exist | Use `/contact`, `/services`, `/about` |
| Generic image keywords: `"business,people,team"` | Stock imagery kills credibility | Be specific to mood and industry atmosphere |
| Flat stats: "100+ clients" | Feels invented | Specific numbers with units and context |
| Leaving eyebrow as the block type name | "Services" above "Our Services" | Make eyebrows distinctive — certifications, years, specific stats |
| Flat `--color-dark: #111111` | Dark sections feel like a black hole, not a brand decision | Always give `--color-dark` a brand tint |
| Skipping the Surprise Element | Output is a template, not a site | Name it, implement it, make it specific |

---

## Block Reference

Quick field reference for each block. Full selection guidance in `references/block-catalog.md`.

### hero
```yaml
- _template: hero
  eyebrow: "Eyebrow text (uppercase, distinctive)"
  headline: "Strong declarative headline"
  subheadline: "Supporting statement — specific, not generic"
  primaryCtaLabel: "Action label"
  primaryCtaLink: "/contact"
  secondaryCtaLabel: "Secondary action"
  secondaryCtaLink: "/services"
  imageUrl: "https://source.unsplash.com/1600x900/?keywords"
  imageAlt: "Descriptive alt text"
  layout: "full-bleed"   # full-bleed | image-right | image-left | centered | type-only
  # type-only: no image; dark background; massive typography; no imageUrl needed
```

### statsBar
```yaml
- _template: statsBar
  eyebrow: "Proof point label"
  stats:
    - value: "340+"
      label: "Projects Delivered"
    - value: "₹2.4Cr"
      label: "Average Client Saving"
    - value: "98%"
      label: "On-Time Delivery"
    - value: "22"
      label: "Years in Operation"
```

### serviceGrid
```yaml
- _template: serviceGrid
  eyebrow: "Eyebrow (distinctive)"
  heading: "Section heading"
  subheading: "Optional supporting line"
  variant: "grid"   # grid | alternating
  columns: 3   # 2 | 3 | 4 — grid variant only
  services:
    - title: "Service Name"
      description: "Specific, benefit-led description"
      icon: "⚙️"
      imageUrl: "https://source.unsplash.com/1200x900/?keywords"  # alternating only
      imageAlt: "Descriptive alt text"
```

### contentSplit
```yaml
- _template: contentSplit
  eyebrow: "Eyebrow"
  heading: "Section heading"
  body: "Body paragraph one.\n\nParagraph two if needed."
  ctaLabel: "CTA label"
  ctaLink: "/contact"
  imageUrl: "https://source.unsplash.com/1200x900/?keywords"
  imageAlt: "Alt text"
  imagePosition: "right"   # right | left
```

### testimonialCarousel
```yaml
- _template: testimonialCarousel
  eyebrow: "Social proof label"
  heading: "Section heading"
  variant: "carousel"   # carousel | featured
  # featured: one large quote, dark background, magazine editorial style
  testimonials:
    - quote: "Verbatim quote from the client's customer."
      authorName: "Full Name"
      authorTitle: "Title, Company Name"
      avatarUrl: ""  # optional
```

### logoCloud
```yaml
- _template: logoCloud
  eyebrow: "Trusted by / Certified by"
  heading: "Optional heading"
  logos:
    - imageUrl: "https://..."
      alt: "Logo alt text"
      width: 120
```

### faq
```yaml
- _template: faq
  eyebrow: "FAQ"
  heading: "Section heading"
  items:
    - question: "Question text?"
      answer: "Clear, direct answer."
```

### processBlock
```yaml
- _template: process
  eyebrow: "How It Works"
  heading: "Our Process"
  subheading: "Optional supporting line"
  variant: "steps"   # steps (horizontal) | timeline (vertical with connecting line)
  steps:
    - number: "01"   # optional — auto-numbered if omitted
      title: "Step Title"
      description: "Clear explanation of what happens at this stage."
      icon: "🔍"   # optional emoji — replaces number if set
```

### teamBlock
```yaml
- _template: team
  eyebrow: "The Team"
  heading: "Meet the People Behind the Work"
  columns: 3   # 2 | 3 | 4
  members:
    - name: "Full Name"
      role: "Title / Position"
      bio: "Short bio sentence or two."
      imageUrl: "https://source.unsplash.com/800x600/?portrait,professional"
      imageAlt: "Name, role"
```

### fullWidthImage
```yaml
- _template: fullWidthImage
  imageUrl: "https://source.unsplash.com/1600x900/?keywords"
  imageAlt: "Descriptive alt text"
  overlayText: "Optional dramatic line displayed over the image"
  overlayPosition: "center"   # center | left | bottom-left
  height: "medium"   # short | medium | tall
```

### pullQuote
```yaml
- _template: pullQuote
  quote: "The statement, belief, or manifesto line — make it count."
  attribution: "Name, Role or Company"   # optional
  dark: false   # true = dark background (counts as dark section for rhythm)
  size: "normal"   # normal | large
```

### contactForm
```yaml
- _template: contactForm
  eyebrow: "Get in touch"
  heading: "Contact heading"
  subheading: "One trust signal or reassurance"
  email: "contact@business.com"
  phone: "+91 98765 43210"
  address: "Address if brick-and-mortar"
```
