// app/sakt-projekta-skici/layout.tsx
import { Metadata } from "next";
import { baseMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Inovatīvs Mājaslapas Skices Veidotājs | Webworks",
  description:
    "Radiet savu sapņu mājaslapu ar mūsu revolucionāro skices veidotāju. Vizualizējiet, pielāgojiet un dalieties ar savām idejām vieglāk nekā jebkad agrāk!",
  keywords:
    "mājaslapu izstrāde, web dizains, interaktīvs skices rīks, vizuālais plānotājs, Latvija",
  alternates: {
    canonical: "https://www.webworks.lv/sakt-projekta-skici",
  },
  openGraph: {
    ...baseMetadata.openGraph,
    title: "Inovatīvs Mājaslapas Skices Veidotājs | Webworks",
    description:
      "Radiet savu sapņu mājaslapu ar mūsu revolucionāro skices veidotāju.",
    url: "https://www.webworks.lv/sakt-projekta-skici",
  },
};

export default function SketchToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
