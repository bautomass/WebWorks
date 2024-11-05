"use client";

import React, { useState } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiSearch,
  FiTrendingUp,
  FiBarChart2,
  FiCheckCircle,
  FiX,
  FiArrowRight,
  FiStar,
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
  website_url?: string;
}

const packages: Package[] = [
  {
    id: "seo_basic",
    name: "SEO Pamati",
    tagline: "Ideāls sākums jūsu digitālajam SEO ceļojumam",
    price: "299",
    features: [
      "Atslēgvārdu izpēte (10 atslēgvārdi)",
      "On-page SEO optimizācija",
      "Meta tagu optimizācija",
      "Google My Business optimizācija",
      "Pamata analītika un atskaites",
      "1 mēneša atbalsts",
      "Ikmēneša SEO atskaite",
      "Konkurentu analīze",
    ],
    description:
      "Ideāls sākums maziem uzņēmumiem, kas vēlas uzlabot savu redzamību meklētājprogrammās.",
    detailedDescription:
      "Mūsu SEO Pamatu pakete ir ideāls sākums jūsu uzņēmuma tiešsaistes redzamībai. Mēs sāksim ar rūpīgu 10 galveno atslēgvārdu izpēti, veicot pilnu on-page SEO optimizāciju un tehnisko auditu.",
    icon: <FiSearch className="text-3xl" />,
    color: "#4CAF50",
  },
  {
    id: "seo_pro",
    name: "SEO Pro",
    tagline: "Vispieprasītākā SEO optimizācijas pakete",
    price: "599",
    features: [
      "Padziļināta atslēgvārdu izpēte (25 atslēgvārdi)",
      "Visaptveroša on-page un off-page SEO",
      "Satura optimizācija un radīšana",
      "Tehniskā SEO audits un uzlabojumi",
      "Lokālā SEO stratēģija",
      "Konkurentu analīze",
      "Mēneša analītika un detalizētas atskaites",
      "3 mēnešu atbalsts",
    ],
    highlightFeatures: [
      "Visaptveroša on-page un off-page SEO",
      "Satura optimizācija un radīšana",
      "3 mēnešu atbalsts",
    ],
    description:
      "Pilnvērtīgs SEO risinājums vidējiem uzņēmumiem, kas vēlas būtiski uzlabot savu tiešsaistes klātbūtni.",
    detailedDescription:
      "SEO Pro pakete ir visaptverošs risinājums uzņēmumiem, kas nopietni vēlas uzlabot savu tiešsaistes redzamību. Ietver padziļinātu 25 atslēgvārdu izpēti un pilnu SEO optimizācijas stratēģiju.",
    icon: <FiTrendingUp className="text-3xl" />,
    color: "#2196F3",
    popular: true,
  },
  {
    id: "seo_enterprise",
    name: "SEO Enterprise",
    tagline: "Premium SEO risinājums ambicioziem uzņēmumiem",
    price: "1299",
    features: [
      "Visaptveroša atslēgvārdu stratēģija (50+ atslēgvārdi)",
      "Pielāgota SEO stratēģija",
      "Regulāra satura radīšana un optimizācija",
      "Padziļināta tehniskā SEO optimizācija",
      "Backlink veidošanas kampaņa",
      "E-commerce SEO (ja piemērojams)",
      "Starptautiskā SEO stratēģija",
      "Konkurences izlūkošana",
      "Detalizēta analītika un ROI atskaites",
      "6 mēnešu atbalsts",
    ],
    description:
      "Premium SEO pakalpojums lieliem uzņēmumiem un e-komercijas vietnēm.",
    detailedDescription:
      "SEO Enterprise ir mūsu visaptverošākais SEO risinājums, kas paredzēts uzņēmumiem ar augstām ambīcijām tiešsaistē. Ietver vairāk nekā 50 rūpīgi izvēlētus atslēgvārdus un pilnu tehnisko optimizāciju.",
    icon: <FiBarChart2 className="text-3xl" />,
    color: "#9C27B0",
  },
];

const initialFormData: FormData = {
  name: "",
  email: "",
  message: "",
  phone: "",
  company: "",
  website_url: "",
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

const SEOOptimizacija: React.FC = () => {
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

    if (!formData.website_url?.trim()) {
      errors.website_url = "Vietnes URL ir obligāts";
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
      const { error } = await supabase.from("seo_inquiries").insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          phone: formData.phone,
          company: formData.company,
          website_url: formData.website_url,
          selected_package: selectedPackage?.id,
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
            <span className="text-lg font-normal">/mēnesī</span>
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

  const ProcessSection: React.FC = () => (
    <section
      aria-labelledby="our-process"
      className="mb-16 bg-white p-8 rounded-xl shadow-lg"
    >
      <h2 id="our-process" className="text-3xl font-bold text-center mb-12">
        <span className="bg-gradient-to-r from-[#3D3B4A] to-[#2D2B3A] bg-clip-text text-transparent">
          Mūsu SEO Optimizācijas Process
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
          <h3 className="font-bold text-lg mb-4 flex items-center">
            <span className="bg-[#EEC71B] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
              1
            </span>
            Audits un Analīze
          </h3>
          <p className="text-gray-600">
            Sākam ar rūpīgu jūsu vietnes un esošās SEO stratēģijas auditu,
            identificējot stiprās puses un uzlabojamās jomas.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
          <h3 className="font-bold text-lg mb-4 flex items-center">
            <span className="bg-[#EEC71B] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
              2
            </span>
            Atslēgvārdu Izpēte
          </h3>
          <p className="text-gray-600">
            Veicam padziļinātu atslēgvārdu izpēti, identificējot vērtīgākos un
            releventākos atslēgvārdus jūsu biznesam.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
          <h3 className="font-bold text-lg mb-4 flex items-center">
            <span className="bg-[#EEC71B] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
              3
            </span>
            On-Page Optimizācija
          </h3>
          <p className="text-gray-600">
            Optimizējam jūsu vietnes saturu, meta tagus, URL struktūru un citus
            on-page elementus.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
          <h3 className="font-bold text-lg mb-4 flex items-center">
            <span className="bg-[#EEC71B] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
              4
            </span>
            Tehniskā SEO
          </h3>
          <p className="text-gray-600">
            Uzlabojam vietnes tehniskos aspektus, ieskaitot ielādes ātrumu un
            mobilo optimizāciju.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
          <h3 className="font-bold text-lg mb-4 flex items-center">
            <span className="bg-[#EEC71B] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
              5
            </span>
            Satura Stratēģija
          </h3>
          <p className="text-gray-600">
            Izstrādājam un ieviešam visaptverošu satura stratēģiju ar SEO
            optimizētu saturu.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
          <h3 className="font-bold text-lg mb-4 flex items-center">
            <span className="bg-[#EEC71B] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
              6
            </span>
            Monitorings un Optimizācija
          </h3>
          <p className="text-gray-600">
            Nepārtraukti uzraugām SEO sniegumu un veicam nepieciešamās
            korekcijas.
          </p>
        </div>
      </div>
    </section>
  );

  return (
    <>
      <Head>
        <title>
          SEO Optimizācija Latvijā | WebWorks - Jūsu Digitālais Partneris
        </title>
        <meta
          name="description"
          content="WebWorks piedāvā profesionālu SEO optimizāciju Latvijā. Uzlabojiet sava uzņēmuma redzamību meklētājprogrammās un piesaistiet vairāk klientu."
        />
        <meta
          name="keywords"
          content="SEO optimizācija, meklētājprogrammu optimizācija, atslēgvārdu izpēte, on-page SEO, off-page SEO, tehniskā SEO, Latvija"
        />
        <link
          rel="canonical"
          href="https://www.webworks.lv/pakalpojumi/seo-optimizacija"
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
                SEO Optimizācija, kas Transformē Jūsu Biznesu
              </h1>
              <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto">
                Uzlabojiet savu pozīciju meklētājprogrammās un palieliniet
                organisko apmeklētāju skaitu ar mūsu profesionālajiem SEO
                pakalpojumiem.
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
                      Meklējat individuālu SEO risinājumu?
                    </h2>
                    <p className="text-gray-300 text-lg mb-8">
                      Mēs piedāvājam arī pielāgotus SEO pakalpojumus, kas
                      atbilst tieši jūsu biznesa vajadzībām un mērķiem.
                      Sazinieties ar mums, lai apspriestu jūsu unikālo
                      situāciju.
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
            <ProcessSection />
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
                          <span className="text-lg opacity-75">/mēnesī</span>
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
                              htmlFor="website_url"
                            >
                              Jūsu Vietnes URL*
                            </label>
                            <input
                              type="url"
                              id="website_url"
                              name="website_url"
                              value={formData.website_url}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  website_url: e.target.value,
                                })
                              }
                              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[${
                                selectedPackage.color
                              }] focus:border-transparent transition-colors duration-200
                                ${
                                  formErrors.website_url
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }`}
                              required
                            />
                            {formErrors.website_url && (
                              <p className="mt-1 text-sm text-red-600">
                                {formErrors.website_url}
                              </p>
                            )}
                          </div>

                          <div>
                            <label
                              className="block text-sm font-medium text-gray-700 mb-1"
                              htmlFor="message"
                            >
                              Jūsu ziņojums*
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

          <style jsx global>{`
            @media (max-width: 640px) {
              .container {
                padding-left: 1rem;
                padding-right: 1rem;
              }

              .modal-content {
                margin: 0.5rem;
                max-height: calc(100vh - 1rem);
              }
            }

            .modal-scroll::-webkit-scrollbar {
              width: 6px;
              height: 6px;
            }

            .modal-scroll::-webkit-scrollbar-track {
              background: #f1f1f1;
              border-radius: 3px;
            }

            .modal-scroll::-webkit-scrollbar-thumb {
              background: #eec71b;
              border-radius: 3px;
              transition: all 0.2s ease-in-out;
            }

            .modal-scroll::-webkit-scrollbar-thumb:hover {
              background: #ddb919;
            }

            *:focus {
              outline: 2px solid #eec71b;
              outline-offset: 2px;
            }

            input:hover,
            textarea:hover {
              border-color: #eec71b;
            }

            .transition-all {
              transition: all 0.3s ease-in-out;
            }
          `}</style>
        </main>

        <Footer />
      </div>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "SEO Optimizācija Latvijā | WebWorks",
            description:
              "WebWorks piedāvā profesionālu SEO optimizāciju Latvijā. Uzlabojiet sava uzņēmuma redzamību meklētājprogrammās un piesaistiet vairāk klientu.",
            url: "https://www.webworks.lv/pakalpojumi/seo-optimizacija",
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
              lowPrice: "299",
              highPrice: "1299",
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
                  serviceType: "SEO Optimization",
                  provider: {
                    "@type": "Organization",
                    name: "WebWorks",
                  },
                },
              })),
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://www.webworks.lv/pakalpojumi/seo-optimizacija",
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
                      "https://www.webworks.lv/pakalpojumi/seo-optimizacija",
                    name: "SEO Optimizācija",
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

export default SEOOptimizacija;
