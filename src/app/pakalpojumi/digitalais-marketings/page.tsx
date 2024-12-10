"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";
import {
  FiTarget,
  FiTrendingUp,
  FiMessageCircle,
  FiCheckCircle,
  FiX,
  FiArrowRight,
  FiCalendar,
  FiPercent,
  FiDollarSign,
} from "react-icons/fi";
import { supabase } from "../../../utils/supabase";
import Header from "@/components/Header";
import Footer from "@/components/footer";

interface Service {
  id: string;
  name: string;
  price: string;
  discount_3_months: number;
  discount_6_months: number;
  discount_12_months: number;
  features: string[];
  description: string;
  detailedDescription: string;
  icon: JSX.Element;
  color: string;
}

interface FormData {
  name: string;
  email: string;
  message: string;
  phone?: string;
  company?: string;
  selected_package?: string;
  preferred_duration?: "1" | "3" | "6" | "12";
  payment_plan_interest?: boolean;
}

const services: Service[] = [
  {
    id: "digital_strategy",
    name: "Digitālā Mārketinga Stratēģija",
    price: "399",
    discount_3_months: 10,
    discount_6_months: 15,
    discount_12_months: 20,
    features: [
      "Pilnīga tirgus analīze",
      "Mērķauditorijas izpēte",
      "Konkurentu analīze",
      "Kanālu stratēģijas izstrāde",
      "Mērķu un KPI noteikšana",
      "Ikmēneša optimizācija un atskaites",
      "Regulāras konsultācijas",
      "Prioritārs atbalsts",
    ],
    description:
      "Visaptveroša digitālā mārketinga stratēģija, kas palīdzēs jūsu uzņēmumam sasniegt konkrētus biznesa mērķus.",
    detailedDescription:
      "Mūsu Digitālā Mārketinga Stratēģijas pakalpojums ir ideāls risinājums uzņēmumiem, kas vēlas maksimāli izmantot digitālā mārketinga potenciālu. Mēs izstrādājam pielāgotu stratēģiju, kas balstīta uz rūpīgu tirgus analīzi un jūsu biznesa mērķiem.",
    icon: <FiTarget className="text-3xl" />,
    color: "#4CAF50",
  },
  {
    id: "soc_media_management",
    name: "Sociālo Mediju Pārvaldība",
    price: "599",
    discount_3_months: 10,
    discount_6_months: 15,
    discount_12_months: 20,
    features: [
      "Profilu optimizācija",
      "Satura plāna izstrāde",
      "Regulāra satura publicēšana (12x mēnesī)",
      "Kopienas pārvaldība",
      "Reklāmu pārvaldība",
      "Konkurentu monitorings",
      "Ikmēneša atskaites un analīze",
      "Pastāvīga optimizācija",
    ],
    description:
      "Pilna sociālo mediju pārvaldība, kas palielinās jūsu zīmola atpazīstamību un iesaisti.",
    detailedDescription:
      "Mūsu Sociālo Mediju Pārvaldības pakalpojums nodrošina pilnu jūsu sociālo mediju kontu pārvaldību. Mēs rūpējamies par regulāru, kvalitatīvu saturu un aktīvu komunikāciju ar jūsu sekotājiem.",
    icon: <FiMessageCircle className="text-3xl" />,
    color: "#2196F3",
  },
  {
    id: "all_in_one",
    name: "All-in-One Digitālais Mārketings",
    price: "999",
    discount_3_months: 15,
    discount_6_months: 20,
    discount_12_months: 25,
    features: [
      "Digitālā mārketinga stratēģija",
      "Sociālo mediju pārvaldība",
      "SEO optimizācija",
      "Google Ads pārvaldība",
      "Facebook/Instagram Ads pārvaldība",
      "E-pasta mārketings",
      "Mēneša atskaites un analīze",
      "Prioritārs 24/7 atbalsts",
      "Regulāras stratēģiskās sesijas",
    ],
    description:
      "Visaptverošs digitālā mārketinga risinājums, kas apvieno visus mūsu pakalpojumus vienā integrētā stratēģijā.",
    detailedDescription:
      "All-in-One Digitālā Mārketinga pakalpojums ir mūsu visaptverošākais risinājums, kas apvieno visus digitālā mārketinga kanālus vienotā stratēģijā. Ideāls uzņēmumiem, kas vēlas maksimālu rezultātu un pilnu digitālā mārketinga pārvaldību.",
    icon: <FiTrendingUp className="text-3xl" />,
    color: "#9C27B0",
  },
];

const initialFormData: FormData = {
  name: "",
  email: "",
  message: "",
  phone: "",
  company: "",
  selected_package: "",
  preferred_duration: "1",
  payment_plan_interest: false,
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

const digitalMarketingSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  mainEntity: {
    "@type": "ProfessionalService",
    name: "WebWorks Digital Marketing",
    image: "https://www.webworks.lv/images/digital-marketing-og.jpg",
    "@id": "https://www.webworks.lv/pakalpojumi/digitalais-marketings",
    url: "https://www.webworks.lv/pakalpojumi/digitalais-marketings",
    telephone: "+37126282630",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kungu Iela 23/8",
      addressLocality: "Jelgava",
      postalCode: "LV-3001",
      addressCountry: "LV",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: 399,
      highPrice: 999,
      offerCount: 3,
    },
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
          "@id": "https://www.webworks.lv/pakalpojumi/digitalais-marketings",
          name: "Digitālais Mārketings",
        },
      },
    ],
  },
};

const DigitalaisMarketings: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
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

    if (!formData.preferred_duration) {
      errors.preferred_duration =
        "Lūdzu izvēlieties vēlamo pakalpojuma termiņu";
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
        .from("digital_marketing_inquiries")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            phone: formData.phone,
            company: formData.company,
            selected_package: selectedService?.id,
            preferred_duration: formData.preferred_duration,
            payment_plan_interest: formData.payment_plan_interest,
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

  const calculateDiscountedPrice = (
    basePrice: number,
    months: number,
    discount: number
  ) => {
    const discountedPrice = basePrice * (1 - discount / 100);
    return Math.round(discountedPrice);
  };

  const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
    const basePrice = parseInt(service.price);

    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col h-full">
        <div
          className="p-6 text-white relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${
              service.color
            } 0%, ${adjustColor(service.color, -30)} 100%)`,
          }}
        >
          <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-white bg-opacity-20 rounded-full p-8 transform rotate-12">
            <motion.div
              className="text-5xl"
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              {service.icon}
            </motion.div>
          </div>
          <h3 className="text-2xl font-bold mb-2 relative z-10">
            {service.name}
          </h3>
          <div className="relative z-10">
            <p className="text-4xl font-bold">€{service.price}</p>
            <p className="text-sm opacity-75">mēnesī</p>
          </div>
          <div className="mt-2 space-y-1 text-sm opacity-90">
            <div className="flex items-center gap-2">
              <FiCalendar />
              <span>
                3 mēneši: €
                {calculateDiscountedPrice(
                  basePrice,
                  3,
                  service.discount_3_months
                )}
                /mēn
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FiCalendar />
              <span>
                6 mēneši: €
                {calculateDiscountedPrice(
                  basePrice,
                  6,
                  service.discount_6_months
                )}
                /mēn
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FiCalendar />
              <span>
                12 mēneši: €
                {calculateDiscountedPrice(
                  basePrice,
                  12,
                  service.discount_12_months
                )}
                /mēn
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 flex-grow flex flex-col">
          <p className="text-gray-700 mb-4">{service.description}</p>
          <ul className="space-y-3 mb-6 flex-grow">
            {service.features.map((feature, i) => (
              <li key={i} className="flex items-center">
                <FiCheckCircle className="text-[#EEC71B] mr-2 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto">
            <div className="text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <FiPercent className="text-[#EEC71B]" />
                <span>Pieejamas atlaides garākiem termiņiem</span>
              </div>
              <div className="flex items-center gap-2">
                <FiDollarSign className="text-[#EEC71B]" />
                <span>Iespējami dalītie maksājumi</span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#EEC71B] text-[#3D3B4A] px-6 py-3 rounded-lg font-bold flex items-center justify-center hover:bg-[#ffd700] transition-colors duration-300"
              onClick={() => {
                setSelectedService(service);
                setShowModal(true);
              }}
            >
              Pieteikties
              <FiArrowRight className="ml-2" />
            </motion.button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
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
                Digitālais Mārketings, kas Virza Jūsu Biznesu uz Priekšu
              </h1>
              <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto">
                Atklājiet sava uzņēmuma potenciālu ar mūsu ekspertu digitālā
                mārketinga pakalpojumiem. Mēs palīdzēsim jums sasniegt jaunas
                virsotnes tiešsaistē un palielināt peļņu.
              </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
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
                      Meklējat Individuālu Risinājumu?
                    </h2>
                    <p className="text-gray-300 text-lg mb-8">
                      Mēs piedāvājam arī pielāgotus digitālā mārketinga
                      risinājumus, kas atbilst tieši jūsu biznesa vajadzībām un
                      mērķiem. Sazinieties ar mums, lai apspriestu jūsu unikālo
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
          </div>

          <AnimatePresence>
            {showModal && (
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
                  {selectedService && (
                    <div>
                      <div
                        className="p-8 text-white relative overflow-hidden"
                        style={{
                          background: `linear-gradient(135deg, ${
                            selectedService.color
                          } 0%, ${adjustColor(
                            selectedService.color,
                            -30
                          )} 100%)`,
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
                          {selectedService.name}
                        </h3>
                        <p className="text-xl opacity-90 mb-4">
                          Sākot no €{selectedService.price} mēnesī
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="bg-white bg-opacity-20 rounded-lg p-3">
                            <p className="font-bold">3 mēneši</p>
                            <p>
                              €
                              {calculateDiscountedPrice(
                                parseInt(selectedService.price),
                                3,
                                selectedService.discount_3_months
                              )}
                              /mēn
                            </p>
                            <p className="text-xs">
                              ({selectedService.discount_3_months}% atlaide)
                            </p>
                          </div>
                          <div className="bg-white bg-opacity-20 rounded-lg p-3">
                            <p className="font-bold">6 mēneši</p>
                            <p>
                              €
                              {calculateDiscountedPrice(
                                parseInt(selectedService.price),
                                6,
                                selectedService.discount_6_months
                              )}
                              /mēn
                            </p>
                            <p className="text-xs">
                              ({selectedService.discount_6_months}% atlaide)
                            </p>
                          </div>
                          <div className="bg-white bg-opacity-20 rounded-lg p-3">
                            <p className="font-bold">12 mēneši</p>
                            <p>
                              €
                              {calculateDiscountedPrice(
                                parseInt(selectedService.price),
                                12,
                                selectedService.discount_12_months
                              )}
                              /mēn
                            </p>
                            <p className="text-xs">
                              ({selectedService.discount_12_months}% atlaide)
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-8">
                        <div className="prose max-w-none mb-8">
                          <p className="text-gray-700 text-lg leading-relaxed">
                            {selectedService.detailedDescription}
                          </p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6 mb-8">
                          <h4 className="font-bold text-xl mb-4 text-[#3D3B4A]">
                            Iekļautie pakalpojumi:
                          </h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {selectedService.features.map((feature, index) => (
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
                              htmlFor="preferred_duration"
                            >
                              Vēlamais pakalpojuma termiņš*
                            </label>
                            <select
                              id="preferred_duration"
                              name="preferred_duration"
                              value={formData.preferred_duration}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  preferred_duration: e.target.value as
                                    | "1"
                                    | "3"
                                    | "6"
                                    | "12",
                                })
                              }
                              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#EEC71B] focus:border-transparent transition-colors duration-200
                                ${
                                  formErrors.preferred_duration
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }`}
                              required
                            >
                              <option value="">Izvēlieties termiņu</option>
                              <option value="1">1 mēnesis</option>
                              <option value="3">
                                3 mēneši (-{selectedService.discount_3_months}%)
                              </option>
                              <option value="6">
                                6 mēneši (-{selectedService.discount_6_months}%)
                              </option>
                              <option value="12">
                                12 mēneši (-{selectedService.discount_12_months}
                                %)
                              </option>
                            </select>
                            {formErrors.preferred_duration && (
                              <p className="mt-1 text-sm text-red-600">
                                {formErrors.preferred_duration}
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
                              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#EEC71B] focus:border-transparent transition-colors duration-200
                              ${
                                formErrors.message
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                              required
                              placeholder="Pastāstiet vairāk par savām vajadzībām un mērķiem..."
                            ></textarea>
                            {formErrors.message && (
                              <p className="mt-1 text-sm text-red-600">
                                {formErrors.message}
                              </p>
                            )}
                          </div>

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

                          <div className="bg-gray-50 p-6 -mx-6 mt-6 flex justify-between items-center">
                            <div className="text-sm text-gray-600">
                              <p className="font-medium">Izvēlētā pakete:</p>
                              <p className="text-gray-900">
                                {selectedService.name}
                                {formData.preferred_duration && (
                                  <span className="ml-1">
                                    ({formData.preferred_duration}{" "}
                                    {formData.preferred_duration === "1"
                                      ? "mēnesis"
                                      : "mēneši"}
                                    )
                                  </span>
                                )}
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

      <Script
        id="digital-marketing-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(digitalMarketingSchema),
        }}
      />
    </>
  );
};

export default DigitalaisMarketings;
