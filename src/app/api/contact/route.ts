import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";

export const runtime = "nodejs";

/**
 * Contact form handler.
 *
 * Validates input with Zod. To actually deliver emails, set RESEND_API_KEY
 * (or wire your provider of choice) and replace the "deliver" block below.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  const { name, email, message } = parsed.data;

  try {
    // ── Deliver ───────────────────────────────────────────────
    // Example with Resend (uncomment after `npm i resend` + set key):
    //
    // const { Resend } = await import("resend");
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "Portfolio <noreply@mehedihasanbd.tech>",
    //   to: "admin@mehedihasanbd.tech",
    //   replyTo: email,
    //   subject: `New message from ${name}`,
    //   text: message,
    // });

    // For now we log server-side so the form is fully functional in dev.
    console.log("[contact] new message", { name, email, message });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] delivery failed", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
