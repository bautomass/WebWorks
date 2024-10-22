import React, { useState, useEffect, useCallback, memo } from "react";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaHome,
  FaImage,
  FaUser,
  FaEnvelope,
  FaArrowRight,
  FaBars,
  FaTimes,
  FaCalendar,
  FaClock,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const NAV_ITEMS = [
  { id: "home", icon: FaHome, label: "Sākums" },
  { id: "gallery", icon: FaImage, label: "Galerija" },
  { id: "about", icon: FaUser, label: "Par Mums" },
  { id: "contact", icon: FaEnvelope, label: "Kontakti" },
];

const ModernArtisticPortfolio = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsSidebarOpen(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((item) => item.id);
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.1);
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(139, 92, 246, 0.5);
        border-radius: 3px;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <section className="relative w-full bg-black text-white h-[800px]">
      <div className="relative h-full overflow-hidden">
        {/* Sidebar */}
        {isMobile && (
          <button
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="absolute top-4 left-4 z-50 p-2 rounded-full bg-purple-500/80 text-white"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        )}

        <motion.nav
          initial={false}
          animate={{
            width: isMobile
              ? isSidebarOpen
                ? "100%"
                : "4rem"
              : isSidebarOpen
              ? "16rem"
              : "4rem",
            x: isMobile && !isSidebarOpen ? "-100%" : 0,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onHoverStart={() => !isMobile && setIsSidebarOpen(true)}
          onHoverEnd={() => !isMobile && setIsSidebarOpen(false)}
          className="absolute left-0 top-0 h-full bg-gradient-to-b from-purple-900/90 to-black/90 
                   backdrop-blur-lg border-r border-white/10 z-40"
        >
          <div className="h-full flex flex-col p-6">
            <motion.div
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 
                       bg-clip-text text-transparent mb-12"
              animate={{ opacity: isSidebarOpen ? 1 : 0.7 }}
            >
              {isSidebarOpen ? "MākslasFolio" : "MF"}
            </motion.div>

            <ul className="space-y-8 flex-1">
              {NAV_ITEMS.map(({ id, icon: Icon, label }) => (
                <motion.li key={id} whileHover={{ x: 10 }}>
                  <a
                    href={`#${id}`}
                    className="flex items-center space-x-4 group relative"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById(id)
                        ?.scrollIntoView({ behavior: "smooth" });
                      isMobile && setIsSidebarOpen(false);
                    }}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        activeSection === id
                          ? "text-purple-400"
                          : "text-white/70"
                      }`}
                    />
                    <motion.span
                      animate={{ opacity: isSidebarOpen ? 1 : 0 }}
                      className="font-medium text-white/70 group-hover:text-purple-400 
                               transition-colors whitespace-nowrap"
                    >
                      {label}
                    </motion.span>
                    {activeSection === id && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute left-0 w-1 h-6 bg-purple-400 rounded-r-full"
                      />
                    )}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="flex space-x-4 justify-center">
              {[FaInstagram, FaTwitter, FaFacebookF].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -3 }}
                  className="text-white/70 hover:text-purple-400 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.nav>

        {/* Main Content */}
        <main
          className={`${
            isMobile ? "ml-0" : "ml-16"
          } h-full custom-scrollbar overflow-y-auto`}
        >
          {/* Hero Section */}
          <section
            id="home"
            className="min-h-screen relative flex items-center px-4 md:px-8 py-20"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-black/20" />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute top-1/4 right-1/4 w-48 md:w-96 h-48 md:h-96 bg-purple-500/30 
                         rounded-full blur-3xl"
              />
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  rotate: [0, -90, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute bottom-1/4 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-pink-500/30 
                         rounded-full blur-3xl"
              />
            </div>

            <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h1 className="text-5xl md:text-8xl font-bold tracking-tighter">
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      MĀKSLA
                    </span>
                  </h1>
                  <h2 className="text-4xl md:text-6xl font-bold text-white/90">
                    PASAULĒ
                  </h2>
                </div>
                <p className="text-lg md:text-xl text-white/70 max-w-xl">
                  Piedzīvojiet radošuma un tehnoloģiju saplūšanu mūsu
                  ekskluzīvajā mākslas izstādē. Vieta, kur digitālā satiekas ar
                  tradicionālo.
                </p>
                <div className="space-y-2">
                  <div className="text-3xl md:text-4xl font-bold text-purple-400">
                    15. aprīlis
                  </div>
                  <div className="text-xl md:text-2xl text-white/60">2025</div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 
                           rounded-full flex items-center justify-center md:justify-start space-x-3 
                           group hover:shadow-lg hover:shadow-purple-500/20 transition-all"
                >
                  <span>Pievienoties Izstādei</span>
                  <FaArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </motion.button>
              </motion.div>

              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 gap-4 md:gap-6"
              >
                {[1, 2, 3, 4].map((index) => (
                  <motion.div
                    key={index}
                    whileHover={{
                      scale: 1.05,
                      rotate: index % 2 === 0 ? 5 : -5,
                    }}
                    className={index === 4 ? "col-span-1" : ""}
                  >
                    {index < 4 ? (
                      <div
                        className="relative overflow-hidden rounded-2xl bg-gradient-to-br 
                                    from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-white/10"
                      >
                        <img
                          src={`/images/artwork-${index}.svg`}
                          alt={`Mākslas darbs ${index}`}
                          className="w-full h-48 md:h-64 object-contain mix-blend-overlay opacity-75"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      </div>
                    ) : (
                      <div
                        className="relative overflow-hidden rounded-2xl bg-gradient-to-br 
                                  from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-white/10 
                                  h-48 md:h-64"
                      >
                        <div className="absolute inset-0 p-6 flex flex-col justify-between">
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2 text-purple-400">
                              <FaCalendar className="w-5 h-5" />
                              <span className="font-medium">
                                Tuvākais Notikums
                              </span>
                            </div>
                            <h3
                              className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 
                                         to-pink-400 bg-clip-text text-transparent"
                            >
                              Digitālās Mākslas Nakts
                            </h3>
                            <p className="text-white/70 text-sm md:text-base line-clamp-2">
                              Ekskluzīvs nakts pasākums ar projection mapping un
                              interaktīvām instalācijām
                            </p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-white/60">
                              <FaClock className="w-4 h-4" />
                              <span className="text-sm">20:00 - 02:00</span>
                            </div>
                            <div className="flex items-center space-x-2 text-white/60">
                              <FaMapMarkerAlt className="w-4 h-4" />
                              <span className="text-sm">Vecrīga, Rīga</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Gallery Section */}
          <section id="gallery" className="py-20 px-4 md:px-8 bg-black/90">
            <div className="max-w-7xl mx-auto space-y-12">
              <motion.h2
                variants={contentVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r 
                          from-purple-400 to-pink-400 bg-clip-text text-transparent"
              >
                Populārākie Darbi
              </motion.h2>

              <motion.div
                variants={contentVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {Array.from({ length: 3 }).map((_, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="relative group"
                  >
                    <div className="relative overflow-hidden rounded-xl">
                      <img
                        src={`/images/artwork-${index + 1}.svg`}
                        alt={`Galerijas attēls ${index + 1}`}
                        className="w-full h-64 object-cover"
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 
            to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3
                            className="text-xl font-bold transform translate-y-4 
               group-hover:translate-y-0 transition-transform duration-300"
                          >
                            Mākslas Darbs {index + 1}
                          </h3>
                          <p
                            className="text-white/70 transform translate-y-4 
              group-hover:translate-y-0 transition-transform duration-300 delay-75"
                          >
                            Mākslinieks
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* About Section */}
          <section
            id="about"
            className="py-20 px-4 md:px-8 bg-gradient-to-b from-black to-purple-900/20"
          >
            <div className="max-w-7xl mx-auto">
              <motion.div
                variants={contentVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                <div className="space-y-6">
                  <h2
                    className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 
        to-pink-400 bg-clip-text text-transparent"
                  >
                    Par Mūsu Galeriju
                  </h2>
                  <p className="text-lg text-white/70">
                    MākslasFolio ir moderns mākslas centrs, kas apvieno
                    tradicionālo un digitālo mākslu. Mēs radām telpu, kur
                    mākslinieki var eksperimentēt ar jaunākajām tehnoloģijām,
                    vienlaikus saglabājot mākslas autentiskumu.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Interaktīvas mākslas instalācijas",
                      "Mākslinieku rezidences programmas",
                      "Digitālās mākslas darbnīcas",
                      "Regulāras izstādes un pasākumi",
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-3"
                      >
                        <div className="w-2 h-2 bg-purple-400 rounded-full" />
                        <span className="text-white/70">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full 
     flex items-center space-x-3 group hover:shadow-lg hover:shadow-purple-500/20 
     transition-all"
                  >
                    <span>Uzzināt Vairāk</span>
                    <FaArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </motion.button>
                </div>

                <motion.div
                  variants={contentVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="relative aspect-square rounded-2xl overflow-hidden"
                >
                  <div
                    className="absolute inset-4 rounded-xl overflow-hidden bg-gradient-to-br 
         from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-white/10"
                  >
                    <img
                      src="/images/artwork-2.svg"
                      alt="Galerijas telpa"
                      className="w-full h-full object-cover mix-blend-overlay"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div
                    className="absolute -right-4 -bottom-4 w-2/3 h-2/3 rounded-xl overflow-hidden 
         bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm 
         border border-white/10 transform rotate-6"
                  >
                    <img
                      src="/images/artwork-3.svg"
                      alt="Mākslas ekspozīcija"
                      className="w-full h-full object-cover mix-blend-overlay"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-20 px-4 md:px-8 bg-black/90">
            <div className="max-w-7xl mx-auto">
              <div className="text-center space-y-4 mb-12">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 
    to-pink-400 bg-clip-text text-transparent"
                >
                  Sazinies Ar Mums
                </motion.h2>
                <p className="text-white/70 max-w-2xl mx-auto">
                  Mēs vienmēr esam atvērti jaunām idejām un sadarbībām.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="grid gap-6">
                    {[
                      { icon: FaPhone, text: "+371 2x xxx xxx" },
                      { icon: FaEnvelope, text: "info@maksla.lv" },
                      { icon: FaMapMarkerAlt, text: "Rīga, Latvia" },
                      { icon: FaClock, text: "9:00 - 18:00" },
                    ].map(({ icon: Icon, text }, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-4 text-white/70"
                      >
                        <Icon className="w-5 h-5 text-purple-400" />
                        <span>{text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="max-w-xl mx-auto mt-8 p-6 bg-white/5 rounded-xl backdrop-blur-sm">
                  <div className="grid gap-6">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Vārds"
                        className="bg-white/10 rounded-lg p-3 text-white placeholder-white/50 
         focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                      <input
                        type="email"
                        placeholder="E-pasts"
                        className="bg-white/10 rounded-lg p-3 text-white placeholder-white/50 
         focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Tēma"
                      className="bg-white/10 rounded-lg p-3 text-white placeholder-white/50 
       focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <textarea
                      placeholder="Jūsu ziņojums"
                      rows={4}
                      className="bg-white/10 rounded-lg p-3 text-white placeholder-white/50 
       focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 
       rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/20 
       transition-all"
                    >
                      Sūtīt Ziņojumu
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </section>
  );
};

export default ModernArtisticPortfolio;
