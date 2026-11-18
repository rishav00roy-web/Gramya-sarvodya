import { Email } from "@convex-dev/auth/providers/Email";

/* Sign-in by a six-digit code sent to the member's email through Resend.
   The code lasts 15 minutes; Convex Auth limits wrong guesses per hour. */
function sixDigits() {
  const n = new Uint32Array(1);
  crypto.getRandomValues(n);
  return String(n[0] % 1_000_000).padStart(6, "0");
}

export const ResendOTP = Email({
  id: "resend-otp",
  apiKey: process.env.AUTH_RESEND_KEY,
  maxAge: 60 * 15,
  async generateVerificationToken() {
    return sixDigits();
  },
  async sendVerificationRequest({ identifier: email, provider, token }) {
    const from =
      process.env.AUTH_EMAIL_FROM ??
      "Gramya Sarvodaya Foundation <onboarding@resend.dev>";
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${provider.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [email],
        subject: `${token} is your Gramya Sarvodaya sign-in code`,
        text: `Your sign-in code is ${token}.\n\nIt works for 15 minutes. If you did not ask for it, you can ignore this email.\n\nGramya Sarvodaya Foundation`,
        html: `<div style="font-family:system-ui,sans-serif;color:#15241a;max-width:28rem"><p>Your sign-in code for the Gramya Sarvodaya Foundation website is:</p><p style="font-size:2rem;font-weight:700;letter-spacing:0.2em;color:#1e4a2c">${token}</p><p>It works for 15 minutes. If you did not ask for it, you can ignore this email.</p></div>`,
      }),
    });
    if (!res.ok) {
      throw new Error(`Could not send the code: ${await res.text()}`);
    }
  },
});
