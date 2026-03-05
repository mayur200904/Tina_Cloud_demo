// Server Component — uses ScrollReveal for staggered step reveals
import ScrollReveal from '../ScrollReveal';

interface Step {
    number?: string | null;
    title?: string | null;
    description?: string | null;
    icon?: string | null;
}

interface ProcessBlockProps {
    eyebrow?: string | null;
    heading?: string | null;
    subheading?: string | null;
    variant?: string | null; // "steps" | "timeline"
    steps?: (Step | null)[] | null;
}

export default function ProcessBlock({
    eyebrow,
    heading,
    subheading,
    variant = 'steps',
    steps = [],
}: ProcessBlockProps) {
    const items = (steps ?? []).filter(Boolean) as Step[];
    const isTimeline = variant === 'timeline';

    return (
        <section className="woc-section">
            <div className="woc-container">
                <ScrollReveal>
                    <div className="woc-section-header">
                        {eyebrow && (
                            <p className="woc-eyebrow woc-eyebrow--lined">{eyebrow}</p>
                        )}
                        <h2 className="woc-h2 woc-process-heading">{heading}</h2>
                        {subheading && (
                            <p className="woc-lead woc-process-subheading">{subheading}</p>
                        )}
                    </div>
                </ScrollReveal>

                <div className={`woc-process woc-process--${variant ?? 'steps'}`}>
                    {items.map((step, i) => (
                        <ScrollReveal key={i} delay={i * 100} className="woc-process__reveal">
                            <div className="woc-process__step">
                                {/* Number circle with connecting line for timeline */}
                                <div className="woc-process__step-marker">
                                    <div className="woc-process__step-circle">
                                        {step.icon ? (
                                            <span className="woc-process__step-icon">{step.icon}</span>
                                        ) : (
                                            <span className="woc-process__step-num">
                                                {step.number || String(i + 1).padStart(2, '0')}
                                            </span>
                                        )}
                                    </div>
                                    {/* Connector line — timeline only, not last item */}
                                    {isTimeline && i < items.length - 1 && (
                                        <div className="woc-process__connector" aria-hidden="true" />
                                    )}
                                </div>

                                <div className="woc-process__step-content">
                                    <h3 className="woc-h3 woc-process__step-title">{step.title}</h3>
                                    {step.description && (
                                        <p className="woc-process__step-desc">{step.description}</p>
                                    )}
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
            <style>{`
        .woc-process-heading { margin-top: 0.75rem; }
        .woc-process-subheading { margin-top: 0.875rem; }

        /* ---- Steps variant (horizontal grid) ---- */
        .woc-process--steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
          gap: 2rem;
          margin-top: 3.5rem;
          position: relative;
        }

        /* Horizontal connector between steps — pseudo on wrapper */
        .woc-process--steps::before {
          content: '';
          position: absolute;
          top: 2rem;  /* vertically centered on circle */
          left: calc(2rem + 1px);
          right: calc(2rem + 1px);
          height: 2px;
          background: linear-gradient(
            to right,
            var(--color-primary) 0%,
            color-mix(in srgb, var(--color-primary) 30%, transparent) 100%
          );
          z-index: 0;
          pointer-events: none;
        }

        .woc-process--steps .woc-process__step {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.25rem;
          position: relative;
          z-index: 1;
        }

        .woc-process--steps .woc-process__step-marker {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .woc-process--steps .woc-process__step-content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ---- Timeline variant (vertical with line) ---- */
        .woc-process--timeline {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-top: 3.5rem;
          max-width: 44rem;
        }

        .woc-process--timeline .woc-process__step {
          display: grid;
          grid-template-columns: 4rem 1fr;
          gap: 1.5rem;
          align-items: flex-start;
        }

        .woc-process--timeline .woc-process__step-marker {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        .woc-process--timeline .woc-process__step-content {
          padding-bottom: 2.5rem;
        }

        /* ---- Shared: circle ---- */
        .woc-process__step-circle {
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
          background-color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-primary) 18%, transparent);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          z-index: 1;
        }

        .woc-process__step:hover .woc-process__step-circle {
          transform: scale(1.08);
          box-shadow: 0 0 0 6px color-mix(in srgb, var(--color-primary) 25%, transparent);
        }

        .woc-process__step-num {
          font-family: var(--font-heading);
          font-size: 1.125rem;
          font-weight: 800;
          color: #fff;
          line-height: 1;
        }

        .woc-process__step-icon {
          font-size: 1.5rem;
          line-height: 1;
        }

        /* ---- Connector line (timeline) ---- */
        .woc-process__connector {
          width: 2px;
          flex: 1;
          min-height: 2.5rem;
          background: linear-gradient(
            to bottom,
            var(--color-primary),
            color-mix(in srgb, var(--color-primary) 20%, transparent)
          );
          margin-top: 0;
        }

        /* ---- Step content ---- */
        .woc-process__step-title {
          margin-bottom: 0.625rem;
          color: var(--color-foreground);
        }

        .woc-process__step-desc {
          font-size: 0.9375rem;
          line-height: 1.7;
          color: var(--color-muted);
        }

        /* ---- Responsive ---- */
        @media (max-width: 768px) {
          .woc-process--steps {
            grid-template-columns: 1fr;
          }
          .woc-process--steps::before { display: none; }
          .woc-process--steps .woc-process__step {
            flex-direction: row;
            text-align: left;
            align-items: flex-start;
          }
          .woc-process--steps .woc-process__step-content {
            align-items: flex-start;
          }
        }
      `}</style>
        </section>
    );
}
