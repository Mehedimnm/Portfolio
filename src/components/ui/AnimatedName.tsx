"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ease } from "@/lib/motion";

type Props = {
  /** each string renders on its own line */
  lines: string[];
  className?: string;
};

/**
 * Uppercase name that rises into view once (mask reveal, line by line),
 * then stays solid and fully visible. No looping, no disappearing.
 */
export function AnimatedName({ lines, className }: Props) {
  return (
    <span className={cn("flex flex-col", className)} aria-label={lines.join(" ")}>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden py-[0.06em]" aria-hidden>
          <motion.span
            className="inline-block uppercase text-foreground will-change-transform"
            initial={{ y: "115%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.95, ease: ease.out, delay: 0.2 + i * 0.13 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
