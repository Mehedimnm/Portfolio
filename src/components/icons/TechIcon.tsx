import type { ComponentType } from "react";
import { createElement } from "react";
import { SiStripe, SiGreensock } from "react-icons/si";
import { Cloud, Workflow, Cable, Webhook, Search, Share2, Boxes } from "lucide-react";
import { cn } from "@/lib/utils";

type IconComp = ComponentType<{
  size?: number | string;
  color?: string;
  className?: string;
}>;

type Entry =
  | { type: "img"; src: string; cls?: string }
  | { type: "comp"; Icon: IconComp; color: string };

/**
 * Authentic, full-color brand logos (Devicon SVGs in /public/tech) shown
 * directly on the dark theme.
 *  - `invert`  → pure-black logos become white so they stay visible.
 *  - brighten  → naturally dark logos (PostgreSQL navy, Redis dark-red) are
 *    lifted so they don't disappear on the dark background.
 * A few brands missing from Devicon fall back to colored vector icons.
 */
const TECH: Record<string, Entry> = {
  "react": { type: "img", src: "/tech/react.svg" },
  "next.js": { type: "img", src: "/tech/nextjs.svg", cls: "invert" },
  "typescript": { type: "img", src: "/tech/typescript.svg" },
  "javascript": { type: "img", src: "/tech/javascript.svg" },
  "html5": { type: "img", src: "/tech/html5.svg" },
  "css3": { type: "img", src: "/tech/css3.svg" },
  "bootstrap": { type: "img", src: "/tech/bootstrap.svg" },
  "tailwind css": { type: "img", src: "/tech/tailwindcss.svg" },
  "framer motion": { type: "img", src: "/tech/framermotion.svg", cls: "invert" },
  "three.js / r3f": { type: "img", src: "/tech/threejs.svg", cls: "invert" },
  "three.js": { type: "img", src: "/tech/threejs.svg", cls: "invert" },
  "node.js": { type: "img", src: "/tech/nodejs.svg" },
  "php": { type: "img", src: "/tech/php.svg" },
  "python": { type: "img", src: "/tech/python.svg" },
  "vite": { type: "img", src: "/tech/vite.svg" },
  "vite.js": { type: "img", src: "/tech/vite.svg" },
  "vitejs": { type: "img", src: "/tech/vite.svg" },
  "express": { type: "img", src: "/tech/express.svg", cls: "invert" },
  "nestjs": { type: "img", src: "/tech/nestjs.svg" },
  "graphql": { type: "img", src: "/tech/graphql.svg" },
  "rest & graphql": { type: "img", src: "/tech/graphql.svg" },
  "postgresql": { type: "img", src: "/tech/postgresql.svg", cls: "brightness-150 saturate-150" },
  "mysql": { type: "img", src: "/tech/mysql.svg", cls: "brightness-125" },
  "supabase": { type: "img", src: "/tech/supabase.svg" },
  "mongodb": { type: "img", src: "/tech/mongodb.svg" },
  "prisma": { type: "img", src: "/tech/prisma.svg", cls: "invert" },
  "redis": { type: "img", src: "/tech/redis.svg", cls: "brightness-150 saturate-150" },
  "docker": { type: "img", src: "/tech/docker.svg" },
  "wordpress": { type: "img", src: "/tech/wordpress.svg", cls: "brightness-[1.7]" },
  "git": { type: "img", src: "/tech/git.svg" },
  "figma": { type: "img", src: "/tech/figma.svg" },
  "socket.io": { type: "img", src: "/tech/socketio.svg", cls: "invert" },
  // Not in Devicon — colored vector fallbacks
  "stripe": { type: "comp", Icon: SiStripe, color: "#635BFF" },
  "gsap": { type: "comp", Icon: SiGreensock, color: "#0AE448" },
  // Concept skills (no brand logo) — themed vector icons
  "rest apis": { type: "comp", Icon: Webhook, color: "#F59E0B" },
  "seo": { type: "comp", Icon: Search, color: "#22C55E" },
  "smo": { type: "comp", Icon: Share2, color: "#DC2626" },
  // Generic fallbacks (no official logo)
  "aws": { type: "comp", Icon: Cloud, color: "#FF9900" },
  "ci/cd": { type: "comp", Icon: Workflow, color: "#F59E0B" },
  "websocket": { type: "comp", Icon: Cable, color: "#F59E0B" },
};

const FALLBACK: Entry = { type: "comp", Icon: Boxes, color: "#F59E0B" };

function getEntry(name: string): Entry {
  return TECH[name.trim().toLowerCase()] ?? FALLBACK;
}

type Props = {
  name: string;
  size?: number;
  className?: string;
};

/** Renders the high-res vector brand logo for a tech/framework name. */
export function TechIcon({ name, size = 16, className }: Props) {
  const entry = getEntry(name);

  if (entry.type === "img") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={entry.src}
        alt={`${name} logo`}
        width={size}
        height={size}
        draggable={false}
        loading="lazy"
        className={cn("inline-block shrink-0 align-middle", entry.cls, className)}
        style={{ width: size, height: size }}
      />
    );
  }

  return createElement(entry.Icon, { size, color: entry.color, className });
}
