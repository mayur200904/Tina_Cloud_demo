'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { SettingsQuery } from '../../tina/__generated__/types';

type Settings = SettingsQuery['settings'] | null;
type SettingsNavLink = { label: string; href: string };
type SettingsSocialLink = { platform: string | null | undefined; url: string };

function isValidNavLink(link: { label?: string | null; href?: string | null } | null): link is SettingsNavLink {
  return typeof link?.label === 'string' && typeof link?.href === 'string';
}

function isValidSocialLink(
  link: { platform?: string | null; url?: string | null } | null
): link is SettingsSocialLink {
  return typeof link?.url === 'string';
}

interface BaseLayoutProps {
  settings: Settings;
  children: React.ReactNode;
}

export default function BaseLayout({
  settings,
  children,
}: BaseLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Lightweight scroll listener — adds shadow/blur only when user scrolls.
  // CSS handles the visual treatment, keeping JS scope minimal.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const siteName = settings?.siteName ?? '';
  const logoText = settings?.logoText ?? siteName;
  const navLinks = (settings?.navLinks ?? []).filter(isValidNavLink);
  const navCtaLabel = settings?.navCtaLabel ?? '';
  const navCtaLink = settings?.navCtaLink ?? '/contact';
  const footerLinks = (settings?.footerLinks ?? []).filter(isValidNavLink);
  const copyrightText = settings?.copyrightText ?? '';
  const socialLinks = (settings?.socialLinks ?? []).filter(isValidSocialLink);

  return (
    <>
      <a href="#main-content" className="woc-skip-link">
        Skip to main content
      </a>
      {/* NAV */}
      <header
        className={`woc-nav${scrolled ? ' is-scrolled' : ''}`}
        role="banner"
      >
        <div className="woc-container woc-nav__inner">
          <Link href="/" className="woc-nav__logo" aria-label={siteName || 'Home'}>
            {settings?.logoImage ? (
              <img
                src={settings.logoImage}
                alt={siteName}
                width={160}
                height={32}
                className="woc-nav__logo-img"
              />
            ) : (
              <span className="woc-nav__logo-text">{logoText}</span>
            )}
          </Link>

          {/* Desktop Nav */}
          <nav className="woc-nav__links" aria-label="Main navigation">
            {navLinks.map((link) =>
              link ? (
                <Link key={`${link.label}-${link.href}`} href={link.href} className="woc-nav__link">
                  {link.label}
                </Link>
              ) : null
            )}
          </nav>

          <div className="woc-nav__actions">
            {navCtaLabel && (
              <Link href={navCtaLink} className="btn-primary woc-nav__cta">
                {navCtaLabel}
              </Link>
            )}
            <button
              type="button"
              className={`woc-nav__hamburger${mobileOpen ? ' is-open' : ''}`}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className={`woc-nav__mobile${mobileOpen ? ' is-visible' : ''}`}
          aria-hidden={!mobileOpen}
        >
          {navLinks.map((link) =>
            link ? (
              <Link
                key={`${link.label}-${link.href}`}
                href={link.href}
                className="woc-nav__mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ) : null
          )}
          {navCtaLabel && (
            <Link href={navCtaLink} className="btn-primary woc-nav__mobile-cta" onClick={() => setMobileOpen(false)}>
              {navCtaLabel}
            </Link>
          )}
        </div>
      </header>

      {/* MAIN */}
      <main id="main-content">{children}</main>

      {/* FOOTER */}
      <footer className="woc-footer" role="contentinfo">
        <div className="woc-container woc-footer__inner">
          {/* Brand column */}
          <div className="woc-footer__brand">
            <span className="woc-footer__logo">{logoText}</span>
            {settings?.footerTagline && (
              <p className="woc-footer__tagline">{settings.footerTagline}</p>
            )}
            {socialLinks.length > 0 && (
              <div className="woc-footer__social">
                {socialLinks.map((s, i) =>
                  s ? (
                    <a
                      key={i}
                      href={s.url ?? '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="woc-footer__social-link"
                      aria-label={s.platform ?? ''}
                    >
                      {s.platform}
                    </a>
                  ) : null
                )}
              </div>
            )}
          </div>

          {/* Links column */}
          {footerLinks.length > 0 && (
            <nav className="woc-footer__links" aria-label="Footer navigation">
              <p className="woc-footer__col-heading">Navigation</p>
              {footerLinks.map((link, i) =>
                link ? (
                  <Link key={`${link.label}-${link.href}`} href={link.href as string} className="woc-footer__link">
                    {link.label}
                  </Link>
                ) : null
              )}
            </nav>
          )}
        </div>

        {/* Bottom bar */}
        <div className="woc-footer__bottom">
          <div className="woc-container woc-footer__bottom-inner">
            <p>{copyrightText}</p>
          </div>
        </div>
      </footer>

      <style>{`
        /* ========== NAV ========== */
        .woc-nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: var(--nav-bg);
          border-bottom: 1px solid var(--nav-border);
          height: var(--nav-height);
          display: flex;
          align-items: center;
          /* backdrop-filter only activates if nav-bg has alpha transparency.
             On a solid nav-bg it's invisible — purely token-driven. */
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          transition: box-shadow 0.25s ease;
        }
        .woc-nav.is-scrolled {
          box-shadow: 0 2px 20px rgba(0,0,0,0.08);
        }
        .woc-nav__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          width: 100%;
        }

        /* Logo */
        .woc-nav__logo { text-decoration: none; }
        .woc-nav__logo-text {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--nav-text);
          letter-spacing: -0.01em;
        }
        .woc-nav__logo-img { height: 2rem; width: auto; }

        /* Desktop links */
        .woc-nav__links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .woc-nav__link {
          position: relative;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--nav-text);
          text-decoration: none;
          opacity: 0.75;
          letter-spacing: 0.04em;
          transition: opacity 0.15s;
          padding-block: 0.25rem;
        }
        .woc-nav__link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1.5px;
          background-color: var(--nav-text);
          transition: width 0.2s ease;
        }
        .woc-nav__link:hover { opacity: 1; }
        .woc-nav__link:hover::after { width: 100%; }

        /* CTA */
        .woc-nav__actions { display: flex; align-items: center; gap: 1rem; }
        .woc-nav__cta { font-size: 0.875rem; padding: 0.5rem 1.25rem; }

        /* Hamburger */
        .woc-nav__hamburger {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 1.5rem;
          height: 1.125rem;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }
        .woc-nav__hamburger span {
          display: block;
          height: 2px;
          background: var(--nav-text);
          border-radius: 2px;
          transition: transform 0.2s, opacity 0.2s;
          transform-origin: center;
        }
        .woc-nav__hamburger.is-open span:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }
        .woc-nav__hamburger.is-open span:nth-child(2) { opacity: 0; }
        .woc-nav__hamburger.is-open span:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }

        /* Mobile drawer */
        .woc-nav__mobile {
          position: absolute;
          top: var(--nav-height);
          left: 0;
          right: 0;
          background: var(--nav-bg);
          border-bottom: 1px solid var(--nav-border);
          display: flex;
          flex-direction: column;
          gap: 0;
          padding: 0.75rem 1.5rem 1.25rem;
          transform: translateY(-0.5rem);
          opacity: 0;
          pointer-events: none;
          transition: transform 0.25s ease, opacity 0.25s ease;
        }
        .woc-nav__mobile.is-visible {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }
        .woc-nav__mobile-link {
          padding: 0.75rem 0;
          border-bottom: 1px solid var(--nav-border);
          color: var(--nav-text);
          text-decoration: none;
          font-size: 0.9375rem;
          font-weight: 500;
          opacity: 0.8;
          transition: opacity 0.15s;
        }
        .woc-nav__mobile-link:hover { opacity: 1; }
        .woc-nav__mobile-cta { margin-top: 0.5rem; }

        .woc-skip-link {
          position: absolute;
          top: -3rem;
          left: 1rem;
          z-index: 200;
          background: var(--color-dark);
          color: var(--color-dark-foreground);
          border: 1px solid color-mix(in srgb, var(--color-dark-foreground) 35%, transparent);
          border-radius: 0.5rem;
          padding: 0.45rem 0.75rem;
          text-decoration: none;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          transition: top 0.2s ease;
        }
        .woc-skip-link:focus-visible {
          top: 0.75rem;
        }

        @media (max-width: 768px) {
          .woc-nav__links { display: none; }
          .woc-nav__hamburger { display: flex; }
          .woc-nav__cta { display: none; }
        }

        /* ========== FOOTER ========== */
        /* Footer uses --color-dark. Builder sets this in globals.css
           to match brand (deep navy, charcoal, forest, etc.)  */
        .woc-footer {
          background-color: var(--color-dark);
          color: var(--color-dark-foreground);
          margin-top: 4rem;
        }
        .woc-footer__inner {
          display: flex;
          flex-wrap: wrap;
          gap: 3rem;
          justify-content: space-between;
          align-items: flex-start;
          padding-block: 4rem;
        }

        /* Brand column */
        .woc-footer__brand { max-width: 22rem; }
        .woc-footer__logo {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--color-dark-foreground);
          letter-spacing: -0.01em;
          display: block;
          margin-bottom: 0.75rem;
        }
        .woc-footer__tagline {
          font-size: 0.9rem;
          color: color-mix(in srgb, var(--color-dark-foreground) 60%, transparent);
          line-height: 1.6;
          margin-bottom: 1.25rem;
        }
        .woc-footer__social { display: flex; gap: 1rem; flex-wrap: wrap; }
        .woc-footer__social-link {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: color-mix(in srgb, var(--color-dark-foreground) 55%, transparent);
          text-decoration: none;
          transition: color 0.15s;
        }
        .woc-footer__social-link:hover {
          color: var(--color-dark-foreground);
        }

        /* Links column */
        .woc-footer__links { display: flex; flex-direction: column; gap: 0.75rem; }
        .woc-footer__col-heading {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: color-mix(in srgb, var(--color-dark-foreground) 45%, transparent);
          margin-bottom: 0.25rem;
        }
        .woc-footer__link {
          font-size: 0.9rem;
          color: color-mix(in srgb, var(--color-dark-foreground) 65%, transparent);
          text-decoration: none;
          transition: color 0.15s;
        }
        .woc-footer__link:hover { color: var(--color-dark-foreground); }

        /* Bottom bar */
        .woc-footer__bottom {
          border-top: 1px solid color-mix(in srgb, var(--color-dark-foreground) 12%, transparent);
          padding-block: 1.25rem;
        }
        .woc-footer__bottom-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.8125rem;
          color: color-mix(in srgb, var(--color-dark-foreground) 40%, transparent);
        }

        @media (max-width: 640px) {
          .woc-footer__inner { gap: 2rem; }
          .woc-footer__bottom-inner { flex-direction: column; gap: 0.5rem; text-align: center; }
        }
      `}</style>
    </>
  );
}
