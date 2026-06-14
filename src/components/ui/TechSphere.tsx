"use client";

import { useCallback, useEffect, useRef } from "react";
import { TechIcon } from "@/components/icons/TechIcon";

/** Evenly distribute n points on a unit sphere (Fibonacci sphere). */
function fibonacciSphere(n: number): [number, number, number][] {
  const pts: [number, number, number][] = [];
  const inc = Math.PI * (3 - Math.sqrt(5));
  const offset = 2 / Math.max(n, 1);
  for (let i = 0; i < n; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const phi = i * inc;
    pts.push([Math.cos(phi) * r, y, Math.sin(phi) * r]);
  }
  return pts;
}

type Props = { items: string[] };

/**
 * Interactive 3D tech globe: brand-logo chips orbit on a sphere that
 * auto-rotates, can be dragged to spin, and fades / scales / blurs each chip
 * by its depth for a real sense of 3D. Pure DOM + rAF (no WebGL needed).
 */
export function TechSphere({ items }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const points = useRef<[number, number, number][]>(fibonacciSphere(items.length));
  const rot = useRef({ x: -0.25, y: 0 });
  const radius = useRef(200);
  const drag = useRef({ active: false, lastX: 0, lastY: 0 });

  useEffect(() => {
    points.current = fibonacciSphere(items.length);
  }, [items.length]);

  // responsive radius
  useEffect(() => {
    const compute = () => {
      const el = containerRef.current;
      if (!el) return;
      radius.current = Math.min(el.clientWidth, el.clientHeight) * 0.42;
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  // animation loop
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      if (!drag.current.active) rot.current.y += 0.0035;
      const { x: rx, y: ry } = rot.current;
      const cosy = Math.cos(ry);
      const siny = Math.sin(ry);
      const cosx = Math.cos(rx);
      const sinx = Math.sin(rx);
      const R = radius.current;
      const pts = points.current;

      for (let i = 0; i < pts.length; i++) {
        const [bx, by, bz] = pts[i];
        const x1 = bx * cosy - bz * siny;
        const z1 = bx * siny + bz * cosy;
        const y2 = by * cosx - z1 * sinx;
        const z2 = by * sinx + z1 * cosx;
        const px = x1 * R;
        const py = y2 * R;
        const depth = (z2 + 1) / 2; // 0 (back) .. 1 (front)
        const scale = 0.5 + depth * 0.7;
        const el = itemRefs.current[i];
        if (el) {
          el.style.transform = `translate(-50%, -50%) translate(${px}px, ${py}px) scale(${scale})`;
          el.style.opacity = String(0.22 + depth * 0.78);
          el.style.zIndex = String(Math.round(depth * 100));
          el.style.filter = depth < 0.4 ? `blur(${(0.4 - depth) * 7}px)` : "none";
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // drag to spin
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!drag.current.active) return;
      rot.current.y += (e.clientX - drag.current.lastX) * 0.006;
      rot.current.x += (e.clientY - drag.current.lastY) * 0.006;
      rot.current.x = Math.max(-1.2, Math.min(1.2, rot.current.x));
      drag.current.lastX = e.clientX;
      drag.current.lastY = e.clientY;
    };
    const onUp = () => {
      drag.current.active = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    drag.current.active = true;
    drag.current.lastX = e.clientX;
    drag.current.lastY = e.clientY;
  }, []);

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      className="relative mx-auto h-[26rem] w-full max-w-2xl cursor-grab touch-pan-y select-none active:cursor-grabbing sm:h-[32rem]"
      aria-label={`Technologies: ${items.join(", ")}`}
    >
      {items.map((name, i) => (
        <div
          key={name}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          className="absolute left-1/2 top-1/2 will-change-transform"
          style={{ opacity: 0 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-4 py-2 backdrop-blur-sm">
            <TechIcon name={name} size={20} />
            <span className="whitespace-nowrap font-mono text-xs text-foreground">
              {name}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}
