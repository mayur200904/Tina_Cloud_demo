interface ContentSplitBlockProps {
    eyebrow?: string | null;
    heading?: string | null;
    body?: string | null;
    ctaLabel?: string | null;
    ctaLink?: string | null;
    imageUrl?: string | null;
    imageAlt?: string | null;
    imagePosition?: string | null;
}

export default function ContentSplitBlock({
    eyebrow,
    heading,
    body,
    ctaLabel,
    ctaLink = '#',
    imageUrl,
    imageAlt = '',
    imagePosition = 'right',
}: ContentSplitBlockProps) {
    return (
        <section className="woc-section">
            <div className={`woc-container woc-split${imagePosition === 'left' ? ' woc-split--reverse' : ''}`}>
                {/* Text */}
                <div className="woc-split__content">
                    {eyebrow && <p className="woc-eyebrow">{eyebrow}</p>}
                    <h2 className="woc-h2 woc-split__heading">{heading}</h2>
                    <div className="woc-divider" />
                    {body && <p className="woc-split__body">{body}</p>}
                    {ctaLabel && (
                        <a href={ctaLink ?? '#'} className="btn-primary" style={{ marginTop: '1.5rem' }}>
                            {ctaLabel}
                        </a>
                    )}
                </div>

                {/* Image */}
                {imageUrl && (
                    <div className="woc-split__media">
                        <img src={imageUrl} alt={imageAlt ?? ''} className="woc-split__img" loading="lazy" />
                    </div>
                )}
            </div>
            <style>{`
        .woc-split { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
        .woc-split--reverse .woc-split__media { order: -1; }
        .woc-split__heading { margin-top: 0.5rem; }
        .woc-split__body { margin-top: 1.25rem; font-size: 1.0625rem; line-height: 1.75; color: var(--color-muted); white-space: pre-wrap; }
        .woc-split__media { border-radius: var(--radius-card); overflow: hidden; box-shadow: var(--shadow-elevated); }
        .woc-split__img { width: 100%; height: auto; display: block; object-fit: cover; aspect-ratio: 4/3; }
        @media (max-width: 768px) {
          .woc-split { grid-template-columns: 1fr; gap: 2.5rem; }
          .woc-split--reverse .woc-split__media { order: 0; }
        }
      `}</style>
        </section>
    );
}
