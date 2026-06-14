import type { ComponentType, SVGProps } from "react";

/** Generic icon component type — works for both lucide and our brand SVGs. */
export type IconType = ComponentType<
  SVGProps<SVGSVGElement> & { size?: number | string }
>;

export type NavLink = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: IconType;
};

export type Skill = {
  name: string;
  level?: number; // 0–100
  category:
    | "Frontend"
    | "Backend"
    | "Database"
    | "DevOps"
    | "CMS & Marketing"
    | "Tools";
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  year?: string;
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  description: string;
  stack?: string[];
};

export type Service = {
  title: string;
  description: string;
  icon: IconType;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};
