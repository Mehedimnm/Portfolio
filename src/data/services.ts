import { Code2, Server, Layout, Rocket } from "lucide-react";
import type { Service, Testimonial } from "@/types";

export const services: Service[] = [
  {
    title: "Web App Development",
    description:
      "Full-stack web applications built with Next.js, React and Node.js — fast, scalable, and production-ready.",
    icon: Code2,
  },
  {
    title: "Frontend Engineering",
    description:
      "Pixel-perfect, accessible interfaces with delightful motion and rock-solid performance scores.",
    icon: Layout,
  },
  {
    title: "Backend & APIs",
    description:
      "Robust REST and GraphQL APIs, databases, auth, and integrations designed to scale gracefully.",
    icon: Server,
  },
  {
    title: "Performance & DevOps",
    description:
      "Optimization, CI/CD pipelines, containerization and cloud deployments for smooth shipping.",
    icon: Rocket,
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Mehedi delivered beyond expectations. The product was fast, polished, and exactly what we envisioned. A rare developer who gets both code and design.",
    author: "Sarah Mitchell",
    role: "Product Lead, NovaTech",
  },
  {
    quote:
      "Incredible attention to detail and communication. Our app's performance and UX improved dramatically after working with him.",
    author: "David Chen",
    role: "Founder, Pulse",
  },
  {
    quote:
      "One of the most reliable engineers we've worked with. Ships clean, maintainable code and meets every deadline.",
    author: "Amelia Rodriguez",
    role: "CTO, Atlas",
  },
];

export const stats = [
  { value: "5+", label: "Years experience" },
  { value: "40+", label: "Projects delivered" },
  { value: "30+", label: "Happy clients" },
  { value: "100%", label: "Commitment" },
];
