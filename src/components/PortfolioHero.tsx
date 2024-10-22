import React, { useState, useEffect, useCallback, memo, type FC } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
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
} from "react-icons/fa";

// Types
type Section = "home" | "gallery" | "about" | "contact";

interface NavItem {
  readonly id: Section;
  readonly icon: typeof FaHome;
  readonly label: string;
}

// Animation variants
const sidebarVariants: Variants = {
  open: {
    width: "16rem",
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  closed: {
    width: "4rem",
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  mobileOpen: {
    width: "100%",
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  mobileClosed: {
    width: "4rem",
    x: "-100%",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Constants
const NAV_ITEMS: readonly NavItem[] = [
  { id: "home", icon: FaHome, label: "Sākums" },
  { id: "gallery", icon: FaImage, label: "Galerija" },
  { id: "about", icon: FaUser, label: "Par Mums" },
  { id: "contact", icon: FaEnvelope, label: "Kontakti" },
] as const;

// Custom hooks
const useScrollDetection = () => {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScroll = useCallback(() => {
    if (!isScrolling) {
      setIsScrolling(true);
      requestAnimationFrame(() => {
        const sections: Section[] = NAV_ITEMS.map((item) => item.id);
        const currentSection = sections.find((section) => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
          }
          return false;
        });
        if (currentSection) setActiveSection(currentSection);
        setIsScrolling(false);
      });
    }
  }, [isScrolling]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return activeSection;
};

// Memoized Components
const EventCard: FC<{ index: number }> = memo(({ index }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/50 
               to-pink-900/50 backdrop-blur-sm border border-white/10 h-48 md:h-64"
  >
    <div className="absolute inset-0 p-6 flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-purple-400">
          <FaCalendar className="w-5 h-5" />
          <span className="font-medium">Tuvākais Notikums</span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Digitālās Mākslas Nakts
        </h3>
        <p className="text-white/70 text-sm md:text-base line-clamp-2">
          Ekskluzīvs nakts pasākums ar projection mapping un interaktīvām
          instalācijām
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
  </motion.div>
));

const Sidebar: FC<{
  isOpen: boolean;
  isMobile: boolean;
  activeSection: Section;
  onToggle: () => void;
  onHover: (isHovered: boolean) => void;
}> = memo(({ isOpen, isMobile, activeSection, onToggle, onHover }) => (
  <>
    {isMobile && (
      <button
        onClick={onToggle}
        className="absolute top-4 left-4 z-50 p-2 rounded-full bg-purple-500/80 text-white"
        aria-label={isOpen ? "Aizvērt izvēlni" : "Atvērt izvēlni"}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
    )}

    <motion.nav
      initial={false}
      animate={
        isMobile
          ? isOpen
            ? "mobileOpen"
            : "mobileClosed"
          : isOpen
          ? "open"
          : "closed"
      }
      variants={sidebarVariants}
      onHoverStart={() => !isMobile && onHover(true)}
      onHoverEnd={() => !isMobile && onHover(false)}
      className="absolute left-0 top-0 h-full bg-gradient-to-b from-purple-900/90 to-black/90 
                 backdrop-blur-lg border-r border-white/10 z-40 overflow-hidden"
    >
      <div className="h-full flex flex-col p-6">
        <motion.div
          className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-12"
          animate={{ opacity: isOpen ? 1 : 0.7 }}
        >
          {isOpen ? "MākslasFolio" : "MF"}
        </motion.div>

        <ul className="space-y-8 flex-1">
          {NAV_ITEMS.map(({ id, icon: Icon, label }) => (
            <motion.li key={id} whileHover={{ x: 10 }}>
              <a
                href={`#${id}`}
                className="flex items-center space-x-4 group relative"
                onClick={() => isMobile && onToggle()}
              >
                <Icon
                  className={`w-6 h-6 ${
                    activeSection === id ? "text-purple-400" : "text-white/70"
                  }`}
                />
                <motion.span
                  animate={{ opacity: isOpen ? 1 : 0 }}
                  className="font-medium tracking-wide text-white/70 group-hover:text-purple-400 
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

        <motion.div
          className="flex space-x-4"
          animate={{
            opacity: isOpen ? 1 : 0,
            justifyContent: isOpen ? "flex-start" : "center",
          }}
        >
          {[FaInstagram, FaTwitter, FaFacebookF].map((Icon, index) => (
            <motion.a
              key={index}
              href="#"
              whileHover={{ y: -3 }}
              className="text-white/70 hover:text-purple-400 transition-colors"
              aria-label={`Social media link ${index + 1}`}
            >
              <Icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </motion.nav>
  </>
));

const ModernArtisticPortfolio: FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const activeSection = useScrollDetection();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const isMobileView = window.innerWidth < 768;
        setIsMobile(isMobileView);
        if (!isMobileView) setIsSidebarOpen(false);
      }, 100);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleSidebarHover = useCallback(
    (isHovered: boolean) => {
      if (!isMobile) {
        setIsSidebarOpen(isHovered);
      }
    },
    [isMobile]
  );

  return (
    <div className="relative mx-auto bg-black text-white h-[800px] max-w-[1920px] overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        isMobile={isMobile}
        activeSection={activeSection}
        onToggle={toggleSidebar}
        onHover={handleSidebarHover}
      />

      <main className={`${isMobile ? "ml-0" : "ml-16"} h-full overflow-y-auto`}>
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
                Piedzīvojiet radošuma un tehnoloģiju saplūšanu mūsu ekskluzīvajā
                mākslas izstādē. Vieta, kur digitālā satiekas ar tradicionālo,
                veidojot rītdienas mākslas darbus.
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
                         rounded-full flex items-center justify-center md:justify-start space-x-3 group"
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
                  whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 5 : -5 }}
                  className={index === 4 ? "col-span-1" : ""}
                >
                  {index < 4 ? (
                    <div
                      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/50 
                                  to-pink-900/50 backdrop-blur-sm border border-white/10"
                    >
                      <img
                        src={`/images/artwork-3.svg`}
                        alt={`Mākslas darbs ${index}`}
                        className="w-full h-48 md:h-64 object-contain mix-blend-overlay opacity-75"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                  ) : (
                    <EventCard index={1} />
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
              className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
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
                      src={`/images/artwork-1.svg`}
                      alt={`Galerijas attēls ${index + 1}`}
                      className="w-full h-64 object-cover"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 
                                 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-xl font-bold">
                          Mākslas Darbs {index + 1}
                        </h3>
                        <p className="text-white/70">Mākslinieks</p>
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
                             flex items-center space-x-3 group"
                >
                  <span>Uzzināt Vairāk</span>
                  <FaArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </motion.button>
              </div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 },
                }}
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
          <div className="max-w-7xl mx-auto text-center space-y-8">
            <motion.h2
              variants={contentVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 
                          to-pink-400 bg-clip-text text-transparent"
            >
              Sazinies Ar Mums
            </motion.h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Mēs vienmēr esam atvērti jaunām idejām un sadarbībām. Sazinieties
              ar mums, lai uzzinātu vairāk par mūsu galerijām un pasākumiem.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ModernArtisticPortfolio;
