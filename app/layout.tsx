import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MotionProvider } from "@/components/motion/MotionProvider";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-sora",
});

const SITE_TITLE = "Pratyush Bisht | UX Designer and Researcher";
const SITE_DESCRIPTION =
  "UX designer and researcher pursuing a Master's in UX Design at Purdue University, exploring how design can make technology more meaningful and accessible.";

/**
 * Absolute base for share-image URLs (relative ones are ignored by most platforms).
 * Vercel sets VERCEL_PROJECT_PRODUCTION_URL at build time; localhost is the dev fallback.
 * TODO: switch to final domain
 */
const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: "%s | Pratyush Bisht" },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Pratyush Bisht",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Pratyush Bisht, UX Designer and Researcher" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0C0C0C",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sora.variable}>
      <body>
        <MotionProvider>
          <Header />
          {children}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
