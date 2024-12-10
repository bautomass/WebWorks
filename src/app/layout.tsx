// app/layout.tsx
import { Inter } from "next/font/google";
import { baseMetadata } from "@/lib/metadata";
import {
  websiteSchema,
  organizationSchema,
  localBusinessSchema,
} from "@/lib/schema";
import CookieConsentBar from "@/components/CookieConsentBar";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = baseMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="lv" data-theme="light">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="geo.region" content="LV" />
        <meta name="geo.placename" content="Jelgava" />

        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                websiteSchema,
                organizationSchema,
                localBusinessSchema,
              ],
            }),
          }}
        />
      </head>
      <CookieConsentBar />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
