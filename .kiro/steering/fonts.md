---
inclusion: always
---

# 🔒 Fixed Fonts (project rule)

This portfolio uses a **locked set of fonts**. Before writing or editing any
component, page, CSS, or Tailwind class, follow these rules. Full details live
in `FONTS.md` at the repo root.

## The only allowed fonts

- **IBM Plex Mono** — Regular (400), Medium (500), Bold (700) → token `font-mono`
- **Funnel Display** — Light (300) → token `font-display`
- **DM Sans** — Regular (400), optical size 9pt (`opsz: 9`) → token `font-sans` (body default)

## Rules

1. Never add, swap, or remove fonts. No new Google Fonts `<link>`, no
   `@font-face`, no extra `next/font` imports beyond the three above.
2. Always use the Tailwind tokens — `font-sans`, `font-display`, `font-mono`.
   Never hardcode a `font-family`.
3. DM Sans body text stays at weight 400 and optical size 9 (pinned in
   `globals.css` via `font-variation-settings: "opsz" 9`).
4. Funnel Display is Light (300) only. IBM Plex Mono uses 400/500/700 only.
5. Fonts are configured in `src/app/layout.tsx` and `src/app/globals.css`.
   Update `FONTS.md` and `AGENTS.md` if the font setup ever changes.
