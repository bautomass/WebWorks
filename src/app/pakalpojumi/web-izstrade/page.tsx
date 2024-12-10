"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiMonitor,
  FiSmartphone,
  FiLayout,
  FiCode,
  FiZap,
  FiLock,
  FiSearch,
  FiTrendingUp,
  FiPackage,
  FiCheckCircle,
  FiShoppingCart,
  FiGlobe,
  FiGift,
  FiX,
  FiArrowRight,
  FiStar,
} from "react-icons/fi";
import { supabase } from "../../../utils/supabase";
import Header from "@/components/Header";
import Footer from "@/components/footer";
import Script from "next/script";

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
}

const packages: Package[] = [
  {
    id: "startup",
    name: "Startup Vision",
    tagline: "Ideāls sākums jūsu digitālajam ceļojumam",
    price: "199",
    features: [
      "Moderna vienas lapas vietne",
      "Mobilajām ierīcēm pielāgots dizains",
      "Bāzes SEO optimizācija",
      "Kontaktforma",
      "Google Analytics integrācija",
      "14 dienu atbalsts",
      "SSL sertifikāts",
      "Hostings uz 6 mēnešiem",
    ],
    description:
      "Ideāls risinājums maziem uzņēmumiem vai individuāliem projektiem.",
    detailedDescription:
      "Startup Vision pakete ir perfekts sākums jūsu digitālajam ceļojumam. Šis risinājums ietver modernu vienas lapas mājaslapu ar visām pamata funkcijām, kas nepieciešamas, lai efektīvi prezentētu savu biznesu tiešsaistē.",
    icon: <FiPackage className="text-3xl" />,
    color: "#4CAF50",
  },
  {
    id: "growth",
    name: "Growth Catalyst",
    tagline: "Populārākā izvēle augošiem uzņēmumiem",
    price: "499",
    features: [
      "Līdz 5 lapām",
      "Pielāgots responsīvs dizains",
      "Padziļināta SEO optimizācija",
      "Blogs vai jaunumu sadaļa",
      "Pilna CMS sistēma",
      "Sociālo mediju integrācija",
      "30 dienu atbalsts",
      "Premium SSL sertifikāts",
      "Hostings uz 12 mēnešiem",
    ],
    highlightFeatures: [
      "Pilna CMS sistēma",
      "Sociālo mediju integrācija",
      "Premium SSL sertifikāts",
    ],
    description:
      "Optimāls risinājums biznesiem, kas vēlas aktīvi augt digitālajā vidē.",
    detailedDescription:
      "Growth Catalyst pakete nodrošina visus nepieciešamos rīkus jūsu biznesa izaugsmei. Ar pielāgotu dizainu, padziļinātu SEO optimizāciju un pilnu CMS sistēmu, jūsu bizness būs gatavs nākamajai attīstības fāzei.",
    icon: <FiTrendingUp className="text-3xl" />,
    color: "#2196F3",
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise Edge",
    tagline: "Visaptverošs e-komercijas risinājums",
    price: "1299",
    features: [
      "Līdz 10 lapām",
      "E-komercijas funkcionalitāte",
      "Uzlabota CMS sistēma",
      "Maksājumu sistēmu integrācija",
      "Daudzvalodu atbalsts",
      "90 dienu atbalsts",
      "Premium hostings",
      "Pilna SEO optimizācija",
    ],
    description:
      "Premium risinājums uzņēmumiem ar augstām prasībām un specifiskām vajadzībām.",
    detailedDescription:
      "Enterprise Edge ir premium līmeņa risinājums, kas apvieno modernākās tehnoloģijas ar izcilu lietotāja pieredzi. Ideāls uzņēmumiem, kas vēlas dominēt e-komercijas tirgū.",
    icon: <FiGlobe className="text-3xl" />,
    color: "#9C27B0",
  },
  {
    id: "custom",
    name: "Limitless Custom",
    tagline: "Unikāls risinājums tieši jūsu vajadzībām",
    price: "Pēc pieprasījuma",
    features: [
      "Pilnībā pielāgots risinājums",
      "Neierobežots funkciju skaits",
      "Enterprise CMS risinājums",
      "Custom API izstrāde",
      "Sistēmu integrācijas",
      "24/7 premium atbalsts",
      "Dedicated projektu vadītājs",
      "Performance optimizācija",
    ],
    description:
      "Individuāls risinājums ar neierobežotām iespējām un pilnu pielāgošanu.",
    detailedDescription:
      "Limitless Custom ir paredzēts uzņēmumiem ar specifiskām vajadzībām. Mēs izstrādāsim risinājumu, kas precīzi atbilst jūsu biznesa procesiem un mērķiem.",
    icon: <FiCode className="text-3xl" />,
    color: "#607D8B",
  },
];

const initialFormData: FormData = {
  name: "",
  email: "",
  message: "",
  phone: "",
  company: "",
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

const WebIzstrade: React.FC = () => {
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
        .from("web_development_inquiries")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            phone: formData.phone,
            company: formData.company,
            selected_package: selectedPackage?.name,
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

  const SpecialOffer = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-[#3D3B4A] to-[#2D2B3A] rounded-2xl shadow-2xl overflow-hidden mb-16"
    >
      <div className="relative p-8 md:p-12">
        <div className="absolute top-0 right-0 opacity-10">
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            className="transform rotate-12"
          >
            <path
              d="M50,0 L150,0 L200,50 L200,150 L150,200 L50,200 L0,150 L0,50 Z"
              fill="white"
            />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <div className="inline-block bg-[#EEC71B] text-[#3D3B4A] px-4 py-1 rounded-full text-sm font-bold mb-4">
              🎯 Limited Time Offer
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Izvēlies Growth Catalyst Paketi Tagad
            </h2>
            <ul className="space-y-4 mb-6">
              <li className="flex items-center text-white">
                <div className="bg-[#EEC71B] rounded-full p-1 mr-3">
                  <FiCheckCircle className="text-[#3D3B4A]" />
                </div>
                <span>Bezmaksas UX/UI konsultācija (€200 vērtībā)</span>
              </li>
              <li className="flex items-center text-white">
                <div className="bg-[#EEC71B] rounded-full p-1 mr-3">
                  <FiCheckCircle className="text-[#3D3B4A]" />
                </div>
                <span>Google Ads kampaņas iestatīšana (€150 vērtībā)</span>
              </li>
              <li className="flex items-center text-white">
                <div className="bg-[#EEC71B] rounded-full p-1 mr-3">
                  <FiCheckCircle className="text-[#3D3B4A]" />
                </div>
                <span>1 mēneša SEO optimizācija (€250 vērtībā)</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="text-[#EEC71B] text-lg font-bold mb-2">
              Papildus Vērtība
            </div>
            <div className="text-5xl font-bold text-white mb-4">€600</div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openModal(packages[1])}
              className="bg-[#EEC71B] text-[#3D3B4A] px-8 py-4 rounded-full font-bold hover:bg-[#ffd700] transition-colors duration-300 flex items-center shadow-xl"
            >
              Saņemt Piedāvājumu
              <FiArrowRight className="ml-2" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );

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
            {pkg.price === "Pēc pieprasījuma" ? (
              pkg.price
            ) : (
              <>
                €{pkg.price}
                <span className="text-lg font-normal">/projekts</span>
              </>
            )}
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

  const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqItems = [
      {
        question: "Cik ilgi aizņem mājaslapas izstrāde?",
        answer: (
          <div className="space-y-3">
            <p className="text-gray-600">
              Izstrādes laiks ir atkarīgs no izvēlētās paketes un projekta
              sarežģītības. Mēs strādājam efektīvi, lai nodrošinātu ātrāko
              iespējamo piegādi, saglabājot augstu kvalitāti:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="font-medium text-[#2196F3]">Startup Vision</div>
                <div className="text-gray-600">2-3 nedēļas</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="font-medium text-[#2196F3]">
                  Growth Catalyst
                </div>
                <div className="text-gray-600">3-5 nedēļas</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="font-medium text-[#2196F3]">
                  Enterprise Edge
                </div>
                <div className="text-gray-600">6-8 nedēļas</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="font-medium text-[#2196F3]">Custom</div>
                <div className="text-gray-600">Pēc projekta specifikācijas</div>
              </div>
            </div>
          </div>
        ),
      },
      {
        question: "Vai es varēšu pats administrēt saturu?",
        answer: (
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="font-medium">Growth Catalyst un augstāk</p>
              <p className="text-gray-600">
                Iekļauta pilnvērtīga CMS sistēma ar visām nepieciešamajām
                funkcijām satura pārvaldībai
              </p>
            </div>
            <div className="bg-gray-50 border-l-4 border-gray-300 p-4">
              <p className="font-medium">Startup Vision</p>
              <p className="text-gray-600">
                Satura atjaunināšana tiek nodrošināta caur mūsu atbalsta servisu
              </p>
            </div>
            <p className="text-gray-600 mt-2">
              CMS sistēma ir veidota lietotājam draudzīga, ar intuitīvu
              interfeisu, kas neprasa tehniskas zināšanas.
            </p>
          </div>
        ),
      },
      {
        question: "Vai mājaslapa būs mobilajām ierīcēm draudzīga?",
        answer: (
          <div className="space-y-3">
            <p className="text-gray-600">
              Visas mūsu izstrādātās mājaslapas ir pilnībā responsīvas un
              optimizētas visu izmēru ierīcēm:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-center text-gray-600">
                <FiCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                Testēšana uz dažādām ierīcēm (viedtālruņi, planšetes, datori)
              </li>
              <li className="flex items-center text-gray-600">
                <FiCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                Pārbaude visos populārākajos pārlūkos
              </li>
              <li className="flex items-center text-gray-600">
                <FiCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                Ātruma optimizācija mobilajām ierīcēm
              </li>
            </ul>
          </div>
        ),
      },
      {
        question: "Kāds atbalsts tiek nodrošināts pēc izstrādes?",
        answer: (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Startup Vision",
                  duration: "14 dienas",
                  color: "green",
                },
                {
                  title: "Growth Catalyst",
                  duration: "30 dienas",
                  color: "blue",
                },
                {
                  title: "Enterprise Edge",
                  duration: "90 dienas",
                  color: "purple",
                },
                {
                  title: "Custom",
                  duration: "24/7 premium",
                  color: "gray",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className={`bg-${item.color}-50 p-4 rounded-lg border-l-4 border-${item.color}-500`}
                >
                  <div className="font-medium">{item.title}</div>
                  <div className="text-gray-600">{item.duration}</div>
                </div>
              ))}
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="font-medium text-yellow-800">
                Pēc atbalsta perioda
              </p>
              <p className="text-gray-600">
                Piedāvājam elastīgus uzturēšanas plānus, kas var iekļaut:
              </p>
              <ul className="mt-2 space-y-1">
                <li className="flex items-center text-gray-600">
                  <FiCheckCircle className="text-yellow-500 mr-2 flex-shrink-0" />
                  Regulārus drošības atjauninājumus
                </li>
                <li className="flex items-center text-gray-600">
                  <FiCheckCircle className="text-yellow-500 mr-2 flex-shrink-0" />
                  Satura atjaunināšanu
                </li>
                <li className="flex items-center text-gray-600">
                  <FiCheckCircle className="text-yellow-500 mr-2 flex-shrink-0" />
                  Tehnisko atbalstu
                </li>
              </ul>
            </div>
          </div>
        ),
      },
    ];

    return (
      <section className="mb-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-[#3D3B4A] to-[#2D2B3A] bg-clip-text text-transparent">
            Biežāk Uzdotie Jautājumi
          </span>
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={false}
              animate={{
                backgroundColor:
                  openIndex === index ? "rgb(249, 250, 251)" : "white",
              }}
              className={`rounded-xl shadow-lg overflow-hidden ${
                openIndex === index
                  ? "ring-2 ring-[#EEC71B]"
                  : "hover:shadow-xl"
              }`}
            >
              <motion.button
                className="w-full px-6 py-4 flex items-center justify-between text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-lg text-[#3D3B4A]">
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 ml-4"
                >
                  <FiArrowRight
                    className={`w-6 h-6 transform ${
                      openIndex === index
                        ? "rotate-90 text-[#EEC71B]"
                        : "text-gray-400"
                    }`}
                  />
                </motion.div>
              </motion.button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4">{item.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>
    );
  };

  return (
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
          <SpecialOffer />

          <section className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[#3D3B4A] mb-8">
              Inovatīva Web Izstrāde Jūsu Biznesam
            </h1>
            <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto">
              Mēs radām ne tikai mājaslapas, bet digitālās pieredzes, kas
              pārvērš apmeklētājus lojālos klientos.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </section>

          <FAQ />
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
                          {selectedPackage.price === "Pēc pieprasījuma"
                            ? selectedPackage.price
                            : `€${selectedPackage.price}`}
                        </p>
                        {selectedPackage.price !== "Pēc pieprasījuma" && (
                          <span className="text-lg opacity-75">
                            /projekts
                          </span>
                        )}
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
      </main>

      <Footer />

      <Script
        id="schema-script"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Web Izstrāde Latvijā | WebWorks",
            description:
              "WebWorks piedāvā profesionālu web izstrādi Latvijā. Radām SEO optimizētas, responsīvas un konversijām orientētas mājaslapas.",
            url: "https://www.webworks.lv/pakalpojumi/web-izstrade",
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
              lowPrice: "199",
              highPrice: "1299",
              offerCount: packages.length,
              offers: packages.map((pkg) => ({
                "@type": "Offer",
                name: pkg.name,
                description: pkg.description,
                price: pkg.price === "Pēc pieprasījuma" ? undefined : pkg.price,
                priceCurrency:
                  pkg.price === "Pēc pieprasījuma" ? undefined : "EUR",
                itemOffered: {
                  "@type": "Service",
                  name: pkg.name,
                  description: pkg.detailedDescription,
                  serviceType: "Web Development",
                  provider: {
                    "@type": "Organization",
                    name: "WebWorks",
                  },
                },
                deliveryTime: {
                  "@type": "QuantitativeValue",
                  minValue:
                    pkg.id === "startup"
                      ? "2"
                      : pkg.id === "growth"
                      ? "3"
                      : pkg.id === "enterprise"
                      ? "6"
                      : "8",
                  maxValue:
                    pkg.id === "startup"
                      ? "3"
                      : pkg.id === "growth"
                      ? "5"
                      : pkg.id === "enterprise"
                      ? "8"
                      : "12",
                  unitCode: "WK",
                },
                areaServed: {
                  "@type": "Country",
                  name: "Latvia",
                },
              })),
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://www.webworks.lv/pakalpojumi/web-izstrade",
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
                    "@id": "https://www.webworks.lv/pakalpojumi/web-izstrade",
                    name: "Web Izstrāde",
                  },
                },
              ],
            },
          }),
        }}
      />
    </div>
  );
};

export default WebIzstrade;
