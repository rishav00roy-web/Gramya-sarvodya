"use client";

import { useMutation, useQuery } from "convex/react";
import { anyApi } from "convex/server";
import { useId, useRef, useState, type FormEvent } from "react";

const api = anyApi;
type Kind = "news" | "gallery" | "publication";
type Item = { id: string; title: string; date: string };

const KINDS: [Kind, string][] = [
  ["news", "News"],
  ["gallery", "Gallery photograph"],
  ["publication", "Publication"],
];

/* For the Foundation's admins only: add news, gallery photographs and
   publications to the Resources page, and remove them. */
export default function Publisher() {
  const isAdmin = useQuery(api.content.isAdmin) as boolean | undefined;
  if (!isAdmin) return null;
  return <Panel />;
}

function today() {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function Panel() {
  const uid = useId();
  const f = (n: string) => `${uid}-${n}`;
  const [kind, setKind] = useState<Kind>("news");
  const [state, setState] = useState<"idle" | "saving" | "saved" | string>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const uploadUrl = useMutation(api.content.uploadUrl);
  const create = useMutation(api.content.create);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const d = new FormData(form);
    const file = d.get("file");
    setState("saving");
    try {
      let fileId: string | undefined;
      if (file instanceof File && file.size > 0) {
        if (file.size > 10 * 1024 * 1024) throw new Error("Files must be under 10 MB.");
        if (kind === "publication" ? file.type !== "application/pdf" : !file.type.startsWith("image/"))
          throw new Error(kind === "publication" ? "Publications must be a PDF." : "Choose an image file.");
        const target = (await uploadUrl()) as string;
        const res = await fetch(target, {
          method: "POST",
          headers: { "Content-Type": file.type || "application/octet-stream" },
          body: file,
        });
        if (!res.ok) throw new Error("The upload did not finish.");
        fileId = ((await res.json()) as { storageId: string }).storageId;
      }
      await create({
        kind,
        title: String(d.get("title") ?? ""),
        body: String(d.get("body") ?? "") || undefined,
        date: String(d.get("date") ?? ""),
        link: String(d.get("link") ?? "") || undefined,
        fileId,
      });
      form.reset();
      setState("saved");
    } catch (err) {
      const msg =
        (err as { data?: unknown }).data ?? (err instanceof Error ? err.message : "");
      setState(typeof msg === "string" && msg ? msg : "That did not publish. Please try again.");
    }
  }

  return (
    <section className="acard publisher" aria-labelledby={f("t")}>
      <h2 className="acard__title" id={f("t")}>
        Publish to Resources
      </h2>
      <p className="acard__text">
        You are an admin. What you add here appears on the Resources page straight away.
      </p>
      <form ref={formRef} className="form" onSubmit={onSubmit} noValidate>
        <div className="form__grid">
          <div className="field">
            <label htmlFor={f("kind")}>What are you adding?</label>
            <select
              id={f("kind")}
              value={kind}
              onChange={(e) => {
                setKind(e.target.value as Kind);
                setState("idle");
              }}
            >
              {KINDS.map(([v, label]) => (
                <option key={v} value={v}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor={f("date")}>Date</label>
            <input id={f("date")} name="date" type="date" required defaultValue={today()} />
          </div>
          <div className="field field--wide">
            <label htmlFor={f("title")}>
              {kind === "gallery" ? "Caption" : "Title"}
            </label>
            <input id={f("title")} name="title" required maxLength={160} />
          </div>
          {kind !== "gallery" && (
            <div className="field field--wide">
              <label htmlFor={f("body")}>
                {kind === "news" ? "The story" : "Short description"}{" "}
                <span className="field__opt">(optional)</span>
              </label>
              <textarea id={f("body")} name="body" rows={4} maxLength={4000} />
            </div>
          )}
          <div className="field">
            <label htmlFor={f("file")}>
              {kind === "gallery" ? "Photograph" : kind === "publication" ? "PDF file" : "Photo"}{" "}
              {kind !== "gallery" && <span className="field__opt">(optional)</span>}
            </label>
            <input
              key={kind}
              id={f("file")}
              name="file"
              type="file"
              required={kind === "gallery"}
              accept={kind === "publication" ? "application/pdf" : "image/*"}
            />
          </div>
          {kind !== "gallery" && (
            <div className="field">
              <label htmlFor={f("link")}>
                Link <span className="field__opt">(optional)</span>
              </label>
              <input id={f("link")} name="link" type="url" placeholder="https://" maxLength={500} />
            </div>
          )}
        </div>
        <div className="form__foot">
          <button className="button" type="submit" disabled={state === "saving"}>
            {state === "saving" ? "Publishing…" : "Publish"}
          </button>
          <p className="form__status" role="status" aria-live="polite">
            {state === "saved"
              ? "Published. It is on the Resources page now."
              : state === "idle" || state === "saving"
                ? "Files up to 10 MB."
                : state}
          </p>
        </div>
      </form>
      <Published />
    </section>
  );
}

function Published() {
  const remove = useMutation(api.content.remove);
  const [confirm, setConfirm] = useState<string | null>(null);
  const [failed, setFailed] = useState("");
  const lists = {
    news: useQuery(api.content.list, { kind: "news" }) as Item[] | undefined,
    gallery: useQuery(api.content.list, { kind: "gallery" }) as Item[] | undefined,
    publication: useQuery(api.content.list, { kind: "publication" }) as Item[] | undefined,
  };
  const all = KINDS.flatMap(([k, label]) =>
    (lists[k] ?? []).map((i) => ({ ...i, label })),
  );
  if (!all.length) return null;
  return (
    <div className="published">
      <h3 className="published__title">Already published</h3>
      {failed && (
        <p className="form__status" role="alert">
          {failed}
        </p>
      )}
      <ul>
        {all.map((i) => (
          <li key={i.id}>
            <span>
              <strong>{i.label}</strong> · {i.date} · {i.title}
            </span>
            {confirm === i.id ? (
              <span className="published__actions">
                <button type="button" className="alink" onClick={() => setConfirm(null)}>
                  Keep
                </button>
                <button
                  type="button"
                  className="alink alink--danger"
                  onClick={() => {
                    setConfirm(null);
                    setFailed("");
                    remove({ id: i.id }).catch(() =>
                      setFailed(`“${i.title}” was not removed. Please try again.`),
                    );
                  }}
                >
                  Yes, remove
                </button>
              </span>
            ) : (
              <button type="button" className="alink" onClick={() => setConfirm(i.id)}>
                Remove
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
