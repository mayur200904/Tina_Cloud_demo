"use client";

import Link from "next/link";
import { useTina } from "tinacms/dist/react";
import FadeUp from "@/components/motion/FadeUp";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ContactPageDocument = {
  eyebrow?: string | null;
  headline?: string | null;
  subheadline?: string | null;
  whatsappLabel?: string | null;
  whatsappLink?: string | null;
  calendlyLabel?: string | null;
  calendlyLink?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  hours?: string | null;
  testimonial?: { quote?: string | null; author?: string | null } | null;
};

interface ContactPageClientProps {
  query: string;
  variables: { relativePath?: string };
  data: { contact?: ContactPageDocument | null };
}

export default function ContactPageClient(props: ContactPageClientProps) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
    experimental___selectFormByFormId(formId) {
      return formId === `content/pages/${props.variables.relativePath}`;
    },
  });
  const page = data.contact;

  return (
    <>
      <section className="woc-container py-16 md:py-24">
        <FadeUp>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">{page?.eyebrow}</p>
          <h1 className="max-w-3xl font-[var(--font-heading)] text-4xl leading-tight md:text-6xl">{page?.headline}</h1>
          <p className="mt-6 max-w-2xl text-lg text-[var(--color-muted)]">{page?.subheadline}</p>
        </FadeUp>
      </section>

      <section className="woc-container pb-10 md:pb-16">
        <div className="grid gap-4 md:grid-cols-2">
          {page?.whatsappLabel && page?.whatsappLink && (
            <Button asChild size="lg" className="w-full justify-center">
              <Link href={page.whatsappLink}>{page.whatsappLabel}</Link>
            </Button>
          )}
          {page?.calendlyLabel && page?.calendlyLink && (
            <Button asChild variant="outline" size="lg" className="w-full justify-center">
              <Link href={page.calendlyLink}>{page.calendlyLabel}</Link>
            </Button>
          )}
        </div>
      </section>

      <section className="woc-container pb-14 md:pb-20">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Email</CardTitle>
            </CardHeader>
            <CardContent>
              <a className="text-[var(--color-muted)] underline-offset-4 hover:underline" href={`mailto:${page?.email ?? ""}`}>
                {page?.email}
              </a>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Phone</CardTitle>
            </CardHeader>
            <CardContent>
              <a className="text-[var(--color-muted)] underline-offset-4 hover:underline" href={`tel:${page?.phone ?? ""}`}>
                {page?.phone}
              </a>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[var(--color-muted)]">{page?.hours}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="woc-container pb-20 md:pb-28">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <FadeUp>
            <div className="rounded-[var(--radius-card)] border border-[var(--color-surface-border)] bg-[var(--color-surface)] p-8 md:p-12">
              <h2 className="font-[var(--font-heading)] text-3xl">Visit Sawasdee Thai Wellness</h2>
              <p className="mt-4 max-w-2xl text-[var(--color-muted)]">{page?.address}</p>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Client Note</CardTitle>
              </CardHeader>
              <CardContent>
                <blockquote className="font-[var(--font-heading)] text-2xl leading-snug">“{page?.testimonial?.quote}”</blockquote>
                <p className="mt-4 text-sm uppercase tracking-[0.08em] text-[var(--color-muted)]">{page?.testimonial?.author}</p>
              </CardContent>
            </Card>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
