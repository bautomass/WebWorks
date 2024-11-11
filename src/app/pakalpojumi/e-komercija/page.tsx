"use client";

import React, { useState } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiShoppingCart,
  FiTrendingUp,
  FiGlobe,
  FiCheckCircle,
  FiX,
  FiArrowRight,
  FiStar,
  FiBox,
  FiDollarSign,
  FiShield,
  FiUsers,
  FiZap,
} from "react-icons/fi";
import { supabase } from "../../../utils/supabase";
import Header from "@/components/Header";
import Footer from "@/components/footer";

interface Package {
  id: string;
  name: string;
  tagline: string;
  price: string;
  features: string[];
  description: string;
  detailedDescription: string;
  icon: JSX.Element;
  color: string;
  popular?: boolean;
  highlightFeatures?: string[];
}

interface FormData {
  name: string;
  email: string;
  message: string;
  phone?: string;
  company?: string;
  platform: "shopify" | "custom" | "";
  current_website?: string;
  product_count?: string;
}

const packages: Package[] = [
  {
    id: "ecommerce_starter",
    name: "E-commerce Starter",
    tagline: "Ideāls sākums jūsu tiešsaistes pārdošanai",
    price: "499",
    features: [
      "Līdz 50 produktiem",
      "Responsīvs dizains visām ierīcēm",
      "Shopify vai Custom risinājums",
      "Produktu importēšana",
      "Drošs maksājumu process",
      "Google Analytics integrācija",
      "2 mēnešu bezmaksas atbalsts",
      "SEO pamata optimizācija",
      "Izstrādes laiks: 4 nedēļas",
    ],
    description:
      "Ideāls risinājums maziem uzņēmumiem, kas vēlas uzsākt tiešsaistes pārdošanu.",
    detailedDescription:
      "E-commerce Starter pakete ir perfekts sākums jūsu tiešsaistes veikalam. Ar modernām funkcijām un profesionālu dizainu, tas sniegs jūsu klientiem lielisku iepirkšanās pieredzi. Iekļauts viss nepieciešamais, lai ātri sāktu pārdot tiešsaistē.",
    icon: <FiShoppingCart className="text-3xl" />,
    color: "#4CAF50",
  },
  {
    id: "ecommerce_growth",
    name: "E-commerce Growth",
    tagline: "Populārākā izvēle augošiem uzņēmumiem",
    price: "899",
    features: [
      "Līdz 200 produktiem",
      "Premium dizains un UX",
      "Multi-valūtu atbalsts",
      "Automatizēta produktu sinhronizācija",
      "Paplašināta analītika",
      "Sociālo mediju integrācija",
      "Mārketinga rīku integrācijas",
      "2 mēnešu bezmaksas atbalsts",
      "Padziļināta SEO optimizācija",
      "Izstrādes laiks: 6 nedēļas",
    ],
    highlightFeatures: [
      "Multi-valūtu atbalsts",
      "Paplašināta analītika",
      "Premium dizains un UX",
    ],
    description:
      "Pilnvērtīgs risinājums biznesiem, kas vēlas izcelties tiešsaistes tirgū.",
    detailedDescription:
      "E-commerce Growth pakete nodrošina visaptverošu risinājumu augošiem uzņēmumiem. Ar paplašinātām funkcijām un automatizācijas iespējām, jūs varēsiet efektīvi pārvaldīt lielāku produktu katalogu un sniegt klientiem izcilu iepirkšanās pieredzi.",
    icon: <FiTrendingUp className="text-3xl" />,
    color: "#2196F3",
    popular: true,
  },
  {
    id: "ecommerce_enterprise",
    name: "E-commerce Enterprise",
    tagline: "Premium risinājums ambicioziem uzņēmumiem",
    price: "1299",
    features: [
      "Neierobežots produktu skaits",
      "Pilnībā pielāgots dizains",
      "B2B funkcionalitāte",
      "Vairāku valodu atbalsts",
      "ERP/CRM integrācijas",
      "Pielāgoti automatizācijas risinājumi",
      "Augsta veiktspēja un drošība",
      "2 mēnešu bezmaksas atbalsts",
      "Enterprise līmeņa SEO",
      "Izstrādes laiks: 8 nedēļas",
    ],
    description:
      "Premium e-komercijas risinājums ar pilnu pielāgošanu un integrāciju.",
    detailedDescription:
      "E-commerce Enterprise ir mūsu visaptverošākais risinājums, kas paredzēts uzņēmumiem ar augstām prasībām. Ar pielāgotām funkcijām, B2B iespējām un uzlabotu veiktspēju, šis risinājums nodrošinās jūsu biznesam maksimālu izaugsmi.",
    icon: <FiGlobe className="text-3xl" />,
    color: "#9C27B0",
  },
];

const initialFormData: FormData = {
  name: "",
  email: "",
  message: "",
  phone: "",
  company: "",
  platform: "",
  current_website: "",
  product_count: "",
};

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
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      errors.name = "Vārds ir obligāts";
    }

    if (!formData.email.trim()) {
      errors.email = "E-pasts ir obligāts";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Nederīgs e-pasta formāts";
    }

    if (!formData.message.trim()) {
      errors.message = "Ziņojums ir obligāts";
    }

    if (!formData.platform) {
      errors.platform = "Platformas izvēle ir obligāta";
    }

    if (!formData.product_count?.trim()) {
      errors.product_count = "Produktu skaits ir obligāts";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("ecommerce_inquiries").insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          phone: formData.phone,
          company: formData.company,
          selected_package: selectedPackage?.id,
          selected_platform: formData.platform,
          current_website: formData.current_website,
          product_count: parseInt(formData.product_count || "0"),
        },
      ]);

      if (error) throw error;

      toast.success("Paldies! Mēs ar jums sazināsimies tuvākajā laikā.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setFormData(initialFormData);
      setShowModal(false);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Kļūda nosūtot ziņojumu. Lūdzu mēģiniet vēlreiz.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openModal = (pkg: Package): void => {
    setSelectedPackage(pkg);
    setShowModal(true);
  };

  const closeModal = (): void => {
    setShowModal(false);
    setFormData(initialFormData);
    setFormErrors({});
  };
  const PackageCard: React.FC<{ pkg: Package }> = ({ pkg }) => (
    <div
      className={`relative transform transition-all duration-300 ${
        pkg.popular ? "scale-105 z-10 mt-5" : "hover:-translate-y-1"
      }`}
    >
      <div
        className={`bg-white rounded-xl shadow-lg overflow-hidden
          ${pkg.popular ? "ring-4 ring-[#EEC71B] ring-opacity-50" : ""}
        `}
      >
        {pkg.popular && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div className="bg-[#EEC71B] text-[#3D3B4A] px-8 py-2 rounded-lg font-bold text-sm flex items-center justify-center shadow-md min-w-[250px]">
              <FiStar className="mr-2" />
              Populārākā Izvēle
            </div>
          </div>
        )}

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
          <p className="text-lg opacity-90 mb-3">{pkg.tagline}</p>
          <p className="text-4xl font-extrabold mb-1 relative z-10">
            €{pkg.price}
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            {pkg.highlightFeatures && (
              <div className="space-y-2">
                {pkg.highlightFeatures.map((feature, i) => (
                  <div
                    key={`highlight-${i}`}
                    className="flex items-center bg-yellow-50 p-2 rounded-lg"
                  >
                    <FiStar className="text-[#EEC71B] mr-2 flex-shrink-0" />
                    <span className="text-gray-800 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            <ul className="space-y-3">
              {pkg.features
                .filter((f) => !pkg.highlightFeatures?.includes(f))
                .map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <FiCheckCircle className="text-[#EEC71B] mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full px-6 py-3 rounded-lg font-bold flex items-center justify-center
                ${
                  pkg.popular
                    ? "bg-[#EEC71B] text-[#3D3B4A] hover:bg-[#ffd700]"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                } transition-colors duration-300`}
              onClick={() => openModal(pkg)}
            >
              Pieteikties
              <FiArrowRight className="ml-2" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>
          E-komercijas Risinājumi Latvijā | WebWorks - Izveide no €499
        </title>
        <meta
          name="description"
          content="🛍️ Profesionāli e-komercijas risinājumi no WebWorks. Shopify un individuāla izstrāde, SEO optimizācija, 24/7 atbalsts. E-veikala izveide 4 nedēļās."
        />
        <meta
          name="keywords"
          content="e-komercija, e-veikals, shopify, interneta veikals, web izstrāde, online shop, e-commerce, pārdošana internetā, droši maksājumi, sūtījumu izsekošana, Latvija"
        />

        {/* Canonical URL */}
        <link
          rel="canonical"
          href="https://www.webworks.lv/pakalpojumi/e-komercija"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="WebWorks" />
        <meta
          property="og:url"
          content="https://www.webworks.lv/pakalpojumi/e-komercija"
        />
        <meta
          property="og:title"
          content="E-komercijas Risinājumi | WebWorks 🛍️ Izveide no €499"
        />
        <meta
          property="og:description"
          content="✓ Shopify vai Custom risinājumi ✓ SEO optimizācija ✓ Droši maksājumi ✓ 4 nedēļu izstrāde ✓ 2 mēnešu atbalsts. Izveidojiet savu e-veikalu ar WebWorks!"
        />
        <meta
          property="og:image"
          content="https://www.webworks.lv/images/ecommerce-og.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="lv_LV" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@webworks_lv" />
        <meta
          name="twitter:title"
          content="E-komercijas Risinājumi | WebWorks 🛍️ no €499"
        />
        <meta
          name="twitter:description"
          content="✓ Shopify vai Custom risinājumi ✓ SEO optimizācija ✓ Droši maksājumi ✓ 4 nedēļu izstrāde ✓ 2 mēnešu atbalsts. Sāciet pārdot internetā!"
        />
        <meta
          name="twitter:image"
          content="https://www.webworks.lv/images/ecommerce-og.jpg"
        />

        {/* Basic SEO & Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="author" content="WebWorks" />
        <meta name="geo.region" content="LV" />
        <meta name="geo.placename" content="Jelgava" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-[#F3F5F4] to-white">
        <Header />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        <main className="container mx-auto px-4 py-16">
          <div className="max-w-7xl mx-auto">
            <section className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-[#3D3B4A] mb-8">
                Izveidojiet Savu Veiksmīgo E-komercijas Biznesu
              </h1>
              <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto">
                Pārvērtiet savas biznesa idejas realitātē ar mūsu
                profesionālajiem e-komercijas risinājumiem. Sāciet pārdot
                tiešsaistē jau 4 nedēļu laikā!
              </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {packages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </section>
            <section className="mb-16">
              <div className="bg-gradient-to-r from-[#3D3B4A] to-[#2D2B3A] p-1 rounded-lg">
                <div className="bg-gradient-to-r from-[#3D3B4A] to-[#2D2B3A] p-12 md:p-16 rounded-lg relative overflow-hidden">
                  {/* Background decorative elements */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#EEC71B] opacity-10 rounded-full blur-3xl"></div>
                    <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-[#EEC71B] opacity-10 rounded-full blur-3xl"></div>
                  </div>

                  <div className="relative z-10 max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                      Nevarat atrast piemērotu risinājumu?
                    </h2>
                    <p className="text-gray-300 text-lg mb-8">
                      Mēs piedāvājam arī individuālus e-komercijas risinājumus,
                      kas pielāgoti tieši jūsu biznesa vajadzībām. Sazinieties
                      ar mums, lai apspriestu jūsu projektu.
                    </p>
                    <motion.a
                      href="/contact-us"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center px-8 py-3 border border-transparent 
            text-base font-medium rounded-lg shadow-md text-[#3D3B4A] 
            bg-[#EEC71B] hover:bg-[#ffd700] focus:outline-none focus:ring-2 
            focus:ring-offset-2 focus:ring-[#EEC71B] transition-all duration-200"
                    >
                      Sazināties ar mums
                      <FiArrowRight className="ml-2" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </section>
            <section className="mb-16 bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold text-center mb-12">
                <span className="bg-gradient-to-r from-[#3D3B4A] to-[#2D2B3A] bg-clip-text text-transparent">
                  E-komercijas Izstrādes Process
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <span className="bg-[#EEC71B] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                      1
                    </span>
                    Konsultācija un Plānošana
                  </h3>
                  <p className="text-gray-600">
                    Izprotam jūsu vajadzības un izveidojam detalizētu
                    e-komercijas stratēģiju.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <span className="bg-[#EEC71B] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                      2
                    </span>
                    Dizains un Funkcionalitāte
                  </h3>
                  <p className="text-gray-600">
                    Izstrādājam pielāgotu dizainu un ieviešam nepieciešamās
                    e-komercijas funkcijas.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <span className="bg-[#EEC71B] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                      3
                    </span>
                    Produktu Ieviešana
                  </h3>
                  <p className="text-gray-600">
                    Importējam produktus un optimizējam to aprakstus pārdošanai.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <span className="bg-[#EEC71B] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                      4
                    </span>
                    Maksājumu Integrācija
                  </h3>
                  <p className="text-gray-600">
                    Ieviešam drošus maksājumu risinājumus un testējam
                    transakcijas.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <span className="bg-[#EEC71B] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                      5
                    </span>
                    Testēšana un Optimizācija
                  </h3>
                  <p className="text-gray-600">
                    Veicam visaptverošu testēšanu un optimizējam veiktspēju.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <span className="bg-[#EEC71B] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                      6
                    </span>
                    Palaišana un Atbalsts
                  </h3>
                  <p className="text-gray-600">
                    Palaižam veikalu un nodrošinām 2 mēnešu bezmaksas atbalstu.
                  </p>
                </div>
              </div>
            </section>
          </div>
          <AnimatePresence>
            {showModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
                onClick={closeModal}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  {selectedPackage && (
                    <div>
                      <div
                        className="p-8 text-white relative overflow-hidden"
                        style={{
                          background: `linear-gradient(135deg, ${
                            selectedPackage.color
                          } 0%, ${adjustColor(
                            selectedPackage.color,
                            -30
                          )} 100%)`,
                        }}
                      >
                        {selectedPackage.popular && (
                          <div className="absolute top-4 right-16 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                            Populārākā Izvēle
                          </div>
                        )}
                        <button
                          className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors duration-200"
                          onClick={closeModal}
                          aria-label="Aizvērt"
                        >
                          <FiX size={24} />
                        </button>
                        <h3 className="text-3xl font-bold mb-2">
                          {selectedPackage.name}
                        </h3>
                        <p className="text-xl opacity-90 mb-4">
                          {selectedPackage.tagline}
                        </p>
                        <div className="flex items-baseline gap-2">
                          <p className="text-4xl font-bold">
                            €{selectedPackage.price}
                          </p>
                        </div>
                      </div>

                      <div className="p-8">
                        <div className="prose max-w-none mb-8">
                          <p className="text-gray-700 text-lg leading-relaxed">
                            {selectedPackage.detailedDescription}
                          </p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6 mb-8">
                          <h4 className="font-bold text-xl mb-4 text-[#3D3B4A]">
                            Iekļautie pakalpojumi:
                          </h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {selectedPackage.features.map((feature, index) => (
                              <li key={index} className="flex items-center">
                                <FiCheckCircle
                                  className={`mr-3 flex-shrink-0 ${
                                    selectedPackage.highlightFeatures?.includes(
                                      feature
                                    )
                                      ? "text-yellow-500"
                                      : "text-[#EEC71B]"
                                  }`}
                                />
                                <span
                                  className={`text-gray-700 ${
                                    selectedPackage.highlightFeatures?.includes(
                                      feature
                                    )
                                      ? "font-medium"
                                      : ""
                                  }`}
                                >
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label
                                className="block text-sm font-medium text-gray-700 mb-1"
                                htmlFor="name"
                              >
                                Vārds*
                              </label>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    name: e.target.value,
                                  })
                                }
                                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[${
                                  selectedPackage.color
                                }] focus:border-transparent transition-colors duration-200
                                  ${
                                    formErrors.name
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  }`}
                                required
                              />
                              {formErrors.name && (
                                <p className="mt-1 text-sm text-red-600">
                                  {formErrors.name}
                                </p>
                              )}
                            </div>

                            <div>
                              <label
                                className="block text-sm font-medium text-gray-700 mb-1"
                                htmlFor="email"
                              >
                                E-pasts*
                              </label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    email: e.target.value,
                                  })
                                }
                                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[${
                                  selectedPackage.color
                                }] focus:border-transparent transition-colors duration-200
                                  ${
                                    formErrors.email
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  }`}
                                required
                              />
                              {formErrors.email && (
                                <p className="mt-1 text-sm text-red-600">
                                  {formErrors.email}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label
                                className="block text-sm font-medium text-gray-700 mb-1"
                                htmlFor="phone"
                              >
                                Tālrunis
                              </label>
                              <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    phone: e.target.value,
                                  })
                                }
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EEC71B] focus:border-transparent transition-colors duration-200"
                              />
                            </div>

                            <div>
                              <label
                                className="block text-sm font-medium text-gray-700 mb-1"
                                htmlFor="company"
                              >
                                Uzņēmums
                              </label>
                              <input
                                type="text"
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    company: e.target.value,
                                  })
                                }
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EEC71B] focus:border-transparent transition-colors duration-200"
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              className="block text-sm font-medium text-gray-700 mb-1"
                              htmlFor="platform"
                            >
                              Vēlamā E-komercijas Platforma*
                            </label>
                            <select
                              id="platform"
                              name="platform"
                              value={formData.platform}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  platform: e.target.value as
                                    | "shopify"
                                    | "custom",
                                })
                              }
                              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#EEC71B] focus:border-transparent transition-colors duration-200
                                ${
                                  formErrors.platform
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }`}
                              required
                            >
                              <option value="">Izvēlieties platformu</option>
                              <option value="shopify">Shopify</option>
                              <option value="custom">Custom risinājums</option>
                            </select>
                            {formErrors.platform && (
                              <p className="mt-1 text-sm text-red-600">
                                {formErrors.platform}
                              </p>
                            )}
                          </div>

                          <div>
                            <label
                              className="block text-sm font-medium text-gray-700 mb-1"
                              htmlFor="product_count"
                            >
                              Aptuvens Produktu Skaits*
                            </label>
                            <input
                              type="number"
                              id="product_count"
                              name="product_count"
                              value={formData.product_count}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  product_count: e.target.value,
                                })
                              }
                              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#EEC71B] focus:border-transparent transition-colors duration-200
                                ${
                                  formErrors.product_count
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }`}
                              required
                              min="1"
                            />
                            {formErrors.product_count && (
                              <p className="mt-1 text-sm text-red-600">
                                {formErrors.product_count}
                              </p>
                            )}
                          </div>

                          <div>
                            <label
                              className="block text-sm font-medium text-gray-700 mb-1"
                              htmlFor="current_website"
                            >
                              Pašreizējā Mājaslapa (ja ir)
                            </label>
                            <input
                              type="url"
                              id="current_website"
                              name="current_website"
                              value={formData.current_website}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  current_website: e.target.value,
                                })
                              }
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EEC71B] focus:border-transparent transition-colors duration-200"
                              placeholder="https://"
                            />
                          </div>

                          <div>
                            <label
                              className="block text-sm font-medium text-gray-700 mb-1"
                              htmlFor="message"
                            >
                              Papildus informācija*
                            </label>
                            <textarea
                              id="message"
                              name="message"
                              value={formData.message}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  message: e.target.value,
                                })
                              }
                              rows={4}
                              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[${
                                selectedPackage.color
                              }] focus:border-transparent transition-colors duration-200
                                ${
                                  formErrors.message
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }`}
                              required
                              placeholder="Pastāstiet vairāk par savu projektu..."
                            ></textarea>
                            {formErrors.message && (
                              <p className="mt-1 text-sm text-red-600">
                                {formErrors.message}
                              </p>
                            )}
                          </div>

                          <div className="bg-gray-50 p-6 -mx-6 mt-6 flex justify-between items-center">
                            <div className="text-sm text-gray-600">
                              <p className="font-medium">Izvēlētā pakete:</p>
                              <p className="text-gray-900">
                                {selectedPackage.name}
                              </p>
                            </div>
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className={`inline-flex items-center px-6 py-3 border border-transparent 
                                text-base font-medium rounded-full shadow-sm text-[#3D3B4A] 
                                bg-[#EEC71B] hover:bg-[#ffd700] focus:outline-none focus:ring-2 
                                focus:ring-offset-2 focus:ring-[#EEC71B] disabled:opacity-50 
                                disabled:cursor-not-allowed transition-all duration-200`}
                            >
                              {isSubmitting ? (
                                <>
                                  <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#3D3B4A]"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                  </svg>
                                  Nosūta...
                                </>
                              ) : (
                                <>
                                  Pieteikties
                                  <FiArrowRight className="ml-2" />
                                </>
                              )}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <Footer />
      </div>

      <script
        id="schema-script"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            mainEntity: {
              "@type": "ProfessionalService",
              name: "WebWorks E-commerce Solutions",
              image: "https://www.webworks.lv/images/ecommerce-og.jpg",
              "@id": "https://www.webworks.lv",
              url: "https://www.webworks.lv/pakalpojumi/e-komercija",
              telephone: "+37126282630",
              priceRange: "€499 - €1299",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Kungu Iela 23/8",
                addressLocality: "Jelgava",
                postalCode: "LV-3001",
                addressCountry: "LV",
              },
              description:
                "WebWorks piedāvā profesionālus e-komercijas risinājumus ar Shopify vai individuālu izstrādi. Pilns serviss no dizaina līdz ieviešanai.",
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                ],
                opens: "09:00",
                closes: "20:00",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "89",
              },
              offers: {
                "@type": "AggregateOffer",
                priceCurrency: "EUR",
                lowPrice: 499,
                highPrice: 1299,
                offerCount: 3,
                offers: packages.map((pkg) => ({
                  "@type": "Offer",
                  name: pkg.name,
                  description: pkg.description,
                  price: pkg.price,
                  priceCurrency: "EUR",
                  validFrom: "2024-01-01",
                  url: "https://www.webworks.lv/pakalpojumi/e-komercija",
                  itemOffered: {
                    "@type": "Service",
                    name: pkg.name,
                    description: pkg.detailedDescription,
                  },
                })),
              },
              breadcrumb: {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    item: {
                      "@id": "https://www.webworks.lv",
                      name: "Sākums",
                    },
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    item: {
                      "@id": "https://www.webworks.lv/pakalpojumi",
                      name: "Pakalpojumi",
                    },
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    item: {
                      "@id": "https://www.webworks.lv/pakalpojumi/e-komercija",
                      name: "E-komercija",
                    },
                  },
                ],
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "E-komercijas pakalpojumi",
                itemListElement: packages.map((pkg, index) => ({
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: pkg.name,
                    description: pkg.detailedDescription,
                  },
                  position: index + 1,
                })),
              },
            },
          }),
        }}
      />
    </>
  );
};

export default ECommerceServices;
