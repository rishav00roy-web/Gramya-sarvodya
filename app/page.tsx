import Link from "next/link";
import Closing from "@/components/Closing";
import Icon from "@/components/Icon";
import Statement from "@/components/Statement";
import { ABOUT, APPROACH, FOCUS_AREAS, HOME, INTRO, JOIN, ORG, PROGRAMMES, asset } from "@/lib/site";

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

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* The first screen: the motto as the headline, the tagline, two ways
          in, and the emblem from the Foundation's logo, which sits on the
          same forest green it was drawn on. */}
      <section className="hero" data-ground="dark">
        <div className="shell hero__inner">
          <div className="hero__words">
            <div className="lockup">
              <h1 className="hero__title caps">
                <span>Strong villages,</span>
                <span>prosperous nation</span>
              </h1>
              <p className="lockup__script script" aria-hidden="true">
                Sarvodaya
              </p>
            </div>
            <p className="hero__lede">{ORG.tagline}</p>
            <div className="hero__actions">
              <Link className="button button--light" href="/programmes">
                Explore our programmes
              </Link>
              <Link className="textlink textlink--light" href="/get-involved">
                Join our movement
              </Link>
            </div>
          </div>
          <figure className="hero__emblem">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset("/media/gsf-monogram.webp")}
              alt="The GSF emblem: a farmer ploughing with an ox under a banyan tree at sunrise, held in a cupped hand, beside a family and a growing leaf."
              width={1020}
              height={502}
              fetchPriority="high"
            />
          </figure>
        </div>
        <p className="hero__foot shell">
          <span>Our philosophy</span>
          <span className="hero__foot-main">{ORG.philosophy}</span>
        </p>
        <div className="arch" aria-hidden="true" />
      </section>

      <Statement text={HOME.title} as="h2">
        <p>{HOME.lede}</p>
        <p>{HOME.body}</p>
      </Statement>

      {/* The focus areas as an index down the page, each to its programme. */}
      <section className="section shell" aria-labelledby="focus-title">
        <div className="section__head">
          <h2 className="section__title caps" id="focus-title">
            Our key focus areas
          </h2>
          <Link className="textlink" href="/programmes">
            All {PROGRAMMES.length} programmes
          </Link>
        </div>
        <ol className="focus">
          {FOCUS_AREAS.map((area, i) => {
            const programme = PROGRAMMES.find((p) => p.slug === area.slug)!;
            return (
              <li key={area.label}>
                <Link className="focus__row" href={`/programmes/${area.slug}`} data-kubai-trigger>
                  <span className="focus__num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon name={programme.icon} size={30} />
                  <span className="focus__label">{area.label}</span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      {/* The name explained, on forest green beside the sunrise from the logo. */}
      <section className="band" data-ground="dark" aria-labelledby="name-title">
        <div className="shell band__inner">
          <div className="band__photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset("/media/bamboo-river.webp")}
              alt="Bamboo leaves against a sunrise over a river valley."
              width={262}
              height={900}
              loading="lazy"
            />
          </div>
          <div className="band__copy">
            <h2 className="band__title caps" id="name-title">
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
            <Link className="textlink textlink--light" href="/about#gandhian-ideology">
              Inspired by Gandhian ideology
            </Link>
          </div>
        </div>
      </section>

      <section className="flourish shell" aria-label="Our belief">
        <p className="flourish__title caps">
          <span>Strong villages</span>
          <span className="flourish__script script">create a</span>
          <span>strong nation</span>
        </p>
      </section>

      {/* How the work runs, as eight numbered steps. */}
      <section className="section shell" aria-labelledby="approach-title">
        <div className="section__head">
          <h2 className="section__title caps" id="approach-title">
            Our development approach
          </h2>
          <Link className="textlink" href="/approach">
            Our approach and values
          </Link>
        </div>
        <ol className="steps">
          {APPROACH.map((step, i) => (
            <li key={step}>
              <span className="steps__num caps" aria-hidden="true">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="section section--tint" aria-labelledby="join-title">
        <div className="shell">
          <div className="section__head">
            <h2 className="section__title caps" id="join-title">
              Join our movement
            </h2>
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
