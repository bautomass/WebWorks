"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "../utils/supabase";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Script from "next/script";
import {
  FiShield,
  FiCalendar,
  FiMail,
  FiPrinter,
  FiArrowUp,
  FiLoader,
} from "react-icons/fi";

type PolicyContent = {
  title: string;
  subtitle: string;
  last_updated: string;
  intro_text: string;
  contact_email: string;
};

type PolicySection = {
  id: number;
  title: string;
  content: string;
  order_number: number;
};

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <motion.div
      className="relative w-16 h-16"
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute inset-0 border-4 border-[#EEC71B]/20 rounded-full" />
      <div className="absolute inset-0 border-4 border-t-[#EEC71B] rounded-full" />
    </motion.div>
    <p className="mt-4 text-gray-600">Ielādē saturu...</p>
  </div>
);

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 bg-[#3D3B4A] text-white p-3 rounded-full shadow-lg hover:bg-[#4A4958] transition-colors ${
        isVisible ? "visible" : "invisible"
      }`}
      aria-label="Atgriezties augšā"
    >
      <FiArrowUp className="text-xl" />
    </motion.button>
  );
};

const TableOfContents = ({ sections }: { sections: PolicySection[] }) => (
  <nav className="hidden lg:block sticky top-8 bg-white rounded-xl shadow-lg p-6 h-fit">
    <h2 className="text-lg font-semibold mb-4 text-[#3D3B4A]">Saturs</h2>
    <ul className="space-y-2">
      {sections.map((section) => (
        <li key={section.id}>
          <a
            href={`#section-${section.id}`}
            className="text-gray-600 hover:text-[#EEC71B] transition-colors block py-1"
          >
            {section.title}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

const PrivacyPolicy = () => {
  const [content, setContent] = useState<PolicyContent | null>(null);
  const [sections, setSections] = useState<PolicySection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const { data: contentData, error: contentError } = await supabase
          .from("privacy_policy_content")
          .select("*")
          .single();

        if (contentError) throw contentError;

        const { data: sectionsData, error: sectionsError } = await supabase
          .from("privacy_policy_sections")
          .select("*")
          .order("order_number");

        if (sectionsError) throw sectionsError;

        setContent(contentData);
        setSections(sectionsData || []);
      } catch (error) {
        console.error("Error fetching privacy policy:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(`section-${section.id}`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  if (isLoading) return <LoadingSpinner />;
  if (!content) return null;

  const printPage = () => {
    window.print();
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 pt-16 pb-24 print:bg-white print:pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#EEC71B]/10 rounded-full mb-6">
              <FiShield className="text-[#EEC71B] text-3xl" />
            </div>
            <h1 className="text-4xl font-bold text-[#3D3B4A] mb-4">
              {content.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6">{content.subtitle}</p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <FiCalendar />
                Atjaunināts:{" "}
                {new Date(content.last_updated).toLocaleDateString("lv-LV")}
              </span>
              <button
                onClick={printPage}
                className="flex items-center gap-2 hover:text-[#3D3B4A] transition-colors print:hidden"
              >
                <FiPrinter />
                Drukāt dokumentu
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Table of Contents */}
            <TableOfContents sections={sections} />

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Introduction */}
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <p className="text-gray-600 leading-relaxed">
                  {content.intro_text}
                </p>
              </div>

              {/* Policy Sections */}
              <div className="space-y-8">
                {sections.map((section) => (
                  <motion.section
                    key={section.id}
                    id={`section-${section.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl shadow-lg p-8"
                  >
                    <h2 className="text-2xl font-bold text-[#3D3B4A] mb-4">
                      {section.title}
                    </h2>
                    <div
                      className="prose prose-lg max-w-none text-gray-600"
                      dangerouslySetInnerHTML={{
                        __html: section.content.replace(/\n/g, "<br>"),
                      }}
                    />
                  </motion.section>
                ))}
              </div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#3D3B4A] text-white rounded-xl shadow-lg p-8 mt-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <FiMail className="text-[#EEC71B] text-2xl" />
                  <h2 className="text-xl font-semibold">Kontaktinformācija</h2>
                </div>
                <p className="text-gray-300 mb-4">
                  Ja jums ir jautājumi par šo privātuma politiku vai vēlaties
                  izmantot savas tiesības, lūdzu, sazinieties ar mums:
                </p>
                <a
                  href={`mailto:${content.contact_email}`}
                  className="text-[#EEC71B] hover:underline"
                >
                  {content.contact_email}
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <BackToTop />
      <Footer />

      <Script
        id="schema-script"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: content.title,
            description: content.intro_text,
            dateModified: content.last_updated,
            publisher: {
              "@type": "Organization",
              name: "WebWorks",
              url: "https://www.webworks.lv",
            },
            mainEntity: {
              "@type": "WebPage",
              name: "Privacy Policy",
              text: sections.map((s) => s.title + ": " + s.content).join(" "),
            },
          }),
        }}
      />
    </>
  );
};

export default PrivacyPolicy;
