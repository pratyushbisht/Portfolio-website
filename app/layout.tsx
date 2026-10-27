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

export const metadata: Metadata = {
  title: { default: "Pratyush Bisht | UX Designer", template: "%s | Pratyush Bisht" },
  description:
    "UX designer at Purdue crafting intuitive experiences grounded in real research.",
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
