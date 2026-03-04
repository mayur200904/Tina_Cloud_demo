// Server Component — full-bleed atmospheric image with optional overlay text
// Used as visual punctuation between dense content sections
interface FullWidthImageBlockProps {
    imageUrl?: string | null;
    imageAlt?: string | null;
    overlayText?: string | null;
    overlayPosition?: string | null; // "center" | "left" | "bottom-left"
    height?: string | null; // "short" | "medium" | "tall"
}

export default function FullWidthImageBlock({
    imageUrl,
    imageAlt = '',
    overlayText,
    overlayPosition = 'center',
    height = 'medium',
}: FullWidthImageBlockProps) {
    if (!imageUrl) return null;

    const pos = overlayPosition ?? 'center';
    const h = height ?? 'medium';

    return (
        <div className={`woc-full-img woc-full-img--${h}`}>
            <img
                src={imageUrl}
                alt={imageAlt ?? ''}
                className="woc-full-img__img"
                loading="lazy"
                decoding="async"
            />

            {/* Gradient overlay — protects legibility and adds atmosphere */}
            <div className="woc-full-img__overlay" aria-hidden="true" />

            {overlayText && (
                <div className={`woc-full-img__text woc-full-img__text--${pos}`}>
                    <p className="woc-full-img__quote">{overlayText}</p>
                </div>
            )}

            <style>{`
        .woc-full-img {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        /* Height variants */
        .woc-full-img--short  { min-height: 28vh; }
        .woc-full-img--medium { min-height: 50vh; }
        .woc-full-img--tall   { min-height: 75vh; }

        /* Image fills container */
        .woc-full-img__img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 8s ease;
        }
        .woc-full-img:hover .woc-full-img__img { transform: scale(1.03); }

        /* Atmospheric gradient overlay */
        .woc-full-img__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            160deg,
            color-mix(in srgb, var(--color-primary) 15%, transparent) 0%,
            rgba(0,0,0,0.45) 100%
          );
        }

        /* Overlay text positioning */
        .woc-full-img__text {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          min-height: inherit;
        }

        .woc-full-img__text--center {
          text-align: center;
          justify-content: center;
        }
        .woc-full-img__text--left {
          justify-content: flex-start;
          text-align: left;
          padding-left: clamp(1.5rem, 8vw, 6rem);
        }
        .woc-full-img__text--bottom-left {
          justify-content: flex-start;
          align-items: flex-end;
          text-align: left;
          padding-left: clamp(1.5rem, 8vw, 6rem);
          padding-bottom: 3rem;
        }

        .woc-full-img__quote {
          font-family: var(--font-heading);
          font-size: clamp(1.5rem, 4vw, 2.75rem);
          font-weight: 700;
          line-height: 1.25;
          color: #fff;
          max-width: 42rem;
          text-shadow: 0 2px 24px rgba(0,0,0,0.4);
        }

        @media (max-width: 768px) {
          .woc-full-img--tall   { min-height: 55vh; }
          .woc-full-img--medium { min-height: 38vh; }
          .woc-full-img--short  { min-height: 22vh; }
          .woc-full-img__quote  { font-size: 1.375rem; }
        }
      `}</style>
        </div>
    );
}
