"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

type Props = {
  index?: string; // e.g. "01"
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: Props) {
  return (
    <motion.div
      variants={stagger(0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <motion.div
        variants={fadeUp}
        className="flex items-center gap-3 font-mono text-sm text-accent"
      >
        {index && <span className="opacity-70">[{index}]</span>}
        <span className="h-px w-8 bg-accent/50" />
        <span className="tracking-widest">{eyebrow.toUpperCase()}</span>
      </motion.div>

      <motion.h2
        variants={fadeUp}
        className="font-display text-4xl leading-[1.1] text-foreground sm:text-5xl md:text-6xl"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          variants={fadeUp}
          className={cn(
            "max-w-xl text-muted",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
