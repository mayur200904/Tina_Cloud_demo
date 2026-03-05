# shadcn/ui Section Patterns

Starting points for common section types. Customize for each client — do not ship as-is.

These are structural skeletons. The agent writes the final version using the Design Spec's visual concept, surprise element, and copy tone as creative direction.

---

## Import Paths (pre-installed components only)

```tsx
// Primitives
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

// Motion wrappers (always use these — never import framer-motion directly)
import FadeUp from "@/components/motion/FadeUp";
import Stagger from "@/components/motion/Stagger";
import HoverScale from "@/components/motion/HoverScale";

// Lucide icons — import by name
import { ArrowRight, Building2, Phone, Mail, MapPin } from "lucide-react";
```

**Not included:** DataTable, Calendar, Charts, Combobox, Command, Toast, Popover — do not attempt to use these.

---

## HeroPattern

Full-bleed hero with headline and CTA.

**TinaCMS fields needed:**
```typescript
{ name: "headline", type: "string", required: true },
{ name: "subheadline", type: "string", ui: { component: "textarea" } },
{ name: "ctaLabel", type: "string" },
{ name: "ctaLink", type: "string" },
{ name: "heroImage", type: "image" },
{ name: "heroImageAlt", type: "string" },
```

**TSX skeleton:**
```tsx
<section
  className="relative min-h-[90vh] flex items-end"
  style={{
    backgroundImage: `url(${data.heroImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Dark gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

  <div className="relative woc-container pb-20 pt-32">
    <FadeUp>
      <p className="woc-eyebrow woc-eyebrow--lined text-white/70 mb-6">
        {data.eyebrow}
      </p>
    </FadeUp>
    <FadeUp delay={0.1}>
      <h1 className="woc-h1 text-white max-w-3xl mb-6">{data.headline}</h1>
    </FadeUp>
    <FadeUp delay={0.2}>
      <p className="woc-lead text-white/70 max-w-xl mb-10">{data.subheadline}</p>
    </FadeUp>
    <FadeUp delay={0.3}>
      <a href={data.ctaLink} className="btn-primary">
        {data.ctaLabel} <ArrowRight size={16} />
      </a>
    </FadeUp>
  </div>
</section>
```

---

## ContentSplitPattern

Text left/right, image the other side. Use for about teasers, credibility sections, specific service callouts.

**TinaCMS fields needed:**
```typescript
{ name: "eyebrow", type: "string" },
{ name: "heading", type: "string" },
{ name: "body", type: "string", ui: { component: "textarea" } },
{ name: "ctaLabel", type: "string" },
{ name: "ctaLink", type: "string" },
{ name: "image", type: "image" },
{ name: "imageAlt", type: "string" },
// imagePosition is hardcoded per client — not a CMS field
```

**TSX skeleton (text left, image right):**
```tsx
<section className="woc-section">
  <div className="woc-container">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      {/* Text */}
      <div>
        <FadeUp>
          <p className="woc-eyebrow woc-eyebrow--lined mb-4">{data.eyebrow}</p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="woc-h2 mb-6">{data.heading}</h2>
        </FadeUp>
        <FadeUp delay={0.15}>
          <p className="woc-lead mb-8">{data.body}</p>
        </FadeUp>
        {data.ctaLabel && (
          <FadeUp delay={0.2}>
            <a href={data.ctaLink} className="btn-secondary">
              {data.ctaLabel}
            </a>
          </FadeUp>
        )}
      </div>

      {/* Image */}
      <FadeUp delay={0.1}>
        <HoverScale className="overflow-hidden rounded-[var(--radius-card)]">
          <img
            src={data.image ?? ""}
            alt={data.imageAlt ?? ""}
            className="w-full h-[420px] object-cover"
          />
        </HoverScale>
      </FadeUp>
    </div>
  </div>
</section>
```

---

## CardGridPattern

2/3/4 column card grid. Use for services, team, features.

**TinaCMS fields needed:**
```typescript
{
  name: "items",
  type: "object",
  list: true,
  fields: [
    { name: "title", type: "string" },
    { name: "description", type: "string", ui: { component: "textarea" } },
    { name: "icon", type: "string" },  // Lucide icon name as string
  ],
}
```

**TSX skeleton (3-column):**
```tsx
<section className="woc-section woc-section--surface">
  <div className="woc-container">
    <FadeUp className="text-center mb-14">
      <p className="woc-eyebrow mb-3">{data.eyebrow}</p>
      <h2 className="woc-h2">{data.heading}</h2>
    </FadeUp>

    <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.items?.map((item, i) => (
        <Card key={i} className="woc-card border-0">
          <CardContent className="p-8">
            {/* Icon — render from lucide dynamically or use emoji fallback */}
            <div className="w-12 h-12 rounded-[var(--radius-global)] bg-[var(--color-primary)]/10 flex items-center justify-center mb-6">
              <span className="text-[var(--color-primary)] text-xl">{item?.icon}</span>
            </div>
            <h3 className="woc-h3 mb-3">{item?.title}</h3>
            <p className="text-[var(--color-muted)] leading-relaxed">{item?.description}</p>
          </CardContent>
        </Card>
      ))}
    </Stagger>
  </div>
</section>
```

---

## StatsPattern

Number band for credibility. Keep on dark or surface background.

**TinaCMS fields needed:**
```typescript
{
  name: "stats",
  type: "object",
  list: true,
  fields: [
    { name: "value", type: "string" },
    { name: "label", type: "string" },
  ],
}
```

**TSX skeleton:**
```tsx
<section className="woc-section woc-section--dark">
  <div className="woc-container">
    <FadeUp className="text-center mb-12">
      <p className="woc-eyebrow" style={{ color: "color-mix(in srgb, var(--color-dark-foreground) 70%, transparent)" }}>
        {data.eyebrow}
      </p>
    </FadeUp>
    <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
      {data.stats?.map((stat, i) => (
        <div key={i}>
          <p
            className="font-[var(--font-heading)] text-5xl font-bold mb-2"
            style={{ color: "var(--color-dark-foreground)" }}
          >
            {stat?.value}
          </p>
          <p style={{ color: "color-mix(in srgb, var(--color-dark-foreground) 60%, transparent)" }}>
            {stat?.label}
          </p>
        </div>
      ))}
    </Stagger>
  </div>
</section>
```

---

## TestimonialPattern

Quote with author. Use `woc-section--surface` or `woc-section--dark` depending on rhythm.

**TinaCMS fields needed:**
```typescript
{
  name: "testimonials",
  type: "object",
  list: true,
  fields: [
    { name: "quote", type: "string", ui: { component: "textarea" } },
    { name: "authorName", type: "string" },
    { name: "authorTitle", type: "string" },
  ],
}
```

**TSX skeleton:**
```tsx
<section className="woc-section woc-section--surface">
  <div className="woc-container">
    <FadeUp className="text-center mb-12">
      <h2 className="woc-h2">{data.heading}</h2>
    </FadeUp>
    <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.testimonials?.map((t, i) => (
        <Card key={i} className="woc-card border-0 p-8">
          <CardContent className="p-0">
            <p className="text-[var(--color-foreground)] leading-relaxed mb-6 text-lg">
              "{t?.quote}"
            </p>
            <Separator className="mb-6" />
            <p className="font-semibold text-[var(--color-foreground)]">{t?.authorName}</p>
            <p className="text-sm text-[var(--color-muted)]">{t?.authorTitle}</p>
          </CardContent>
        </Card>
      ))}
    </Stagger>
  </div>
</section>
```

---

## AccordionPattern

FAQ section. Pairs well after a services or about section.

**TinaCMS fields needed:**
```typescript
{
  name: "items",
  type: "object",
  list: true,
  fields: [
    { name: "question", type: "string" },
    { name: "answer", type: "string", ui: { component: "textarea" } },
  ],
}
```

**TSX skeleton:**
```tsx
<section className="woc-section">
  <div className="woc-container max-w-3xl">
    <FadeUp className="text-center mb-12">
      <p className="woc-eyebrow mb-3">{data.eyebrow}</p>
      <h2 className="woc-h2">{data.heading}</h2>
    </FadeUp>
    <FadeUp delay={0.1}>
      <Accordion type="single" collapsible className="w-full">
        {data.items?.map((item, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left font-medium text-[var(--color-foreground)] text-base">
              {item?.question}
            </AccordionTrigger>
            <AccordionContent className="text-[var(--color-muted)] leading-relaxed">
              {item?.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </FadeUp>
  </div>
</section>
```

---

## ContactFormPattern

Formspree form + contact info sidebar.

**TinaCMS fields needed:**
```typescript
{ name: "heading", type: "string" },
{ name: "subheading", type: "string" },
{ name: "formspreeId", type: "string" },
{ name: "phone", type: "string" },
{ name: "email", type: "string" },
{ name: "address", type: "string", ui: { component: "textarea" } },
```

**TSX skeleton:**
```tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";
import FadeUp from "@/components/motion/FadeUp";

// ContactSection component (mark file "use client" if using this)
export function ContactSection({ data }: { data: PageData }) {
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const res = await fetch(`https://formspree.io/f/${data.formspreeId}`, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });
    if (res.ok) setSubmitted(true);
  }

  return (
    <section className="woc-section">
      <div className="woc-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <FadeUp>
            <h2 className="woc-h2 mb-3">{data.heading}</h2>
            <p className="woc-lead mb-8">{data.subheading}</p>
            {submitted ? (
              <p className="text-[var(--color-primary)] font-semibold">
                Thank you — we'll be in touch soon.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" required placeholder="Your name" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required placeholder="you@company.com" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" required placeholder="Tell us about your project" className="min-h-[140px]" />
                </div>
                <Button type="submit" size="lg" className="self-start">
                  Send Message
                </Button>
              </form>
            )}
          </FadeUp>

          {/* Contact info */}
          <FadeUp delay={0.15} className="flex flex-col gap-8 pt-2">
            {data.phone && (
              <div className="flex items-start gap-4">
                <Phone size={20} className="text-[var(--color-primary)] mt-1 shrink-0" />
                <div>
                  <p className="font-semibold mb-0.5">Phone</p>
                  <p className="text-[var(--color-muted)]">{data.phone}</p>
                </div>
              </div>
            )}
            {data.email && (
              <div className="flex items-start gap-4">
                <Mail size={20} className="text-[var(--color-primary)] mt-1 shrink-0" />
                <div>
                  <p className="font-semibold mb-0.5">Email</p>
                  <p className="text-[var(--color-muted)]">{data.email}</p>
                </div>
              </div>
            )}
            {data.address && (
              <div className="flex items-start gap-4">
                <MapPin size={20} className="text-[var(--color-primary)] mt-1 shrink-0" />
                <div>
                  <p className="font-semibold mb-0.5">Address</p>
                  <p className="text-[var(--color-muted)]">{data.address}</p>
                </div>
              </div>
            )}
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
```

---

## Section Rhythm Reminder

| Position in page | Background |
|---|---|
| Hero | Dark or image (usually dark overlay) |
| First section after hero | Light (white or surface) |
| Every 3rd section | Dark (`woc-section--dark`) |
| Never | Two dark sections adjacent |
| Never | Three light sections in a row |

Use `className="woc-section"` for white, `"woc-section woc-section--surface"` for light grey, `"woc-section woc-section--dark"` for dark.
