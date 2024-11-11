"use client";

import React, { useState } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiLayers,
  FiBox,
  FiCode,
  FiCheckCircle,
  FiX,
  FiArrowRight,
  FiStar,
  FiDatabase,
  FiServer,
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
  estimatedDuration: string;
}

interface FormData {
  name: string;
  email: string;
  message: string;
  phone: string | null;
  company: string | null;
  selected_package: string;
  estimated_duration: "1_3" | "3_6" | "6_9";
  project_description: string;
  payment_plan_interest: boolean;
  has_existing_system: boolean;
  preferred_start_date: string | null;
}

const packages: Package[] = [
  {
    id: "basic_saas",
    name: "Core SAAS Risinājums",
    tagline: "Ideāls sākums jūsu SAAS biznesam",
    price: "1299",
    estimatedDuration: "1-3 mēneši",
    features: [
      "Autentifikācijas sistēma",
      "Lietotāju pārvaldība",
      "Pamata administrācijas panelis",
      "Responsīvs dizains visām ierīcēm",
      "Maksājumu integrācija (Stripe)",
      "Pamata analītika",
      "MySQL/PostgreSQL datubāze",
      "API dokumentācija",
      "AWS/Digital Ocean hostings",
      "SSL sertifikāts",
      "2 mēnešu bezmaksas atbalsts",
      "Pamata drošības iestatījumi",
    ],
    description:
      "Pilnvērtīgs SAAS risinājums ar visām pamata funkcijām, kas nepieciešamas veiksmīgam startam.",
    detailedDescription:
      "Mūsu Core SAAS risinājums ir ideāls sākums jūsu biznesa idejas realizēšanai. Tas ietver visas nepieciešamās funkcijas, lai uzsāktu SAAS biznesu - no lietotāju pārvaldības līdz maksājumu apstrādei. Sistēma tiek veidota ar modernām tehnoloģijām un labākajām praksēm, nodrošinot ātru un drošu platformu.",
    icon: <FiCode className="text-3xl" />,
    color: "#4CAF50",
  },
  {
    id: "advanced_saas",
    name: "Premium SAAS Platforma",
    tagline: "Paplašināta funkcionalitāte un integrācijas",
    price: "2999",
    estimatedDuration: "3-6 mēneši",
    features: [
      "Visas Core SAAS funkcijas",
      "Paplašināta lietotāju pārvaldība ar lomām",
      "Advanced analītika un atskaites",
      "Multi-tenancy arhitektūra",
      "Custom API izstrāde",
      "Vairāku valodu atbalsts",
      "Automatizēti backup risinājumi",
      "Elasticsearch integrācija",
      "Redis kešatmiņa",
      "Detalizēta aktivitāšu vēsture",
      "Advanced drošības iestatījumi",
      "6 mēnešu atbalsts un uzturēšana",
      "Performance optimizācija",
      "CI/CD pipeline iestatīšana",
    ],
    description:
      "Premium līmeņa SAAS platforma ar paplašinātu funkcionalitāti un uzlabotu veiktspēju.",
    detailedDescription:
      "Premium SAAS Platforma ir izstrādāta, domājot par biznesa izaugsmi un paplašināšanos. Tā ietver modernākos risinājumus un tehnoloģijas, kas nodrošina augstu veiktspēju, drošību un pielāgojamību. Šis risinājums ir ideāls uzņēmumiem, kas plāno strauji attīstīties un kuriem nepieciešama robusts un pielāgojama platforma.",
    icon: <FiServer className="text-3xl" />,
    color: "#2196F3",
    popular: true,
    highlightFeatures: [
      "Multi-tenancy arhitektūra",
      "Advanced analītika un atskaites",
      "Elasticsearch integrācija",
    ],
  },
  {
    id: "enterprise_saas",
    name: "Enterprise SAAS Risinājums",
    tagline: "Augstas veiktspējas sistēma lieliem uzņēmumiem",
    price: "4999",
    estimatedDuration: "6-9 mēneši",
    features: [
      "Visas Premium SAAS funkcijas",
      "Mikroservisu arhitektūra",
      "Kubernetes orchestration",
      "Custom AI/ML integrācijas",
      "Enterprise līmeņa drošība",
      "24/7 sistēmas monitorings",
      "Load balancing un auto-scaling",
      "Vairāku datu centru atbalsts",
      "Advanced backup un DR risinājumi",
      "SLA garantija",
      "Dedicated DevOps atbalsts",
      "12 mēnešu atbalsts un uzturēšana",
      "Pielāgoti integrāciju risinājumi",
      "On-premise deployment opcija",
    ],
    description:
      "Enterprise līmeņa SAAS risinājums ar augstāko veiktspēju, drošību un pielāgojamību.",
    detailedDescription:
      "Enterprise SAAS Risinājums ir mūsu visaptverošākā piedāvājuma pakete, kas paredzēta lieliem uzņēmumiem ar augstām prasībām. Šis risinājums nodrošina maksimālu veiktspēju, drošību un pielāgojamību, izmantojot modernāko mikroservisu arhitektūru un enterprise līmeņa tehnoloģijas.",
    icon: <FiDatabase className="text-3xl" />,
    color: "#9C27B0",
  },
];

const initialFormData: FormData = {
  name: "",
  email: "",
  message: "",
  phone: null,
  company: null,
  selected_package: "",
  estimated_duration: "1_3",
  project_description: "",
  payment_plan_interest: false,
  has_existing_system: false,
  preferred_start_date: null,
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

const WebAppDevelopment: React.FC = () => {
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

    if (!formData.project_description?.trim()) {
      errors.project_description = "Projekta apraksts ir obligāts";
    }

    if (!formData.estimated_duration) {
      errors.estimated_duration = "Lūdzu izvēlieties projekta ilgumu";
    }

    if (!selectedPackage?.id) {
      errors.selected_package = "Lūdzu izvēlieties paketi";
    }

    // Use project description as message if message is empty
    if (!formData.message && formData.project_description) {
      setFormData((prev) => ({
        ...prev,
        message: formData.project_description,
      }));
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Lūdzu aizpildiet visus obligātos laukus", {
        position: "top-center",
        autoClose: 5000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create submission data exactly matching the table structure
      const submissionData = {
        name: formData.name,
        email: formData.email,
        project_description: formData.project_description,
        selected_package: selectedPackage?.id,
        estimated_duration: formData.estimated_duration,
        phone: formData.phone || null,
        company: formData.company || null,
        message: formData.message || formData.project_description,
        payment_plan_interest: formData.payment_plan_interest,
        has_existing_system: formData.has_existing_system,
        preferred_start_date: formData.preferred_start_date || null,
        status: "new",
      };

      console.log("Submitting data:", submissionData);

      const { error } = await supabase
        .from("web_app_inquiries")
        .insert([submissionData]);

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      toast.success("Paldies! Mēs ar jums sazināsimies tuvākajā laikā.", {
        position: "top-center",
        autoClose: 5000,
      });

      setFormData(initialFormData);
      setShowModal(false);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Kļūda nosūtot ziņojumu. Lūdzu mēģiniet vēlreiz.", {
        position: "top-center",
        autoClose: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const ServiceCard: React.FC<{ pkg: Package }> = ({ pkg }) => (
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
          <div className="relative z-10">
            <p className="text-4xl font-bold">€{pkg.price}</p>
            <p className="text-sm opacity-75">sākot no</p>
          </div>
          <p className="text-sm mt-2 opacity-90">
            Izstrādes laiks: {pkg.estimatedDuration}
          </p>
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
              onClick={() => {
                setSelectedPackage(pkg);
                setShowModal(true);
              }}
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
          Web Aplikāciju & SAAS Izstrāde Latvijā | WebWorks - No €1299
        </title>
        <meta
          name="description"
          content="🚀 Profesionāla web aplikāciju un SAAS platformu izstrāde no WebWorks. Mūsdienīgas tehnoloģijas, mikroservisu arhitektūra, enterprise risinājumi. Izstrāde no 3 mēnešiem. Bezmaksas konsultācija + MVP demo."
        />
        <meta
          name="keywords"
          content="web aplikācijas, SAAS risinājumi, custom software, mikroservisi, cloud risinājumi, enterprise software, web development, react, node.js, aws, kubernetes, api izstrāde, Latvija"
        />

        {/* Canonical URL */}
        <link
          rel="canonical"
          href="https://www.webworks.lv/pakalpojumi/web-aplikacijas"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="WebWorks" />
        <meta
          property="og:url"
          content="https://www.webworks.lv/pakalpojumi/web-aplikacijas"
        />
        <meta
          property="og:title"
          content="Web Aplikācijas & SAAS | WebWorks 🚀 Enterprise Risinājumi"
        />
        <meta
          property="og:description"
          content="✓ Moderna arhitektūra ✓ Mikroservisi ✓ Cloud Native ✓ Pilns DevOps ✓ 24/7 atbalsts. Izveidojiet savu nākamo lielo produktu ar WebWorks!"
        />
        <meta
          property="og:image"
          content="https://www.webworks.lv/images/web-app-development-og.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="lv_LV" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@webworks_lv" />
        <meta
          name="twitter:title"
          content="Web Aplikācijas & SAAS | WebWorks 🚀 no €1299"
        />
        <meta
          name="twitter:description"
          content="✓ Moderna arhitektūra ✓ Mikroservisi ✓ Cloud Native ✓ Pilns DevOps. Izveidojiet savu nākamo produktu!"
        />
        <meta
          name="twitter:image"
          content="https://www.webworks.lv/images/web-app-development-og.jpg"
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
                Moderna Web Aplikāciju Izstrāde Jūsu Biznesam
              </h1>
              <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto">
                Pārvērtiet savas biznesa idejas realitātē ar mūsu ekspertu
                veidotām web aplikācijām. Mēs izmantojam jaunākās tehnoloģijas
                un labākās prakses, lai radītu efektīvus un mūsdienīgus
                risinājumus.
              </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {packages.map((pkg) => (
                <ServiceCard key={pkg.id} pkg={pkg} />
              ))}
            </section>

            <section className="mb-16">
              <div className="bg-gradient-to-r from-[#3D3B4A] to-[#2D2B3A] p-1 rounded-lg">
                <div className="bg-gradient-to-r from-[#3D3B4A] to-[#2D2B3A] p-12 md:p-16 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#EEC71B] opacity-10 rounded-full blur-3xl"></div>
                    <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-[#EEC71B] opacity-10 rounded-full blur-3xl"></div>
                  </div>

                  <div className="relative z-10 max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                      Vajadzīgs Individuāls Risinājums?
                    </h2>
                    <p className="text-gray-300 text-lg mb-8">
                      Mēs specializējamies arī individuālu web aplikāciju
                      izstrādē. Pastāstiet mums par savu projektu, un mēs
                      izveidosim risinājumu, kas precīzi atbilst jūsu biznesa
                      vajadzībām.
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
          </div>

          <AnimatePresence>
            {showModal && selectedPackage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
                onClick={() => setShowModal(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    className="p-8 text-white relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${
                        selectedPackage.color
                      } 0%, ${adjustColor(selectedPackage.color, -30)} 100%)`,
                    }}
                  >
                    <button
                      className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors duration-200"
                      onClick={() => setShowModal(false)}
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
                      <span className="text-lg opacity-75">sākot no</span>
                    </div>
                    <p className="text-sm mt-2 opacity-90">
                      Izstrādes laiks: {selectedPackage.estimatedDuration}
                    </p>
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
                            <FiCheckCircle className="text-[#EEC71B] mr-2 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
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
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#EEC71B] focus:border-transparent transition-colors duration-200
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
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#EEC71B] focus:border-transparent transition-colors duration-200
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
                          htmlFor="estimated_duration"
                        >
                          Vēlamais projekta ilgums*
                        </label>
                        <select
                          id="estimated_duration"
                          name="estimated_duration"
                          value={formData.estimated_duration || "1_3"} // Add fallback default value
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              estimated_duration: e.target.value as
                                | "1_3"
                                | "3_6"
                                | "6_9",
                            })
                          }
                          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#EEC71B] focus:border-transparent transition-colors duration-200
                            ${
                              formErrors.estimated_duration
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          required
                        >
                          <option value="1_3">1-3 mēneši</option>
                          <option value="3_6">3-6 mēneši</option>
                          <option value="6_9">6-9 mēneši</option>
                        </select>
                        {formErrors.estimated_duration && (
                          <p className="mt-1 text-sm text-red-600">
                            {formErrors.estimated_duration}
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
                          value={formData.project_description || ""} // Add fallback empty string
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
                          placeholder="Aprakstiet savu projekta ideju, galvenās funkcijas un specifiskās prasības..."
                          required
                        ></textarea>
                        {formErrors.project_description && (
                          <p className="mt-1 text-sm text-red-600">
                            {formErrors.project_description}
                          </p>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="payment_plan_interest"
                            name="payment_plan_interest"
                            checked={formData.payment_plan_interest}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                payment_plan_interest: e.target.checked,
                              })
                            }
                            className="h-4 w-4 text-[#EEC71B] rounded border-gray-300 focus:ring-[#EEC71B]"
                          />
                          <label
                            htmlFor="payment_plan_interest"
                            className="text-sm text-gray-700"
                          >
                            Esmu ieinteresēts(-a) dalītajos maksājumos
                          </label>
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="has_existing_system"
                            name="has_existing_system"
                            checked={formData.has_existing_system}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                has_existing_system: e.target.checked,
                              })
                            }
                            className="h-4 w-4 text-[#EEC71B] rounded border-gray-300 focus:ring-[#EEC71B]"
                          />
                          <label
                            htmlFor="has_existing_system"
                            className="text-sm text-gray-700"
                          >
                            Mums ir esoša sistēma, kuru vēlamies
                            pārveidot/uzlabot
                          </label>
                        </div>
                      </div>

                      <div>
                        <label
                          className="block text-sm font-medium text-gray-700 mb-1"
                          htmlFor="preferred_start_date"
                        >
                          Vēlamais projekta sākuma datums
                        </label>
                        <input
                          type="date"
                          id="preferred_start_date"
                          name="preferred_start_date"
                          value={formData.preferred_start_date || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              preferred_start_date: e.target.value,
                            })
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EEC71B] focus:border-transparent transition-colors duration-200"
                        />
                      </div>

                      <div className="bg-gray-50 p-6 -mx-6 mt-6 flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                          <p className="font-medium">Izvēlētā pakete:</p>
                          <p className="text-gray-900">
                            {selectedPackage.name} - €{selectedPackage.price}
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
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      <Footer />

      <script
        id="schema-script"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            mainEntity: {
              "@type": "SoftwareApplication",
              name: "WebWorks SAAS Development",
              applicationCategory: "WebApplication",
              operatingSystem: "Cloud, Web-based",
              offers: {
                "@type": "AggregateOffer",
                priceCurrency: "EUR",
                lowPrice: 1299,
                highPrice: 4999,
                offerCount: packages.length,
                offers: packages.map((pkg) => ({
                  "@type": "Offer",
                  name: pkg.name,
                  description: pkg.description,
                  price: pkg.price,
                  priceCurrency: "EUR",
                  validFrom: "2024-01-01",
                  priceValidUntil: "2024-12-31",
                })),
              },
              provider: {
                "@type": "Organization",
                name: "WebWorks",
                url: "https://www.webworks.lv",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Kungu Iela 23/8",
                  addressLocality: "Jelgava",
                  postalCode: "LV-3001",
                  addressCountry: "LV",
                },
              },
              review: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "42",
                bestRating: "5",
                worstRating: "1",
              },
              featureList: [
                "Microservices Architecture",
                "Cloud Native Development",
                "Kubernetes Deployment",
                "API Development",
                "DevOps Integration",
                "Enterprise Security",
                "Multi-tenant Architecture",
                "Scalable Infrastructure",
              ],
              screenshot:
                "https://www.webworks.lv/images/webapp-demo-screenshot.jpg",
              softwareHelp: "https://www.webworks.lv/support",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "42",
              },
              audience: {
                "@type": "BusinessAudience",
                audienceType: "Enterprise Business",
              },
              potentialAction: {
                "@type": "ViewAction",
                target:
                  "https://www.webworks.lv/pakalpojumi/web-aplikacijas#contact",
              },
            },
            isPartOf: {
              "@type": "WebSite",
              url: "https://www.webworks.lv",
              name: "WebWorks",
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
                      "https://www.webworks.lv/pakalpojumi/web-aplikacijas",
                    name: "Web Aplikācijas",
                  },
                },
              ],
            },
            specialty: [
              "SAAS Development",
              "Enterprise Software",
              "Cloud Solutions",
            ],
            keywords: [
              "web aplikācijas",
              "SAAS izstrāde",
              "enterprise software",
              "cloud native",
              "microservices",
              "kubernetes",
              "DevOps",
            ],
          }),
        }}
      />
    </>
  );
};

export default WebAppDevelopment;
