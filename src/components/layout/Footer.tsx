"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { navLinks, site, socialLinks } from "@/data/site";
import { fadeUp, viewportOnce } from "@/lib/motion";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col gap-10"
        >
          {/* CTA line */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-sm text-accent">Got a project?</p>
              <a
                href={site.social.email}
                className="font-display mt-2 inline-flex items-center gap-2 text-4xl text-foreground transition-colors hover:text-accent-2 sm:text-5xl"
              >
                Let&apos;s build it
                <ArrowUpRight className="text-accent" size={32} />
              </a>
            </div>

            <div className="flex gap-3">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="rounded-full border border-border p-3 text-muted transition-colors hover:border-accent-2 hover:text-accent-2"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-xs text-muted-2">
              © {year} {site.name}. All rights reserved.
            </p>
            <ul className="flex flex-wrap gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-mono text-xs text-muted transition-colors hover:text-accent-2"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
