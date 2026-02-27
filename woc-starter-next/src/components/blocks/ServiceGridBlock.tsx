// Server Component — pure presentational
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
    return (
        <section className="woc-section woc-section--surface">
            <div className="woc-container">
                <div className="woc-section-header">
                    {eyebrow && <p className="woc-eyebrow woc-eyebrow--lined">{eyebrow}</p>}
                    <h2 className="woc-h2 woc-section-header__heading">{heading}</h2>
                    {subheading && (
                        <p className="woc-lead woc-section-header__sub">{subheading}</p>
                    )}
                </div>

                <ul className={`woc-service-grid woc-service-grid--cols-${cols}`} role="list">
                    {(services ?? []).map((service, i) =>
                        service ? (
                            <li key={i} className="woc-card woc-service-card">
                                {service.icon && (
                                    <div className="woc-service-card__icon-wrap" aria-hidden="true">
                                        <span className="woc-service-card__icon">{service.icon}</span>
                                    </div>
                                )}
                                <h3 className="woc-h3 woc-service-card__title">{service.title}</h3>
                                {service.description && (
                                    <p className="woc-service-card__desc">{service.description}</p>
                                )}
                            </li>
                        ) : null
                    )}
                </ul>
            </div>
            <style>{`
        .woc-section-header { max-width: 48rem; margin-bottom: 3.5rem; }
        .woc-section-header__heading { margin-top: 0.75rem; }
        .woc-section-header__sub { margin-top: 0.875rem; }
        .woc-service-grid { display: grid; gap: 1.5rem; list-style: none; padding: 0; }
        .woc-service-grid--cols-2 { grid-template-columns: repeat(2, 1fr); }
        .woc-service-grid--cols-3 { grid-template-columns: repeat(3, 1fr); }
        .woc-service-grid--cols-4 { grid-template-columns: repeat(4, 1fr); }

        /* Icon container: circle/square with brand tint.
           Shape (circle vs. square) follows --radius-global token. */
        .woc-service-card__icon-wrap {
          width: 3rem;
          height: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: color-mix(in srgb, var(--color-primary) 10%, transparent);
          border-radius: var(--radius-global);
          margin-bottom: 1.25rem;
          flex-shrink: 0;
        }
        .woc-service-card__icon { font-size: 1.5rem; line-height: 1; }

        .woc-service-card { 
          position: relative;
          overflow: hidden;
          border-left: 3px solid transparent;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
        }
        .woc-service-card:hover {
          border-left-color: var(--color-primary);
          transform: translateY(-6px);
          box-shadow: var(--shadow-elevated);
        }
        .woc-service-card__title { margin-bottom: 0.75rem; }
        .woc-service-card__desc { font-size: 0.9375rem; line-height: 1.65; color: var(--color-muted); }

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
