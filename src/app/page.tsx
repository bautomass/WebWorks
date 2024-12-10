// app/page.tsx
import type { Metadata } from "next";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/services";
import FloatingPromo from "../components/FloatingPromo";
import ServicesWeDo from "../components/ServicesWeDo";
import Footer from "../components/footer";
import { baseMetadata } from "@/lib/metadata";
import ChristmasPromoBanner from "../components/ChristmasPromoBanner";

// Homepage specific schema
const homePageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.webworks.lv/#webpage",
  url: "https://www.webworks.lv",
  name: "WebWorks | Moderna Mājaslapu Izstrāde & E-komercija",
  isPartOf: { "@id": "https://www.webworks.lv/#website" },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: "https://www.webworks.lv/images/og-image.svg",
  },
  datePublished: "2023-01-01T00:00:00+00:00",
  dateModified: new Date().toISOString(),
  description:
    "Moderna mājaslapu izstrāde ar WebWorks - no €199. 📱 Responsīvs dizains, ⚡ Ātra izstrāde, 🛡️ SEO optimizācija. E-veikali no €499, WordPress risinājumi, uzņēmumu mājaslapas.",
};

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: "https://www.webworks.lv",
  },
  title:
    "WebWorks | Moderna Mājaslapu Izstrāde & E-komercija | Būvējam Jūsu Digitālo Nākotni",
  description:
    "Moderna mājaslapu izstrāde ar WebWorks - no €199. 📱 Responsīvs dizains, ⚡ Ātra izstrāde, 🛡️ SEO optimizācija. E-veikali no €499, WordPress risinājumi, uzņēmumu mājaslapas. 200+ veiksmīgi projekti, 98% klientu apmierinātība.",
  openGraph: {
    ...baseMetadata.openGraph,
    url: "https://www.webworks.lv/",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homePageSchema),
        }}
      />
      <main>
        <Header />
        <ChristmasPromoBanner />
        <Hero />
        <Services />
        <ServicesWeDo />
        <FloatingPromo />
        <Footer />
      </main>
    </>
  );
}
