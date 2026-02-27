// Server Component — pure presentational
interface Logo {
    name?: string | null;
    imageUrl?: string | null;
}

interface LogoCloudBlockProps {
    label?: string | null;
    logos?: (Logo | null)[] | null;
}

export default function LogoCloudBlock({
    label = 'Trusted by',
    logos = [],
}: LogoCloudBlockProps) {
    const items = (logos ?? []).filter(Boolean) as Logo[];
    // Duplicate items so the infinite marquee loops seamlessly
    const doubled = [...items, ...items];

    return (
        <section className="woc-logo-cloud" aria-label="Logos">
            {label && <p className="woc-eyebrow woc-logo-cloud__label">{label}</p>}

            {items.length > 0 ? (
                <div className="woc-logo-cloud__track-wrap" aria-hidden="true">
                    <ul className="woc-logo-cloud__track" role="list">
                        {doubled.map((logo, i) => (
                            <li key={i} className="woc-logo-cloud__item">
                                <img
                                    src={logo.imageUrl ?? ''}
                                    alt={logo.name ?? ''}
                                    className="woc-logo-cloud__img"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}

            <style>{`
        @keyframes woc-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .woc-logo-cloud {
          padding-block: var(--section-padding-y-sm);
          border-top: 1px solid var(--color-surface-border);
          border-bottom: 1px solid var(--color-surface-border);
          background: var(--color-background);
          overflow: hidden;
        }
        .woc-logo-cloud__label {
          text-align: center;
          color: var(--color-muted);
          margin-bottom: 1.75rem;
          justify-content: center;
        }

        /* Marquee track */
        .woc-logo-cloud__track-wrap {
          overflow: hidden;
          /* Fade edges with a gradient mask */
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }
        .woc-logo-cloud__track {
          display: flex;
          align-items: center;
          gap: 4rem;
          list-style: none;
          padding: 0;
          width: max-content;
          animation: woc-marquee 28s linear infinite;
        }
        .woc-logo-cloud__track:hover {
          animation-play-state: paused;
        }

        /* Grayscale at rest, full color on hover.
           Adjust opacity via --color-muted feel without hardcoding. */
        .woc-logo-cloud__img {
          height: 2rem;
          width: auto;
          max-width: 9rem;
          object-fit: contain;
          filter: grayscale(100%) opacity(0.5);
          transition: filter 0.3s ease;
        }
        .woc-logo-cloud__item:hover .woc-logo-cloud__img {
          filter: grayscale(0%) opacity(1);
        }

        @media (prefers-reduced-motion: reduce) {
          .woc-logo-cloud__track { animation: none; }
        }
      `}</style>
        </section>
    );
}
