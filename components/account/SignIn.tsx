"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useId, useState, type FormEvent } from "react";

/* Two steps on one card: the email, then the six-digit code sent to it.
   Above them, "Continue with Google" when the site was built with Google
   sign-in switched on. */
const GOOGLE = process.env.NEXT_PUBLIC_GOOGLE_SIGNIN === "1";
export default function SignIn() {
  const { signIn } = useAuthActions();
  const uid = useId();
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");

  async function sendCode(address: string) {
    setBusy(true);
    setNote("");
    try {
      await signIn("email-otp", { email: address });
      setStep("code");
      setNote(`We sent a six-digit code to ${address}. It works for 15 minutes.`);
    } catch (err) {
      console.error("Sign-in code not sent", err);
      setNote("We could not send a code just now. Check the address and try again.");
    } finally {
      setBusy(false);
    }
  }

  async function withGoogle() {
    setBusy(true);
    setNote("");
    try {
      await signIn("google", { redirectTo: "/account/" });
    } catch (err) {
      console.error("Google sign-in did not start", err);
      setNote("Google sign-in did not start. Please try again or use your email.");
      setBusy(false);
    }
  }

  async function onEmail(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const address = String(new FormData(form).get("email")).trim().toLowerCase();
    setEmail(address);
    await sendCode(address);
  }

  async function onCode(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const code = String(new FormData(e.currentTarget).get("code")).replace(/\D/g, "");
    if (code.length !== 6) {
      setNote("The code is six digits.");
      return;
    }
    setBusy(true);
    setNote("");
    try {
      const { signingIn } = await signIn("email-otp", { email, code });
      if (!signingIn) throw new Error("not signed in");
    } catch {
      setNote("That code did not work. Check it, or send a new one.");
      setBusy(false);
    }
  }

  return (
    <div className="acard acard--narrow">
      {step === "email" ? (
        <form className="aform" onSubmit={onEmail} noValidate aria-labelledby={`${uid}-t`}>
          <h2 className="acard__title" id={`${uid}-t`}>
            Sign in or create an account
          </h2>
          <p className="acard__text">
            {GOOGLE
              ? "Use your Google account, or enter your email and we will send you a code."
              : "Enter your email and we will send you a code."}{" "}
            The first time you sign in, your account is made for you.
          </p>
          {GOOGLE && (
            <>
              <button
                type="button"
                className="button button--google"
                onClick={withGoogle}
                disabled={busy}
              >
                <svg viewBox="0 0 48 48" width="20" height="20" aria-hidden="true">
                  <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
                  <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
                  <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
                  <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
                </svg>
                Continue with Google
              </button>
              <p className="aform__or">
                <span>or with your email</span>
              </p>
            </>
          )}
          <div className="field">
            <label htmlFor={`${uid}-email`}>Email</label>
            <input
              id={`${uid}-email`}
              name="email"
              type="email"
              autoComplete="email"
              required
              defaultValue={email}
            />
          </div>
          <button className="button" type="submit" disabled={busy}>
            {busy ? "Sending code…" : "Send me a code"}
          </button>
        </form>
      ) : (
        <form className="aform" onSubmit={onCode} noValidate aria-labelledby={`${uid}-t`}>
          <h2 className="acard__title" id={`${uid}-t`}>
            Enter your code
          </h2>
          <div className="field">
            <label htmlFor={`${uid}-code`}>Six-digit code</label>
            <input
              id={`${uid}-code`}
              className="aform__code"
              name="code"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]{6}"
              maxLength={6}
              required
              autoFocus
            />
          </div>
          <button className="button" type="submit" disabled={busy}>
            {busy ? "Signing in…" : "Sign in"}
          </button>
          <div className="aform__links">
            <button type="button" className="alink" disabled={busy} onClick={() => sendCode(email)}>
              Send a new code
            </button>
            <button
              type="button"
              className="alink"
              disabled={busy}
              onClick={() => {
                setStep("email");
                setNote("");
              }}
            >
              Use a different email
            </button>
          </div>
        </form>
      )}
      <p className="aform__status" role="status" aria-live="polite">
        {note}
      </p>
    </div>
  );
}
