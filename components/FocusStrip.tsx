import Link from "next/link";
import Icon from "@/components/Icon";
import { PROGRAMMES } from "@/lib/site";

/* The twelve programmes as a strip of round badges, each to its page. On a
   narrow screen the strip scrolls sideways rather than wrapping into a pile.
   The rings take turns through the Foundation's three greens and browns. */
export default function FocusStrip() {
  return (
    <nav className="strip" aria-label="Our programmes">
      <ul className="strip__list shell">
        {PROGRAMMES.map((p, i) => (
          <li key={p.slug}>
            <Link
              className="strip__item"
              href={`/programmes/${p.slug}`}
              data-tone={["forest", "leaf", "earth"][i % 3]}
              data-kubai-trigger
            >
              <span className="strip__ring">
                <Icon name={p.icon} size={34} />
              </span>
              <span className="strip__label">{p.short}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
