"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiFacebook,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiArrowUp,
  FiCoffee,
  FiHeart,
  FiAward,
} from "react-icons/fi";

const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const JsonLd: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "http://schema.org",
      "@type": "Organization",
      name: "WebWorks",
      url: "https://www.webworks.lv",
      logo: "https://www.webworks.lv/logo.png",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+371-26282630",
          contactType: "customer service",
        },
      ],
      sameAs: [
        "https://www.facebook.com/webworks",
        "https://www.linkedin.com/company/webworks",
        "https://www.twitter.com/webworks",
        "https://www.instagram.com/webworks",
      ],
    });
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement newsletter signup logic here
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      icon: FiFacebook,
      href: "https://facebook.com/webworks",
      label: "Facebook",
    },
    {
      icon: FiLinkedin,
      href: "https://linkedin.com/company/webworks",
      label: "LinkedIn",
    },
    { icon: FiTwitter, href: "https://twitter.com/webworks", label: "Twitter" },
    {
      icon: FiInstagram,
      href: "https://instagram.com/webworks",
      label: "Instagram",
    },
  ];

  const services = [
    "Web Izstrade",
    "E-komercija",
    "Mobilo Aplikaciju Izstrade",
    "SEO Optimizacija",
    "Digitalais Marketings",
  ];

  const blogPosts = [
    "5 SEO Padomi Jūsu Biznesam",
    "Kā Izvēlēties Labāko E-komercijas Platformu",
    "Web Dizaina Tendences 2024. Gadā",
  ];

  const awards = [
    "Best Web Design Agency 2023",
    "Top E-commerce Solution Provider",
    "Innovation in Digital Marketing",
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-gradient-to-br from-[#3D3B4A] to-[#2C2A35] text-white py-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8"
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
          <motion.div variants={sectionVariants}>
            <h3 className="text-2xl font-bold mb-4 text-[#EEC71B]">
              Par WebWorks
            </h3>
            <p className="mb-4 text-gray-300">
              Mēs esam digitālās transformācijas eksperti, kas palīdz uzņēmumiem
              augt un attīstīties tiešsaistē.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="bg-white bg-opacity-10 p-2 rounded-full"
                  whileHover={{
                    scale: 1.2,
                    rotate: 360,
                    backgroundColor: "#EEC71B",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <link.icon className="text-2xl" />
                </motion.a>
              ))}
            </div>
          </motion.div>
          <motion.div variants={sectionVariants}>
            <h3 className="text-2xl font-bold mb-4 text-[#EEC71B]">
              Mūsu Pakalpojumi
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
          <motion.div variants={sectionVariants}>
            <h3 className="text-2xl font-bold mb-4 text-[#EEC71B]">
              Jaunākie Raksti
            </h3>
            <ul className="space-y-2">
              {blogPosts.map((post, index) => (
                <motion.li key={index} whileHover={{ x: 5 }} className="group">
                  <Link
                    href={`/blog/${slugify(post)}`}
                    className="hover:text-[#EEC71B] transition-colors duration-300 flex items-center"
                  >
                    <FiHeart className="mr-2 group-hover:scale-125 transition-transform duration-300" />
                    {post}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
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
                />
                <motion.button
                  type="submit"
                  className="bg-[#EEC71B] text-[#3D3B4A] px-4 py-2 rounded-r-md hover:bg-opacity-90 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Iesniegt e-pastu"
                >
                  <FiMail />
                </motion.button>
              </div>
            </form>
            <motion.div
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h4 className="text-lg font-semibold mb-2">Mūsu Apbalvojumi</h4>
              <ul className="space-y-2">
                {awards.map((award, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center text-sm text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <FiAward className="mr-2 text-[#EEC71B]" />
                    {award}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div
          className="border-t border-gray-700 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>&copy; 2024 WebWorks. Visas tiesības aizsargātas.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              href="/privatuma-politika"
              className="hover:text-[#EEC71B] transition-colors duration-300"
            >
              Privātuma Politika
            </Link>
            <Link
              href="/lietosanas-noteikumi"
              className="hover:text-[#EEC71B] transition-colors duration-300"
            >
              Lietošanas Noteikumi
            </Link>
          </div>
        </motion.div>
      </div>
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-[#EEC71B] text-[#3D3B4A] p-3 rounded-full shadow-lg z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 0px 8px rgba(238, 199, 27, 0.8)",
            }}
            whileTap={{ scale: 0.9 }}
          >
            <FiArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
      <JsonLd />
    </footer>
  );
};

export default Footer;
