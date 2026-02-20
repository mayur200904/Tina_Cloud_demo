'use client';

import { useState, useEffect, useRef } from 'react';

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
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    function show(index: number) {
        setCurrent(index);
    }

    function startTimer() {
        timerRef.current = setInterval(() => {
            setCurrent((prev) => (prev + 1) % items.length);
        }, 5000);
    }

    useEffect(() => {
        if (items.length > 1) startTimer();
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [items.length]);

    if (items.length === 0) return null;

    return (
        <section className="woc-section">
            <div className="woc-container">
                <div className="woc-section-header" style={{ marginBottom: '3rem' }}>
                    {eyebrow && <p className="woc-eyebrow">{eyebrow}</p>}
                    <h2 className="woc-h2" style={{ marginTop: '0.5rem' }}>{heading}</h2>
                </div>

                <div className="woc-testimonials">
                    {items.map((t, i) => (
                        <div key={i} className={`woc-testimonial${i === current ? ' is-active' : ''}`}>
                            <div className="woc-testimonial__quote-mark" aria-hidden="true">&ldquo;</div>
                            <blockquote className="woc-testimonial__quote">{t.quote}</blockquote>
                            <footer className="woc-testimonial__author">
                                {t.avatarUrl && (
                                    <img src={t.avatarUrl} alt={t.authorName ?? ''} className="woc-testimonial__avatar" loading="lazy" />
                                )}
                                <div>
                                    <strong className="woc-testimonial__name">{t.authorName}</strong>
                                    {t.authorTitle && <p className="woc-testimonial__title">{t.authorTitle}</p>}
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
                                    if (timerRef.current) clearInterval(timerRef.current);
                                    show(i);
                                    startTimer();
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
            <style>{`
        .woc-testimonials { position: relative; min-height: 16rem; }
        .woc-testimonial { position: absolute; inset: 0; display: none; flex-direction: column; background: var(--color-surface); border-radius: var(--radius-card); padding: 2.5rem; max-width: 52rem; opacity: 0; transition: opacity 0.4s ease; border: 1px solid var(--color-surface-border); }
        .woc-testimonial.is-active { display: flex; opacity: 1; position: relative; }
        .woc-testimonial__quote-mark { font-family: var(--font-heading); font-size: 5rem; line-height: 0.5; color: var(--color-primary); opacity: 0.3; margin-bottom: 1rem; }
        .woc-testimonial__quote { font-size: 1.125rem; line-height: 1.7; color: var(--color-foreground); font-style: italic; flex: 1; }
        .woc-testimonial__author { display: flex; align-items: center; gap: 1rem; margin-top: 1.5rem; }
        .woc-testimonial__avatar { width: 3rem; height: 3rem; border-radius: 50%; object-fit: cover; }
        .woc-testimonial__name { font-size: 0.9375rem; font-weight: 600; color: var(--color-foreground); }
        .woc-testimonial__title { font-size: 0.875rem; color: var(--color-muted); margin-top: 0.125rem; }
        .woc-testimonial-dots { display: flex; gap: 0.5rem; margin-top: 1.5rem; justify-content: center; }
        .woc-testimonial-dot { width: 0.5rem; height: 0.5rem; border-radius: 50%; background: var(--color-surface-border); border: none; cursor: pointer; transition: background 0.2s, transform 0.2s; }
        .woc-testimonial-dot.is-active { background: var(--color-primary); transform: scale(1.4); }
      `}</style>
        </section>
    );
}
