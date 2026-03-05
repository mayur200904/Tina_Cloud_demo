"use client";

import { motion } from "framer-motion";

interface StaggerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

/**
 * Stagger — staggers the entrance animation of direct children.
 * Use for card grids, service lists, testimonial rows.
 *
 * Children should be plain elements or components — Stagger wraps each
 * direct child in a motion.div automatically.
 *
 * @example
 * <Stagger staggerDelay={0.07} className="grid grid-cols-3 gap-6">
 *   {services.map(s => <Card key={s.id}>...</Card>)}
 * </Stagger>
 */
export default function Stagger({
  children,
  staggerDelay = 0.07,
  className,
}: StaggerProps) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={itemVariants}>{children}</motion.div>}
    </motion.div>
  );
}
