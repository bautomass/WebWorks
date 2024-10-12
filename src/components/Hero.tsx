"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiTypescript, SiTailwindcss } from "react-icons/si";

interface TechIconProps {
  icon: React.ReactNode;
  name: string;
}

const TechIcon: React.FC<TechIconProps> = ({ icon, name }) => (
  <motion.div
    className="flex flex-col items-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="text-4xl mb-2 text-gray-700">{icon}</div>
    <span className="text-xs text-gray-600">{name}</span>
  </motion.div>
);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const techStack = [
    { icon: <FaReact />, name: "React" },
    { icon: <FaNodeJs />, name: "Node.js" },
    { icon: <SiTypescript />, name: "TypeScript" },
    { icon: <SiTailwindcss />, name: "Tailwind" },
  ];

  return (
    <section
      ref={containerRef}
      className="relative bg-gradient-to-b from-[#F3F5F4] to-white py-20 px-4 sm:px-6 overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div
            className="w-full lg:w-1/2 mb-12 lg:mb-0 lg:pr-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#3D3B4A] mb-6 leading-tight">
              Inovatīvi Digitālie Risinājumi Jūsu Biznesam
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Mēs veidojam modernas mājaslapas un e-komercijas platformas, kas
              ne tikai izskatās lieliski, bet arī sasniedz reālus biznesa
              mērķus.
            </p>
            <Link
              href="/sakt-projekta-skici"
              className="inline-block bg-[#EEC71B] text-[#3D3B4A] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#CF4B43] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Sākt projektu
            </Link>
            <div className="mt-12">
              <p className="text-sm text-gray-600 mb-4">
                Mūsu tehnoloģiju steks:
              </p>
              <div className="flex space-x-6">
                {techStack.map((tech) => (
                  <TechIcon key={tech.name} icon={tech.icon} name={tech.name} />
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div
            className="w-full lg:w-1/2 relative"
            style={{ y: imageY }}
          >
            <div className="relative w-full max-w-[500px] lg:max-w-[600px] mx-auto aspect-[2/2]">
              <div className="absolute inset-0 bg-[#8CB8B4] rounded-lg transform rotate-3"></div>
              <div className="absolute inset-0 bg-[#EEC71B] rounded-lg transform -rotate-3"></div>
              <div className="relative w-full h-full">
                <Image
                  src="/images/Palieliniet sava zīmola uzticamību ar izcilu mājas lapas izstrādi.webp"
                  alt="Mājaslapu izstrādes process"
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

// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef } from "react";

// export default function Hero() {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start start", "end start"],
//   });

//   const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

//   return (
//     <section
//       ref={ref}
//       className="relative bg-[#F3F5F4] py-12 sm:py-20 px-4 sm:px-6 overflow-hidden"
//     >
//       <div className="container mx-auto flex flex-col lg:flex-row items-center">
//         <div className="w-full lg:w-1/2 mb-10 lg:mb-0 lg:pr-8">
//           <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#3D3B4A] mb-6">
//             Inovatīvu Mājaslapu un E-komercijas Risinājumu Izstrāde
//           </h1>
//           <p className="text-base sm:text-lg text-[#3D3B4A] mb-8">
//             Mēs veidojam unikālus un mūsdienīgus interneta projektus, kas
//             izceļas un sasniedz rezultātus.
//           </p>
//           <Link
//             href="/sakt-projekta-skici"
//             className="inline-block bg-[#EEC71B] text-[#3D3B4A] px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-semibold hover:bg-[#CF4B43] hover:text-white transition-colors"
//           >
//             Sākt projektu
//           </Link>
//         </div>
//         <motion.div className="w-full lg:w-1/2 relative" style={{ y: imageY }}>
//           <div className="relative w-full max-w-[500px] lg:max-w-[600px] mx-auto aspect-[2/2]">
//             <div className="absolute inset-0 bg-[#8CB8B4] rounded-lg transform rotate-3"></div>
//             <div className="absolute inset-0 bg-[#EEC71B] rounded-lg transform -rotate-3"></div>
//             <div className="relative w-full h-full">
//               <Image
//                 src="/images/Palieliniet sava zīmola uzticamību ar izcilu mājas lapas izstrādi.webp"
//                 alt="Mājaslapu izstrādes process"
//                 layout="fill"
//                 objectFit="cover"
//                 className="rounded-lg shadow-xl relative z-10"
//               />
//             </div>
//           </div>
//         </motion.div>
//       </div>
//       <FloatingBall
//         color="#8CB8B4"
//         size="w-16 h-16 sm:w-20 sm:h-20"
//         initialPosition="top-10 left-10"
//       />
//       <FloatingBall
//         color="#EEC71B"
//         size="w-24 h-24 sm:w-32 sm:h-32"
//         initialPosition="bottom-10 right-10"
//       />
//     </section>
//   );
// }

// function FloatingBall({ color, size, initialPosition }) {
//   return (
//     <motion.div
//       className={`absolute ${size} rounded-full opacity-20 ${initialPosition}`}
//       style={{ backgroundColor: color }}
//       animate={{
//         y: ["0%", "10%", "-10%", "0%"],
//         x: ["0%", "5%", "-5%", "0%"],
//       }}
//       transition={{
//         duration: 10,
//         repeat: Infinity,
//         repeatType: "reverse",
//         ease: "easeInOut",
//       }}
//     />
//   );
// }
