"use client";

import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/services";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

export function Testimonials() {
  return (
    <section id="testimonials" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="06"
          eyebrow="Testimonials"
          title="Kind words from clients"
        />

        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.figure
              key={t.author}
              variants={fadeUp}
              className="glass flex flex-col rounded-2xl p-6"
            >
              <Quote className="text-accent" size={28} />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <p className="font-mono text-sm font-medium text-foreground">
                  {t.author}
                </p>
                <p className="font-mono text-xs text-muted-2">{t.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
