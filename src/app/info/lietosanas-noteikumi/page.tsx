import { Metadata } from "next";
import LietosanasNoteikumi from "@/components/LietosanasNoteikumi";

export const metadata: Metadata = {
  title: "Lietošanas Noteikumi | WebWorks - Profesionāla Web Izstrāde",
  description:
    "WebWorks pakalpojumu un tīmekļa vietnes oficiālie lietošanas noteikumi. Uzziniet par mūsu pakalpojumu sniegšanas kārtību, lietotāju tiesībām un pienākumiem.",
  keywords:
    "lietošanas noteikumi, webworks noteikumi, digitālie pakalpojumi, web izstrāde, latvija",
  openGraph: {
    title: "WebWorks Lietošanas Noteikumi",
    description:
      "WebWorks pakalpojumu un tīmekļa vietnes oficiālie lietošanas noteikumi.",
    siteName: "WebWorks",
    locale: "lv_LV",
    type: "website",
  },
  alternates: {
    canonical: "https://www.webworks.lv/lietosanas-noteikumi",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function LietosanasNoteikumiLapa() {
  return <LietosanasNoteikumi />;
}
