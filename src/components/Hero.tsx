"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaLaptopCode,
  FaRocket,
  FaHandshake,
  FaLightbulb,
} from "react-icons/fa";

interface ValuePropositionProps {
  icon: React.ReactNode;
  title: string;
}

const ValueProposition: React.FC<ValuePropositionProps> = ({ icon, title }) => (
  <motion.div
    className="flex items-center space-x-3"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="text-2xl text-[#EEC71B]">{icon}</div>
    <span className="text-sm font-medium text-gray-700">{title}</span>
  </motion.div>
);

const ColoredText: React.FC<{ children: React.ReactNode; color: string }> = ({
  children,
  color,
}) => <span className={`font-semibold ${color}`}>{children}</span>;

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const valuePropositions = [
    { icon: <FaLaptopCode />, title: "Efektīvi un ātri darbojošās vietnes" },
    { icon: <FaRocket />, title: "Lietotājiem draudzīgs dizains" },
    { icon: <FaHandshake />, title: "Uzticama atbalsts un uzturēšana" },
    { icon: <FaLightbulb />, title: "Risinājumi, kas veicina jūsu biznesu" },
  ];

  return (
    <section
      ref={containerRef}
      className="relative bg-gradient-to-b from-[#F3F5F4] to-white py-16 sm:py-20 px-4 sm:px-6 overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div
            className="w-full lg:w-1/2 mb-12 lg:mb-0 lg:pr-12 order-2 lg:order-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#3D3B4A] mb-6 leading-tight">
              Jūsu <ColoredText color="text-[#EEC71B]">Idejas</ColoredText> Mūsu
              Digitālajā Izpildījumā
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Mēs veidojam{" "}
              <ColoredText color="text-[#8CB8B4]">
                mūsdienīgas un efektīvas tīmekļa vietnes
              </ColoredText>
              , kas ne tikai izskatās lieliski, bet arī sniedz reālus rezultātus
              jūsu biznesam. No vienkāršām mājaslapām līdz sarežģītām
              e-komercijas platformām - mēs esam gatavi īstenot jūsu digitālos
              mērķus.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-10">
              <Link
                href="/sakt-projekta-skici"
                className="inline-block bg-[#EEC71B] text-[#3D3B4A] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#CF4B43] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Izveidot Skici
              </Link>
              <Link
                href="#"
                className="inline-block bg-[#3D3B4A] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#8CB8B4] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Uzraksti Mums
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {valuePropositions.map((prop, index) => (
                <ValueProposition key={index} {...prop} />
              ))}
            </div>
          </motion.div>
          <motion.div
            className="w-full lg:w-1/2 relative order-1 lg:order-2 mb-12 lg:mb-0"
            style={{ y: imageY }}
          >
            <div className="relative w-full max-w-[500px] lg:max-w-[600px] mx-auto aspect-[2/2]">
              <div className="absolute inset-0 bg-[#8CB8B4] rounded-lg transform rotate-3"></div>
              <div className="absolute inset-0 bg-[#EEC71B] rounded-lg transform -rotate-3"></div>
              <div className="relative w-full h-full">
                <Image
                  src="/images/Palieliniet sava zīmola uzticamību ar izcilu mājas lapas izstrādi.webp"
                  alt="Moderns un efektīvs tīmekļa dizains jūsu biznesam"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg shadow-xl relative z-10"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
