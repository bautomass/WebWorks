import { Metadata } from "next";
import Partners from "@/components/Partners";

export const metadata: Metadata = {
  title: "Tehnoloģiju Partneri | WebWorks - Modernā Web Izstrāde",
  description:
    "WebWorks sadarbojas ar pasaules vadošajiem tehnoloģiju uzņēmumiem. Uzziniet par mūsu partneriem un kā mēs kopā veidojam nākotnes digitālos risinājumus.",
  keywords:
    "web izstrāde, tehnoloģiju partneri, vercel, prisma, supabase, nextjs, web development partners, latvia",
  openGraph: {
    title: "WebWorks Tehnoloģiju Partneri",
    description: "Inovācijas kopā ar pasaules līderiem digitālajā izstrādē",
    siteName: "WebWorks",
    locale: "lv_LV",
    type: "website",
  },
  alternates: {
    canonical: "https://www.webworks.lv/info/partneri",
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

export default function PartnersPage() {
  return <Partners />;
}
