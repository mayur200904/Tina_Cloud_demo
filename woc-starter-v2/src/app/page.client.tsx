"use client";

import Link from "next/link";
import { useTina } from "tinacms/dist/react";
import FadeUp from "@/components/motion/FadeUp";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type HomePageDocument = {
  eyebrow?: string | null;
  headline?: string | null;
  subheadline?: string | null;
  heroImage?: string | null;
  heroImageAlt?: string | null;
  primaryCtaLabel?: string | null;
  primaryCtaLink?: string | null;
  secondaryCtaLabel?: string | null;
  secondaryCtaLink?: string | null;
  credibilityStats?: Array<{ value?: string | null; label?: string | null } | null> | null;
  servicesPreview?: Array<{ title?: string | null; description?: string | null; duration?: string | null } | null> | null;
  trustQuote?: string | null;
  trustQuoteAuthor?: string | null;
};

interface HomePageClientProps {
  query: string;
  variables: { relativePath?: string };
  data: { home?: HomePageDocument | null };
}

export default function HomePageClient(props: HomePageClientProps) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
    experimental___selectFormByFormId() {
      return props.variables.relativePath ? `content/pages/${props.variables.relativePath}` : false;
    },
  });
  const page = data.home;

  const stats = (page?.credibilityStats ?? []).filter(Boolean);
  const services = (page?.servicesPreview ?? []).filter(Boolean);

  return (
    <>
      <section className="woc-container py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <FadeUp>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">{page?.eyebrow}</p>
            <h1 className="font-[var(--font-heading)] text-4xl leading-tight md:text-6xl">{page?.headline}</h1>
            <p className="mt-6 max-w-xl text-lg text-[var(--color-muted)]">{page?.subheadline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {page?.primaryCtaLabel && page?.primaryCtaLink && (
                <Button asChild size="lg">
                  <Link href={page.primaryCtaLink}>{page.primaryCtaLabel}</Link>
                </Button>
              )}
              {page?.secondaryCtaLabel && page?.secondaryCtaLink && (
                <Button asChild variant="outline" size="lg">
                  <Link href={page.secondaryCtaLink}>{page.secondaryCtaLabel}</Link>
                </Button>
              )}
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            {page?.heroImage && (
              <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-surface-border)]">
                <img
                  src={page.heroImage}
                  alt={page.heroImageAlt ?? "Thai wellness therapy room"}
                  className="h-[420px] w-full object-cover"
                />
              </div>
            )}
          </FadeUp>
        </div>
      </section>

      <section className="woc-container pb-10 md:pb-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => (
            <Card key={`${item?.value}-${index}`}>
              <CardHeader>
                <CardTitle className="text-2xl">{item?.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--color-muted)]">{item?.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="woc-container py-16 md:py-20">
        <FadeUp>
          <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl">Signature Therapies</h2>
        </FadeUp>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {services.map((service, index) => (
            <FadeUp key={`${service?.title}-${index}`} delay={index * 0.08}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{service?.title}</CardTitle>
                  <p className="text-xs font-medium uppercase tracking-[0.1em] text-[var(--color-primary)]">{service?.duration}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[var(--color-muted)]">{service?.description}</p>
                </CardContent>
              </Card>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="woc-container pb-20 md:pb-28">
        <FadeUp>
          <div className="rounded-[var(--radius-card)] border border-[var(--color-surface-border)] bg-[var(--color-surface)] p-8 md:p-12">
            <blockquote className="font-[var(--font-heading)] text-2xl leading-snug md:text-3xl">“{page?.trustQuote}”</blockquote>
            <p className="mt-4 text-sm uppercase tracking-[0.08em] text-[var(--color-muted)]">{page?.trustQuoteAuthor}</p>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
