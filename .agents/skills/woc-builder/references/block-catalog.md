# Block Catalog — Selection Guide by Niche

## Always Include
- `hero` — every site
- `serviceGrid` — every site (3–6 services)
- `contentSplit` — every site (About / Story section)
- `testimonialCarousel` — every site (3 quotes minimum)
- `contactForm` — every site (last section on each page, or its own `/contact` page)

## Conditional Blocks

### `statsBar`
Include when the business has impressive quantitative proof points.
- ✅ Manufacturing: years in operation, units produced, countries served, employees
- ✅ Law / Finance / Consulting: cases won, assets managed, years of practice
- ✅ B2B / Enterprise: number of clients, response time, uptime SLAs
- ❌ Small retail, single-service SMB, restaurants → skip, looks empty without real numbers

### `logoCloud`
- ✅ Manufacturing / B2B: client logos or certifications (ISO, CE, etc.)
- ✅ Professional services: association memberships, accreditations
- ❌ SMB consumer (clinics, salons, cafes) → skip

### `faq`
- ✅ Professional services (law, accounting, HR): billing, process, timelines
- ✅ SMB services (dental, gym, salon): hours, pricing, policies
- ❌ Manufacturing / industrial B2B → skip (handled in sales conversations)

### `processBlock`
Include when the business has a workflow worth showing — step-based service delivery, methodology, or onboarding sequence.
- ✅ Consulting / agencies: client onboarding, project phases
- ✅ Professional services: case intake → strategy → execution → outcome
- ✅ Manufacturing: order → engineering → production → delivery
- ✅ Home services / contractors: estimate → schedule → deliver → follow-up
- ❌ Retail, hospitality, simple SMB → skip (process is obvious)

**Variant selection:**
- `steps` — horizontal numbered sequence; use when steps are parallel or equal weight (3–6 steps)
- `timeline` — vertical with connecting line; use when steps are sequential and have detailed descriptions (3–8 steps); better for Corporate Professional and Premium Services

### `teamBlock`
Include when people are a key trust signal for the business.
- ✅ Law firms, clinics, medical practices — clients need to know who they'll work with
- ✅ Consulting / agencies — team expertise and diversity builds confidence
- ✅ Architecture, design, creative studios — faces humanize technical work
- ✅ Financial advisors, therapists — relationship-based services
- ❌ Manufacturing, retail, restaurants → skip (team isn't a purchase driver)

**Column recommendations:**
- 2 cols — law firms, boutique studios (highlight fewer, bigger profiles)
- 3 cols — most agencies, clinics, consulting firms
- 4 cols — larger teams, startup culture pages

### `fullWidthImageBlock`
Use as visual punctuation between dense content sections. Creates breathing room and mood shift.
- ✅ Any site with strong photography available
- ✅ After a dense service grid or process section — gives the eye a rest
- ✅ Between two light sections that would otherwise run too long
- ❌ Skip if client has no strong photography (use pullQuote instead)

**Height selection:**
- `short` (28vh) — subtle divider, barely intrudes on content flow
- `medium` (50vh) — strong visual pause; default
- `tall` (75vh) — immersive, near-hero moment; use sparingly (once per page max)

**Placement patterns:**
- After serviceGrid, before testimonials
- Between contentSplit sections on long-form About pages
- As a dramatic mid-page moment on landing pages

### `pullQuoteBlock`
Use for taglines, manifesto moments, or key client quotes displayed at display size.
- ✅ Any site — universal block, always appropriate
- ✅ Premium Services: brand philosophy or belief statement
- ✅ Corporate Professional: credibility statement from leadership
- ✅ Modern Startup: product manifesto / mission line
- ✅ After a contentSplit if there's a great line worth amplifying

**Variant selection:**
- `dark: false` — use between light sections; text-only, no background change
- `dark: true` — dark background; creates strong visual break (counts as a dark section for rhythm rules)
- `size: "large"` — full manifesto moments, landing page centerpieces; use when the quote is the point
- `size: "normal"` — supporting quotes, transitions; use between sections

---

## Block Order (Recommended)

```
hero → logoCloud → serviceGrid → contentSplit → statsBar → testimonialCarousel → faq → contactForm
```

For consumer SMB (no logos, no stats):
```
hero → serviceGrid → contentSplit → testimonialCarousel → faq → contactForm
```

For industrial/manufacturing:
```
hero → logoCloud → serviceGrid → statsBar → contentSplit → testimonialCarousel → contactForm
```

For professional services (process-heavy):
```
hero → statsBar → processBlock → serviceGrid → teamBlock → testimonialCarousel → faq → contactForm
```

For Premium / agency:
```
hero (type-only) → pullQuote (dark) → serviceGrid (alternating) → fullWidthImage → testimonialCarousel (featured) → teamBlock → contactForm
```

---

## Hero Layout Variants

| Variant | When to use |
|---|---|
| `image-right` | Default; strong subject photo, professional; Corporate/SMB/Industrial |
| `image-left` | Mirror of above; use for visual variety on inner pages |
| `centered` | Editorial, text-led, minimal; when copy is stronger than photography |
| `full-bleed` | Cinematic photography that earns the full viewport; avoid if photo is weak |
| `type-only` | No photography; dark background with massive typography; Premium Services, bold startups, agencies; use when words carry more weight than any image |

---

## ServiceGrid Variants

| Variant | When to use |
|---|---|
| `grid` | Default card grid; most businesses, 3–6 services, quick scannable format |
| `alternating` | Each service gets a full-width horizontal section; use when services have individual stories worth telling; Premium Services, Industrial, agencies with 3–5 distinct offerings; pairs beautifully with per-service images |

---

## Testimonial Variants

| Variant | When to use |
|---|---|
| `carousel` | Default; multiple testimonials, rotating; works for any business |
| `featured` | One powerful quote, magazine editorial style, dark background; use when one testimonial is strong enough to anchor a section; Corporate Professional, Premium Services; counts as a dark section |

---

## Services Per Block

| Niche | Recommended Count | Column Layout |
|---|---|---|
| Law / Finance | 3–4 services | 3 cols |
| Medical / Dental | 4–6 services | 3 cols |
| Manufacturing | 4–6 product/service lines | 3 cols |
| Consulting | 3–5 service areas | 3 cols |
| Retail / Cafe | 3–4 offerings | 2 cols |
| Tech / SaaS | 3–4 features | 3 cols |
