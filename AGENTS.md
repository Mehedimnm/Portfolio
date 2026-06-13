<!-- BEGIN:fixed-fonts-rules -->
# 🔒 FIXED FONTS — READ FIRST, BEFORE ANY UI / STYLE WORK

This project has a **locked set of fonts**. Before writing or editing ANY
component, page, CSS, or Tailwind class, read **[`FONTS.md`](./FONTS.md)**.

The ONLY allowed fonts are:

- **IBM Plex Mono** — Regular (400), Medium (500), Bold (700) → token `font-mono`
- **Funnel Display** — Light (300) → token `font-display`
- **DM Sans** — Regular (400), optical size 9pt → token `font-sans` (body default)

Do **not** add, swap, or remove fonts. Do **not** add Google Fonts `<link>`s,
`@font-face`, or new `next/font` imports. Use the Tailwind tokens
(`font-sans`, `font-display`, `font-mono`) — never hardcode a `font-family`.
Fonts are configured in `src/app/layout.tsx` and `src/app/globals.css`.
<!-- END:fixed-fonts-rules -->

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
