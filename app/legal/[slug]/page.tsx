import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { LEGAL, getLegal } from "@/lib/legal";
import JsonLd from "@/components/JsonLd";
import { LEGAL_PENDING } from "@/lib/site";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return LEGAL.map((d) => ({ slug: d.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegal(slug);
  return doc ? pageMeta({ title: doc.title, description: doc.description, path: `/legal/${doc.slug}/` }) : {};
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getLegal(slug);
  if (!doc) notFound();

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: doc.title, path: `/legal/${doc.slug}/` }])} />
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
