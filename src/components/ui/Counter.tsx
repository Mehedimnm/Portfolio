"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

type Props = {
  value: number;
  suffix?: string;
  durationMs?: number;
  className?: string;
};

/** Counts up from 0 to `value` once it scrolls into view. */
export function Counter({ value, suffix = "%", durationMs = 1200, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / durationMs, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {n}
      {suffix}
    </span>
  );
}
