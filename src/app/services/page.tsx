"use client";

import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMonitor,
  FiSmartphone,
  FiShoppingCart,
  FiSearch,
  FiBarChart,
  FiLayers,
  FiShield,
  FiRefreshCw,
  FiCheck,
  FiArrowRight,
  FiCode,
} from "react-icons/fi";
import Header from "../../components/Header";
import Footer from "../../components/footer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const services = [
  {
    icon: <FiMonitor />,
    title: "Mājas Lapu Izstrāde",
    description:
      "Mūsdienīgas, ātras un pielāgotas mājas lapas, kas izcels jūsu zīmolu digitālajā vidē.",
    details: [
      "Responsīvs dizains visām ierīcēm",
      "SEO optimizācija labākai redzamībai",
      "Ātrgaitas lapas ielāde",
      "Integrācija ar populārākajām CMS platformām",
    ],
    caseStudy: {
      client: "Zaļā Kafija",
      result: "300% pieaugums tiešsaistes pārdošanā",
    },
  },
  {
    icon: <FiSmartphone />,
    title: "Mobilo Aplikāciju Izstrāde",
    description:
      "Intuitīvas un funkcionalitātes ziņā bagātas mobilās aplikācijas Android un iOS platformām.",
    details: [
      "Natīvā un hibrīdā aplikāciju izstrāde",
      "Lietotājam draudzīgs UI/UX dizains",
      "Integrācija ar mākoņpakalpojumiem",
      "Pastāvīga atbalsta un uzturēšanas pakalpojumi",
    ],
    caseStudy: {
      client: "FitBuddy",
      result: "100,000+ lejupielādes pirmajā mēnesī",
    },
  },
  {
    icon: <FiShoppingCart />,
    title: "E-komercijas Risinājumi",
    description:
      "Droši un efektīvi tiešsaistes veikali, kas palielinās jūsu pārdošanas apjomus.",
    details: [
      "Pielāgoti e-veikala risinājumi",
      "Droši maksājumu vārtejas",
      "Produktu pārvaldības sistēmas",
      "Klientu lojalitātes programmas",
    ],
    caseStudy: {
      client: "EcoGoods",
      result: "500% pieaugums konversijas rādītājos",
    },
  },
  {
    icon: <FiSearch />,
    title: "SEO Optimizācija",
    description:
      "Uzlabojiet savu redzamību meklētājprogrammās un piesaistiet vairāk potenciālo klientu.",
    details: [
      "Visaptveroša SEO audita veikšana",
      "Atslēgvārdu izpēte un stratēģija",
      "On-page un off-page optimizācija",
      "Regulāra veiktspējas analīze un ziņojumi",
    ],
    caseStudy: {
      client: "Local Tours",
      result: "1. vieta Google meklējumos galvenajiem atslēgvārdiem",
    },
  },
  {
    icon: <FiBarChart />,
    title: "Digitālā Mārketinga Pakalpojumi",
    description:
      "Visaptveroši digitālā mārketinga risinājumi, lai palielinātu jūsu tiešsaistes klātbūtni.",
    details: [
      "Sociālo mediju mārketings",
      "PPC kampaņu vadība",
      "Satura mārketings un bloga rakstīšana",
      "E-pasta mārketinga kampaņas",
    ],
    caseStudy: {
      client: "TechGadgets",
      result: "200% ROI no digitālā mārketinga kampaņām",
    },
  },
  {
    icon: <FiLayers />,
    title: "Web Aplikāciju Izstrāde",
    description:
      "Pielāgotas web aplikācijas, kas optimizē jūsu biznesa procesus un uzlabo produktivitāti.",
    details: [
      "Pielāgotas CRM un ERP sistēmas",
      "Projektu vadības rīki",
      "Datu analīzes platformas",
      "Mākslīgā intelekta integrācija",
    ],
    caseStudy: {
      client: "LogisticsPro",
      result: "40% efektivitātes pieaugums loģistikas procesos",
    },
  },
  {
    icon: <FiShield />,
    title: "Kiberdrošības Pakalpojumi",
    description:
      "Aizsargājiet savu digitālo klātbūtni ar mūsu visaptverošajiem kiberdrošības risinājumiem.",
    details: [
      "Drošības auditi un novērtējumi",
      "Ievainojamību testēšana",
      "Datu šifrēšanas risinājumi",
      "Darbinieku drošības apmācības",
    ],
    caseStudy: {
      client: "SecureBank",
      result: "0 veiksmīgi kiberuzbrukumi pēc mūsu risinājumu ieviešanas",
    },
  },
  {
    icon: <FiRefreshCw />,
    title: "Mājas Lapu Uzturēšana un Atjaunināšana",
    description:
      "Nepārtraukta jūsu digitālo aktīvu uzturēšana un uzlabošana, lai nodrošinātu optimālu veiktspēju.",
    details: [
      "Regulāri drošības atjauninājumi",
      "Veiktspējas optimizācija",
      "Satura atjaunināšana un pārvaldība",
      "Tehniskā atbalsta pakalpojumi",
    ],
    caseStudy: {
      client: "NewsPortal",
      result: "99.99% vietnes pieejamība gada laikā",
    },
  },
];

const ServiceCard = ({ service, isSelected, onClick }) => (
  <motion.div
    layout
    onClick={onClick}
    className={`bg-white rounded-lg shadow-lg p-6 cursor-pointer transition-all duration-300 ${
      isSelected ? "col-span-2 row-span-2" : ""
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="text-4xl text-[#EEC71B] mb-4">{service.icon}</div>
    <h3 className="text-xl font-bold mb-2 text-[#3D3B4A]">{service.title}</h3>
    <p className="text-gray-600 mb-4">{service.description}</p>
    <AnimatePresence>
      {isSelected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <h4 className="font-bold mb-2">Galvenās Iezīmes:</h4>
          <ul className="list-none pl-0 mb-4">
            {service.details.map((detail, index) => (
              <li key={index} className="flex items-center mb-2">
                <FiCheck className="text-[#EEC71B] mr-2" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="font-bold mb-2">
              Veiksmes Stāsts: {service.caseStudy.client}
            </h4>
            <p>{service.caseStudy.result}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const PakalpojumiPage = () => {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-b from-[#F3F5F4] to-white overflow-hidden">
        <Head>
          <title>
            Mūsu Pakalpojumi | WebWorks - Jūsu Digitālās Transformācijas
            Partneris
          </title>
          <meta
            name="description"
            content="WebWorks piedāvā plašu web pakalpojumu klāstu, tostarp mājas lapu izstrādi, mobilās aplikācijas, e-komerciju, SEO un digitālo mārketingu. Uzziniet, kā mēs varam palīdzēt jūsu biznesam augt tiešsaistē."
          />
          <meta
            name="keywords"
            content="web izstrāde, mājas lapas, mobilās aplikācijas, e-komercija, SEO, digitālais mārketings, web aplikācijas, kiberdrošība, Latvija"
          />
          <link rel="canonical" href="https://www.webworks.lv/pakalpojumi" />
        </Head>

        <Header />

        <main className="container mx-auto px-4 py-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-center text-[#3D3B4A] mb-8"
          >
            Mūsu Pakalpojumi: Jūsu Digitālās Veiksmes Atslēga
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-center text-gray-700 mb-12 max-w-3xl mx-auto"
          >
            WebWorks piedāvā visaptverošus web risinājumus, kas palīdzēs jūsu
            biznesam izcelties digitālajā pasaulē. No mājas lapu izstrādes līdz
            sarežģītiem e-komercijas risinājumiem - mēs esam šeit, lai palīdzētu
            jums sasniegt jaunas virsotnes tiešsaistē.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                service={service}
                isSelected={selectedService === index}
                onClick={() =>
                  setSelectedService(selectedService === index ? null : index)
                }
              />
            ))}
          </div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-3xl font-bold text-[#3D3B4A] mb-6">
              Kāpēc Izvēlēties WebWorks?
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Pieredzējuši eksperti ar plašām zināšanām nozarē",
                "Individuāla pieeja katram projektam",
                "Modernākās tehnoloģijas un labākās prakses",
                "Uzsvars uz lietotāju pieredzi un dizainu",
                "Nepārtraukta atbalsta un uzturēšanas pakalpojumi",
                "Caurspīdīgs darba process un regulāra komunikācija",
              ].map((point, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="flex items-center text-gray-700"
                >
                  <FiCheck className="text-[#EEC71B] mr-2" />
                  {point}
                </motion.li>
              ))}
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <h2 className="text-3xl font-bold text-[#3D3B4A] mb-6">
              Gatavi Sākt Savu Digitālo Ceļojumu?
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Neatkarīgi no tā, vai jums ir nepieciešama jauna mājas lapa,
              mobilā aplikācija vai visaptverošs digitālā mārketinga plāns,
              WebWorks ir šeit, lai palīdzētu jums sasniegt jūsu mērķus.
              Sazināties ar mums jau šodien un uzziniet, kā mēs varam palīdzēt
              jūsu biznesam augt!
            </p>
            <motion.a
              href="/contact-us"
              className="bg-[#EEC71B] text-[#3D3B4A] px-8 py-3 rounded-full font-bold text-lg hover:bg-[#3D3B4A] hover:text-white transition-colors duration-300 inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sazināties ar Mums
              <FiArrowRight className="ml-2" />
            </motion.a>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-bold text-[#3D3B4A] mb-8 text-center">
              Mūsu Darba Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <FiSearch />,
                  title: "Izpēte",
                  description:
                    "Mēs rūpīgi izpētām jūsu biznesu, mērķauditoriju un konkurentus.",
                },
                {
                  icon: <FiLayers />,
                  title: "Plānošana",
                  description:
                    "Izstrādājam detalizētu projekta plānu un dizaina konceptu.",
                },
                {
                  icon: <FiCode />,
                  title: "Izstrāde",
                  description:
                    "Veidojam risinājumu, izmantojot jaunākās tehnoloģijas.",
                },
                {
                  icon: <FiRefreshCw />,
                  title: "Palaišana & Atbalsts",
                  description:
                    "Palaižam projektu un nodrošinām nepārtrauktu atbalstu.",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  <div className="text-4xl text-[#EEC71B] mb-4 flex justify-center">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-700">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-bold text-[#3D3B4A] mb-8 text-center">
              Bieži Uzdotie Jautājumi
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "Cik ilgi aizņem mājas lapas izstrāde?",
                  a: "Mājas lapas izstrādes laiks var atšķirties atkarībā no projekta sarežģītības. Vienkāršas mājas lapas var tikt izstrādātas 2-4 nedēļu laikā, bet sarežģītākiem projektiem var būt nepieciešams 2-3 mēneši vai vairāk.",
                },
                {
                  q: "Vai jūs piedāvājat mājas lapu uzturēšanas pakalpojumus?",
                  a: "Jā, mēs piedāvājam visaptverošus mājas lapu uzturēšanas pakalpojumus, ieskaitot regulārus atjauninājumus, drošības uzlabojumus un satura pārvaldību.",
                },
                {
                  q: "Kādas tehnoloģijas jūs izmantojat mājas lapu izstrādē?",
                  a: "Mēs izmantojam jaunākās web tehnoloģijas, tostarp HTML5, CSS3, JavaScript (React, Vue.js), PHP (Laravel), un citas modernas izstrādes platformas atkarībā no projekta prasībām.",
                },
                {
                  q: "Vai jūs varat palīdzēt ar esošas mājas lapas atjaunināšanu?",
                  a: "Jā, mēs piedāvājam mājas lapu atjaunināšanas pakalpojumus, lai uzlabotu dizainu, funkcionalitāti un veiktspēju jau esošām vietnēm.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg shadow p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                >
                  <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                  <p className="text-gray-700">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="mt-16 bg-[#3D3B4A] text-white p-8 rounded-lg"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">
              Sāciet Savu Digitālo Transformāciju Šodien
            </h2>
            <p className="text-xl mb-8 text-center">
              Esam gatavi palīdzēt jums sasniegt jaunas virsotnes digitālajā
              pasaulē. Sazinieties ar mums, lai apspriestu jūsu projektu!
            </p>
            <div className="flex justify-center">
              <motion.a
                href="/contact-us"
                className="bg-[#EEC71B] text-[#3D3B4A] px-8 py-3 rounded-full font-bold text-lg hover:bg-white transition-colors duration-300 inline-flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Pieprasīt Konsultāciju
                <FiArrowRight className="ml-2" />
              </motion.a>
            </div>
          </motion.section>
        </main>

        <Footer />
      </div>
    </TooltipProvider>
  );
};

export default PakalpojumiPage;
