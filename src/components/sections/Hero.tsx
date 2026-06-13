"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { site, socialLinks } from "@/data/site";
import { AnimatedName } from "@/components/ui/AnimatedName";
import { Button } from "@/components/ui/Button";
import { ease } from "@/lib/motion";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 pb-16"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[1.3fr_1fr]">
        {/* Left — copy */}
        <div className="flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: ease.out }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 font-mono text-xs text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Available for work
          </motion.div>

          <h1 className="font-display text-5xl leading-[1.05] drop-shadow-[0_0_30px_rgba(245,158,11,0.18)] sm:text-7xl lg:text-8xl">
            <AnimatedName lines={["MD Mehedi", "Hasan"]} />
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-3 font-mono text-base text-accent sm:text-lg"
          >
            {site.role}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: ease.out }}
            className="mt-6 max-w-md text-balance text-muted"
          >
            {site.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8, ease: ease.out }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button href="#work">
              View my work <ArrowUpRight size={16} />
            </Button>
            <Button href={site.cvUrl} variant="outline" download>
              Download CV <Download size={16} />
            </Button>
            <Button href="#contact" variant="ghost">
              Get in touch
            </Button>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-10 flex items-center gap-4"
          >
            <span className="font-mono text-xs text-muted-2">Follow</span>
            <span className="h-px w-8 bg-border" />
            {socialLinks.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-muted transition-colors hover:text-accent-2"
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </motion.div>
        </div>

        {/* Right — portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1, ease: ease.out }}
          className="relative mx-auto w-full max-w-sm"
        >
          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            {/* Soft radial glow behind the subject */}
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[115%] w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[60px]"
              style={{
                background:
                  "radial-gradient(circle at 50% 45%, var(--accent-glow), transparent 65%)",
              }}
            />
            {/* Portrait — background masked away so it melts into the page */}
            <Image
              src={site.profileImage}
              alt={site.name}
              width={560}
              height={680}
              priority
              className="relative h-auto w-full select-none object-contain"
              style={{
                WebkitMaskImage:
                  "radial-gradient(115% 115% at 50% 42%, #000 52%, transparent 78%), linear-gradient(to bottom, #000 60%, transparent 96%)",
                maskImage:
                  "radial-gradient(115% 115% at 50% 42%, #000 52%, transparent 78%), linear-gradient(to bottom, #000 60%, transparent 96%)",
                WebkitMaskComposite: "source-in",
                maskComposite: "intersect",
              }}
            />

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="glass absolute -bottom-2 -left-2 rounded-2xl px-4 py-3"
            >
              <p className="font-mono text-xs text-muted">Currently</p>
              <p className="font-mono text-sm font-medium text-foreground">
                Building cool stuff
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-2"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="block"
        >
          <ArrowDown size={20} />
        </motion.span>
      </motion.a>
    </section>
  );
}
