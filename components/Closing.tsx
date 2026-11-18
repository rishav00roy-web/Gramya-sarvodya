import EnquiryForm from "@/components/EnquiryForm";
import Icon from "@/components/Icon";
import { ORG } from "@/lib/site";

/* The close above the footer on most pages: an invitation set large with
   the two ways to reach the Foundation directly, and a short email form. */
export default function Closing({
  title = ["Be a part of", "rural transformation"],
  text = "For partnerships, volunteering, project collaboration, rural development initiatives and general enquiries, please contact us.",
}: {
  title?: [string, string];
  text?: string;
}) {
  return (
    <section className="closing shell" aria-labelledby="closing-title">
      <div className="closing__inner">
        <div className="closing__words">
          <h2 className="closing__title caps" id="closing-title">
            <span>{title[0]}</span>
            <span>{title[1]}</span>
          </h2>
          <p className="closing__text">{text}</p>
          <div className="closing__ways">
            <a
              className="closing__way"
              href={`mailto:${ORG.email}`}
              data-kubai-trigger
            >
              <Icon name="mail" tone="sprout" />
              <span>{ORG.email}</span>
            </a>
            <a className="closing__way" href={ORG.phoneHref} data-kubai-trigger>
              <Icon name="phone" tone="sprout" />
              <span>{ORG.phone}</span>
            </a>
          </div>
        </div>
        <div className="closing__form">
          <EnquiryForm kind="enquiry" title="Write to us" compact />
        </div>
      </div>
    </section>
  );
}
