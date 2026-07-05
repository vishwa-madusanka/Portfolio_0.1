import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

/* ─── Validation helpers ────────────────────────────────────────────────── */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateBody(body: unknown): { name: string; email: string; message: string; website: string } | null {
  if (!body || typeof body !== "object") return null
  const b = body as Record<string, unknown>
  if (
    typeof b.name    !== "string" || !b.name.trim()    ||
    typeof b.email   !== "string" || !b.email.trim()   ||
    typeof b.message !== "string" || !b.message.trim()
  ) return null
  return {
    name:    (b.name    as string).trim(),
    email:   (b.email   as string).trim(),
    message: (b.message as string).trim(),
    website: typeof b.website === "string" ? b.website : "",
  }
}

/* ─── Route handler ─────────────────────────────────────────────────────── */

export async function POST(req: NextRequest) {
  /* 1 — Parse body */
  let rawBody: unknown
  try {
    rawBody = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  /* 2 — Validate fields */
  const fields = validateBody(rawBody)
  if (!fields) {
    return NextResponse.json(
      { error: "Name, email and message are all required." },
      { status: 400 },
    )
  }

  const { name, email, message, website } = fields

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    )
  }

  if (message.length > 5000) {
    return NextResponse.json(
      { error: "Message must be under 5,000 characters." },
      { status: 400 },
    )
  }

  /* 3 — Honeypot: if 'website' is filled a bot submitted the form.
         Return 200 so the bot thinks it succeeded — don't send anything. */
  if (website.length > 0) {
    return NextResponse.json({ ok: true })
  }

  /* 4 — Send via Resend */
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set")
    return NextResponse.json(
      { error: "Server misconfiguration — please try another way to reach me." },
      { status: 500 },
    )
  }

  const resend = new Resend(apiKey)

  const { error: resendError } = await resend.emails.send({
    from:     "Portfolio Contact <onboarding@resend.dev>",
    to:       ["vishwamadusanka1022@gmail.com"],
    reply_to: email,
    subject:  `Portfolio contact from ${name}`,
    html: `
      <div style="font-family: monospace; max-width: 600px; color: #13293D;">
        <h2 style="margin-bottom: 4px;">New message from your portfolio</h2>
        <hr style="border: 1px solid #7FA8C9; margin: 12px 0;" />
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="border-left: 3px solid #FF6B35; margin: 0; padding: 8px 16px; white-space: pre-wrap;">${escapeHtml(message)}</blockquote>
        <hr style="border: 1px solid #7FA8C9; margin: 12px 0;" />
        <p style="color: #7FA8C9; font-size: 11px;">
          Sent via vishwa.dev portfolio contact form.<br/>
          Reply to this email to respond directly to ${escapeHtml(email)}.
        </p>
      </div>
    `,
  })

  if (resendError) {
    console.error("[contact] Resend error:", resendError)
    return NextResponse.json(
      { error: "Failed to send — please try emailing me directly." },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true })
}

/* ─── Utility ───────────────────────────────────────────────────────────── */

function escapeHtml(str: string): string {
  return str
    .replace(/&/g,  "&amp;")
    .replace(/</g,  "&lt;")
    .replace(/>/g,  "&gt;")
    .replace(/"/g,  "&quot;")
    .replace(/'/g,  "&#039;")
}
