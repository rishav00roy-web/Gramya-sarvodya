import type { Metadata } from "next";
import Closing from "@/components/Closing";
import PageHero from "@/components/PageHero";
import { APPROACH, VALUES } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Our Approach",
    description:
      "A community-centred development model that combines local knowledge, scientific understanding and collective action.",
    path: "/approach/",
  }),
};

export default function ApproachPage() {
  return (
    <>
      <PageHero label="Our Approach" lines={["Community", "centred"]}>
        <p>We follow a community-centred development model.</p>
      </PageHero>

      <section className="section shell" aria-labelledby="model-title">
        <div className="section__head section__head--stack">
          <h2 className="section__title caps" id="model-title">
            How we work, step by step
          </h2>
          <p className="section__lede">
            Our approach combines local knowledge, scientific understanding and collective action.
          </p>
        </div>
        <ol className="steps steps--long">
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

      <section className="band band--plain band--panel shell" aria-labelledby="values-title">
        <div data-ground="dark">
          <h2 className="band__title caps" id="values-title">
            Our core values
          </h2>
          <ul className="values">
            {VALUES.map((v) => (
              <li key={v} className="caps">
                {v}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Closing />
    </>
  );
}
