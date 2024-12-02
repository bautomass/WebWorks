import type { Metadata } from "next";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/services";
import FloatingPromo from "../components/FloatingPromo";
import ServicesWeDo from "../components/ServicesWeDo";
import Footer from "../components/footer";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.webworks.lv",
  },

  title:
    "WebWorks | Moderna Mājaslapu Izstrāde & E-komercija | Būvējam Jūsu Digitālo Nākotni",
  description:
    "Moderna mājaslapu izstrāde ar WebWorks - no €199. 📱 Responsīvs dizains, ⚡ Ātra izstrāde, 🛡️ SEO optimizācija. E-veikali no €499, WordPress risinājumi, uzņēmumu mājaslapas. 200+ veiksmīgi projekti, 98% klientu apmierinātība.",
  openGraph: {
    url: "https://www.webworks.lv/",
  },
};

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Services />
      <ServicesWeDo />
      <FloatingPromo />
      <Footer />
    </main>
  );
}
