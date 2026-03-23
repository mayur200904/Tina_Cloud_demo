"use client";

import Link from "next/link";
import { useTina } from "tinacms/dist/react";
import FadeUp from "@/components/motion/FadeUp";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ServicesPageDocument = {
  eyebrow?: string | null;
  headline?: string | null;
  description?: string | null;
  items?: Array<{ title?: string | null; description?: string | null } | null> | null;
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
  const items = (page?.items ?? []).filter(Boolean);

  return (
    <main className="woc-starter-shell" aria-label="Services starter shell">
      <section className="woc-section">
        <div className="woc-container">
          <FadeUp>
            <p className="woc-eyebrow">{page?.eyebrow}</p>
            <h1 className="mt-4 woc-h1">{page?.headline}</h1>
            <p className="mt-5 max-w-3xl woc-lead">{page?.description}</p>
          </FadeUp>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {items.map((item, index) => (
              <Card key={`${item?.title}-${index}`} className="rounded-2xl border-[var(--color-surface-border)] shadow-none">
                <CardContent className="p-6">
                  <h3 className="woc-h3">{item?.title}</h3>
                  <p className="mt-3 text-[var(--color-muted)]">{item?.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {page?.ctaLabel && page?.ctaLink && (
            <div className="mt-8">
              <Button asChild size="lg" className="rounded-full px-7">
                <Link href={page.ctaLink}>{page.ctaLabel}</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
