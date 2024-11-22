"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "../utils/supabase";
import Header from "../components/Header";
import Footer from "../components/footer";
import Script from "next/script";
import { FiArrowRight, FiLoader } from "react-icons/fi";
import { fadeInUp, staggerContainer } from "@/utils/animationUtils";

// Types
interface CareerContent {
  id: number;
  title: string;
  subtitle: string;
  main_description: string;
  culture_description: string;
  values_description: string;
  contact_info: string;
  created_at: string;
  updated_at: string;
}

interface HeroSectionProps {
  title: string;
  subtitle: string;
}

// Components with proper typing
const CircuitBackground: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none opacity-10">
    <svg
      width="100%"
      height="100%"
      className="text-[#EEC71B]"
      aria-hidden="true"
    >
      <pattern
        id="circuit"
        x="0"
        y="0"
        width="50"
        height="50"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M10 10h30v30h-30z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <circle cx="25" cy="25" r="3" fill="currentColor" />
        <path
          d="M25 10v8M25 32v8M10 25h8M32 25h8"
          stroke="currentColor"
          strokeWidth="0.5"
        />
      </pattern>
      <rect width="100%" height="100%" fill="url(#circuit)" />
    </svg>
  </div>
);

const DecorativeBackground: React.FC = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-[#EEC71B]/10 to-transparent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
    <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#3D3B4A]/5 to-transparent rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4" />
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <div className="h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
    </motion.div>
  </div>
);

const LoadingSpinner: React.FC = () => (
  <div
    className="flex flex-col items-center justify-center min-h-[60vh]"
    role="status"
    aria-label="Loading content"
  >
    <motion.div
      className="relative"
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    >
      <div className="w-20 h-20 border-4 border-[#EEC71B]/30 rounded-full" />
      <div className="absolute top-0 left-0 w-20 h-20 border-4 border-[#EEC71B] rounded-full border-t-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <FiLoader className="text-[#EEC71B] text-2xl" aria-hidden="true" />
      </div>
    </motion.div>
    <motion.p
      className="mt-4 text-gray-600"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      Ielādē saturu...
    </motion.p>
  </div>
);

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle }) => (
  <motion.section
    variants={staggerContainer}
    initial="initial"
    animate="animate"
    className="relative bg-[#3D3B4A] text-white py-12 sm:py-16 md:py-20 rounded-2xl mb-8 sm:mb-12 md:mb-16 overflow-hidden min-h-[400px] sm:min-h-[450px] md:min-h-[500px] flex items-center justify-center"
  >
    <CircuitBackground />
    <div className="relative z-10 text-center w-full max-w-4xl mx-auto px-4 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-mono text-[#EEC71B] text-xs sm:text-sm mb-4 sm:mb-6 md:mb-8"
      >
        {"<WebWorks>"}
      </motion.div>

      <motion.div
        variants={fadeInUp}
        className="space-y-4 sm:space-y-6 md:space-y-8 mb-8 sm:mb-10 md:mb-12"
      >
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight bg-clip-text px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h1>

        <motion.div
          className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal flex-wrap px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.span
            className="text-[#EEC71B] whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
          >
            Web Development
          </motion.span>
          <span className="text-gray-400 hidden sm:inline" aria-hidden="true">
            •
          </span>
          <motion.span
            className="text-[#EEC71B] whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
          >
            Innovation
          </motion.span>
          <span className="text-gray-400 hidden sm:inline" aria-hidden="true">
            •
          </span>
          <motion.span
            className="text-[#EEC71B] whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
          >
            Growth
          </motion.span>
        </motion.div>

        <motion.p
          variants={fadeInUp}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto px-4"
        >
          {subtitle}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="font-mono text-[#EEC71B] text-xs sm:text-sm mb-8 sm:mb-12 md:mb-16"
      >
        {"</WebWorks>"}
      </motion.div>

      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 flex justify-center">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-[#EEC71B] cursor-pointer hover:scale-110 transition-transform duration-300"
          aria-hidden="true"
        >
          <FiArrowRight className="text-2xl sm:text-3xl md:text-4xl rotate-90" />
        </motion.div>
      </div>
    </div>
  </motion.section>
);

const NoOpenings: React.FC = () => (
  <motion.div
    variants={fadeInUp}
    className="bg-white rounded-xl shadow-lg p-8 text-center"
  >
    <h3 className="text-2xl font-bold text-[#3D3B4A] mb-4">
      Pašlaik nav aktīvu vakanču
    </h3>
    <p className="text-gray-600 mb-6">
      Kaut arī pašlaik mums nav aktīvu vakanču, mēs vienmēr meklējam talantīgus
      profesionāļus. Sūti mums savu CV, un mēs sazināsimies, tiklīdz radīsies
      piemērota pozīcija.
    </p>
    <motion.a
      href="mailto:info@webworks.lv"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-block bg-[#EEC71B] text-[#3D3B4A] px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
    >
      Sūtīt CV
    </motion.a>
  </motion.div>
);

const Career: React.FC = () => {
  const [content, setContent] = useState<CareerContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const { data: contentData, error: contentError } = await supabase
          .from("career_page_content")
          .select("*")
          .single();

        if (contentError) throw contentError;
        setContent(contentData as CareerContent);
      } catch (error) {
        console.error("Error fetching data:", error);
        // You might want to add error handling UI here
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (!content) return null;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: content.title,
    description: content.main_description,
    url: "https://www.webworks.lv/karjera",
    provider: {
      "@type": "Organization",
      name: "WebWorks",
      url: "https://www.webworks.lv",
      address: {
        "@type": "PostalAddress",
        addressCountry: "LV",
      },
    },
    mainEntity: {
      "@type": "Organization",
      name: "WebWorks",
      description: content.culture_description,
      email: "info@webworks.lv",
      sameAs: [
        "https://www.linkedin.com/company/webworks-latvia",
        "https://www.facebook.com/webworks.lv",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Careers Inquiries",
        email: "info@webworks.lv",
        availableLanguage: ["lv"],
      },
    },
  };

  return (
    <>
      <DecorativeBackground />
      <Header />

      <main className="relative min-h-screen pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HeroSection title={content.title} subtitle={content.subtitle} />

          <motion.section
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-bold text-[#3D3B4A] mb-8 text-center"
            >
              Atvērtās Vakances
            </motion.h2>
            <NoOpenings />
          </motion.section>
        </div>
      </main>

      <Footer />

      <Script
        id="schema-script"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />
    </>
  );
};

export default Career;
