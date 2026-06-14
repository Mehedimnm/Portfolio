"use client";

import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";
import { ease } from "@/lib/motion";

const container: Variants = {
  hidden: {},
  visible: (delay: number = 0) => ({
    transition: { staggerChildren: 0.055, delayChildren: delay },
  }),
};

const letter: Variants = {
  hidden: { opacity: 0, y: "55%", filter: "blur(16px)" },
  visible: {
    opacity: 1,
    y: "0%",
    filter: "blur(0px)",
    transition: { duration: 0.95, ease: ease.out },
  },
};

type Props = {
  /** each string renders on its own line */
  lines: string[];
  className?: string;
};

/**
 * Premium hero name: each letter resolves from a blurred, lowered state into
 * sharp focus (staggered, cinematic), then holds — solid and fully visible —
 * with a soft amber/red glow that gently breathes. No looping, no vanishing.
 */
export function AnimatedName({ lines, className }: Props) {
  return (
    <span
      className={cn("flex flex-col", className)}
      aria-label={lines.join(" ")}
    >
      {lines.map((line, li) => (
        <motion.span
          key={line}
          custom={0.25 + li * 0.35}
          variants={container}
          initial="hidden"
          animate="visible"
          className="name-glow flex uppercase text-foreground"
          aria-hidden
        >
          {line.split("").map((ch, i) => (
            <motion.span
              key={`${ch}-${i}`}
              variants={letter}
              className="inline-block will-change-[transform,filter]"
            >
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </span>
  );
}
