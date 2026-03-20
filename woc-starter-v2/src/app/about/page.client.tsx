"use client";

import { useTina } from "tinacms/dist/react";
import FadeUp from "@/components/motion/FadeUp";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type AboutPageDocument = {
  eyebrow?: string | null;
  headline?: string | null;
  intro?: string | null;
  heroImage?: string | null;
  heroImageAlt?: string | null;
  storyHeading?: string | null;
  storyBody?: string | null;
  credentials?: Array<{ label?: string | null; detail?: string | null } | null> | null;
};

interface AboutPageClientProps {
  query: string;
  variables: { relativePath?: string };
  data: { about?: AboutPageDocument | null };
}

export default function AboutPageClient(props: AboutPageClientProps) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
    experimental___selectFormByFormId() {
      return props.variables.relativePath ? `content/pages/${props.variables.relativePath}` : false;
    },
  });
  const page = data.about;
  const credentials = (page?.credentials ?? []).filter(Boolean);

  return (
    <>
      <section className="woc-container py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <FadeUp>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">{page?.eyebrow}</p>
            <h1 className="font-[var(--font-heading)] text-4xl leading-tight md:text-6xl">{page?.headline}</h1>
            <p className="mt-6 max-w-xl text-lg text-[var(--color-muted)]">{page?.intro}</p>
          </FadeUp>
          {page?.heroImage && (
            <FadeUp delay={0.1}>
              <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-surface-border)]">
                <img
                  src={page.heroImage}
                  alt={page.heroImageAlt ?? "Thai wellness credentials and preparation"}
                  className="h-[420px] w-full object-cover"
                />
              </div>
            </FadeUp>
          )}
        </div>
      </section>

      <section className="woc-container py-8 md:py-14">
        <FadeUp>
          <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl">{page?.storyHeading}</h2>
          <p className="mt-5 max-w-3xl text-lg text-[var(--color-muted)]">{page?.storyBody}</p>
        </FadeUp>
      </section>

      <section className="woc-container pb-20 md:pb-28">
        <div className="grid gap-4 md:grid-cols-2">
          {credentials.map((item, index) => (
            <FadeUp key={`${item?.label}-${index}`} delay={index * 0.06}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{item?.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[var(--color-muted)]">{item?.detail}</p>
                </CardContent>
              </Card>
            </FadeUp>
          ))}
        </div>
      </section>
    </>
  );
}
