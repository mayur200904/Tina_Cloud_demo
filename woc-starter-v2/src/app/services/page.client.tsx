"use client";

import Link from "next/link";
import { useTina } from "tinacms/dist/react";
import FadeUp from "@/components/motion/FadeUp";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ServicesPageDocument = {
  eyebrow?: string | null;
  headline?: string | null;
  subheadline?: string | null;
  serviceItems?: Array<{ name?: string | null; duration?: string | null; description?: string | null } | null> | null;
  addonOffer?: { title?: string | null; description?: string | null } | null;
  ctaLabel?: string | null;
  ctaLink?: string | null;
};

interface ServicesPageClientProps {
  query: string;
  variables: { relativePath?: string };
  data: { services?: ServicesPageDocument | null };
}

export default function ServicesPageClient(props: ServicesPageClientProps) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
    experimental___selectFormByFormId() {
      return props.variables.relativePath ? `content/pages/${props.variables.relativePath}` : false;
    },
  });
  const page = data.services;
  const serviceItems = (page?.serviceItems ?? []).filter(Boolean);

  return (
    <>
      <section className="woc-container py-16 md:py-24">
        <FadeUp>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">{page?.eyebrow}</p>
          <h1 className="max-w-4xl font-[var(--font-heading)] text-4xl leading-tight md:text-6xl">{page?.headline}</h1>
          <p className="mt-6 max-w-2xl text-lg text-[var(--color-muted)]">{page?.subheadline}</p>
        </FadeUp>
      </section>

      <section className="woc-container pb-14 md:pb-20">
        <div className="grid gap-4 md:grid-cols-3">
          {serviceItems.map((service, index) => (
            <FadeUp key={`${service?.name}-${index}`} delay={index * 0.08}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{service?.name}</CardTitle>
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
            <h2 className="font-[var(--font-heading)] text-3xl">{page?.addonOffer?.title}</h2>
            <p className="mt-4 max-w-2xl text-[var(--color-muted)]">{page?.addonOffer?.description}</p>
            {page?.ctaLabel && page?.ctaLink && (
              <div className="mt-8">
                <Button asChild size="lg">
                  <Link href={page.ctaLink}>{page.ctaLabel}</Link>
                </Button>
              </div>
            )}
          </div>
        </FadeUp>
      </section>
    </>
  );
}
