import type { Metadata, Viewport } from "next";
import { Noto_Serif, Noto_Sans, Pinyon_Script } from "next/font/google";
import Motion from "@/components/Motion";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { ORG } from "@/lib/site";
import { HOME_DESCRIPTION, SHARE_IMAGE } from "@/lib/seo";
import "./globals.css";

// A book serif for headings, set in sentence case: the voice of an
// institution that publishes, rather than a poster.
const display = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-display",
  display: "swap",
});

// Its sans partner for reading, labels and controls.
const ui = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-ui",
  display: "swap",
});

// The one twist of hand: a script for a single phrase on a screen.
const script = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(ORG.url),
  title: {
    default: `${ORG.name} – ${ORG.motto}`,
    template: `%s · ${ORG.name}`,
  },
  description: HOME_DESCRIPTION,
  applicationName: ORG.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: ORG.name,
    title: `${ORG.name} – ${ORG.motto}`,
    description: HOME_DESCRIPTION,
    images: [SHARE_IMAGE],
  },
  twitter: { card: "summary_large_image", images: [SHARE_IMAGE.url] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#13261a",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${display.variable} ${script.variable} ${ui.variable}`}>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <Motion />
      </body>
    </html>
  );
}
