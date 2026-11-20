import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import { JOIN, PARTNERS, PROGRAMMES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Volunteer, partner with us, support rural entrepreneurs or become a community supporter of Gramya Sarvodaya Foundation.",
};

export default function GetInvolvedPage() {
  const interests = PROGRAMMES.map((p) => p.short);
  return (
    <>
      <PageHero label="Get Involved" lines={["Be a part of", "rural transformation"]}>
        <p>
          We welcome individuals, institutions, development organizations, farmers, researchers,
          entrepreneurs, volunteers and socially responsible partners to join our mission.
        </p>
      </PageHero>

      <section className="section shell" aria-label="Ways to get involved">
        <ul className="ways ways--wide">
          {JOIN.map((w) => (
            <li key={w.id} id={w.id}>
              <div className="ways__item" data-kubai-trigger>
                <Icon name={w.icon} size={36} />
                <h2 className="ways__title">{w.title}</h2>
                <p className="ways__text">{w.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="section section--tint" aria-label="Volunteer form">
        <div className="shell">
          <EnquiryForm
            kind="volunteer"
            title="Volunteer with us"
            intro="Tell us a little about yourself and the skills or time you can give."
            interests={interests}
          />
        </div>
      </section>

      <section className="section shell" id="partnerships" aria-labelledby="partners-title">
        <div className="prose-split">
          <div>
            <h2 className="section__title caps" id="partners-title">
              Partnerships &amp; collaboration
            </h2>
            <p className="section__lede">We welcome partnerships with:</p>
          </div>
          <div>
            <ul className="ticks ticks--two">
              {PARTNERS.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p className="section__close">
              Together, we can create scalable and sustainable rural development models.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--tint" aria-label="Partnership form">
        <div className="shell">
          <EnquiryForm
            kind="partner"
            title="Propose a partnership"
            intro="Collaborate with us on sustainable agriculture, education, environment and livelihood projects."
          />
        </div>
      </section>
    </>
  );
}
