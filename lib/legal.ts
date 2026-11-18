import { LEGAL_PENDING, ORG } from "@/lib/site";

/* Working drafts of the website's legal pages, written for a static site
   that sets no cookies of its own and stores only optional member accounts
   (in Convex). They should be
   reviewed against the Foundation's registration documents before launch. */
export type LegalDoc = {
  slug: string;
  title: string;
  lines: [string, string];
  sections: { heading: string; body: string[] }[];
};

const contact = `${ORG.email} or ${ORG.phone}`;

export const LEGAL: LegalDoc[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    lines: ["Privacy", "policy"],
    sections: [
      {
        heading: "What this website collects",
        body: [
          "The website's enquiry forms do not store what you type. When you use one, the site opens your own email application with your message addressed to the Foundation; nothing is sent until you press send there.",
        ],
      },
      {
        heading: "Member accounts",
        body: [
          "You can choose to create a member account. If you do, we store your email address, the date you joined, and any profile details you add (such as your name, phone number, village or district and how you would like to take part). This is kept with Convex, the database service that runs the account area, and may be held on servers outside India.",
          "To sign in, we send a one-time code to your email through Resend, an email delivery service. The code works for 15 minutes. While you are signed in, a sign-in token is kept in your browser's local storage; signing out removes it.",
          `You can change your profile at any time on the My Account page. To have your account deleted, write to ${contact}.`,
        ],
      },
      {
        heading: "How we use what you send us",
        body: [
          "When you write to us, we use your name, contact details and message only to reply to you and to take forward the volunteering, partnership or enquiry you raised. We do not sell or rent personal information.",
        ],
      },
      {
        heading: "Keeping and removing your information",
        body: [
          `We keep correspondence only as long as it is needed for the purpose you contacted us about. To ask what we hold about you, or to have it corrected or deleted, write to ${contact}.`,
        ],
      },
    ],
  },
  {
    slug: "terms-and-conditions",
    title: "Terms and Conditions",
    lines: ["Terms and", "conditions"],
    sections: [
      {
        heading: "Use of this website",
        body: [
          `This website is provided by ${ORG.name} to share information about its work. By using it you agree to use it lawfully and not to interfere with its operation.`,
        ],
      },
      {
        heading: "Content",
        body: [
          "The text, emblem and images on this website belong to the Foundation unless stated otherwise. You may share pages and quote short passages with credit to the Foundation. Please ask before reusing the emblem or images.",
        ],
      },
      {
        heading: "Changes",
        body: ["We may update these terms as the website and the Foundation's work develop."],
      },
    ],
  },
  {
    slug: "disclaimer",
    title: "Disclaimer",
    lines: ["Website", "disclaimer"],
    sections: [
      {
        heading: "General information",
        body: [
          "The information on this website is provided in good faith for general awareness. It is not professional, legal, financial or medical advice.",
        ],
      },
      {
        heading: "Separate institutions",
        body: [
          "The Foundation does not accept deposits, lend money or provide any regulated financial service. Any credit cooperative society will be a separate institution under its own registration.",
          "The Foundation supports the formation of Farmer Producer Companies but is not itself a Farmer Producer Company.",
          "Wellness activities described on this website are education and awareness. Any medical treatment or clinical service will be provided only through appropriately qualified and legally authorized professionals and facilities.",
        ],
      },
      {
        heading: "Registration details",
        body: [LEGAL_PENDING],
      },
    ],
  },
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    lines: ["Cookie", "policy"],
    sections: [
      {
        heading: "Cookies on this website",
        body: [
          "This website does not set cookies of its own and does not use advertising or tracking cookies. Fonts are served with the site itself.",
          "If you sign in to a member account, a sign-in token is kept in your browser's local storage (not a cookie) so that you stay signed in. Signing out removes it.",
          "If analytics or embedded content are added in future, this page will be updated first to say what they are and how to refuse them.",
        ],
      },
    ],
  },
  {
    slug: "accessibility",
    title: "Website Accessibility",
    lines: ["Website", "accessibility"],
    sections: [
      {
        heading: "Our aim",
        body: [
          "We want everyone to be able to read and use this website. It is designed with the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA in mind: strong text contrast, keyboard access to every page, descriptions on images, and less motion when your device asks for it. It has not yet been independently audited.",
        ],
      },
      {
        heading: "Tell us about a barrier",
        body: [
          `If any part of this website is hard to use, please tell us at ${contact}, and we will try to fix it or send you the information another way.`,
        ],
      },
    ],
  },
  {
    slug: "grievance-and-feedback",
    title: "Grievance and Feedback",
    lines: ["Grievance", "& feedback"],
    sections: [
      {
        heading: "How to raise a concern",
        body: [
          `Feedback and grievances about the Foundation's work or this website are welcome. Write to ${ORG.email} with "Grievance" in the subject line, or call ${ORG.phone}.`,
          "Please include your name, a way to reach you, and what happened. We aim to acknowledge every message and let you know how it will be looked into.",
        ],
      },
    ],
  },
];

export function getLegal(slug: string) {
  return LEGAL.find((d) => d.slug === slug);
}
