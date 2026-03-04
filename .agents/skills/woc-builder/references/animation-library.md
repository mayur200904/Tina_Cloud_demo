# Animation Library

## Available in All Blocks Right Now

Built into `globals.css`. No extra setup. Reference by class name.

---

## CSS Page-Load Animations (fires once on page mount)

### `.woc-reveal`
Fade + translateY — for hero content, page-load entrance.
```css
animation: woc-fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
```
Delay variants: `.woc-reveal--delay-1` (0.1s) through `.woc-reveal--delay-4` (0.46s)

### Custom stagger via inline style
```jsx
<div className="woc-reveal" style={{ animationDelay: '0.3s' }}>...</div>
```

---

## Scroll-Triggered Animations (fire when section enters viewport)

### `<ScrollReveal>` wrapper component
**Import:** `import ScrollReveal from '../ScrollReveal';`

Wraps any content. Fades + slides up on IntersectionObserver entry.

```jsx
// Basic
<ScrollReveal><MyContent /></ScrollReveal>

// With delay (ms)
<ScrollReveal delay={200}><MyContent /></ScrollReveal>

// Stagger children (increment delay per item)
{items.map((item, i) => (
  <ScrollReveal key={i} delay={i * 80}>
    <Card>{item}</Card>
  </ScrollReveal>
))}
```

**Props:** `delay` (ms), `threshold` (0–1, default 0.12), `once` (boolean, default true)

---

## Animated Statistics

### `<CountUp>` component
**Import:** `import CountUp from '../CountUp';`

Parses a stat string, counts from 0 to value on viewport entry.

```jsx
<CountUp value="500+" duration={1600} className="woc-stat__value" />
<CountUp value="₹2.4Cr" />
<CountUp value="98%" />
```

Supports: `500+`, `25`, `98%`, `2.4K`, `₹2.4Cr`, `$1.2M`
Text-only strings (e.g. "ISO 9001") render as-is without animation.

---

## CSS-Only Hover Effects (built into block stylesheets)

### Cards (`.woc-card`)
- `translateY(-4px)` + elevated shadow on hover
- `border-color` shifts toward `--color-primary` on hover

### Service Cards (`.woc-service-card`)
- Left border grows from transparent → `--color-primary` on hover
- Bottom accent line grows right on hover (`width: 0 → 100%`)
- Ghost number opacity increases from 0.06 → 0.12 on hover
- Icon container scales up slightly

### Split/Hero Images
- `transform: scale(1.02)` on hover — subtle zoom-in

### Logo Cloud Images
- `filter: grayscale(1) → grayscale(0)` hover transition

### Nav Links
- Underline slides in from left via `::after width: 0% → 100%`

---

## Animated Keyframes (available globally)

```css
@keyframes woc-fade-up   /* opacity: 0, translateY(1.5rem) → 1, 0 */
@keyframes woc-fade-in   /* opacity: 0 → 1 */
@keyframes woc-marquee   /* infinite horizontal translate — used by LogoCloud */
@keyframes woc-scroll-line /* Hero scroll indicator — line extending downward */
```

---

## In-Block Background Animations

### StatsBar — Ghost Background Number
A large, extremely faint number (opacity: 0.05) renders behind the stats grid. It's the first stat's value, scaled to ~18rem. Creates typographic depth with no extra content.

### Service Cards — Ghost Index Number
Each card has its ordinal (01, 02, 03...) rendered in 5rem heading font at 6% opacity in the card's top-right corner. On hover it rises to 12% opacity.

---

## What's NOT Yet Available (potential future additions)

- [ ] Horizontal scroll sections
- [ ] Cursor follower effect
- [ ] Text scramble / glitch reveal  
- [ ] SVG path draw-on animations
- [ ] Magnetic button hover
- [ ] Video background heroes
- [ ] Split-text character-by-character reveal
- [ ] Lottie animation support

---

## How Builder Decisions Drive Animations

Animations are baked into block components and fire automatically based on **layout and template choice**. The builder controls animation quality through these decisions:

| Builder choice | Animation outcome |
|---|---|
| `layout: "full-bleed"` | Parallax bg scroll + animated scroll indicator line |
| `layout: "image-right"` or `"image-left"` | Offset shape reveal + image zoom on hover |
| `layout: "centered"` | Clean centered fade-up, no image noise |
| `serviceGrid` columns: 3 or 4 | Staggered cascade (0ms, 80ms, 160ms...) across cards |
| `statsBar` block | CountUp from 0 on scroll + ghost bg number |
| `logoCloud` block | Infinite marquee + grayscale→color hover |
| `contentSplit` block | Floating badge chip + image scale hover |

**The more blocks on a page, the more scroll moments.** A page with 6 blocks has 6 unique "arrival" moments for the visitor.
