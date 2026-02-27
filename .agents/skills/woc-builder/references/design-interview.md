# Design Interview Reference

Use this in Step 2.5 of the build process. Ask the builder the 5 core questions, note the answers, then use the token override table to finalize `globals.css` values beyond the profile defaults.

---

## The 5 Questions

Ask conversationally — not as a form. One question at a time is fine.

### Q1: Tone
> "Pick the word that best describes how the site should feel to a visitor: **Bold & confident** / **Refined & minimal** / **Warm & approachable** / **Technical & precise**?"

### Q2: Color
> "Does the client have any existing brand colors — a logo, business card, or brand guide?"

If yes, use those as `--color-primary` (or close match). If no, let the niche profile drive color selection.

### Q3: Photography
> "Does the client have strong, professional photography ready to use? Or will we need to rely on stock images?"

Strong photos → use `full-bleed` hero layout, heavy imagery in `contentSplit`.  
Stock only → prefer `image-right` / `centered` hero, less imagery overall.

### Q4: Typography feel
> "For headings — heritage/authority feel (serif, like a law firm or manufacturer) or modern/clean (all-sans, like a tech company or agency)?"

Serif → use profile `--font-heading` as-is (usually Playfair Display or DM Serif).  
All-sans → override `--font-heading` to match `--font-sans` from profile.

### Q5: Edge treatment
> "Should buttons and cards have sharp edges (more corporate, serious) or soft rounded corners (friendlier, warmer)?"

Sharp → `--radius-global: 0px; --radius-card: 2px; --radius-button: 2px;`  
Rounded → `--radius-global: 12px; --radius-card: 16px; --radius-button: 9999px;`  
Neutral → keep profile default.

---

## Token Overrides by Answer

After choosing a profile, apply these overrides based on the builder's answers.

### Tone: Bold & Confident
```css
/* Darken primary slightly, keep foreground white */
--color-primary: [existing primary, slightly darker];
/* Tighter radius if not already sharp */
--radius-button: 2px;
```
Best matched with: **Industrial**, **Corporate**, or **Premium Services** profile.

### Tone: Refined & Minimal
```css
/* Neutral or dark background with one restrained accent */
--color-surface: #f9f8f6;
--color-surface-border: #e8e6e0;
/* Add generous spacing feel by going with a lighter primary */
```
Best matched with: **Premium Services** or **Corporate** profile.

### Tone: Warm & Approachable
```css
/* Lean on amber/teal palette from Friendly SMB profile */
--radius-button: 9999px;
--color-surface: #fffaf5;
```
Best matched with: **Friendly SMB** profile.

### Tone: Technical & Precise
```css
/* High contrast, clean sans, minimal decoration */
--font-heading: [same as --font-sans]; /* match all-sans look */
--radius-global: 4px;
--color-surface: #f4f4f6;
```
Best matched with: **Industrial** or **Modern Startup** profile.

---

## Photography Impact on Hero Layout

| Situation | Recommended Hero Layout | Notes |
|---|---|---|
| Strong brand photography | `full-bleed` | Cinematic, high impact |
| Good but not cinematic | `image-right` or `image-left` | Clean split with decorative offset shape |
| Stock only | `centered` | Editorial — typography carries the weight |
| No image available | `centered` | Headline must be very strong |

---

## Notes on Audience: B2B & Industrial Clients

For **B2B, manufacturing, engineering, professional services, distributors, and import/export** clients:

- Prioritize **legibility and authority** over decoration
- Use **larger H1/H2** — they read sites on desktop, often with colleagues
- Stats section (`statsBar`) carries disproportionate weight — populate it well
- Avoid overly rounded corners or playful icons — they undermine credibility
- **Dark footers** are industry-standard — always set `--color-dark` to a deep shade of the primary
- Trust signals matter: logo cloud, stats, certifications in sidebar content → use these blocks
- Testimonials work well but should come from named company contacts, not generic quotes
