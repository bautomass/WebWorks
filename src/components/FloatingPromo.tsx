"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import {
  FiChevronRight,
  FiX,
  FiCheck,
  FiStar,
  FiCode,
  FiLayout,
  FiZap,
  FiTrendingUp,
  FiSmartphone,
  FiShoppingCart,
  FiSearch,
  FiUsers,
} from "react-icons/fi";

interface Advantage {
  title: string;
  description: string;
  icon: React.ReactElement;
}

const advantages: ReadonlyArray<Advantage> = [
  {
    title: "Inovatīvas Tehnoloģijas",
    description:
      "Mēs izmantojam jaunākās nozares tehnoloģijas, lai radītu pārsteidzošas, ātras un efektīvas tīmekļa vietnes, kas izceļas konkurentu vidū.",
    icon: <FiCode />,
  },
  {
    title: "Pielāgots Dizains",
    description:
      "Katrs projekts tiek veidots unikāli, atspoguļojot jūsu zīmola būtību un mērķauditorijas vajadzības. Mēs radām dizainu, kas piesaista un iedvesmo.",
    icon: <FiLayout />,
  },
  {
    title: "Optimizēta Veiktspēja",
    description:
      "Mūsu vietnes ir ātrās, drošās un optimizētas meklētājprogrammām, nodrošinot maksimālu redzamību, lietotāju apmierinātību un konversijas rādītājus.",
    icon: <FiZap />,
  },
  {
    title: "Nepārtraukta Inovācija",
    description:
      "Mēs pastāvīgi sekojam jaunākajām tendencēm un tehnoloģijām, lai nodrošinātu jums priekšrocības digitālajā pasaulē un palīdzētu jums vienmēr būt soli priekšā konkurentiem.",
    icon: <FiTrendingUp />,
  },
  {
    title: "Responsīvs Dizains",
    description:
      "Mūsu veidotās vietnes perfekti darbojas uz visām ierīcēm - datoriem, planšetēm un viedtālruņiem, nodrošinot nevainojamu lietotāju pieredzi visur.",
    icon: <FiSmartphone />,
  },
  {
    title: "E-komercijas Risinājumi",
    description:
      "Mēs piedāvājam jaudīgus un viegli lietojamus e-komercijas risinājumus, kas palīdzēs jums pārvērst jūsu tiešsaistes klātbūtni peļņu nesošā biznesā.",
    icon: <FiShoppingCart />,
  },
  {
    title: "SEO Optimizācija",
    description:
      "Mēs integrējam labākās SEO prakses katrā vietnē, ko veidojam, palīdzot jums sasniegt augstākas pozīcijas meklētājprogrammās un piesaistīt vairāk potenciālo klientu.",
    icon: <FiSearch />,
  },
  {
    title: "Lietotāju Pieredzes Fokuss",
    description:
      "Mēs koncentrējamies uz lietotāju pieredzi, radot intuitīvas un patīkamas vietnes, kas veicina ilgāku apmeklējuma laiku un augstākas konversijas.",
    icon: <FiUsers />,
  },
];

const keyPoints: ReadonlyArray<string> = [
  "Pieredzējuša komanda ar plašu nozares pieredzi",
  "Individuāla pieeja katram klientam un projektam",
  "Ātra un efektīva projektu īstenošana",
  "Pēcprojekta atbalsts un uzturēšana",
  "Konkurētspējīgas cenas un elastīgi maksājumu plāni",
  "Modernās tehnoloģijas un inovatīvi risinājumi",
  "24/7 klientu atbalsts un konsultācijas",
  "Regulāri projekta progresa atjauninājumi",
  "Integrācija ar populārākajām trešo pušu platformām",
  "Drošības auditi un pastāvīga uzraudzība",
  "Pielāgoti CMS risinājumi vieglai satura pārvaldībai",
  "Detalizēta projekta dokumentācija un apmācība",
];

const FloatingPromo: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % advantages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const toggleExpand = useCallback(() => setIsExpanded((prev) => !prev), []);
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
    setIsExpanded(false);
  }, []);

  const showToast = useCallback((message: string) => {
    toast.success(message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }, []);

  const memoizedAdvantages = useMemo(() => advantages, []);
  const memoizedKeyPoints = useMemo(() => keyPoints, []);

  return (
    <>
      <motion.div
        className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50"
        initial={{ x: "-70%" }}
        animate={{ x: isExpanded ? 0 : "-70%" }}
        transition={{
          duration: 0.4,
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
      >
        <motion.div
          className="bg-gradient-to-r from-[#8CB8B4] to-[#3D3B4A] text-white p-4 sm:p-6 rounded-r-3xl shadow-2xl cursor-pointer relative overflow-hidden"
          style={{ width: isExpanded ? "18rem" : "7rem", height: "4.5rem" }}
          whileHover={{ scale: 1.05 }}
          onMouseEnter={toggleExpand}
          onMouseLeave={() => !isOpen && setIsExpanded(false)}
          onClick={toggleOpen}
          aria-label="Atklāt web izstrādes noslēpumus"
          role="button"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#EEC71B] to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            style={{ opacity: 0.2 }}
          />
          <div className="flex items-center h-full relative z-10">
            <motion.div
              animate={{
                rotate: isExpanded ? 0 : 360,
                x: isExpanded ? 0 : -20,
                opacity: isExpanded ? 1 : 0,
              }}
              transition={{ duration: 0.5 }}
              className="mr-2 sm:mr-4"
            >
              <FiStar
                className="text-3xl sm:text-4xl text-[#EEC71B]"
                aria-hidden="true"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isExpanded ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="whitespace-nowrap overflow-hidden"
            >
              <p className="font-bold text-sm sm:text-xl mb-1">
                Atklājiet maģiju
              </p>
              <p className="text-xs sm:text-sm text-[#EEC71B]">
                Web izstrādes noslēpumi
              </p>
            </motion.div>
          </div>
          <AnimatePresence>
            {!isExpanded && (
              <motion.div
                className="absolute inset-y-0 right-0 flex items-center justify-center w-8 sm:w-10"
                initial={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                >
                  <FiChevronRight
                    className="text-3xl sm:text-4xl text-[#EEC71B]"
                    aria-hidden="true"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-br from-[#8CB8B4] to-[#3D3B4A] rounded-2xl sm:rounded-3xl p-4 sm:p-8 w-full max-w-[90vw] sm:max-w-6xl relative overflow-hidden shadow-2xl text-white"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={toggleOpen}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-[#EEC71B] transition-colors duration-200"
                aria-label="Aizvērt"
              >
                <FiX className="text-2xl sm:text-3xl" aria-hidden="true" />
              </button>
              <h2 className="text-2xl sm:text-5xl font-bold mb-4 sm:mb-8 text-center text-[#EEC71B]">
                Mūsu Web Izstrādes Maģija
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-4 sm:mb-8">
                <div className="relative h-64 sm:h-96 bg-white bg-opacity-10 rounded-xl sm:rounded-2xl p-4 sm:p-6 overflow-hidden shadow-xl">
                  {memoizedAdvantages.map((advantage, index) => (
                    <motion.div
                      key={index}
                      className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-center"
                      initial={{ opacity: 0, x: "100%" }}
                      animate={{
                        opacity: index === activeIndex ? 1 : 0,
                        x: index === activeIndex ? 0 : "100%",
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <div
                        className="text-3xl sm:text-6xl mb-2 sm:mb-4 text-[#EEC71B]"
                        aria-hidden="true"
                      >
                        {advantage.icon}
                      </div>
                      <h3 className="text-lg sm:text-2xl font-semibold mb-2 sm:mb-4 text-[#EEC71B]">
                        {advantage.title}
                      </h3>
                      <p className="text-sm sm:text-lg text-white">
                        {advantage.description}
                      </p>
                    </motion.div>
                  ))}
                  <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 flex justify-center space-x-2">
                    {memoizedAdvantages.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-200 ${
                          index === activeIndex ? "bg-[#EEC71B]" : "bg-gray-400"
                        }`}
                        onClick={() => setActiveIndex(index)}
                        aria-label={`Rādīt ${advantages[index].title}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
                  <h3 className="text-lg sm:text-2xl font-semibold mb-2 sm:mb-4 text-[#EEC71B]">
                    Mūsu Atšķirības
                  </h3>
                  <ul className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-80 overflow-y-auto pr-2 sm:pr-4 styled-scrollbar">
                    {memoizedKeyPoints.map((point, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <FiCheck
                          className="text-[#EEC71B] mr-2 mt-1 flex-shrink-0 text-sm sm:text-base"
                          aria-hidden="true"
                        />
                        <span className="text-white text-sm sm:text-base">
                          {point}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                <Link
                  href="/apreksinat-aptuvenu-lapas-izmaksas-cenu"
                  className="bg-[#EEC71B] text-[#3D3B4A] font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-full text-sm sm:text-base transition duration-300 transform hover:scale-105 hover:shadow-lg flex items-center"
                  aria-label="Aprēķināt aptuvenu lapas izmaksu cenu"
                >
                  Aprēķināt Cenu
                </Link>
                <Link
                  href="/sakt-projekta-skici"
                  className="bg-[#8CB8B4] text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-full text-sm sm:text-base transition duration-300 transform hover:scale-105 hover:shadow-lg flex items-center"
                  aria-label="Sākt projekta skici"
                >
                  Sākt Projekta Skici
                </Link>
                <button
                  onClick={() =>
                    showToast("Paldies! Mēs ar jums sazināsimies drīzumā.")
                  }
                  className="bg-white text-[#3D3B4A] font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-full text-sm sm:text-base transition duration-300 transform hover:scale-105 hover:shadow-lg flex items-center"
                  aria-label="Sazināties ar mums"
                >
                  Sazinies ar Mums
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .styled-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .styled-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }
        .styled-scrollbar::-webkit-scrollbar-thumb {
          background-color: #eec71b;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>

      <ToastContainer />
    </>
  );
};

export default React.memo(FloatingPromo);
