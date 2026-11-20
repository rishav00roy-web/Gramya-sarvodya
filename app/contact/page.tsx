import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import { ORG, PROGRAMMES } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Contact Us",
    description: `Contact ${ORG.name} in Jorhat, Assam. Write to ${ORG.email} or call ${ORG.phone}.`,
    path: "/contact/",
  }),
};

export default function ContactPage() {
  return (
    <>
      <PageHero label="Contact" lines={["Gramya Sarvodaya", "Foundation"]}>
        <p>
          For partnerships, volunteering, project collaboration, rural development initiatives and
          general enquiries, please contact us.
        </p>
      </PageHero>

      <section className="section shell contact" aria-label="Contact details and enquiry form">
        <ul className="contact__ways">
          <li>
            <a className="contact__way" href={`mailto:${ORG.email}`} data-kubai-trigger>
              <Icon name="mail" size={36} />
              <span className="contact__term">Email</span>
              <span className="contact__value">{ORG.email}</span>
            </a>
          </li>
          <li>
            <a className="contact__way" href={ORG.phoneHref} data-kubai-trigger>
              <Icon name="phone" size={36} />
              <span className="contact__term">Contact number</span>
              <span className="contact__value">{ORG.phone}</span>
            </a>
          </li>
          <li>
            <a className="contact__way" href={ORG.url} data-kubai-trigger>
              <Icon name="globe" size={36} />
              <span className="contact__term">Website</span>
              <span className="contact__value">{ORG.website}</span>
            </a>
          </li>
          <li>
            <div className="contact__way" data-kubai-trigger>
              <Icon name="pin" size={36} />
              <span className="contact__term">Office address</span>
              <address className="contact__value">
                {ORG.office.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </address>
            </div>
          </li>
        </ul>

        <EnquiryForm
          kind="enquiry"
          title="Send an enquiry"
          interests={[...PROGRAMMES.map((p) => p.short), "Partnership", "Volunteering", "Something else"]}
        />
      </section>
    </>
  );
}
