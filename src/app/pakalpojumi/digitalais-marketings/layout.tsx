// app/pakalpojumi/digitalais-marketings/layout.tsx
import { Metadata } from "next";
import { baseMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Digitālais Mārketings Latvijā | WebWorks - Cenas no €399 | SEO, SMM",
  description:
    "🚀 Profesionāls digitālais mārketings Latvijā ar WebWorks. Sociālie mediji no €599, SEO pakalpojumi, Google & Facebook reklāmas. 97% klientu apmierinātība.",
  alternates: {
    canonical: "https://www.webworks.lv/pakalpojumi/digitalais-marketings",
  },
  openGraph: {
    ...baseMetadata.openGraph,
    title: "Digitālais Mārketings | WebWorks 🚀 ROI Garantija",
    description:
      "✓ Sociālie mediji no €599 ✓ SEO optimizācija ✓ Google & FB Ads ✓ All-in-One mārketings ar 25% atlaidi",
    url: "https://www.webworks.lv/pakalpojumi/digitalais-marketings",
    images: [
      {
        url: "https://www.webworks.lv/images/digital-marketing-og.jpg",
        width: 1200,
        height: 630,
        alt: "WebWorks Digitālais Mārketings",
      },
    ],
  },
  twitter: {
    ...baseMetadata.twitter,
    title: "Digitālais Mārketings | WebWorks 📈 ROI Garantija",
    description:
      "✓ Sociālie mediji no €599 ✓ SEO optimizācija ✓ Google & FB Ads ✓ All-in-One mārketings ar 25% atlaidi",
    images: ["https://www.webworks.lv/images/digital-marketing-og.jpg"],
  },
};

export default function DigitalaisMarketingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
