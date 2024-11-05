import { Metadata } from "next";
import Career from "@/components/Career";

export const metadata: Metadata = {
  title: "Karjera | WebWorks - Nākotnes Digitālo Risinājumu Komanda",
  description:
    "Pievienojies WebWorks komandai un veido nākotnes digitālos risinājumus. Iepazīsti mūsu kultūru, vērtības un karjeras iespējas vadošā web izstrādes uzņēmumā.",
  keywords:
    "karjera, darbs, web izstrāde, IT darbs, web developer, darba iespējas, vakances, latvia, riga",
  openGraph: {
    title: "Karjera WebWorks Komandā",
    description:
      "Pievienojies inovatīvai web izstrādes komandai. Atklāj savas karjeras iespējas WebWorks.",
    siteName: "WebWorks",
    locale: "lv_LV",
    type: "website",
  },
  alternates: {
    canonical: "https://www.webworks.lv/info/karjera",
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

export default function CareerPage() {
  return <Career />;
}
