"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../utils/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";
import {
  FiCode,
  FiServer,
  FiDatabase,
  FiGlobe,
  FiAward,
  FiShield,
  FiCloud,
  FiTerminal,
  FiPackage,
  FiLoader,
} from "react-icons/fi";
import {
  fadeInUp,
  staggerContainer,
  scaleIn,
  float,
} from "@/utils/animationUtils";

type PartnerContent = {
  title: string;
  subtitle: string;
  main_description: string;
  partnership_description: string;
  contact_info: string;
};

type Partner = {
  id: number;
  category_id: number;
  name: string;
  description: string;
  website_url: string;
  location: string;
  established_year: number;
  partnership_since: string;
  is_featured: boolean;
  order_number: number;
  technologies?: Technology[];
  testimonials?: Testimonial[];
};

type Technology = {
  id: number;
  name: string;
  icon_name: string;
  description: string;
};

type Testimonial = {
  id: number;
  author_name: string;
  author_position: string;
  content: string;
};

// Loading Component
const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      className="relative w-20 h-20"
    >
      <div className="absolute inset-0 border-4 border-[#EEC71B]/20 rounded-full" />
      <div className="absolute inset-0 border-4 border-t-[#EEC71B] rounded-full" />
      <FiLoader className="absolute inset-0 m-auto text-[#EEC71B] text-2xl" />
    </motion.div>
    <p className="mt-4 text-gray-600">Ielādē saturu...</p>
  </div>
);

// Partner Card Component
const PartnerCard = ({ partner }: { partner: Partner }) => (
  <motion.div
    variants={fadeInUp}
    whileHover={{ y: -5 }}
    className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
  >
    <div className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-[#3D3B4A]">{partner.name}</h3>
          <p className="text-sm text-gray-500">{partner.location}</p>
        </div>
        {partner.is_featured && (
          <span className="bg-[#EEC71B]/10 text-[#EEC71B] text-xs font-medium px-2.5 py-1 rounded-full">
            Featured Partner
          </span>
        )}
      </div>

      <p className="text-gray-600 mb-4">{partner.description}</p>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <FiGlobe className="text-[#EEC71B]" />
          <span>Est. {partner.established_year}</span>
          <span className="text-gray-300">|</span>
          <span>
            Partner since {new Date(partner.partnership_since).getFullYear()}
          </span>
        </div>

        {partner.technologies && (
          <div className="flex flex-wrap gap-2">
            {partner.technologies.map((tech) => (
              <span
                key={tech.id}
                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md"
              >
                {tech.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>

    {partner.testimonials && partner.testimonials.length > 0 && (
      <div className="border-t border-gray-100 bg-gray-50 p-6">
        <blockquote className="text-sm text-gray-600 italic">
          "{partner.testimonials[0].content}"
          <footer className="mt-2 text-xs text-gray-500 non-italic">
            — {partner.testimonials[0].author_name},{" "}
            {partner.testimonials[0].author_position}
          </footer>
        </blockquote>
      </div>
    )}
  </motion.div>
);

// Feature Grid Component
const FeatureGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[
      {
        icon: <FiCloud />,
        title: "Modernie Mākoņrisinājumi",
        description: "Piekļuve jaunākajām mākoņtehnoloģijām un resursiem",
      },
      {
        icon: <FiCode />,
        title: "Inovatīvas Tehnoloģijas",
        description: "Ekskluzīva pieeja beta versijām un jaunākajiem rīkiem",
      },
      {
        icon: <FiShield />,
        title: "Uzticama Partnerība",
        description:
          "Ilgtermiņa sadarbība ar vadošajiem tehnoloģiju uzņēmumiem",
      },
    ].map((feature, index) => (
      <motion.div
        key={index}
        variants={fadeInUp}
        className="bg-white p-6 rounded-xl shadow-lg"
      >
        <div className="text-[#EEC71B] text-2xl mb-4">{feature.icon}</div>
        <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
        <p className="text-gray-600">{feature.description}</p>
      </motion.div>
    ))}
  </div>
);

// Main Partners Component
const Partners = () => {
  const [content, setContent] = useState<PartnerContent | null>(null);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        // Fetch page content
        const { data: contentData, error: contentError } = await supabase
          .from("partners_page_content")
          .select("*")
          .single();

        if (contentError) throw contentError;

        // Fetch partners with technologies and testimonials
        const { data: partnersData, error: partnersError } = await supabase
          .from("partners")
          .select(
            `
            *,
            technologies: partner_technologies(*),
            testimonials: partner_testimonials(*)
          `
          )
          .order("order_number", { ascending: true });

        if (partnersError) throw partnersError;

        setContent(contentData);
        setPartners(partnersData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (!content) return null;

  return (
    <>
      <Header />

      <main className="relative min-h-screen pt-16 pb-24 bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-[#3D3B4A] mb-6"
            >
              {content.title}
              <div className="h-1 w-24 bg-[#EEC71B] mx-auto mt-4" />
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              {content.subtitle}
            </motion.p>
          </motion.div>

          {/* Featured Partners Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          >
            {partners
              .filter((p) => p.is_featured)
              .map((partner) => (
                <PartnerCard key={partner.id} partner={partner} />
              ))}
          </motion.div>

          {/* Partnership Benefits */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-bold text-center text-[#3D3B4A] mb-12"
            >
              Partnerības Priekšrocības
            </motion.h2>
            <FeatureGrid />
          </motion.section>

          {/* Other Partners */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-bold text-center text-[#3D3B4A] mb-12"
            >
              Tehnoloģiju Partneri
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partners
                .filter((p) => !p.is_featured)
                .map((partner) => (
                  <PartnerCard key={partner.id} partner={partner} />
                ))}
            </div>
          </motion.section>

          {/* Contact Section */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-[#3D3B4A] text-white rounded-xl p-8 md:p-12"
          >
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Kļūstiet par Partneri</h2>
              <p className="text-gray-300 mb-8">{content.contact_info}</p>
              <p className="text-[#EEC71B] font-mono">
                partnerships@webworks.lv
              </p>
            </div>
          </motion.section>
        </div>
      </main>

      <Footer />

      <Script
        id="schema-script"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "WebWorks",
            description: content.main_description,
            url: "https://www.webworks.lv/partneri",
            partner: partners.map((partner) => ({
              "@type": "Organization",
              name: partner.name,
              description: partner.description,
              url: partner.website_url,
              location: partner.location,
              foundingDate: partner.established_year.toString(),
            })),
          }),
        }}
      />
    </>
  );
};

export default Partners;
