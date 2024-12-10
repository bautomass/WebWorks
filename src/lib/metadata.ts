// src/lib/metadata.ts
import { Metadata } from "next";

const siteConfig = {
  name: "WebWorks",
  url: "https://www.webworks.lv",
  email: "info@webworks.lv",
  phone: "+37126282630",
  location: "Jelgava, Latvia",
};

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default:
      "WebWorks Modernu Mājas lapu & E-komercijas Risinājumu Izstrāde | No €199",
    template: "%s | WebWorks",
  },
  description:
    "WebWorks - Pārvērtīsim Tavu uzņēmumu digitālā veiksmes stāstā. Izstrādājam mājaslapas un e-veikalus, kas izskatās izcili un sasniedz rezultātus. SEO optimizēti risinājumi no €199. Esi pamanāms digitālajā vidē.",

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
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#eec71b",
      },
    ],
  },

  openGraph: {
    type: "website",
    locale: "lv_LV",
    url: "https://www.webworks.lv/",
    siteName: "WebWorks - Modernu Mājaslapu Izstrāde",
    title:
      "WebWorks - Modernu Mājaslapu & E-komercijas Izstrāde | Labākās Cenas Latvijā",
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
        alt: "WebWorks - Moderna Mājaslapu Izstrāde",
      },
    ],
    emails: ["info@webworks.lv"],
    phoneNumbers: ["+37126282630"],
    countryName: "Latvia",
    locality: "Jelgava",
  },

  twitter: {
    card: "summary_large_image",
    title: "WebWorks Moderna Web Izstrāde",
    description:
      "Profesionāla mājaslapu un e-veikalu izstrāde. SEO optimizācija, moderns dizains.",
    creator: "@webworks_lv",
    images: ["https://www.webworks.lv/images/og-image.svg"],
  },

  manifest: "/manifest.json",
};
