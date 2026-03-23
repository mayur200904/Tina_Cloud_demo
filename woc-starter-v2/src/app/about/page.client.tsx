"use client";

import { useTina } from "tinacms/dist/react";
import FadeUp from "@/components/motion/FadeUp";

type AboutPageDocument = {
  eyebrow?: string | null;
  headline?: string | null;
  description?: string | null;
  sectionHeading?: string | null;
  sectionBody?: string | null;
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

  return (
    <main className="woc-starter-shell" aria-label="About starter shell">
      <section className="woc-section">
        <div className="woc-container">
          <FadeUp>
            <p className="woc-eyebrow">{page?.eyebrow}</p>
            <h1 className="mt-4 woc-h1">{page?.headline}</h1>
            <p className="mt-5 max-w-3xl woc-lead">{page?.description}</p>
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
