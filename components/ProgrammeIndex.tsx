import Link from "next/link";
import Icon from "@/components/Icon";
import { PROGRAMMES } from "@/lib/site";

/* The twelve programmes as an index: a letter, an icon, the name, and the
   programme's own line where it has one. Rows, not cards, so the list reads
   down the page like a table of contents. */
export default function ProgrammeIndex() {
  return (
    <ol className="pindex">
      {PROGRAMMES.map((p) => (
        <li key={p.slug}>
          <Link className="pindex__row" href={`/programmes/${p.slug}`} data-kubai-trigger>
            <span className="pindex__letter caps" aria-hidden="true">
              {p.letter}
            </span>
            <span className="pindex__icon">
              <Icon name={p.icon} size={32} />
            </span>
            <span className="pindex__title">{p.title}</span>
            <span className="pindex__line">{p.motto ?? p.intro[0]}</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
