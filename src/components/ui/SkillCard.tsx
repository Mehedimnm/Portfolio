"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { TechIcon } from "@/components/icons/TechIcon";
import { Counter } from "@/components/ui/Counter";
import { proficiencyLabel } from "@/data/skills";

type Props = { name: string; level: number };

/**
 * Ultra-premium skill card:
 *  - a glowing amber/red border that follows the cursor (spotlight border)
 *  - 3D tilt toward the pointer with depth on the logo
 *  - count-up %, gradient proficiency bar, proficiency label
 */
export function SkillCard({ name, level }: Props) {
  // tilt
  const rx = useMotionValue(0.5);
  const ry = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(ry, [0, 1], [9, -9]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(rx, [0, 1], [-9, 9]), {
    stiffness: 200,
    damping: 20,
  });

  // border spotlight
  const gx = useMotionValue(0);
  const gy = useMotionValue(0);
  const borderGlow = useMotionTemplate`radial-gradient(240px circle at ${gx}px ${gy}px, rgba(245,158,11,0.6), rgba(220,38,38,0.28) 42%, transparent 70%)`;

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    rx.set((e.clientX - r.left) / r.width);
    ry.set((e.clientY - r.top) / r.height);
    gx.set(e.clientX - r.left);
    gy.set(e.clientY - r.top);
  }
  function onLeave() {
    rx.set(0.5);
    ry.set(0.5);
  }

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="group relative h-full rounded-2xl [transform-style:preserve-3d] will-change-transform"
    >
      {/* cursor-following glowing border */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: borderGlow }}
      />

      {/* inner card */}
      <div className="relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-border bg-surface/55 p-5 backdrop-blur-md [transform-style:preserve-3d]">
        {/* faint top sheen */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        />

        <div className="flex items-center justify-between">
          <span
            className="transition-transform duration-300 group-hover:scale-110"
            style={{ transform: "translateZ(36px)" }}
          >
            <TechIcon name={name} size={36} />
          </span>
          <Counter
            value={level}
            className="font-mono text-sm font-medium text-accent"
          />
        </div>

        <span
          className="font-mono text-sm text-foreground"
          style={{ transform: "translateZ(20px)" }}
        >
          {name}
        </span>

        <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
          <motion.div
            className="h-full rounded-full"
            style={{
              background:
                "linear-gradient(90deg, var(--accent-bright), var(--accent), var(--accent-2))",
            }}
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          />
        </div>

        <span className="font-mono text-[0.7rem] uppercase tracking-wider text-muted-2">
          {proficiencyLabel(level)}
        </span>
      </div>
    </motion.div>
  );
}
