// app/pakalpojumi/web-izstrade/layout.tsx
import { Metadata } from "next";
import { baseMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Web Izstrāde Latvijā | WebWorks - Jūsu Digitālais Partneris",
  description:
    "WebWorks piedāvā profesionālu web izstrādi Latvijā. Radām SEO optimizētas, responsīvas un konversijām orientētas mājaslapas ar cenām sākot no €199. Growth Catalyst pakete tagad ar €600 bonusu.",
  keywords:
    "web izstrāde, mājaslapa, responsīvs dizains, e-komercija, SEO optimizācija, CMS, web dizains, Latvija",
  alternates: {
    canonical: "https://www.webworks.lv/pakalpojumi/web-izstrade",
  },
  openGraph: {
    ...baseMetadata.openGraph,
    type: "website",
    url: "https://www.webworks.lv/pakalpojumi/web-izstrade",
    title: "Web Izstrāde | WebWorks 🚀 Cenas no €199",
    description:
      "✓ Modernas mājaslapas ✓ SEO optimizācija ✓ E-komercija ✓ Growth Catalyst pakete ar €600 bonusu. Izveidojiet savu profesionālo mājaslapu ar WebWorks!",
    images: [
      {
        url: "https://www.webworks.lv/images/web-development-og.jpg",
        width: 1200,
        height: 630,
        alt: "WebWorks Web Izstrāde",
      },
    ],
  },
  twitter: {
    ...baseMetadata.twitter,
    title: "Web Izstrāde | WebWorks 🚀 Cenas no €199",
    description:
      "✓ Modernas mājaslapas ✓ SEO optimizācija ✓ E-komercija ✓ Growth Catalyst pakete ar €600 bonusu. Izveidojiet savu profesionālo mājaslapu ar WebWorks!",
    images: ["https://www.webworks.lv/images/web-development-og.jpg"],
  },
};

export default function WebIzstradeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
