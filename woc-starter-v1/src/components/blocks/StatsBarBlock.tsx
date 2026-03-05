// Server Component — imports CountUp (client) only for the animated stat values
import CountUp from '../CountUp';
import ScrollReveal from '../ScrollReveal';

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
  const items = (stats ?? []).filter(Boolean) as Stat[];

  return (
    <section className="woc-stats-bar" aria-label="Key statistics">
      {/* Large ghost text — decorative background number */}
      <span className="woc-stats-bar__ghost" aria-hidden="true">
        {items[0]?.value ?? ''}
      </span>

      <div className="woc-container woc-stats-bar__inner">
        {(eyebrow || heading) && (
          <ScrollReveal>
            <div className="woc-stats-bar__header">
              {eyebrow && (
                <p className="woc-eyebrow woc-stats-bar__eyebrow">{eyebrow}</p>
              )}
              {heading && (
                <h2 className="woc-stats-bar__heading">{heading}</h2>
              )}
            </div>
          </ScrollReveal>
        )}

        <ul className="woc-stats-grid" role="list">
          {items.map((stat, i) => (
            <ScrollReveal key={i} delay={i * 90}>
              <li className="woc-stat">
                <div className="woc-stat__value-wrap">
                  {stat.prefix && (
                    <span className="woc-stat__prefix">{stat.prefix}</span>
                  )}
                  {/* CountUp handles animating from 0 → value on scroll enter */}
                  <CountUp
                    value={stat.value ?? ''}
                    className="woc-stat__value"
                    duration={1600}
                  />
                </div>
                <div className="woc-stat__label">{stat.label}</div>
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </div>

      <style>{`
        .woc-stats-bar {
          position: relative;
          overflow: hidden;
          background: linear-gradient(
            135deg,
            var(--color-primary),
            color-mix(in srgb, var(--color-primary) 65%, black)
          );
          color: var(--color-primary-foreground);
          padding-block: var(--section-padding-y-lg);
          isolation: isolate;
        }

        /* Giant ghost number — ethereal background texture */
        .woc-stats-bar__ghost {
          position: absolute;
          top: 50%;
          right: -2rem;
          transform: translateY(-50%);
          font-family: var(--font-heading);
          font-size: clamp(8rem, 20vw, 18rem);
          font-weight: 900;
          line-height: 1;
          opacity: 0.05;
          user-select: none;
          pointer-events: none;
          z-index: 0;
          white-space: nowrap;
        }

        .woc-stats-bar__inner { position: relative; z-index: 1; }

        .woc-stats-bar__header { text-align: center; margin-bottom: 4rem; }
        .woc-stats-bar__eyebrow {
          color: rgba(255,255,255,0.55);
          justify-content: center;
          letter-spacing: 0.15em;
        }
        .woc-stats-bar__heading {
          font-family: var(--font-heading);
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          font-weight: 700;
          color: var(--color-primary-foreground);
          margin-top: 0.625rem;
          letter-spacing: -0.02em;
        }

        .woc-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
          list-style: none;
          padding: 0;
          text-align: center;
        }

        .woc-stat {
          padding: 1.5rem 2.5rem;
          position: relative;
          cursor: default;
          transition: transform 0.25s ease;
        }
        .woc-stat:hover { transform: translateY(-4px); }

        /* Vertical dividers between stats */
        .woc-stat + .woc-stat::before {
          content: '';
          position: absolute;
          left: 0;
          top: 20%;
          height: 60%;
          width: 1px;
          background: rgba(255,255,255,0.15);
        }

        .woc-stat__value-wrap {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 0.125rem;
        }
        .woc-stat__prefix {
          font-family: var(--font-heading);
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          font-weight: 600;
          opacity: 0.65;
        }
        .woc-stat__value {
          font-family: var(--font-heading);
          font-size: clamp(3rem, 7vw, 5.5rem);
          font-weight: 700;
          line-height: 1;
          color: var(--color-primary-foreground);
          letter-spacing: -0.03em;
          display: block;
        }
        .woc-stat__label {
          margin-top: 0.75rem;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          opacity: 0.55;
        }

        @media (max-width: 600px) {
          .woc-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .woc-stat + .woc-stat::before { display: none; }
          .woc-stats-bar__ghost { display: none; }
        }
      `}</style>
    </section>
  );
}
