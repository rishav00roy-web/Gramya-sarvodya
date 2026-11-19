"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useMutation, useQuery } from "convex/react";
import { anyApi } from "convex/server";
import { useId, useState, type FormEvent } from "react";
import Publisher from "./Publisher";

/* The site's code reaches the Convex functions in convex/profile.ts by name,
   so the static build does not need the generated API types. */
const api = anyApi;

type Profile = {
  email: string;
  name: string;
  phone: string;
  village: string;
  district: string;
  interest: string;
  about: string;
  joined: number;
};

const INTERESTS: [string, string][] = [
  ["volunteer", "Volunteering"],
  ["partner", "Partnering as an organisation"],
  ["donor", "Supporting the work"],
  ["farmer", "Farming and producer groups"],
  ["learner", "Training and learning"],
  ["other", "Something else"],
];

export default function Dashboard() {
  const me = useQuery(api.profile.me) as Profile | null | undefined;
  const { signOut } = useAuthActions();
  const update = useMutation(api.profile.update);
  if (me === undefined) {
    return (
      <p className="acard__text" role="status">
        Loading your profile…
      </p>
    );
  }
  if (me === null) {
    return (
      <div className="acard">
        <p className="acard__text">Your session has ended. Please sign in again.</p>
        <button className="button" type="button" onClick={() => void signOut()}>
          Back to sign in
        </button>
      </div>
    );
  }
  return (
    <>
      <DashboardView me={me} onSignOut={() => void signOut()} onSave={update} />
      <Publisher />
    </>
  );
}

/* The signed-in view on its own, given the profile and what to do on
   sign-out and save. */
function DashboardView({
  me,
  onSignOut,
  onSave,
}: {
  me: Profile;
  onSignOut: () => void;
  onSave: (fields: Omit<Profile, "email" | "joined">) => Promise<unknown>;
}) {
  const joined = new Date(me.joined).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const interest = INTERESTS.find(([v]) => v === me.interest)?.[1];

  return (
    <div className="dash">
      <aside className="acard dash__side" aria-label="Your account">
        <p className="dash__hello">Namaste{me.name ? `, ${me.name.split(" ")[0]}` : ""}</p>
        <dl className="dash__facts">
          <div>
            <dt>Signed in as</dt>
            <dd>{me.email}</dd>
          </div>
          <div>
            <dt>Member since</dt>
            <dd>{joined}</dd>
          </div>
          <div>
            <dt>Wants to help with</dt>
            <dd>{interest ?? "Not chosen yet"}</dd>
          </div>
        </dl>
        <button className="button button--quiet" type="button" onClick={onSignOut}>
          Sign out
        </button>
      </aside>
      <ProfileForm me={me} onSave={onSave} />
    </div>
  );
}

function ProfileForm({
  me,
  onSave,
}: {
  me: Profile;
  onSave: (fields: Omit<Profile, "email" | "joined">) => Promise<unknown>;
}) {
  const uid = useId();
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const f = (n: string) => `${uid}-${n}`;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const s = (k: string) => String(d.get(k) ?? "");
    setState("saving");
    try {
      await onSave({
        name: s("name"),
        phone: s("phone"),
        village: s("village"),
        district: s("district"),
        interest: s("interest"),
        about: s("about"),
      });
      setState("saved");
    } catch {
      setState("error");
    }
  }

  return (
    <form className="acard form" onSubmit={onSubmit} aria-labelledby={f("t")}>
      <h2 className="acard__title" id={f("t")}>
        Your profile
      </h2>
      <div className="form__grid">
        <div className="field">
          <label htmlFor={f("name")}>Your name</label>
          <input id={f("name")} name="name" autoComplete="name" defaultValue={me.name} maxLength={80} />
        </div>
        <div className="field">
          <label htmlFor={f("phone")}>
            Phone <span className="field__opt">(optional)</span>
          </label>
          <input
            id={f("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            defaultValue={me.phone}
            maxLength={20}
          />
        </div>
        <div className="field">
          <label htmlFor={f("village")}>
            Village or town <span className="field__opt">(optional)</span>
          </label>
          <input id={f("village")} name="village" defaultValue={me.village} maxLength={80} />
        </div>
        <div className="field">
          <label htmlFor={f("district")}>
            District <span className="field__opt">(optional)</span>
          </label>
          <input id={f("district")} name="district" defaultValue={me.district} maxLength={80} />
        </div>
        <div className="field field--wide">
          <label htmlFor={f("interest")}>How would you like to take part?</label>
          <select id={f("interest")} name="interest" defaultValue={me.interest}>
            <option value="">Choose one</option>
            {INTERESTS.map(([v, label]) => (
              <option key={v} value={v}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className="field field--wide">
          <label htmlFor={f("about")}>
            Anything you would like us to know <span className="field__opt">(optional)</span>
          </label>
          <textarea id={f("about")} name="about" rows={4} defaultValue={me.about} maxLength={600} />
        </div>
      </div>
      <div className="form__foot">
        <button className="button" type="submit" disabled={state === "saving"}>
          {state === "saving" ? "Saving…" : "Save profile"}
        </button>
        <p className="form__status" role="status" aria-live="polite">
          {state === "saved"
            ? "Saved."
            : state === "error"
              ? "That did not save. Please try again."
              : "Only you and the Foundation can see this."}
        </p>
      </div>
    </form>
  );
}
