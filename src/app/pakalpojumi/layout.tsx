// app/pakalpojumi/layout.tsx
import { Metadata } from "next";
import { baseMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Digitālie Pakalpojumi Latvijā | WebWorks 🚀 Web Izstrāde, SEO, SAAS",
  description:
    "Pilns digitālo pakalpojumu klāsts no WebWorks. Web izstrāde no €199, e-komercija, SEO, aplikāciju izstrāde. 200+ veiksmīgi projekti, 98% klientu apmierinātība. Bezmaksas konsultācija + ROI garantija.",
  keywords:
    "web izstrāde, digitālais mārketings, seo optimizācija, e-komercija, web aplikācijas, mobilās aplikācijas, mājaslapu izstrāde, wordpress, react, latvija, rīga",
  alternates: {
    canonical: "https://www.webworks.lv/pakalpojumi",
  },
  openGraph: {
    ...baseMetadata.openGraph,
    type: "website",
    url: "https://www.webworks.lv/pakalpojumi",
    title: "Digitālie Pakalpojumi | WebWorks 🚀 Pilns Serviss",
    description:
      "✓ Web Izstrāde ✓ Digitālais Mārketings ✓ SEO ✓ E-komercija ✓ Mobilās Aplikācijas. Izvēlieties labāko savam biznesam!",
    images: [
      {
        url: "https://www.webworks.lv/images/services-og.jpg",
        width: 1200,
        height: 630,
        alt: "WebWorks Digitālie Pakalpojumi",
      },
    ],
  },
  twitter: {
    ...baseMetadata.twitter,
    title: "Digitālie Pakalpojumi | WebWorks 🚀 No €199",
    description:
      "Pilns digitālo pakalpojumu klāsts jūsu biznesam. Web izstrāde, SEO, aplikācijas un vairāk!",
    images: ["https://www.webworks.lv/images/services-og.jpg"],
  },
  robots:
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
};

export default function PakalpojumiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
