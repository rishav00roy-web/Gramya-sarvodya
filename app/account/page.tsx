import type { Metadata } from "next";
import AccountApp from "@/components/account/AccountApp";
import PageHero from "@/components/PageHero";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMeta({
    title: "My Account",
    description: "Sign in with a code sent to your email and keep your profile up to date.",
    path: "/account/",
  }),
  robots: { index: false, follow: true },
};

export default function AccountPage() {
  return (
    <>
      <PageHero label="My Account" lines={["Member", "account"]}>
        <p>
          Sign in with a code sent to your email. No password is needed. Your profile tells the
          Foundation how you would like to take part.
        </p>
      </PageHero>
      <section className="section shell account" aria-label="Account">
        <AccountApp />
      </section>
    </>
  );
}
