"use client";

import React, { useEffect, useRef, useState, ReactNode } from "react";
import Head from "next/head";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useAnimation,
  useInView,
} from "framer-motion";
import {
  FiCode,
  FiGlobe,
  FiAward,
  FiTrendingUp,
  FiSmartphone,
  FiLayout,
  FiShoppingCart,
  FiSearch,
  FiStar,
  FiZap,
  FiFeather,
  FiCoffee,
  FiBox,
  FiUsers,
  FiHeadphones,
} from "react-icons/fi";
import Header from "../../components/Header";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = "",
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const mainControls = useAnimation();
  const slideControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      slideControls.start("visible");
    } else {
      mainControls.start("hidden");
      slideControls.start("hidden");
    }
  }, [isInView, mainControls, slideControls]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        animate={slideControls}
        transition={{ duration: 0.5, ease: "easeIn" }}
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          background: "#EEC71B",
          zIndex: 20,
        }}
      />
    </div>
  );
};

const ParMums: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const y = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const arrowOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const services = [
    {
      icon: <FiLayout />,
      title: "Mūsdienīgas Vietnes",
      description:
        "Radām vizuāli pārsteidzošas un funkcionāli nevainojamas mājaslapas, kas izceļas konkurentu vidū.",
    },
    {
      icon: <FiSmartphone />,
      title: "Mobilās Lietotnes",
      description:
        "Izstrādājam mūsdienīgas lietotnes, kas padara viedierīces par efektīviem biznesa instrumentiem.",
    },
    {
      icon: <FiShoppingCart />,
      title: "E-komercijas Risinājumi",
      description:
        "Veidojam tiešsaistes veikalus, kas nodrošina nevainojamu pirkšanas pieredzi.",
    },
    {
      icon: <FiGlobe />,
      title: "Tīmekļa Lietotnes",
      description:
        "Radām inovatīvus web risinājumus, kas sniedz jūsu biznesam konkurences priekšrocības.",
    },
    {
      icon: <FiSearch />,
      title: "SEO Optimizācija",
      description:
        "Padarām jūsu uzņēmumu viegli atrodamu meklētājprogrammās ar mūsdienīgām SEO metodēm.",
    },
    {
      icon: <FiZap />,
      title: "Veiktspējas Uzlabošana",
      description:
        "Optimizējam jūsu vietnes darbību, lai nodrošinātu maksimālu ātrumu un efektivitāti.",
    },
  ];

  const heroTextVariants = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
      },
    },
  };

  const scrollToContent = () => {
    const contentSection = document.getElementById("content-start");
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <TooltipProvider>
      <div
        className="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#16213e] overflow-hidden"
        ref={containerRef}
      >
        <Head>
          <title>Par Mums | WebWorks - Digitālās Revolūcijas Epicentrs</title>
          <meta
            name="description"
            content="WebWorks - mēs neradām vienkārši mājaslapas, mēs radām digitālus brīnumus. Ienāciet mūsu trakajā, kreatīvajā pasaulē un atklājiet, kā mēs varam pārvērst jūsu digitālos sapņus realitātē."
          />
          <meta
            name="keywords"
            content="WebWorks, web dizains, mobilās lietotnes, e-komercija, web aplikācijas, SEO, inovācijas, digitālā revolūcija"
          />
          <link rel="canonical" href="https://www.webworks.lv/par-mums" />
        </Head>
        <div className="sticky top-0 z-50">
          <Header />
        </div>
        <main className="relative">
          <div className="fixed inset-0 z-0">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <radialGradient
                  id="Gradient1"
                  cx="50%"
                  cy="50%"
                  fx="0.441602%"
                  fy="50%"
                  r=".5"
                >
                  <animate
                    attributeName="fx"
                    dur="34s"
                    values="0%;3%;0%"
                    repeatCount="indefinite"
                  ></animate>
                  <stop offset="0%" stopColor="rgba(140, 184, 180, 0.5)"></stop>
                  <stop offset="100%" stopColor="rgba(140, 184, 180, 0)"></stop>
                </radialGradient>
                <radialGradient
                  id="Gradient2"
                  cx="50%"
                  cy="50%"
                  fx="2.68147%"
                  fy="50%"
                  r=".5"
                >
                  <animate
                    attributeName="fx"
                    dur="23.5s"
                    values="0%;3%;0%"
                    repeatCount="indefinite"
                  ></animate>
                  <stop offset="0%" stopColor="rgba(238, 199, 27, 0.5)"></stop>
                  <stop offset="100%" stopColor="rgba(238, 199, 27, 0)"></stop>
                </radialGradient>
                <radialGradient
                  id="Gradient3"
                  cx="50%"
                  cy="50%"
                  fx="0.836536%"
                  fy="50%"
                  r=".5"
                >
                  <animate
                    attributeName="fx"
                    dur="21.5s"
                    values="0%;3%;0%"
                    repeatCount="indefinite"
                  ></animate>
                  <stop offset="0%" stopColor="rgba(207, 75, 67, 0.5)"></stop>
                  <stop offset="100%" stopColor="rgba(207, 75, 67, 0)"></stop>
                </radialGradient>
              </defs>
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="url(#Gradient1)"
              >
                <animate
                  attributeName="x"
                  dur="20s"
                  values="25%;0%;25%"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y"
                  dur="21s"
                  values="0%;25%;0%"
                  repeatCount="indefinite"
                />
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 50 50"
                  to="360 50 50"
                  dur="17s"
                  repeatCount="indefinite"
                />
              </rect>
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="url(#Gradient2)"
              >
                <animate
                  attributeName="x"
                  dur="23s"
                  values="0%;-25%;0%"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y"
                  dur="24s"
                  values="25%;-25%;25%"
                  repeatCount="indefinite"
                />
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 50 50"
                  to="360 50 50"
                  dur="18s"
                  repeatCount="indefinite"
                />
              </rect>
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="url(#Gradient3)"
              >
                <animate
                  attributeName="x"
                  dur="25s"
                  values="-25%;0%;-25%"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y"
                  dur="26s"
                  values="0%;25%;0%"
                  repeatCount="indefinite"
                />
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="360 50 50"
                  to="0 50 50"
                  dur="19s"
                  repeatCount="indefinite"
                />
              </rect>
            </svg>
          </div>

          <motion.div style={{ y }} className="relative z-10 bg-transparent">
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
              <div className="text-center text-white">
                <motion.h1
                  variants={heroTextVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-5xl md:text-7xl font-extrabold mb-4 text-shadow-lg relative"
                  style={{
                    textShadow: "0 0 10px rgba(238, 199, 27, 0.5)",
                  }}
                >
                  <span className="relative">
                    Mēs Neradām Mājaslapas
                    <span className="absolute -left-2 -right-2 top-0 bottom-0 bg-[#EEC71B] opacity-20 transform -skew-x-12"></span>
                  </span>
                </motion.h1>
                <motion.p
                  variants={heroTextVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                  className="text-xl md:text-2xl font-light mb-8 text-shadow relative"
                  style={{
                    textShadow: "0 0 5px rgba(255, 255, 255, 0.5)",
                  }}
                >
                  <span className="relative">
                    Mēs Radām Digitālus Brīnumus
                    <span className="absolute -left-1 -right-1 top-0 bottom-0 bg-white opacity-10 transform skew-x-12"></span>
                  </span>
                </motion.p>
              </div>
              <motion.div
                className="absolute bottom-32 cursor-pointer w-20 h-20"
                style={{ opacity: arrowOpacity }}
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                onClick={scrollToContent}
              >
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="arrowGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#EEC71B" stopOpacity="0.8" />
                      <stop
                        offset="100%"
                        stopColor="#EEC71B"
                        stopOpacity="0.2"
                      />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M10 30 L50 70 L90 30"
                    stroke="url(#arrowGradient)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: [0, 1, 1, 0],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      times: [0, 0.4, 0.8, 1],
                      repeat: Infinity,
                      repeatDelay: 0.5,
                    }}
                  />
                  <motion.path
                    d="M10 50 L50 90 L90 50"
                    stroke="url(#arrowGradient)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: [0, 1, 1, 0],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      times: [0, 0.4, 0.8, 1],
                      repeat: Infinity,
                      repeatDelay: 0.5,
                      delay: 0.5,
                    }}
                  />
                </svg>
              </motion.div>
            </section>

            <div id="content-start"></div>

            <AnimatedSection className="py-20 px-4 md:px-0">
              <div className="max-w-4xl mx-auto">
                <motion.div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12 mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#EEC71B] mb-6">
                    Mūsu Misija: Digitālā Revolūcija
                  </h2>
                  <p className="text-lg text-white mb-4">
                    WebWorks ir moderna tīmekļa risinājumu izstrādes kompānija.
                    Mēs esam digitālo ideju īstenotāji, tehnoloģiju entuziasti
                    un jūsu biznesa digitālie partneri. Mūsu mērķis ir radīt ne
                    tikai mājaslapas, bet digitālās pieredzes, kas pārsteidz un
                    aizrauj.
                  </p>
                  <p className="text-lg text-white mb-4">
                    Mums nekas nerada lielāku adrenalīna pieplūduma kā radīt
                    episkus digitālos risinājumus. Vai tas būtu korporatīvais
                    portāls, kas izskatās kā no nākotnes, e-komercijas
                    platforma, kas pārdod zibens ātrumā, vai web aplikācija, kas
                    liek konkurentiem raudāt - mēs to darām ar stilu, ātrumu un
                    tehnoloģisko meistarību, kas robežojas ar maģiju.
                  </p>
                  <p className="text-lg text-white">
                    Mūsu misija ir padarīt internetu episku, ka pat jūsu
                    vecmāmiņa teiks "Tas ir kruti!". Mēs ticam, ka labi
                    izstrādāts digitālais risinājums var ne tikai mainīt jūsu
                    biznesu, bet arī remdēt garlaicību Pasaulē. Un mēs esam
                    gatavi šo izaicinājumu pieņemt - ar katru projektu, katru
                    koda rindiņu un katru pikseli.
                  </p>
                </motion.div>
              </div>
            </AnimatedSection>

            <AnimatedSection className="py-20 px-4 md:px-0">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-center text-white mb-16">
                  Mūsu Digitālie Superspēki
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {services.map((service, index) => (
                    <motion.div
                      key={index}
                      className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg transform transition duration-500 hover:scale-105"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-4xl text-[#EEC71B] mb-4">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-white">
                        {service.title}
                      </h3>
                      <p className="text-gray-300">{service.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection className="py-20 px-4 md:px-0">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-[#EEC71B] mb-12">
                  Mūsu Pieeja: Inovācija ar Attieksmi
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div
                    className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiZap className="text-4xl text-[#EEC71B] mb-4 mx-auto" />
                    <h3 className="text-2xl font-semibold mb-2 text-white">
                      Inovāciju Laboratorija
                    </h3>
                    <p className="text-gray-300">
                      Mēs nevis vienkārši sekojam tendencēm - mēs tās radām.
                      Mūsu komanda ir kā zinātnieki, kas eksperimentē ar
                      jaunākajām tehnoloģijām, lai radītu digitālus brīnumus.
                    </p>
                  </motion.div>
                  <motion.div
                    className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiFeather className="text-4xl text-[#EEC71B] mb-4 mx-auto" />
                    <h3 className="text-2xl font-semibold mb-2 text-white">
                      Dizains ar Attieksmi
                    </h3>
                    <p className="text-gray-300">
                      Mūsu dizaini nav vienkārši skaisti - tie ir pārsteidzoši.
                      Mēs radām vizuālās pieredzes, kas liek cilvēkiem aizturēt
                      elpu.
                    </p>
                  </motion.div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection className="py-20 px-4 md:px-0">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-center text-white mb-12">
                  Mūsu Vērtības
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      number: "100%",
                      description: "Individuāla Pieeja",
                      icon: <FiUsers />,
                    },
                    {
                      number: "24/7",
                      description: "Tehniskais Atbalsts",
                      icon: <FiHeadphones />,
                    },
                    {
                      number: "0%",
                      description: "Kompromisi Kvalitātē",
                      icon: <FiStar />,
                    },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      className="text-center bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-lg transform transition duration-500 hover:scale-105"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-4xl text-[#EEC71B] mb-4">
                        {stat.icon}
                      </div>
                      <motion.h3
                        className="text-5xl font-bold mb-2 text-white"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          type: "spring",
                          stiffness: 100,
                          delay: index * 0.2,
                        }}
                      >
                        {stat.number}
                      </motion.h3>
                      <p className="text-xl text-gray-300">
                        {stat.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection className="py-20 px-4 md:px-0">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-center text-[#EEC71B] mb-12">
                  Mūsu Radošais Haoss
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    {
                      icon: <FiCoffee />,
                      title: "Kofeīna Inducētā Ģenialitāte",
                      description:
                        "Mūsu komanda darbojas uz augstāko oktānu kafijas. Jo vairāk pupiņu, jo trakākas idejas!",
                    },
                    {
                      icon: <FiBox />,
                      title: "Ārpus Kastes Domāšana",
                      description:
                        "Mēs nedomājam ārpus kastes. Mēs vispār nezinām, kas ir kaste. Vai kāds ir redzējis mūsu kasti?",
                    },
                    {
                      icon: <FiTrendingUp />,
                      title: "Bezgalīga Pilnveidošanās",
                      description:
                        "Mēs esam kā digitālie Terminatori - mēs nekad neapstājamies, nekad nepadodamies, vienmēr uzlabojamies.",
                    },
                    {
                      icon: <FiAward />,
                      title: "Episkuma Standarts",
                      description:
                        "Mūsu darbi nav vienkārši labi, tie ir tik episki, ka pat Chuck Norris teiktu 'labs darbiņš'.",
                    },
                  ].map((process, index) => (
                    <motion.div
                      key={index}
                      className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-4xl text-[#EEC71B] mb-4">
                        {process.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-white">
                        {process.title}
                      </h3>
                      <p className="text-gray-300">{process.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection className="py-20 px-4 md:px-0 mb-20">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-8 text-white">
                  Gatavi Sākt Savu Digitālo Revolūciju?
                </h2>
                <p className="text-xl mb-12 text-gray-300">
                  Neatkarīgi no tā, vai esat jauns uzņēmums ar ambiciozu vīziju
                  vai pieredzējis uzņēmums, kas vēlas digitāli attīstīties, mēs
                  esam gatavi pārvērst jūsu idejas realitātē. Mūsu risinājumi ir
                  veidoti, lai radītu paliekošu iespaidu un veicinātu jūsu
                  uzņēmuma izaugsmi.
                </p>
                <motion.div
                  className="inline-block"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href="/contact-us"
                        className="bg-[#EEC71B] text-[#3D3B4A] px-8 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-[#3D3B4A] transition-colors duration-300"
                      >
                        Iedarbiniet Digitālo Raķeti!
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      Brīdinājums: Var izraisīt pēkšņu biznesa izaugsmi un
                      konkurentu skaudību
                    </TooltipContent>
                  </Tooltip>
                </motion.div>
              </div>
            </AnimatedSection>
          </motion.div>
        </main>
      </div>
    </TooltipProvider>
  );
};

export default ParMums;
