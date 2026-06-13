# 🔒 FIXED FONTS — READ BEFORE WRITING ANY UI / STYLE CODE

> **For every developer and every coding AI agent:**
> These are the **only** fonts allowed in this portfolio. Do **not** add,
> swap, or remove fonts. Do **not** introduce Google Fonts links, `@font-face`
> rules, or new `next/font` imports beyond the three below. If a design needs a
> style that is not covered here, ask the owner first.

## The allowed fonts

| # | Font family       | Weight / Style     | Role                          |
|---|-------------------|--------------------|-------------------------------|
| 1 | **IBM Plex Mono** | Regular — `400`    | Monospace text, code, labels  |
| 2 | **IBM Plex Mono** | Medium — `500`     | Monospace emphasis            |
| 3 | **IBM Plex Mono** | Bold — `700`       | Monospace strong emphasis     |
| 4 | **Funnel Display**| Light — `300`      | Headings / display text       |
| 5 | **DM Sans**       | Regular — `400`, optical size **9pt** (`opsz: 9`) | Body / default text |

That's it. Nothing else.

## How they are wired up

- Loaded with `next/font/google` in **`src/app/layout.tsx`** (self-hosted, no
  external requests).
- Exposed as CSS variables on `<html>`:
  - `--font-dm-sans`
  - `--font-ibm-plex-mono`
  - `--font-funnel-display`
- Exposed as Tailwind v4 theme tokens in **`src/app/globals.css`**:

| Token          | Maps to        | Use for            |
|----------------|----------------|--------------------|
| `font-sans`    | DM Sans        | body / default     |
| `font-display` | Funnel Display | headings / display |
| `font-mono`    | IBM Plex Mono  | code / labels      |

## Rules for using them

1. **Always use the tokens**, never hardcode a `font-family`.
   - Body text uses DM Sans automatically (set on `body`).
   - Headings/display: add the `font-display` class.
   - Code/labels: add the `font-mono` class.
2. **DM Sans must stay at optical size 9 and weight 400** for body text.
   This is pinned in `globals.css` via `font-variation-settings: "opsz" 9;`.
3. **Funnel Display is Light (300) only.** Don't use heavier Funnel weights.
4. **IBM Plex Mono** uses `400` / `500` / `700` only — control via
   `font-normal` / `font-medium` / `font-bold`.
5. Do not change font config without updating this file **and** `AGENTS.md`.

## Quick examples

```tsx
// Heading — Funnel Display Light
<h1 className="font-display text-5xl">Hello</h1>

// Body — DM Sans 9pt Regular (default, no class needed)
<p>Some body copy.</p>

// Code / label — IBM Plex Mono
<code className="font-mono">npm run dev</code>
<span className="font-mono font-medium">500 weight</span>
<span className="font-mono font-bold">700 weight</span>
```
