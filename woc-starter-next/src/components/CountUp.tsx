'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
    value: string;  // e.g. "500+", "₹2.4Cr", "25", "98%"
    duration?: number; // ms — how long the count animation lasts
    className?: string;
}

/**
 * CountUp — animates a number from 0 to its target value when it enters the viewport.
 * 
 * Handles common CMS value formats:
 *   "500+" → counts to 500, appends "+"
 *   "25"   → counts to 25
 *   "98%"  → counts to 98, appends "%"
 *   "2.4K" → counts 0 → 2.4, appends "K"
 *   Text-only values (e.g. "ISO 9001") → renders as-is with no animation
 * 
 * Usage (in a Server Component block):
 *   <CountUp value={stat.value ?? ''} className="woc-stat__value" />
 */
export default function CountUp({ value, duration = 1800, className = '' }: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const [displayed, setDisplayed] = useState<string>(value);
    const hasAnimated = useRef(false);

    // Parse value: extract numeric prefix and suffix
    const parseValue = (raw: string): { num: number; suffix: string; prefix: string } | null => {
        // Match optional prefix (like ₹, $, €), then number (int or decimal), then suffix
        const match = raw.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
        if (!match) return null;
        const [, prefix, numStr, suffix] = match;
        const num = parseFloat(numStr);
        if (isNaN(num)) return null;
        return { num, suffix, prefix };
    };

    useEffect(() => {
        const el = ref.current;
        if (!el || hasAnimated.current) return;

        const parsed = parseValue(value);
        if (!parsed) return; // Non-numeric value — render as-is

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting || hasAnimated.current) return;
                hasAnimated.current = true;
                observer.disconnect();

                const { num, suffix, prefix } = parsed;
                const startTime = performance.now();
                const isDecimal = num % 1 !== 0;

                const tick = (now: number) => {
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = num * eased;
                    const formatted = isDecimal
                        ? current.toFixed(1)
                        : Math.round(current).toString();
                    setDisplayed(`${prefix}${formatted}${suffix}`);
                    if (progress < 1) requestAnimationFrame(tick);
                };

                requestAnimationFrame(tick);
            },
            { threshold: 0.3 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [value, duration]);

    return (
        <span ref={ref} className={className}>
            {displayed}
        </span>
    );
}
