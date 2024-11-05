"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "../utils/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import {
  FiBook,
  FiLayout,
  FiShield,
  FiSearch,
  FiCode,
  FiUserCheck,
  FiAward,
  FiTrendingUp,
} from "react-icons/fi";
import Head from "next/head";

// Types remain the same
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

// SEO Metadata
export const metadata: Metadata = {
  title: "Web Izstrādes Vadlīnijas | WebWorks - Profesionāla Web Izstrāde",
  description:
    "Visaptverošas web izstrādes vadlīnijas no WebWorks ekspertiem. Uzziniet par modernā web dizaina principiem, tehniskajām prasībām, drošību un SEO optimizāciju.",
  keywords:
    "web izstrāde, web dizains, SEO optimizācija, web drošība, responsīvs dizains, latvija, riga",
};

// Database fetching function remains the same
async function fetchGuidelines() {
  const { data: sections, error: sectionsError } = await supabase
    .from("web_guidelines_sections")
    .select(
      `
      *,
      subsections:web_guidelines_subsections(*)
    `
    )
    .order("order_number", { ascending: true });

  if (sectionsError) {
    console.error("Error fetching guidelines:", sectionsError);
    return null;
  }

  return sections as GuidelineSection[];
}

// Enhanced loading animation component
const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-[#EEC71B] rounded-full animate-spin border-t-transparent"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <FiCode className="text-[#EEC71B] text-2xl animate-pulse" />
      </div>
    </div>
    <p className="mt-4 text-gray-600 animate-pulse">Ielādē vadlīnijas...</p>
  </div>
);

// Main component
const WebGuidelines: React.FC = () => {
  const [guidelines, setGuidelines] = useState<GuidelineSection[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<number | null>(null);

  useEffect(() => {
    const loadGuidelines = async () => {
      const data = await fetchGuidelines();
      setGuidelines(data);
      setIsLoading(false);
    };

    loadGuidelines();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <>
      <Head>
        <title>{metadata.title as string}</title>
        <meta name="description" content={metadata.description as string} />
        <meta name="keywords" content={metadata.keywords as string} />
        <meta property="og:title" content={metadata.title as string} />
        <meta
          property="og:description"
          content={metadata.description as string}
        />
        <link rel="canonical" href="https://yourwebsite.com/vadlinijas" />
      </Head>

      <Header />

      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8"
          >
            {/* Hero Section */}
            <motion.div className="text-center mb-16" variants={itemVariants}>
              <h1 className="text-5xl font-bold text-[#3D3B4A] mb-6 relative inline-block">
                Web Izstrādes Vadlīnijas
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#EEC71B]"></div>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Modernā web izstrāde prasa dziļu izpratni, precīzu plānošanu un
                inovāciju. Mūsu vadlīnijas palīdzēs jums izveidot izcilu
                digitālo risinājumu.
              </p>
            </motion.div>

            {/* Guidelines Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {guidelines?.map((section) => (
                <motion.section
                  key={section.id}
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="border-b-2 border-[#EEC71B]/20">
                    <button
                      onClick={() =>
                        setActiveSection(
                          activeSection === section.id ? null : section.id
                        )
                      }
                      className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-[#EEC71B] focus:ring-inset"
                      aria-expanded={activeSection === section.id}
                    >
                      <div className="flex items-center space-x-4">
                        <span className="text-[#EEC71B] text-2xl">
                          <FiBook />
                        </span>
                        <h2 className="text-2xl font-semibold text-[#3D3B4A]">
                          {section.title}
                        </h2>
                      </div>
                      <p className="mt-2 text-gray-600">{section.content}</p>
                    </button>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{
                      height: activeSection === section.id ? "auto" : 0,
                    }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 space-y-6">
                      {section.subsections?.map((subsection) => (
                        <div
                          key={subsection.id}
                          className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"
                        >
                          <h3 className="text-xl font-medium text-[#3D3B4A] mb-2">
                            {subsection.title}
                          </h3>
                          <div className="prose prose-lg text-gray-700">
                            {subsection.content}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </motion.section>
              ))}
            </div>
          </motion.div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default WebGuidelines;
