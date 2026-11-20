"use client";

import { useId, useState, type FormEvent } from "react";
import { ORG } from "@/lib/site";

type Kind = "volunteer" | "partner" | "enquiry";

const SUBJECT: Record<Kind, string> = {
  volunteer: "Volunteer application",
  partner: "Partnership proposal",
  enquiry: "General enquiry",
};

/* The site has no server, so a form does not pretend to send. On submit it
   checks the fields, then opens the visitor's own email app with the message
   written out to the Foundation, and says so. Nothing is stored. */
export default function EnquiryForm({
  kind,
  title,
  intro,
  interests,
  compact = false,
}: {
  kind: Kind;
  title: string;
  intro?: string;
  interests?: string[];
  /** Only name, email and message, with the title read out but not shown. */
  compact?: boolean;
}) {
  const uid = useId();
  const [state, setState] = useState<"idle" | "invalid" | "opened">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setState("invalid");
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const lines = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      data.get("phone") ? `Phone: ${data.get("phone")}` : "",
      data.get("organisation")
        ? `Organisation: ${data.get("organisation")}`
        : "",
      data.get("interest") ? `Area of interest: ${data.get("interest")}` : "",
      "",
      String(data.get("message") ?? ""),
    ].filter((line, i, all) => line !== "" || all[i - 1] !== "");
    const href = `mailto:${ORG.email}?subject=${encodeURIComponent(
      `${SUBJECT[kind]} – ${data.get("name")}`,
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = href;
    setState("opened");
  }

  const f = (name: string) => `${uid}-${name}`;

  return (
    <form
      className={compact ? "form form--compact" : "form"}
      onSubmit={onSubmit}
      noValidate
      aria-labelledby={f("title")}
    >
      <h2
        className={
          compact ? "form__title form__title--small" : "form__title caps"
        }
        id={f("title")}
      >
        {title}
      </h2>
      {intro && <p className="form__intro">{intro}</p>}

      <div className="form__grid">
        <div className="field">
          <label htmlFor={f("name")}>Your name</label>
          <input id={f("name")} name="name" autoComplete="name" required />
        </div>
        <div className="field">
          <label htmlFor={f("email")}>Email</label>
          <input
            id={f("email")}
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </div>
        {!compact && (
          <div className="field">
            <label htmlFor={f("phone")}>
              Phone <span className="field__opt">(optional)</span>
            </label>
            <input
              id={f("phone")}
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
            />
          </div>
        )}
        {compact ? null : kind === "partner" ? (
          <div className="field">
            <label htmlFor={f("organisation")}>Organisation</label>
            <input
              id={f("organisation")}
              name="organisation"
              autoComplete="organization"
              required
            />
          </div>
        ) : (
          <div className="field">
            <label htmlFor={f("interest")}>
              Area of interest <span className="field__opt">(optional)</span>
            </label>
            <select id={f("interest")} name="interest" defaultValue="">
              <option value="">Choose one</option>
              {(interests ?? []).map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </div>
        )}
        <div className="field field--wide">
          <label htmlFor={f("message")}>
            {kind === "volunteer"
              ? "How would you like to help?"
              : kind === "partner"
                ? "What would you like to work on together?"
                : "Your message"}
          </label>
          <textarea
            id={f("message")}
            name="message"
            rows={compact ? 4 : 5}
            required
          />
        </div>
      </div>

      <div className="form__foot">
        <button className="button" type="submit">
          {compact ? "Send message" : "Write to the Foundation"}
        </button>
        <p
          className="form__status"
          data-state={state}
          role="status"
          aria-live="polite"
        >
          {state === "opened"
            ? `Your email app should now be open with this message to ${ORG.email}. Press send there. If nothing opened, write to us at that address.`
            : state === "invalid"
              ? "Please fill in the fields marked as needed."
              : compact
                ? "Opens your email app with this message. Nothing is stored here."
                : `This opens your own email app, addressed to ${ORG.email}. Nothing is stored on this website.`}
        </p>
      </div>
    </form>
  );
}
