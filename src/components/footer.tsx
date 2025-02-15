"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiShield,
  FiBookOpen,
  FiChevronsUp,
  FiCheck,
  FiX,
  FiCoffee,
} from "react-icons/fi";
import { supabase } from "../utils/supabase";

// Type definitions
interface SubmitStatus {
  type: "success" | "error" | null;
  message: string;
}

interface ResourceLink {
  title: string;
  url: string;
}
interface ServiceLink {
  title: string;
  url: string;
}
const ScrollToTopButton = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;
      setShowScrollButton(scrollPercentage > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    setIsScrolling(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {showScrollButton && (
        <motion.div
          className="fixed bottom-8 right-8 z-50 flex items-center gap-3"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Tooltip */}
          <motion.div
            className="bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : 20,
            }}
            transition={{ duration: 0.2 }}
          >
            Uz augšu
          </motion.div>

          {/* Button Container */}
          <div className="relative">
            {/* Wind Trail Effect */}
            {isScrolling && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-32">
                {[...Array(8)].map((_, index) => (
                  <motion.div
                    key={`wind-particle-${index}`}
                    className="absolute bottom-0 left-1/2 h-8 rounded-full"
                    style={{
                      width: Math.random() * 3 + 1,
                      x: `${(Math.random() - 0.5) * 30}px`,
                    }}
                    initial={{
                      opacity: 0.7,
                      y: 0,
                      backgroundColor: "#EEC71B",
                    }}
                    animate={{
                      opacity: [0.7, 0],
                      y: [-20, -100],
                      x: (Math.random() - 0.5) * 30,
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                  />
                ))}

                {/* Additional speed lines */}
                {[...Array(5)].map((_, index) => (
                  <motion.div
                    key={`speed-line-${index}`}
                    className="absolute bottom-0 left-1/2 w-[1px] bg-[#EEC71B]"
                    style={{
                      height: 20 + Math.random() * 20,
                      x: `${(Math.random() - 0.5) * 20}px`,
                    }}
                    initial={{
                      opacity: 0.5,
                      y: 0,
                    }}
                    animate={{
                      opacity: [0.5, 0],
                      y: [-20, -120],
                      scaleY: [1, 1.5],
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: index * 0.15,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>
            )}

            {/* Main Button */}
            <motion.button
              onClick={scrollToTop}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Scroll to top"
            >
              {/* Button Background with Gradient */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#EEC71B] to-[#FFD700] opacity-90" />

              {/* Glass Effect Layer */}
              <div className="absolute inset-px rounded-full bg-white/10 backdrop-blur-sm" />

              {/* Button Content */}
              <div className="relative px-4 py-4">
                <motion.div
                  animate={{
                    y: isScrolling ? [0, -2, 0] : isHovered ? -2 : 0,
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: isScrolling ? Infinity : false,
                    repeatType: "reverse",
                  }}
                >
                  <FiChevronsUp
                    className={`text-2xl text-[#3D3B4A] transition-transform duration-300 ${
                      isScrolling ? "scale-110" : ""
                    }`}
                  />
                </motion.div>

                {/* Inner Highlight */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent" />
              </div>

              {/* Glow Effect */}
              <motion.div
                className="absolute -inset-2 rounded-full bg-[#EEC71B] blur-md"
                animate={{
                  opacity: isScrolling ? [0.2, 0.4, 0.2] : isHovered ? 0.2 : 0,
                }}
                transition={{
                  duration: 1,
                  repeat: isScrolling ? Infinity : false,
                  ease: "easeInOut",
                }}
              />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Utility functions
const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const Footer: React.FC = () => {
  // State management
  const [email, setEmail] = useState("");
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    type: null,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Check for existing subscriber
      const { data: existingSubscriber } = await supabase
        .from("newsletter_subscribers")
        .select("id, status")
        .eq("email", email.toLowerCase())
        .single();

      if (existingSubscriber) {
        if (existingSubscriber.status === "unsubscribed") {
          // Reactivate subscription
          const { error: updateError } = await supabase
            .from("newsletter_subscribers")
            .update({ status: "active" })
            .eq("id", existingSubscriber.id);

          if (updateError) throw updateError;
          setSubmitStatus({
            type: "success",
            message:
              "Jūsu e-pasta adrese ir veiksmīgi atjaunota mūsu jaunumu sarakstā!",
          });
        } else {
          setSubmitStatus({
            type: "error",
            message:
              "Šī e-pasta adrese jau ir reģistrēta mūsu jaunumu sarakstā.",
          });
        }
      } else {
        // Insert new subscriber
        const { error: insertError } = await supabase
          .from("newsletter_subscribers")
          .insert([{ email: email.toLowerCase() }]);

        if (insertError) throw insertError;
        setSubmitStatus({
          type: "success",
          message:
            "Paldies! Jūs esat veiksmīgi pierakstījies mūsu jaunumu saņemšanai.",
        });
      }

      if (submitStatus.type === "success") {
        setEmail("");
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setSubmitStatus({
        type: "error",
        message: "Diemžēl radās kļūda. Lūdzu, mēģiniet vēlreiz.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Navigation and content data
  const services: ServiceLink[] = [
    { title: "Web Izstrāde", url: "/pakalpojumi/web-izstrade" },
    { title: "E-komercija", url: "/pakalpojumi/e-komercija" },
    {
      title: "Mobilo Aplikāciju Izstrāde",
      url: "/pakalpojumi/mobilo-aplikaciju-izstrade",
    },
    { title: "SEO Optimizācija", url: "/pakalpojumi/seo-optimizacija" },
    {
      title: "Digitālais Mārketings",
      url: "/pakalpojumi/digitalais-marketings",
    },
    { title: "Web Aplikācijas", url: "/pakalpojumi/web-aplikacijas" },
  ];
  const resources: ResourceLink[] = [
    { title: "Blog Raksti", url: "/blog" },
    { title: "Biežāk Uzdotie Jautājumi", url: "/faq-page" },
    { title: "API Dokumentācija", url: "/info/api-docs" },
    { title: "Web Izstrādes Vadlinījas", url: "/info/vadlinijas" },
  ];

  const companyInfo: ResourceLink[] = [
    { title: "Par Mums", url: "/about-us" },
    { title: "Karjera", url: "/info/karjera" },
    { title: "Partneri", url: "/info/partneri" },
    { title: "Kontakti", url: "/contact-us" },
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-gradient-to-br from-[#3D3B4A] to-[#2C2A35] text-white py-12 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {/* Company Information */}
          <motion.div variants={sectionVariants}>
            <h3 className="text-2xl font-bold mb-4 text-[#EEC71B]">
              Par WebWorks
            </h3>
            <p className="mb-6 text-gray-300">
              Mēs esam digitālās transformācijas eksperti, kas palīdz uzņēmumiem
              augt un attīstīties tiešsaistē.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <FiPhone className="mr-3 text-[#EEC71B]" />
                <a
                  href="tel:+37126282630"
                  className="hover:text-[#EEC71B] transition-colors"
                >
                  +371 2628 2630
                </a>
              </div>
              <div className="flex items-center text-gray-300">
                <FiMail className="mr-3 text-[#EEC71B]" />
                <a
                  href="mailto:info@webworks.lv"
                  className="hover:text-[#EEC71B] transition-colors"
                >
                  info@webworks.lv
                </a>
              </div>
              <div className="flex items-center text-gray-300">
                <FiMapPin className="mr-3 text-[#EEC71B]" />
                <span>Latvia</span>
              </div>
              <div className="flex items-center text-gray-300">
                <FiClock className="mr-3 text-[#EEC71B]" />
                <span>Darba dienas 9:00 - 20:00</span>
              </div>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={sectionVariants}>
            <h3 className="text-2xl font-bold mb-4 text-[#EEC71B]">
              Mūsu Pakalpojumi
            </h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <motion.li key={index} whileHover={{ x: 5 }} className="group">
                  <Link
                    href={service.url}
                    className="hover:text-[#EEC71B] transition-colors duration-300 flex items-center"
                  >
                    <FiCoffee className="mr-2 group-hover:rotate-45 transition-transform duration-300" />
                    {service.title}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={sectionVariants}>
            <h3 className="text-2xl font-bold mb-4 text-[#EEC71B]">
              Noderīgi Resursi
            </h3>
            <ul className="space-y-2">
              {resources.map((resource, index) => (
                <motion.li key={index} whileHover={{ x: 5 }} className="group">
                  <Link
                    href={resource.url}
                    className="hover:text-[#EEC71B] transition-colors duration-300 flex items-center"
                  >
                    <FiBookOpen className="mr-2 group-hover:rotate-45 transition-transform duration-300" />
                    {resource.title}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-6 p-3 bg-white bg-opacity-5 rounded-lg">
              <h4 className="font-semibold text-[#EEC71B] mb-2">
                Sertificēts Partners
              </h4>
              <p className="text-sm text-gray-300">
                ISO 9001:2015 Sertificēts uzņēmums
              </p>
            </div>
          </motion.div>

          {/* Newsletter Section */}
          <motion.div variants={sectionVariants}>
            <h3 className="text-2xl font-bold mb-4 text-[#EEC71B]">
              Piesakieties Jaunumiem
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Jūsu e-pasts"
                  className="flex-grow px-3 py-2 bg-white bg-opacity-10 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#EEC71B] transition-all duration-300"
                  required
                  disabled={isSubmitting}
                />
                <motion.button
                  type="submit"
                  className={`bg-[#EEC71B] text-[#3D3B4A] px-4 py-2 rounded-r-md hover:bg-opacity-90 transition-colors duration-300 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                  disabled={isSubmitting}
                  aria-label="Iesniegt e-pastu"
                >
                  {isSubmitting ? (
                    <div className="animate-spin">⌛</div>
                  ) : (
                    <FiMail />
                  )}
                </motion.button>
              </div>
              {submitStatus.type && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-md ${
                    submitStatus.type === "success"
                      ? "bg-green-500 bg-opacity-10 text-green-200"
                      : "bg-red-500 bg-opacity-10 text-red-200"
                  }`}
                >
                  <div className="flex items-center">
                    {submitStatus.type === "success" ? (
                      <FiCheck className="mr-2" />
                    ) : (
                      <FiX className="mr-2" />
                    )}
                    {submitStatus.message}
                  </div>
                </motion.div>
              )}
            </form>
            <div className="mt-6 p-4 bg-white bg-opacity-5 rounded-lg">
              <div className="flex items-center mb-2">
                <FiShield className="text-[#EEC71B] mr-2" />
                <span className="font-semibold">Drošība un Kvalitāte</span>
              </div>
              <p className="text-sm text-gray-300">
                Mēs izmantojam modernākās tehnoloģijas un drošibas protokolus,
                lai aizsargātu jūsu datus.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Company Links */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-t border-gray-700"
          variants={sectionVariants}
        >
          {companyInfo.map((item, index) => (
            <Link
              key={index}
              href={item.url}
              className="text-center hover:text-[#EEC71B] transition-colors duration-300"
            >
              {item.title}
            </Link>
          ))}
        </motion.div>

        {/* Copyright Section */}
        <motion.div
          className="border-t border-gray-700 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>
            &copy; {new Date().getFullYear()} WebWorks. Visas tiesības
            aizsargātas.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              href="/info/privatuma-politika"
              className="hover:text-[#EEC71B] transition-colors duration-300"
            >
              Privātuma Politika
            </Link>
            <Link
              href="/info/lietosanas-noteikumi"
              className="hover:text-[#EEC71B] transition-colors duration-300"
            >
              Lietošanas Noteikumi
            </Link>
          </div>
        </motion.div>
      </div>
      <ScrollToTopButton />
    </footer>
  );
};

export default Footer;
