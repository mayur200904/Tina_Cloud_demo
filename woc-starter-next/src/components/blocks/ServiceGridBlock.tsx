// Server Component — uses ScrollReveal (client) for staggered card entrance
import ScrollReveal from '../ScrollReveal';

interface Service {
    title?: string | null;
    description?: string | null;
    icon?: string | null;
}

interface ServiceGridBlockProps {
    eyebrow?: string | null;
    heading?: string | null;
    subheading?: string | null;
    services?: (Service | null)[] | null;
    columns?: number | null;
}

export default function ServiceGridBlock({
    eyebrow,
    heading,
    subheading,
    services = [],
    columns = 3,
}: ServiceGridBlockProps) {
    const cols = columns ?? 3;
    const items = (services ?? []).filter(Boolean) as Service[];

    return (
        <section className="woc-section">
            <div className="woc-container">
                <ScrollReveal>
                    <div className="woc-section-header">
                        {eyebrow && (
                            <p className="woc-eyebrow woc-eyebrow--lined">{eyebrow}</p>
                        )}
                        <h2 className="woc-h2 woc-section-header__heading">{heading}</h2>
                        {subheading && (
                            <p className="woc-lead woc-section-header__sub">{subheading}</p>
                        )}
                    </div>
                </ScrollReveal>

                <ul className={`woc-service-grid woc-service-grid--cols-${cols}`} role="list">
                    {items.map((service, i) => (
                        /* Each card staggered by 80ms — cascade reveal from left to right */
                        <ScrollReveal key={i} delay={i * 80} className="woc-service-grid__reveal-item">
                            <li className="woc-card woc-service-card">
                                {/* Card number — ghost background indexing */}
                                <span className="woc-service-card__number" aria-hidden="true">
                                    {String(i + 1).padStart(2, '0')}
                                </span>

                                {service.icon && (
                                    <div className="woc-service-card__icon-wrap" aria-hidden="true">
                                        <span className="woc-service-card__icon">{service.icon}</span>
                                    </div>
                                )}
                                <h3 className="woc-h3 woc-service-card__title">{service.title}</h3>
                                {service.description && (
                                    <p className="woc-service-card__desc">{service.description}</p>
                                )}

                                {/* Animated accent line at bottom of card */}
                                <span className="woc-service-card__accent" aria-hidden="true" />
                            </li>
                        </ScrollReveal>
                    ))}
                </ul>
            </div>
            <style>{`
        .woc-section-header { max-width: 48rem; margin-bottom: 3.5rem; }
        .woc-section-header__heading { margin-top: 0.75rem; }
        .woc-section-header__sub { margin-top: 0.875rem; }

        /* Grid — the reveal wrapper is a grid item */
        .woc-service-grid { display: grid; gap: 1.5rem; list-style: none; padding: 0; }
        .woc-service-grid--cols-2 { grid-template-columns: repeat(2, 1fr); }
        .woc-service-grid--cols-3 { grid-template-columns: repeat(3, 1fr); }
        .woc-service-grid--cols-4 { grid-template-columns: repeat(4, 1fr); }
        /* Ensure the ScrollReveal wrapper fills the grid cell */
        .woc-service-grid__reveal-item { display: flex; flex-direction: column; }
        .woc-service-grid__reveal-item .woc-service-card { flex: 1; }

        /* Card */
        .woc-service-card {
          position: relative;
          overflow: hidden;
          border-left: 3px solid transparent;
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
          padding-bottom: 2rem;
        }
        .woc-service-card:hover {
          border-left-color: var(--color-primary);
          transform: translateY(-6px);
          box-shadow: var(--shadow-elevated);
        }

        /* Ghost card number — typographic background texture */
        .woc-service-card__number {
          position: absolute;
          top: -0.5rem;
          right: 1rem;
          font-family: var(--font-heading);
          font-size: 5rem;
          font-weight: 900;
          line-height: 1;
          color: var(--color-primary);
          opacity: 0.06;
          user-select: none;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .woc-service-card:hover .woc-service-card__number { opacity: 0.12; }

        /* Icon container */
        .woc-service-card__icon-wrap {
          width: 3rem;
          height: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: color-mix(in srgb, var(--color-primary) 10%, transparent);
          border-radius: var(--radius-global);
          margin-bottom: 1.25rem;
          transition: background-color 0.3s ease, transform 0.3s ease;
        }
        .woc-service-card:hover .woc-service-card__icon-wrap {
          background-color: color-mix(in srgb, var(--color-primary) 18%, transparent);
          transform: scale(1.08);
        }
        .woc-service-card__icon { font-size: 1.5rem; line-height: 1; }

        .woc-service-card__title { margin-bottom: 0.75rem; }
        .woc-service-card__desc {
          font-size: 0.9375rem;
          line-height: 1.7;
          color: var(--color-muted);
        }

        /* Animated accent bottom line — grows from left on hover */
        .woc-service-card__accent {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          width: 0;
          background: var(--color-primary);
          transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .woc-service-card:hover .woc-service-card__accent { width: 100%; }

        @media (max-width: 900px) {
          .woc-service-grid--cols-4 { grid-template-columns: repeat(2, 1fr); }
          .woc-service-grid--cols-3 { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .woc-service-grid--cols-4,
          .woc-service-grid--cols-3,
          .woc-service-grid--cols-2 { grid-template-columns: 1fr; }
        }
      `}</style>
        </section>
    );
}
