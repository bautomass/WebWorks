"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSend,
  FiCoffee,
  FiSmile,
  FiHeart,
  FiCode,
  FiLayout,
  FiSmartphone,
  FiShoppingCart,
} from "react-icons/fi";
import Head from "next/head";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Header from "../../components/Header";
import { supabase } from '../lib/supabaseClient';

interface FormData {
  name: string;
  email: string;
  message: string;
  projectType: "website" | "app" | "ecommerce" | "other";
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  submit?: string;
}

interface SupabaseResponse {
  success: boolean;
  error?: string;
}

const sendToSupabase = async (data: FormData): Promise<SupabaseResponse> => {
  try {
    const { data: insertedData, error } = await supabase
      .from('contact_form')
      .insert([
        {
          name: data.name,
          email: data.email,
          message: data.message,
          project_type: data.projectType
        }
      ]);

    if (error) throw error;

    console.log('Data inserted:', insertedData);
    return { success: true };
  } catch (error) {
    console.error('Error inserting data:', error);
    return { success: false, error: error.message };
  }
};

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    projectType: "website",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value as string }));
  };

  const validateForm = (): FormErrors => {
    let errors: FormErrors = {};
    if (!formData.name.trim()) errors.name = "Vārds ir obligāts";
    if (!formData.email.trim()) errors.email = "E-pasts ir obligāts";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Nederīgs e-pasta formāts";
    if (!formData.message.trim()) errors.message = "Ziņojums ir obligāts";
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await sendToSupabase(formData);
      if (response.success) {
        setIsSubmitted(true);
      } else {
        throw new Error(response.error || 'Failed to send data');
      }
    } catch (error) {
      console.error("Failed to send data:", error);
      setErrors({
        submit: "Neizdevās nosūtīt datus. Lūdzu, mēģiniet vēlreik.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TooltipProvider>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-[#F3F5F4] to-[#E6E9E8]">
        <Head>
          <title>Sazinies ar Mums | WebWorks - Tavs Digitālais Partneris</title>
          <meta
            name="description"
            content="Esi daļa no mūsu stāsta. Sazinies ar WebWorks komandu, lai kopā radītu kaut ko īpašu digitālajā pasaulē."
          />
          <link rel="canonical" href="https://www.webworks.lv/kontakti" />
        </Head>
        <main className="container mx-auto px-4 py-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-center text-[#3D3B4A] mb-8"
          >
            Radīsim Digitālos Brīnumus Kopā
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-center text-gray-700 mb-12"
          >
            Tavs vēstījums ir pirmais solis mūsu kopīgajā ceļojumā. Ļauj mums to
            padarīt neaizmirstamu!
          </motion.p>

          <div className="flex flex-col lg:flex-row gap-12">
            <AnimatePresence>
              {!isSubmitted ? (
                <motion.form
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5 }}
                  onSubmit={handleSubmit}
                  className="bg-white shadow-2xl rounded-2xl p-8 flex-1"
                >
                  <div className="mb-6">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Tavs Vārds
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#8CB8B4] focus:border-[#8CB8B4]"
                      placeholder="Kā mēs varam Tevi uzrunāt?"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Tavs E-pasts
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#8CB8B4] focus:border-[#8CB8B4]"
                      placeholder="Kur mēs varam Tev atbildēt?"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="projectType"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Projekta Tips
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {(["website", "app", "ecommerce", "other"] as const).map(
                        (type) => (
                          <motion.button
                            key={type}
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                projectType: type,
                              }))
                            }
                            className={`p-4 rounded-lg border ${
                              formData.projectType === type
                                ? "border-[#8CB8B4] bg-[#8CB8B4] text-white"
                                : "border-gray-300 hover:border-[#8CB8B4]"
                            } transition-colors duration-300`}
                          >
                            {type === "website" && (
                              <FiLayout className="inline-block mr-2" />
                            )}
                            {type === "app" && (
                              <FiSmartphone className="inline-block mr-2" />
                            )}
                            {type === "ecommerce" && (
                              <FiShoppingCart className="inline-block mr-2" />
                            )}
                            {type === "other" && (
                              <FiCode className="inline-block mr-2" />
                            )}
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </motion.button>
                        )
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Tava Ziņa
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#8CB8B4] focus:border-[#8CB8B4]"
                      placeholder="Pastāsti mums par savu sapni..."
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#EEC71B] text-[#3D3B4A] py-3 px-4 rounded-full font-bold text-lg hover:bg-[#3D3B4A] hover:text-white transition-colors duration-300 flex items-center justify-center"
                  >
                    {isSubmitting ? "Sūtam..." : "Sūtīt Ziņu"}{" "}
                    <FiSend className="ml-2" />
                  </motion.button>

                  {errors.submit && (
                    <p className="mt-2 text-sm text-red-600">{errors.submit}</p>
                  )}
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white shadow-2xl rounded-2xl p-8 text-center flex-1"
                >
                  <FiSmile className="text-6xl text-[#EEC71B] mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-[#3D3B4A] mb-4">
                    Paldies par Tavu ziņu, {formData.name}!
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Mēs esam saņēmuši Tavu vēstuli un nevaram sagaidīt, kad
                    sāksim veidot kaut ko brīnišķīgu kopā. Mēs sazināsimies ar
                    Tevi tuvākajā laikā uz {formData.email}.
                  </p>
                  <motion.div
                    className="inline-block"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a
                      href="/"
                      className="bg-[#EEC71B] text-[#3D3B4A] py-2 px-4 rounded-full font-bold hover:bg-[#3D3B4A] hover:text-white transition-colors duration-300"
                    >
                      Atgriezties Sākumlapā
                    </a>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-[#3D3B4A] text-white rounded-2xl p-8 shadow-2xl"
              >
                <h2 className="text-2xl font-bold mb-4">
                  Kāpēc Izvēlēties WebWorks?
                </h2>
                <ul className="space-y-4">
                  {[
                    { icon: <FiCode />, text: "Inovatīvas tehnoloģijas" },
                    { icon: <FiHeart />, text: "Personalizēta pieeja" },
                    { icon: <FiCoffee />, text: "Radoši risinājumi" },
                    { icon: <FiSmile />, text: "Apmierināti klienti" },
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    >
                      <span className="text-[#EEC71B] mr-2">{item.icon}</span>
                      {item.text}
                    </motion.li>
                  ))}
))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-8 bg-white rounded-2xl p-8 shadow-2xl"
              >
                <h2 className="text-2xl font-bold mb-4 text-[#3D3B4A]">
                  Mūsu Kontaktinformācija
                </h2>
                <p className="mb-2">
                  <strong>Adrese:</strong> Brīvības iela 123, Rīga, LV-1010
                </p>
                <p className="mb-2">
                  <strong>E-pasts:</strong> info@webworks.lv
                </p>
                <p className="mb-2">
                  <strong>Tālrunis:</strong> +371 12345678
                </p>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
};

export default ContactUs;














// "use client";

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiSend,
//   FiCoffee,
//   FiSmile,
//   FiHeart,
//   FiCode,
//   FiLayout,
//   FiSmartphone,
//   FiShoppingCart,
// } from "react-icons/fi";
// import Head from "next/head";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import Header from "../../components/Header";
// import { supabase } from "../../lib/supabaseClient";

// interface FormData {
//   name: string;
//   email: string;
//   message: string;
//   projectType: "website" | "app" | "ecommerce" | "other";
// }

// interface FormErrors {
//   name?: string;
//   email?: string;
//   message?: string;
//   submit?: string;
// }

// interface SupabaseResponse {
//   success: boolean;
//   error?: string;
// }

// const sendToSupabase = async (data: FormData): Promise<SupabaseResponse> => {
//   try {
//     const { data: insertedData, error } = await supabase
//       .from("contact_form")
//       .insert([
//         {
//           name: data.name,
//           email: data.email,
//           message: data.message,
//           project_type: data.projectType,
//         },
//       ]);

//     if (error) throw error;

//     console.log("Data inserted:", insertedData);
//     return { success: true };
//   } catch (error) {
//     console.error("Error inserting data:", error);
//     return { success: false, error: error.message };
//   }
// };

// const ContactUs: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     email: "",
//     message: "",
//     projectType: "website",
//   });
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
//   const [errors, setErrors] = useState<FormErrors>({});

//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value as string }));
//   };

//   const validateForm = (): FormErrors => {
//     let errors: FormErrors = {};
//     if (!formData.name.trim()) errors.name = "Vārds ir obligāts";
//     if (!formData.email.trim()) errors.email = "E-pasts ir obligāts";
//     else if (!/\S+@\S+\.\S+/.test(formData.email))
//       errors.email = "Nederīgs e-pasta formāts";
//     if (!formData.message.trim()) errors.message = "Ziņojums ir obligāts";
//     return errors;
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formErrors = validateForm();
//     if (Object.keys(formErrors).length > 0) {
//       setErrors(formErrors);
//       return;
//     }
//     setIsSubmitting(true);
//     try {
//       const response = await sendToSupabase(formData);
//       if (response.success) {
//         setIsSubmitted(true);
//       } else {
//         throw new Error(response.error || "Failed to send data");
//       }
//     } catch (error) {
//       console.error("Failed to send data:", error);
//       setErrors({
//         submit: "Neizdevās nosūtīt datus. Lūdzu, mēģiniet vēlreik.",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <TooltipProvider>
//       <Header />
//       <div className="min-h-screen bg-gradient-to-br from-[#F3F5F4] to-[#E6E9E8]">
//         <Head>
//           <title>Sazinies ar Mums | WebWorks - Tavs Digitālais Partneris</title>
//           <meta
//             name="description"
//             content="Esi daļa no mūsu stāsta. Sazinies ar WebWorks komandu, lai kopā radītu kaut ko īpašu digitālajā pasaulē."
//           />
//           <link rel="canonical" href="https://www.webworks.lv/kontakti" />
//         </Head>
//         <main className="container mx-auto px-4 py-16">
//           <motion.h1
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="text-4xl md:text-5xl font-bold text-center text-[#3D3B4A] mb-8"
//           >
//             Radīsim Digitālos Brīnumus Kopā
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="text-xl text-center text-gray-700 mb-12"
//           >
//             Tavs vēstījums ir pirmais solis mūsu kopīgajā ceļojumā. Ļauj mums to
//             padarīt neaizmirstamu!
//           </motion.p>

//           <div className="flex flex-col lg:flex-row gap-12">
//             <AnimatePresence>
//               {!isSubmitted ? (
//                 <motion.form
//                   initial={{ opacity: 0, x: -50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 50 }}
//                   transition={{ duration: 0.5 }}
//                   onSubmit={handleSubmit}
//                   className="bg-white shadow-2xl rounded-2xl p-8 flex-1"
//                 >
//                   <div className="mb-6">
//                     <label
//                       htmlFor="name"
//                       className="block text-sm font-medium text-gray-700 mb-2"
//                     >
//                       Tavs Vārds
//                     </label>
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#8CB8B4] focus:border-[#8CB8B4]"
//                       placeholder="Kā mēs varam Tevi uzrunāt?"
//                     />
//                     {errors.name && (
//                       <p className="mt-1 text-sm text-red-600">{errors.name}</p>
//                     )}
//                   </div>

//                   <div className="mb-6">
//                     <label
//                       htmlFor="email"
//                       className="block text-sm font-medium text-gray-700 mb-2"
//                     >
//                       Tavs E-pasts
//                     </label>
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#8CB8B4] focus:border-[#8CB8B4]"
//                       placeholder="Kur mēs varam Tev atbildēt?"
//                     />
//                     {errors.email && (
//                       <p className="mt-1 text-sm text-red-600">
//                         {errors.email}
//                       </p>
//                     )}
//                   </div>

//                   <div className="mb-6">
//                     <label
//                       htmlFor="projectType"
//                       className="block text-sm font-medium text-gray-700 mb-2"
//                     >
//                       Projekta Tips
//                     </label>
//                     <div className="grid grid-cols-2 gap-4">
//                       {(["website", "app", "ecommerce", "other"] as const).map(
//                         (type) => (
//                           <motion.button
//                             key={type}
//                             type="button"
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={() =>
//                               setFormData((prev) => ({
//                                 ...prev,
//                                 projectType: type,
//                               }))
//                             }
//                             className={`p-4 rounded-lg border ${
//                               formData.projectType === type
//                                 ? "border-[#8CB8B4] bg-[#8CB8B4] text-white"
//                                 : "border-gray-300 hover:border-[#8CB8B4]"
//                             } transition-colors duration-300`}
//                           >
//                             {type === "website" && (
//                               <FiLayout className="inline-block mr-2" />
//                             )}
//                             {type === "app" && (
//                               <FiSmartphone className="inline-block mr-2" />
//                             )}
//                             {type === "ecommerce" && (
//                               <FiShoppingCart className="inline-block mr-2" />
//                             )}
//                             {type === "other" && (
//                               <FiCode className="inline-block mr-2" />
//                             )}
//                             {type.charAt(0).toUpperCase() + type.slice(1)}
//                           </motion.button>
//                         )
//                       )}
//                     </div>
//                   </div>

//                   <div className="mb-6">
//                     <label
//                       htmlFor="message"
//                       className="block text-sm font-medium text-gray-700 mb-2"
//                     >
//                       Tava Ziņa
//                     </label>
//                     <textarea
//                       id="message"
//                       name="message"
//                       value={formData.message}
//                       onChange={handleInputChange}
//                       rows={4}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#8CB8B4] focus:border-[#8CB8B4]"
//                       placeholder="Pastāsti mums par savu sapni..."
//                     ></textarea>
//                     {errors.message && (
//                       <p className="mt-1 text-sm text-red-600">
//                         {errors.message}
//                       </p>
//                     )}
//                   </div>

//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="w-full bg-[#EEC71B] text-[#3D3B4A] py-3 px-4 rounded-full font-bold text-lg hover:bg-[#3D3B4A] hover:text-white transition-colors duration-300 flex items-center justify-center"
//                   >
//                     {isSubmitting ? "Sūtam..." : "Sūtīt Ziņu"}{" "}
//                     <FiSend className="ml-2" />
//                   </motion.button>

//                   {errors.submit && (
//                     <p className="mt-2 text-sm text-red-600">{errors.submit}</p>
//                   )}
//                 </motion.form>
//               ) : (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.5 }}
//                   className="bg-white shadow-2xl rounded-2xl p-8 text-center flex-1"
//                 >
//                   <FiSmile className="text-6xl text-[#EEC71B] mx-auto mb-4" />
//                   <h2 className="text-2xl font-bold text-[#3D3B4A] mb-4">
//                     Paldies par Tavu ziņu, {formData.name}!
//                   </h2>
//                   <p className="text-gray-700 mb-4">
//                     Mēs esam saņēmuši Tavu vēstuli un nevaram sagaidīt, kad
//                     sāksim veidot kaut ko brīnišķīgu kopā. Mēs sazināsimies ar
//                     Tevi tuvākajā laikā uz {formData.email}.
//                   </p>
//                   <motion.div
//                     className="inline-block"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <a
//                       href="/"
//                       className="bg-[#EEC71B] text-[#3D3B4A] py-2 px-4 rounded-full font-bold hover:bg-[#3D3B4A] hover:text-white transition-colors duration-300"
//                     >
//                       Atgriezties Sākumlapā
//                     </a>
//                   </motion.div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             <div className="flex-1">
//               <motion.div
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.3 }}
//                 className="bg-[#3D3B4A] text-white rounded-2xl p-8 shadow-2xl"
//               >
//                 <h2 className="text-2xl font-bold mb-4">
//                   Kāpēc Izvēlēties WebWorks?
//                 </h2>
//                 <ul className="space-y-4">
//                   {[
//                     { icon: <FiCode />, text: "Inovatīvas tehnoloģijas" },
//                     { icon: <FiHeart />, text: "Personalizēta pieeja" },
//                     { icon: <FiCoffee />, text: "Radoši risinājumi" },
//                     { icon: <FiSmile />, text: "Apmierināti klienti" },
//                   ].map((item, index) => (
//                     <motion.li
//                       key={index}
//                       className="flex items-center"
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
//                     >
//                       <span className="text-[#EEC71B] mr-2">{item.icon}</span>
//                       {item.text}
//                     </motion.li>
//                   ))}
//                 </ul>
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.6 }}
//                 className="mt-8 bg-white rounded-2xl p-8 shadow-2xl"
//               >
//                 <h2 className="text-2xl font-bold mb-4 text-[#3D3B4A]">
//                   Mūsu Kontaktinformācija
//                 </h2>
//                 <p className="mb-2">
//                   <strong>Adrese:</strong> Brīvības iela 123, Rīga, LV-1010
//                 </p>
//                 <p className="mb-2">
//                   <strong>E-pasts:</strong> info@webworks.lv
//                 </p>
//                 <p className="mb-2">
//                   <strong>Tālrunis:</strong> +371 12345678
//                 </p>
//               </motion.div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </TooltipProvider>
//   );
// };

// export default ContactUs;

// "use client";

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiSend,
//   FiCoffee,
//   FiSmile,
//   FiHeart,
//   FiCode,
//   FiLayout,
//   FiSmartphone,
//   FiShoppingCart,
// } from "react-icons/fi";
// import Head from "next/head";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import Header from "../../components/Header";

// interface FormData {
//   name: string;
//   email: string;
//   message: string;
//   projectType: "website" | "app" | "ecommerce" | "other";
// }

// interface FormErrors {
//   name?: string;
//   email?: string;
//   message?: string;
//   submit?: string;
// }

// interface EmailResponse {
//   success: boolean;
// }

// const sendEmail = async (data: FormData): Promise<EmailResponse> => {
//   // Simulated API call
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log("Email sent:", data);
//       resolve({ success: true });
//     }, 2000);
//   });
// };

// const ContactUs: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     email: "",
//     message: "",
//     projectType: "website",
//   });
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
//   const [errors, setErrors] = useState<FormErrors>({});

//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value as string }));
//   };

//   const validateForm = (): FormErrors => {
//     let errors: FormErrors = {};
//     if (!formData.name.trim()) errors.name = "Vārds ir obligāts";
//     if (!formData.email.trim()) errors.email = "E-pasts ir obligāts";
//     else if (!/\S+@\S+\.\S+/.test(formData.email))
//       errors.email = "Nederīgs e-pasta formāts";
//     if (!formData.message.trim()) errors.message = "Ziņojums ir obligāts";
//     return errors;
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formErrors = validateForm();
//     if (Object.keys(formErrors).length > 0) {
//       setErrors(formErrors);
//       return;
//     }
//     setIsSubmitting(true);
//     try {
//       await sendEmail(formData);
//       setIsSubmitted(true);
//     } catch (error) {
//       console.error("Failed to send email:", error);
//       setErrors({
//         submit: "Neizdevās nosūtīt e-pastu. Lūdzu, mēģiniet vēlreik.",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <TooltipProvider>
//       <Header />
//       <div className="min-h-screen bg-gradient-to-br from-[#F3F5F4] to-[#E6E9E8]">
//         <Head>
//           <title>Sazinies ar Mums | WebWorks - Tavs Digitālais Partneris</title>
//           <meta
//             name="description"
//             content="Esi daļa no mūsu stāsta. Sazinies ar WebWorks komandu, lai kopā radītu kaut ko īpašu digitālajā pasaulē."
//           />
//           <link rel="canonical" href="https://www.webworks.lv/kontakti" />
//         </Head>
//         <main className="container mx-auto px-4 py-16">
//           <motion.h1
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="text-4xl md:text-5xl font-bold text-center text-[#3D3B4A] mb-8"
//           >
//             Radīsim Digitālos Brīnumus Kopā
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="text-xl text-center text-gray-700 mb-12"
//           >
//             Tavs vēstījums ir pirmais solis mūsu kopīgajā ceļojumā. Ļauj mums to
//             padarīt neaizmirstamu!
//           </motion.p>

//           <div className="flex flex-col lg:flex-row gap-12">
//             <AnimatePresence>
//               {!isSubmitted ? (
//                 <motion.form
//                   initial={{ opacity: 0, x: -50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 50 }}
//                   transition={{ duration: 0.5 }}
//                   onSubmit={handleSubmit}
//                   className="bg-white shadow-2xl rounded-2xl p-8 flex-1"
//                 >
//                   <div className="mb-6">
//                     <label
//                       htmlFor="name"
//                       className="block text-sm font-medium text-gray-700 mb-2"
//                     >
//                       Tavs Vārds
//                     </label>
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#8CB8B4] focus:border-[#8CB8B4]"
//                       placeholder="Kā mēs varam Tevi uzrunāt?"
//                     />
//                     {errors.name && (
//                       <p className="mt-1 text-sm text-red-600">{errors.name}</p>
//                     )}
//                   </div>

//                   <div className="mb-6">
//                     <label
//                       htmlFor="email"
//                       className="block text-sm font-medium text-gray-700 mb-2"
//                     >
//                       Tavs E-pasts
//                     </label>
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#8CB8B4] focus:border-[#8CB8B4]"
//                       placeholder="Kur mēs varam Tev atbildēt?"
//                     />
//                     {errors.email && (
//                       <p className="mt-1 text-sm text-red-600">
//                         {errors.email}
//                       </p>
//                     )}
//                   </div>

//                   <div className="mb-6">
//                     <label
//                       htmlFor="projectType"
//                       className="block text-sm font-medium text-gray-700 mb-2"
//                     >
//                       Projekta Tips
//                     </label>
//                     <div className="grid grid-cols-2 gap-4">
//                       {(["website", "app", "ecommerce", "other"] as const).map(
//                         (type) => (
//                           <motion.button
//                             key={type}
//                             type="button"
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={() =>
//                               setFormData((prev) => ({
//                                 ...prev,
//                                 projectType: type,
//                               }))
//                             }
//                             className={`p-4 rounded-lg border ${
//                               formData.projectType === type
//                                 ? "border-[#8CB8B4] bg-[#8CB8B4] text-white"
//                                 : "border-gray-300 hover:border-[#8CB8B4]"
//                             } transition-colors duration-300`}
//                           >
//                             {type === "website" && (
//                               <FiLayout className="inline-block mr-2" />
//                             )}
//                             {type === "app" && (
//                               <FiSmartphone className="inline-block mr-2" />
//                             )}
//                             {type === "ecommerce" && (
//                               <FiShoppingCart className="inline-block mr-2" />
//                             )}
//                             {type === "other" && (
//                               <FiCode className="inline-block mr-2" />
//                             )}
//                             {type.charAt(0).toUpperCase() + type.slice(1)}
//                           </motion.button>
//                         )
//                       )}
//                     </div>
//                   </div>

//                   <div className="mb-6">
//                     <label
//                       htmlFor="message"
//                       className="block text-sm font-medium text-gray-700 mb-2"
//                     >
//                       Tava Ziņa
//                     </label>
//                     <textarea
//                       id="message"
//                       name="message"
//                       value={formData.message}
//                       onChange={handleInputChange}
//                       rows={4}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#8CB8B4] focus:border-[#8CB8B4]"
//                       placeholder="Pastāsti mums par savu sapni..."
//                     ></textarea>
//                     {errors.message && (
//                       <p className="mt-1 text-sm text-red-600">
//                         {errors.message}
//                       </p>
//                     )}
//                   </div>

//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="w-full bg-[#EEC71B] text-[#3D3B4A] py-3 px-4 rounded-full font-bold text-lg hover:bg-[#3D3B4A] hover:text-white transition-colors duration-300 flex items-center justify-center"
//                   >
//                     {isSubmitting ? "Sūtam..." : "Sūtīt Ziņu"}{" "}
//                     <FiSend className="ml-2" />
//                   </motion.button>

//                   {errors.submit && (
//                     <p className="mt-2 text-sm text-red-600">{errors.submit}</p>
//                   )}
//                 </motion.form>
//               ) : (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.5 }}
//                   className="bg-white shadow-2xl rounded-2xl p-8 text-center flex-1"
//                 >
//                   <FiSmile className="text-6xl text-[#EEC71B] mx-auto mb-4" />
//                   <h2 className="text-2xl font-bold text-[#3D3B4A] mb-4">
//                     Paldies par Tavu ziņu, {formData.name}!
//                   </h2>
//                   <p className="text-gray-700 mb-4">
//                     Mēs esam saņēmuši Tavu vēstuli un nevaram sagaidīt, kad
//                     sāksim veidot kaut ko brīnišķīgu kopā. Mēs sazināsimies ar
//                     Tevi tuvākajā laikā uz {formData.email}.
//                   </p>
//                   <motion.div
//                     className="inline-block"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <a
//                       href="/"
//                       className="bg-[#EEC71B] text-[#3D3B4A] py-2 px-4 rounded-full font-bold hover:bg-[#3D3B4A] hover:text-white transition-colors duration-300"
//                     >
//                       Atgriezties Sākumlapā
//                     </a>
//                   </motion.div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             <div className="flex-1">
//               <motion.div
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.3 }}
//                 className="bg-[#3D3B4A] text-white rounded-2xl p-8 shadow-2xl"
//               >
//                 <h2 className="text-2xl font-bold mb-4">
//                   Kāpēc Izvēlēties WebWorks?
//                 </h2>
//                 <ul className="space-y-4">
//                   {[
//                     { icon: <FiCode />, text: "Inovatīvas tehnoloģijas" },
//                     { icon: <FiHeart />, text: "Personalizēta pieeja" },
//                     { icon: <FiCoffee />, text: "Radoši risinājumi" },
//                     { icon: <FiSmile />, text: "Apmierināti klienti" },
//                   ].map((item, index) => (
//                     <motion.li
//                       key={index}
//                       className="flex items-center"
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
//                     >
//                       <span className="text-[#EEC71B] mr-2">{item.icon}</span>
//                       {item.text}
//                     </motion.li>
//                   ))}
//                 </ul>
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.6 }}
//                 className="mt-8 bg-white rounded-2xl p-8 shadow-2xl"
//               >
//                 <h2 className="text-2xl font-bold mb-4 text-[#3D3B4A]">
//                   Mūsu Kontaktinformācija
//                 </h2>
//                 <p className="mb-2">
//                   <strong>Adrese:</strong> Brīvības iela 123, Rīga, LV-1010
//                 </p>
//                 <p className="mb-2">
//                   <strong>E-pasts:</strong> info@webworks.lv
//                 </p>
//                 <p className="mb-2">
//                   <strong>Tālrunis:</strong> +371 12345678
//                 </p>
//               </motion.div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </TooltipProvider>
//   );
// };

// export default ContactUs;
