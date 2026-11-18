import type { Metadata, Viewport } from "next";
import { Imbue, Pinyon_Script, Archivo } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { ORG, INTRO } from "@/lib/site";
import "./globals.css";

// Condensed Didone capitals for display, drawn for their size by the
// optical-size axis: a 160px headline and a 20px link both look right.
const display = Imbue({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-display",
  display: "swap",
});

// For the one word on a screen that should look written by hand.
const script = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

// Body at normal width, labels at the wide end of the same variable file.
const ui = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-ui",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(ORG.url),
  title: {
    default: `${ORG.name} – ${ORG.motto}`,
    template: `%s · ${ORG.name}`,
  },
  description: INTRO,
  openGraph: {
    type: "website",
    siteName: ORG.name,
    title: `${ORG.name} – ${ORG.motto}`,
    description: ORG.tagline,
    images: [{ url: "/media/gsf-sunrise.webp", width: 1600, height: 900 }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#13261a",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${script.variable} ${ui.variable}`}>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
