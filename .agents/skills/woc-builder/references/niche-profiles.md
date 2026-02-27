# Niche Design Profiles

Profiles are **starting points refined by the Design Interview**. Each profile has:
1. A design language description — the visual character, mood, and feel
2. Real-world reference sites — to calibrate your aesthetic compass
3. CSS token values — apply to `globals.css @theme {}`
4. Section rhythm recommendation — which sections should be dark vs light
5. Anti-patterns — what would kill this profile's credibility

---

## 1. Corporate Professional
**For:** Law firms, accounting, finance, consulting, HR, investment firms

### Design Language
Authoritative without being cold. The visitor should feel like they're walking into a firm's boardroom — tailored, composed, trustworthy. Typography does the heavy lifting. Large serif headings signal permanence and expertise. Whitespace is generous. The palette is restrained — deep navy or charcoal with a gold or bronze accent. Imagery shows people, architecture, city skylines, or the texture of professional environments.

Photography mood: composed, professional, editorial. Not stock-photo smiles. Candid, architectural, or abstract.

**Aesthetic references:** McKinsey.com, Clifford Chance, Linklaters, Allen & Overy

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
`Full-bleed dark navy hero` → `off-white stats band` → `white service cards` → `dark navy statsBar` → `cream split section` → `light testimonials` → `dark navy footer`

### Anti-Patterns
- Rounded pill buttons — use `radius-button: 2px`, never 9999px
- Bright saturated colors — no electric blues or vivid greens
- Playful icons — use minimal SVG line icons or none at all
- Too much imagery — whitespace and typography carry more weight
- Weak headlines like "Welcome to Our Firm" — open with the specific outcome delivered

---

## 2. Friendly SMB
**For:** Dental clinics, gyms, salons, cafes, restaurants, local retail, wellness services

### Design Language
Warm, approachable, we're-your-neighbours energy. The visitor should feel welcomed, not sold to. Rounded corners throughout. Warm cream or off-white backgrounds. Brand color is teal or amber — trustworthy without being cold. Typography mixes a serif display heading (personality, character) with a clean rounded sans body. Photography is bright, lifestyle-oriented, and human — smiling people, real interiors, actual products.

**Aesthetic references:** Glossier, Sweetgreen, Aesop (without the minimalism), local cafe websites that feel like a hug

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
`Warm full-bleed lifestyle hero` → `cream logoCloud` → `teal dark statsBar` → `white service cards (rounded)` → `warm cream split` → `off-white testimonials` → `dark teal footer`

### Anti-Patterns
- Sharp corners anywhere — the whole profile is rounded
- Navy or charcoal tones — this is warm, not corporate
- Overly professional photography — real and human wins
- Dense copy — short, breezy text only

---

## 3. Industrial / Manufacturing
**For:** Engineering firms, factories, construction, logistics, B2B manufacturing, distributors

### Design Language
The visitor should feel the weight of industrial scale. Confident, load-bearing, no-nonsense. Think: a company that moves 50,000 tons a year doesn't need to prove itself with flourishes — it proves itself with numbers. Typography is condensed sans-serif, heavy, all capitals for labels. Orange or steel blue as primary — signal of energy and capability. Dark charcoal backgrounds for impact sections. Photography is raw and real: machinery, workers, infrastructure, aerial views of facilities.

The key: restraint in decoration, boldness in scale. Large headlines. Aggressive stat numbers. Minimal animation that feels earned.

**Aesthetic references:** Caterpillar.com, Bosch Professional, Doosan Heavy Industries, Atlas Copco, Würth

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
`Full-bleed factory/machinery hero (dark overlay)` → `white service grid (sharp cards)` → `dark orange gradient statsBar with huge numbers` → `white split section` → `dark charcoal testimonials` → `near-black footer`

### Anti-Patterns
- Rounded corners — zero. The profile uses 0px radius throughout
- Pastel or soft colors — this needs bold, high contrast
- Stock photos of people in suits — real industrial photography only
- Decorative script fonts — condensed sans only
- Light, airy layouts — density and scale are part of the personality

---

## 4. Modern Startup / Tech
**For:** SaaS products, tech startups, AI companies, digital agencies, developer tools

### Design Language
Fast, intelligent, forward. Dark UI is the dominant mode — near-black backgrounds with electric accent (violet, blue, cyan). Typography is geometric and contemporary — Syne for headings (engineered, distinctive), DM Sans for body (clean, modern). Motion is key: hover effects, scroll reveals, animated stats. The site should feel like the product: fast, high-craft, opinionated.

Photography or illustration: product screens, abstract code textures, data visualizations, team in real environments (not posed). Gradient mesh backgrounds work well.

**Aesthetic references:** Linear.app, Vercel.com, Loom, Arc browser, Raycast

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

**Note:** Setting `--nav-bg` to a semi-transparent value activates the glassmorphism effect (backdrop-filter is built into nav). Only works on dark sites.

### Section Rhythm
`Dark full-bleed gradient or image hero` → `dark surface logoCloud` → `slightly lighter statsBar` → `dark card service grid` → `dark split section` → `slightly lighter testimonials` → `deepest dark footer`

**Tip:** Dark profiles still need section contrast — vary the surface value between sections (zinc-900, zinc-800, zinc-950). Never let the eye go numb.

### Anti-Patterns
- Light/white backgrounds — this is dark native
- Serif fonts — geometric sans only
- Traditional corporate layouts — unconventional column counts, overlapping elements
- Safe photography — this brand is edgy

---

## 5. Premium Services
**For:** Architects, boutique consultants, high-end manufacturers, luxury B2B, import/export, design firms

### Design Language
The visitor should feel they've arrived somewhere serious and refined. Not cold, not showy — considered. Pure restraint. Cream backgrounds with warm charcoal text. One copper or gold accent thread that runs through the page. Cormorant Garamond for headings — one of the most elegant typefaces at large sizes. Inter for body — invisible in the best way. Minimal decoration. Every element earns its place.

This is the design language of architecture studios, premium material suppliers, and boutique advisory firms. Nothing is random. Nothing is decorative for decoration's sake.

**Aesthetic references:** LVMH, Snøhetta (architecture), Aesop, Bottega Veneta digital, Kinfolk magazine

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
`Large centered editorial hero (no full-bleed — typography carries it)` → `warm cream logoCloud (very quiet)` → `warm off-white split` → `dark warm footer (just stats + a short statement)` → optional `light FAQ`

**Contrast note:** This profile has less dramatic section alternation — the restraint IS the design. But transitions between light cream and the dark warm footer are essential.

### Anti-Patterns
- Rounded buttons or cards — sharp edges throughout
- Bright or saturated accent colors — copper/bronze only
- Busy animations — scroll reveals should be slower and more deliberate (add `duration: 900ms` to ScrollReveal)
- Dense service grids — this brand uses space generously, max 2 columns for service cards
- Busy copywriting — short, precise, intentional

---

## Quick Mapping Table

| Client type | Profile |
|---|---|
| Lawyer, accountant, financial advisor, insurance | Corporate Professional |
| Dentist, gym, salon, cafe, restaurant, retailer | Friendly SMB |
| Manufacturer, engineering, construction, logistics, B2B distributor | Industrial |
| SaaS, startup, digital agency, AI product, developer tool | Modern Startup |
| Architect, boutique consultant, luxury B2B, premium materials | Premium Services |

**Always run the Design Interview before applying a profile.** Brand colors override profile defaults. Photography quality determines hero layout.
