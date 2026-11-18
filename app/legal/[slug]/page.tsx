import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { LEGAL, getLegal } from "@/lib/legal";
import { LEGAL_PENDING } from "@/lib/site";

export function generateStaticParams() {
  return LEGAL.map((d) => ({ slug: d.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegal(slug);
  return doc ? { title: doc.title } : {};
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getLegal(slug);
  if (!doc) notFound();

  return (
    <>
      <PageHero label={doc.title} lines={doc.lines} />
      <article className="section shell legal">
        {doc.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="legal__heading">{s.heading}</h2>
            {s.body.map((b) => (
              <p key={b}>{b}</p>
            ))}
          </section>
        ))}
        {doc.slug !== "disclaimer" && <p className="legal__pending">{LEGAL_PENDING}</p>}
      </article>
    </>
  );
}
