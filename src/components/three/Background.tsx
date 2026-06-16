"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CalmField } from "@/components/ui/CalmField";

/**
 * Site-wide calming backdrop (fixed behind all content):
 * soft glowing orbs drifting gently upward over a deep night gradient.
 * Sharp on the hero, softly blurred once scrolled into other sections.
 */
export function Background() {
  const [blurred, setBlurred] = useState(false);

  useEffect(() => {
    const onScroll = () => {
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
      {/* deep, calm base glow */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(900px circle at 50% -10%, rgba(127,209,214,0.10), transparent 60%), radial-gradient(700px circle at 85% 110%, rgba(184,169,224,0.10), transparent 55%)",
        }}
      />

      {/* floating bokeh orbs */}
      <div
        className={cn(
          "absolute inset-0 transition-[filter] duration-700 ease-out",
          blurred ? "blur-md" : "blur-0"
        )}
      >
        <CalmField />
      </div>

      {/* vignette for depth + readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 75% at 50% 45%, transparent 35%, rgba(10,10,11,0.72) 100%)",
        }}
      />
    </div>
  );
}
