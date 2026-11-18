import Link from "next/link";
import Icon from "@/components/Icon";
import Photo from "@/components/Photo";
import { PROGRAMME_PHOTOS } from "@/lib/photos";
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
            <span className="pindex__media">
              <Photo
                photo={PROGRAMME_PHOTOS[p.slug]}
                w={640}
                h={400}
                sizes="(max-width: 640px) 92vw, (max-width: 1000px) 45vw, 380px"
              />
            </span>
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
