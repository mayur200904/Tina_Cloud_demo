// Server Component — ScrollReveal used for section entrance
import ScrollReveal from '../ScrollReveal';

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
  ctaLink = '/contact',
  imageUrl,
  imageAlt = '',
  imagePosition = 'right',
}: ContentSplitBlockProps) {
  const paragraphs = body?.split(/\n\n+/).map((p) => p.trim()).filter(Boolean) ?? [];

  return (
    <section className="woc-section">
      <div className={`woc-container woc-split${imagePosition === 'left' ? ' woc-split--reverse' : ''}`}>
        {/* Text */}
        <ScrollReveal delay={0}>
          <div className="woc-split__content">
            {eyebrow && (
              <p className="woc-eyebrow woc-eyebrow--lined">{eyebrow}</p>
            )}
            <h2 className="woc-h2 woc-split__heading">{heading}</h2>
            {paragraphs.length > 0 && (
              <div className="woc-split__body">
                {paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}
            {ctaLabel && (
              <a href={ctaLink ?? '/contact'} className="btn-primary woc-split__cta">
                {ctaLabel}
                <span className="woc-split__cta-arrow" aria-hidden="true">→</span>
              </a>
            )}
          </div>
        </ScrollReveal>

        {/* Image */}
        {imageUrl && (
          <ScrollReveal delay={120}>
            <div className="woc-split__media">
              <img
                src={imageUrl}
                alt={imageAlt ?? ''}
                className="woc-split__img"
                loading="lazy"
                decoding="async"
              />
              {/* Offset shape */}
              <span className="woc-split__shape" aria-hidden="true" />
              {/* Floating label chip */}
              {eyebrow && (
                <span className="woc-split__float-badge" aria-hidden="true">
                  {eyebrow}
                </span>
              )}
            </div>
          </ScrollReveal>
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
        .woc-split__cta {
          margin-top: 2rem;
          display: inline-flex;
          align-items: center;
          gap: 0.625rem;
        }
        .woc-split__cta-arrow {
          transition: transform 0.2s ease;
          display: inline-block;
        }
        .btn-primary:hover .woc-split__cta-arrow { transform: translateX(4px); }

        /* Image with offset shape */
        .woc-split__media { position: relative; }
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
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .woc-split__media:hover .woc-split__img { transform: scale(1.02); }

        .woc-split__shape {
          position: absolute;
          inset: 1.5rem -1.5rem -1.5rem 1.5rem;
          background-color: color-mix(in srgb, var(--color-primary) 10%, transparent);
          border-radius: var(--radius-card);
          z-index: 0;
        }
        .woc-split--reverse .woc-split__shape {
          inset: 1.5rem 1.5rem -1.5rem -1.5rem;
        }

        /* Floating badge chip on the image corner */
        .woc-split__float-badge {
          position: absolute;
          bottom: -1rem;
          left: 1.5rem;
          z-index: 2;
          background: var(--color-primary);
          color: var(--color-primary-foreground);
          font-size: 0.6875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.375rem 0.75rem;
          border-radius: var(--radius-button);
          box-shadow: var(--shadow-elevated);
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .woc-split { grid-template-columns: 1fr; gap: 2.5rem; }
          .woc-split--reverse .woc-split__media { order: 0; }
          .woc-split__shape { display: none; }
          .woc-split__float-badge { display: none; }
        }
      `}</style>
    </section>
  );
}
