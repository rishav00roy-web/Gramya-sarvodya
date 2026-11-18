import type { Metadata } from "next";
import Closing from "@/components/Closing";
import PageHero from "@/components/PageHero";
import { ABOUT, MISSION, PRINCIPLES, VISION, asset } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: ABOUT.who[0],
};

export default function AboutPage() {
  return (
    <>
      <PageHero label="About Us" lines={["Who", "we are"]} script="Gramya">
        <p>{ABOUT.who[0]}</p>
      </PageHero>

      <section className="section shell prose-split" aria-labelledby="who-title">
        <h2 className="section__title caps" id="who-title">
          Community-led development
        </h2>
        <div className="prose">
          {ABOUT.who.slice(1).map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <section className="band" id="philosophy" data-ground="dark" aria-labelledby="philosophy-title">
        <div className="shell band__inner">
          <div className="band__photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset("/media/village-hut.webp")}
              alt="A thatched bamboo house on stilts with a clay pot and a woven basket at dawn."
              width={310}
              height={650}
              loading="lazy"
            />
          </div>
          <div className="band__copy">
            <h2 className="band__title caps" id="philosophy-title">
              Our philosophy
            </h2>
            <p className="band__intro">Our name represents two powerful ideas:</p>
            <dl className="terms terms--light">
              {ABOUT.name.map((t) => (
                <div key={t.term}>
                  <dt className="caps">{t.term}</dt>
                  <dd>{t.text}</dd>
                </div>
              ))}
            </dl>
            <p className="band__together">{ABOUT.together}</p>
          </div>
        </div>
      </section>

      <section className="section shell" id="gandhian-ideology" aria-labelledby="gandhi-title">
        <div className="section__head section__head--stack">
          <h2 className="section__title caps" id="gandhi-title">
            Inspired by Gandhian ideology
          </h2>
          <p className="section__lede">Our philosophy draws inspiration from Mahatma Gandhi&apos;s principles:</p>
        </div>
        <dl className="principles">
          {PRINCIPLES.map((p) => (
            <div key={p.term}>
              <dt className="caps">{p.term}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
        <p className="section__close">We believe that strong villages create a strong nation.</p>
      </section>

      <section className="section section--tint" id="vision-mission" aria-labelledby="vision-title">
        <div className="shell vm">
          <div>
            <h2 className="section__title caps" id="vision-title">
              Our vision
            </h2>
            <p className="vm__vision">{VISION}</p>
          </div>
          <div>
            <h2 className="section__title caps">Our mission</h2>
            <ol className="numbered">
              {MISSION.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <Closing />
    </>
  );
}
