"use client";

import Link from "next/link";
import { useTina } from "tinacms/dist/react";
import FadeUp from "@/components/motion/FadeUp";
import Stagger from "@/components/motion/Stagger";
import { Button } from "@/components/ui/button";

type Milestone = {
  year?: string | null;
  title?: string | null;
  description?: string | null;
};

type Certification = {
  name?: string | null;
  details?: string | null;
};

type FootprintStat = {
  value?: string | null;
  label?: string | null;
};

type AboutPageDocument = {
  heroEyebrow?: string | null;
  heroHeadline?: string | null;
  heroDescription?: string | null;
  timelineEyebrow?: string | null;
  timelineHeadline?: string | null;
  milestones?: Array<Milestone | null> | null;
  certificationsEyebrow?: string | null;
  certificationsHeadline?: string | null;
  certifications?: Array<Certification | null> | null;
  footprintEyebrow?: string | null;
  footprintHeadline?: string | null;
  footprintDescription?: string | null;
  footprintStats?: Array<FootprintStat | null> | null;
  ctaLabel?: string | null;
  ctaLink?: string | null;
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
  const milestones = (page?.milestones ?? []).filter(
    (item): item is Milestone => Boolean(item?.year || item?.title || item?.description),
  );
  const certifications = (page?.certifications ?? []).filter(
    (item): item is Certification => Boolean(item?.name || item?.details),
  );
  const footprintStats = (page?.footprintStats ?? []).filter(
    (item): item is FootprintStat => Boolean(item?.value || item?.label),
  );

  return (
    <main className="ferro-main" aria-label="About page">
      <section className="woc-section woc-section--dark">
        <div className="woc-container">
          <FadeUp>
            <p className="woc-eyebrow">{page?.heroEyebrow}</p>
            <h1 className="mt-5 woc-h1 max-w-[14ch]">{page?.heroHeadline}</h1>
            <p className="mt-6 woc-lead max-w-[66ch] !text-[#d5d9df]">{page?.heroDescription}</p>
          </FadeUp>
        </div>
      </section>

      <section className="woc-section">
        <div className="woc-container">
          <FadeUp>
            <p className="woc-eyebrow">{page?.timelineEyebrow}</p>
            <h2 className="mt-5 woc-h2 max-w-[20ch]">{page?.timelineHeadline}</h2>
          </FadeUp>

          {milestones.length > 0 ? (
            <Stagger className="ferro-timeline" staggerDelay={0.08}>
              {milestones.map((item, index) => (
                <article key={`${item.year}-${index}`} className="ferro-timeline__row">
                  <p className="ferro-timeline__year">{item.year}</p>
                  <h3 className="woc-h3 mt-3">{item.title}</h3>
                  <p className="mt-3 text-[var(--color-muted)] leading-7">{item.description}</p>
                </article>
              ))}
            </Stagger>
          ) : null}
        </div>
      </section>

      <section className="woc-section woc-section--surface">
        <div className="woc-container">
          <FadeUp>
            <p className="woc-eyebrow">{page?.certificationsEyebrow}</p>
            <h2 className="mt-5 woc-h2 max-w-[19ch]">{page?.certificationsHeadline}</h2>
          </FadeUp>

          {certifications.length > 0 ? (
            <Stagger className="ferro-cards mt-8" staggerDelay={0.07}>
              {certifications.map((item, index) => (
                <article key={`${item.name}-${index}`} className="ferro-card">
                  <h3 className="woc-h3">{item.name}</h3>
                  <p className="mt-4 text-[var(--color-muted)] leading-7">{item.details}</p>
                </article>
              ))}
            </Stagger>
          ) : null}
        </div>
      </section>

      <section className="woc-section">
        <div className="woc-container">
          <FadeUp>
            <p className="woc-eyebrow">{page?.footprintEyebrow}</p>
            <h2 className="mt-5 woc-h2 max-w-[18ch]">{page?.footprintHeadline}</h2>
            <p className="mt-5 woc-lead max-w-[62ch]">{page?.footprintDescription}</p>
          </FadeUp>

          {footprintStats.length > 0 ? (
            <Stagger className="ferro-stats mt-8" staggerDelay={0.07}>
              {footprintStats.map((item, index) => (
                <div key={`${item.label}-${index}`} className="ferro-stat">
                  <p className="ferro-stat__value">{item.value}</p>
                  <p className="ferro-stat__label">{item.label}</p>
                </div>
              ))}
            </Stagger>
          ) : null}

          {page?.ctaLabel && page?.ctaLink ? (
            <FadeUp className="mt-8">
              <Button asChild size="lg">
                <Link href={page.ctaLink}>{page.ctaLabel}</Link>
              </Button>
            </FadeUp>
          ) : null}
        </div>
      </section>
    </main>
  );
}
