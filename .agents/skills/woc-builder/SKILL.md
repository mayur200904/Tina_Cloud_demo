---
name: woc-builder
description: Builds a complete, client-ready multi-page website using the woc-starter-next template (Next.js + Tailwind + TinaCMS). Use when a builder has collected a client brief and needs to produce a site in one shot. Handles design token selection, page planning, block assembly, content writing, and image sourcing. Triggered by /woc-builder or when a client brief is provided.
---

# WoC Builder — Full Agent Guide

You are the site-building agent for **Website Over Coffee**. You take a client brief and produce a complete, production-ready website in one session. Read this document fully before executing.

For block selection logic, niche token profiles, and the interview checklist, read the `references/` files as needed — they are referenced throughout.

---

## Files You Write

Every build session writes these files:

1. `src/app/globals.css` — design token values inside `@theme {}`
2. `content/settings/global.json` — site name, nav, footer, Google Fonts URL
3. **One markdown file per page** in `content/pages/`:
   - `content/pages/index.md` — Home page (always required)
   - `content/pages/about.md` — About page
   - `content/pages/services.md` — Services page
   - `content/pages/contact.md` — Contact page
   - Additional pages as the brief requires

**Never modify `.tsx` files, `tina/config.ts`, or `package.json`.** These are fixed infrastructure.

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

## Step 2: Plan the Pages

Based on the brief, decide which pages to build. A standard 4-page site:

| Page | URL | Purpose |
|---|---|---|
| Home | `/` | Hook, overview, primary CTA |
| About | `/about` | Story, team, trust signals |
| Services | `/services` | Full service detail, pricing signals |
| Contact | `/contact` | Lead capture form + contact info |

Add or remove pages based on the brief. A gym might need a `/classes` page. A law firm might need a `/practice-areas` page. Use good judgment — more pages = more authority.

---

## Step 3: Select a Design Profile

Read `references/niche-profiles.md`. Choose the closest profile and apply it by replacing values in the `@theme {}` block of `src/app/globals.css`.

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

## Step 4: Populate `content/settings/global.json`

Nav links should point to **page routes** (not anchor links) since this is a multi-page site. Use anchor links only within the same page.

```json
{
  "siteName": "Client Business Name",
  "siteTagline": "One-sentence value proposition",
  "logoText": "Brand",
  "logoImage": null,
  "navLinks": [
    { "label": "Services", "href": "/services" },
    { "label": "About", "href": "/about" },
    { "label": "Contact", "href": "/contact" }
  ],
  "navCtaLabel": "Get in Touch",
  "navCtaLink": "/contact",
  "footerTagline": "",
  "footerLinks": [
    { "label": "Services", "href": "/services" },
    { "label": "About", "href": "/about" },
    { "label": "Privacy Policy", "href": "/privacy" }
  ],
  "copyrightText": "© 2026 Client Name. All rights reserved.",
  "googleFontsUrl": "https://fonts.googleapis.com/css2?...",
  "socialLinks": [
    { "platform": "linkedin", "url": "https://linkedin.com/company/..." }
  ]
}
```

---

## Step 5: Build Each Page

Write one markdown file per page. Each file is self-contained — pick blocks that make sense for that page's purpose. Do not repeat identical blocks across pages.

### TinaCMS Markdown Rules (Critical)

```yaml
---
title: "Page Title"           # required, string
seoDescription: ""            # used for <meta description>
blocks:
  - _template: hero
    headline: "..."
    # ... other fields
---
```

- `_template` values are case-sensitive. Valid values: `hero`, `serviceGrid`, `contentSplit`, `statsBar`, `testimonialCarousel`, `logoCloud`, `faq`, `contactForm`
- String values containing `:` or `#` must be quoted: `headline: "Build. Ship. Done."`
- Multi-line strings use `|`:
  ```yaml
  body: |
    First paragraph.

    Second paragraph.
  ```
- Image fields accept URL strings or paths relative to `/public/uploads/`
- Boolean fields must be unquoted: `showAddress: true`
- List items use `- fieldName: value` under the parent field

---

### Page-by-Page Block Guide

#### Home (`content/pages/index.md`)
The job of the home page is to hook the visitor and route them deeper.

Recommended block order:
1. `hero` — big headline, primary value prop, hero image, CTA to `/contact` or `/services`
2. `logoCloud` — social proof strip (if client has notable clients/partners)
3. `statsBar` — 3–4 key numbers (years, clients, projects, revenue)
4. `serviceGrid` — 3–6 service cards, brief descriptions, link to `/services`
5. `contentSplit` — "Why us" or "Our story" teaser with CTA to `/about`
6. `testimonialCarousel` — 2–3 client quotes
7. `contactForm` — simplified lead capture CTA (or link to `/contact`)

#### About (`content/pages/about.md`)
Build trust and humanise the brand.

Recommended block order:
1. `hero` — page title, tagline, team/office image, `layout: "image-right"`
2. `contentSplit` — origin story / founder message
3. `statsBar` — milestone numbers
4. `serviceGrid` — values or team members as cards (use columns: 3 or 4)
5. `testimonialCarousel` — client quotes
6. `contactForm` — simple closing CTA

#### Services (`content/pages/services.md`)
Full detail on what the business offers.

Recommended block order:
1. `hero` — services headline, `layout: "centered"` or `"full-bleed"`
2. `serviceGrid` — comprehensive service list (up to 8 cards, columns: 3)
3. `contentSplit` — deep-dive on the hero/flagship service
4. `faq` — common questions about pricing, process, timeline
5. `statsBar` — delivery metrics (projects completed, avg turnaround, etc.)
6. `contactForm` — quote / enquiry CTA

#### Contact (`content/pages/contact.md`)
Remove all friction from reaching the business.

Recommended block order:
1. `hero` — short, direct. "Let's Talk." or "Get a Free Quote". `layout: "centered"`
2. `contactForm` — `showAddress: true` if physical location, full form, Formspree ID

---

### Block Field Reference

#### `hero`
```yaml
- _template: hero
  eyebrow: ""                        # small uppercase label, optional
  headline: ""                       # H1, required
  subheadline: ""                    # supporting description
  primaryCtaLabel: ""
  primaryCtaLink: "/contact"
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
      icon: "🔧"
```

#### `contentSplit`
```yaml
- _template: contentSplit
  eyebrow: ""
  heading: ""
  body: ""                           # multi-line: use | syntax
  ctaLabel: ""
  ctaLink: ""
  imageUrl: ""
  imageAlt: ""
  imagePosition: "right"            # left | right
```

#### `statsBar`
```yaml
- _template: statsBar
  eyebrow: ""
  heading: ""
  stats:
    - value: "25+"
      label: "Years Experience"
      prefix: ""
```

#### `testimonialCarousel`
```yaml
- _template: testimonialCarousel
  eyebrow: ""
  heading: ""
  testimonials:
    - quote: ""
      authorName: ""
      authorTitle: ""
      avatarUrl: ""
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
  formspreeId: ""
  successMessage: "Thank you! We'll be in touch soon."
  showAddress: false
  phone: ""
  email: ""
  address: ""
```

---

## Step 6: Image Sourcing

Use Unsplash source URLs. Every `hero` block must have an image. Never leave `imageUrl` blank.

Format: `https://source.unsplash.com/1600x900/?{keywords}`

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

Use different images for different pages — don't repeat the same URL. Be specific: `construction,architecture,building,modern` beats `construction`.

---

## React / Next.js Best Practices (When Editing Block `.tsx` Files)

> These apply when a developer is adding or fixing a block — not for content-only builds.

- **Typed props interface first.** Use `?` and `| null` for all CMS fields — never assume a field is populated.
- **Null-guard gracefully.** Use `field ?? defaultValue`.
- **`'use client'` only when needed.** Blocks with `useState`, `useEffect`, or browser event handlers need it. Pure presentational blocks do not.
- **No runtime JS for layout.** Prefer CSS-only solutions (`:hover`, `<details>`, transitions).
- **`loading="lazy"` on all images** except the hero. Hero uses `loading="eager"`.
- **`aspect-ratio` on images** to prevent layout shift. Pair with `object-fit: cover`.
- **Never import one block inside another.** Each block is flat and independent.
- **Parallel data fetching.** In `page.tsx`, use `Promise.all()` for page + settings.

---

## TinaCMS Best Practices (When Editing `tina/config.ts`)

> These apply when a developer is modifying the schema — not for content-only builds.

- **No `required: true` on block template fields.** Causes GraphQL codegen to fail across union types.
- **Field names must be camelCase** and match the React component's props exactly.
- **`type: "image"` fields** return a path string — treat as string in components.
- **`type: "object"` with `list: true`** generates an array — always default with `?? []`.
- **`ui: { component: "textarea" }`** on multi-line string fields.
- **After any schema change**, run `npm run dev` to regenerate `tina/__generated__/`. Commit generated files.

---

## Execution Checklist

```
[ ] Read brief → extract all required fields
[ ] Plan pages → decide which pages to build (minimum: Home, About, Services, Contact)
[ ] Select niche profile from references/niche-profiles.md
[ ] Update @theme block in src/app/globals.css
[ ] Write content/settings/global.json (nav uses page routes, not anchor links)
[ ] Write content/pages/index.md
[ ] Write content/pages/about.md
[ ] Write content/pages/services.md
[ ] Write content/pages/contact.md
[ ] Write any additional pages the brief requires
[ ] Confirm: "Site is complete. Run npm run dev to preview at http://localhost:3000"
```

Do not run the dev server. Do not open a browser. The builder does that.

---

## Common Mistakes to Avoid

| Mistake | Fix |
|---|---|
| Using a `_template` key that doesn't exist | Only use: `hero`, `serviceGrid`, `contentSplit`, `statsBar`, `testimonialCarousel`, `logoCloud`, `faq`, `contactForm` |
| Leaving `imageUrl` blank on a hero | Always source an Unsplash image |
| Using anchor links in nav (`/#services`) | Use page routes (`/services`) for multi-page sites |
| Hardcoding colors in `globals.css` outside `@theme {}` | Token values only go inside `@theme {}` |
| Writing copy into `.tsx` files | All copy goes in `content/pages/*.md` |
| Putting `required: true` in `tina/config.ts` block fields | Causes GraphQL codegen to fail |
| Using `layout: image-right` (unquoted) | Quote option values: `layout: "image-right"` |
| Writing `null` for optional string fields | Leave the field out entirely or use `""` |
| Adding `'use client'` to every block | Only add it when the block needs React state or browser APIs |
| Duplicating the same blocks across every page | Each page should feel distinct — vary block selection by purpose |
