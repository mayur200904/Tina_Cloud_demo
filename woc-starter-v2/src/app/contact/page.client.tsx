"use client";

import Link from "next/link";
import { useTina } from "tinacms/dist/react";
import FadeUp from "@/components/motion/FadeUp";
import Stagger from "@/components/motion/Stagger";
import { Button } from "@/components/ui/button";

type ContactPageDocument = {
  heroEyebrow?: string | null;
  heroHeadline?: string | null;
  heroDescription?: string | null;
  formHeading?: string | null;
  formDescription?: string | null;
  uploadHint?: string | null;
  emailLabel?: string | null;
  emailValue?: string | null;
  phoneLabel?: string | null;
  phoneValue?: string | null;
  addressLabel?: string | null;
  addressValue?: string | null;
  hoursLabel?: string | null;
  hoursValue?: string | null;
  responseLabel?: string | null;
  responseValue?: string | null;
  testimonialQuote?: string | null;
  testimonialAuthor?: string | null;
  ctaLabel?: string | null;
  ctaLink?: string | null;
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
    experimental___selectFormByFormId() {
      return props.variables.relativePath ? `content/pages/${props.variables.relativePath}` : false;
    },
  });

  const page = data.contact;

  const contactLines = [
    { label: page?.emailLabel, value: page?.emailValue },
    { label: page?.phoneLabel, value: page?.phoneValue },
    { label: page?.addressLabel, value: page?.addressValue },
    { label: page?.hoursLabel, value: page?.hoursValue },
    { label: page?.responseLabel, value: page?.responseValue },
  ].filter((item) => item.label || item.value);

  return (
    <main className="ferro-main" aria-label="Contact page">
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
          <div className="ferro-contact-grid">
            <FadeUp className="ferro-panel">
              <h2 className="woc-h3">{page?.formHeading}</h2>
              <p className="mt-4 leading-7">{page?.formDescription}</p>

              <div className="mt-6 grid gap-3">
                <div className="ferro-field">Part Name</div>
                <div className="ferro-field">Material Grade</div>
                <div className="ferro-field">Batch Quantity</div>
                <div className="ferro-field">Required Delivery Date</div>
              </div>

              <p className="ferro-note">{page?.uploadHint}</p>

              {page?.ctaLabel && page?.ctaLink ? (
                <div className="mt-6">
                  <Button asChild size="lg">
                    <Link href={page.ctaLink}>{page.ctaLabel}</Link>
                  </Button>
                </div>
              ) : null}
            </FadeUp>

            <div className="grid gap-3">
              {contactLines.length > 0 ? (
                <Stagger className="grid gap-3" staggerDelay={0.06}>
                  {contactLines.map((item, index) => (
                    <article key={`${item.label}-${index}`} className="ferro-panel">
                      <p className="ferro-spec !mt-0">{item.label}</p>
                      <p className="mt-3 leading-7">{item.value}</p>
                    </article>
                  ))}
                </Stagger>
              ) : null}

              {page?.testimonialQuote || page?.testimonialAuthor ? (
                <FadeUp className="ferro-quote">
                  <p>{page?.testimonialQuote}</p>
                  <p className="ferro-quote__byline">{page?.testimonialAuthor}</p>
                </FadeUp>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
