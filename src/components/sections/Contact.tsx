"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Mail, MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { site } from "@/data/site";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrors({});
    setMessage("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrors(json.issues ?? {});
        setMessage(json.error ?? "Something went wrong.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  const fieldClass =
    "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-2 focus:border-accent";

  return (
    <section id="contact" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="07"
          eyebrow="Contact"
          title="Let's work together"
          description="Have a project in mind or just want to say hi? Drop a message."
        />

        <div className="mt-14 grid gap-12 md:grid-cols-[1fr_1.2fr]">
          {/* Left — info */}
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-6"
          >
            <motion.a
              variants={fadeUp}
              href={site.social.email}
              className="glass group flex items-center gap-4 rounded-2xl p-5 transition-colors hover:border-accent-2/40"
            >
              <span className="rounded-xl border border-border p-3 text-accent">
                <Mail size={20} />
              </span>
              <span>
                <span className="block font-mono text-xs text-muted-2">
                  Email
                </span>
                <span className="text-sm text-foreground transition-colors group-hover:text-accent-2">
                  {site.email}
                </span>
              </span>
            </motion.a>

            <motion.div
              variants={fadeUp}
              className="glass flex items-center gap-4 rounded-2xl p-5"
            >
              <span className="rounded-xl border border-border p-3 text-accent">
                <MapPin size={20} />
              </span>
              <span>
                <span className="block font-mono text-xs text-muted-2">
                  Location
                </span>
                <span className="text-sm text-foreground">{site.location}</span>
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className="flex gap-3">
              <a
                href={site.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="rounded-full border border-border p-3 text-muted transition-colors hover:border-accent-2 hover:text-accent-2"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-full border border-border p-3 text-muted transition-colors hover:border-accent-2 hover:text-accent-2"
              >
                <LinkedinIcon size={18} />
              </a>
            </motion.div>
          </motion.div>

          {/* Right — form */}
          <motion.form
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            onSubmit={handleSubmit}
            className="glass flex flex-col gap-5 rounded-2xl p-6 sm:p-8"
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block font-mono text-xs text-muted"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className={fieldClass}
                />
                {errors.name && (
                  <p className="mt-1.5 font-mono text-xs text-accent-deep">
                    {errors.name[0]}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block font-mono text-xs text-muted"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@email.com"
                  className={fieldClass}
                />
                {errors.email && (
                  <p className="mt-1.5 font-mono text-xs text-accent-deep">
                    {errors.email[0]}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block font-mono text-xs text-muted"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell me about your project..."
                className={cn(fieldClass, "resize-none")}
              />
              {errors.message && (
                <p className="mt-1.5 font-mono text-xs text-accent-deep">
                  {errors.message[0]}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-mono text-sm font-medium text-background transition-all hover:shadow-[0_0_50px_-12px_rgba(220,38,38,0.7)] disabled:opacity-60",
                status === "success" && "bg-emerald-500"
              )}
            >
              {status === "loading" && (
                <Loader2 size={16} className="animate-spin" />
              )}
              {status === "success" && <CheckCircle2 size={16} />}
              {status === "idle" && <Send size={16} />}
              {status === "error" && <Send size={16} />}
              {status === "loading"
                ? "Sending..."
                : status === "success"
                  ? "Message sent!"
                  : "Send message"}
            </button>

            {status === "error" && message && (
              <p className="font-mono text-xs text-accent-deep">{message}</p>
            )}
            {status === "success" && (
              <p className="font-mono text-xs text-emerald-400">
                Thanks! I&apos;ll get back to you soon.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
