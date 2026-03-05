'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface ScrollRevealProps {
    children: ReactNode;
    delay?: number;       // ms, for staggered reveals
    threshold?: number;   // 0–1, how much of element must be visible before firing
    className?: string;
    once?: boolean;       // default true — only reveal once
}

/**
 * ScrollReveal — wraps any content and fades+slides it in when it enters the viewport.
 * 
 * Usage in Server Components:
 *   <ScrollReveal delay={100}>
 *     <div>...</div>
 *   </ScrollReveal>
 *
 * Staggered children (wrap each child individually with increasing delay):
 *   {items.map((item, i) => (
 *     <ScrollReveal key={i} delay={i * 80}>
 *       <Card>{item}</Card>
 *     </ScrollReveal>
 *   ))}
 */
export default function ScrollReveal({
    children,
    delay = 0,
    threshold = 0.12,
    className = '',
    once = true,
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Apply delay then reveal
                    const timer = setTimeout(() => {
                        el.classList.add('sr-visible');
                    }, delay);

                    if (once) {
                        observer.disconnect();
                        return () => clearTimeout(timer);
                    }
                } else if (!once) {
                    el.classList.remove('sr-visible');
                }
            },
            { threshold }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [delay, threshold, once]);

    return (
        <div ref={ref} className={`sr-wrap ${className}`}>
            {children}
            <style>{`
        .sr-wrap {
          opacity: 0;
          transform: translateY(2rem);
          transition: opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
          /* Respect user motion preferences */
          @media (prefers-reduced-motion: reduce) {
            transition: opacity 0.3s ease;
            transform: none;
          }
        }
        .sr-wrap.sr-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
        </div>
    );
}
