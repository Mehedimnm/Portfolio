"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  external?: boolean;
  download?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  "aria-label"?: string;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-background hover:shadow-[0_0_50px_-12px_rgba(220,38,38,0.7)] font-medium",
  outline:
    "border border-border text-foreground hover:border-accent-2 hover:text-accent-2",
  ghost: "text-muted hover:text-foreground",
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  external,
  download,
  type = "button",
  disabled,
  ...rest
}: Props) {
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagnetic<HTMLDivElement>(
    0.3
  );

  const classes = cn(
    "relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-mono text-sm transition-[box-shadow,colors,background] duration-300",
    variants[variant],
    disabled && "pointer-events-none opacity-50",
    className
  );

  const inner = (
    <motion.span
      style={{ x, y }}
      className="inline-flex items-center gap-2"
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="inline-block"
      >
        <a
          href={href}
          className={classes}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          {...(download ? { download: "" } : {})}
          {...rest}
        >
          {inner}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="inline-block"
    >
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={classes}
        {...rest}
      >
        {inner}
      </button>
    </motion.div>
  );
}
