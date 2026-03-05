# Motion Guide

Rules for animation in woc-starter-v2. Three wrappers. That's all.

---

## The Principle

Motion should feel **inevitable**, not surprising. A well-animated page makes you forget the animation was there — you just feel like the content arrived naturally. If you notice the animation, it's probably too much.

**Goal:** reinforcement, not spectacle.

---

## The Three Wrappers

### FadeUp — for text and standalone elements

```tsx
import FadeUp from "@/components/motion/FadeUp";

<FadeUp delay={0.1}><h2 className="woc-h2">Section Title</h2></FadeUp>
<FadeUp delay={0.2}><p className="woc-lead">Supporting copy.</p></FadeUp>
<FadeUp delay={0.25}><a href="/contact" className="btn-primary">Get Started</a></FadeUp>
```

**When to use:**
- Any heading entering the viewport
- Standalone text blocks
- CTAs
- Individual elements you want to draw the eye to

**Stagger delays within a text block:**
- Eyebrow: `delay={0}` or `delay={0.05}`
- Heading: `delay={0.1}`
- Body: `delay={0.15}`
- CTA: `delay={0.2}` or `delay={0.25}`

Never exceed `delay={0.3}` for text. Long delays feel broken.

---

### Stagger — for collections of equal-weight items

```tsx
import Stagger from "@/components/motion/Stagger";

// Card grid — each card staggers in
<Stagger staggerDelay={0.07} className="grid grid-cols-3 gap-6">
  {services.map((s, i) => (
    <Card key={i}>...</Card>
  ))}
</Stagger>

// List items
<Stagger staggerDelay={0.05} className="flex flex-col gap-3">
  {items.map((item, i) => (
    <div key={i}>...</div>
  ))}
</Stagger>
```

**When to use:**
- Card grids (service cards, team cards, testimonial cards)
- Feature/benefit lists
- Any collection where items are visually equal

**staggerDelay values:**
- `0.05` — tight lists (4+ items, small cards)
- `0.07` — standard card grids (3 columns)
- `0.1` — 2-column layouts, larger cards

Do not exceed `0.12`. The last card should appear within ~0.5s of the first.

---

### HoverScale — for images and interactive cards

```tsx
import HoverScale from "@/components/motion/HoverScale";

// Image in a content split
<HoverScale scale={1.03} className="overflow-hidden rounded-[var(--radius-card)]">
  <img src="..." alt="..." className="w-full h-[420px] object-cover" />
</HoverScale>

// Hoverable card (use inside Stagger)
<HoverScale scale={1.01}>
  <Card className="woc-card">...</Card>
</HoverScale>
```

**When to use:**
- Hero images
- ContentSplit images
- Portfolio/gallery items
- Cards that are clickable or feel interactive

**scale values:**
- `1.01` — subtle lift on cards (default for most)
- `1.02` — standard image hover
- `1.03` — larger feature images
- `1.04` — max. Never go higher.

**Important:** wrap with `overflow-hidden` on the container to contain the scale — otherwise the image bleeds outside its boundary.

---

## Delay / Duration Approved Values

| Parameter | Approved range | Notes |
|---|---|---|
| `delay` (FadeUp) | `0` – `0.3` | Never exceed 0.3 for text |
| `staggerDelay` (Stagger) | `0.05` – `0.12` | Keep tight |
| `scale` (HoverScale) | `1.01` – `1.04` | Subtle |
| Duration | `0.45` – `0.6` | Internal to wrappers — don't override |

---

## What NOT to Do

| Don't | Why |
|---|---|
| `import { motion } from "framer-motion"` | Use the wrappers only — raw API misuse is the most common error source |
| `delay={0.8}` or higher | Feels broken on fast scroll — content appears after the user has moved past |
| Animate layout changes (width, height, grid) | Causes layout thrash — only animate opacity and transform |
| Auto-playing anything (carousels, videos) | Distracting and inaccessible |
| Scroll-jacking | Never. Full stop. |
| GSAP or any other animation library | Not installed — do not add |
| More than 3 different animation types on one page | Incoherent — pick one or two patterns and repeat them |
| Animating the nav or footer | These are persistent chrome — they should not move |

---

## Practical Page Example

```tsx
// Good pattern — a services section
<section className="woc-section woc-section--surface">
  <div className="woc-container">
    {/* Section heading — FadeUp */}
    <FadeUp className="text-center mb-14">
      <p className="woc-eyebrow mb-3">What We Do</p>
      <h2 className="woc-h2">Engineering at Scale</h2>
    </FadeUp>

    {/* Card grid — Stagger */}
    <Stagger staggerDelay={0.07} className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {services.map((s, i) => (
        // Each card — HoverScale
        <HoverScale key={i} scale={1.01}>
          <Card className="woc-card border-0 p-8">
            ...
          </Card>
        </HoverScale>
      ))}
    </Stagger>
  </div>
</section>
```

This uses all three wrappers appropriately:
- FadeUp for the section intro text
- Stagger for the equal-weight cards
- HoverScale inside each card for interaction feedback
