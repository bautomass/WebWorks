"use client";

import React, { useState } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiSmartphone,
  FiLayers,
  FiGlobe,
  FiCheckCircle,
  FiX,
  FiArrowRight,
  FiStar,
  FiZap,
  FiUsers,
  FiShield,
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
  platform: string;
}

interface FormData {
  name: string;
  email: string;
  message: string;
  phone?: string;
  company?: string;
  platform?: "ios" | "android" | "both" | "";
  project_description?: string;
  budget?: string;
}

const packages: Package[] = [
  {
    id: "app_starter",
    name: "Pamata Lietotne",
    tagline: "Ideāls sākums mobilajā tirgū",
    price: "999",
    features: [
      "Vienas platformas izstrāde (iOS vai Android)",
      "Līdz 5 galvenajām funkcijām",
      "Pamata dizains un UX",
      "Lokāla datu glabāšana",
      "Pamata API integrācija",
      "Lietotnes publicēšana App Store/Play Store",
      "30 dienu atbalsts pēc palaišanas",
      "Bezmaksas uzturēšana 2 mēnešus",
      "Izstrādes laiks: 2-3 mēneši",
    ],
    description:
      "Ideāls risinājums maziem uzņēmumiem vai startapiem, kas vēlas ienākt mobilajā tirgū.",
    detailedDescription:
      "Pamata Lietotnes pakete ir perfekts sākums jūsu mobilajai klātbūtnei. Mēs izveidosim kvalitatīvu lietotni ar būtiskākajām funkcijām, kas nepieciešamas jūsu biznesa uzsākšanai mobilajā vidē.",
    icon: <FiSmartphone className="text-3xl" />,
    color: "#4CAF50",
    platform: "iOS vai Android",
  },
  {
    id: "app_pro",
    name: "Profesionālā Lietotne",
    tagline: "Visaptverošs mobilais risinājums",
    price: "3999",
    features: [
      "Abas platformas (iOS un Android)",
      "Līdz 10 pielāgotām funkcijām",
      "Premium UI/UX dizains",
      "Mākoņa datu glabāšana",
      "Paplašināta API integrācija",
      "Push paziņojumi",
      "In-app pirkumi",
      "Analītika un lietotāju uzvedības izsekošana",
      "60 dienu atbalsts pēc palaišanas",
      "Izstrādes laiks: 3-4 mēneši",
    ],
    highlightFeatures: [
      "Abas platformas (iOS un Android)",
      "Premium UI/UX dizains",
      "Push paziņojumi un In-app pirkumi",
    ],
    description:
      "Visaptverošs risinājums uzņēmumiem, kas vēlas piedāvāt pilnvērtīgu mobilo pieredzi.",
    detailedDescription:
      "Profesionālā Lietotnes pakete nodrošina augsta līmeņa mobilo risinājumu ar paplašinātu funkcionalitāti un profesionālu dizainu. Ideāli piemērota uzņēmumiem, kas vēlas nodrošināt kvalitatīvu mobilo pieredzi saviem klientiem.",
    icon: <FiLayers className="text-3xl" />,
    color: "#2196F3",
    popular: true,
    platform: "iOS un Android",
  },
  {
    id: "app_enterprise",
    name: "Uzņēmuma Lietotne",
    tagline: "Premium risinājums kompleksām vajadzībām",
    price: "6999+",
    features: [
      "Vairāku platformu atbalsts",
      "Neierobežots funkciju skaits",
      "Pielāgots UI/UX ar unikālu identitāti",
      "Sarežģīta backend integrācija",
      "Mākslīgā intelekta integrācija",
      "Lietotāju autentifikācija un drošība",
      "Detalizēta analītika un atskaites",
      "Mērogojama arhitektūra",
      "12 mēnešu atbalsts un uzturēšana",
      "Izstrādes laiks: 4-6 mēneši",
    ],
    description:
      "Premium risinājums lieliem uzņēmumiem ar kompleksām prasībām un lielu lietotāju bāzi.",
    detailedDescription:
      "Uzņēmuma Lietotnes pakete ir mūsu visaptverošākais mobilais risinājums, kas paredzēts uzņēmumiem ar augstām prasībām un lielu lietotāju skaitu. Ietver pilnu tehnisko atbalstu, pielāgotu izstrādi un premium funkcijas.",
    icon: <FiGlobe className="text-3xl" />,
    color: "#9C27B0",
    platform: "iOS, Android, Web",
  },
];

const initialFormData: FormData = {
  name: "",
  email: "",
  message: "",
  phone: "",
  company: "",
  platform: "",
  project_description: "",
  budget: "",
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

const MobileAppDevelopment: React.FC = () => {
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
      const { error } = await supabase
        .from("app_development_inquiries")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            phone: formData.phone,
            company: formData.company,
            selected_package: selectedPackage?.id,
            platform: formData.platform,
            project_description: formData.project_description,
            budget: formData.budget,
            status: "new",
          },
        ]);

      if (error) {
        console.error("Supabase error:", error);
        toast.error("Kļūda nosūtot ziņojumu. Lūdzu mēģiniet vēlreiz.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }

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
      className={`relative transform transition-all duration-300 h-full ${
        pkg.popular ? "scale-105 z-10 mt-5" : "hover:-translate-y-1"
      }`}
    >
      <div
        className={`bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col
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
          <p className="text-sm opacity-75">{pkg.platform}</p>
        </div>

        <div className="p-6 space-y-6 flex-grow flex flex-col">
          <div className="space-y-4 flex-grow">
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

          <div className="pt-6 border-t border-gray-100 mt-auto">
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
          href="https://www.webworks.lv/pakalpojumi/mobilas-aplikacijas"
        />
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
                Inovatīva Mobilo Aplikāciju Izstrāde
              </h1>
              <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto">
                Pārvērtiet savas idejas realitātē ar mūsu ekspertu veidotām
                mobilajām lietotnēm. Mēs radām lietotnes, kas piesaista,
                iesaista un pārveido jūsu biznesu.
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
                      Meklējat Individuālu Mobilo Risinājumu?
                    </h2>
                    <p className="text-gray-300 text-lg mb-8">
                      Mēs piedāvājam arī pielāgotus mobilos risinājumus, kas
                      atbilst tieši jūsu biznesa vajadzībām un mērķiem.
                      Sazinieties ar mums, lai apspriestu jūsu unikālo projektu.
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
                  Mobilo Aplikāciju Izstrādes Process
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <span className="bg-[#EEC71B] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                      1
                    </span>
                    Idejas un Plānošana
                  </h3>
                  <p className="text-gray-600">
                    Definējam projekta mērķus, funkcionalitāti un tehniskās
                    prasības.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <span className="bg-[#EEC71B] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                      2
                    </span>
                    UI/UX Dizains
                  </h3>
                  <p className="text-gray-600">
                    Izstrādājam intuitīvu un pievilcīgu lietotāja saskarni.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <span className="bg-[#EEC71B] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                      3
                    </span>
                    Izstrāde
                  </h3>
                  <p className="text-gray-600">
                    Veicam aplikācijas izstrādi ar modernām tehnoloģijām.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <span className="bg-[#EEC71B] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                      4
                    </span>
                    Testēšana
                  </h3>
                  <p className="text-gray-600">
                    Veicam rūpīgu kvalitātes pārbaudi un optimizāciju.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <span className="bg-[#EEC71B] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                      5
                    </span>
                    Publicēšana
                  </h3>
                  <p className="text-gray-600">
                    Publicējam lietotni App Store un Google Play veikalos.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <span className="bg-[#EEC71B] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                      6
                    </span>
                    Atbalsts
                  </h3>
                  <p className="text-gray-600">
                    Nodrošinām nepārtrauktu uzturēšanu un atjauninājumus.
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
                              Vēlamā Platforma*
                            </label>
                            <select
                              id="platform"
                              name="platform"
                              value={formData.platform}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  platform: e.target.value as
                                    | "ios"
                                    | "android"
                                    | "both",
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
                              <option value="ios">iOS</option>
                              <option value="android">Android</option>
                              <option value="both">iOS un Android</option>
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
                              htmlFor="message"
                            >
                              Īss apraksts par jūsu vajadzībām*
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
                              rows={3}
                              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#EEC71B] focus:border-transparent transition-colors duration-200
      ${formErrors.message ? "border-red-500" : "border-gray-300"}`}
                              required
                              placeholder="Pastāstiet īsumā par savām vajadzībām un vēlmēm"
                            ></textarea>
                            {formErrors.message && (
                              <p className="mt-1 text-sm text-red-600">
                                {formErrors.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <label
                              className="block text-sm font-medium text-gray-700 mb-1"
                              htmlFor="project_description"
                            >
                              Projekta apraksts*
                            </label>
                            <textarea
                              id="project_description"
                              name="project_description"
                              value={formData.project_description}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  project_description: e.target.value,
                                })
                              }
                              rows={4}
                              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#EEC71B] focus:border-transparent transition-colors duration-200
                          ${
                            formErrors.project_description
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                              required
                              placeholder="Aprakstiet savu projekta ideju un galvenās funkcijas..."
                            ></textarea>
                          </div>

                          <div className="bg-gray-50 p-6 -mx-6 mt-6 flex justify-between items-center">
                            <div className="text-sm text-gray-600">
                              <p className="font-medium">Izvēlētā pakete:</p>
                              <p className="text-gray-900">
                                {selectedPackage.name} - €
                                {selectedPackage.price}
                              </p>
                            </div>
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className={`inline-flex items-center px-6 py-3 border border-transparent 
                          text-base font-medium rounded-lg shadow-sm text-[#3D3B4A] 
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
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Mobilās Aplikācijas Izstrāde | WebWorks",
            description:
              "WebWorks piedāvā profesionālu mobilo aplikāciju izstrādi. Izveidojiet savu iOS, Android vai hibrīdo lietotni ar mūsu ekspertu palīdzību.",
            url: "https://www.webworks.lv/pakalpojumi/mobilas-aplikacijas",
            provider: {
              "@type": "Organization",
              name: "WebWorks",
              url: "https://www.webworks.lv",
              address: {
                "@type": "PostalAddress",
                addressCountry: "LV",
              },
            },
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "EUR",
              lowPrice: "999",
              highPrice: "6999",
              offerCount: packages.length,
              offers: packages.map((pkg) => ({
                "@type": "Offer",
                name: pkg.name,
                description: pkg.description,
                price: pkg.price,
                priceCurrency: "EUR",
                itemOffered: {
                  "@type": "Service",
                  name: pkg.name,
                  description: pkg.detailedDescription,
                  serviceType: "Mobile App Development",
                  provider: {
                    "@type": "Organization",
                    name: "WebWorks",
                  },
                },
              })),
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://www.webworks.lv/pakalpojumi/mobilas-aplikacijas",
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
                    "@id":
                      "https://www.webworks.lv/pakalpojumi/mobilas-aplikacijas",
                    name: "Mobilās Aplikācijas",
                  },
                },
              ],
            },
          }),
        }}
      />
    </>
  );
};

export default MobileAppDevelopment;
