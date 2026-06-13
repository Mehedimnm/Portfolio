import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: "var(--accent-glow)" }}
      />
      <p className="font-display text-gradient glow-text text-8xl sm:text-9xl">
        404
      </p>
      <h1 className="font-display mt-4 text-3xl text-foreground">
        Page not found
      </h1>
      <p className="mt-3 max-w-sm text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent px-6 py-3 font-mono text-sm font-medium text-background transition-all hover:shadow-[0_0_50px_-12px_rgba(220,38,38,0.7)]"
      >
        Back home
      </Link>
    </section>
  );
}
