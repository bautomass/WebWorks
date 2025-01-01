"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Wallet,
  CalendarCheck,
  CreditCard,
  FileCheck,
  Sparkles,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/footer";
import { FaLandmark, FaIdCard, FaBriefcase, FaChartLine } from "react-icons/fa";

const PaymentPlansPage = () => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const plans = [
    {
      title: "Pilns maksājums",
      description: "Vienreizējs maksājums ar izdevīgu atlaidi",
      paymentExample: "100% no kopējās summas",
      priceAdjustment: {
        type: "discount",
        value: "-5%",
        label: "Atlaide no kopējās summas"
      },
      perks: [
        "Zemākā kopējā cena",
        "Vienkāršāka grāmatvedība",
        "Ātrāka projekta uzsākšana"
      ],
      highlight: true
    },
    {
      title: "Divi maksājumi",
      description: "Sadalīts divos vienādos maksājumos",
      paymentExample: "50% + 50%",
      priceAdjustment: {
        type: "fee",
        value: "+2%",
        label: "Administrēšanas maksa"
      },
      perks: [
        "Sadalīta maksājumu slodze",
        "2 maksājumi projekta gaitā",
        "Elastīgāka naudas plūsma"
      ]
    },
    {
      title: "Trīs maksājumi",
      description: "Sadalīts trijos vienādos maksājumos",
      paymentExample: "3 x 33.3%",
      priceAdjustment: {
        type: "fee",
        value: "+4%",
        label: "Administrēšanas maksa"
      },
      perks: [
        "Mazāki ikmēneša maksājumi",
        "3 maksājumi projekta gaitā",
        "Optimāla naudas plūsmas sabalansēšana"
      ]
    },
    {
      title: "Četri maksājumi",
      description: "Sadalīts četros vienādos maksājumos",
      paymentExample: "4 x 25%",
      priceAdjustment: {
        type: "fee",
        value: "+6%",
        label: "Administrēšanas maksa"
      },
      perks: [
        "Vismazākie ikmēneša maksājumi",
        "4 maksājumi projekta gaitā",
        "Maksimāli elastīga naudas plūsma"
      ]
    }
  ];

  const timeline = [
    {
      phase: "1. Fāze",
      title: "Projekta uzsākšana",
      description: "Detalizēta projekta prasību analīze un plānošana",
      payment: "30% no kopējās summas",
      perks: [
        "Detalizēta projekta specifikācija",
        "Dizaina koncepcijas izstrāde",
        "Projekta laika grafika izveide"
      ]
    },
    {
      phase: "2. Fāze",
      title: "Dizains un izstrāde",
      description: "Mājaslapas dizaina izstrāde un programmēšana",
      payment: "40% no kopējās summas",
      perks: [
        "Responsīvs dizains visām ierīcēm",
        "Funkcionalitātes ieviešana",
        "Regulāras progresa atskaites"
      ]
    },
    {
      phase: "3. Fāze",
      title: "Testēšana un palaišana",
      description: "Kvalitātes pārbaude un mājaslapas palaišana",
      payment: "30% no kopējās summas",
      perks: [
        "Pilna funkcionalitātes testēšana",
        "SEO optimizācija",
        "Mājaslapas palaišana produkcijā"
      ]
    }
  ];

  const calculatePayment = (splits: number) => {
    if (splits === 1) {
      // 5% discount for full payment
      return {
        totalAmount: totalPrice * 0.95,
        splitAmount: totalPrice * 0.95,
        discount: totalPrice * 0.05,
        fee: 0,
      };
    } else {
      const fee = totalPrice * 0.02 * (splits - 1);
      const totalWithFee = totalPrice + fee;
      return {
        totalAmount: totalWithFee,
        splitAmount: totalWithFee / splits,
        discount: 0,
        fee,
      };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F3F5F4] to-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-[#3D3B4A] mb-6">
            Profesionāla Mājaslapa
            <br />
            <span className="text-[#EEC71B]">Ar Elastīgu Maksājumu</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Mēs ticam, ka ikvienam uzņēmumam jābūt pieejamai profesionālai
            mājaslapai. Izvēlieties sev ērtāko maksājuma veidu un sāciet
            digitālo ceļu jau šodien.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/pakalpojumi"
              className="px-8 py-4 bg-[#EEC71B] text-[#3D3B4A] rounded-lg 
                     font-semibold hover:bg-[#ffd700] transition-colors
                     inline-flex items-center gap-2"
            >
              Apskatīt Pakalpojumus
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#3D3B4A] mb-16">
            Kā Strādā Elastīgais Maksājums?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Izvēlieties Plānu",
                description:
                  "Dažādi maksājuma plāni, piemēroti jūsu situācijai - no pilna maksājuma līdz četru daļu maksājumam.",
                icon: Wallet,
              },
              {
                step: "02",
                title: "Sāciet Projektu",
                description:
                  "Pēc pirmā maksājuma (25-50%) uzreiz sākam darbu pie jūsu projekta, ievērojot visus kvalitātes standartus.",
                icon: CalendarCheck,
              },
              {
                step: "03",
                title: "Elastīgi Maksājumi",
                description:
                  "Atlikušo summu maksājiet ērtās daļās projekta izstrādes laikā, bez papildu izmaksām.",
                icon: CreditCard,
              },
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-bold text-[#EEC71B]/10 absolute -top-8 left-0">
                  {step.step}
                </div>
                <div className="relative">
                  <step.icon className="w-12 h-12 text-[#EEC71B] mb-6" />
                  <h3 className="text-xl font-bold text-[#3D3B4A] mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Plans */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#3D3B4A] mb-6">
            Elastīgie Maksājuma Plāni
          </h2>
          <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto mb-16">
            Izvēlieties sev piemērotāko maksājuma plānu. Visi plāni ietver pilnu
            servisu un vienādu kvalitāti.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`
                  relative overflow-hidden rounded-2xl border-2 
                  ${plan.highlight 
                    ? 'border-[#EEC71B] shadow-lg shadow-[#EEC71B]/10' 
                    : 'border-gray-100'
                  }
                  bg-white p-6 transition-all duration-300 hover:shadow-xl
                `}
              >
                {plan.highlight && (
                  <div className="absolute top-5 right-5">
                    <Sparkles className="w-6 h-6 text-[#EEC71B]" />
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {plan.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4">
                  {plan.description}
                </p>

                <div className="space-y-4 mb-6">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Maksājuma sadalījums</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {plan.paymentExample}
                    </p>
                  </div>

                  <div className={`
                    p-4 rounded-xl 
                    ${plan.priceAdjustment.type === 'discount' 
                      ? 'bg-green-50' 
                      : 'bg-gray-50'
                    }
                  `}>
                    <p className="text-sm text-gray-600 mb-1">
                      {plan.priceAdjustment.label}
                    </p>
                    <p className={`
                      text-lg font-semibold
                      ${plan.priceAdjustment.type === 'discount' 
                        ? 'text-green-600' 
                        : 'text-gray-900'
                      }
                    `}>
                      {plan.priceAdjustment.value}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {plan.perks.map((perk, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <FileCheck className="w-5 h-5 text-[#EEC71B] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 text-sm">{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Timeline */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#3D3B4A] mb-16">
            Izstrādes Process un Maksājumi
          </h2>

          <div className="space-y-8 mt-12">
            {timeline.map((phase, i) => (
              <div
                key={i}
                className={`
                  relative flex gap-8 p-6 rounded-2xl bg-white border border-gray-100
                  transition-all duration-300 hover:shadow-lg
                `}
              >
                <div className="flex-shrink-0 w-32">
                  <div className="text-lg font-bold text-[#EEC71B]">
                    {phase.phase}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {phase.payment}
                  </div>
                </div>

                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {phase.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {phase.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {phase.perks.map((perk, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <CalendarCheck className="w-5 h-5 text-[#EEC71B] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 text-sm">{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3D3B4A] mb-6">
            Gatavi Sākt Savu Projektu?
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Izvēlieties sev piemērotāko maksājuma plānu un sāciet ceļu uz savu
            jauno mājaslapu
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/pakalpojumi"
              className="px-8 py-4 bg-[#EEC71B] text-[#3D3B4A] rounded-lg 
                      font-semibold hover:bg-[#ffd700] transition-colors
                      inline-flex items-center gap-2"
            >
              Apskatīt Pakalpojumus
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact-us"
              className="px-8 py-4 border-2 border-[#3D3B4A] text-[#3D3B4A] 
                      rounded-lg font-semibold hover:bg-[#3D3B4A] hover:text-white 
                      transition-colors inline-flex items-center gap-2"
            >
              Sazināties ar Mums
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PaymentPlansPage;
