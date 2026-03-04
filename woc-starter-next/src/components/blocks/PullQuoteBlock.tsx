// Server Component — editorial typographic statement / manifesto moment
import ScrollReveal from '../ScrollReveal';

interface PullQuoteBlockProps {
    quote?: string | null;
    attribution?: string | null;
    dark?: boolean | null; // dark background variant
    size?: string | null; // "normal" | "large"
}

export default function PullQuoteBlock({
    quote,
    attribution,
    dark = false,
    size = 'normal',
}: PullQuoteBlockProps) {
    if (!quote) return null;

    const isDark = dark === true;
    const isLarge = size === 'large';

    return (
        <section className={`woc-pullquote ${isDark ? 'woc-pullquote--dark' : ''} ${isLarge ? 'woc-pullquote--large' : ''}`}>
            {/* Decorative oversized quotation mark — behind the text */}
            <span className="woc-pullquote__decor" aria-hidden="true">&ldquo;</span>

            <div className="woc-container woc-pullquote__inner">
                <ScrollReveal>
                    <blockquote className="woc-pullquote__quote">
                        {quote}
                    </blockquote>
                    {attribution && (
                        <cite className="woc-pullquote__attribution">
                            &mdash; {attribution}
                        </cite>
                    )}
                </ScrollReveal>
            </div>

            <style>{`
        .woc-pullquote {
          position: relative;
          overflow: hidden;
          padding-block: var(--section-padding-y-lg);
          background-color: var(--color-background);
        }

        /* Dark variant */
        .woc-pullquote--dark {
          background-color: var(--color-dark);
        }

        /* Oversized decorative quote mark — purely atmospheric */
        .woc-pullquote__decor {
          position: absolute;
          top: -0.5rem;
          left: 2rem;
          font-family: var(--font-heading);
          font-size: clamp(10rem, 20vw, 18rem);
          font-weight: 900;
          line-height: 1;
          color: var(--color-primary);
          opacity: 0.07;
          user-select: none;
          pointer-events: none;
          display: block;
        }
        .woc-pullquote--dark .woc-pullquote__decor {
          opacity: 0.1;
        }

        /* Inner — centered layout */
        .woc-pullquote__inner {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        /* Quote text */
        .woc-pullquote__quote {
          font-family: var(--font-heading);
          font-size: clamp(1.5rem, 3.5vw, 2.5rem);
          font-weight: 700;
          line-height: 1.3;
          color: var(--color-foreground);
          max-width: 52rem;
          font-style: normal;
        }
        .woc-pullquote--dark .woc-pullquote__quote {
          color: var(--color-dark-foreground, #f5f5f0);
        }

        /* Large size modifier */
        .woc-pullquote--large .woc-pullquote__quote {
          font-size: clamp(2rem, 5vw, 3.5rem);
          max-width: 60rem;
        }

        /* Accent bar above quote */
        .woc-pullquote__quote::before {
          content: '';
          display: block;
          width: 3rem;
          height: 3px;
          background: var(--color-primary);
          margin: 0 auto 1.75rem;
        }

        /* Attribution */
        .woc-pullquote__attribution {
          display: block;
          margin-top: 1.75rem;
          font-size: 0.9375rem;
          font-style: normal;
          font-weight: 600;
          color: var(--color-muted);
          letter-spacing: 0.04em;
        }
        .woc-pullquote--dark .woc-pullquote__attribution {
          color: color-mix(in srgb, var(--color-dark-foreground, #f5f5f0) 55%, transparent);
        }

        @media (max-width: 768px) {
          .woc-pullquote { padding-block: var(--section-padding-y); }
          .woc-pullquote__decor { font-size: 8rem; }
        }
      `}</style>
        </section>
    );
}
