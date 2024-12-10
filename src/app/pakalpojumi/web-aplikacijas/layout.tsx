// app/pakalpojumi/web-aplikacijas/layout.tsx
import { Metadata } from "next";
import { baseMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Web Aplikāciju & SAAS Izstrāde Latvijā | WebWorks - No €1299",
  description:
    "🚀 Profesionāla web aplikāciju un SAAS platformu izstrāde no WebWorks. Mūsdienīgas tehnoloģijas, mikroservisu arhitektūra, enterprise risinājumi. Izstrāde no 3 mēnešiem. Bezmaksas konsultācija + MVP demo.",
  keywords:
    "web aplikācijas, SAAS risinājumi, custom software, mikroservisi, cloud risinājumi, enterprise software, web development, react, node.js, aws, kubernetes, api izstrāde, Latvija",
  alternates: {
    canonical: "https://www.webworks.lv/pakalpojumi/web-aplikacijas",
  },
  openGraph: {
    ...baseMetadata.openGraph,
    type: "website",
    url: "https://www.webworks.lv/pakalpojumi/web-aplikacijas",
    title: "Web Aplikācijas & SAAS | WebWorks 🚀 Enterprise Risinājumi",
    description:
      "✓ Moderna arhitektūra ✓ Mikroservisi ✓ Cloud Native ✓ Pilns DevOps ✓ 24/7 atbalsts. Izveidojiet savu nākamo lielo produktu ar WebWorks!",
    images: [
      {
        url: "https://www.webworks.lv/images/web-app-development-og.jpg",
        width: 1200,
        height: 630,
        alt: "WebWorks Web Aplikāciju Izstrāde",
      },
    ],
  },
  twitter: {
    ...baseMetadata.twitter,
    title: "Web Aplikācijas & SAAS | WebWorks 🚀 no €1299",
    description:
      "✓ Moderna arhitektūra ✓ Mikroservisi ✓ Cloud Native ✓ Pilns DevOps. Izveidojiet savu nākamo produktu!",
    images: ["https://www.webworks.lv/images/web-app-development-og.jpg"],
  },
};

export default function WebAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
