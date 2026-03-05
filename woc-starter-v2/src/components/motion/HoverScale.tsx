"use client";

import { motion } from "framer-motion";

interface HoverScaleProps {
  children: React.ReactNode;
  scale?: number;
  className?: string;
}

/**
 * HoverScale — subtle scale on hover, for cards and images.
 * Keep scale small (1.02–1.04). This is a refinement, not a feature.
 *
 * @example
 * <HoverScale scale={1.02}>
 *   <img src="..." alt="..." className="w-full h-full object-cover" />
 * </HoverScale>
 */
export default function HoverScale({
  children,
  scale = 1.02,
  className,
}: HoverScaleProps) {
  return (
    <motion.div
      whileHover={{ scale }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
