import Link from "next/link";
import Icon from "@/components/Icon";
import { PROGRAMMES } from "@/lib/site";

/* The twelve programmes as a strip of round badges, each to its page. On a
   narrow screen the strip scrolls sideways rather than wrapping into a pile.
   Every ring is the same leaf green, so the icons do the telling apart. */
export default function FocusStrip() {
  return (
    <nav className="strip" aria-label="Our programmes">
      <ul className="strip__list shell">
        {PROGRAMMES.map((p) => (
          <li key={p.slug}>
            <Link
              className="strip__item"
              href={`/programmes/${p.slug}`}
              data-kubai-trigger
            >
              <span className="strip__ring">
                <Icon name={p.icon} size={40} />
              </span>
              <span className="strip__label">{p.short}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
