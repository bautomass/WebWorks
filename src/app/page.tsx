import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/services";
import FloatingPromo from "../components/FloatingPromo";
import ServicesWeDo from "../components/ServicesWeDo";
import Footer from "../components/footer";
export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Services />
      <ServicesWeDo />
      <FloatingPromo />
      <Footer />
      {/* <Modern /> */}
    </main>
  );
}
