import type { Metadata } from "next";
import Closing from "@/components/Closing";
import PageHero from "@/components/PageHero";
import ResourceFeeds from "@/components/ResourceFeeds";

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
        <ResourceFeeds />
      </section>
      <Closing />
    </>
  );
}
