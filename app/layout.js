import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WebsiteSchema } from "@/components/Schema";
import { SITE } from "@/lib/constants";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: {
    default: `${SITE.name} — Science-Backed Ayurveda Research`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.twitter,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <WebsiteSchema />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
