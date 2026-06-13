"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } },
  exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

const letterV: Variants = {
  hidden: { y: "105%" },
  visible: { y: "0%", transition: { duration: 0.6, ease: ease.out } },
  exit: { y: "105%", transition: { duration: 0.45, ease: ease.inOut } },
};

type Props = {
  text: string;
  className?: string;
  holdMs?: number;
  gapMs?: number;
};

/**
 * Full name that rises gently out of a straight baseline — one letter at a
 * time — holds, slides back into the line, and loops. Slow and smooth.
 */
export function NavName({ text, className, holdMs = 4200, gapMs = 1300 }: Props) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let alive = true;
    const tick = (visible: boolean) => {
      if (!alive) return;
      setShow(visible);
      timer = setTimeout(() => tick(!visible), visible ? holdMs : gapMs);
    };
    timer = setTimeout(() => tick(false), holdMs);
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [holdMs, gapMs]);

  const chars = text.split("");

  return (
    <span className={cn("relative inline-block leading-none", className)}>
      {/* reserve the full width so the baseline length is constant */}
      <span className="invisible whitespace-pre">{text}</span>

      {/* letters rising out of the line */}
      <span className="absolute inset-0 flex items-center whitespace-pre">
        <AnimatePresence mode="wait">
          {show && (
            <motion.span
              key="name"
              variants={container}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex"
            >
              {chars.map((ch, i) => (
                <span
                  key={`${ch}-${i}`}
                  className="inline-block overflow-hidden"
                >
                  <motion.span variants={letterV} className="inline-block">
                    {ch === " " ? "\u00A0" : ch}
                  </motion.span>
                </span>
              ))}
            </motion.span>
          )}
        </AnimatePresence>
      </span>

      {/* the straight baseline */}
      <span className="absolute -bottom-1 left-0 h-px w-full bg-accent" />
    </span>
  );
}
