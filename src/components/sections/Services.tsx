"use client";

import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

export function Services() {
  return (
    <section id="services" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="05"
          eyebrow="Services"
          title="How I can help you"
        />

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={fadeUp}
                className="group glass relative overflow-hidden rounded-2xl p-6 transition-colors hover:border-accent-2/40"
              >
                <div
                  aria-hidden
                  className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "var(--accent-glow)" }}
                />
                <span className="inline-flex rounded-xl border border-border p-3 text-accent">
                  <Icon size={24} />
                </span>
                <h3 className="font-display mt-5 text-xl text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
