// app/pakalpojumi/mobilas-aplikacijas/layout.tsx
import { Metadata } from "next";
import { baseMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Mobilo Aplikāciju Izstrāde Latvijā | WebWorks - Cenas no €999",
  description:
    "📱 Profesionāla mobilo aplikāciju izstrāde no WebWorks. iOS, Android un hibrīdās lietotnes ar garantiju. Enterprise risinājumi, mākslīgā intelekta integrācija, pilns atbalsts 12 mēnešus.",
  keywords:
    "mobilo aplikāciju izstrāde, iOS lietotnes, Android lietotnes, app development, hibrīdās aplikācijas, React Native, flutter, mākoņa risinājumi, push paziņojumi, Latvija",
  alternates: {
    canonical: "https://www.webworks.lv/pakalpojumi/mobilas-aplikacijas",
  },
  openGraph: {
    ...baseMetadata.openGraph,
    type: "website",
    url: "https://www.webworks.lv/pakalpojumi/mobilas-aplikacijas",
    title: "Mobilo Aplikāciju Izstrāde | WebWorks 📱 no €999",
    description:
      "✓ iOS & Android izstrāde ✓ UI/UX dizains ✓ Backend integrācija ✓ Push paziņojumi ✓ 12 mēnešu atbalsts → Izveidojiet savu mobilo aplikāciju ar WebWorks!",
    images: [
      {
        url: "https://www.webworks.lv/images/mobile-apps-og.jpg",
        width: 1200,
        height: 630,
        alt: "WebWorks Mobilās Aplikācijas",
      },
    ],
  },
  twitter: {
    ...baseMetadata.twitter,
    title: "Mobilo Aplikāciju Izstrāde | WebWorks 📱 no €999",
    description:
      "✓ iOS & Android izstrāde ✓ UI/UX dizains ✓ Backend integrācija ✓ Push paziņojumi ✓ 12 mēnešu atbalsts. Sāciet savu mobilo projektu!",
    images: ["https://www.webworks.lv/images/mobile-apps-og.jpg"],
  },
};

export default function MobileAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
