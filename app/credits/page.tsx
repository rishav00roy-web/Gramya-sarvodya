import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { ALL_PHOTOS } from "@/lib/photos";
import { PROGRAMMES } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Photo credits",
    description:
      "Who took the photographs used on the Gramya Sarvodaya Foundation website, with links to each photographer.",
    path: "/credits/",
  }),
};

const labelFor = (use: string) =>
  PROGRAMMES.find((p) => p.slug === use)?.title ?? use;

/* Who took each photograph. The Unsplash License does not require credit;
   the Foundation gives it anyway. */
export default function CreditsPage() {
  return (
    <>
      <PageHero label="Photo credits" lines={["Photo credits"]}>
        <p>
          The photographs on this website come from Unsplash and are used under
          the Unsplash License. They illustrate the kind of work each programme
          is about. They do not show the Foundation&apos;s own projects or the
          people it works with.
        </p>
      </PageHero>
      <section className="section shell legal">
        <ul className="credits">
          {ALL_PHOTOS.map(({ use, photo }) => (
            <li key={photo.id}>
              <span className="credits__use">{labelFor(use)}</span>
              <span>
                <a href={photo.page}>{photo.alt.replace(/\.$/, "")}</a>, photo
                by{" "}
                <a href={`https://unsplash.com/@${photo.user}`}>{photo.by}</a>
              </span>
            </li>
          ))}
        </ul>
        <p>
          The Foundation&apos;s logo, emblem and illustrations belong to Gramya
          Sarvodaya Foundation.
        </p>
      </section>
    </>
  );
}
