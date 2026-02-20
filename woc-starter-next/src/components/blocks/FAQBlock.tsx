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
    return (
        <section className="woc-section woc-section--surface">
            <div className="woc-container">
                <div className="woc-section-header" style={{ marginBottom: '2.5rem', maxWidth: '40rem' }}>
                    {eyebrow && <p className="woc-eyebrow">{eyebrow}</p>}
                    <h2 className="woc-h2" style={{ marginTop: '0.5rem' }}>{heading}</h2>
                    {subheading && <p className="woc-lead" style={{ marginTop: '0.75rem' }}>{subheading}</p>}
                </div>

                <div className="woc-faq" role="list">
                    {(items ?? []).map((item, i) =>
                        item ? (
                            <details key={i} className="woc-faq__item" role="listitem">
                                <summary className="woc-faq__question">
                                    <span>{item.question}</span>
                                    <span className="woc-faq__icon" aria-hidden="true">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                </summary>
                                <div className="woc-faq__answer">
                                    <p>{item.answer}</p>
                                </div>
                            </details>
                        ) : null
                    )}
                </div>
            </div>
            <style>{`
        .woc-faq { max-width: 52rem; }
        .woc-faq__item { border-top: 1px solid var(--color-surface-border); padding-block: 0.125rem; }
        .woc-faq__item:last-child { border-bottom: 1px solid var(--color-surface-border); }
        .woc-faq__question { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding-block: 1.25rem; font-family: var(--font-sans); font-size: 1.0625rem; font-weight: 600; color: var(--color-foreground); cursor: pointer; list-style: none; user-select: none; }
        .woc-faq__question::-webkit-details-marker { display: none; }
        .woc-faq__icon { flex-shrink: 0; color: var(--color-primary); transition: transform 0.25s ease; }
        details[open] .woc-faq__icon { transform: rotate(180deg); }
        .woc-faq__answer { padding-bottom: 1.25rem; padding-right: 2.5rem; }
        .woc-faq__answer p { font-size: 0.9375rem; line-height: 1.7; color: var(--color-muted); }
      `}</style>
        </section>
    );
}
