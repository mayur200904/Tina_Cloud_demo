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
    return (
        <section className="woc-logo-cloud" aria-label="Logos">
            <div className="woc-container">
                {label && <p className="woc-logo-cloud__label">{label}</p>}
                <ul className="woc-logo-cloud__grid" role="list">
                    {(logos ?? []).map((logo, i) =>
                        logo ? (
                            <li key={i} className="woc-logo-cloud__item">
                                <img
                                    src={logo.imageUrl ?? ''}
                                    alt={logo.name ?? ''}
                                    className="woc-logo-cloud__img"
                                    loading="lazy"
                                />
                            </li>
                        ) : null
                    )}
                </ul>
            </div>
            <style>{`
        .woc-logo-cloud { padding-block: 3.5rem; border-top: 1px solid var(--color-surface-border); border-bottom: 1px solid var(--color-surface-border); background: var(--color-background); }
        .woc-logo-cloud__label { text-align: center; font-size: 0.8125rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-muted); margin-bottom: 2rem; }
        .woc-logo-cloud__grid { display: flex; flex-wrap: wrap; gap: 2.5rem 3.5rem; align-items: center; justify-content: center; list-style: none; padding: 0; }
        .woc-logo-cloud__img { height: 2rem; width: auto; max-width: 9rem; object-fit: contain; filter: grayscale(100%) opacity(0.55); transition: filter 0.2s ease; }
        .woc-logo-cloud__item:hover .woc-logo-cloud__img { filter: grayscale(0%) opacity(1); }
      `}</style>
        </section>
    );
}
