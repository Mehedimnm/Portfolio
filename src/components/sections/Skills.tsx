"use client";

import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechIcon } from "@/components/icons/TechIcon";
import { skills, skillCategories } from "@/data/skills";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

export function Skills() {
  return (
    <section id="skills" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02"
          eyebrow="Skills"
          title="The stack I build with"
          description="A toolkit refined across years of shipping full-stack products."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => {
            const items = skills.filter((s) => s.category === category);
            return (
              <motion.div
                key={category}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="glass rounded-2xl p-6"
              >
                <h3 className="font-mono text-sm font-medium text-accent">
                  {category}
                </h3>
                <motion.ul
                  variants={stagger(0.06)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  className="mt-5 space-y-4"
                >
                  {items.map((skill) => (
                    <motion.li key={skill.name} variants={fadeUp}>
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="flex items-center gap-2 text-sm text-foreground">
                          <TechIcon name={skill.name} size={16} />
                          {skill.name}
                        </span>
                        <span className="font-mono text-xs text-muted-2">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
                        <motion.div
                          className="h-full rounded-full bg-accent"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
