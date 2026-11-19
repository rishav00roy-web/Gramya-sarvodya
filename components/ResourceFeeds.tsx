"use client";

import { useQuery } from "convex/react";
import { anyApi } from "convex/server";
import Icon from "@/components/Icon";
import { ConvexShell, hasConvex } from "@/components/account/convex";
import { ORG } from "@/lib/site";

const api = anyApi;
type Item = {
  id: string;
  title: string;
  body: string;
  date: string;
  link: string;
  fileUrl: string | null;
};

/* The one news item that is already true: the website itself. */
const LAUNCH: Item = {
  id: "launch",
  title: "Our website is live",
  body: "The Foundation's website is now online, with our twelve programme areas, how to volunteer or partner with us, and member accounts for supporters.",
  date: "2026-11-18",
  link: "",
  fileUrl: null,
};

const when = (d: string) =>
  new Date(`${d}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

/* News, gallery and publications as the Foundation's admins post them from
   My Account. A section with nothing in it says so plainly; nothing is
   invented to fill it. */
export default function ResourceFeeds() {
  if (!hasConvex) return <Feeds news={[LAUNCH]} gallery={[]} publications={[]} />;
  return (
    <ConvexShell>
      <Live />
    </ConvexShell>
  );
}

function Live() {
  const news = useQuery(api.content.list, { kind: "news" }) as Item[] | undefined;
  const gallery = useQuery(api.content.list, { kind: "gallery" }) as Item[] | undefined;
  const publications = useQuery(api.content.list, { kind: "publication" }) as
    | Item[]
    | undefined;
  return (
    <Feeds
      news={news ? [...news, LAUNCH] : undefined}
      gallery={gallery?.filter((g) => g.fileUrl)}
      publications={publications}
    />
  );
}

function Feeds({
  news,
  gallery,
  publications,
}: {
  news?: Item[];
  gallery?: Item[];
  publications?: Item[];
}) {
  return (
    <div className="feeds">
      <section id="news" className="feed" aria-labelledby="news-title">
        <header className="feed__head">
          <Icon name="news" size={34} trigger="hover" />
          <h2 className="feed__title caps" id="news-title">
            News
          </h2>
        </header>
        {news === undefined ? (
          <Loading />
        ) : (
          <ul className="news">
            {news.map((n) => (
              <li key={n.id} className="news__item">
                {n.fileUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="news__img" src={n.fileUrl} alt="" loading="lazy" />
                )}
                <div className="news__words">
                  <time className="news__date" dateTime={n.date}>
                    {when(n.date)}
                  </time>
                  <h3 className="news__title">{n.title}</h3>
                  {n.body && <p className="news__body">{n.body}</p>}
                  {n.link && (
                    <a className="textlink" href={n.link} rel="noopener noreferrer">
                      Read more
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section id="gallery" className="feed" aria-labelledby="gallery-title">
        <header className="feed__head">
          <Icon name="gallery" size={34} trigger="hover" />
          <h2 className="feed__title caps" id="gallery-title">
            Gallery
          </h2>
        </header>
        {gallery === undefined ? (
          <Loading />
        ) : gallery.length ? (
          <ul className="gallery">
            {gallery.map((g) => (
              <li key={g.id}>
                <figure>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.fileUrl!} alt={g.title} loading="lazy" />
                  <figcaption>
                    {g.title}
                    <time dateTime={g.date}>{when(g.date)}</time>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        ) : (
          <Empty text="Photographs from our villages, field schools and workshops will appear here as programmes begin." />
        )}
      </section>

      <section id="publications" className="feed" aria-labelledby="pub-title">
        <header className="feed__head">
          <Icon name="publication" size={34} trigger="hover" />
          <h2 className="feed__title caps" id="pub-title">
            Publications
          </h2>
        </header>
        {publications === undefined ? (
          <Loading />
        ) : publications.length ? (
          <ul className="pubs">
            {publications.map((p) => (
              <li key={p.id} className="pubs__item">
                <time className="news__date" dateTime={p.date}>
                  {when(p.date)}
                </time>
                <h3 className="news__title">{p.title}</h3>
                {p.body && <p className="news__body">{p.body}</p>}
                <span className="pubs__links">
                  {p.fileUrl && (
                    <a className="textlink" href={p.fileUrl} rel="noopener noreferrer">
                      Download PDF
                    </a>
                  )}
                  {p.link && (
                    <a className="textlink" href={p.link} rel="noopener noreferrer">
                      Open link
                    </a>
                  )}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <Empty text="Guides, training material and papers on sustainable rural development will be listed here." />
        )}
      </section>
    </div>
  );
}

function Loading() {
  return (
    <p className="feed__empty" role="status">
      Loading…
    </p>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <p className="feed__empty">
      {text} Have something to share? Write to <a href={`mailto:${ORG.email}`}>{ORG.email}</a>.
    </p>
  );
}
