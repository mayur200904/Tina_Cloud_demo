---
name: woc-builder
description: Builds an 80% complete, client-ready website using the woc-starter template (Astro + Tailwind + TinaCMS). Use when a builder has collected a client brief and needs to produce a site in one shot. Handles design token selection, block assembly, content writing, and image sourcing. Triggered by /woc-builder or when a client brief is provided.
---

# WoC Builder — Full Agent Guide

You are the site-building agent for **Website Over Coffee**. You take a client brief and produce an 80%-complete website in one session by writing three files. Read this document fully before executing.

For block selection logic, niche token profiles, and the interview checklist, read the `references/` files as needed — they are referenced throughout.

---

## The Three Files You Write

Every build session writes exactly these three files and nothing else:

1. `src/styles/global.css` — design token values inside `@theme {}`
2. `content/pages/index.md` — all page blocks with populated content
3. `content/settings/global.json` — site name, nav, footer, Google Fonts URL

**Never modify `.astro` files, `tina/config.ts`, or `package.json`.** These are fixed infrastructure. The component structure is locked to the TinaCMS schema.

---

## Step 1: Extract the Brief

Read `references/interview-checklist.md` for the full list of questions. At minimum, extract:

- Business name & niche (e.g. "Apex Engineering, industrial hydraulics")
- Target audience (professionals / SMB / manufacturing / startup)
- Tone/vibe (corporate, warm, industrial, modern)
- 3–6 specific services with short descriptions
- Key differentiators (years in operation, certifications, known clients, stats)
- Contact details (email, phone, address if relevant)
- Domain (owned or needs one)

---

## Step 2: Select a Design Profile

Read `references/niche-profiles.md`. Choose the closest profile and apply it by replacing values in the `@theme {}` block of `src/styles/global.css`.

**Modify only these variables:**
```css
--color-primary
--color-primary-foreground
--color-secondary
--color-secondary-foreground
--color-background
--color-foreground
--color-surface
--color-surface-border
--color-muted
--font-heading
--font-sans
--radius-global
--radius-card
--radius-button
--nav-bg
--nav-text
--nav-border  (only if profile defines it)
```

Also update `googleFontsUrl` in `content/settings/global.json` with the matching Google Fonts URL from the profile.

**Do not touch** the utility classes, button styles, or spacing tokens below the `@theme {}` block.

---

## Step 3: Select and Populate Blocks

Read `references/block-catalog.md` for which blocks to include per niche and what order to arrange them.

Write `content/pages/index.md` using this frontmatter structure. Only include blocks you are filling with real content — remove empty blocks entirely.

### TinaCMS Markdown Rules (Critical)

```yaml
---
title: "Page Title"           # required, string
seoDescription: ""            # used for <meta description>
blocks:
  - _template: hero           # must match the template name in tina/config.ts exactly
    headline: "..."
    # ... other fields
---
```

- `_template` values are case-sensitive. Valid values: `hero`, `serviceGrid`, `contentSplit`, `statsBar`, `testimonialCarousel`, `logoCloud`, `faq`, `contactForm`
- String values containing `:` or `#` must be quoted: `headline: "Build. Ship. Done."`
- Multi-line strings: use `|` for literal block scalars
  ```yaml
  body: |
    First paragraph here.
    
    Second paragraph here.
  ```
- Image fields (`imageUrl`, `avatarUrl`, `logoImage`) accept either a URL string or a path relative to `/public/uploads/`
- Boolean fields (`showAddress`) must be unquoted: `showAddress: true` not `showAddress: "true"`
- List items use `- fieldName: value` indented under the parent field

### Block Field Reference

#### `hero`
```yaml
- _template: hero
  eyebrow: ""                        # small uppercase label, optional
  headline: ""                       # H1, required
  subheadline: ""                    # supporting description
  primaryCtaLabel: ""
  primaryCtaLink: "/#contact"
  secondaryCtaLabel: ""              # optional
  secondaryCtaLink: ""               # optional
  imageUrl: "https://source.unsplash.com/1600x900/?keywords"
  imageAlt: ""
  layout: "image-right"              # image-right | image-left | centered | full-bleed
```

#### `serviceGrid`
```yaml
- _template: serviceGrid
  eyebrow: ""
  heading: ""
  subheading: ""
  columns: 3                         # 2 | 3 | 4
  services:
    - title: ""
      description: ""
      icon: "🔧"                     # emoji, or leave blank
```

#### `contentSplit`
```yaml
- _template: contentSplit
  eyebrow: ""
  heading: ""
  body: ""                           # multi-line: use | syntax
  ctaLabel: ""                       # optional
  ctaLink: ""                        # optional
  imageUrl: ""
  imageAlt: ""
  imagePosition: "right"            # left | right
```

#### `statsBar`
```yaml
- _template: statsBar
  eyebrow: ""                        # optional
  heading: ""                        # optional
  stats:
    - value: "25+"
      label: "Years Experience"
      prefix: ""                     # e.g. "$" or ">" — optional
```

#### `testimonialCarousel`
```yaml
- _template: testimonialCarousel
  eyebrow: ""
  heading: ""
  testimonials:
    - quote: ""
      authorName: ""
      authorTitle: ""                # e.g. "CEO, Acme Corp"
      avatarUrl: ""                  # optional
```

#### `logoCloud`
```yaml
- _template: logoCloud
  label: "Trusted by"
  logos:
    - name: ""
      imageUrl: ""
```

#### `faq`
```yaml
- _template: faq
  eyebrow: ""
  heading: ""
  subheading: ""
  items:
    - question: ""
      answer: ""
```

#### `contactForm`
```yaml
- _template: contactForm
  eyebrow: ""
  heading: ""
  subheading: ""
  formspreeId: ""                    # from formspree.io — builder sets up per client
  successMessage: "Thank you! We'll be in touch soon."
  showAddress: false                 # set true if client has a physical location
  phone: ""
  email: ""
  address: ""                        # multi-line: use | syntax
```

---

## Step 4: Populate `content/settings/global.json`

```json
{
  "siteName": "Client Business Name",
  "siteTagline": "One-sentence value proposition",
  "logoText": "Brand",
  "logoImage": null,
  "navLinks": [
    { "label": "Services", "href": "/#services" },
    { "label": "About", "href": "/#about" },
    { "label": "Contact", "href": "/#contact" }
  ],
  "navCtaLabel": "Get in Touch",
  "navCtaLink": "/#contact",
  "footerTagline": "",
  "footerLinks": [
    { "label": "Privacy Policy", "href": "/privacy" }
  ],
  "copyrightText": "© 2026 Client Name. All rights reserved.",
  "googleFontsUrl": "https://fonts.googleapis.com/css2?...",
  "socialLinks": [
    { "platform": "linkedin", "url": "https://linkedin.com/company/..." }
  ]
}
```

`navLinks` `href` values should use anchor links (`/#services`) that match the block order on the page, not absolute URLs.

---

## Step 5: Image Sourcing

Use Unsplash source URLs. Do not leave imageUrl blank — a missing hero image makes the page look unfinished.

Format: `https://source.unsplash.com/1600x900/?{keywords}`

**Keyword guide by niche:**
| Niche | Keywords |
|---|---|
| Corporate / Law | `office,professionals,meeting,city` |
| Medical / Dental | `dental,clinic,doctor,medical` |
| Gym / Wellness | `gym,fitness,training,wellness` |
| Manufacturing | `factory,manufacturing,industrial,machinery` |
| Construction | `construction,architecture,building` |
| Cafe / Hospitality | `cafe,coffee,restaurant,interior` |
| Tech / SaaS | `technology,software,laptop,abstract` |
| Retail | `retail,shop,products,storefront` |

Keep keywords specific. `manufacturing,factory,clean` ≠ `manufacturing` — specificity gets a better image.

---

## Astro Best Practices (When Editing `.astro` Blocks)

> These apply when a developer is adding or fixing a block — not for content-only builds.

- **Props interface first.** Always define an `interface Props {}` at the top of the frontmatter. Use `?` for optional fields so the block never crashes on missing data.
- **Null-guard gracefully.** Use `Astro.props.field ?? defaultValue` — never assume a CMS field is populated.
- **No runtime JS for layout.** Prefer CSS-only solutions (`:hover`, `<details>`, CSS animations). Use `<script>` only for interactive state that CSS cannot handle (e.g. carousels, mobile nav toggle).
- **`loading="lazy"` on all images** except the hero (above the fold). Hero uses `loading="eager"`.
- **`aspect-ratio` on images** to prevent layout shift. Always set with `object-fit: cover`.
- **Scoped styles are preferred.** Put `<style>` at the bottom of each block file. Only add to `global.css` if the utility is genuinely shared.
- **Slot `<slot />` in layouts only.** Block components compose themselves — they do not use slots.
- **Never import one block inside another.** Each block is a flat, independent component.

---

## TinaCMS Best Practices (When Editing `tina/config.ts`)

> These apply when a developer is modifying the schema — not for content-only builds.

- **No `required: true` on block template fields.** TinaCMS generates a GraphQL union across all block templates. Conflicting nullability (`String!` vs `String`) on shared field names causes codegen to fail. Omit `required` entirely from block template fields.
- **Field names must be camelCase** and must exactly match the Astro component's `Props` interface.
- **`type: "image"` fields** return a path string (not a URL object). Always treat them as strings in the component.
- **`type: "object"` with `list: true`** generates an array. Always default to `[]` in the component: `const items = Astro.props.items ?? []`.
- **`ui: { component: "textarea" }`** on string fields that hold multi-line copy. Without this, TinaCMS renders a single-line input.
- **`ui: { defaultValue: ... }`** sets the pre-filled value in the CMS editor — it does not affect the content markdown. Use it for fields like `layout: "image-right"` so new blocks are sensible by default.
- **Site Settings collection** uses `format: "json"` and `match: { include: "global" }` — this locks it to `content/settings/global.json` specifically.
- **After any schema change**, run `npm run dev` to regenerate `tina/__generated__/`. Commit the generated files — they are required for production builds.

---

## Execution Checklist

```
[ ] Read brief → extract all required fields
[ ] Select niche profile from references/niche-profiles.md
[ ] Update @theme block in src/styles/global.css
[ ] Write content/pages/index.md with all relevant blocks
[ ] Write content/settings/global.json
[ ] Confirm: "Site is 80% built. Run npm run dev to preview at http://localhost:4321"
```

Do not run the dev server. Do not open a browser. The builder does that.

---

## Common Mistakes to Avoid

| Mistake | Fix |
|---|---|
| Using a `_template` key that doesn't exist | Only use: `hero`, `serviceGrid`, `contentSplit`, `statsBar`, `testimonialCarousel`, `logoCloud`, `faq`, `contactForm` |
| Leaving `imageUrl` blank | Always source an Unsplash image |
| Hardcoding colors in `global.css` outside `@theme {}` | Token values only go inside `@theme {}` |
| Writing copy into `.astro` files | All copy goes in `content/pages/index.md` |
| Putting `required: true` in `tina/config.ts` block fields | Causes GraphQL codegen to fail |
| Using `layout: image-right` (unquoted with a space) | Quote all option-field values: `layout: "image-right"` |
| Writing `null` for optional string fields | Leave the field out entirely or use `""` |
