# Gramya Sarvodaya Foundation

*Strong Villages, Prosperous Nation*

The website of Gramya Sarvodaya Foundation: a static Next.js site (App Router, TypeScript, plain CSS) laid out like a large foundation site (section menus, a creed hero, round programme badges, a programme carousel), in forest green, leaf green, warm white and earthy brown, with [Kubai Icons](https://icons.kubai.design/) in their soft, single-colour style.

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

## Member accounts (email code sign-in)

`/account/` lets visitors sign in with a six-digit code emailed to them and
keep a profile. It runs in the browser against [Convex](https://convex.dev)
(functions in `convex/`, Convex Auth with an email code sent through Brevo or Resend, both on free plans); the rest
of the site stays a static export.

Environment variables, all set in Vercel (Production):

| Name | What it is |
| --- | --- |
| `CONVEX_DEPLOY_KEY` | Production deploy key from the Convex dashboard. Without it the site builds without sign-in. |
| `AUTH_BREVO_KEY` | Brevo API key (free plan, 300 emails a day). Sends from one verified address, so no domain is needed. Used first if set. |
| `AUTH_RESEND_KEY` | Resend API key (free plan). Sends to anyone only from a domain verified in Resend. |
| `AUTH_EMAIL_FROM` | Sender address, e.g. the Foundation's Gmail verified as a Brevo sender. Required with Brevo. |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | Google OAuth client for "Continue with Google". The button appears only when both are set. Redirect URI: `https://<deployment>.convex.site/api/auth/callback/google`. |
| `SITE_URL` | Optional; defaults to https://gramya-three.vercel.app. |

`npm run build` (`scripts/build.mjs`) creates the Convex sign-in keys on the
first deploy, copies the email settings to Convex, pushes `convex/` and
builds the site with `NEXT_PUBLIC_CONVEX_URL` set.
