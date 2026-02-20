'use client';

import { useState } from 'react';
import type { SettingsQuery } from '../../tina/__generated__/types';

type Settings = SettingsQuery['settings'] | null;

interface BaseLayoutProps {
    settings: Settings;
    title?: string;
    description?: string;
    googleFontsUrl?: string;
    children: React.ReactNode;
}

export default function BaseLayout({
    settings,
    title,
    description,
    children,
}: BaseLayoutProps) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const siteName = settings?.siteName ?? 'Site';
    const logoText = settings?.logoText ?? siteName;
    const navLinks = settings?.navLinks ?? [];
    const navCtaLabel = settings?.navCtaLabel ?? '';
    const navCtaLink = settings?.navCtaLink ?? '#contact';
    const footerLinks = settings?.footerLinks ?? [];
    const copyrightText =
        settings?.copyrightText ?? `© ${new Date().getFullYear()} ${siteName}. All rights reserved.`;
    const socialLinks = settings?.socialLinks ?? [];

    return (
        <>
            {/* NAV */}
            <header className="woc-nav" role="banner">
                <div className="woc-container woc-nav__inner">
                    <a href="/" className="woc-nav__logo" aria-label={siteName}>
                        {settings?.logoImage ? (
                            <img src={settings.logoImage} alt={siteName} className="woc-nav__logo-img" />
                        ) : (
                            <span className="woc-nav__logo-text">{logoText}</span>
                        )}
                    </a>

                    {/* Desktop Nav */}
                    <nav className="woc-nav__links" aria-label="Main navigation">
                        {navLinks.map((link) =>
                            link ? (
                                <a key={link.href} href={link.href ?? '#'} className="woc-nav__link">
                                    {link.label}
                                </a>
                            ) : null
                        )}
                    </nav>

                    <div className="woc-nav__actions">
                        {navCtaLabel && (
                            <a href={navCtaLink} className="btn-primary woc-nav__cta">
                                {navCtaLabel}
                            </a>
                        )}
                        <button
                            className={`woc-nav__hamburger${mobileOpen ? ' is-open' : ''}`}
                            aria-label="Open menu"
                            onClick={() => setMobileOpen((v) => !v)}
                        >
                            <span />
                            <span />
                            <span />
                        </button>
                    </div>
                </div>

                {/* Mobile drawer */}
                <div className="woc-nav__mobile" aria-hidden={!mobileOpen} style={{ display: mobileOpen ? 'flex' : 'none' }}>
                    {navLinks.map((link) =>
                        link ? (
                            <a
                                key={link.href}
                                href={link.href ?? '#'}
                                className="woc-nav__mobile-link"
                                onClick={() => setMobileOpen(false)}
                            >
                                {link.label}
                            </a>
                        ) : null
                    )}
                    {navCtaLabel && (
                        <a href={navCtaLink} className="btn-primary">
                            {navCtaLabel}
                        </a>
                    )}
                </div>
            </header>

            {/* MAIN */}
            <main id="main-content">{children}</main>

            {/* FOOTER */}
            <footer className="woc-footer" role="contentinfo">
                <div className="woc-container woc-footer__inner">
                    <div className="woc-footer__brand">
                        <span className="woc-nav__logo-text">{logoText}</span>
                        {settings?.footerTagline && (
                            <p className="woc-footer__tagline">{settings.footerTagline}</p>
                        )}
                    </div>

                    {footerLinks.length > 0 && (
                        <nav className="woc-footer__links" aria-label="Footer navigation">
                            {footerLinks.map((link, i) =>
                                link ? (
                                    <a key={i} href={link.href ?? '#'} className="woc-footer__link">
                                        {link.label}
                                    </a>
                                ) : null
                            )}
                        </nav>
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
                <div className="woc-footer__bottom">
                    <div className="woc-container">
                        <p>{copyrightText}</p>
                    </div>
                </div>
            </footer>

            <style>{`
        /* --- NAV --- */
        .woc-nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: var(--nav-bg);
          border-bottom: 1px solid var(--nav-border);
          height: var(--nav-height);
          display: flex;
          align-items: center;
        }
        .woc-nav__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          width: 100%;
        }
        .woc-nav__logo { text-decoration: none; }
        .woc-nav__logo-text {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--nav-text);
        }
        .woc-nav__logo-img { height: 2rem; width: auto; }
        .woc-nav__links {
          display: flex;
          align-items: center;
          gap: 2rem;
          list-style: none;
        }
        .woc-nav__link {
          font-size: 0.9375rem;
          font-weight: 500;
          color: var(--nav-text);
          text-decoration: none;
          opacity: 0.8;
          transition: opacity 0.15s;
        }
        .woc-nav__link:hover { opacity: 1; }
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
        }

        /* Mobile drawer */
        .woc-nav__mobile {
          position: absolute;
          top: var(--nav-height);
          left: 0;
          right: 0;
          background: var(--nav-bg);
          border-bottom: 1px solid var(--nav-border);
          flex-direction: column;
          gap: 0;
          padding: 1rem 1.5rem;
        }
        .woc-nav__mobile-link {
          padding: 0.75rem 0;
          border-bottom: 1px solid var(--color-surface-border);
          color: var(--nav-text);
          text-decoration: none;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .woc-nav__links { display: none; }
          .woc-nav__hamburger { display: flex; }
          .woc-nav__cta { display: none; }
        }

        /* --- FOOTER --- */
        .woc-footer {
          background: var(--color-surface);
          border-top: 1px solid var(--color-surface-border);
          margin-top: 4rem;
        }
        .woc-footer__inner {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          justify-content: space-between;
          align-items: flex-start;
          padding-block: 3rem;
        }
        .woc-footer__tagline {
          font-size: 0.9rem;
          color: var(--color-muted);
          margin-top: 0.5rem;
          max-width: 24rem;
        }
        .woc-footer__links { display: flex; flex-wrap: wrap; gap: 1.5rem; }
        .woc-footer__link {
          font-size: 0.9rem;
          color: var(--color-muted);
          text-decoration: none;
          transition: color 0.15s;
        }
        .woc-footer__link:hover { color: var(--color-foreground); }
        .woc-footer__social { display: flex; gap: 1rem; align-items: center; }
        .woc-footer__social-link {
          font-size: 0.8125rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--color-muted);
          text-decoration: none;
          transition: color 0.15s;
        }
        .woc-footer__social-link:hover { color: var(--color-primary); }
        .woc-footer__bottom {
          border-top: 1px solid var(--color-surface-border);
          padding-block: 1.25rem;
          font-size: 0.875rem;
          color: var(--color-muted);
        }
      `}</style>
        </>
    );
}
