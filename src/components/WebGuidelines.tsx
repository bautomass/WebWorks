"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../utils/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";
import { FiBook, FiChevronDown, FiCode, FiCircle } from "react-icons/fi";

type GuidelineSection = {
  id: number;
  title: string;
  content: string;
  order_number: number;
  created_at: string;
  subsections?: GuidelineSubsection[];
};

type GuidelineSubsection = {
  id: number;
  section_id: number;
  title: string;
  content: string;
  order_number: number;
  created_at: string;
};

const DecorativeBackground = () => (
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

const ProgressIndicator = ({ progress }) => (
  <motion.div
    className="fixed bottom-0 left-0 h-1 bg-[#EEC71B]"
    style={{ width: `${progress}%` }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5 }}
  />
);

const LoadingSpinner = () => (
  <div
    className="flex flex-col items-center justify-center min-h-[60vh]"
    role="status"
  >
    <motion.div
      className="relative"
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    >
      <div className="w-20 h-20 border-4 border-[#EEC71B]/30 rounded-full" />
      <div className="absolute top-0 left-0 w-20 h-20 border-4 border-[#EEC71B] rounded-full border-t-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <FiCode className="text-[#EEC71B] text-2xl" aria-hidden="true" />
      </div>
    </motion.div>
    <motion.p
      className="mt-4 text-gray-600"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      Ielādē vadlīnijas...
    </motion.p>
  </div>
);

const FloatingDecoration = ({ isActive }) => (
  <motion.div
    className="absolute -right-3 -top-3 w-24 h-24 pointer-events-none"
    initial={false}
    animate={
      isActive
        ? {
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180],
          }
        : {}
    }
    transition={{ duration: 0.6 }}
  >
    <div className="relative w-full h-full">
      <motion.div
        className="absolute inset-0 border-2 border-[#EEC71B] rounded-lg"
        initial={false}
        animate={isActive ? { rotate: 45 } : {}}
      />
      <motion.div
        className="absolute inset-2 border-2 border-[#EEC71B]/50 rounded-lg"
        initial={false}
        animate={isActive ? { rotate: -45 } : {}}
      />
    </div>
  </motion.div>
);

const GuidelineCard = ({ section, isActive, onToggle, index }) => {
  const contentVariants = {
    hidden: {
      height: 0,
      opacity: 0,
    },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        height: {
          duration: 0.4,
          ease: "easeOut",
        },
        opacity: {
          duration: 0.3,
          delay: 0.2,
        },
      },
    },
  };

  return (
    <motion.article
      layout
      className="relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <FloatingDecoration isActive={isActive} />

      <div className="border-b border-[#EEC71B]/20">
        <button
          onClick={onToggle}
          className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-[#EEC71B] focus:ring-offset-2 rounded-t-xl transition-all duration-300 hover:bg-gray-50 group"
          aria-expanded={isActive}
          aria-controls={`section-content-${section.id}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.span
                className="text-[#EEC71B] text-2xl flex-shrink-0"
                animate={{ scale: isActive ? 1.1 : 1 }}
                transition={{ duration: 0.2 }}
                aria-hidden="true"
              >
                <FiBook />
              </motion.span>
              <h2 className="text-2xl font-semibold text-[#3D3B4A] group-hover:text-[#EEC71B] transition-colors duration-300">
                {section.title}
              </h2>
            </div>
            <motion.div
              animate={{
                rotate: isActive ? 180 : 0,
                scale: isActive ? 1.2 : 1,
              }}
              transition={{ duration: 0.3 }}
              className="text-[#EEC71B] flex-shrink-0 ml-4"
              aria-hidden="true"
            >
              <FiChevronDown className="text-xl" />
            </motion.div>
          </div>
          <p className="mt-2 text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
            {section.content}
          </p>
        </button>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            id={`section-content-${section.id}`}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="overflow-hidden relative"
          >
            <div className="absolute left-0 w-1 h-full bg-gradient-to-b from-[#EEC71B] to-[#EEC71B]/30" />
            <div className="p-6 space-y-6">
              {section.subsections?.map((subsection, index) => (
                <motion.div
                  key={subsection.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <motion.span
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="text-[#EEC71B] flex-shrink-0"
                    >
                      <FiCircle className="w-4 h-4" />
                    </motion.span>
                    <h3 className="text-xl font-medium text-[#3D3B4A]">
                      {subsection.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {subsection.content
                      .split("•")
                      .filter(Boolean)
                      .map((item, i) => (
                        <div
                          key={i}
                          className="flex items-start space-x-2 p-2 rounded hover:bg-white transition-colors duration-200"
                        >
                          <span className="text-[#EEC71B] mt-1 flex-shrink-0">
                            ⚡
                          </span>
                          <span className="text-gray-700">{item.trim()}</span>
                        </div>
                      ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

const WebGuidelines = () => {
  const [guidelines, setGuidelines] = useState<GuidelineSection[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadGuidelines = async () => {
      const { data, error } = await supabase
        .from("web_guidelines_sections")
        .select(
          `
          *,
          subsections:web_guidelines_subsections(*)
        `
        )
        .order("order_number", { ascending: true });

      if (error) {
        console.error("Error fetching guidelines:", error);
        return;
      }

      setGuidelines(data);
      setIsLoading(false);
    };

    loadGuidelines();
  }, []);

  // Create guideline items for schema
  const guidelineItems = guidelines?.map((section) => ({
    "@type": "HowToStep",
    name: section.title,
    text: section.content,
    itemListElement: section.subsections?.map((subsection) => ({
      "@type": "HowToTip",
      name: subsection.title,
      text: subsection.content,
    })),
  }));

  return (
    <>
      <DecorativeBackground />
      <ProgressIndicator progress={scrollProgress} />

      <Header />

      <main className="min-h-screen">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 relative">
            <motion.div
              className="text-center mb-16 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-[#3D3B4A] mb-6 relative inline-block">
                Web Izstrādes Vadlīnijas
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-1 bg-[#EEC71B]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </h1>
              <motion.p
                className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Modernā web izstrāde prasa dziļu izpratni, precīzu plānošanu un
                inovāciju. Mūsu vadlīnijas palīdzēs jums izveidot izcilu
                digitālo risinājumu.
              </motion.p>
            </motion.div>

            <motion.div className="space-y-8" layout>
              {guidelines?.map((section, index) => (
                <GuidelineCard
                  key={section.id}
                  section={section}
                  isActive={activeSection === section.id}
                  onToggle={() =>
                    setActiveSection(
                      activeSection === section.id ? null : section.id
                    )
                  }
                  index={index}
                />
              ))}
            </motion.div>
          </div>
        )}
      </main>

      <Footer />

      <Script
        id="schema-script"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Web Izstrādes Vadlīnijas",
            description:
              "Visaptverošas web izstrādes vadlīnijas no WebWorks ekspertiem. Uzziniet par modernā web dizaina principiem, tehniskajām prasībām, drošību un SEO optimizāciju.",
            url: "https://www.webworks.lv/vadlinijas",
            provider: {
              "@type": "Organization",
              name: "WebWorks",
              url: "https://www.webworks.lv",
              address: {
                "@type": "PostalAddress",
                addressCountry: "LV",
              },
            },
            step: guidelineItems,
            totalTime: "PT30M",
            supply: {
              "@type": "HowToSupply",
              name: "Web izstrādes zināšanas",
              requiredQuantity: 1,
            },
            tool: {
              "@type": "HowToTool",
              name: "Modernās web tehnoloģijas",
              requiredQuantity: 1,
            },
          }),
        }}
      />
    </>
  );
};

export default WebGuidelines;
