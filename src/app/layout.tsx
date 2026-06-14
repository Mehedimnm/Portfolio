import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Funnel_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { site, seoKeywords } from "@/data/site";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Cursor } from "@/components/ui/Cursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Background } from "@/components/three/Background";
import { JsonLd } from "@/components/seo/JsonLd";

/**
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  FIXED PROJECT FONTS — DO NOT CHANGE OR ADD NEW FONTS             │
 * │  See FONTS.md / AGENTS.md before editing anything font related.   │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * The ONLY fonts allowed in this portfolio are:
 *   1. IBM Plex Mono  — Regular (400), Medium (500), Bold (700)
 *   2. Funnel Display — Light (300)
 *   3. DM Sans        — Regular (400), optical size 9pt (opsz: 9)
 */

// IBM Plex Mono — Regular / Medium / Bold
const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

// Funnel Display — Light only (weight pinned via CSS to 300)
const funnelDisplay = Funnel_Display({
  variable: "--font-funnel-display",
  subsets: ["latin"],
  weight: ["300"],
  display: "swap",
});

// DM Sans — Regular at 9pt optical size (opsz axis enabled, value pinned in globals.css)
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: seoKeywords,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: {
    canonical: site.url,
  },
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    title: site.title,
    description: site.description,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    creator: "@mehedihasanbd",
  },
  icons: { icon: "/favicon.ico" },
  // After verifying the site in Google Search Console, paste the code here:
  // verification: { google: "your-google-site-verification-code" },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${ibmPlexMono.variable} ${funnelDisplay.variable} h-full antialiased`}
    >
      <body className="grain min-h-full">
        <JsonLd />
        <Background />
        <SmoothScrollProvider>
          <ScrollProgress />
          <Cursor />
          <Navbar />
          <main className="relative z-10 flex min-h-screen flex-col">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
