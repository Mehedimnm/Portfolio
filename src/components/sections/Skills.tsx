"use client";

import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechIcon } from "@/components/icons/TechIcon";
import { Counter } from "@/components/ui/Counter";
import { skills, skillCategories, proficiencyLabel } from "@/data/skills";
import { focusIn, stagger, viewportOnce } from "@/lib/motion";

export function Skills() {
  return (
    <section id="skills" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02"
          eyebrow="Skills"
          title="The stack I build with"
          description="A toolkit refined across years of shipping full-stack products — front to back, database to deployment, plus content and growth."
        />

        <div className="mt-16 space-y-14">
          {skillCategories.map((category) => {
            const items = skills.filter((s) => s.category === category);
            return (
              <div key={category}>
                {/* Category label */}
                <div className="mb-6 flex items-center gap-4">
                  <span className="font-mono text-sm text-accent">
                    {category}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                  <span className="font-mono text-xs text-muted-2">
                    {String(items.length).padStart(2, "0")}
                  </span>
                </div>

                {/* Tech tiles */}
                <motion.div
                  variants={stagger(0.06)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
                >
                  {items.map((skill) => {
                    const level = skill.level ?? 80;
                    return (
                      <motion.div
                        key={skill.name}
                        variants={focusIn}
                        className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-border bg-surface/30 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-2/50 hover:bg-surface/60 hover:shadow-[0_0_44px_-12px_var(--accent-2-glow)]"
                      >
                        {/* hover glow */}
                        <div
                          aria-hidden
                          className="pointer-events-none absolute -top-12 right-0 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                          style={{ background: "var(--accent-glow)" }}
                        />

                        {/* top row: logo + percent */}
                        <div className="relative flex items-center justify-between">
                          <TechIcon
                            name={skill.name}
                            size={34}
                            className="transition-transform duration-300 group-hover:scale-110"
                          />
                          <Counter
                            value={level}
                            className="font-mono text-sm font-medium text-accent"
                          />
                        </div>

                        {/* name */}
                        <span className="relative font-mono text-sm text-foreground">
                          {skill.name}
                        </span>

                        {/* progress bar */}
                        <div className="relative h-1.5 overflow-hidden rounded-full bg-surface-2">
                          <motion.div
                            className="h-full rounded-full"
                            style={{
                              background:
                                "linear-gradient(90deg, var(--accent-bright), var(--accent), var(--accent-2))",
                            }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${level}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1.1,
                              ease: [0.22, 1, 0.36, 1],
                              delay: 0.1,
                            }}
                          />
                        </div>

                        {/* proficiency label */}
                        <span className="relative font-mono text-[0.7rem] uppercase tracking-wider text-muted-2">
                          {proficiencyLabel(level)}
                        </span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
