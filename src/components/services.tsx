"use client";
import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaDesktop,
  FaUserTie,
  FaIdCard,
  FaBlog,
  FaMobileAlt,
  FaNewspaper,
  FaGamepad,
  FaInfoCircle,
  FaChevronDown,
} from "react-icons/fa";

// Import your hero components here
import EKomercijasHero from "./EKomercijasHero";
import StiligasMajaslapasHero from "./StiligasMajaslapasHero";
import PortfolioHero from "./PortfolioHero";
import VizitkarsuHero from "./VizitkarsuHero";
import BloguHero from "./BloguHero";
import ProgrammasHero from "./ProgrammasHero";
import ZinuLapuHero from "./ZinuLapuHero";
import IzklaidesHero from "./IzklaidesHero";

interface ServiceItem {
  title: string;
  icon: React.ElementType;
  component: React.ComponentType;
  hoverMessage: string;
}

const serviceItems: ServiceItem[] = [
  {
    title: "Izklaides lapu izstrāde",
    icon: FaGamepad,
    component: IzklaidesHero,
    hoverMessage: "Radiet aizraujošu izklaides pieredzi tiešsaistē!",
  },
  {
    title: "E-Veikalu izstrāde",
    icon: FaSearch,
    component: EKomercijasHero,
    hoverMessage: "Izveidojiet savu tiešsaistes veikalu ar mums!",
  },
  {
    title: "Mājaslapu izstrāde",
    icon: FaDesktop,
    component: StiligasMajaslapasHero,
    hoverMessage: "Iegūstiet modernu un efektīvu mājaslapu!",
  },
  {
    title: "Portfolio lapu izstrāde",
    icon: FaUserTie,
    component: PortfolioHero,
    hoverMessage: "Parādiet savu darbu vislabākajā gaismā!",
  },
  {
    title: "Vizītkaršu lapu izstrāde",
    icon: FaIdCard,
    component: VizitkarsuHero,
    hoverMessage:
      "Atstājiet neaizmirstamu iespaidu ar savu tiešsaistes vizītkarti!",
  },
  {
    title: "Blogu izstrāde",
    icon: FaBlog,
    component: BloguHero,
    hoverMessage: "Dalieties ar savām domām stilīgā blogā!",
  },
  {
    title: "Programmatūras izstrāde",
    icon: FaMobileAlt,
    component: ProgrammasHero,
    hoverMessage: "Pārvērtiet savas idejas realitātē ar mūsu programmatūru!",
  },
  {
    title: "Ziņu Lapu izstrāde",
    icon: FaNewspaper,
    component: ZinuLapuHero,
    hoverMessage: "Informējiet savus lasītājus ar modernu ziņu lapu!",
  },
];

function GeoBackground() {
  return (
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
  );
}

const Services: React.FC = () => {
  // Set initial active index to 0 to show the first service by default
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showGuidance, setShowGuidance] = useState(false);

  useEffect(() => {
    setShowGuidance(activeIndex === null);
  }, [activeIndex]);

  const handleTabClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="mx-auto px-2 sm:px-4 py-4 sm:py-8 md:py-16 bg-gradient-to-b from-white to-transparent">
      {showGuidance && (
        <div className="relative text-center mb-6 border-l-4 border-blue-500 text-black-700 rounded shadow-md overflow-hidden -z-5">
          <div className="absolute inset-0">
            <GeoBackground />
          </div>
          <div className="relative z-10 p-4">
            <FaInfoCircle className="inline mr-2 text-blue-500" />
            <span className="font-medium">
              Izvēlieties pakalpojumu, lai uzzinātu vairāk
            </span>
            <div className="mt-2 text-sm text-gray-600">
              Klikšķini uz ikonas un apskati paraugus
            </div>
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
            <FaChevronDown className="text-blue-500 text-3xl" />
          </div>
        </div>
      )}

      {/* Mobile view */}
      <div className="md:hidden">
        <div className="grid grid-cols-4 gap-2 mb-2">
          {serviceItems.map((item, index) => (
            <div
              key={index}
              className={`
                flex flex-col items-center justify-center p-2
                cursor-pointer font-bold text-gray-700
                transition-all duration-300 ease-in-out
                aspect-square rounded-lg relative
                ${
                  activeIndex === index
                    ? "text-blue-600 bg-white shadow-md z-10"
                    : "hover:bg-gray-100"
                }
              `}
              onClick={() => handleTabClick(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <item.icon
                className={`text-2xl ${
                  activeIndex === index ? "scale-110" : ""
                }`}
              />
              {hoveredIndex === index && (
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs p-2 rounded whitespace-nowrap z-[9999]">
                  {item.hoverMessage}
                </div>
              )}
              {activeIndex === index && (
                <div className="absolute -bottom-2 left-1/2 w-4 h-4 bg-white transform -translate-x-1/2 rotate-45 border-b border-r border-blue-600"></div>
              )}
            </div>
          ))}
        </div>
        {activeIndex !== null && (
          <div className="border-2 border-blue-600 p-2 rounded-lg shadow-md relative z-0 bg-white mt-4">
            {React.createElement(serviceItems[activeIndex].component)}
          </div>
        )}
      </div>

      {/* Desktop view */}
      <div className="hidden md:block">
        <div className="flex flex-nowrap justify-start space-x-4">
          {serviceItems.map((item, index) => (
            <div
              key={index}
              className={`
                flex flex-col items-center p-4 cursor-pointer font-bold text-gray-700
                transition-all duration-300 ease-in-out
                flex-1 text-center rounded-t-lg relative
                ${
                  activeIndex === index
                    ? "text-blue-600 bg-white border-2 border-blue-600 border-b-0 -mb-[2px] z-10"
                    : "hover:-translate-y-1"
                }
              `}
              onClick={() => handleTabClick(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <item.icon
                className={`text-4xl ${
                  activeIndex === index ? "scale-110" : ""
                }`}
              />
              <div className="text-xs md:text-sm mt-1">{item.title}</div>
              {hoveredIndex === index && (
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs p-2 rounded whitespace-nowrap z-[9999]">
                  {item.hoverMessage}
                </div>
              )}
            </div>
          ))}
        </div>
        {activeIndex !== null && (
          <div className="flex justify-between items-center border-2 border-blue-600 p-4 rounded-b-lg shadow-md relative z-0 bg-white">
            {React.createElement(serviceItems[activeIndex].component)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
