"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSmartphone,
  FiLayers,
  FiShield,
  FiUsers,
  FiZap,
  FiGlobe,
  FiCheckCircle,
  FiX,
} from "react-icons/fi";
import Header from "@/components/Header";
import Footer from "@/components/footer";

interface AppPackage {
  name: string;
  price: string;
  features: string[];
  description: string;
  icon: JSX.Element;
  color: string;
  bestFor: string;
  platform: string;
}

const appPackages: AppPackage[] = [
  {
    name: "Pamata Lietotne",
    price: "4999",
    features: [
      "Vienas platformas izstrāde (iOS vai Android)",
      "Līdz 5 galvenajām funkcijām",
      "Pamata dizains un UX",
      "Lokāla datu glabāšana",
      "Pamata API integrācija",
      "30 dienu atbalsts pēc palaišanas",
    ],
    description:
      "Ideāls risinājums maziem uzņēmumiem vai startapiem, kas vēlas ienākt mobilajā tirgū.",
    icon: <FiSmartphone />,
    color: "#4CAF50",
    bestFor: "Mazie uzņēmumi un startupi",
    platform: "iOS vai Android",
  },
  {
    name: "Profesionālā Lietotne",
    price: "9999",
    features: [
      "Abas platformas (iOS un Android)",
      "Līdz 10 pielāgotām funkcijām",
      "Uzlabots UI/UX dizains",
      "Mākoņa datu glabāšana",
      "Paplašināta API integrācija",
      "Push paziņojumi",
      "In-app pirkumi",
      "60 dienu atbalsts pēc palaišanas",
    ],
    description:
      "Visaptverošs risinājums uzņēmumiem, kas vēlas piedāvāt pilnvērtīgu mobilo pieredzi.",
    icon: <FiLayers />,
    color: "#2196F3",
    bestFor: "Vidējie uzņēmumi",
    platform: "iOS un Android",
  },
  {
    name: "Uzņēmuma Lietotne",
    price: "19999+",
    features: [
      "Vairāku platformu atbalsts (iOS, Android, Web)",
      "Neierobežots funkciju skaits",
      "Pielāgots UI/UX ar unikālu identitāti",
      "Sarežģīta backend integrācija",
      "Lietotāju autentifikācija un drošība",
      "Analītika un atskaites",
      "Mērogojama arhitektūra",
      "12 mēnešu atbalsts un uzturēšana",
    ],
    description:
      "Premium risinājums lieliem uzņēmumiem ar kompleksām prasībām un lielu lietotāju bāzi.",
    icon: <FiGlobe />,
    color: "#9C27B0",
    bestFor: "Lieli uzņēmumi un korporācijas",
    platform: "iOS, Android, Web",
  },
];

function adjustColor(color: string, amount: number): string {
  return (
    "#" +
    color
      .replace(/^#/, "")
      .replace(/../g, (color) =>
        (
          "0" +
          Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).substr(-2)
      )
  );
}

const MobileAppDevelopment: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<AppPackage | null>(
    null
  );
  const [showModal, setShowModal] = useState<boolean>(false);

  const openModal = (pkg: AppPackage | "contact"): void => {
    if (pkg === "contact") {
      setSelectedPackage(null);
    } else {
      setSelectedPackage(pkg);
    }
    setShowModal(true);
  };

  const closeModal = (): void => {
    setShowModal(false);
  };

  const PackageCard: React.FC<{ pkg: AppPackage }> = ({ pkg }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div
        className="p-6 text-white relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${pkg.color} 0%, ${adjustColor(
            pkg.color,
            -30
          )} 100%)`,
        }}
      >
        <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-white bg-opacity-20 rounded-full p-8 transform rotate-12">
          <motion.div
            className="text-5xl"
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ duration: 0.5 }}
          >
            {pkg.icon}
          </motion.div>
        </div>
        <h3 className="text-2xl font-bold mb-2 relative z-10">{pkg.name}</h3>
        <p className="text-4xl font-extrabold mb-1 relative z-10">
          €{pkg.price}
        </p>
        <p className="text-sm opacity-75 relative z-10">{pkg.platform}</p>
      </div>
      <div className="p-6">
        <p className="text-gray-700 mb-4">{pkg.description}</p>
        <p className="font-bold mb-4">Labākā izvēle: {pkg.bestFor}</p>
        <ul className="mb-6" aria-label={`${pkg.name} features`}>
          {pkg.features.map((feature, i) => (
            <li key={i} className="flex items-center mb-2">
              <FiCheckCircle
                className="text-[#EEC71B] mr-2 flex-shrink-0"
                aria-hidden="true"
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <button
          className="w-full bg-[#EEC71B] text-[#3D3B4A] px-6 py-2 rounded-full font-bold mt-auto hover:bg-[#ffd700] transition-colors duration-300"
          onClick={() => openModal(pkg)}
        >
          Uzzināt Vairāk
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>
          Mobilās Aplikācijas Izstrāde | WebWorks - Jūsu Digitālais Partneris
        </title>
        <meta
          name="description"
          content="WebWorks piedāvā profesionālu mobilo aplikāciju izstrādi. Izveidojiet savu iOS, Android vai hibrīdo lietotni ar mūsu ekspertu palīdzību."
        />
        <meta
          name="keywords"
          content="mobilās aplikācijas, app izstrāde, iOS, Android, hibrīdās lietotnes, lietotņu izstrāde, Latvija"
        />
        <link
          rel="canonical"
          href="https://www.webworks.lv/mobilas-aplikacijas"
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-[#F3F5F4] to-white">
        <Header />

        <main className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-[#3D3B4A] mb-8">
            Inovatīva Mobilo Aplikāciju Izstrāde
          </h1>

          <p className="text-xl text-center text-gray-700 mb-12 max-w-3xl mx-auto">
            Pārvērtiet savas idejas realitātē ar mūsu ekspertu veidotām
            mobilajām lietotnēm. Mēs radām lietoties, kas piesaista, iesaista un
            pārveido jūsu biznesu.
          </p>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#3D3B4A] mb-8 text-center">
              Mūsu Mobilo Aplikāciju Izstrādes Pakalpojumi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {appPackages.map((pkg, index) => (
                <PackageCard key={index} pkg={pkg} />
              ))}
            </div>
          </section>

          <section aria-labelledby="benefits" className="mb-16">
            <h2
              id="benefits"
              className="text-3xl font-bold text-[#3D3B4A] mb-8 text-center"
            >
              Kāpēc Izvēlēties WebWorks Mobilo Aplikāciju Izstrādei?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <FiZap className="text-4xl text-[#EEC71B] mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">Ātra Izstrāde</h3>
                <p className="text-gray-700">
                  Mēs izmantojam modernas tehnoloģijas un metodes, lai ātri
                  nogādātu jūsu lietotni tirgū.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <FiUsers className="text-4xl text-[#EEC71B] mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">
                  Lietotājorientēts Dizains
                </h3>
                <p className="text-gray-700">
                  Mūsu lietotnes ir veidotas ar fokusu uz lietotāju pieredzi un
                  iesaisti.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <FiShield className="text-4xl text-[#EEC71B] mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">
                  Drošība un Uzticamība
                </h3>
                <p className="text-gray-700">
                  Mēs izmantojam labākās drošības prakses, lai aizsargātu jūsu
                  un jūsu lietotāju datus.
                </p>
              </div>
            </div>
          </section>

          <section
            aria-labelledby="cta"
            className="mb-16 bg-[#3D3B4A] text-white p-8 rounded-lg"
          >
            <h2 id="cta" className="text-3xl font-bold mb-8 text-center">
              Gatavs Uzsākt Savu Mobilo Lietotņu Projektu?
            </h2>
            <p className="text-xl mb-8 text-center">
              Ļaujiet mums palīdzēt jums izveidot izcilu mobilo lietotni, kas
              pārveidos jūsu biznesu un sasniegs jaunus klientus.
            </p>
            <div className="flex justify-center">
              <button
                className="bg-[#EEC71B] text-[#3D3B4A] px-8 py-3 rounded-full font-bold text-lg hover:bg-[#ffd700] transition-colors duration-300"
                onClick={() => openModal("contact")}
              >
                Sazināties ar Mums Tagad
              </button>
            </div>
          </section>

          <AnimatePresence>
            {showModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                onClick={closeModal}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-lg p-8 max-w-md w-full relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  {selectedPackage === null ? (
                    <>
                      <h3 className="text-2xl font-bold mb-4">
                        Sāciet Savu Mobilo Lietotņu Projektu
                      </h3>
                      <p className="mb-4">
                        Aizpildiet formu zemāk, un mūsu mobilo lietotņu eksperts
                        sazināsies ar jums 24 stundu laikā, lai apspriestu jūsu
                        projektu.
                      </p>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          // Handle form submission here
                          console.log("Form submitted");
                          closeModal();
                        }}
                      >
                        <div className="mb-4">
                          <label className="block mb-2" htmlFor="name">
                            Vārds
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full p-2 border rounded"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2" htmlFor="email">
                            E-pasts
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full p-2 border rounded"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2" htmlFor="phone">
                            Tālrunis
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="w-full p-2 border rounded"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2" htmlFor="message">
                            Jūsu ziņojums
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            className="w-full p-2 border rounded"
                            rows={4}
                            required
                          ></textarea>
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="bg-[#EEC71B] text-[#3D3B4A] px-6 py-2 rounded-full font-bold"
                          >
                            Sūtīt Pieprasījumu
                          </button>
                        </div>
                      </form>
                    </>
                  ) : (
                    <>
                      <h3 className="text-2xl font-bold mb-4">
                        {selectedPackage.name}
                      </h3>
                      <p className="text-3xl font-bold text-[#EEC71B] mb-4">
                        €{selectedPackage.price}
                      </p>
                      <p className="mb-4">{selectedPackage.description}</p>
                      <h4 className="font-bold mb-2">Iekļautie pakalpojumi:</h4>
                      <ul className="mb-6">
                        {selectedPackage.features.map((feature, index) => (
                          <li key={index} className="flex items-center mb-2">
                            <FiCheckCircle
                              className="text-[#EEC71B] mr-2"
                              aria-hidden="true"
                            />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="font-bold mb-4">
                        Labākā izvēle: {selectedPackage.bestFor}
                      </p>
                      <div className="flex justify-end">
                        <button
                          className="bg-[#EEC71B] text-[#3D3B4A] px-6 py-2 rounded-full font-bold"
                          onClick={() => openModal("contact")}
                        >
                          Pieteikties Tagad
                        </button>
                      </div>
                    </>
                  )}
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={closeModal}
                    aria-label="Close modal"
                  >
                    <FiX size={24} />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <Footer />
      </div>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Mobilās Aplikācijas Izstrāde | WebWorks",
          description:
            "WebWorks piedāvā profesionālu mobilo aplikāciju izstrādi. Izveidojiet savu iOS, Android vai hibrīdo lietotni ar mūsu ekspertu palīdzību.",
          url: "https://www.webworks.lv/mobilas-aplikacijas",
          mainEntity: {
            "@type": "Service",
            name: "WebWorks Mobilo Aplikāciju Izstrādes Pakalpojumi",
            description:
              "Profesionāla mobilo aplikāciju izstrāde iOS, Android un hibrīdajām platformām.",
            provider: {
              "@type": "Organization",
              name: "WebWorks",
            },
            areaServed: "Latvija",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Mobilo Aplikāciju Izstrādes Pakalpojumi",
              itemListElement: appPackages.map((pkg) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: pkg.name,
                  description: pkg.description,
                },
                price: pkg.price,
                priceCurrency: "EUR",
              })),
            },
          },
        })}
      </script>
    </>
  );
};

export default MobileAppDevelopment;
