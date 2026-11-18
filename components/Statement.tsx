import { Fragment, type ReactNode } from "react";

/* One sentence, large and centred, with a little plain text beneath. Each
   word is its own box so that, with motion on, it can darken as it reaches
   the middle of the screen; the spaces sit between the boxes so the
   sentence still wraps and reads as one. */
export default function Statement({
  label,
  text,
  children,
  as: Tag = "p",
}: {
  label?: string;
  text: string;
  children?: ReactNode;
  as?: "p" | "h2";
}) {
  const words = text.split(/\s+/);
  return (
    <section className="statement shell">
      {label && <p className="statement__label label">{label}</p>}
      <Tag className="statement__text caps">
        {words.map((word, i) => (
          <Fragment key={i}>
            <span className="statement__word">{word}</span>{" "}
          </Fragment>
        ))}
      </Tag>
      {children && <div className="statement__body">{children}</div>}
    </section>
  );
}
