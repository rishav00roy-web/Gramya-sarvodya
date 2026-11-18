import Link from "next/link";
import Closing from "@/components/Closing";
import FocusStrip from "@/components/FocusStrip";
import Icon from "@/components/Icon";
import ProgrammeCarousel from "@/components/ProgrammeCarousel";
import {
  ABOUT,
  APPROACH,
  HOME,
  INTRO,
  JOIN,
  MISSION,
  ORG,
  PRINCIPLES,
  PROGRAMMES,
  VISION,
  asset,
} from "@/lib/site";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: ORG.name,
  slogan: ORG.motto,
  url: ORG.url,
  email: ORG.email,
  telephone: ORG.phone,
  description: INTRO,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bhatemora, Pulibor",
    addressLocality: "Jorhat",
    addressRegion: "Assam",
    postalCode: "785006",
    addressCountry: "IN",
  },
};

/* What the Foundation's own plan contains, counted. These are the sizes of
   its programme, not claims of reach: there are no impact figures yet. */
const FACTS = [
  { value: String(PROGRAMMES.length), label: "Development programmes" },
  { value: String(MISSION.length), label: "Mission commitments" },
  { value: String(PRINCIPLES.length), label: "Gandhian principles" },
  { value: String(APPROACH.length), label: "Steps in our approach" },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* One word set very large, the way a foundation states its creed,
          then the Foundation's own banner as the hero picture. */}
      <section className="hero" data-ground="dark" aria-labelledby="hero-title">
        <div className="shell hero__inner">
          <p className="hero__kicker script" aria-hidden="true">
            Welfare of all
          </p>
          <h1 className="hero__title" id="hero-title">
            Sarvodaya
          </h1>
          <p className="hero__lede">{INTRO}</p>
          <div className="hero__actions">
            <Link className="button button--light" href="/about">
              Know more
            </Link>
            <Link className="textlink textlink--light" href="/get-involved">
              Join our movement
            </Link>
          </div>
        </div>
      </section>

      <div className="banner">
        <figure className="hero__media shell">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset("/media/gsf-sunrise.webp")}
            alt="The Gramya Sarvodaya Foundation emblem over a sunrise: bamboo, a river valley, rice fields and a thatched village house, with the words Strong Villages, Prosperous Nation."
            width={1600}
            height={900}
            fetchPriority="high"
          />
        </figure>
      </div>

      <FocusStrip />

      {/* The Foundation's founding belief, set as a pull quote. */}
      <section className="quote shell" aria-label="Our belief">
        <blockquote className="quote__body">
          <p>{HOME.body}</p>
        </blockquote>
        <p className="quote__by">
          <span className="quote__name">Our philosophy</span>
          <span>{ORG.philosophy}</span>
        </p>
        <Link className="textlink" href="/about#philosophy">
          Read more
        </Link>
      </section>

      <section className="section section--tint" aria-labelledby="programmes-title">
        <div className="shell">
          <div className="section__head">
            <div>
              <p className="tag">What we do</p>
              <h2 className="section__title" id="programmes-title">
                Our programmes
              </h2>
            </div>
            <Link className="textlink" href="/programmes">
              View all {PROGRAMMES.length}
            </Link>
          </div>
          <ProgrammeCarousel />
        </div>
      </section>

      {/* The creed band: a statement, the vision, and the plan's own sizes. */}
      <section className="section shell creed" aria-labelledby="creed-title">
        <div className="creed__words">
          <h2 className="section__title" id="creed-title">
            {HOME.title}
          </h2>
          <p className="section__lede">{VISION}</p>
          <Link className="button" href="/about#vision-mission">
            Our vision and mission
          </Link>
        </div>
        <dl className="facts">
          {FACTS.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* The name explained, on forest green beside the sunrise. */}
      <section className="band" data-ground="dark" aria-labelledby="name-title">
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
            <p className="tag tag--light">Inspired by Gandhian ideology</p>
            <h2 className="band__title" id="name-title">
              Our philosophy
            </h2>
            <p className="band__intro">Our name represents two powerful ideas:</p>
            <dl className="terms terms--light">
              {ABOUT.name.map((t) => (
                <div key={t.term}>
                  <dt>{t.term}</dt>
                  <dd>{t.text}</dd>
                </div>
              ))}
            </dl>
            <p className="band__together">{ABOUT.together}</p>
            <ul className="chips" aria-label="Gandhian principles">
              {PRINCIPLES.map((p) => (
                <li key={p.term}>{p.term}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section shell" aria-labelledby="approach-title">
        <div className="section__head">
          <div>
            <p className="tag">How we work</p>
            <h2 className="section__title" id="approach-title">
              Our development approach
            </h2>
          </div>
          <Link className="textlink" href="/approach">
            Our approach and values
          </Link>
        </div>
        <ol className="steps">
          {APPROACH.map((step, i) => (
            <li key={step}>
              <span className="steps__num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="section section--tint" aria-labelledby="join-title">
        <div className="shell">
          <div className="section__head">
            <div>
              <p className="tag">Get involved</p>
              <h2 className="section__title" id="join-title">
                Join our movement
              </h2>
            </div>
            <Link className="textlink" href="/get-involved">
              Ways to get involved
            </Link>
          </div>
          <ul className="ways">
            {JOIN.map((w) => (
              <li key={w.id}>
                <Link className="ways__item" href={`/get-involved#${w.id}`} data-kubai-trigger>
                  <Icon name={w.icon} size={34} />
                  <span className="ways__title">{w.title}</span>
                  <span className="ways__text">{w.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Closing />
    </>
  );
}
