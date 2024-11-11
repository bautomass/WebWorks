import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.webworks.lv"),
  title: {
    default:
      "WebWorks Modernu Mājas lapu & E-komercijas Risinājumu Izstrāde | No €199",
    template: "%s | WebWorks",
  },
  description:
    "WebWorks - Vadošā Web Izstrādes Kompānija Latvijā. Mājaslapas no €199, E-veikali no €499. 200+ Veiksmīgi Projekti, 98% Klientu Apmierinātība, SEO Optimizācija un 24/7 Atbalsts. Bezmaksas Konsultācija!",
  keywords: [
    "mājas lapu izstrāde",
    "mājaslapu izstrāde",
    "interneta veikalu izstrāde",
    "web development",
    "e-commerce izstrāde",
    "wordpress izstrāde",
    "seo optimizācija",
    "responsīvs dizains",
    "web dizains",
    "digitālais mārketings",
    "mājas lapas izveide cena",
    "web lapu izstrade",
    "interneta veikala izveide",
    "majas lapu izstrade",
    "e-veikala izstrāde",
  ].join(", "),

  // Basic Metadata
  generator: "Next.js",
  applicationName: "WebWorks",
  referrer: "origin-when-cross-origin",
  authors: [{ name: "WebWorks", url: "https://www.webworks.lv" }],
  creator: "WebWorks",
  publisher: "WebWorks",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
      { url: "/apple-touch-icon-152x152.png", sizes: "152x152" },
    ],
    other: [
      {
        rel: "mask-icon", // For Safari pinned tabs
        url: "/safari-pinned-tab.svg",
        color: "#eec71b",
      },
    ],
  },

  // OpenGraph
  openGraph: {
    type: "website",
    locale: "lv_LV",
    url: "https://www.webworks.lv/",
    siteName: "WebWorks - Moderna Mājaslapu Izstrāde",
    title:
      "WebWorks Moderna Mājaslapu & E-komercijas Izstrāde | Labākās Cenas Latvijā",
    description:
      "Profesionāla mājaslapu un e-veikalu izstrāde. SEO optimizācija, moderns dizains, draudzīgas cenas. Izveidojiet savu biznesu internetā ar WebWorks!",
    images: [
      {
        url: "https://www.webworks.lv/images/og-image.svg",
        width: 1200,
        height: 630,
        alt: "WebWorks - Moderna Web Izstrāde",
      },
      {
        url: "https://www.webworks.lv/images/webworks.svg",
        width: 600,
        height: 600,
        alt: "WebWorks Logo",
      },
    ],
    emails: ["info@webworks.lv"],
    phoneNumbers: ["+37126282630"],
    countryName: "Latvia",
    locality: "Jelgava",
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "WebWorks Moderna Web Izstrāde",
    description:
      "Profesionāla mājaslapu un e-veikalu izstrāde. SEO optimizācija, moderns dizains.",
    creator: "@webworks_lv",
    images: ["https://www.webworks.lv/images/og-image.svg"],
  },

  // Alternative Languages
  alternates: {
    canonical: "https://www.webworks.lv",
  },

  // Manifest
  manifest: "/manifest.json",

  // Other
  metadata: {
    category: "tehnoloģijas",
    subCategory: "tīmekļa-pakalpojumi",
    classification: "Tīmekļa Izstrāde & Dizains",
    industries: ["e-komercija", "digitālais-mārketings", "web-dizains"],
    businessType: "B2B",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="lv" data-theme="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/custom-font.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="geo.region" content="LV" />
        <meta name="geo.placename" content="Jelgava" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
