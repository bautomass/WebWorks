// app/pakalpojumi/e-komercija/layout.tsx
import { Metadata } from "next";
import { baseMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "E-komercijas Risinājumi Latvijā | WebWorks - Izveide no €499",
  description:
    "🛍️ Profesionāli e-komercijas risinājumi no WebWorks. Shopify un individuāla izstrāde, SEO optimizācija, 24/7 atbalsts. E-veikala izveide 4 nedēļās.",
  alternates: {
    canonical: "https://www.webworks.lv/pakalpojumi/e-komercija",
  },
  openGraph: {
    ...baseMetadata.openGraph,
    title: "E-komercijas Risinājumi | WebWorks 🛍️ Izveide no €499",
    description:
      "✓ Shopify vai Custom risinājumi ✓ SEO optimizācija ✓ Droši maksājumi ✓ 4 nedēļu izstrāde ✓ 2 mēnešu atbalsts. Izveidojiet savu e-veikalu ar WebWorks!",
    url: "https://www.webworks.lv/pakalpojumi/e-komercija",
    images: [
      {
        url: "https://www.webworks.lv/images/ecommerce-og.jpg",
        width: 1200,
        height: 630,
        alt: "WebWorks E-komercijas Risinājumi",
      },
    ],
  },
  twitter: {
    ...baseMetadata.twitter,
    title: "E-komercijas Risinājumi | WebWorks 🛍️ no €499",
    description:
      "✓ Shopify vai Custom risinājumi ✓ SEO optimizācija ✓ Droši maksājumi ✓ 4 nedēļu izstrāde ✓ 2 mēnešu atbalsts. Sāciet pārdot internetā!",
    images: ["https://www.webworks.lv/images/ecommerce-og.jpg"],
  },
};

export default function ECommerceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
