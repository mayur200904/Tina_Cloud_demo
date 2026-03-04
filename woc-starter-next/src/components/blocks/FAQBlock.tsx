'use client';

import { useState } from 'react';

interface FAQItem {
    question?: string | null;
    answer?: string | null;
}

interface FAQBlockProps {
    eyebrow?: string | null;
    heading?: string | null;
    subheading?: string | null;
    items?: (FAQItem | null)[] | null;
}

export default function FAQBlock({
    eyebrow,
    heading,
    subheading,
    items = [],
}: FAQBlockProps) {
    // Track which item is open — null means all closed
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (i: number) => {
        setOpenIndex((prev) => (prev === i ? null : i));
    };

    return (
        <section className="woc-section woc-section--surface">
            <div className="woc-container">
                <div className="woc-section-header" style={{ marginBottom: '2.5rem', maxWidth: '48rem' }}>
                    {eyebrow && <p className="woc-eyebrow woc-eyebrow--lined">{eyebrow}</p>}
                    {heading && <h2 className="woc-h2 woc-faq-heading">{heading}</h2>}
                    {subheading && <p className="woc-lead woc-faq-sub">{subheading}</p>}
                </div>

                <div className="woc-faq" role="list">
                    {(items ?? []).map((item, i) =>
                        item ? (
                            <div
                                key={i}
                                className={`woc-faq__item woc-card${openIndex === i ? ' is-open' : ''}`}
                                role="listitem"
                            >
                                <button
                                    className="woc-faq__question"
                                    aria-expanded={openIndex === i}
                                    onClick={() => toggle(i)}
                                >
                                    <span>{item.question}</span>
                                    <span className="woc-faq__icon" aria-hidden="true">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M5 7.5L10 12.5L15 7.5"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                </button>
                                {/* CSS max-height transition for smooth accordion — requires controlled state */}
                                <div className="woc-faq__answer-wrap">
                                    <div className="woc-faq__answer">
                                        <p>{item.answer}</p>
                                    </div>
                                </div>
                            </div>
                        ) : null
                    )}
                </div>
            </div>
            <style>{`
        .woc-faq { max-width: 54rem; display: flex; flex-direction: column; gap: 0.75rem; }

        /* Each item is a full card — adapts to token radius (sharp = corporate, rounded = SMB) */
        .woc-faq__item {
          /* Override woc-card default padding for our layout */
          padding: 0;
          cursor: pointer;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .woc-faq__item.is-open {
          border-color: color-mix(in srgb, var(--color-primary) 35%, var(--color-surface-border));
        }

        .woc-faq__question {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1.375rem 1.75rem;
          font-family: var(--font-heading);
          font-size: 1.0625rem;
          font-weight: 600;
          color: var(--color-foreground);
          cursor: pointer;
          background: none;
          border: none;
          width: 100%;
          text-align: left;
          line-height: 1.4;
        }

        .woc-faq__icon {
          flex-shrink: 0;
          color: var(--color-primary);
          transition: transform 0.3s ease;
          display: flex;
        }
        .woc-faq__item.is-open .woc-faq__icon { transform: rotate(180deg); }

        /* Smooth max-height accordion */
        .woc-faq__answer-wrap {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s ease;
        }
        .woc-faq__item.is-open .woc-faq__answer-wrap {
          max-height: 40rem; /* generous ceiling — real height will be less */
        }

        .woc-faq__answer {
          padding: 0 1.75rem 1.375rem;
          border-top: 1px solid var(--color-surface-border);
          padding-top: 1.125rem;
        }
        .woc-faq__answer p {
          font-size: 0.9375rem;
          line-height: 1.75;
          color: var(--color-muted);
        }

        .woc-faq-heading { margin-top: 0.75rem; }
        .woc-faq-sub { margin-top: 0.75rem; }
      `}</style>
        </section>
    );
}
