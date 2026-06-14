"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { cn } from "@/lib/utils";

/** Wrap a value into the [min, max) range. */
function wrap(min: number, max: number, v: number) {
  const range = max - min;
  const mod = (((v - min) % range) + range) % range;
  return mod + min;
}

type Props = {
  children: ReactNode;
  /** % per second; negative scrolls left, positive scrolls right */
  baseVelocity?: number;
  copies?: number;
  className?: string;
};

/**
 * A marquee row whose speed and direction react to the page's scroll velocity,
 * and that pauses on hover. Content is duplicated for a seamless infinite loop.
 */
export function VelocityMarquee({
  children,
  baseVelocity = 4,
  copies = 4,
  className,
}: Props) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });

  const directionFactor = useRef(1);
  const paused = useRef(false);

  const x = useTransform(baseX, (v) => `${wrap(0, -100 / copies, v)}%`);

  useAnimationFrame((_, delta) => {
    if (paused.current) return;
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      className={cn("flex overflow-hidden", className)}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <motion.div className="flex flex-nowrap" style={{ x }}>
        {Array.from({ length: copies }).map((_, i) => (
          <div
            key={i}
            className="flex flex-nowrap items-center gap-4 pr-4"
            aria-hidden={i > 0}
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
