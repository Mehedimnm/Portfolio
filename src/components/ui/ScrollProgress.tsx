"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin amber progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, var(--accent-bright), var(--accent), var(--accent-2))",
      }}
      className="fixed inset-x-0 top-0 z-[55] h-0.5 origin-left"
    />
  );
}
