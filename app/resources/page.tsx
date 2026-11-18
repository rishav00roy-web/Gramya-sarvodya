import type { Metadata } from "next";
import Closing from "@/components/Closing";
import PageHero from "@/components/PageHero";
import Pending from "@/components/Pending";

export const metadata: Metadata = {
  title: "Resources",
  description: "News, gallery and publications from Gramya Sarvodaya Foundation.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero label="Resources" lines={["News", "& publications"]} script="learn">
        <p>News from the field, photographs from our villages, and what we publish.</p>
      </PageHero>
      <section className="section shell" aria-label="Resources">
        <Pending
          items={[
            {
              id: "news",
              icon: "news",
              title: "News",
              text: "Announcements, events and stories from our programmes.",
            },
            {
              id: "gallery",
              icon: "gallery",
              title: "Gallery",
              text: "Photographs from farms, field schools, workshops and village enterprises.",
            },
            {
              id: "publications",
              icon: "publication",
              title: "Publications",
              text: "Guides, training material and papers on sustainable rural development.",
            },
          ]}
        />
      </section>
      <Closing />
    </>
  );
}
