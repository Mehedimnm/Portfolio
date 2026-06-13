import type { Skill } from "@/types";

export const skills: Skill[] = [
  // Frontend
  { name: "React", category: "Frontend", level: 95 },
  { name: "Next.js", category: "Frontend", level: 93 },
  { name: "TypeScript", category: "Frontend", level: 90 },
  { name: "Tailwind CSS", category: "Frontend", level: 92 },
  { name: "Framer Motion", category: "Frontend", level: 85 },
  { name: "Three.js / R3F", category: "Frontend", level: 75 },

  // Backend
  { name: "Node.js", category: "Backend", level: 90 },
  { name: "Express", category: "Backend", level: 88 },
  { name: "NestJS", category: "Backend", level: 80 },
  { name: "REST & GraphQL", category: "Backend", level: 85 },

  // Database
  { name: "PostgreSQL", category: "Database", level: 85 },
  { name: "MongoDB", category: "Database", level: 84 },
  { name: "Prisma", category: "Database", level: 82 },
  { name: "Redis", category: "Database", level: 72 },

  // DevOps
  { name: "Docker", category: "DevOps", level: 80 },
  { name: "AWS", category: "DevOps", level: 72 },
  { name: "CI/CD", category: "DevOps", level: 78 },

  // Tools
  { name: "Git", category: "Tools", level: 92 },
  { name: "Figma", category: "Tools", level: 78 },
];

export const skillCategories = [
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "Tools",
] as const;

/** Tech names used in the scrolling marquee. */
export const techMarquee = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "Tailwind CSS",
  "Docker",
  "GraphQL",
  "MongoDB",
  "AWS",
  "Redis",
];
