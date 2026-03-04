# Design Interview Reference

Use in **Step 5** of woc-design after the visual concept is already written. These questions refine and sharpen the concept — they don't generate it.

Ask conversationally. One question at a time. The goal is discovery, not classification.

---

## Part 1: Discovery Questions (Open-Ended)

Ask these first. These produce raw creative material.

### Q1: Physical Space
> "If this business were a physical space — an office, a workshop, a factory floor, a clinic, a showroom — describe what someone sees and feels in the first 5 seconds of walking in."

Listen for: textures, sounds, scale, temperature, pace, who the people are, how the space is organized. These translate directly into visual decisions.

**What the answer reveals:**
- Spacious, quiet, expensive materials → Premium Services or Corporate Professional tone
- Loud, active, functional, industrial → Industrial profile, full-bleed hero, dark sections
- Warm, personal, human, small → Friendly SMB, centered hero, lifestyle photography
- Minimal, purposeful, fast-moving → Modern Startup, dark UI, motion-forward

### Q2: The Embarrassing Word
> "What word would mortify this client if it appeared on their homepage?"

This is the most useful design interview question. The answer defines what to avoid — and avoidance often clarifies the design more than the brief itself.

**Examples:**
- "Cheap" → pricing is a differentiator, don't signal budget; use premium materials and confident typography
- "Corporate" → they want to feel human; avoid navy/gold/serif combos, go warmer and more personal
- "Informal" → they're trying to be taken seriously; avoid rounded fonts, casual copy, lifestyle photography
- "Old-fashioned" → avoid serifs, choose geometric sans; reference sites feel contemporary
- "Cold" → all clinical whites and sharp edges are wrong; need warmth in color and photography

### Q3: The Referral Phrase
> "What do their best customers say when they refer someone? What's the actual phrase they use?"

This is your headline register. Verbatim customer language is almost always stronger than anything you'd write from scratch.

**Examples of referral phrases that become headlines:**
- "These guys actually show up on time" → "We Show Up. On Time. Every Time."
- "They know this industry better than anyone" → "Thirty Years of Industry Insight. No Learning Curve."
- "They made the whole thing painless" → "The Most Painless [service] You'll Ever Buy."

If you get a good referral phrase, use it or something close to it.

---

## Part 2: Technical Questions (Categorical)

Ask these after the discovery questions. These map directly to token decisions.

### Q4: Brand Colors
> "Does the client have existing brand colors — a logo, business card, or brand guide with hex values?"

**If yes:** Use the provided color(s) as `--color-primary`. Derive `--color-dark` as a deeply saturated version of the primary (not flat black). This is non-negotiable — brand consistency overrides profile aesthetics.

**If no:** Derive the primary from the visual concept and profile. The emotional register of your concept should suggest the color temperature.

**If partial (logo exists but no exact hex):** Ask for the logo file or a photo of their business card. Extract the approximate color. It doesn't need to be exact — closer is better than ignoring it.

### Q5: Photography
> "Does the client have strong, professional photography — or do we need stock?"

| Answer | Hero Layout | Image Approach |
|---|---|---|
| Own photography, cinematic quality | `full-bleed` | Use it. It's their biggest asset. |
| Own photography, decent but not cinematic | `image-right` or `image-left` | Split layout hides limitations; composition carries it |
| Stock only, but niche is very visual | `full-bleed` | Choose atmospheric stock over generic stock |
| Stock only, niche is corporate / services | `centered` | Typography carries the weight; reduce reliance on imagery |
| No image yet | `centered` | Strong headline is the hero; leave image placeholder |

### Q6: Typography Feel
> "For headings — heritage and authority (serif, like a law firm) or modern and clean (all-sans, like a tech company)?"

**Serif headings:** Playfair Display (law/finance), DM Serif Display (warm SMB), Cormorant Garamond (premium/luxury), Barlow (industrial)
**All-sans headings:** Override `--font-heading` to match `--font-sans` in the profile

**When the answer is ambiguous:** Default to the profile's font choice. The profile was designed with a specific typographic intention.

### Q7: Edge Treatment
> "Should buttons and cards have sharp edges (more corporate, serious) or soft rounded corners (friendlier, more approachable)?"

| Answer | Token Override |
|---|---|
| Sharp | `--radius-global: 0px; --radius-card: 2px; --radius-button: 2px;` |
| Rounded | `--radius-global: 12px; --radius-card: 16px; --radius-button: 9999px;` |
| Neutral / "doesn't matter" | Keep profile default |

Note: edge treatment and font pairing must be consistent. Rounded buttons with serif headings signal contradiction. Sharp edges with geometric sans signal precision.

---

## Token Override Table

After the interview, apply these overrides on top of the selected profile:

| Discovery answer | Token to override | Direction |
|---|---|---|
| "Feels like walking into a boardroom" | `--color-dark` → deep navy; `--font-heading` → serif | More authority, less warmth |
| "Feels like walking into a workshop" | `--color-dark` → charcoal with warm undertone; `--radius-button: 0px` | Functional, no-nonsense |
| "Feels like walking into a café" | `--color-background` → warm cream; `--radius-button: 9999px` | Warm, approachable |
| "Feels like walking into a tech office" | `--color-background` → dark; `--font-heading` → geometric sans | Dark-native, precise |
| Brand color is warm (amber, terracotta, copper) | `--color-primary` → brand color; derive `--color-dark` from it | Warm tint in dark sections |
| Brand color is cool (teal, steel, slate) | `--color-primary` → brand color; `--color-dark` → dark teal/slate | Cool confidence throughout |
| Referral phrase is direct and declarative | Headlines should be declarative, no softening | Copy register: assertive |
| Referral phrase is relational and personal | Headlines should use first/second person | Copy register: conversational |

---

## Notes for B2B and Industrial Clients

These clients are read predominantly on desktop, often with colleagues or during procurement evaluations.

- **Size signals credibility.** Large H1/H2 type communicates scale. Don't undersell with modest type sizing.
- **Stats > claims.** A number with a unit is worth more than any claim.
- **Dark footers are industry-standard.** Always set `--color-dark` to a deep, saturated shade — never flat black.
- **Certifications and associations** belong in the `logoCloud` block — these carry enormous weight in B2B evaluation.
- **Testimonials must be attributed.** Named company + person name. Anonymous quotes feel fabricated.
- **Avoid playful design signals** (pill buttons, soft gradients, lifestyle photography) — they undermine procurement credibility.
