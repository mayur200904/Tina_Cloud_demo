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
                <div className="woc-hero__content">
                    {eyebrow && <p className="woc-eyebrow">{eyebrow}</p>}
                    <h1 className="woc-h1 woc-hero__headline">{headline}</h1>
                    {subheadline && <p className="woc-lead woc-hero__sub">{subheadline}</p>}

                    {(primaryCtaLabel || secondaryCtaLabel) && (
                        <div className="woc-hero__ctas">
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

                {/* Image */}
                {imageUrl && !isCentered && (
                    <div className="woc-hero__media">
                        <img
                            src={imageUrl}
                            alt={imageAlt ?? ''}
                            className="woc-hero__img"
                            loading="eager"
                        />
                    </div>
                )}
            </div>

            {imageUrl && layout === 'full-bleed' && (
                <div
                    className="woc-hero__fullbleed-bg"
                    style={{ backgroundImage: `url('${imageUrl}')` }}
                    aria-hidden="true"
                />
            )}

            <style>{`
        .woc-hero {
          position: relative;
          overflow: hidden;
          padding-block: var(--section-padding-y);
        }
        .woc-hero--full-bleed {
          min-height: 90vh;
          display: flex;
          align-items: center;
          color: #fff;
        }
        .woc-hero--full-bleed .woc-h1,
        .woc-hero--full-bleed .woc-lead { color: #fff; }
        .woc-hero__fullbleed-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          z-index: -1;
        }
        .woc-hero--full-bleed::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.2) 100%);
          z-index: -1;
        }
        .woc-hero__inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .woc-hero__inner--centered {
          grid-template-columns: 1fr;
          text-align: center;
          max-width: 52rem;
          margin-inline: auto;
        }
        .woc-hero__inner--reverse .woc-hero__media { order: -1; }
        .woc-hero__headline { margin-block: 1rem; }
        .woc-hero__sub { max-width: 36rem; }
        .woc-hero__inner--centered .woc-hero__sub { margin-inline: auto; }
        .woc-hero__ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 2rem;
        }
        .woc-hero__inner--centered .woc-hero__ctas { justify-content: center; }
        .woc-hero__media {
          border-radius: var(--radius-card);
          overflow: hidden;
          box-shadow: var(--shadow-elevated);
        }
        .woc-hero__img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
          aspect-ratio: 4/3;
        }
        @media (max-width: 768px) {
          .woc-hero__inner {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .woc-hero__inner--reverse .woc-hero__media { order: 0; }
        }
      `}</style>
        </section>
    );
}
