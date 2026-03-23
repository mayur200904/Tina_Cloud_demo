"use client";

import Link from "next/link";
import { useTina } from "tinacms/dist/react";
import FadeUp from "@/components/motion/FadeUp";
import Stagger from "@/components/motion/Stagger";
import { Button } from "@/components/ui/button";

type HeroStat = {
  value?: string | null;
  label?: string | null;
};

type Capability = {
  title?: string | null;
  description?: string | null;
  spec?: string | null;
};

type QualityPoint = {
  label?: string | null;
  value?: string | null;
};

type Testimonial = {
  quote?: string | null;
  author?: string | null;
  role?: string | null;
};

type HomePageDocument = {
  heroEyebrow?: string | null;
  heroHeadline?: string | null;
  heroDescription?: string | null;
  heroImage?: string | null;
  heroImageAlt?: string | null;
  primaryCtaLabel?: string | null;
  primaryCtaLink?: string | null;
  secondaryCtaLabel?: string | null;
  secondaryCtaLink?: string | null;
  heroStats?: Array<HeroStat | null> | null;
  capabilityEyebrow?: string | null;
  capabilityHeadline?: string | null;
  capabilities?: Array<Capability | null> | null;
  qualityEyebrow?: string | null;
  qualityHeadline?: string | null;
  qualityDescription?: string | null;
  qualityPoints?: Array<QualityPoint | null> | null;
  proofEyebrow?: string | null;
  proofHeadline?: string | null;
  testimonials?: Array<Testimonial | null> | null;
  proofCtaLabel?: string | null;
  proofCtaLink?: string | null;
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

  const stats = (page?.heroStats ?? []).filter(
    (item): item is HeroStat => Boolean(item?.value || item?.label),
  );
  const capabilities = (page?.capabilities ?? []).filter(
    (item): item is Capability => Boolean(item?.title || item?.description || item?.spec),
  );
  const qualityPoints = (page?.qualityPoints ?? []).filter(
    (item): item is QualityPoint => Boolean(item?.label || item?.value),
  );
  const testimonials = (page?.testimonials ?? []).filter(
    (item): item is Testimonial => Boolean(item?.quote || item?.author || item?.role),
  );

  return (
    <main className="ferro-main" aria-label={page?.heroImageAlt ?? "Homepage"}>
      <section
        className="ferro-hero"
        style={{
          backgroundImage: page?.heroImage
            ? `url(${page.heroImage})`
            : undefined,
        }}
      >
        <div className="woc-container ferro-hero__grid">
          <FadeUp>
            <p className="woc-eyebrow">{page?.heroEyebrow}</p>
            <h1 className="mt-5 woc-h1 max-w-[14ch]">{page?.heroHeadline}</h1>
            <p className="mt-6 woc-lead max-w-[58ch]">{page?.heroDescription}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {page?.primaryCtaLabel && page?.primaryCtaLink ? (
                <Button asChild size="lg">
                  <Link href={page.primaryCtaLink}>{page.primaryCtaLabel}</Link>
                </Button>
              ) : null}
              {page?.secondaryCtaLabel && page?.secondaryCtaLink ? (
                <Button asChild variant="outline" size="lg" className="border-white/55 text-white hover:bg-white hover:text-[#111]">
                  <Link href={page.secondaryCtaLink}>{page.secondaryCtaLabel}</Link>
                </Button>
              ) : null}
            </div>
          </FadeUp>

          {stats.length > 0 ? (
            <Stagger className="ferro-grid ferro-grid--stats" staggerDelay={0.08}>
              {stats.map((item, index) => (
                <div key={`${item.label}-${index}`} className="ferro-metric">
                  <p className="ferro-metric__value">{item.value}</p>
                  <p className="ferro-metric__label">{item.label}</p>
                </div>
              ))}
            </Stagger>
          ) : null}
        </div>
      </section>

      <section className="woc-section">
        <div className="woc-container">
          <FadeUp>
            <p className="woc-eyebrow">{page?.capabilityEyebrow}</p>
            <h2 className="mt-5 woc-h2 max-w-[18ch]">{page?.capabilityHeadline}</h2>
          </FadeUp>

          {capabilities.length > 0 ? (
            <Stagger className="ferro-cards mt-8" staggerDelay={0.07}>
              {capabilities.map((item, index) => (
                <article key={`${item.title}-${index}`} className="ferro-card">
                  <h3 className="woc-h3">{item.title}</h3>
                  <p className="mt-4 text-[var(--color-muted)] leading-7">{item.description}</p>
                  <p className="ferro-spec">{item.spec}</p>
                </article>
              ))}
            </Stagger>
          ) : null}
        </div>
      </section>

      <section className="woc-section ferro-quality">
        <div className="woc-container">
          <FadeUp>
            <p className="woc-eyebrow">{page?.qualityEyebrow}</p>
            <h2 className="mt-5 woc-h2 max-w-[18ch]">{page?.qualityHeadline}</h2>
            <p className="mt-5 woc-lead max-w-[62ch]">{page?.qualityDescription}</p>
          </FadeUp>

          {qualityPoints.length > 0 ? (
            <Stagger className="ferro-quality-grid" staggerDelay={0.06}>
              {qualityPoints.map((item, index) => (
                <div key={`${item.label}-${index}`} className="ferro-quality-item">
                  <p className="ferro-quality-item__label">{item.label}</p>
                  <p className="ferro-quality-item__value">{item.value}</p>
                </div>
              ))}
            </Stagger>
          ) : null}
        </div>
      </section>

      <section className="woc-section woc-section--surface">
        <div className="woc-container">
          <FadeUp>
            <p className="woc-eyebrow">{page?.proofEyebrow}</p>
            <h2 className="mt-5 woc-h2 max-w-[20ch]">{page?.proofHeadline}</h2>
          </FadeUp>

          {testimonials.length > 0 ? (
            <Stagger className="ferro-testimonials" staggerDelay={0.08}>
              {testimonials.map((item, index) => (
                <article key={`${item.author}-${index}`} className="ferro-quote">
                  <p>{item.quote}</p>
                  <p className="ferro-quote__byline">{item.author} · {item.role}</p>
                </article>
              ))}
            </Stagger>
          ) : null}

          {page?.proofCtaLabel && page?.proofCtaLink ? (
            <FadeUp className="mt-8">
              <Button asChild size="lg">
                <Link href={page.proofCtaLink}>{page.proofCtaLabel}</Link>
              </Button>
            </FadeUp>
          ) : null}
        </div>
      </section>
    </main>
  );
}
