// app/maksajumu-plani/layout.tsx
import { Metadata } from "next";
import { baseMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...baseMetadata,
  title:
    "Elastīgi Maksājuma Plāni Mājaslapu Izstrādei | WebWorks - Izstrādes Risinājumi",
  description:
    "Profesionāla mājaslapa katram uzņēmumam - elastīgi maksājuma plāni no WebWorks. ✓ 0% komisija ✓ Bez papildu izmaksām ✓ Sāciet ar 25% iemaksu ✓ Pilns serviss no A-Z",
  keywords: [
    "mājaslapa uz nomaksu",
    "mājaslapa pa daļām",
    "mājaslapa ar atvieglotu maksājumu",
    "mājaslapa uzņēmumam",
    "mājaslapas izstrāde",
    "web development payment plans",
    "affordable web design",
    "website installment payment",
    "elastīgi maksājumi",
    "mājaslapa biznesam",
  ],
  openGraph: {
    ...baseMetadata.openGraph,
    title: "Elastīgi Maksājuma Plāni Mājaslapu Izstrādei | WebWorks",
    description:
      "Kvalitatīva mājaslapa katram uzņēmumam ar elastīgiem maksājuma nosacījumiem. Sadaliet maksājumu līdz 4 daļām, 0% komisija, pilns serviss no dizaina līdz ieviešanai.",
    type: "website",
    locale: "lv_LV",
    url: "https://www.webworks.lv/maksajumu-plani",
    siteName: "WebWorks",
    images: [
      {
        url: "https://www.webworks.lv/images/payment-plans-og.jpg",
        width: 1200,
        height: 630,
        alt: "WebWorks Elastīgie Maksājuma Plāni Mājaslapu Izstrādei",
      },
    ],
  },
  twitter: {
    ...baseMetadata.twitter,
    card: "summary_large_image",
    title: "Elastīgi Maksājuma Plāni Mājaslapu Izstrādei | WebWorks",
    description:
      "Profesionāla mājaslapas izstrāde ar elastīgiem maksājuma nosacījumiem. Sadaliet maksājumu līdz 4 daļām, bez papildu izmaksām.",
    images: ["https://www.webworks.lv/images/payment-plans-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  alternates: {
    canonical: "https://www.webworks.lv/maksajumu-plani",
    languages: {
      "lv-LV": "https://www.webworks.lv/maksajumu-plani",
      "en-US": "https://www.webworks.lv/en/payment-plans",
    },
  },
  verification: {
    google: "verification_token",
    yandex: "verification_token",
  },
  category: "Web Development",
  classification: "Web Design, Development Services",
};

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Elastīgi Maksājuma Plāni Mājaslapu Izstrādei",
  description:
    "Profesionāla mājaslapa katram uzņēmumam ar elastīgiem maksājuma nosacījumiem. Sadaliet maksājumu līdz 4 daļām, bez papildu izmaksām.",
  provider: {
    "@type": "Organization",
    name: "WebWorks",
    url: "https://www.webworks.lv",
  },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "EUR",
    offerCount: "4",
    offers: [
      {
        "@type": "Offer",
        name: "Pilns Maksājums",
        description: "Vienreizējs maksājums ar 5% atlaidi",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "EUR",
          price: "Atkarīgs no projekta",
        },
      },
      {
        "@type": "Offer",
        name: "Divdaļīgs Maksājums",
        description: "Maksājums divās daļās bez papildu izmaksām",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "EUR",
          price: "Atkarīgs no projekta",
        },
      },
    ],
  },
  mainContentOfPage: {
    "@type": "WebPageElement",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", ".main-content"],
    },
  },
};

export default function PaymentPlansLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  );
}
