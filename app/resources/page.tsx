import type { Metadata } from "next";
import Closing from "@/components/Closing";
import PageHero from "@/components/PageHero";
import ResourceFeeds from "@/components/ResourceFeeds";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Resources",
    description:
      "News, photo gallery and publications from Gramya Sarvodaya Foundation, a rural development organisation in Jorhat, Assam.",
    path: "/resources/",
  }),
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero label="Resources" lines={["News", "& publications"]}>
        <p>News from the field, photographs from our villages, and what we publish.</p>
      </PageHero>
      <section className="section shell" aria-label="Resources">
        <ResourceFeeds />
      </section>
      <Closing />
    </>
  );
}
