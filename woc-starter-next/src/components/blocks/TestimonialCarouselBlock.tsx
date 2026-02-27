'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface Testimonial {
    quote?: string | null;
    authorName?: string | null;
    authorTitle?: string | null;
    avatarUrl?: string | null;
}

interface TestimonialCarouselBlockProps {
    eyebrow?: string | null;
    heading?: string | null;
    testimonials?: (Testimonial | null)[] | null;
}

export default function TestimonialCarouselBlock({
    eyebrow,
    heading,
    testimonials = [],
}: TestimonialCarouselBlockProps) {
    const items = (testimonials ?? []).filter(Boolean) as Testimonial[];
    const [current, setCurrent] = useState(0);
    // Use ref for timer to avoid re-render on interval tick
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const stopTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
    }, []);

    const startTimer = useCallback(() => {
        stopTimer();
        timerRef.current = setInterval(() => {
            setCurrent((prev) => (prev + 1) % items.length);
        }, 5000);
    }, [items.length, stopTimer]);

    useEffect(() => {
        if (items.length > 1) startTimer();
        return stopTimer;
    }, [items.length, startTimer, stopTimer]);

    if (items.length === 0) return null;

    return (
        <section className="woc-section">
            <div className="woc-container">
                <div className="woc-section-header" style={{ marginBottom: '3rem' }}>
                    {eyebrow && <p className="woc-eyebrow woc-eyebrow--lined">{eyebrow}</p>}
                    {heading && <h2 className="woc-h2 woc-testimonials-heading">{heading}</h2>}
                </div>

                <div className="woc-testimonials">
                    {items.map((t, i) => (
                        <div
                            key={i}
                            className={`woc-testimonial${i === current ? ' is-active' : ''}`}
                            aria-hidden={i !== current}
                        >
                            {/* Decorative large quote mark — uses heading font, fully token-driven */}
                            <span className="woc-testimonial__quote-mark" aria-hidden="true">&ldquo;</span>

                            <blockquote className="woc-testimonial__quote">{t.quote}</blockquote>

                            <footer className="woc-testimonial__author">
                                {t.avatarUrl && (
                                    <img
                                        src={t.avatarUrl}
                                        alt={t.authorName ?? ''}
                                        className="woc-testimonial__avatar"
                                        loading="lazy"
                                        decoding="async"
                                        width={48}
                                        height={48}
                                    />
                                )}
                                <div>
                                    <strong className="woc-testimonial__name">{t.authorName}</strong>
                                    {t.authorTitle && (
                                        <p className="woc-testimonial__title">{t.authorTitle}</p>
                                    )}
                                </div>
                            </footer>
                        </div>
                    ))}
                </div>

                {items.length > 1 && (
                    <div className="woc-testimonial-dots" role="tablist" aria-label="Testimonials">
                        {items.map((_, i) => (
                            <button
                                key={i}
                                className={`woc-testimonial-dot${i === current ? ' is-active' : ''}`}
                                role="tab"
                                aria-selected={i === current}
                                aria-label={`Testimonial ${i + 1}`}
                                onClick={() => {
                                    stopTimer();
                                    setCurrent(i);
                                    startTimer();
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
            <style>{`
        /* Carousel container */
        .woc-testimonials { position: relative; min-height: 18rem; }

        /* Cards — hidden until active */
        .woc-testimonial {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          background: var(--color-surface);
          border-radius: var(--radius-card);
          padding: 2.5rem 2.5rem 2rem;
          max-width: 54rem;
          opacity: 0;
          transform: translateY(10px);
          pointer-events: none;
          transition: opacity 0.45s ease, transform 0.45s ease;
          /* Left-border accent — primary color, any brand works */
          border-left: 4px solid var(--color-primary);
          border-top: 1px solid var(--color-surface-border);
          border-right: 1px solid var(--color-surface-border);
          border-bottom: 1px solid var(--color-surface-border);
        }
        .woc-testimonial.is-active {
          position: relative;
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        /* Decorative quote mark — large, uses heading font */
        .woc-testimonial__quote-mark {
          font-family: var(--font-heading);
          font-size: 5rem;
          line-height: 0.75;
          color: var(--color-primary);
          opacity: 0.25;
          display: block;
          margin-bottom: 1rem;
          user-select: none;
        }

        .woc-testimonial__quote {
          font-size: 1.125rem;
          line-height: 1.75;
          color: var(--color-foreground);
          font-style: italic;
          flex: 1;
        }

        .woc-testimonial__author {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          margin-top: 1.75rem;
        }

        /* Avatar with primary-color ring */
        .woc-testimonial__avatar {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
          outline: 2px solid var(--color-primary);
          outline-offset: 2px;
        }

        .woc-testimonial__name {
          font-size: 0.9375rem;
          font-weight: 700;
          color: var(--color-foreground);
          display: block;
        }
        .woc-testimonial__title {
          font-size: 0.875rem;
          color: var(--color-muted);
          margin-top: 0.125rem;
        }

        /* Dots — active dot grows into a pill shape */
        .woc-testimonial-dots {
          display: flex;
          gap: 0.5rem;
          margin-top: 1.75rem;
          justify-content: flex-start;
          align-items: center;
        }
        .woc-testimonial-dot {
          height: 0.375rem;
          width: 0.375rem;
          border-radius: 9999px;
          background: var(--color-surface-border);
          border: none;
          cursor: pointer;
          transition: background 0.25s, width 0.25s, opacity 0.25s;
          padding: 0;
        }
        .woc-testimonial-dot.is-active {
          background: var(--color-primary);
          width: 1.5rem;
        }

        .woc-testimonials-heading { margin-top: 0.75rem; }
      `}</style>
        </section>
    );
}
