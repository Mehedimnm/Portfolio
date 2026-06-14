"use client";

import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillCard } from "@/components/ui/SkillCard";
import { skills, skillCategories } from "@/data/skills";
import { focusIn, stagger, viewportOnce } from "@/lib/motion";

export function Skills() {
  return (
    <section id="skills" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02"
          eyebrow="Skills"
          title="The stack I build with"
          description="A toolkit refined across years of shipping full-stack products — hover any card to feel it."
        />

        <div className="mt-16 space-y-12">
          {skillCategories.map((category) => {
            const items = skills.filter((s) => s.category === category);
            return (
              <div key={category}>
                <div className="mb-5 flex items-center gap-4">
                  <span className="font-mono text-sm text-accent">
                    {category}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                  <span className="font-mono text-xs text-muted-2">
                    {String(items.length).padStart(2, "0")}
                  </span>
                </div>

                <motion.div
                  variants={stagger(0.06)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
                >
                  {items.map((skill) => (
                    <motion.div key={skill.name} variants={focusIn}>
                      <SkillCard name={skill.name} level={skill.level ?? 80} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
