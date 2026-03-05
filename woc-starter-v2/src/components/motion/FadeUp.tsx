"use client";

import { motion } from "framer-motion";

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

/**
 * FadeUp — fades in + translates up when scrolled into view.
 * Use for headings, paragraphs, individual elements.
 *
 * @example
 * <FadeUp delay={0.1}><h2>Section Title</h2></FadeUp>
 * <FadeUp delay={0.2}><p>Supporting copy</p></FadeUp>
 */
export default function FadeUp({
  children,
  delay = 0,
  duration = 0.55,
  className,
}: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
