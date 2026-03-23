"use client";

import Link from "next/link";
import { useTina } from "tinacms/dist/react";
import FadeUp from "@/components/motion/FadeUp";
import { Button } from "@/components/ui/button";

type HomePageDocument = {
  eyebrow?: string | null;
  headline?: string | null;
  description?: string | null;
  primaryCtaLabel?: string | null;
  primaryCtaLink?: string | null;
  secondaryCtaLabel?: string | null;
  secondaryCtaLink?: string | null;
  sectionHeading?: string | null;
  sectionBody?: string | null;
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

  return (
    <main className="woc-starter-shell" aria-label="Home starter shell">
      <section className="woc-section">
        <div className="woc-container">
          <FadeUp>
            <p className="woc-eyebrow">{page?.eyebrow}</p>
            <h1 className="mt-4 woc-h1">{page?.headline}</h1>
            <p className="mt-5 max-w-3xl woc-lead">{page?.description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {page?.primaryCtaLabel && page?.primaryCtaLink && (
                <Button asChild size="lg" className="rounded-full px-7">
                  <Link href={page.primaryCtaLink}>{page.primaryCtaLabel}</Link>
                </Button>
              )}
              {page?.secondaryCtaLabel && page?.secondaryCtaLink && (
                <Button asChild variant="outline" size="lg" className="rounded-full px-7">
                  <Link href={page.secondaryCtaLink}>{page.secondaryCtaLabel}</Link>
                </Button>
              )}
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="woc-section woc-section--surface">
        <div className="woc-container">
          <FadeUp>
            <h2 className="woc-h2">{page?.sectionHeading}</h2>
            <p className="mt-4 max-w-3xl woc-lead">{page?.sectionBody}</p>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
