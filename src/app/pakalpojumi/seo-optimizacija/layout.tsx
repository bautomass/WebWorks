// app/pakalpojumi/seo-optimizacija/layout.tsx
import { Metadata } from "next";
import { baseMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...baseMetadata,
  title:
    "SEO Optimizācija Latvijā | WebWorks - Pakalpojumi no €299 | Google TOP 10",
  description:
    "🎯 Profesionāla SEO optimizācija no WebWorks. Garantēta pozīciju uzlabošana Google, tehniskā optimizācija, satura stratēģija. 94% klientu redz rezultātus 3 mēnešu laikā. Bezmaksas SEO audits.",
  keywords:
    "seo optimizācija, seo pakalpojumi, google optimizācija, meklētājprogrammu optimizācija, atslēgvārdu izpēte, tehniskais seo, satura optimizācija, linkbūve, lokālais seo, Latvija",
  alternates: {
    canonical: "https://www.webworks.lv/pakalpojumi/seo-optimizacija",
  },
  openGraph: {
    ...baseMetadata.openGraph,
    type: "website",
    url: "https://www.webworks.lv/pakalpojumi/seo-optimizacija",
    title: "SEO Optimizācija | WebWorks 🎯 Garantēti Rezultāti",
    description:
      "✓ Pozīciju uzlabošana Google ✓ Tehniskā optimizācija ✓ Satura stratēģija ✓ Rezultāti 3 mēnešos. Iegūstiet vairāk klientu ar SEO!",
    images: [
      {
        url: "https://www.webworks.lv/images/seo-services-og.jpg",
        width: 1200,
        height: 630,
        alt: "WebWorks SEO Optimizācija",
      },
    ],
  },
  twitter: {
    ...baseMetadata.twitter,
    title: "SEO Optimizācija | WebWorks 🎯 no €299",
    description:
      "✓ Pozīciju uzlabošana Google ✓ Tehniskā optimizācija ✓ Satura stratēģija ✓ Rezultāti 3 mēnešos",
    images: ["https://www.webworks.lv/images/seo-services-og.jpg"],
  },
};

export default function SEOLayout({ children }: { children: React.ReactNode }) {
  return children;
}
