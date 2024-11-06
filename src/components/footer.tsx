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

    // Reset the scrolling state after animation completes
    const scrollDuration = 1000; // matches smooth scroll duration
    setTimeout(() => {
      setIsScrolling(false);
    }, scrollDuration);
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
            className="bg-[#3D3B4A] text-white px-3 py-1 rounded text-sm whitespace-nowrap"
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
            {/* Speed Lines Effect */}
            <motion.div
              className="absolute inset-0 -z-10"
              initial="hidden"
              animate={isScrolling ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1.2 },
              }}
            >
              {[...Array(8)].map((_, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={
                    isScrolling
                      ? {
                          opacity: [0, 1, 0],
                          scale: [1, 1.5],
                          rotate: 45 * index,
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: index * 0.1,
                  }}
                >
                  <div className="absolute top-1/2 left-1/2 h-8 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-[#EEC71B] blur-[2px]" />
                </motion.div>
              ))}
            </motion.div>

            {/* Trail Effect */}
            <AnimatePresence>
              {isScrolling && (
                <>
                  {[...Array(3)].map((_, index) => (
                    <motion.div
                      key={`trail-${index}`}
                      className="absolute left-1/2 -translate-x-1/2 bottom-0 w-12 h-12"
                      initial={{ opacity: 0.5, y: 0 }}
                      animate={{ opacity: 0, y: 20 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.15,
                        repeat: Infinity,
                      }}
                    >
                      <div className="w-full h-full rounded-full bg-[#EEC71B] opacity-20 blur-sm" />
                    </motion.div>
                  ))}
                </>
              )}
            </AnimatePresence>

            {/* Main Button */}
            <motion.button
              onClick={scrollToTop}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative bg-gradient-to-br from-[#EEC71B] to-[#FFD700] text-[#3D3B4A] p-4 rounded-full shadow-lg group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Scroll to top"
            >
              <motion.div
                className="absolute inset-0 bg-white rounded-full opacity-20"
                animate={{
                  scale: isHovered ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="relative">
                <motion.div
                  animate={{
                    y: isScrolling ? [0, -3, 0] : isHovered ? -3 : 0,
                  }}
                  transition={{
                    duration: isScrolling ? 0.2 : 0.3,
                    repeat: isScrolling ? Infinity : false,
                    repeatType: "reverse",
                  }}
                >
                  <FiChevronsUp className="text-2xl" />
                </motion.div>
              </div>
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
  const services = [
    "Web Izstrade",
    "E-komercija",
    "Mobilo Aplikaciju Izstrade",
    "SEO Optimizacija",
    "Digitalais Marketings",
    "Web Aplikacijas",
  ];

  const resources: ResourceLink[] = [
    { title: "Dokumentacija", url: "/dokumentacija" },
    { title: "Biezak Uzdotie Jautajumi", url: "/faq-page" },
    { title: "API Dokumentacija", url: "/api-docs" },
    { title: "Web Izstrades Vadlinijas", url: "/info/vadlinijas" },
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
              Musu Pakalpojumi
            </h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <motion.li key={index} whileHover={{ x: 5 }} className="group">
                  <Link
                    href={`/pakalpojumi/${slugify(service)}`}
                    className="hover:text-[#EEC71B] transition-colors duration-300 flex items-center"
                  >
                    <FiCoffee className="mr-2 group-hover:rotate-45 transition-transform duration-300" />
                    {service}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={sectionVariants}>
            <h3 className="text-2xl font-bold mb-4 text-[#EEC71B]">
              Noderigi Resursi
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
