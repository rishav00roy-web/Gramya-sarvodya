import type { Metadata } from "next";
import Closing from "@/components/Closing";
import PageHero from "@/components/PageHero";
import ProgrammeIndex from "@/components/ProgrammeIndex";
import { MISSION, PROGRAMME_STATUS, PROGRAMMES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Programmes",
  description: `${PROGRAMMES.length} development initiatives, from natural farming and Farmer Producer Companies to green education, rural industries and waste-to-wealth.`,
};

export default function ProgrammesPage() {
  return (
    <>
      <PageHero label="Our Programmes" lines={["Twelve", "initiatives"]}>
        <p>{MISSION[0]} {MISSION[1]} {MISSION[2]}</p>
      </PageHero>
      <section className="section shell" aria-label="All programmes">
        <p className="status-note">{PROGRAMME_STATUS}</p>
        <ProgrammeIndex />
      </section>
      <Closing />
    </>
  );
}
