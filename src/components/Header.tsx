"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import {
  FiMonitor,
  FiSmartphone,
  FiShoppingCart,
  FiSearch,
  FiBarChart,
  FiLayers,
  FiShield,
  FiRefreshCw,
  FiTag,
  FiMail,
  FiDatabase,
  FiImage,
  FiType,
  FiDroplet,
  FiGrid,
  FiLayout,
  IconType,
} from "react-icons/fi";
import { BiCookie } from "react-icons/bi";

interface DropdownItem {
  name: string;
  href: string;
  description: string;
  icon: IconType;
}

interface MenuItem {
  name: string;
  href: string;
  dropdown?: DropdownItem[];
}

const menuItems: MenuItem[] = [
  { name: "Sākums", href: "/" },
  { name: "Par mums", href: "/about-us" },
  { name: "Konsultācija", href: "/consultation" },
  {
    name: "Rīki",
    href: "#",
    dropdown: [
      {
        name: "Meta Tagu Rīks",
        href: "/meta-tag-creator-tool",
        description:
          "Pārbaudiet savas vietnes saderību ar populārākajiem pārlūkiem, lai nodrošinātu nevainojamu lietotāju pieredzi",
        icon: FiTag,
      },
      {
        name: "E-pastu Validācijas Rīks",
        href: "/email-validator-tool",
        description: "Pārbaudiet e-pasta adrešu derīgumu, formātu un kvalitāti",
        icon: FiMail,
      },
      {
        name: "Strukturēto Datu Rīks",
        href: "/local-business-schema-generator",
        description:
          "Izveidojiet strukturētu datu marķējumu savam vietējam biznesam, lai uzlabotu tā redzamību meklētājprogrammās",
        icon: FiDatabase,
      },
      {
        name: "Attēlu Rediģēšanas Rīks",
        href: "/attelu-kompresija-nezaudejot-kvalitati",
        description:
          "Optimizējiet un kompresējiet attēlus, saglabājot to kvalitāti tīmekļa vietnēm",
        icon: FiImage,
      },
      {
        name: "Fontu Pāru Ieteicējs",
        href: "/typography-pairing-tool",
        description: "Atklājiet ideālās fontu kombinācijas jūsu projektiem",
        icon: FiType,
      },
      {
        name: "Sīkdatņu Piekrišanas Rīks",
        href: "/cookie-consent-generator",
        description:
          "Izveidojiet profesionālus, pielāgotus un GDPR atbilstošus sīkdatņu piekrišanas paziņojumus",
        icon: BiCookie,
      },
      {
        name: "Krāsu Palešu Ģenerators",
        href: "/generate-color-pallets-for-web-development",
        description:
          "Radiet harmoniski saskaņotas krāsu paletes dizaina projektiem un mājaslapām",
        icon: FiDroplet,
      },
      {
        name: "CSS Flexbox Ģenerators",
        href: "/flex-box-generator",
        description:
          "Ērti izveidojiet un pielāgojiet CSS Flexbox izkārtojumus, lai uzlabotu tīmekļa vietnes elastību un dizainu",
        icon: FiGrid,
      },
      {
        name: "CSS Grid Ģenerators",
        href: "/css-grid-layout-generator",
        description:
          "Ģenerējiet un optimizējiet sarežģītus CSS Grid izkārtojumus, lai radītu izteiksmīgus un pielāgojamus tīmekļa dizainus",
        icon: FiLayout,
      },
    ],
  },
  {
    name: "Pakalpojumi",
    href: "#",
    dropdown: [
      {
        name: "Web Izstrāde",
        href: "/pakalpojumi/web-izstrade",
        description: "Modernas un efektīvas mājaslapas izstrāde",
        icon: FiMonitor,
      },
      {
        name: "E-Komercija",
        href: "/pakalpojumi/e-komercija",
        description: "Pilnvērtīgu e-komercijas risinājumu izveide",
        icon: FiShoppingCart,
      },
      {
        name: "Mobīlo Aplikāciju Izstrāde",
        href: "/pakalpojumi/mobilo-aplikaciju-izstrade",
        description: "iOS un Android aplikāciju izstrāde",
        icon: FiSmartphone,
      },
      {
        name: "SEO Optimizācija",
        href: "/pakalpojumi/seo-optimizacija",
        description: "Meklētājprogrammu optimizācijas pakalpojumi",
        icon: FiSearch,
      },
      {
        name: "Digitālā Mārketinga Pakalpojumi",
        href: "/pakalpojumi/digitalais-marketings",
        description: "Visaptveroši digitālā mārketinga risinājumi",
        icon: FiBarChart,
      },
      {
        name: "Web Aplikāciju Izstrāde",
        href: "/pakalpojumi/web-aplikacijas",
        description: "Pielāgotu web aplikāciju izstrāde",
        icon: FiLayers,
      },
    ],
  },
  { name: "Faq", href: "/faq-page" },
  { name: "Blog", href: "/blog" },
  { name: "Kontakti", href: "/contact-us" },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { scrollY } = useScroll();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY <= 150) {
        setIsVisible(true);
      } else if (scrollY.get() > 100) {
        setIsVisible(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [scrollY]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest <= 100) {
      setIsVisible(true);
    } else if (latest > 100 && !isVisible) {
      setIsVisible(false);
    }
  });

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#F3F5F4] py-4 px-6 flex justify-between items-center relative overflow-visible"
      >
        <div className="absolute inset-0 z-0 pointer-events-none">
          <GeoBackground />
        </div>
        <Link
          href="/"
          className="flex-shrink-0 relative z-10"
          aria-label="Go to homepage"
        >
          <Image
            src="/images/webworks.svg"
            alt="WebWorks Logo"
            width={240}
            height={80}
            className="transform hover:scale-105 transition-transform duration-300"
            priority
          />
        </Link>
        {isMobile ? (
          <BurgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        ) : (
          <nav
            className="flex items-center space-x-6 relative z-10"
            aria-label="Main navigation"
          >
            <NavItems />
            <CtaButton />
          </nav>
        )}
        <div className="absolute bottom-0 left-0 right-0 z-0 h-2">
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#8CB8B4] via-[#EEC71B] to-[#CF4B43] border-b-2 border-solid animate-border-gradient"
            aria-hidden="true"
          />
        </div>
        {!isVisible && (
          <div
            className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-[#EEC71B] text-[#3D3B4A] px-4 py-2 rounded-b-md shadow-md text-sm font-medium"
            role="alert"
          >
            Scroll up or move cursor to top to see menu
          </div>
        )}
      </motion.header>
      {isMobile && <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
};

const GeoBackground: React.FC = React.memo(() => (
  <div className="w-full h-full grid grid-cols-3 grid-rows-1">
    {[...Array(12)].map((_, i) => (
      <div key={i} className="relative overflow-hidden h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8CB8B4] to-[#EEC71B] opacity-10 transform rotate-45" />
        <svg
          className="absolute w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polygon
            points="0,100 100,0 100,100"
            fill="#CF4B43"
            fillOpacity="0.05"
          />
        </svg>
      </div>
    ))}
  </div>
));

GeoBackground.displayName = "GeoBackground";

const NavItems: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isMovingToDropdown, setIsMovingToDropdown] = useState(false);

  const handleMouseEnter = (itemName: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpenDropdown(itemName);
  };

  const handleMouseLeave = (event: React.MouseEvent) => {
    const relatedTarget = event.relatedTarget as Element | null;
    const isMovingToDropdownContent = relatedTarget?.closest('[role="menu"]');

    if (isMovingToDropdownContent) {
      setIsMovingToDropdown(true);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
      setIsMovingToDropdown(false);
    }, 100);
  };

  const handleDropdownMouseLeave = (event: React.MouseEvent) => {
    const relatedTarget = event.relatedTarget as Element | null;

    if (!relatedTarget) {
      timeoutRef.current = setTimeout(() => {
        setOpenDropdown(null);
        setIsMovingToDropdown(false);
      }, 100);
      return;
    }

    const isMovingToTrigger = relatedTarget.closest(
      'button[aria-haspopup="true"]'
    );

    if (!isMovingToTrigger) {
      timeoutRef.current = setTimeout(() => {
        setOpenDropdown(null);
        setIsMovingToDropdown(false);
      }, 100);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {menuItems.map((item) => (
        <div key={item.name} className="relative group">
          {item.dropdown ? (
            <>
              <button
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
                className="text-[#3D3B4A] font-extrabold group transition-colors duration-300 hover:text-[#8CB8B4] flex items-center uppercase text-base"
                aria-expanded={openDropdown === item.name}
                aria-haspopup="true"
              >
                {item.name}
                <svg
                  className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                    openDropdown === item.name ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <AnimatePresence>
                {openDropdown === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => handleMouseEnter(item.name)}
                    onMouseLeave={handleDropdownMouseLeave}
                    className="fixed left-0 right-0 mt-0 bg-white shadow-lg py-6 z-50 border-t-4 border-[#8CB8B4]"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby={`${item.name}-menu`}
                  >
                    <div className="container mx-auto px-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-150 border border-gray-200 hover:border-[#8CB8B4] group"
                            role="menuitem"
                          >
                            <div className="flex items-center mb-2">
                              <span
                                className="text-[#8CB8B4] mr-2"
                                aria-hidden="true"
                              >
                                <dropdownItem.icon className="w-6 h-6" />
                              </span>
                              <h3 className="text-lg font-semibold text-[#3D3B4A] group-hover:text-[#8CB8B4] transition-colors duration-150">
                                {dropdownItem.name}
                              </h3>
                            </div>
                            <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-150">
                              {dropdownItem.description}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <Link
              href={item.href}
              className="text-[#3D3B4A] font-extrabold group transition-colors duration-300 hover:text-[#8CB8B4] uppercase text-base"
            >
              {item.name}
            </Link>
          )}
          <span
            className="absolute left-0 bottom-0 w-full h-0.5 bg-[#EEC71B] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
            aria-hidden="true"
          />
        </div>
      ))}
    </>
  );
};

const CtaButton: React.FC = React.memo(() => (
  <Link
    href="/sakt-projekta-skici"
    className="bg-[#8CB8B4] text-[#3D3B4A] px-6 py-2 rounded-lg hover:bg-[#EEC71B] transition-colors duration-300 relative overflow-hidden group shadow-md font-bold"
    aria-label="Saņemt piedāvājumu"
  >
    <span className="relative z-10">Saņemt piedāvājumu</span>
    <span
      className="absolute inset-0 bg-[#CF4B43] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"
      aria-hidden="true"
    />
  </Link>
));

CtaButton.displayName = "CtaButton";

interface BurgerMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = React.memo(
  ({ isOpen, setIsOpen }) => (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="lg:hidden flex flex-col justify-center items-center w-10 h-10 relative z-50"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      <span
        className={`bg-[#3D3B4A] h-0.5 w-6 rounded-sm transition-all duration-300 ${
          isOpen ? "rotate-45 translate-y-1.5" : ""
        }`}
        aria-hidden="true"
      />
      <span
        className={`bg-[#3D3B4A] h-0.5 w-6 rounded-sm my-1 transition-all duration-300 ${
          isOpen ? "opacity-0" : ""
        }`}
        aria-hidden="true"
      />
      <span
        className={`bg-[#3D3B4A] h-0.5 w-6 rounded-sm transition-all duration-300 ${
          isOpen ? "-rotate-45 -translate-y-1.5" : ""
        }`}
        aria-hidden="true"
      />
    </button>
  )
);

BurgerMenu.displayName = "BurgerMenu";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, setIsOpen }) => {
  const menuVariants = {
    closed: { opacity: 0, x: "100%" },
    open: { opacity: 1, x: 0 },
  };

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 bg-white/95 backdrop-blur-md shadow-lg p-6 flex flex-col z-50 overflow-y-auto lg:hidden"
          aria-label="Mobile menu"
        >
          <div className="flex justify-between items-center mb-8">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              aria-label="Go to homepage"
            >
              <Image
                src="/images/webworks.svg"
                alt="WebWorks Logo"
                width={180}
                height={60}
                className="w-48 h-auto"
              />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#3D3B4A] hover:text-[#8CB8B4] transition-colors duration-300"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col items-center space-y-6 mt-8">
            {menuItems.map((item, index) => (
              <div key={item.name} className="w-full">
                {item.dropdown ? (
                  <div>
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === item.name ? null : item.name
                        )
                      }
                      className="text-[#3D3B4A] font-bold text-2xl flex items-center w-full justify-between border-b border-gray-200 pb-4"
                      aria-expanded={openDropdown === item.name}
                    >
                      <span className="flex items-center">
                        <span className="text-[#8CB8B4] mr-4 text-xl font-normal">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {item.name}
                      </span>
                      <svg
                        className={`w-6 h-6 text-[#8CB8B4] transition-transform duration-300 ${
                          openDropdown === item.name ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {openDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-2 ml-8 space-y-2 overflow-hidden"
                        >
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="block text-lg text-[#3D3B4A] hover:text-[#8CB8B4] transition-colors duration-150 py-2"
                              onClick={() => setIsOpen(false)}
                            >
                              <span className="flex items-center">
                                {dropdownItem.icon && (
                                  <dropdownItem.icon
                                    className="w-5 h-5 mr-2"
                                    aria-hidden="true"
                                  />
                                )}
                                {dropdownItem.name}
                              </span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="text-[#3D3B4A] font-bold text-2xl flex items-center w-full justify-between border-b border-gray-200 pb-4"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="flex items-center">
                      <span className="text-[#8CB8B4] mr-4 text-xl font-normal">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item.name}
                    </span>
                    <svg
                      className="w-6 h-6 text-[#8CB8B4]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Link
              href="/sakt-projekta-skici"
              className="bg-[#8CB8B4] text-[#3D3B4A] px-6 py-2 rounded-lg hover:bg-[#EEC71B] transition-colors duration-300 relative overflow-hidden group shadow-md font-bold"
              onClick={() => setIsOpen(false)}
              aria-label="Saņemt piedāvājumu"
            >
              <span className="relative z-10">Saņemt piedāvājumu</span>
              <span
                className="absolute inset-0 bg-[#CF4B43] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"
                aria-hidden="true"
              />
            </Link>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default React.memo(Header);
