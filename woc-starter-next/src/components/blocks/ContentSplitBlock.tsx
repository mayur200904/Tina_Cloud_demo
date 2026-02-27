// Server Component — pure presentational
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
                    {eyebrow && <p className="woc-eyebrow woc-eyebrow--lined">{eyebrow}</p>}
                    <h2 className="woc-h2 woc-split__heading">{heading}</h2>
                    {body && (
                        <div className="woc-split__body">
                            {/* Preserve multi-paragraph content from CMS */}
                            {body.split(/\n\n+/).map((para, i) => (
                                <p key={i}>{para.trim()}</p>
                            ))}
                        </div>
                    )}
                    {ctaLabel && (
                        <a href={ctaLink ?? '#'} className="btn-primary woc-split__cta">
                            {ctaLabel}
                        </a>
                    )}
                </div>

                {/* Image */}
                {imageUrl && (
                    <div className="woc-split__media">
                        <img
                            src={imageUrl}
                            alt={imageAlt ?? ''}
                            className="woc-split__img"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                )}
            </div>
            <style>{`
        .woc-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }
        .woc-split--reverse .woc-split__media { order: -1; }
        .woc-split__heading { margin-top: 0.875rem; }
        .woc-split__body {
          margin-top: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
        }
        .woc-split__body p {
          font-size: 1.0625rem;
          line-height: 1.8;
          color: var(--color-muted);
        }
        .woc-split__cta { margin-top: 1.75rem; }

        /* Image with decorative offset shape.
           The ::after pseudo uses primary at ~10% opacity
           — works for any brand color, any profile. */
        .woc-split__media {
          position: relative;
          border-radius: var(--radius-card);
          overflow: visible;
        }
        .woc-split__media::after {
          content: '';
          position: absolute;
          inset: 1.25rem -1.25rem -1.25rem 1.25rem;
          background-color: color-mix(in srgb, var(--color-primary) 10%, transparent);
          border-radius: var(--radius-card);
          z-index: -1;
        }
        .woc-split--reverse .woc-split__media::after {
          inset: 1.25rem 1.25rem -1.25rem -1.25rem;
        }
        .woc-split__img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
          aspect-ratio: 4/3;
          border-radius: var(--radius-card);
          box-shadow: var(--shadow-elevated);
          position: relative;
          z-index: 1;
          transition: transform 0.4s ease;
        }
        .woc-split__media:hover .woc-split__img { transform: scale(1.015); }

        @media (max-width: 768px) {
          .woc-split { grid-template-columns: 1fr; gap: 2.5rem; }
          .woc-split--reverse .woc-split__media { order: 0; }
          .woc-split__media::after { display: none; }
        }
      `}</style>
        </section>
    );
}
