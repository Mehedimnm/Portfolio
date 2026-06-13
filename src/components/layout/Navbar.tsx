"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { navLinks, site } from "@/data/site";
import { cn } from "@/lib/utils";
import { ease } from "@/lib/motion";
import { NavName } from "@/components/ui/NavName";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setPastHero(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: ease.out, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4"
      >
        <nav
          className={cn(
            "flex w-full max-w-5xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500",
            scrolled
              ? "glass shadow-card"
              : "border border-transparent bg-transparent"
          )}
        >
          {/* Logo */}
          <a href="#home" className="group flex items-center gap-2.5">
            <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-accent font-mono text-sm font-bold text-background transition-transform group-hover:scale-110">
              {pastHero ? (
                <Image
                  src={site.profileImage}
                  alt={site.name}
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              ) : (
                "M"
              )}
            </span>
            <NavName
              text={site.name}
              className="font-mono text-sm text-foreground"
            />
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-4 py-2 font-mono text-sm text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + mobile trigger */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden rounded-full bg-foreground px-5 py-2 font-mono text-sm font-medium text-background transition-all hover:bg-accent-2 hover:shadow-[0_0_50px_-12px_rgba(220,38,38,0.7)] md:inline-block"
            >
              Let&apos;s talk
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="rounded-full border border-border p-2 text-foreground transition-colors hover:text-accent-2 md:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
