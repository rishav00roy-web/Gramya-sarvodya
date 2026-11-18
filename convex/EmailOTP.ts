import { Email } from "@convex-dev/auth/providers/Email";
import { ConvexError } from "convex/values";

/* Sign-in by a six-digit code sent to the member's email. The code lasts
   15 minutes; Convex Auth limits wrong guesses per hour.

   Two free senders are supported:
   - Brevo (AUTH_BREVO_KEY): free plan, and it can send from a single
     verified address such as the Foundation's Gmail, so no domain is needed.
   - Resend (AUTH_RESEND_KEY): free plan, but it sends to anyone only from a
     domain verified with Resend.
   AUTH_EMAIL_FROM is the sender address (for Brevo, the verified one). */
function sixDigits() {
  const n = new Uint32Array(1);
  crypto.getRandomValues(n);
  return String(n[0] % 1_000_000).padStart(6, "0");
}

const NAME = "Gramya Sarvodaya Foundation";

function message(token: string) {
  return {
    subject: `${token} is your Gramya Sarvodaya sign-in code`,
    text: `Your sign-in code is ${token}.\n\nIt works for 15 minutes. If you did not ask for it, you can ignore this email.\n\n${NAME}`,
    html: `<div style="font-family:system-ui,sans-serif;color:#15241a;max-width:28rem"><p>Your sign-in code for the ${NAME} website is:</p><p style="font-size:2rem;font-weight:700;letter-spacing:0.2em;color:#1e4a2c">${token}</p><p>It works for 15 minutes. If you did not ask for it, you can ignore this email.</p></div>`,
  };
}

async function viaBrevo(key: string, to: string, token: string) {
  const from = process.env.AUTH_EMAIL_FROM;
  if (!from) throw new ConvexError("AUTH_EMAIL_FROM is not set.");
  const m = message(token);
  return fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": key, "Content-Type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      sender: { name: NAME, email: from },
      to: [{ email: to }],
      subject: m.subject,
      textContent: m.text,
      htmlContent: m.html,
    }),
  });
}

async function viaResend(key: string, to: string, token: string) {
  const from = process.env.AUTH_EMAIL_FROM
    ? `${NAME} <${process.env.AUTH_EMAIL_FROM}>`
    : `${NAME} <onboarding@resend.dev>`;
  const m = message(token);
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], subject: m.subject, text: m.text, html: m.html }),
  });
}

export const EmailOTP = Email({
  id: "email-otp",
  maxAge: 60 * 15,
  async generateVerificationToken() {
    return sixDigits();
  },
  async sendVerificationRequest({ identifier: email, token }) {
    const brevo = process.env.AUTH_BREVO_KEY;
    const resend = process.env.AUTH_RESEND_KEY;
    const res = brevo
      ? await viaBrevo(brevo, email, token)
      : resend
        ? await viaResend(resend, email, token)
        : null;
    // ConvexError keeps the reason visible in production, where plain
    // errors are hidden; it never contains the API key.
    if (!res) throw new ConvexError("No email sender is configured.");
    if (!res.ok) {
      throw new ConvexError(`Email service ${res.status}: ${(await res.text()).slice(0, 300)}`);
    }
  },
});
