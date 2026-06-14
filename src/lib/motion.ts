import type { Variants, Transition } from "motion/react";

/** Shared easing curves used across the site. */
export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.83, 0, 0.17, 1] as const,
  spring: { type: "spring", stiffness: 120, damping: 18, mass: 0.6 } as const,
};

export const transition = {
  base: { duration: 0.7, ease: ease.out } satisfies Transition,
  fast: { duration: 0.4, ease: ease.out } satisfies Transition,
  slow: { duration: 1.1, ease: ease.out } satisfies Transition,
};

/** Fade + rise — the default reveal for blocks. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: transition.base },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition.base },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: transition.base },
};

/** Cinematic blur-to-sharp focus-in (matches the hero name treatment). */
export const focusIn: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(14px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: ease.out },
  },
};

/** Stagger container — children animate one after another. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});

/** Per-word/letter reveal item. */
export const revealItem: Variants = {
  hidden: { opacity: 0, y: "100%" },
  visible: { opacity: 1, y: "0%", transition: transition.base },
};

/** Default viewport config for whileInView. */
export const viewportOnce = { once: true, amount: 0.3 } as const;
