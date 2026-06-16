"use client";

import { useEffect, useRef } from "react";

/** Soft, calming palette (teal, blue, lavender, mint, near-white). */
const COLORS: [number, number, number][] = [
  [127, 209, 214],
  [154, 208, 236],
  [184, 169, 224],
  [191, 234, 227],
  [232, 246, 255],
];

function makeSprite(rgb: [number, number, number], size = 128) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d");
  if (!g) return c;
  const [r, gn, b] = rgb;
  const grd = g.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  grd.addColorStop(0, `rgba(${r},${gn},${b},0.9)`);
  grd.addColorStop(0.4, `rgba(${r},${gn},${b},0.32)`);
  grd.addColorStop(1, `rgba(${r},${gn},${b},0)`);
  g.fillStyle = grd;
  g.fillRect(0, 0, size, size);
  return c;
}

type Orb = {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  a: number;
  ph: number;
  sp: number;
  s: number;
};

type Flake = {
  baseX: number;
  x: number;
  y: number;
  r: number;
  a: number;
  ph: number;
  sp: number;
  vy: number;
  drift: number;
  dph: number;
  dsp: number;
  c: string;
};

/**
 * Calming ambient backdrop: soft glowing orbs + crisp dots drifting down like
 * snow. Tuned hard for mobile: low DPR, fewer particles, and the loop pauses
 * when the tab is hidden or once scrolled past the hero (where it's blurred).
 */
export function CalmField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    // keep the full-screen canvas cheap on phones
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.75);
    const sprites = COLORS.map((c) => makeSprite(c));
    const flakeColors = ["#e8f6ff", "#bfeae3", "#cfe0ff", "#ffffff"];
    let w = 0;
    let h = 0;
    let orbs: Orb[] = [];
    let flakes: Flake[] = [];

    const spawnOrb = (initial: boolean): Orb => {
      const big = Math.random() < 0.4;
      return {
        x: Math.random() * w,
        y: initial ? Math.random() * h : h + 80,
        r: big ? 90 + Math.random() * 130 : 22 + Math.random() * 55,
        vy: 0.08 + Math.random() * 0.2,
        vx: (Math.random() - 0.5) * 0.12,
        a: big ? 0.07 + Math.random() * 0.08 : 0.12 + Math.random() * 0.15,
        ph: Math.random() * Math.PI * 2,
        sp: 0.3 + Math.random() * 0.5,
        s: Math.floor(Math.random() * sprites.length),
      };
    };

    const makeFlake = (initial: boolean): Flake => {
      const bx = Math.random() * w;
      return {
        baseX: bx,
        x: bx,
        y: initial ? Math.random() * h : -4,
        r:
          Math.random() < 0.85
            ? 0.6 + Math.random() * 0.9
            : 1.5 + Math.random() * 1.1,
        a: 0.35 + Math.random() * 0.5,
        ph: Math.random() * Math.PI * 2,
        sp: 0.8 + Math.random() * 1.6,
        vy: 0.12 + Math.random() * 0.35,
        drift: 6 + Math.random() * 20,
        dph: Math.random() * Math.PI * 2,
        dsp: 0.15 + Math.random() * 0.35,
        c: flakeColors[Math.floor(Math.random() * flakeColors.length)],
      };
    };

    const build = () => {
      const orbDiv = isMobile ? 150000 : 110000;
      const orbCap = isMobile ? 12 : 30;
      const orbCount = Math.max(8, Math.min(orbCap, Math.round((w * h) / orbDiv)));
      orbs = Array.from({ length: orbCount }, () => spawnOrb(true));

      const flakeDiv = isMobile ? 22000 : 8500;
      const flakeCap = isMobile ? 60 : 180;
      const flakeCount = Math.max(
        40,
        Math.min(flakeCap, Math.round((w * h) / flakeDiv))
      );
      flakes = Array.from({ length: flakeCount }, () => makeFlake(true));
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let t = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);

      // Pause heavy drawing when hidden or scrolled past the hero (blurred).
      if (document.hidden || window.scrollY > h * 0.9) return;

      ctx.clearRect(0, 0, w, h);
      t += 0.016;

      ctx.globalCompositeOperation = "lighter";
      for (const p of orbs) {
        if (!reduce) {
          p.y -= p.vy;
          p.x += p.vx;
        }
        if (p.y < -p.r) Object.assign(p, spawnOrb(false));
        const tw = 0.65 + 0.35 * Math.sin(t * p.sp + p.ph);
        ctx.globalAlpha = p.a * tw;
        const d = p.r * 2;
        ctx.drawImage(sprites[p.s], p.x - p.r, p.y - p.r, d, d);
      }

      ctx.globalCompositeOperation = "source-over";
      for (const f of flakes) {
        if (!reduce) {
          f.y += f.vy;
          f.x = f.baseX + Math.sin(t * f.dsp + f.dph) * f.drift;
          if (f.y > h + 4) {
            f.y = -4;
            f.baseX = Math.random() * w;
          }
        }
        const tw = reduce ? 1 : 0.55 + 0.45 * Math.sin(t * f.sp + f.ph);
        ctx.globalAlpha = f.a * tw;
        ctx.fillStyle = f.c;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    if (reduce) {
      // draw a single static frame, no loop
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";
      for (const f of flakes) {
        ctx.globalAlpha = f.a;
        ctx.fillStyle = f.c;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}
