"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  /** seconds per loop */
  speed?: number;
  reverse?: boolean;
  className?: string;
};

/** Infinite horizontal marquee (duplicates content for a seamless loop). */
export function Marquee({
  children,
  speed = 24,
  reverse = false,
  className,
}: Props) {
  return (
    <div className={cn("relative flex overflow-hidden", className)}>
      <motion.div
        className="flex shrink-0 items-center gap-8 pr-8"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
