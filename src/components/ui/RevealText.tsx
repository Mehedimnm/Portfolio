"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ease } from "@/lib/motion";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  /** stagger per word in seconds */
  stagger?: number;
  once?: boolean;
  /** animate immediately on mount instead of waiting for scroll-into-view */
  immediate?: boolean;
};

/**
 * Word-by-word mask reveal. Each word slides up from behind a clip mask.
 */
export function RevealText({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  once = true,
  immediate = false,
}: Props) {
  const words = text.split(" ");

  const animateProps = immediate
    ? { animate: { y: "0%" } }
    : { whileInView: { y: "0%" }, viewport: { once, amount: 0.6 } as const };

  return (
    <span className={cn("inline", className)}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-flex overflow-hidden align-bottom"
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "110%" }}
            {...animateProps}
            transition={{
              duration: 0.8,
              ease: ease.out,
              delay: delay + i * stagger,
            }}
          >
            {word}
            {i < words.length - 1 && "\u00A0"}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
