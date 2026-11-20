import { ABOUT, INTRO, ORG, PROGRAMMES } from "@/lib/site";

export const dynamic = "force-static";

/* A plain-text guide to the site for AI assistants (llms.txt), built from
   the same content as the pages so the two never disagree. */
export function GET() {
  const page = (path: string) => `${ORG.url}${path}`;
  const text = [
    `# ${ORG.name}`,
    "",
    `> ${INTRO}`,
    "",
    ABOUT.who[0],
    "",
    `Office: ${ORG.office.join(", ")}. Email: ${ORG.email}. Phone: ${ORG.phone}.`,
    "",
    "## About",
    "",
    `- [About us](${page("/about/")}): who the Foundation is, its philosophy, Gandhian ideology, vision and mission`,
    `- [Our approach](${page("/approach/")}): how the Foundation works with communities`,
    `- [Get involved](${page("/get-involved/")}): volunteering, partnerships and support`,
    `- [Contact](${page("/contact/")}): email, phone and office address`,
    "",
    "## Programmes",
    "",
    ...PROGRAMMES.map((p) => `- [${p.title}](${page(`/programmes/${p.slug}/`)}): ${p.intro[0]}`),
    "",
    "## Optional",
    "",
    `- [Impact](${page("/impact/")}): projects, activities and reports, published as work begins`,
    `- [Resources](${page("/resources/")}): news, gallery and publications`,
    `- [Disclaimer](${page("/legal/disclaimer/")})`,
    "",
  ].join("\n");
  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
