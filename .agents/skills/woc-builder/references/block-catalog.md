# Block Catalog — Selection Guide by Niche

## Always Include
- `hero` — every site
- `serviceGrid` — every site (3–6 services)
- `contentSplit` — every site (About / Story section)
- `testimonialCarousel` — every site (3 quotes minimum)
- `contactForm` — every site (last section, anchor `#contact`)

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
