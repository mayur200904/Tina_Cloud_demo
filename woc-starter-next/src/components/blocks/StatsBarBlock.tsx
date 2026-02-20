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
                        {eyebrow && <p className="woc-eyebrow woc-eyebrow--light">{eyebrow}</p>}
                        {heading && <h2 className="woc-stats-bar__heading">{heading}</h2>}
                    </div>
                )}
                <ul className="woc-stats-grid" role="list">
                    {(stats ?? []).map((stat, i) =>
                        stat ? (
                            <li key={i} className="woc-stat">
                                <div className="woc-stat__value">
                                    {stat.prefix && <span className="woc-stat__prefix">{stat.prefix}</span>}
                                    {stat.value}
                                </div>
                                <div className="woc-stat__label">{stat.label}</div>
                            </li>
                        ) : null
                    )}
                </ul>
            </div>
            <style>{`
        .woc-stats-bar { background-color: var(--color-primary); color: var(--color-primary-foreground); padding-block: 4rem; }
        .woc-stats-bar__header { text-align: center; margin-bottom: 2.5rem; }
        .woc-eyebrow--light { color: rgba(255,255,255,0.65); }
        .woc-stats-bar__heading { font-family: var(--font-heading); font-size: clamp(1.75rem, 3vw, 2.25rem); font-weight: 700; color: var(--color-primary-foreground); margin-top: 0.5rem; }
        .woc-stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr)); gap: 2rem; list-style: none; padding: 0; text-align: center; }
        .woc-stat__value { font-family: var(--font-heading); font-size: clamp(2.5rem, 5vw, 3.5rem); font-weight: 700; line-height: 1; color: var(--color-primary-foreground); }
        .woc-stat__prefix { font-size: 0.6em; vertical-align: super; opacity: 0.8; }
        .woc-stat__label { margin-top: 0.5rem; font-size: 0.9375rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.06em; opacity: 0.75; }
        @media (max-width: 600px) { .woc-stats-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
        </section>
    );
}
