"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * Custom amber cursor with a trailing ring. Grows over interactive elements.
 * Disabled on touch / coarse-pointer devices.
 */
export function Cursor() {
  const isFinePointer = useMediaQuery("(pointer: fine)");
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 250, damping: 28 });
  const ringY = useSpring(y, { stiffness: 250, damping: 28 });

  useEffect(() => {
    if (!isFinePointer) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);

      const target = e.target as HTMLElement;
      setHovering(
        !!target.closest("a, button, [data-cursor='hover'], input, textarea")
      );
    };
    const leave = () => setHidden(true);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, [isFinePointer, x, y]);

  if (!isFinePointer) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        style={{ x, y, opacity: hidden ? 0 : 1 }}
      />
      {/* Ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/60"
        style={{ x: ringX, y: ringY, opacity: hidden ? 0 : 1 }}
        animate={{
          width: hovering ? 56 : 30,
          height: hovering ? 56 : 30,
          backgroundColor: hovering
            ? "rgba(245,158,11,0.12)"
            : "rgba(245,158,11,0)",
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
