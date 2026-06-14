import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import type { NavLink, SocialLink } from "@/types";

export const site = {
  name: "MD Mehedi Hasan",
  shortName: "Mehedi",
  role: "Full Stack Developer",
  title: "MD Mehedi Hasan — Full Stack Web Developer",
  description:
    "MD Mehedi Hasan is a full stack web developer building fast, scalable websites and web apps with React, Next.js, Node.js, PHP and WordPress — available worldwide for remote work, with SEO & performance optimization.",
  email: "admin@mehedihasanbd.tech",
  location: "Bangladesh",
  url: "https://www.mehedihasanbd.tech",
  profileImage: "/profile-v2.jpg",
  cvUrl: "/cv.pdf",

  // Short intro used in the hero
  tagline: "I build end-to-end web products — from pixel-perfect interfaces to robust backends.",

  social: {
    github: "https://github.com/Mehedimnm",
    linkedin: "https://www.linkedin.com/in/md-mehedi-hasan-886205249",
    email: "mailto:admin@mehedihasanbd.tech",
  },
} as const;

/** Keyword set targeting the services Mehedi offers (for SEO). */
export const seoKeywords = [
  "MD Mehedi Hasan",
  "Mehedi Hasan developer",
  "Mehedi Hasan portfolio",
  "Full Stack Developer",
  "Full Stack Web Developer",
  "Web Developer",
  "Full Stack Developer portfolio",
  "Web Developer portfolio",
  "Hire Full Stack Developer",
  "Hire Web Developer",
  "Freelance Full Stack Developer",
  "Remote Full Stack Developer",
  "React Developer",
  "Next.js Developer",
  "Node.js Developer",
  "PHP Developer",
  "WordPress Developer",
  "JavaScript Developer",
  "TypeScript Developer",
  "Frontend Developer",
  "Backend Developer",
  "SEO Expert",
  "Full Stack Developer Bangladesh",
  "mehedihasanbd",
];

/** What Mehedi works with — used in structured data (knowsAbout). */
export const expertise = [
  "Web Development",
  "Full Stack Development",
  "Frontend Development",
  "Backend Development",
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "JavaScript",
  "PHP",
  "Python",
  "WordPress",
  "REST APIs",
  "GraphQL",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "SEO",
  "Web Performance Optimization",
];

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: site.social.github, icon: GithubIcon },
  { label: "LinkedIn", href: site.social.linkedin, icon: LinkedinIcon },
  { label: "Email", href: site.social.email, icon: Mail },
];
