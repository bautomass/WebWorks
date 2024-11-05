"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../utils/supabase";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Script from "next/script";
import {
  FiUsers,
  FiAward,
  FiBriefcase,
  FiMail,
  FiHeart,
  FiArrowRight,
  FiLoader,
  FiCircle,
  FiCode,
  FiGithub,
  FiTerminal,
  FiServer,
} from "react-icons/fi";
import {
  fadeInUp,
  staggerContainer,
  scaleIn,
  float,
} from "@/utils/animationUtils";
import { JobCard, NoOpenings } from "../components/JobComponents";

type CareerContent = {
  title: string;
  subtitle: string;
  main_description: string;
  culture_description: string;
  values_description: string;
  contact_info: string;
};

type JobOpening = {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  experience_level: string;
  description: string;
  responsibilities: string;
  is_active: boolean;
};

const techStack = [
  { name: "React", icon: <FiCode />, color: "#61DAFB" },
  { name: "Node.js", icon: <FiTerminal />, color: "#339933" },
  { name: "TypeScript", icon: <FiCode />, color: "#3178C6" },
  { name: "Next.js", icon: <FiCode />, color: "#000000" },
  { name: "Python", icon: <FiTerminal />, color: "#3776AB" },
  { name: "AWS", icon: <FiServer />, color: "#FF9900" },
];
const navigationLinks = [
  { label: "Par Mums", id: "about" },
  { label: "Atvērtās Vakances", id: "openings" },
  { label: "Kultūra", id: "culture" },
  { label: "Vērtības", id: "values" },
  { label: "Kontakti", id: "contact" },
];
// Circuit pattern background
const CircuitBackground = () => (
  <div className="absolute inset-0 pointer-events-none opacity-10">
    <svg width="100%" height="100%" className="text-[#EEC71B]">
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

// Decorative background with gradient and grid
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

// Code-style decorative elements
const CodeElement = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="font-mono text-[#EEC71B] text-sm inline-block px-4 py-1 bg-[#3D3B4A]/10 rounded-md"
  >
    {children}
  </motion.div>
);

// Loading spinner with enhanced animation
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

// Enhanced value card with hover effects
const ValueCard = ({ icon: Icon, title, description }) => (
  <motion.div
    variants={fadeInUp}
    whileHover={{ scale: 1.02 }}
    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform border border-transparent hover:border-[#EEC71B]/20"
  >
    <div className="flex items-center space-x-4 mb-4">
      <div className="p-3 bg-[#EEC71B]/10 rounded-lg">
        <Icon className="text-[#EEC71B] text-2xl" />
      </div>
      <h3 className="text-xl font-semibold text-[#3D3B4A]">{title}</h3>
    </div>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </motion.div>
);

// Tech stack card component
const TechStackCard = ({ tech }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="flex items-center space-x-2 p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300"
  >
    <span className="text-[#EEC71B]">{tech.icon}</span>
    <span className="font-medium text-[#3D3B4A]">{tech.name}</span>
  </motion.div>
);
// Enhanced contact section with more visual appeal
const ContactSection = ({ contactInfo }) => (
  <motion.div
    variants={scaleIn}
    className="bg-[#3D3B4A] text-white rounded-xl p-8 md:p-12 relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-[#EEC71B]/20 to-transparent" />
    <CircuitBackground />
    <div className="relative z-10">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="max-w-3xl mx-auto"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3"
        >
          <FiMail className="text-[#EEC71B]" />
          <span>Sazinies ar Mums</span>
        </motion.h2>
        <motion.p variants={fadeInUp} className="text-lg mb-8 text-gray-300">
          {contactInfo}
        </motion.p>
        <motion.p variants={fadeInUp} className="text-[#EEC71B]">
          careers@webworks.lv
        </motion.p>
      </motion.div>
    </div>
  </motion.div>
);

const HeroSection = ({ title, subtitle }) => (
  <motion.section
    variants={staggerContainer}
    initial="initial"
    animate="animate"
    className="relative bg-[#3D3B4A] text-white py-20 rounded-2xl mb-16 overflow-hidden min-h-[500px] flex items-center justify-center"
  >
    <CircuitBackground />

    {/* Main content container */}
    <div className="relative z-10 text-center w-full max-w-4xl mx-auto px-4 flex flex-col items-center">
      {/* Top code element */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-mono text-[#EEC71B] text-sm mb-8"
      >
        {"<WebWorks>"}
      </motion.div>

      {/* Main content */}
      <motion.div variants={fadeInUp} className="space-y-8 mb-12">
        <motion.h1
          className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h1>

        {/* Animated subheadings */}
        <motion.div
          className="flex items-center justify-center gap-4 text-2xl md:text-3xl font-normal flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.span className="text-[#EEC71B]" whileHover={{ scale: 1.05 }}>
            Web Development
          </motion.span>
          <span className="text-gray-400">•</span>
          <motion.span className="text-[#EEC71B]" whileHover={{ scale: 1.05 }}>
            Innovation
          </motion.span>
          <span className="text-gray-400">•</span>
          <motion.span className="text-[#EEC71B]" whileHover={{ scale: 1.05 }}>
            Growth
          </motion.span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={fadeInUp}
          className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      </motion.div>

      {/* Bottom code element */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="font-mono text-[#EEC71B] text-sm mb-16"
      >
        {"</WebWorks>"}
      </motion.div>

      {/* Centered arrow */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-[#EEC71B] cursor-pointer hover:scale-110 transition-transform duration-300"
        >
          <FiArrowRight className="text-4xl rotate-90" />
        </motion.div>
      </div>
    </div>
  </motion.section>
);

// About section with tech stack
const AboutSection = ({ description }) => (
  <motion.section
    variants={scaleIn}
    initial="initial"
    whileInView="animate"
    viewport={{ once: true }}
    className="bg-white rounded-xl shadow-lg overflow-hidden"
  >
    <div className="grid md:grid-cols-2 gap-0">
      <div className="p-8 bg-gradient-to-br from-[#3D3B4A] to-[#4A4958] text-white">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FiCode className="text-[#EEC71B]" />
          <span>Par Mums</span>
        </h2>
        <p className="text-gray-200 leading-relaxed">{description}</p>
      </div>
      <div className="p-8 bg-white">
        <h3 className="text-xl font-semibold mb-6 text-[#3D3B4A] flex items-center gap-2">
          <FiTerminal className="text-[#EEC71B]" />
          <span>Mūsu Tech Stack</span>
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {techStack.map((tech) => (
            <TechStackCard key={tech.name} tech={tech} />
          ))}
        </div>
      </div>
    </div>
  </motion.section>
);
// Main Career component
const Career = () => {
  const [content, setContent] = useState<CareerContent | null>(null);
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        // Fetch career page content
        const { data: contentData, error: contentError } = await supabase
          .from("career_page_content")
          .select("*")
          .single();

        if (contentError) throw contentError;

        // Fetch active job openings
        const { data: jobsData, error: jobsError } = await supabase
          .from("job_openings")
          .select("*")
          .eq("is_active", true)
          .order("created_at", { ascending: false });

        if (jobsError) throw jobsError;

        setContent(contentData);
        setJobs(jobsData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  // Intersection Observer for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (!content) return null;

  const values = content.values_description
    .split("•")
    .filter(Boolean)
    .map((value) => value.trim());

  return (
    <>
      <DecorativeBackground />
      <Header />

      <main className="relative min-h-screen pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <HeroSection title={content.title} subtitle={content.subtitle} />

          {/* Quick Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center gap-4 mb-16 flex-wrap"
          >
            {navigationLinks.map((link) => (
              <motion.a
                key={link.id}
                href={`#${link.id}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? "bg-[#EEC71B] text-[#3D3B4A]"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.nav>

          {/* Main Content Sections */}
          <div className="space-y-16">
            {/* About Section */}
            <section id="about">
              <AboutSection description={content.main_description} />
            </section>

            {/* Job Openings Section */}
            <motion.section
              id="openings"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#EEC71B]/5 to-transparent" />
              <div className="relative">
                <motion.h2
                  variants={fadeInUp}
                  className="text-3xl font-bold text-[#3D3B4A] mb-8 text-center flex items-center justify-center gap-3"
                >
                  <FiBriefcase className="text-[#EEC71B]" />
                  <span>Atvērtās Vakances</span>
                  <motion.div
                    className="h-1 w-24 bg-[#EEC71B] absolute bottom-0 left-1/2 transform -translate-x-1/2"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.2 }}
                  />
                </motion.h2>

                <motion.div
                  variants={staggerContainer}
                  className="max-w-4xl mx-auto"
                >
                  {jobs.length > 0 ? (
                    <motion.div
                      variants={staggerContainer}
                      className="grid gap-6"
                    >
                      {jobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                      ))}
                    </motion.div>
                  ) : (
                    <NoOpenings />
                  )}
                </motion.div>
              </div>
            </motion.section>

            {/* Culture Section */}
            <motion.section
              id="culture"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-8 bg-gradient-to-br from-[#3D3B4A] to-[#4A4958] text-white">
                  <motion.h2
                    variants={fadeInUp}
                    className="text-3xl font-bold mb-6 flex items-center gap-3"
                  >
                    <FiUsers className="text-[#EEC71B]" />
                    <span>Mūsu Kultūra</span>
                  </motion.h2>
                  <motion.p
                    variants={fadeInUp}
                    className="text-gray-200 leading-relaxed"
                  >
                    {content.culture_description}
                  </motion.p>
                </div>
                <div className="p-8 relative overflow-hidden">
                  <CircuitBackground />
                  <div className="relative z-10">
                    <h3 className="text-2xl font-semibold mb-6 text-[#3D3B4A]">
                      Ko Mēs Piedāvājam
                    </h3>
                    <div className="space-y-4">
                      {[
                        "Profesionālās izaugsmes iespējas",
                        "Elastīgs darba grafiks",
                        "Veselības apdrošināšana",
                        "Moderns biroja aprīkojums",
                        "Regulāri team building pasākumi",
                      ].map((benefit, index) => (
                        <motion.div
                          key={index}
                          variants={fadeInUp}
                          className="flex items-center gap-3"
                        >
                          <span className="text-[#EEC71B]">✓</span>
                          <span>{benefit}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Values Section */}
            <motion.section
              id="values"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-xl bg-white shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#EEC71B]/10 to-white" />
              <div className="relative p-8">
                <motion.h2
                  variants={fadeInUp}
                  className="text-3xl font-bold text-[#3D3B4A] mb-8 text-center flex items-center justify-center gap-3"
                >
                  <FiHeart className="text-[#EEC71B]" />
                  <span>Mūsu Vērtības</span>
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {values.map((value, index) => (
                    <ValueCard
                      key={index}
                      icon={[FiAward, FiUsers, FiHeart, FiBriefcase][index % 4]}
                      title={value.split(":")[0]}
                      description={value.split(":")[1] || value}
                    />
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Contact Section */}
            <motion.section
              id="contact"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <ContactSection contactInfo={content.contact_info} />
            </motion.section>
          </div>
        </div>
      </main>

      <Footer />

      {/* Schema Markup */}
      <Script
        id="schema-script"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
              email: "careers@webworks.lv",
              sameAs: [
                "https://www.linkedin.com/company/webworks-latvia",
                "https://www.facebook.com/webworks.lv",
                "https://github.com/webworks-lv",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Careers Inquiries",
                email: "careers@webworks.lv",
                availableLanguage: ["en", "lv"],
              },
            },
          }),
        }}
      />
    </>
  );
};

export default Career;
