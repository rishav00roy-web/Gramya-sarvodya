import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Closing from "@/components/Closing";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import { PROGRAMMES, getProgramme } from "@/lib/site";

export function generateStaticParams() {
  return PROGRAMMES.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProgramme(slug);
  return p ? { title: p.title, description: p.intro[0] } : {};
}

/* Splits a title into two lines of capitals at its natural break. */
function lines(title: string): string[] {
  const t = title.replace(/\s*\((FPC|FFS)\)/, "");
  for (const sep of [" – ", " & "]) {
    const i = t.indexOf(sep);
    if (i > 0) return [t.slice(0, i), sep === " & " ? `& ${t.slice(i + 3)}` : t.slice(i + 3)];
  }
  const words = t.split(" ");
  if (words.length < 2) return [t];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

export default async function ProgrammePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProgramme(slug);
  if (!p) notFound();
  const i = PROGRAMMES.indexOf(p);
  const prev = PROGRAMMES[(i - 1 + PROGRAMMES.length) % PROGRAMMES.length];
  const next = PROGRAMMES[(i + 1) % PROGRAMMES.length];

  return (
    <>
      <PageHero
        trail={[{ href: "/programmes", label: "Our Programmes" }]}
        label={p.short}
        lines={lines(p.title)}
        aside={
          <span className="phero__icon">
            <Icon name={p.icon} size={120} tone="sprout" trigger="hover" />
          </span>
        }
      >
        <p>{p.intro[0]}</p>
      </PageHero>

      <section className="section shell programme" aria-label={p.title}>
        <div className="programme__intro">
          {p.intro.slice(1).map((t) => (
            <p key={t}>{t}</p>
          ))}
          {p.motto && <p className="programme__motto script">{p.motto}</p>}
        </div>

        <div className="programme__lists">
          {p.lists.map((list) => (
            <div className="programme__list" key={list.heading}>
              <h2 className="programme__heading caps">{list.heading}</h2>
              <ul className={p.lists.length === 1 ? "ticks ticks--two" : "ticks"}>
                {list.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {p.note && (
          <aside className="note" aria-labelledby="note-title">
            <h2 className="note__title" id="note-title">
              {p.note.heading}
            </h2>
            {p.note.text.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </aside>
        )}
      </section>

      <nav className="pager shell" aria-label="More programmes">
        <Link className="pager__link" href={`/programmes/${prev.slug}`} rel="prev">
          <span className="pager__dir">Previous programme</span>
          <span className="pager__name">{prev.title}</span>
        </Link>
        <Link className="pager__link pager__link--next" href={`/programmes/${next.slug}`} rel="next">
          <span className="pager__dir">Next programme</span>
          <span className="pager__name">{next.title}</span>
        </Link>
      </nav>

      <Closing
        title={["Work with us on", p.short]}
        text="For partnerships, volunteering, project collaboration and general enquiries about this programme, please contact us."
      />
    </>
  );
}
