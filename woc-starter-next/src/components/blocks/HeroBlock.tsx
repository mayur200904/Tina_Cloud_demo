'use client';

import { useEffect, useRef, useState } from 'react';

interface HeroBlockProps {
  eyebrow?: string | null;
  headline?: string | null;
  subheadline?: string | null;
  primaryCtaLabel?: string | null;
  primaryCtaLink?: string | null;
  secondaryCtaLabel?: string | null;
  secondaryCtaLink?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
  layout?: string | null;
}

/**
 * HeroBlock — needs 'use client' for:
 * 1. Parallax scroll effect on full-bleed background
 * 2. Scroll-driven overlay intensity
 */
export default function HeroBlock({
  eyebrow,
  headline,
  subheadline,
  primaryCtaLabel,
  primaryCtaLink = '/contact',
  secondaryCtaLabel,
  secondaryCtaLink = '/services',
  imageUrl,
  imageAlt = '',
  layout = 'image-right',
}: HeroBlockProps) {
  const bgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isFullBleed = layout === 'full-bleed';
  const isCentered = layout === 'centered';
  const isImageLeft = layout === 'image-left';
  const isTypeOnly = layout === 'type-only';

  // Parallax: shift background up as user scrolls through the hero
  useEffect(() => {
    if (!isFullBleed || !bgRef.current || !sectionRef.current) return;
    const bg = bgRef.current;
    const section = sectionRef.current;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const progress = -rect.top / (rect.height + globalThis.innerHeight);
      bg.style.transform = `translateY(${progress * 20}%)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isFullBleed]);

  // Type-only variant: no image, dark background, massive typography
  if (isTypeOnly) {
    return (
      <section className="woc-hero woc-hero--type-only" aria-label="Hero section">
        {/* Subtle CSS texture — geometric gradient pattern */}
        <div className="woc-hero__type-texture" aria-hidden="true" />

        {/* Ghost letter — oversized background typographic element */}
        {headline && (
          <span className="woc-hero__type-ghost" aria-hidden="true">
            {headline.charAt(0)}
          </span>
        )}

        <div className="woc-container woc-hero__inner woc-hero__inner--centered">
          <div className="woc-hero__content">
            {eyebrow && (
              <p className="woc-eyebrow woc-eyebrow--lined woc-hero__eyebrow">
                {eyebrow}
              </p>
            )}
            <h1 className="woc-h1 woc-hero__headline woc-hero__headline--type">
              {headline}
            </h1>
            {subheadline && (
              <p className="woc-lead woc-hero__sub">{subheadline}</p>
            )}
            {(primaryCtaLabel || secondaryCtaLabel) && (
              <div className="woc-hero__ctas">
                {primaryCtaLabel && (
                  <a href={primaryCtaLink ?? '/contact'} className="btn-primary">
                    {primaryCtaLabel}
                    <span className="woc-hero__cta-arrow" aria-hidden="true">→</span>
                  </a>
                )}
                {secondaryCtaLabel && (
                  <a href={secondaryCtaLink ?? '#'} className="btn-secondary">
                    {secondaryCtaLabel}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <style>{`
          .woc-hero--type-only {
            min-height: 100svh;
            display: flex;
            align-items: center;
            background-color: var(--color-dark);
            color: var(--color-dark-foreground, #f5f5f0);
            padding-block: 0;
            position: relative;
            overflow: hidden;
          }
          /* Geometric gradient texture */
          .woc-hero__type-texture {
            position: absolute;
            inset: 0;
            background:
              radial-gradient(ellipse 80% 60% at 70% 50%, color-mix(in srgb, var(--color-primary) 12%, transparent), transparent),
              radial-gradient(ellipse 40% 40% at 10% 80%, color-mix(in srgb, var(--color-primary) 6%, transparent), transparent);
            z-index: 0;
            pointer-events: none;
          }
          /* Ghost first letter — purely atmospheric */
          .woc-hero__type-ghost {
            position: absolute;
            right: -0.1em;
            top: 50%;
            transform: translateY(-50%);
            font-family: var(--font-heading);
            font-size: clamp(18rem, 35vw, 32rem);
            font-weight: 900;
            line-height: 0.85;
            color: var(--color-primary);
            opacity: 0.04;
            user-select: none;
            pointer-events: none;
            z-index: 0;
          }
          .woc-hero--type-only .woc-hero__inner { position: relative; z-index: 1; }
          .woc-hero--type-only .woc-h1,
          .woc-hero--type-only .woc-lead,
          .woc-hero--type-only .woc-eyebrow { color: var(--color-dark-foreground, #f5f5f0); }
          .woc-hero--type-only .woc-eyebrow--lined::before { background-color: var(--color-primary); }
          .woc-hero--type-only .btn-secondary {
            border-color: rgba(255,255,255,0.35);
            color: var(--color-dark-foreground, #f5f5f0);
          }
          .woc-hero--type-only .btn-secondary:hover {
            background-color: rgba(255,255,255,0.08);
          }
          /* Break headline across 2 lines intentionally */
          .woc-hero__headline--type {
            font-size: clamp(2.5rem, 7vw, 5.5rem);
            line-height: 1.1;
            max-width: 14ch;
          }
          @media (max-width: 768px) {
            .woc-hero__type-ghost { display: none; }
            .woc-hero__headline--type { font-size: clamp(2rem, 10vw, 3.5rem); }
          }
        `}</style>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className={`woc-hero woc-hero--${layout}`}
      aria-label="Hero section"
    >
      <div
        className={[
          'woc-container woc-hero__inner',
          isCentered || isFullBleed ? 'woc-hero__inner--centered' : '',
          isImageLeft ? 'woc-hero__inner--reverse' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {/* Text Content — staggered reveal on mount */}
        <div className="woc-hero__content">
          {eyebrow && (
            <p className="woc-eyebrow woc-eyebrow--lined woc-hero__eyebrow">
              {eyebrow}
            </p>
          )}
          <h1 className="woc-h1 woc-hero__headline">{headline}</h1>
          {subheadline && (
            <p className="woc-lead woc-hero__sub">{subheadline}</p>
          )}

          {(primaryCtaLabel || secondaryCtaLabel) && (
            <div className="woc-hero__ctas">
              {primaryCtaLabel && (
                <a href={primaryCtaLink ?? '/contact'} className="btn-primary">
                  {primaryCtaLabel}
                  <span className="woc-hero__cta-arrow" aria-hidden="true">→</span>
                </a>
              )}
              {secondaryCtaLabel && (
                <a href={secondaryCtaLink ?? '#'} className="btn-secondary">
                  {secondaryCtaLabel}
                </a>
              )}
            </div>
          )}
        </div>

        {/* Image — split layouts only */}
        {imageUrl && !isCentered && !isFullBleed && (
          <div className="woc-hero__media">
            <img
              src={imageUrl}
              alt={imageAlt ?? ''}
              className="woc-hero__img"
              loading="eager"
              decoding="async"
            />
            {/* Decorative offset shape behind image */}
            <span className="woc-hero__media-shape" aria-hidden="true" />
          </div>
        )}
      </div>

      {/* Full-bleed parallax background */}
      {imageUrl && isFullBleed && (
        <div
          ref={bgRef}
          className="woc-hero__fullbleed-bg"
          style={{ backgroundImage: `url('${imageUrl}')` }}
          role="img"
          aria-label={imageAlt ?? ''}
        />
      )}

      {/* Scroll indicator — full-bleed only */}
      {isFullBleed && (
        <div className="woc-hero__scroll-indicator" aria-hidden="true">
          <span />
        </div>
      )}

      <style>{`
        /* ---- Shared ---- */
        .woc-hero {
          position: relative;
          overflow: hidden;
          padding-block: var(--section-padding-y-lg);
        }

        /* ---- Staggered content animations ---- */
        .woc-hero__eyebrow {
          opacity: 0;
          transform: translateY(1rem);
          animation: woc-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s both;
        }
        .woc-hero__headline {
          opacity: 0;
          transform: translateY(1.5rem);
          animation: woc-fade-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.22s both;
        }
        .woc-hero__sub {
          max-width: 38rem;
          margin-top: 1.25rem;
          opacity: 0;
          transform: translateY(1rem);
          animation: woc-fade-up 0.65s cubic-bezier(0.22,1,0.36,1) 0.35s both;
        }
        .woc-hero__ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 0.875rem;
          margin-top: 2.25rem;
          opacity: 0;
          animation: woc-fade-in 0.6s ease 0.5s both;
        }
        .woc-hero__cta-arrow {
          transition: transform 0.2s ease;
          display: inline-block;
        }
        .btn-primary:hover .woc-hero__cta-arrow { transform: translateX(4px); }

        /* ---- Full-bleed ---- */
        .woc-hero--full-bleed {
          min-height: 100svh;
          display: flex;
          align-items: center;
          color: #fff;
          padding-block: 0;
        }
        .woc-hero--full-bleed .woc-h1,
        .woc-hero--full-bleed .woc-lead,
        .woc-hero--full-bleed .woc-eyebrow { color: rgba(255,255,255,0.92); }
        .woc-hero--full-bleed .woc-eyebrow--lined::before { background-color: rgba(255,255,255,0.5); }
        .woc-hero--full-bleed .btn-secondary {
          border-color: rgba(255,255,255,0.6);
          color: #fff;
        }
        .woc-hero--full-bleed .btn-secondary:hover {
          background-color: rgba(255,255,255,0.12);
          color: #fff;
        }

        /* Parallax bg — translateY applied by JS */
        .woc-hero__fullbleed-bg {
          position: absolute;
          inset: -20%;  /* oversized so parallax shift doesn't clip */
          background-size: cover;
          background-position: center;
          z-index: -2;
          will-change: transform;
        }

        /* Multi-layer overlay — brand tint + dark base */
        .woc-hero--full-bleed::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            160deg,
            color-mix(in srgb, var(--color-primary) 22%, transparent) 0%,
            rgba(0,0,0,0.5) 55%,
            rgba(0,0,0,0.78) 100%
          );
          z-index: -1;
        }

        /* Scroll indicator */
        .woc-hero__scroll-indicator {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0;
          animation: woc-fade-in 0.8s ease 1.2s both;
        }
        .woc-hero__scroll-indicator span {
          display: block;
          width: 1.5px;
          height: 3.5rem;
          background: linear-gradient(to bottom, rgba(255,255,255,0.6), transparent);
          animation: woc-scroll-line 1.6s ease-in-out infinite;
        }
        @keyframes woc-scroll-line {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 1; }
          50%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
          51%  { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0.3; }
        }

        /* ---- Split inner grid ---- */
        .woc-hero__inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .woc-hero__inner--centered {
          grid-template-columns: 1fr;
          text-align: center;
          max-width: 52rem;
          margin-inline: auto;
        }
        .woc-hero__inner--centered .woc-eyebrow { justify-content: center; }
        .woc-hero__inner--centered .woc-hero__sub { margin-inline: auto; }
        .woc-hero__inner--centered .woc-hero__ctas { justify-content: center; }
        .woc-hero__inner--reverse .woc-hero__media { order: -1; }

        /* ---- Image (split layouts) ---- */
        .woc-hero__media { position: relative; }
        .woc-hero__img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
          aspect-ratio: 4/3;
          border-radius: var(--radius-card);
          box-shadow: var(--shadow-elevated);
          position: relative;
          z-index: 1;
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .woc-hero__media:hover .woc-hero__img { transform: scale(1.02); }

        /* Decorative offset shape */
        .woc-hero__media-shape {
          position: absolute;
          inset: 1.25rem -1.25rem -1.25rem 1.25rem;
          background-color: color-mix(in srgb, var(--color-primary) 10%, transparent);
          border-radius: var(--radius-card);
          z-index: 0;
        }
        .woc-hero__inner--reverse .woc-hero__media-shape {
          inset: 1.25rem 1.25rem -1.25rem -1.25rem;
        }

        /* ---- Responsive ---- */
        @media (max-width: 768px) {
          .woc-hero { padding-block: var(--section-padding-y); }
          .woc-hero__inner {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .woc-hero__inner--reverse .woc-hero__media { order: 0; }
          .woc-hero__media-shape { display: none; }
          .woc-hero__scroll-indicator { display: none; }
        }
      `}</style>
    </section>
  );
}
