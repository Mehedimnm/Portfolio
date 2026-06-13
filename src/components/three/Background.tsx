"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// WebGL aurora + starfield — client only
const Scene = dynamic(() => import("@/components/three/Scene"), { ssr: false });

/**
 * Site-wide animated backdrop (fixed behind all content).
 * Sharp while the home/hero section is in view; once the visitor scrolls past
 * it into the other sections, the backdrop gently blurs so content stays the
 * focus while the effect keeps running behind it.
 */
export function Background() {
  const [blurred, setBlurred] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // blur after scrolling roughly past the hero (60% of the first screen)
      setBlurred(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      <div
        className={cn(
          "absolute inset-0 transition-[filter,transform] duration-700 ease-out",
          blurred ? "scale-110 blur-lg" : "blur-0"
        )}
      >
        <Scene />
      </div>

      {/* Vignette to deepen edges and keep text readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 45%, transparent 30%, rgba(10,10,11,0.7) 100%)",
        }}
      />
    </div>
  );
}
