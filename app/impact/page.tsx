import type { Metadata } from "next";
import Closing from "@/components/Closing";
import PageHero from "@/components/PageHero";
import Pending from "@/components/Pending";

export const metadata: Metadata = {
  title: "Our Impact",
  description: "Projects, activities and reports from Gramya Sarvodaya Foundation.",
};

export default function ImpactPage() {
  return (
    <>
      <PageHero label="Our Impact" lines={["Projects", "& reports"]} script="Satya">
        <p>Truth and transparency: we publish what we do, as it is documented.</p>
      </PageHero>
      <section className="section shell" aria-label="Impact">
        <Pending
          items={[
            {
              id: "projects",
              icon: "project",
              title: "Projects",
              text: "Each project will be listed here with its village, its programme and what it set out to do.",
            },
            {
              id: "activities",
              icon: "activity",
              title: "Activities",
              text: "Trainings, field schools, plantation drives and campaigns, recorded as they take place.",
            },
            {
              id: "reports",
              icon: "report",
              title: "Reports",
              text: "Annual and project reports, published here once they are prepared and verified.",
            },
          ]}
        />
      </section>
      <Closing
        title={["Ask us", "about our work"]}
        text="Until reports are published here, we are glad to answer questions about our projects and activities directly."
      />
    </>
  );
}
