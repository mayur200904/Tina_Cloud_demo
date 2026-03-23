"use client";

import Link from "next/link";
import { useTina } from "tinacms/dist/react";
import FadeUp from "@/components/motion/FadeUp";
import Stagger from "@/components/motion/Stagger";
import { Button } from "@/components/ui/button";

type ServiceCard = {
  name?: string | null;
  description?: string | null;
  tolerance?: string | null;
  materials?: string | null;
};

type ProcessStep = {
  step?: string | null;
  title?: string | null;
  description?: string | null;
};

type ServicesPageDocument = {
  heroEyebrow?: string | null;
  heroHeadline?: string | null;
  heroDescription?: string | null;
  serviceCards?: Array<ServiceCard | null> | null;
  processEyebrow?: string | null;
  processHeadline?: string | null;
  processSteps?: Array<ProcessStep | null> | null;
  ctaHeading?: string | null;
  ctaDescription?: string | null;
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
  const serviceCards = (page?.serviceCards ?? []).filter(
    (item): item is ServiceCard => Boolean(item?.name || item?.description || item?.tolerance || item?.materials),
  );
  const processSteps = (page?.processSteps ?? []).filter(
    (item): item is ProcessStep => Boolean(item?.step || item?.title || item?.description),
  );

  return (
    <main className="ferro-main" aria-label="Services page">
      <section className="woc-section woc-section--dark">
        <div className="woc-container">
          <FadeUp>
            <p className="woc-eyebrow">{page?.heroEyebrow}</p>
            <h1 className="mt-5 woc-h1 max-w-[14ch]">{page?.heroHeadline}</h1>
            <p className="mt-6 woc-lead max-w-[64ch] !text-[#d6dae1]">{page?.heroDescription}</p>
          </FadeUp>
        </div>
      </section>

      <section className="woc-section">
        <div className="woc-container">
          {serviceCards.length > 0 ? (
            <Stagger className="ferro-cards" staggerDelay={0.08}>
              {serviceCards.map((card, index) => (
                <article key={`${card.name}-${index}`} className="ferro-card">
                  <h2 className="woc-h3">{card.name}</h2>
                  <p className="mt-4 text-[var(--color-muted)] leading-7">{card.description}</p>
                  <p className="ferro-spec">{card.tolerance}</p>
                  <p className="mt-2 text-[0.8rem] text-[var(--color-muted)] font-[var(--font-mono)] uppercase tracking-[0.08em]">{card.materials}</p>
                </article>
              ))}
            </Stagger>
          ) : null}
        </div>
      </section>

      <section className="woc-section woc-section--surface">
        <div className="woc-container">
          <FadeUp>
            <p className="woc-eyebrow">{page?.processEyebrow}</p>
            <h2 className="mt-5 woc-h2 max-w-[18ch]">{page?.processHeadline}</h2>
          </FadeUp>

          {processSteps.length > 0 ? (
            <Stagger className="ferro-process" staggerDelay={0.06}>
              {processSteps.map((step, index) => (
                <article key={`${step.step}-${index}`} className="ferro-process__item">
                  <p className="ferro-process__step">{step.step}</p>
                  <h3 className="woc-h3 mt-3">{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </Stagger>
          ) : null}
        </div>
      </section>

      <section className="woc-section">
        <div className="woc-container">
          <FadeUp>
            <h2 className="woc-h2 max-w-[18ch]">{page?.ctaHeading}</h2>
            <p className="mt-5 woc-lead max-w-[64ch]">{page?.ctaDescription}</p>
            {page?.ctaLabel && page?.ctaLink ? (
              <div className="mt-8">
                <Button asChild size="lg">
                  <Link href={page.ctaLink}>{page.ctaLabel}</Link>
                </Button>
              </div>
            ) : null}
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
