# Gramya Sarvodaya Foundation

*Strong Villages, Prosperous Nation*

The website of Gramya Sarvodaya Foundation: a static Next.js site (App Router, TypeScript, plain CSS) built on the design system of the Roy & Co site, recoloured in forest green, leaf green, white and earthy brown, with [Kubai Icons](https://icons.kubai.design/) in their soft, single-colour style.

## Pages

Home, About Us (vision, mission, Gandhian philosophy), Our Programmes (index plus a page for each of the 12 initiatives), Our Approach (approach and core values), Our Impact, Get Involved (volunteer and partnership forms), Resources, Contact, and six legal pages.

All copy lives in `lib/site.ts` (and `lib/legal.ts`), taken from the Foundation's content plan. Edit those files to change wording.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
```

Pushing to `main` deploys to GitHub Pages through `.github/workflows/pages.yml`. On a custom domain, remove `NEXT_PUBLIC_BASE_PATH` from the workflow.

## Before launch

- **Forms** have no server: they open the visitor's email app addressed to gramyasarvodaya@gmail.com. Swap in a form service (Formspree, Web3Forms, Google Forms) if you want submissions collected.
- **Impact and Resources** pages say plainly that nothing is published yet. Add real projects, reports, news and photographs as they exist.
- **Legal pages** are working drafts; review them, and add registration, governing-body, statutory and tax-exemption details once verified.
- **Regulated activities.** The site states that the Foundation does not accept deposits or provide financial services, is not itself an FPC, and offers wellness education rather than clinical treatment. Keep those lines unless the legal position changes.
- **Photographs.** The only images are the GSF logo artwork and crops of it. Real photographs of the Foundation's work would lift the site most.
