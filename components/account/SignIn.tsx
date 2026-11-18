"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useId, useState, type FormEvent } from "react";

/* Two steps on one card: the email, then the six-digit code sent to it. */
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
    } catch {
      setNote("We could not send a code just now. Check the address and try again.");
    } finally {
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
      await signIn("email-otp", { email, code });
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
            Enter your email and we will send you a code. The first time you sign in, your
            account is made for you.
          </p>
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
