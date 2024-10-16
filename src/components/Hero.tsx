"use client";

import React, { useRef, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import {
  FaLaptopCode,
  FaRocket,
  FaHandshake,
  FaLightbulb,
  IconType,
} from "react-icons/fa";

type ValueProposition = Readonly<{
  icon: IconType;
  title: string;
}>;

type ColoredTextProps = Readonly<{
  children: React.ReactNode;
  color: `text-[#${string}]`;
}>;

type HeroButtonProps = Readonly<{
  href: string;
  bg: string;
  text: string;
  hover: string;
  children: React.ReactNode;
  ariaLabel: string;
}>;

const ValueProposition: React.FC<ValueProposition> = React.memo(
  ({ icon: Icon, title }) => (
    <motion.div
      className="flex items-center space-x-3 bg-white bg-opacity-50 backdrop-blur-sm p-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <Icon className="text-2xl text-[#EEC71B]" aria-hidden="true" />
      <span className="text-sm font-medium text-gray-700">{title}</span>
    </motion.div>
  )
);

ValueProposition.displayName = "ValueProposition";

const ColoredText: React.FC<ColoredTextProps> = React.memo(
  ({ children, color }) => (
    <span className={`font-bold ${color} relative inline-block`}>
      <span className="relative z-10">{children}</span>
      <span
        className="absolute bottom-0 left-0 w-full h-3 bg-[#EEC71B] opacity-30 transform -skew-x-12"
        aria-hidden="true"
      ></span>
    </span>
  )
);

ColoredText.displayName = "ColoredText";

const HeroButton: React.FC<HeroButtonProps> = React.memo(
  ({ href, bg, text, hover, children, ariaLabel }) => (
    <Link
      href={href}
      className={`inline-block ${bg} ${text} px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold ${hover} transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto text-center`}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  )
);

HeroButton.displayName = "HeroButton";

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY: MotionValue<string> = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "30%"]
  );

  const valuePropositions: readonly ValueProposition[] = useMemo(
    () => [
      { icon: FaLaptopCode, title: "Efektīvi un ātri darbīgas vietnes" },
      { icon: FaRocket, title: "Lietotājiem draudzīgs dizains" },
      { icon: FaHandshake, title: "Uzticams atbalsts un uzturēšana" },
      {
        icon: FaLightbulb,
        title: "Risinājumi, kas veicina jūsu biznesa izaugsmi",
      },
    ],
    []
  );

  const renderValuePropositions = useCallback(
    () => (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {valuePropositions.map((prop, index) => (
          <ValueProposition key={`value-prop-${index}`} {...prop} />
        ))}
      </div>
    ),
    [valuePropositions]
  );

  return (
    <section
      ref={containerRef}
      className="relative bg-gradient-to-b from-[#F3F5F4] to-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 overflow-hidden"
    >
      <div
        className="absolute top-0 left-0 w-full h-full bg-[url('/path/to/pattern.svg')] opacity-5"
        aria-hidden="true"
      ></div>
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div
            className="w-full lg:w-1/2 mb-8 lg:mb-0 lg:pr-12 order-2 lg:order-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-[#3D3B4A] mb-4 sm:mb-6 leading-tight text-center lg:text-left">
              <span className="block">Digitālās Izcilības</span>
              <span className="block">
                <ColoredText color="text-[#EEC71B]">Arhitekti</ColoredText>
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 text-center lg:text-left">
              Mēs veidojam{" "}
              <ColoredText color="text-[#8CB8B4]">
                mūsdienīgas un efektīvas tīmekļa vietnes
              </ColoredText>
              , kas ne tikai izskatās lieliski, bet arī sniedz reālus rezultātus
              jūsu biznesam. No vienkāršām mājaslapām līdz sarežģītām
              e-komercijas platformām - mēs esam gatavi īstenot jūsu digitālos
              mērķus.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8 sm:mb-10">
              <HeroButton
                href="/sakt-projekta-skici"
                bg="bg-[#EEC71B]"
                text="text-[#3D3B4A]"
                hover="hover:bg-[#CF4B43] hover:text-white"
                ariaLabel="Izveidot projekta skici"
              >
                Izveidot Skici
              </HeroButton>
              <HeroButton
                href="#"
                bg="bg-[#3D3B4A]"
                text="text-white"
                hover="hover:bg-[#8CB8B4]"
                ariaLabel="Sazināties ar mums"
              >
                Uzraksti Mums
              </HeroButton>
            </div>
            {renderValuePropositions()}
          </motion.div>
          <motion.div
            className="w-full lg:w-1/2 relative order-1 lg:order-2 mb-8 lg:mb-0"
            style={{ y: imageY }}
          >
            <div className="relative w-full max-w-[500px] lg:max-w-[600px] mx-auto aspect-[2/2]">
              <div
                className="absolute inset-0 bg-[#8CB8B4] rounded-lg transform rotate-3"
                aria-hidden="true"
              ></div>
              <div
                className="absolute inset-0 bg-[#EEC71B] rounded-lg transform -rotate-3"
                aria-hidden="true"
              ></div>
              <div className="relative w-full h-full overflow-hidden rounded-lg shadow-xl">
                <Image
                  src="/images/Palieliniet sava zīmola uzticamību ar izcilu mājas lapas izstrādi.webp"
                  alt="Moderns un efektīvs tīmekļa dizains jūsu biznesam"
                  layout="fill"
                  objectFit="cover"
                  className="relative z-10 transition-transform duration-500 hover:scale-105"
                  priority
                  loading="eager"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#3D3B4A] to-transparent opacity-30 z-20"
                  aria-hidden="true"
                ></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Hero);

// "use client";

// import React, { useRef, useMemo, useCallback } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
// import {
//   FaLaptopCode,
//   FaRocket,
//   FaHandshake,
//   FaLightbulb,
//   IconType,
// } from "react-icons/fa";

// type ValueProposition = Readonly<{
//   icon: IconType;
//   title: string;
// }>;

// type ColoredTextProps = Readonly<{
//   children: React.ReactNode;
//   color: `text-[#${string}]`;
// }>;

// type HeroButtonProps = Readonly<{
//   href: string;
//   bg: string;
//   text: string;
//   hover: string;
//   children: React.ReactNode;
// }>;

// const ValueProposition: React.FC<ValueProposition> = React.memo(
//   ({ icon: Icon, title }) => (
//     <motion.div
//       className="flex items-center space-x-3 bg-white bg-opacity-50 backdrop-blur-sm p-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.5 }}
//       whileHover={{ scale: 1.05 }}
//     >
//       <Icon className="text-2xl text-[#EEC71B]" aria-hidden="true" />
//       <span className="text-sm font-medium text-gray-700">{title}</span>
//     </motion.div>
//   )
// );

// ValueProposition.displayName = "ValueProposition";

// const ColoredText: React.FC<ColoredTextProps> = React.memo(
//   ({ children, color }) => (
//     <span className={`font-bold ${color} relative inline-block`}>
//       <span className="relative z-10">{children}</span>
//       <span
//         className="absolute bottom-0 left-0 w-full h-3 bg-[#EEC71B] opacity-30 transform -skew-x-12"
//         aria-hidden="true"
//       ></span>
//     </span>
//   )
// );

// ColoredText.displayName = "ColoredText";

// const HeroButton: React.FC<HeroButtonProps> = React.memo(
//   ({ href, bg, text, hover, children }) => (
//     <Link
//       href={href}
//       className={`inline-block ${bg} ${text} px-8 py-4 rounded-lg text-lg font-semibold ${hover} transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
//     >
//       {children}
//     </Link>
//   )
// );

// HeroButton.displayName = "HeroButton";

// const Hero: React.FC = () => {
//   const containerRef = useRef<HTMLElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end start"],
//   });

//   const imageY: MotionValue<string> = useTransform(
//     scrollYProgress,
//     [0, 1],
//     ["0%", "30%"]
//   );

//   const valuePropositions: readonly ValueProposition[] = useMemo(
//     () => [
//       { icon: FaLaptopCode, title: "Efektīvi un ātri darbīgas vietnes" },
//       { icon: FaRocket, title: "Lietotājiem draudzīgs dizains" },
//       { icon: FaHandshake, title: "Uzticams atbalsts un uzturēšana" },
//       {
//         icon: FaLightbulb,
//         title: "Risinājumi, kas veicina jūsu biznesa izaugsmi",
//       },
//     ],
//     []
//   );

//   const renderValuePropositions = useCallback(
//     () => (
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//         {valuePropositions.map((prop, index) => (
//           <ValueProposition key={`value-prop-${index}`} {...prop} />
//         ))}
//       </div>
//     ),
//     [valuePropositions]
//   );

//   return (
//     <section
//       ref={containerRef}
//       className="relative bg-gradient-to-b from-[#F3F5F4] to-white py-16 sm:py-20 px-4 sm:px-6 overflow-hidden"
//     >
//       <div
//         className="absolute top-0 left-0 w-full h-full bg-[url('/path/to/pattern.svg')] opacity-5"
//         aria-hidden="true"
//       ></div>
//       <div className="container mx-auto max-w-7xl relative z-10">
//         <div className="flex flex-col lg:flex-row items-center">
//           <motion.div
//             className="w-full lg:w-1/2 mb-12 lg:mb-0 lg:pr-12 order-2 lg:order-1"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//           >
//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#3D3B4A] mb-6 leading-tight">
//               Jūsu <ColoredText color="text-[#EEC71B]">Idejas</ColoredText> Mūsu
//               <br />
//               Digitālajā Izpildījumā
//             </h1>
//             <p className="text-lg text-gray-700 mb-8">
//               Mēs veidojam{" "}
//               <ColoredText color="text-[#8CB8B4]">
//                 mūsdienīgas un efektīvas tīmekļa vietnes
//               </ColoredText>
//               , kas ne tikai izskatās lieliski, bet arī sniedz reālus rezultātus
//               jūsu biznesam. No vienkāršām mājaslapām līdz sarežģītām
//               e-komercijas platformām - mēs esam gatavi īstenot jūsu digitālos
//               mērķus.
//             </p>
//             <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-10">
//               <HeroButton
//                 href="/sakt-projekta-skici"
//                 bg="bg-[#EEC71B]"
//                 text="text-[#3D3B4A]"
//                 hover="hover:bg-[#CF4B43] hover:text-white"
//               >
//                 Izveidot Skici
//               </HeroButton>
//               <HeroButton
//                 href="#"
//                 bg="bg-[#3D3B4A]"
//                 text="text-white"
//                 hover="hover:bg-[#8CB8B4]"
//               >
//                 Uzraksti Mums
//               </HeroButton>
//             </div>
//             {renderValuePropositions()}
//           </motion.div>
//           <motion.div
//             className="w-full lg:w-1/2 relative order-1 lg:order-2 mb-12 lg:mb-0"
//             style={{ y: imageY }}
//           >
//             <div className="relative w-full max-w-[500px] lg:max-w-[600px] mx-auto aspect-[2/2]">
//               <div
//                 className="absolute inset-0 bg-[#8CB8B4] rounded-lg transform rotate-3"
//                 aria-hidden="true"
//               ></div>
//               <div
//                 className="absolute inset-0 bg-[#EEC71B] rounded-lg transform -rotate-3"
//                 aria-hidden="true"
//               ></div>
//               <div className="relative w-full h-full overflow-hidden rounded-lg shadow-xl">
//                 <Image
//                   src="/images/Palieliniet sava zīmola uzticamību ar izcilu mājas lapas izstrādi.webp"
//                   alt="Moderns un efektīvs tīmekļa dizains jūsu biznesam"
//                   layout="fill"
//                   objectFit="cover"
//                   className="relative z-10 transition-transform duration-500 hover:scale-105"
//                   priority
//                 />
//                 <div
//                   className="absolute inset-0 bg-gradient-to-t from-[#3D3B4A] to-transparent opacity-30 z-20"
//                   aria-hidden="true"
//                 ></div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default React.memo(Hero);
