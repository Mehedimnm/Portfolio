import type { Skill } from "@/types";

export const skills: Skill[] = [
  // Frontend
  { name: "HTML5", category: "Frontend", level: 96 },
  { name: "CSS3", category: "Frontend", level: 93 },
  { name: "JavaScript", category: "Frontend", level: 92 },
  { name: "TypeScript", category: "Frontend", level: 90 },
  { name: "React", category: "Frontend", level: 95 },
  { name: "Next.js", category: "Frontend", level: 93 },
  { name: "Tailwind CSS", category: "Frontend", level: 92 },
  { name: "Bootstrap", category: "Frontend", level: 86 },
  { name: "Vite", category: "Frontend", level: 86 },
  { name: "Framer Motion", category: "Frontend", level: 85 },
  { name: "Three.js / R3F", category: "Frontend", level: 75 },

  // Backend
  { name: "Node.js", category: "Backend", level: 90 },
  { name: "Express", category: "Backend", level: 88 },
  { name: "PHP", category: "Backend", level: 84 },
  { name: "Python", category: "Backend", level: 80 },
  { name: "NestJS", category: "Backend", level: 80 },
  { name: "REST APIs", category: "Backend", level: 91 },
  { name: "GraphQL", category: "Backend", level: 82 },

  // Database
  { name: "PostgreSQL", category: "Database", level: 85 },
  { name: "MySQL", category: "Database", level: 86 },
  { name: "MongoDB", category: "Database", level: 84 },
  { name: "Supabase", category: "Database", level: 83 },
  { name: "Prisma", category: "Database", level: 82 },
  { name: "Redis", category: "Database", level: 72 },

  // DevOps
  { name: "Docker", category: "DevOps", level: 80 },
  { name: "AWS", category: "DevOps", level: 72 },
  { name: "CI/CD", category: "DevOps", level: 78 },

  // CMS & Marketing
  { name: "WordPress", category: "CMS & Marketing", level: 88 },
  { name: "SEO", category: "CMS & Marketing", level: 82 },
  { name: "SMO", category: "CMS & Marketing", level: 78 },

  // Tools
  { name: "Git", category: "Tools", level: 92 },
  { name: "Figma", category: "Tools", level: 78 },
];

export const skillCategories = [
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "CMS & Marketing",
  "Tools",
] as const;

/** Tech names used in the scrolling marquee. */
export const techMarquee = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "Bootstrap",
  "Node.js",
  "PHP",
  "Python",
  "Vite",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Supabase",
  "Prisma",
  "Docker",
  "GraphQL",
  "WordPress",
];

/** Proficiency label from a 0–100 level. */
export function proficiencyLabel(level: number): string {
  if (level >= 90) return "Expert";
  if (level >= 80) return "Advanced";
  if (level >= 70) return "Proficient";
  return "Intermediate";
}
