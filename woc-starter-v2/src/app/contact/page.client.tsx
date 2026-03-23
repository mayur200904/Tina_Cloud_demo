"use client";

import Link from "next/link";
import { useTina } from "tinacms/dist/react";
import FadeUp from "@/components/motion/FadeUp";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ContactPageDocument = {
  eyebrow?: string | null;
  headline?: string | null;
  description?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
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

  return (
    <main className="woc-starter-shell" aria-label="Contact starter shell">
      <section className="woc-section">
        <div className="woc-container">
          <FadeUp>
            <p className="woc-eyebrow">{page?.eyebrow}</p>
            <h1 className="mt-4 woc-h1">{page?.headline}</h1>
            <p className="mt-5 max-w-3xl woc-lead">{page?.description}</p>
          </FadeUp>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Card className="rounded-2xl border-[var(--color-surface-border)] shadow-none">
              <CardContent className="p-6">
                <p className="woc-eyebrow">Email</p>
                <p className="mt-3 text-[var(--color-muted)]">{page?.email}</p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-[var(--color-surface-border)] shadow-none">
              <CardContent className="p-6">
                <p className="woc-eyebrow">Phone</p>
                <p className="mt-3 text-[var(--color-muted)]">{page?.phone}</p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-[var(--color-surface-border)] shadow-none">
              <CardContent className="p-6">
                <p className="woc-eyebrow">Address</p>
                <p className="mt-3 text-[var(--color-muted)]">{page?.address}</p>
              </CardContent>
            </Card>
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
