import Link from "next/link";
import PageHero from "@/components/PageHero";

export default function NotFound() {
  return (
    <>
      <PageHero label="Page not found" lines={["This path", "leads nowhere"]}>
        <p>The page you were looking for has moved or never existed.</p>
      </PageHero>
      <section className="section shell">
        <Link className="button" href="/">
          Back to the home page
        </Link>
      </section>
    </>
  );
}
