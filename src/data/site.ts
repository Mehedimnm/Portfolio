import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import type { NavLink, SocialLink } from "@/types";

export const site = {
  name: "MD Mehedi Hasan",
  shortName: "Mehedi",
  role: "Full Stack Developer",
  title: "MD Mehedi Hasan — Full Stack Developer",
  description:
    "Full Stack Developer crafting fast, scalable web applications with delightful, detail-obsessed user experiences.",
  email: "admin@mehedihasanbd.tech",
  location: "Bangladesh",
  url: "https://mehedihasanbd.tech",
  profileImage: "/profile.jpg",
  cvUrl: "/cv.pdf",

  // Short intro used in the hero
  tagline: "I build end-to-end web products — from pixel-perfect interfaces to robust backends.",

  social: {
    github: "https://github.com/Mehedimnm",
    linkedin: "https://www.linkedin.com/in/md-mehedi-hasan-886205249",
    email: "mailto:admin@mehedihasanbd.tech",
  },
} as const;

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
