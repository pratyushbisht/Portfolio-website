"use client";

import { motion } from "motion/react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

/** Fade + 30px slide-up once the element enters the viewport. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
