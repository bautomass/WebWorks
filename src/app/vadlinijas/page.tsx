import { Metadata } from "next";
import WebGuidelines from "@/components/WebGuidelines";

export const metadata: Metadata = {
  title: "Web Izstrādes Vadlīnijas | WebWorks - Profesionāla Web Izstrāde",
  description:
    "Visaptverošas web izstrādes vadlīnijas no WebWorks ekspertiem. Uzziniet par modernā web dizaina principiem, tehniskajām prasībām, drošību un SEO optimizāciju.",
  keywords:
    "web izstrāde, web dizains, SEO optimizācija, web drošība, responsīvs dizains, latvija, riga",
  openGraph: {
    title: "Web Izstrādes Vadlīnijas | WebWorks - Profesionāla Web Izstrāde",
    description:
      "Visaptverošas web izstrādes vadlīnijas no WebWorks ekspertiem.",
    siteName: "WebWorks",
    locale: "lv_LV",
    type: "website",
  },
  alternates: {
    canonical: "https://www.webworks.lv/vadlinijas",
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

export default function GuidelinesPage() {
  return <WebGuidelines />;
}
