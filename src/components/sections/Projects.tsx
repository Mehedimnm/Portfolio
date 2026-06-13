"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { GithubIcon } from "@/components/icons/BrandIcons";
import { TechIcon } from "@/components/icons/TechIcon";
import { projects } from "@/data/projects";
import { fadeUp, viewportOnce } from "@/lib/motion";

export function Projects() {
  return (
    <section id="work" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="04"
          eyebrow="Work"
          title="Selected projects"
          description="A few products I've designed, built, and shipped end-to-end."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={{ delay: (i % 2) * 0.1 }}
            >
              <TiltCard className="glass h-full">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  {project.featured && (
                    <span className="absolute right-4 top-4 rounded-full bg-accent/90 px-3 py-1 font-mono text-xs font-medium text-background">
                      Featured
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-4 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-2xl text-foreground">
                      {project.title}
                    </h3>
                    <span className="font-mono text-xs text-muted-2">
                      {project.year}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 font-mono text-xs text-muted"
                      >
                        <TechIcon name={tag} size={13} />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 flex items-center gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-sm text-foreground transition-colors hover:text-accent-2"
                      >
                        Live <ArrowUpRight size={15} />
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-sm text-muted transition-colors hover:text-accent-2"
                      >
                        <GithubIcon size={15} /> Code
                      </a>
                    )}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
