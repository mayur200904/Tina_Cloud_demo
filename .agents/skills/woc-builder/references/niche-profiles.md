# Niche Design Profiles

These are **starting points**, not final answers. Use the Design Interview (Step 2.5) answers to refine values before applying.

Each profile defines: primary color, secondary, Google Fonts URL, heading font, body font, border-radius, and dark-section colors.

---

## 1. Corporate Professional
**Target:** Law firms, accounting, finance, consulting, HR

```css
--color-primary: #1B3A5C;      /* deep navy */
--color-primary-foreground: #FFFFFF;
--color-secondary: #C9A84C;    /* gold */
--color-secondary-foreground: #1B3A5C;
--color-background: #FFFFFF;
--color-foreground: #111827;
--color-surface: #F8F7F4;
--color-surface-border: #E8E6E0;
--color-muted: #6B7280;
--color-dark: #0F2137;         /* deep navy, darker than primary */
--color-dark-foreground: #F0EFE8;
--font-heading: 'Playfair Display', serif;
--font-sans: 'Inter', sans-serif;
--radius-global: 2px;
--radius-card: 2px;
--radius-button: 2px;
--nav-bg: #FFFFFF;
--nav-text: #1B3A5C;
```

Google Fonts URL: `https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap`

---

## 2. Friendly SMB
**Target:** Dental clinics, gyms, salons, cafes, retail, local services

```css
--color-primary: #2E7D6B;      /* teal */
--color-primary-foreground: #FFFFFF;
--color-secondary: #F4A35B;    /* warm amber */
--color-secondary-foreground: #1A1A1A;
--color-background: #FAFAF8;
--color-foreground: #1A1A1A;
--color-surface: #F0EFEC;
--color-surface-border: #E2E0DA;
--color-muted: #737373;
--color-dark: #1A2E26;         /* deep forest green */
--color-dark-foreground: #F5F3EE;
--font-heading: 'DM Serif Display', serif;
--font-sans: 'Outfit', sans-serif;
--radius-global: 12px;
--radius-card: 12px;
--radius-button: 9999px;
--nav-bg: #FAFAF8;
--nav-text: #1A1A1A;
```

Google Fonts URL: `https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Outfit:wght@400;500;600;700&display=swap`

---

## 3. Industrial / Manufacturing
**Target:** Engineering firms, factories, construction, logistics, B2B distributors

```css
--color-primary: #E85D26;      /* industrial orange */
--color-primary-foreground: #FFFFFF;
--color-secondary: #1F2937;    /* charcoal */
--color-secondary-foreground: #FFFFFF;
--color-background: #FFFFFF;
--color-foreground: #111111;
--color-surface: #F3F4F6;
--color-surface-border: #D1D5DB;
--color-muted: #6B7280;
--color-dark: #111827;         /* near-black charcoal */
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

Google Fonts URL: `https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800&display=swap`

---

## 4. Modern Startup / Tech
**Target:** SaaS, agencies, tech startups, AI products

```css
--color-primary: #6C3EF4;      /* electric violet */
--color-primary-foreground: #FFFFFF;
--color-secondary: #0EA5E9;    /* sky blue */
--color-secondary-foreground: #FFFFFF;
--color-background: #09090B;   /* near black */
--color-foreground: #F4F4F5;
--color-surface: #18181B;
--color-surface-border: #27272A;
--color-muted: #A1A1AA;
--color-dark: #050507;         /* depper near-black */
--color-dark-foreground: #F4F4F5;
--font-heading: 'Syne', sans-serif;
--font-sans: 'DM Sans', sans-serif;
--radius-global: 8px;
--radius-card: 12px;
--radius-button: 8px;
--nav-bg: #09090B;
--nav-text: #F4F4F5;
--nav-border: #27272A;
```

Google Fonts URL: `https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap`

---

## 5. Premium Services
**Target:** Architects, high-end consultants, boutique manufacturers, import/export, luxury B2B

This profile occupies the space between Corporate and Industrial — authority without austerity, refined without being sterile. Works well when the client's audience is senior buyers, procurement heads, or C-suite.

```css
--color-primary: #2C2C2C;      /* near-black with warmth */
--color-primary-foreground: #F8F4EF;
--color-secondary: #A07850;    /* warm copper/bronze accent */
--color-secondary-foreground: #FFFFFF;
--color-background: #FDFCFA;
--color-foreground: #1A1A1A;
--color-surface: #F4F1EC;
--color-surface-border: #E5DDD5;
--color-muted: #7A7065;
--color-dark: #1A1714;         /* warm near-black — not flat */
--color-dark-foreground: #F0EBE3;
--font-heading: 'Cormorant Garamond', serif;
--font-sans: 'Inter', sans-serif;
--radius-global: 2px;
--radius-card: 4px;
--radius-button: 2px;
--nav-bg: #FDFCFA;
--nav-text: #1A1A1A;
--nav-border: #E5DDD5;
```

Google Fonts URL: `https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500;600&display=swap`

---

## Audience-to-Profile Mapping

| Client Type | Profile |
|---|---|
| Lawyer, accountant, HR consultant, financial advisor | Corporate Professional |
| Dentist, GP, physiotherapist, gym, salon, cafe, retailer | Friendly SMB |
| Manufacturer, engineering firm, construction, logistics, B2B distributor | Industrial |
| SaaS, tech startup, design agency, digital marketing | Modern Startup |
| Architect, high-end consultant, boutique manufacturer, import/export, luxury B2B | Premium Services |

**Remember:** Use the Design Interview (Step 2.5) answers to override profile defaults. Profiles are starting points.

---

## Copywriting Formulas by Profile

### Corporate Professional
- Headline: `[Outcome] for [Client Type] in [City/Region]`  
  e.g. *"Trusted Legal Counsel for Growing Businesses in Mumbai"*
- Sub: Lead with reliability and expertise. Use words: trusted, established, experienced, precision, compliance.

### Friendly SMB
- Headline: `[Warm emotion] + [Service] + [Audience]`  
  e.g. *"A Warmer, More Personal Dental Experience"*
- Sub: Lead with care and convenience. Use words: friendly, welcoming, simple, family, affordable.

### Industrial / Manufacturing
- Headline: `[Industry capability] built for [Scale or customer type]`  
  e.g. *"Hydraulic Systems Engineered for Demanding Environments"*
- Sub: Lead with reliability and capability. Use words: precision, ISO-certified, delivered on time, high-performance.

### Modern Startup
- Headline: `[Bold outcome verb] + [problem] with [product angle]`  
  e.g. *"Automate the work. Amplify the impact."*
- Sub: Lead with transformation. Use words: powerful, intelligent, fast, scalable, effortless.
