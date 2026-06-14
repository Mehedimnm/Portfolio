"use client";

import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Marquee } from "@/components/ui/Marquee";
import { TechIcon } from "@/components/icons/TechIcon";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { stats } from "@/data/services";
import { techMarquee } from "@/data/skills";

export function About() {
  return (
    <section id="about" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="01"
          eyebrow="About"
          title="Turning ideas into fast, elegant products"
        />

        <div className="mt-14 grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="space-y-6 text-lg leading-relaxed text-muted"
          >
            <motion.p variants={fadeUp}>
              I&apos;m{" "}
              <span className="text-foreground">MD Mehedi Hasan</span>, a full
              stack developer who loves building things for the web — from the
              tiniest interaction detail to the architecture that keeps it all
              running smoothly under load.
            </motion.p>
            <motion.p variants={fadeUp}>
              My toolkit spans the modern JavaScript ecosystem: React and
              Next.js on the front, Node.js, databases, and cloud infrastructure
              on the back. I care deeply about performance, accessibility, and
              code that&apos;s a pleasure to maintain.
            </motion.p>
            <motion.p variants={fadeUp}>
              When I&apos;m not shipping features, I&apos;m exploring animation,
              3D on the web, and new ways to make interfaces feel alive.
            </motion.p>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                className="glass flex flex-col justify-center rounded-2xl p-6"
              >
                <span className="font-display text-gradient text-4xl">
                  {s.value}
                </span>
                <span className="mt-2 font-mono text-xs text-muted">
                  {s.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Tech stack — premium dual-row chip marquee */}
      <div className="relative mt-20">
        <p className="mb-6 px-6 text-center font-mono text-xs uppercase tracking-[0.3em] text-muted-2">
          Technologies I work with
        </p>
        <div className="space-y-4 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
          <Marquee speed={42}>
            {techMarquee
              .slice(0, Math.ceil(techMarquee.length / 2))
              .map((t, i) => (
                <TechChip key={`a-${t}-${i}`} name={t} />
              ))}
          </Marquee>
          <Marquee speed={46} reverse>
            {techMarquee
              .slice(Math.ceil(techMarquee.length / 2))
              .map((t, i) => (
                <TechChip key={`b-${t}-${i}`} name={t} />
              ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

/** A single glass chip in the tech marquee. */
function TechChip({ name }: { name: string }) {
  return (
    <span className="group inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/40 px-5 py-2.5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-2/50 hover:bg-surface/70 hover:shadow-[0_0_30px_-10px_var(--accent-2-glow)]">
      <TechIcon
        name={name}
        size={22}
        className="transition-transform duration-300 group-hover:scale-110"
      />
      <span className="whitespace-nowrap font-mono text-sm text-foreground">
        {name}
      </span>
    </span>
  );
}
