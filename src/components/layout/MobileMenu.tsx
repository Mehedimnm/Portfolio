"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { navLinks, socialLinks } from "@/data/site";
import { ease } from "@/lib/motion";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.nav
            className="absolute right-0 top-0 flex h-full w-[78%] max-w-sm flex-col gap-8 border-l border-border bg-background-soft p-8"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: ease.inOut }}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-muted">menu</span>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="rounded-full border border-border p-2 text-muted transition-colors hover:text-accent-2"
              >
                <X size={18} />
              </button>
            </div>

            <ul className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.06, ease: ease.out }}
                >
                  <a
                    href={link.href}
                    onClick={onClose}
                    className="font-display block py-2 text-3xl text-foreground transition-colors hover:text-accent-2"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="mt-auto flex gap-4">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="rounded-full border border-border p-3 text-muted transition-colors hover:border-accent-2 hover:text-accent-2"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
