"use client";

import Link from "next/link";
import { useRef } from "react";
import Icon from "@/components/Icon";
import { PROGRAMMES } from "@/lib/site";

/* The programmes as a row of cards that scrolls sideways, with previous and
   next buttons: the shape a foundation's "latest" carousel takes, filled
   with the Foundation's own work rather than news it does not have yet.
   Plain scroll-snap underneath, so it also swipes, scrolls and tabs. */
export default function ProgrammeCarousel() {
  const track = useRef<HTMLUListElement>(null);

  const move = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="carousel">
      <div className="carousel__controls">
        <button type="button" className="carousel__btn" onClick={() => move(-1)} aria-label="Previous programmes">
          <span aria-hidden="true" className="carousel__chev carousel__chev--prev" />
        </button>
        <button type="button" className="carousel__btn" onClick={() => move(1)} aria-label="Next programmes">
          <span aria-hidden="true" className="carousel__chev" />
        </button>
      </div>
      <ul className="carousel__track" ref={track} tabIndex={0} aria-label="Programme cards">
        {PROGRAMMES.map((p) => (
          <li key={p.slug} className="carousel__card">
            <Link className="pcard" href={`/programmes/${p.slug}`} data-kubai-trigger>
              <span className="pcard__top">
                <span className="pcard__tag">Programme {p.letter}</span>
                <Icon name={p.icon} size={40} />
              </span>
              <span className="pcard__title">{p.title}</span>
              <span className="pcard__text">{p.intro[0]}</span>
              <span className="pcard__more">Read more</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
