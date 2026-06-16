"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * Smooth scrolling (Lenis) — desktop only. On touch / small screens we use the
 * browser's native scroll, which is far smoother and avoids the jank, jumping
 * and address-bar fights Lenis can cause on mobile.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const finePointer = useMediaQuery("(pointer: fine)");
  const wide = useMediaQuery("(min-width: 768px)");

  if (!(finePointer && wide)) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
