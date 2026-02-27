// Server Component — no 'use client' needed (pure presentational)
interface HeroBlockProps {
  eyebrow?: string | null;
  headline?: string | null;
  subheadline?: string | null;
  primaryCtaLabel?: string | null;
  primaryCtaLink?: string | null;
  secondaryCtaLabel?: string | null;
  secondaryCtaLink?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
  layout?: string | null;
}

export default function HeroBlock({
  eyebrow,
  headline,
  subheadline,
  primaryCtaLabel,
  primaryCtaLink = '#',
  secondaryCtaLabel,
  secondaryCtaLink = '#',
  imageUrl,
  imageAlt = '',
  layout = 'image-right',
}: HeroBlockProps) {
  const isCentered = layout === 'centered' || layout === 'full-bleed';
  const isImageLeft = layout === 'image-left';

  return (
    <section className={`woc-hero woc-hero--${layout}`} aria-label="Hero section">
      <div
        className={[
          'woc-container woc-hero__inner',
          isCentered ? 'woc-hero__inner--centered' : '',
          isImageLeft ? 'woc-hero__inner--reverse' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {/* Text Content */}
        <div className="woc-hero__content woc-reveal">
          {eyebrow && <p className="woc-eyebrow woc-eyebrow--lined woc-reveal">{eyebrow}</p>}
          <h1 className="woc-h1 woc-hero__headline woc-reveal woc-reveal--delay-1">{headline}</h1>
          {subheadline && (
            <p className="woc-lead woc-hero__sub woc-reveal woc-reveal--delay-2">{subheadline}</p>
          )}

          {(primaryCtaLabel || secondaryCtaLabel) && (
            <div className="woc-hero__ctas woc-reveal woc-reveal--delay-3">
              {primaryCtaLabel && (
                <a href={primaryCtaLink ?? '#'} className="btn-primary">
                  {primaryCtaLabel}
                </a>
              )}
              {secondaryCtaLabel && (
                <a href={secondaryCtaLink ?? '#'} className="btn-secondary">
                  {secondaryCtaLabel}
                </a>
              )}
            </div>
          )}
        </div>

        {/* Image — split layouts only */}
        {imageUrl && !isCentered && (
          <div className="woc-hero__media">
            <img
              src={imageUrl}
              alt={imageAlt ?? ''}
              className="woc-hero__img"
              loading="eager"
              decoding="async"
            />
          </div>
        )}
      </div>

      {/* Full-bleed background image */}
      {imageUrl && layout === 'full-bleed' && (
        <div
          className="woc-hero__fullbleed-bg"
          style={{ backgroundImage: `url('${imageUrl}')` }}
          role="img"
          aria-label={imageAlt ?? ''}
        />
      )}

      <style>{`
        /* ---- Base ---- */
        .woc-hero {
          position: relative;
          overflow: hidden;
          padding-block: var(--section-padding-y-lg);
        }

        /* ---- Full-bleed ---- */
        .woc-hero--full-bleed {
          min-height: 100svh;
          display: flex;
          align-items: center;
          color: #fff;
          padding-block: 0;
        }
        .woc-hero--full-bleed .woc-h1,
        .woc-hero--full-bleed .woc-lead,
        .woc-hero--full-bleed .woc-eyebrow { color: rgba(255,255,255,0.92); }
        .woc-hero--full-bleed .woc-eyebrow--lined::before { background-color: rgba(255,255,255,0.6); }
        .woc-hero--full-bleed .btn-secondary {
          border-color: rgba(255,255,255,0.7);
          color: #fff;
        }
        .woc-hero--full-bleed .btn-secondary:hover {
          background-color: rgba(255,255,255,0.15);
          color: #fff;
        }
        .woc-hero__fullbleed-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          z-index: -2;
        }
        /* Two-layer overlay: brand tint from primary + dark base for legibility.
           The primary color tint is very subtle (0.18 opacity) — token-driven. */
        .woc-hero--full-bleed::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            160deg,
            color-mix(in srgb, var(--color-primary) 18%, transparent) 0%,
            rgba(0,0,0,0.55) 60%,
            rgba(0,0,0,0.75) 100%
          );
          z-index: -1;
        }

        /* ---- Split inner grid ---- */
        .woc-hero__inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .woc-hero__inner--centered {
          grid-template-columns: 1fr;
          text-align: center;
          max-width: 48rem;
          margin-inline: auto;
        }
        .woc-hero__inner--centered .woc-eyebrow { justify-content: center; }
        .woc-hero__inner--reverse .woc-hero__media { order: -1; }

        /* ---- Text ---- */
        .woc-hero__headline { margin-block: 1.25rem 0; }
        .woc-hero__sub { max-width: 38rem; margin-top: 1rem; }
        .woc-hero__inner--centered .woc-hero__sub { margin-inline: auto; }
        .woc-hero__ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 0.875rem;
          margin-top: 2.25rem;
        }
        .woc-hero__inner--centered .woc-hero__ctas { justify-content: center; }

        /* ---- Image (split layouts) ---- */
        .woc-hero__media {
          position: relative;
          border-radius: var(--radius-card);
          overflow: visible; /* allow ::after to bleed out */
        }
        /* Decorative offset shape behind the image.
           Uses primary at ~10% opacity — any brand color works. */
        .woc-hero__media::after {
          content: '';
          position: absolute;
          inset: 1rem -1rem -1rem 1rem;
          background-color: color-mix(in srgb, var(--color-primary) 10%, transparent);
          border-radius: var(--radius-card);
          z-index: -1;
        }
        .woc-hero__img {
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
        .woc-hero__media:hover .woc-hero__img {
          transform: scale(1.015);
        }

        /* ---- Responsive ---- */
        @media (max-width: 768px) {
          .woc-hero { padding-block: var(--section-padding-y); }
          .woc-hero__inner {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .woc-hero__inner--reverse .woc-hero__media { order: 0; }
          .woc-hero__media::after { display: none; }
        }
      `}</style>
    </section>
  );
}
