"use client";

import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechSphere } from "@/components/ui/TechSphere";
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

      {/* Tech stack — interactive 3D globe */}
      <div className="relative mt-16">
        <p className="mb-2 px-6 text-center font-mono text-xs uppercase tracking-[0.3em] text-muted-2">
          Technologies I work with
        </p>
        <p className="mb-2 px-6 text-center font-mono text-[0.7rem] text-muted-2/70">
          drag to explore
        </p>
        <TechSphere items={techMarquee} />
      </div>
    </section>
  );
}
