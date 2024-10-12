"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiShoppingCart,
  FiBox,
  FiLayers,
  FiCode,
  FiShield,
  FiCheckCircle,
  FiX,
  FiGlobe,
  FiTrendingUp,
  FiUsers,
  FiClock,
} from "react-icons/fi";
import Header from "@/components/Header";
import Footer from "@/components/footer";

interface Package {
  name: string;
  price: string;
  features: string[];
  description: string;
  icon: JSX.Element;
  color: string;
  bestFor: string;
  conversion: string;
}

const shopifyPackages: Package[] = [
  {
    name: "Shopify Starter",
    price: "999",
    features: [
      "Līdz 100 produktiem",
      "Responsīvs dizains",
      "Bāzes SEO optimizācija",
      "Pamata maksājumu integrācija",
      "30 dienu atbalsts",
    ],
    description:
      "Ideāls risinājums maziem uzņēmumiem, kas vēlas uzsākt tiešsaistes pārdošanu ar Shopify.",
    icon: <FiShoppingCart />,
    color: "#95BF47",
    bestFor: "Mazie uzņēmumi",
    conversion: "Palieliniet savus ienākumus par 50% pirmajā gadā!",
  },
  {
    name: "Shopify Growth",
    price: "1999",
    features: [
      "Līdz 500 produktiem",
      "Pielāgots dizains",
      "Padziļināta SEO optimizācija",
      "Vairāku maksājumu metožu integrācija",
      "60 dienu atbalsts",
      "Sociālo mediju integrācija",
    ],
    description:
      "Perfekts risinājums augošiem uzņēmumiem, kas vēlas paplašināt savu tiešsaistes klātbūtni.",
    icon: <FiTrendingUp />,
    color: "#7AB55C",
    bestFor: "Augoši vidējie uzņēmumi",
    conversion: "Dubultojiet savu tiešsaistes pārdošanu 6 mēnešu laikā!",
  },
  {
    name: "Shopify Advanced",
    price: "3499",
    features: [
      "Neierobežots produktu skaits",
      "Pilnībā pielāgots dizains",
      "Padziļināta SEO un veiktspējas optimizācija",
      "Paplašināta analītika un atskaites",
      "Vairāku valūtu atbalsts",
      "12 mēnešu atbalsts un uzturēšana",
    ],
    description:
      "Visaptverošs Shopify risinājums lieliem uzņēmumiem ar specifiskām vajadzībām.",
    icon: <FiGlobe />,
    color: "#5E8E3E",
    bestFor: "Lieli uzņēmumi",
    conversion: "Sasniedziet 7-ciparu gada apgrozījumu tiešsaistē!",
  },
];

const wooCommercePackages: Package[] = [
  {
    name: "WooCommerce Basic",
    price: "799",
    features: [
      "Līdz 100 produktiem",
      "WordPress + WooCommerce uzstādīšana",
      "Responsīvs dizains",
      "Bāzes SEO optimizācija",
      "14 dienu atbalsts",
    ],
    description:
      "Pieejams risinājums maziem uzņēmumiem, kas vēlas izmantot WooCommerce platformu.",
    icon: <FiBox />,
    color: "#96588A",
    bestFor: "Mazie uzņēmumi",
    conversion: "Uzsāciet tiešsaistes pārdošanu ar minimālām izmaksām!",
  },
  {
    name: "WooCommerce Plus",
    price: "1599",
    features: [
      "Līdz 500 produktiem",
      "Pielāgots WordPress dizains",
      "WooCommerce paplašinājumu integrācija",
      "Padziļināta SEO optimizācija",
      "30 dienu atbalsts",
      "Produktu importēšana",
    ],
    description:
      "Uzlabots WooCommerce risinājums ar paplašinātām funkcijām vidējiem uzņēmumiem.",
    icon: <FiLayers />,
    color: "#7F54B3",
    bestFor: "Vidējie uzņēmumi",
    conversion: "Palieliniet konversijas par 75% ar pielāgotām funkcijām!",
  },
  {
    name: "WooCommerce Enterprise",
    price: "2999",
    features: [
      "Neierobežots produktu skaits",
      "Pilnībā pielāgots WordPress un WooCommerce risinājums",
      "Paplašināta analītika un atskaites",
      "Vairāku valūtu atbalsts",
      "API integrācijas",
      "60 dienu atbalsts un uzturēšana",
    ],
    description:
      "Pilnvērtīgs WooCommerce risinājums lieliem uzņēmumiem ar sarežģītām prasībām.",
    icon: <FiGlobe />,
    color: "#674399",
    bestFor: "Lieli uzņēmumi",
    conversion: "Optimizējiet savu e-komercijas biznesu maksimālai peļņai!",
  },
];

const customPackages: Package[] = [
  {
    name: "Pielāgots E-komercijas Starters",
    price: "3999",
    features: [
      "Pilnībā pielāgota e-komercijas platforma",
      "Līdz 500 produktiem",
      "Unikāls, pielāgots dizains",
      "Bāzes integrācijas",
      "Padziļināta SEO optimizācija",
      "30 dienu atbalsts un uzturēšana",
    ],
    description:
      "Pielāgots e-komercijas risinājums maziem līdz vidējiem uzņēmumiem ar specifiskām vajadzībām.",
    icon: <FiCode />,
    color: "#3D3B4A",
    bestFor: "Mazie līdz vidējie uzņēmumi ar unikālām prasībām",
    conversion:
      "Radiet unikālu tiešsaistes pārdošanas pieredzi saviem klientiem!",
  },
  {
    name: "Pielāgots E-komercijas Pro",
    price: "7999",
    features: [
      "Pilnībā pielāgota e-komercijas platforma",
      "Neierobežots produktu skaits",
      "Unikālas funkcijas un integrācijas",
      "Augstas veiktspējas arhitektūra",
      "Paplašināta drošība",
      "60 dienu atbalsts un uzturēšana",
    ],
    description:
      "Progresīvs pielāgots e-komercijas risinājums vidējiem līdz lieliem uzņēmumiem ar kompleksām prasībām.",
    icon: <FiLayers />,
    color: "#2C2A38",
    bestFor: "Vidējie līdz lielie uzņēmumi ar sarežģītām prasībām",
    conversion: "Paaugstiniet sava e-komercijas biznesa efektivitāti par 200%!",
  },
  {
    name: "Pielāgots E-komercijas Enterprise",
    price: "14999+",
    features: [
      "Pilnībā pielāgota uzņēmuma līmeņa e-komercijas platforma",
      "Neierobežotas pielāgošanas iespējas",
      "Sarežģītas sistēmu integrācijas",
      "Augstas veiktspējas un mērogojama arhitektūra",
      "Uzlabota drošība un datu aizsardzība",
      "12 mēnešu atbalsts un uzturēšana",
    ],
    description:
      "Visaptverošs uzņēmuma līmeņa e-komercijas risinājums ar pilnīgu pielāgošanu un integrāciju.",
    icon: <FiGlobe />,
    color: "#1D1C24",
    bestFor: "Lieli uzņēmumi un korporācijas ar specifiskām prasībām",
    conversion:
      "Dominējiet savā nozarē ar pilnībā optimizētu e-komercijas ekosistēmu!",
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

const ECommerceServices: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(1800); // 30 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const openModal = (pkg: Package | "contact"): void => {
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

  const PackageCard: React.FC<{ pkg: Package }> = ({ pkg }) => (
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
        <p className="text-sm opacity-75 relative z-10">{pkg.bestFor}</p>
      </div>
      <div className="p-6">
        <p className="text-gray-700 mb-4">{pkg.description}</p>
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
        <p className="text-[#EEC71B] font-bold mb-4">{pkg.conversion}</p>
        <button
          className="w-full bg-[#EEC71B] text-[#3D3B4A] px-6 py-2 rounded-full font-bold mt-auto hover:bg-[#ffd700] transition-colors duration-300"
          onClick={() => openModal(pkg)}
        >
          Uzzināt Vairāk
        </button>
      </div>
    </div>
  );

  const PlatformSection: React.FC<{ title: string; packages: Package[] }> = ({
    title,
    packages,
  }) => (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-[#3D3B4A] mb-8 text-center">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg, index) => (
          <PackageCard key={index} pkg={pkg} />
        ))}
      </div>
    </section>
  );

  return (
    <>
      <Head>
        <title>
          E-komercijas Risinājumi | WebWorks - Jūsu Ceļš uz Tiešsaistes Veiksmi
        </title>
        <meta
          name="description"
          content="WebWorks piedāvā revolucionārus e-komercijas risinājumus Latvijā. Izvēlieties starp Shopify, WooCommerce vai pielāgotu risinājumu, lai palielinātu savus ienākumus un dominētu tiešsaistes tirgū."
        />
        <meta
          name="keywords"
          content="e-komercija, tiešsaistes veikals, Shopify, WooCommerce, pielāgots e-komercijas risinājums, digitālie produkti, fiziskās preces, konversiju optimizācija, web izstrāde, Latvija"
        />
        <link rel="canonical" href="https://www.webworks.lv/e-komercija" />
        <meta
          property="og:title"
          content="E-komercijas Risinājumi | WebWorks - Jūsu Ceļš uz Tiešsaistes Veiksmi"
        />
        <meta
          property="og:description"
          content="Revolucionāri e-komercijas risinājumi Latvijā ar Shopify, WooCommerce vai pielāgotu izstrādi. Palieliniet ienākumus un dominējiet tiešsaistes tirgū ar WebWorks."
        />
        <meta
          property="og:image"
          content="https://www.webworks.lv/images/e-komercija-og.jpg"
        />
        <meta property="og:url" content="https://www.webworks.lv/e-komercija" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="E-komercijas Risinājumi | WebWorks - Jūsu Ceļš uz Tiešsaistes Veiksmi"
        />
        <meta
          name="twitter:description"
          content="Revolucionāri e-komercijas risinājumi Latvijā ar Shopify, WooCommerce vai pielāgotu izstrādi. Palieliniet ienākumus un dominējiet tiešsaistes tirgū ar WebWorks."
        />
        <meta
          name="twitter:image"
          content="https://www.webworks.lv/images/e-komercija-og.jpg"
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-[#F3F5F4] to-white">
        <Header />

        <main className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-[#3D3B4A] mb-8">
            Revolucionāri E-komercijas Risinājumi Jūsu Biznesa Izaugsmei
          </h1>

          <p className="text-xl text-center text-gray-700 mb-12 max-w-3xl mx-auto">
            Pārvērtiet savu biznesu ar mūsu ekspertu veidotām e-komercijas
            platformām. Izvēlieties starp Shopify, WooCommerce vai pielāgotu
            risinājumu, lai palielinātu ienākumus, paplašinātu klientu loku un
            dominētu tiešsaistes tirgū!
          </p>

          <section
            aria-labelledby="limited-offer"
            className="mb-16 bg-[#3D3B4A] text-white p-8 rounded-lg"
          >
            <h2
              id="limited-offer"
              className="text-3xl font-bold mb-4 text-center"
            >
              Īpašais Piedāvājums - Ierobežots Laiks!
            </h2>
            <p className="text-xl mb-4 text-center">
              Izvēlieties jebkuru no mūsu e-komercijas pakalpojumiem un saņemiet
              3 mēnešus BEZMAKSAS SEO optimizāciju un sociālo mediju
              integrāciju!
            </p>
            <div className="flex justify-center items-center">
              <FiClock className="text-2xl mr-2" />
              <p className="text-2xl font-bold">
                Piedāvājums beigsies pēc: {formatTime(timeLeft)}
              </p>
            </div>
          </section>

          <PlatformSection
            title="Shopify E-komercijas Risinājumi"
            packages={shopifyPackages}
          />
          <PlatformSection
            title="WooCommerce E-komercijas Risinājumi"
            packages={wooCommercePackages}
          />
          <PlatformSection
            title="Pielāgoti E-komercijas Risinājumi"
            packages={customPackages}
          />

          <section aria-labelledby="benefits" className="mb-16">
            <h2
              id="benefits"
              className="text-3xl font-bold text-[#3D3B4A] mb-8 text-center"
            >
              Kāpēc Izvēlēties WebWorks E-komercijas Risinājumus?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <FiTrendingUp className="text-4xl text-[#EEC71B] mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">Palielināti Ienākumi</h3>
                <p className="text-gray-700">
                  Mūsu klienti vidēji palielina savus ienākumus par 200% pirmā
                  gada laikā.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <FiUsers className="text-4xl text-[#EEC71B] mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">
                  Paplašināts Klientu Loks
                </h3>
                <p className="text-gray-700">
                  Sasniedziet jaunus klientus visā pasaulē ar mūsu globāli
                  optimizētajām platformām.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <FiShield className="text-4xl text-[#EEC71B] mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">Uzlabota Drošība</h3>
                <p className="text-gray-700">
                  Pasargājiet savu biznesu un klientus ar mūsu progresīvajiem
                  drošības risinājumiem.
                </p>
              </div>
            </div>
          </section>

          <section
            aria-labelledby="cta"
            className="mb-16 bg-[#3D3B4A] text-white p-8 rounded-lg"
          >
            <h2 id="cta" className="text-3xl font-bold mb-8 text-center">
              Gatavs Sākt Savu E-komercijas Veiksmes Stāstu?
            </h2>
            <p className="text-xl mb-8 text-center">
              Nepalaidiet garām iespēju revolucionizēt savu biznesu ar mūsu
              pieredzējušo ekspertu palīdzību. Sāciet savu ceļu uz e-komercijas
              panākumiem jau šodien!
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
                        Sāciet Savu E-komercijas Ceļojumu
                      </h3>
                      <p className="mb-4">
                        Aizpildiet formu zemāk, un mūsu e-komercijas eksperts
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
                        {selectedPackage.conversion}
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
          name: "E-komercijas Risinājumi | WebWorks",
          description:
            "WebWorks piedāvā revolucionārus e-komercijas risinājumus Latvijā. Izvēlieties starp Shopify, WooCommerce vai pielāgotu risinājumu, lai palielinātu savus ienākumus un dominētu tiešsaistes tirgū.",
          url: "https://www.webworks.lv/e-komercija",
          mainEntity: {
            "@type": "Service",
            name: "WebWorks E-komercijas Risinājumi",
            description:
              "Revolucionāri e-komercijas risinājumi, izmantojot Shopify, WooCommerce vai pielāgotu izstrādi.",
            provider: {
              "@type": "Organization",
              name: "WebWorks",
            },
            areaServed: "Latvija",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "E-komercijas Pakalpojumi",
              itemListElement: [
                ...shopifyPackages,
                ...wooCommercePackages,
                ...customPackages,
              ].map((pkg) => ({
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

export default ECommerceServices;
