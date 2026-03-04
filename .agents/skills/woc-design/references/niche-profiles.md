# Niche Design Profiles

Profiles are **toolkits, not templates**. Choose the closest one to serve the visual concept you've already written. Override freely when the concept demands it.

Each profile includes:
1. **The Archetype** — one sentence that captures the emotional character
2. **Why these tokens work** — the reasoning behind the design language
3. **Token values** — apply to `globals.css @theme {}`
4. **Section rhythm** — which sections dark vs. light vs. surface
5. **Override guide** — specific overrides when the client is adjacent to the profile
6. **Anti-patterns** — what the lazy, default version of this profile looks like
7. **Reference aesthetics** — calibration points from the real world

---

## 1. Corporate Professional
**For:** Law firms, accounting, finance, consulting, HR, investment, insurance

### The Archetype
*The firm that doesn't need to explain itself.*

### Why These Tokens Work
Serif type carries centuries of institutional authority — Playfair Display at large sizes communicates permanence and expertise in a way no sans-serif can match. The deep navy-with-gold palette is the visual language of boardrooms, private banking, and law libraries; it signals "we've been here and we'll be here." The 2px radius says precision without softness — the firm makes sharp decisions. Whitespace is generous because confident institutions don't rush you. The cream surface (`#F8F7F4` not pure white) is warmer and more legible than clinical white — it reads as considered, not cold.

### Token Values
```css
--color-primary: #1B3A5C;
--color-primary-foreground: #FFFFFF;
--color-secondary: #C9A84C;
--color-secondary-foreground: #1B3A5C;
--color-background: #FFFFFF;
--color-foreground: #111827;
--color-surface: #F8F7F4;
--color-surface-border: #E8E6E0;
--color-muted: #6B7280;
--color-dark: #0F2137;
--color-dark-foreground: #F0EFE8;
--font-heading: 'Playfair Display', serif;
--font-sans: 'Inter', sans-serif;
--radius-global: 2px;
--radius-card: 4px;
--radius-button: 2px;
--nav-bg: #FFFFFF;
--nav-text: #1B3A5C;
```
Google Fonts: `https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap`

### Section Rhythm
`Full-bleed dark navy hero` → `off-white statsBar or logoCloud` → `white serviceGrid` → `dark navy contentSplit` → `cream contentSplit` → `light testimonialCarousel` → `dark navy footer`

### Override Guide
| Situation | Override | Why |
|---|---|---|
| Client is a younger/disrupting firm | `--color-primary: #1A2A3A` (darker, cooler); `--font-heading: 'Inter', sans-serif` (all-sans) | Reduces heritage signal; keeps authority |
| Client has a strong warm brand color | Replace navy with their color; keep gold as secondary | Brand consistency > profile defaults |
| Client emphasizes personal relationships, not institutional scale | `centered` hero layout; `--radius-button: 6px` | Slightly warmer, less boardroom |
| Client is in accounting/tax (numbers-forward) | Lead with `statsBar`; hero eyebrow is a number | Numbers over imagery for this niche |

### Anti-Patterns (what the lazy version looks like)
- Navy background, gold line, "Welcome to Our Firm" headline in Playfair — generic law firm #4,500
- Too many serif elements at too many sizes — typographic noise, not authority
- Round pill buttons — kills credibility instantly; use 2–4px maximum
- Stock photos of people shaking hands in suits — try: empty boardroom, city skyline, architectural detail
- Dense copy blocks on the hero — whitespace is the design in this profile

### Reference Aesthetics
McKinsey.com, Clifford Chance, Linklaters, Allen & Overy — notice: large whitespace, restrained palette, typography-led, no hero imagery in many cases

---

## 2. Friendly SMB
**For:** Dental clinics, gyms, salons, cafes, restaurants, local retail, wellness, physio

### The Archetype
*The business your friends recommend.*

### Why These Tokens Work
Rounded corners throughout (cards, buttons, images) signal approachability — literally, psychologically, corners that don't poke. The warm cream background (`#FAFAF8`) is friendlier than clinical white without feeling unprofessional. DM Serif Display for headings gives personality and character while Inter/Outfit for body keeps it legible. Teal-and-amber is a proven trust palette for consumer health and food businesses — teal reads as clean/healthy, amber reads as warm/inviting. The dark section uses a deeply saturated teal (`#1A2E26`) rather than a cold dark — it stays warm even in contrast moments.

### Token Values
```css
--color-primary: #2E7D6B;
--color-primary-foreground: #FFFFFF;
--color-secondary: #F4A35B;
--color-secondary-foreground: #1A1A1A;
--color-background: #FAFAF8;
--color-foreground: #1A1A1A;
--color-surface: #F0EFEC;
--color-surface-border: #E2E0DA;
--color-muted: #737373;
--color-dark: #1A2E26;
--color-dark-foreground: #F5F3EE;
--font-heading: 'DM Serif Display', serif;
--font-sans: 'Outfit', sans-serif;
--radius-global: 12px;
--radius-card: 16px;
--radius-button: 9999px;
--nav-bg: #FAFAF8;
--nav-text: #1A1A1A;
```
Google Fonts: `https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Outfit:wght@400;500;600;700&display=swap`

### Section Rhythm
`Warm full-bleed lifestyle hero` → `cream logoCloud (accreditations/associations)` → `teal dark statsBar` → `white serviceGrid (rounded cards)` → `warm cream contentSplit` → `off-white testimonialCarousel` → `FAQ` → `dark teal footer`

### Override Guide
| Situation | Override | Why |
|---|---|---|
| Client has a bold brand color (hot pink, bright orange) | Replace teal with their brand color; keep structure | Brand color brings personality |
| Premium wellness / high-end salon | Reduce amber → go monochrome with a single muted gold accent; `--radius-button: 8px` (less pill) | Premium signals restraint |
| Children's services / family-focused | Increase amber presence; `--color-primary` can go warmer amber | Amber reads as nurturing |
| Gym / fitness | Increase contrast; darken the primary; consider a more energetic accent | Energy > warmth in fitness |

### Anti-Patterns (what the lazy version looks like)
- Teal and white, pill buttons everywhere, smiling stock photos — SMB template #12,000
- Too much amber — it becomes a fast-food palette; use as accent only
- Cold clinical photography for healthcare — real, warm, human wins
- Dense service descriptions — short, punchy, benefit-led copy only
- Navy or charcoal tones anywhere — inconsistent warmth signal

### Reference Aesthetics
Glossier (clean + personal), Sweetgreen (warm + functional), Aesop without the austerity, Headspace (friendly without being childish)

---

## 3. Industrial / Manufacturing
**For:** Engineering firms, factories, construction, logistics, B2B manufacturing, distributors, import/export

### The Archetype
*The company that proves itself with facts, not design.*

### Why These Tokens Work
Zero radius everywhere (`0px` on buttons, `4px` max on cards) signals that this company doesn't soften its edges because it doesn't need to. Condensed Barlow for headings is the typographic equivalent of industrial signage — large, bold, no decorative flare. Orange primary is the energy color of safety-critical industries: construction equipment, warning systems, safety gear — it signals capability and action. Dark charcoal background (`#111827`) with orange creates maximum contrast — confident, heavy, unambiguous. Stats should dominate because this is a business where numbers prove everything words can't.

### Token Values
```css
--color-primary: #E85D26;
--color-primary-foreground: #FFFFFF;
--color-secondary: #1F2937;
--color-secondary-foreground: #FFFFFF;
--color-background: #FFFFFF;
--color-foreground: #111111;
--color-surface: #F3F4F6;
--color-surface-border: #D1D5DB;
--color-muted: #6B7280;
--color-dark: #111827;
--color-dark-foreground: #F3F4F6;
--font-heading: 'Barlow', sans-serif;
--font-sans: 'Barlow', sans-serif;
--radius-global: 0px;
--radius-card: 4px;
--radius-button: 0px;
--nav-bg: #1F2937;
--nav-text: #FFFFFF;
--nav-border: #374151;
```
Google Fonts: `https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,400;0,600;0,700;0,800;1,700&display=swap`

### Section Rhythm
`Full-bleed factory/machinery hero (dark overlay)` → `dark charcoal logoCloud (certs, clients)` → `white serviceGrid (sharp cards)` → `dark orange gradient statsBar with large numbers` → `white contentSplit (team or facility)` → `dark charcoal testimonialCarousel` → `near-black footer`

### Override Guide
| Situation | Override | Why |
|---|---|---|
| Client has steel blue / corporate blue brand color | Replace orange primary with `#1E4A7A` (steel blue); keep `0px` radius | Blue signals precision over energy; still industrial |
| Logistics / supply chain (warehouse-focused) | Keep orange; add `logoCloud` above the fold with client company names | Trust via association is key in logistics |
| Construction / contractor (project-portfolio-focused) | Feature contentSplit with project imagery; consider a second contentSplit | Portfolio evidence carries more weight than text |
| Precision manufacturing / components (detail-forward) | Swap Barlow for `'DM Sans', sans-serif` (less condensed, more precision) | Barlow is bold; DM Sans reads more technical |
| Client is blue-collar but trying to attract enterprise | Keep structure; upgrade photography references to architectural/aerial | Signal scale without losing their identity |

### Anti-Patterns (what the lazy version looks like)
- Charcoal background, orange accent, "Built for Tomorrow" headline — industrial stock template
- ANY rounded corners — profile uses 0px; rounding kills the register
- Pastel or soft colors — this is maximum contrast only
- Stock photos of people in suits or handshakes — real industrial photography: machinery, site, material, hands
- Light, airy, minimal layout — density and scale are part of the personality

### Reference Aesthetics
Caterpillar.com, Bosch Professional, Atlas Copco, Würth — notice: large type at scale, maximum contrast, numbers everywhere, almost no decorative elements

---

## 4. Modern Startup / Tech
**For:** SaaS products, tech startups, AI companies, digital agencies, developer tools

### The Archetype
*Moves fast. Thinks clearly. Doesn't apologize for being opinionated.*

### Why These Tokens Work
Dark-native UI (`#09090B` background) is the native environment of high-end tech products — it signals that this company operates in the same register as the tools professionals use daily. Syne for headings is geometric and engineered — it has the feel of something designed by people who understand systems. DM Sans for body is invisible in the best way — it conveys intelligence without performing it. Violet primary (`#6C3EF4`) plus cyan secondary creates the electric energy of a product that's doing something new. The `nav-bg` at `rgba(9,9,11,0.8)` with `backdrop-filter: blur` activates the glassmorphism nav built into the template — only works on dark sites.

### Token Values
```css
--color-primary: #6C3EF4;
--color-primary-foreground: #FFFFFF;
--color-secondary: #0EA5E9;
--color-secondary-foreground: #FFFFFF;
--color-background: #09090B;
--color-foreground: #F4F4F5;
--color-surface: #18181B;
--color-surface-border: #27272A;
--color-muted: #A1A1AA;
--color-dark: #050507;
--color-dark-foreground: #F4F4F5;
--font-heading: 'Syne', sans-serif;
--font-sans: 'DM Sans', sans-serif;
--radius-global: 8px;
--radius-card: 12px;
--radius-button: 8px;
--nav-bg: rgba(9,9,11,0.8);
--nav-text: #F4F4F5;
--nav-border: #27272A;
```
Google Fonts: `https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap`

### Section Rhythm
`Dark full-bleed gradient or image hero` → `dark surface logoCloud` → `slightly lighter statsBar` → `dark card serviceGrid` → `dark contentSplit` → `slightly lighter testimonialCarousel` → `deepest dark footer`

**Note:** Dark profiles still need section contrast. Vary the surface value between sections (zinc-950 → zinc-900 → zinc-800). Without contrast variation, the eye goes numb.

### Override Guide
| Situation | Override | Why |
|---|---|---|
| Client is a digital agency (creative output) | `--color-primary: #E8403C` (bold red) or `#FF6B35` (orange); add `--color-secondary: #1A1A2E` | Creative agencies can go more expressive than product companies |
| AI / data company | `--color-primary: #0EA5E9` (cyan primary); `--color-secondary: #6C3EF4` | Cyan reads "data" more than violet |
| Developer tool | Remove animation emphasis; go more minimal; increase monospace font use | Developer audiences appreciate restraint |
| Startup with strong brand color | Replace violet with brand color; keep dark-native structure | Brand color in dark context is very powerful |

### Anti-Patterns (what the lazy version looks like)
- Purple gradient on white/light background — the canonical "AI slop" aesthetic; never do this
- Light/white backgrounds — this profile is dark-native; don't fight it
- Serif fonts anywhere — geometric sans only in this register
- Safe photography (team in office, stock business people) — this brand is opinionated; imagery should match
- Same-height, same-shade sections throughout — dark profiles need subtle contrast variation

### Reference Aesthetics
Linear.app, Vercel.com, Loom, Arc browser, Raycast — notice: every element earns its place; motion is precise; copy is confident and short

---

## 5. Premium Services
**For:** Architects, boutique consultants, high-end manufacturers, luxury B2B, import/export, design firms, independent advisors

### The Archetype
*Nothing is decorative. Everything is considered.*

### Why These Tokens Work
Cormorant Garamond at large sizes is one of the most elegant typefaces available — high contrast strokes, sophisticated character shapes, a reading experience that feels like craftsmanship. The cream background (`#FDFCFA`) creates warmth and differentiation from clinical whites without being overtly warm like SMB. The copper/bronze accent (`#A07850`) threads through the site as a single signal of refinement — used sparingly, never as a primary color fill. Zero radius throughout (`0px` buttons, `2px` cards) signals precision and absence of compromise. The restraint IS the design in this profile: negative space communicates value, decoration devalues.

### Token Values
```css
--color-primary: #2C2C2C;
--color-primary-foreground: #F8F4EF;
--color-secondary: #A07850;
--color-secondary-foreground: #FFFFFF;
--color-background: #FDFCFA;
--color-foreground: #1A1A1A;
--color-surface: #F4F1EC;
--color-surface-border: #E5DDD5;
--color-muted: #7A7065;
--color-dark: #1A1714;
--color-dark-foreground: #F0EBE3;
--font-heading: 'Cormorant Garamond', serif;
--font-sans: 'Inter', sans-serif;
--radius-global: 0px;
--radius-card: 2px;
--radius-button: 0px;
--nav-bg: #FDFCFA;
--nav-text: #1A1A1A;
--nav-border: #E5DDD5;
```
Google Fonts: `https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@400;500&display=swap`

### Section Rhythm
`Large centered editorial hero (typography leads; no full-bleed)` → `warm cream logoCloud (very quiet, almost invisible)` → `off-white contentSplit` → `warm cream serviceGrid (2 columns max)` → `dark warm testimonialCarousel` → optional `light FAQ` → `dark warm footer (minimal — just contact + a single statement)`

**Contrast note:** This profile has less dramatic section alternation — the restraint IS the design. But the transition from cream to the deep warm dark footer is essential and should feel like arrival, not just the end.

### Override Guide
| Situation | Override | Why |
|---|---|---|
| Client has a strong contemporary style (modern architecture) | `--font-heading: 'Space Grotesk', sans-serif` (drop Cormorant); increase leading | Contemporary firms don't always want heritage serif signals |
| Client is in luxury materials / import | Add `logoCloud` with material certification logos; increase image size in contentSplit | Materials businesses sell through proof of origin and provenance |
| Client is a solo practitioner (one-person firm) | Replace "Our Services" framing with first-person; reduce block count | Fewer, better: less is more at premium tier |
| Client has a darker brand identity | `--color-primary: #1A1A1A`; `--color-background: #F8F5F0` (warmer cream); `--color-dark: #111010` | Dark brands can do premium dark-cream contrast |

### Anti-Patterns (what the lazy version looks like)
- Cormorant Garamond + cream + copper = 10,000 Squarespace sites; the difference is in the specificity of every decision
- Rounded buttons or cards anywhere — precision is the point; edges are sharp
- Saturated or bright accent colors — copper only, and used with restraint
- Busy animation — scroll reveals should be slower, more deliberate; this brand doesn't rush
- Service grids wider than 2 columns — this profile breathes; density undermines the signal
- Dense copywriting — short, precise, intentional; every word earns its place

### Reference Aesthetics
Snøhetta (architecture), Aesop (products), Bottega Veneta digital, Kinfolk magazine — notice: the layout contains space; the hierarchy is clear; nothing is explained twice

---

## Hybrid Signals — When Clients Don't Fit One Profile

Real clients often sit between two profiles. These are the most common hybrids:

### Corporate + Premium
A long-established consultancy that has a refined, personal quality alongside their institutional authority.
→ Start with Corporate Professional tokens. Replace `--font-heading: 'Playfair Display'` → `'Cormorant Garamond'`. Reduce navy saturation slightly. Keep the structure and dark sections.

### Industrial + Premium
A precision manufacturer or high-end materials supplier — serious and capable but selling to architects or specifiers, not procurement managers.
→ Start with Industrial tokens. Replace orange `--color-primary` with `#1A3A4A` (steel blue/slate). Set `--radius-button: 2px` (not 0px — slight softening). Use `contentSplit` heavily to show material quality.

### Friendly SMB + Corporate
A clinic or wellness practice that's genuinely warm but needs to signal clinical credibility (e.g. dental specialist, physiotherapy clinic).
→ Start with Friendly SMB. Replace `--radius-button: 9999px` → `8px`. Darken `--color-primary` slightly. Keep the warm background; add a `logoCloud` with accreditations.

### Modern Startup + Corporate
A tech-enabled professional services company — has the energy of a startup but serves enterprise clients.
→ Start with Modern Startup (dark). Replace violet `--color-primary` with `#1B3A5C` (navy). Keep dark-native structure. Use Inter for both heading and body (remove Syne — too expressive for enterprise trust).

---

## Quick Profile Mapping

| Client type | Profile | Watch for |
|---|---|---|
| Lawyer, accountant, financial advisor, insurance | Corporate Professional | Is it institutional or personal practice? Adjust warmth accordingly. |
| Dentist, GP, gym, salon, cafe, restaurant, retailer | Friendly SMB | Premium wellness → dial back the roundness |
| Manufacturer, engineering, construction, logistics, B2B distributor | Industrial | Does the brand color match? Orange is a strong override point. |
| SaaS, startup, digital agency, AI product, developer tool | Modern Startup | Not all tech is dark-native — check if they need to signal trust over speed |
| Architect, boutique consultant, luxury B2B, premium materials | Premium Services | Restraint is the hardest profile to execute; less is more |

---

## Block & Variant Recommendations by Profile

### Hero Layout
| Profile | Recommended | Notes |
|---|---|---|
| Corporate Professional | `centered` or `full-bleed` | `centered` when copy > photography; `full-bleed` when architectural photography is strong |
| Friendly SMB | `image-right` or `full-bleed` | `full-bleed` for cafes/restaurants with strong lifestyle photography |
| Industrial | `full-bleed` | Photography of real sites, machinery; never `centered` (too soft) |
| Modern Startup | `type-only` or `centered` | `type-only` for bold product statements; dark background suits this profile |
| Premium Services | `type-only` or `centered` | `type-only` is premium's strongest hero — words over imagery; restraint signals confidence |

### ServiceGrid Variant
| Profile | Recommended | Notes |
|---|---|---|
| Corporate Professional | `grid` (3 cols) | Standard; clean scannable list of service areas |
| Friendly SMB | `grid` (2–3 cols) | Rounded cards; keep descriptions short and benefit-led |
| Industrial | `alternating` or `grid` | `alternating` when services have strong photography (plant, equipment); powerful at scale |
| Modern Startup | `grid` (3 cols) | Feature-list feel; dark cards on dark background |
| Premium Services | `alternating` (2–3 items) or `grid` (2 cols) | `alternating` creates a premium per-service story; never more than 4 items |

### Testimonial Variant
| Profile | Recommended | Notes |
|---|---|---|
| Corporate Professional | `featured` | One powerful quote from a recognizable client; credibility over quantity |
| Friendly SMB | `carousel` | Multiple quotes; rotating; real faces build community trust |
| Industrial | `carousel` or `featured` | `featured` if one quote references a major client/project milestone |
| Modern Startup | `carousel` | Product testimonials work in volume; multiple voices = social proof |
| Premium Services | `featured` | One extraordinary quote at full scale; dark background creates a cinematic pause |

### processBlock
| Profile | Recommended variant | Notes |
|---|---|---|
| Corporate Professional | `timeline` | Sequential, descriptive; signals methodology and rigour |
| Friendly SMB | `steps` | Simple, visual, fast to read |
| Industrial | `steps` | Order → Engineering → Production → Delivery; 4 steps max |
| Modern Startup | `steps` | Onboarding flow or product journey |
| Premium Services | `timeline` | Deliberate, unhurried; reinforces that the process is crafted |

### teamBlock
| Profile | Recommended columns | Notes |
|---|---|---|
| Corporate Professional | 2–3 | Fewer, larger profiles; names and credentials matter |
| Friendly SMB | 3 | Faces humanize; keep bios short and personal |
| Industrial | — | Skip unless team expertise is a differentiator |
| Modern Startup | 3–4 | Founders / leadership only; diverse > numerous |
| Premium Services | 2 | Solo or small teams; portrait photography quality matters |

### pullQuoteBlock
| Profile | Recommended | Notes |
|---|---|---|
| Corporate Professional | `dark: true`, `size: normal` | Leadership or founding statement; disciplined, authoritative |
| Friendly SMB | `dark: false`, `size: normal` | Community statement or tagline; keep it warm and real |
| Industrial | `dark: true`, `size: large` | Bold capability statement; numbers or superlatives work well |
| Modern Startup | `dark: false` (on dark bg, no change needed) | Product manifesto line; terse, confident |
| Premium Services | `dark: false`, `size: large` | Philosophy or belief statement; Cormorant Garamond at large sizes is the profile at its best |

### fullWidthImageBlock
| Profile | Recommended height | Notes |
|---|---|---|
| Corporate Professional | `medium` | Architectural or city photography; between service grid and testimonials |
| Friendly SMB | `medium` | Lifestyle / in-environment photography; after serviceGrid |
| Industrial | `tall` | Site or machinery at scale; can run the page |
| Modern Startup | — | Skip on dark-native sites (photo contrast is difficult); use pullQuote instead |
| Premium Services | `tall` | Material, texture, craft photography; one per page maximum |
