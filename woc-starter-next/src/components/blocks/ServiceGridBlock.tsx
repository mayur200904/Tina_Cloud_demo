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
                    {eyebrow && <p className="woc-eyebrow">{eyebrow}</p>}
                    <h2 className="woc-h2">{heading}</h2>
                    {subheading && <p className="woc-lead" style={{ marginTop: '0.75rem' }}>{subheading}</p>}
                </div>

                <ul className={`woc-service-grid woc-service-grid--cols-${cols}`} role="list">
                    {(services ?? []).map((service, i) =>
                        service ? (
                            <li key={i} className="woc-card woc-service-card">
                                {service.icon && (
                                    <div className="woc-service-card__icon" aria-hidden="true">
                                        {service.icon}
                                    </div>
                                )}
                                <div className="woc-divider" />
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
        .woc-section-header { max-width: 40rem; margin-bottom: 3rem; }
        .woc-section-header .woc-h2 { margin-top: 0.5rem; }
        .woc-service-grid { display: grid; gap: 1.5rem; list-style: none; padding: 0; }
        .woc-service-grid--cols-2 { grid-template-columns: repeat(2, 1fr); }
        .woc-service-grid--cols-3 { grid-template-columns: repeat(3, 1fr); }
        .woc-service-grid--cols-4 { grid-template-columns: repeat(4, 1fr); }
        .woc-service-card__icon { font-size: 2rem; line-height: 1; margin-bottom: 1rem; }
        .woc-service-card__title { margin-top: 0.75rem; }
        .woc-service-card__desc { margin-top: 0.75rem; font-size: 0.9375rem; line-height: 1.6; color: var(--color-muted); }
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
