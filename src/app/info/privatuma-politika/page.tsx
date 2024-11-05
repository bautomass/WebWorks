import { Metadata } from "next";
import PrivacyPolicy from "@/components/PrivacyPolicy";

export const metadata: Metadata = {
  title: "Privātuma Politika | WebWorks",
  description:
    "WebWorks privātuma politika - uzziniet, kā mēs aizsargājam jūsu personas datus un nodrošinām jūsu privātumu saskaņā ar GDPR prasībām.",
  keywords:
    "privātuma politika, GDPR, datu aizsardzība, personas dati, webworks, latvia",
  openGraph: {
    title: "Privātuma Politika | WebWorks",
    description:
      "Uzziniet, kā WebWorks aizsargā jūsu personas datus un nodrošina jūsu privātumu.",
    siteName: "WebWorks",
    locale: "lv_LV",
    type: "website",
  },
  alternates: {
    canonical: "https://www.webworks.lv/privatuma-politika",
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

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
