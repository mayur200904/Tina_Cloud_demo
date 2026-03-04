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
    variant?: string | null; // "carousel" | "featured"
}

export default function TestimonialCarouselBlock({
    eyebrow,
    heading,
    testimonials = [],
    variant = 'carousel',
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

    // --- Featured variant: one large quote, dark background, editorial ---
    if (variant === 'featured') {
        const featured = items[0];
        return (
            <section className="woc-section woc-testimonial-featured">
                {/* Oversized decorative quote mark */}
                <span className="woc-tf__decor" aria-hidden="true">&ldquo;</span>

                <div className="woc-container woc-tf__inner">
                    <div className="woc-tf__header">
                        {eyebrow && <p className="woc-eyebrow woc-eyebrow--lined woc-tf__eyebrow">{eyebrow}</p>}
                        {heading && <h2 className="woc-h2 woc-tf__heading">{heading}</h2>}
                    </div>

                    <blockquote className="woc-tf__quote">{featured.quote}</blockquote>

                    <footer className="woc-tf__author">
                        {featured.avatarUrl && (
                            <img
                                src={featured.avatarUrl}
                                alt={featured.authorName ?? ''}
                                className="woc-tf__avatar"
                                loading="lazy"
                                decoding="async"
                                width={56}
                                height={56}
                            />
                        )}
                        <div>
                            <strong className="woc-tf__name">{featured.authorName}</strong>
                            {featured.authorTitle && (
                                <p className="woc-tf__title">{featured.authorTitle}</p>
                            )}
                        </div>
                    </footer>
                </div>

                <style>{`
          .woc-testimonial-featured {
            position: relative;
            overflow: hidden;
            background-color: var(--color-dark);
          }
          .woc-tf__decor {
            position: absolute;
            top: -1rem;
            left: 2rem;
            font-family: var(--font-heading);
            font-size: clamp(12rem, 22vw, 20rem);
            font-weight: 900;
            line-height: 1;
            color: var(--color-primary);
            opacity: 0.08;
            user-select: none;
            pointer-events: none;
            display: block;
          }
          .woc-tf__inner {
            position: relative;
            z-index: 1;
            max-width: 52rem;
          }
          .woc-tf__eyebrow { color: var(--color-primary) !important; }
          .woc-tf__eyebrow::before { background-color: var(--color-primary) !important; }
          .woc-tf__heading {
            color: var(--color-dark-foreground, #f5f5f0);
            margin-top: 0.75rem;
            margin-bottom: 2.5rem;
          }
          .woc-tf__quote {
            font-family: var(--font-heading);
            font-size: clamp(1.5rem, 3.5vw, 2.5rem);
            font-weight: 600;
            line-height: 1.35;
            color: var(--color-dark-foreground, #f5f5f0);
            font-style: italic;
            position: relative;
          }
          .woc-tf__author {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-top: 2.5rem;
            padding-top: 2rem;
            border-top: 1px solid rgba(255,255,255,0.12);
          }
          .woc-tf__avatar {
            width: 3.5rem;
            height: 3.5rem;
            border-radius: 50%;
            object-fit: cover;
            flex-shrink: 0;
            outline: 2px solid var(--color-primary);
            outline-offset: 2px;
          }
          .woc-tf__name {
            font-size: 1rem;
            font-weight: 700;
            color: var(--color-dark-foreground, #f5f5f0);
            display: block;
          }
          .woc-tf__title {
            font-size: 0.875rem;
            color: rgba(255,255,255,0.5);
            margin-top: 0.125rem;
          }
          @media (max-width: 768px) {
            .woc-tf__decor { display: none; }
            .woc-tf__quote { font-size: 1.375rem; }
          }
        `}</style>
            </section>
        );
    }

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
