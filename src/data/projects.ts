import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "nova-commerce",
    title: "Nova Commerce",
    description:
      "A headless e-commerce platform with real-time inventory, Stripe checkout, and an admin dashboard. Sub-second page loads with edge caching.",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    image: "/projects/project-1.svg",
    liveUrl: "#",
    repoUrl: "#",
    featured: true,
    year: "2024",
  },
  {
    slug: "pulse-analytics",
    title: "Pulse Analytics",
    description:
      "Realtime analytics dashboard streaming millions of events with WebSockets, interactive charts, and customizable reports.",
    tags: ["React", "Node.js", "Redis", "WebSocket"],
    image: "/projects/project-2.svg",
    liveUrl: "#",
    repoUrl: "#",
    featured: true,
    year: "2024",
  },
  {
    slug: "atlas-cms",
    title: "Atlas CMS",
    description:
      "A modern headless CMS with a block-based editor, role-based access, and a typed GraphQL API powering multiple frontends.",
    tags: ["NestJS", "GraphQL", "Prisma", "Next.js"],
    image: "/projects/project-3.svg",
    liveUrl: "#",
    repoUrl: "#",
    featured: true,
    year: "2023",
  },
  {
    slug: "orbit-chat",
    title: "Orbit Chat",
    description:
      "End-to-end encrypted team messaging app with presence, threads, and file sharing — built for speed on any device.",
    tags: ["React", "Socket.io", "MongoDB", "Docker"],
    image: "/projects/project-4.svg",
    liveUrl: "#",
    repoUrl: "#",
    year: "2023",
  },
];
