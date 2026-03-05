// Server Component — uses ScrollReveal for staggered card reveals
import ScrollReveal from '../ScrollReveal';

interface TeamMember {
    name?: string | null;
    role?: string | null;
    bio?: string | null;
    imageUrl?: string | null;
    imageAlt?: string | null;
}

interface TeamBlockProps {
    eyebrow?: string | null;
    heading?: string | null;
    columns?: number | null; // 2 | 3 | 4
    members?: (TeamMember | null)[] | null;
}

export default function TeamBlock({
    eyebrow,
    heading,
    columns = 3,
    members = [],
}: TeamBlockProps) {
    const cols = columns ?? 3;
    const items = (members ?? []).filter(Boolean) as TeamMember[];

    return (
        <section className="woc-section">
            <div className="woc-container">
                <ScrollReveal>
                    <div className="woc-section-header">
                        {eyebrow && (
                            <p className="woc-eyebrow woc-eyebrow--lined">{eyebrow}</p>
                        )}
                        <h2 className="woc-h2 woc-team-heading">{heading}</h2>
                    </div>
                </ScrollReveal>

                <ul className={`woc-team-grid woc-team-grid--cols-${cols}`} role="list">
                    {items.map((member, i) => (
                        <ScrollReveal key={i} delay={i * 80} className="woc-team__reveal">
                            <li className="woc-team-card">
                                <div className="woc-team-card__photo-wrap">
                                    {member.imageUrl ? (
                                        <img
                                            src={member.imageUrl}
                                            alt={member.imageAlt ?? member.name ?? ''}
                                            className="woc-team-card__photo"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    ) : (
                                        /* Placeholder monogram if no photo */
                                        <div className="woc-team-card__monogram" aria-hidden="true">
                                            {(member.name ?? '?').charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    {/* Primary color ring on hover */}
                                    <span className="woc-team-card__ring" aria-hidden="true" />
                                </div>

                                <div className="woc-team-card__info">
                                    <h3 className="woc-h3 woc-team-card__name">{member.name}</h3>
                                    {member.role && (
                                        <p className="woc-team-card__role">{member.role}</p>
                                    )}
                                    {member.bio && (
                                        <p className="woc-team-card__bio">{member.bio}</p>
                                    )}
                                </div>
                            </li>
                        </ScrollReveal>
                    ))}
                </ul>
            </div>
            <style>{`
        .woc-team-heading { margin-top: 0.75rem; }

        /* Grid */
        .woc-team-grid {
          display: grid;
          gap: 2rem;
          list-style: none;
          padding: 0;
          margin-top: 3.5rem;
        }
        .woc-team-grid--cols-2 { grid-template-columns: repeat(2, 1fr); }
        .woc-team-grid--cols-3 { grid-template-columns: repeat(3, 1fr); }
        .woc-team-grid--cols-4 { grid-template-columns: repeat(4, 1fr); }
        .woc-team__reveal { display: flex; flex-direction: column; }

        /* Card */
        .woc-team-card {
          display: flex;
          flex-direction: column;
          background: var(--color-surface);
          border-radius: var(--radius-card);
          border: 1px solid var(--color-surface-border);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .woc-team-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-elevated);
        }

        /* Photo area */
        .woc-team-card__photo-wrap {
          position: relative;
          aspect-ratio: 4/3;
          overflow: hidden;
          background-color: color-mix(in srgb, var(--color-primary) 8%, transparent);
        }

        .woc-team-card__photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .woc-team-card:hover .woc-team-card__photo { transform: scale(1.04); }

        /* Monogram placeholder */
        .woc-team-card__monogram {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-heading);
          font-size: 4rem;
          font-weight: 800;
          color: var(--color-primary);
          opacity: 0.35;
        }

        /* Primary-color border ring that grows on hover */
        .woc-team-card__ring {
          position: absolute;
          inset: 0;
          border: 3px solid var(--color-primary);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .woc-team-card:hover .woc-team-card__ring { opacity: 1; }

        /* Text info */
        .woc-team-card__info {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .woc-team-card__name {
          font-size: 1.125rem;
          margin-bottom: 0.25rem;
          color: var(--color-foreground);
        }

        .woc-team-card__role {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--color-primary);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 0.75rem;
        }

        .woc-team-card__bio {
          font-size: 0.9rem;
          line-height: 1.7;
          color: var(--color-muted);
          margin-top: auto;
          padding-top: 0.75rem;
          border-top: 1px solid var(--color-surface-border);
        }

        /* Responsive */
        @media (max-width: 900px) {
          .woc-team-grid--cols-4 { grid-template-columns: repeat(2, 1fr); }
          .woc-team-grid--cols-3 { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .woc-team-grid--cols-4,
          .woc-team-grid--cols-3,
          .woc-team-grid--cols-2 { grid-template-columns: 1fr; }
        }
      `}</style>
        </section>
    );
}
