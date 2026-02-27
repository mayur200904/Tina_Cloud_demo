// Server Component — pure presentational
interface Stat {
    value?: string | null;
    label?: string | null;
    prefix?: string | null;
}

interface StatsBarBlockProps {
    eyebrow?: string | null;
    heading?: string | null;
    stats?: (Stat | null)[] | null;
}

export default function StatsBarBlock({
    eyebrow,
    heading,
    stats = [],
}: StatsBarBlockProps) {
    return (
        <section className="woc-stats-bar" aria-label="Key statistics">
            <div className="woc-container">
                {(eyebrow || heading) && (
                    <div className="woc-stats-bar__header">
                        {eyebrow && <p className="woc-eyebrow woc-stats-bar__eyebrow">{eyebrow}</p>}
                        {heading && <h2 className="woc-stats-bar__heading">{heading}</h2>}
                    </div>
                )}
                <ul className="woc-stats-grid" role="list">
                    {(stats ?? []).map((stat, i) =>
                        stat ? (
                            <li key={i} className="woc-stat">
                                <div className="woc-stat__value">
                                    {stat.prefix && (
                                        <span className="woc-stat__prefix">{stat.prefix}</span>
                                    )}
                                    {stat.value}
                                </div>
                                <div className="woc-stat__label">{stat.label}</div>
                            </li>
                        ) : null
                    )}
                </ul>
            </div>
            <style>{`
        /* Gradient background: depth without flat color.
           color-mix shifts primary darker — fully token-driven. */
        .woc-stats-bar {
          background: linear-gradient(
            135deg,
            var(--color-primary),
            color-mix(in srgb, var(--color-primary) 70%, black)
          );
          color: var(--color-primary-foreground);
          padding-block: var(--section-padding-y);
        }
        .woc-stats-bar__header { text-align: center; margin-bottom: 3rem; }
        .woc-stats-bar__eyebrow {
          color: rgba(255,255,255,0.6);
          justify-content: center;
        }
        .woc-stats-bar__eyebrow.woc-eyebrow--lined::before {
          background-color: rgba(255,255,255,0.4);
        }
        .woc-stats-bar__heading {
          font-family: var(--font-heading);
          font-size: clamp(1.75rem, 3vw, 2.25rem);
          font-weight: 700;
          color: var(--color-primary-foreground);
          margin-top: 0.5rem;
        }

        .woc-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
          gap: 0;
          list-style: none;
          padding: 0;
          text-align: center;
        }

        /* Vertical separators between stats on desktop */
        .woc-stat {
          padding-inline: 2rem;
          padding-block: 1rem;
          position: relative;
        }
        .woc-stat + .woc-stat::before {
          content: '';
          position: absolute;
          left: 0;
          top: 15%;
          height: 70%;
          width: 1px;
          background-color: rgba(255,255,255,0.2);
        }

        .woc-stat__value {
          font-family: var(--font-heading);
          font-size: clamp(3rem, 6vw, 5rem);
          font-weight: 700;
          line-height: 1;
          color: var(--color-primary-foreground);
        }
        .woc-stat__prefix {
          font-size: 0.55em;
          vertical-align: super;
          opacity: 0.75;
        }
        .woc-stat__label {
          margin-top: 0.625rem;
          font-size: 0.8125rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          opacity: 0.65;
        }

        @media (max-width: 600px) {
          .woc-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .woc-stat + .woc-stat::before { display: none; }
        }
      `}</style>
        </section>
    );
}
