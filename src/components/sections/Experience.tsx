"use client";

import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechIcon } from "@/components/icons/TechIcon";
import { experience } from "@/data/experience";
import { fadeUp, viewportOnce } from "@/lib/motion";

export function Experience() {
  return (
    <section id="experience" className="relative px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          index="03"
          eyebrow="Experience"
          title="Where I've made an impact"
        />

        <div className="relative mt-14 pl-8">
          {/* Timeline line */}
          <div className="absolute left-0 top-2 h-full w-px bg-border" />

          <div className="space-y-12">
            {experience.map((item, i) => (
              <motion.div
                key={`${item.company}-${i}`}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="relative"
              >
                {/* Node */}
                <span className="absolute -left-8 top-1.5 grid h-4 w-4 -translate-x-1/2 place-items-center">
                  <span className="absolute h-4 w-4 animate-ping rounded-full bg-accent/30" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-background" />
                </span>

                <span className="font-mono text-xs text-accent">
                  {item.period}
                </span>
                <h3 className="font-display mt-2 text-2xl text-foreground">
                  {item.role}
                </h3>
                <p className="font-mono text-sm text-muted-2">{item.company}</p>
                <p className="mt-3 max-w-2xl text-muted">{item.description}</p>

                {item.stack && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.stack.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 font-mono text-xs text-muted"
                      >
                        <TechIcon name={tech} size={13} />
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
