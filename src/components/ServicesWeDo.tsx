"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
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
  FiCode,
  FiZap,
  FiUsers,
  FiPlusCircle,
  FiMinusCircle,
  FiExternalLink,
  FiClock,
  FiGlobe,
  IconType,
} from "react-icons/fi";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DownArrowGuide from "../components/DownArrowGuide";
import DoContainer from "../components/DoContainer";
import WhyChooseWebWorksSection from "./WhyChooseWebWorksSection";
import OurInnovativeApproachesSection from "./InnovativeApproaches";
import CallToAction from "./CallToAction";
import TechStack from "./techStack";

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
  caseStudy: {
    client: string;
    result: string;
  };
  link: string;
}

interface ServiceCardProps {
  service: Service;
  isSelected: boolean;
  onClick: () => void;
}

interface FAQ {
  q: string;
  a: string;
  icon: React.ReactElement<IconType>;
}

const services: ReadonlyArray<Service> = [
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
    link: "/pakalpojumi/web-izstrade",
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
    link: "/pakalpojumi/mobilo-aplikaciju-izstrade",
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
    link: "/pakalpojumi/e-komercija",
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
    link: "/pakalpojumi/seo-optimizacija",
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
    link: "/pakalpojumi/digitalais-marketings",
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
    link: "/pakalpojumi/web-aplikacijas",
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
    link: "/#",
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
    link: "/#",
  },
];

const ServiceCard: React.FC<ServiceCardProps> = React.memo(
  ({ service, isSelected, onClick }) => (
    <motion.div
      layout
      onClick={onClick}
      className={`bg-white bg-opacity-90 rounded-lg shadow-lg p-6 cursor-pointer transition-all duration-300 ${
        isSelected ? "col-span-2 row-span-2" : ""
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="text-4xl text-[#EEC71B] mb-4" aria-hidden="true">
        {service.icon}
      </div>
      <h2 className="text-xl font-bold mb-2 text-[#3D3B4A]">{service.title}</h2>
      <p className="text-gray-600 mb-4">{service.description}</p>
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3 className="font-bold mb-2">Galvenās Iezīmes:</h3>
            <ul className="list-none pl-0 mb-4">
              {service.details.map((detail, index) => (
                <li key={index} className="flex items-center mb-2">
                  <FiCheck className="text-[#EEC71B] mr-2" aria-hidden="true" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
            <Card className="bg-gray-100 mb-4">
              <CardHeader>
                <CardTitle className="text-lg">
                  Veiksmes Stāsts: {service.caseStudy.client}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{service.caseStudy.result}</p>
              </CardContent>
            </Card>
            <Button
              asChild
              className="w-full bg-[#EEC71B] text-[#3D3B4A] hover:bg-[#3D3B4A] hover:text-white transition-colors duration-300"
            >
              <a href={service.link}>
                Uzzināt Vairāk
                <FiExternalLink className="ml-2" aria-hidden="true" />
              </a>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
);

ServiceCard.displayName = "ServiceCard";

const FAQCard: React.FC<{
  faq: FAQ;
  index: number;
  expandedFAQ: number | null;
  setExpandedFAQ: (index: number | null) => void;
}> = React.memo(({ faq, index, expandedFAQ, setExpandedFAQ }) => {
  const isExpanded = expandedFAQ === index;
  const isAnyExpanded = expandedFAQ !== null;

  return (
    <motion.div
      className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 flex flex-col
          ${
            isAnyExpanded && !isExpanded ? "opacity-40 pointer-events-none" : ""
          }
          ${isExpanded ? "row-span-2" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
    >
      <div className="p-6 flex-grow flex flex-col">
        <button
          className="flex items-center mb-4 cursor-pointer w-full text-left"
          onClick={() => setExpandedFAQ(isExpanded ? null : index)}
          aria-expanded={isExpanded}
        >
          <motion.div
            className="text-3xl text-[#EEC71B] mr-4 flex-shrink-0"
            animate={
              isExpanded
                ? {}
                : {
                    scale: [1, 1.1, 1],
                    transition: { repeat: Infinity, duration: 2 },
                  }
            }
            aria-hidden="true"
          >
            {faq.icon}
          </motion.div>
          <h3 className="font-bold text-lg text-[#3D3B4A]">{faq.q}</h3>
        </button>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-2"
            >
              <p className="text-gray-700">{faq.a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <button
        className={`w-full p-4 text-left focus:outline-none bg-gray-100 hover:bg-gray-200 transition-colors duration-300 cursor-pointer mt-auto`}
        onClick={() => setExpandedFAQ(isExpanded ? null : index)}
      >
        <div className="flex justify-between items-center">
          <span className="font-semibold text-[#3D3B4A]">
            {isExpanded ? "Aizvērt" : "Lasīt vairāk"}
          </span>
          {isExpanded ? (
            <FiMinusCircle
              className="text-[#EEC71B] text-xl"
              aria-hidden="true"
            />
          ) : (
            <FiPlusCircle
              className="text-[#EEC71B] text-xl"
              aria-hidden="true"
            />
          )}
        </div>
      </button>
    </motion.div>
  );
});

FAQCard.displayName = "FAQCard";

const PakalpojumiPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.pageYOffset;
      setScrollProgress(currentScroll / totalScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const faqs: ReadonlyArray<FAQ> = useMemo(
    () => [
      {
        q: "Kāds ir tipiskais mājas lapas izstrādes process un laiks?",
        a: "Mājas lapas izstrādes process ietver vairākus posmus: izpēti, plānošanu, dizainu, izstrādi, testēšanu un palaišanu. Vienkāršākiem projektiem tas var aizņemt 4-6 nedēļas, savukārt sarežģītākiem – 2-4 mēnešus. Mēs vienmēr cenšamies optimizēt procesu, saglabājot augstu kvalitāti.",
        icon: <FiCode />,
      },
      {
        q: "Kādus mājas lapu uzturēšanas pakalpojumus jūs piedāvājat?",
        a: "Mēs piedāvājam visaptverošus mājas lapu uzturēšanas pakalpojumus, kas ietver regulārus drošības atjauninājumus, veiktspējas optimizāciju, satura pārvaldību, rezerves kopēšanu un tehnisko atbalstu. Mūsu mērķis ir nodrošināt, lai jūsu vietne vienmēr darbotos nevainojami un būtu droša.",
        icon: <FiRefreshCw />,
      },
      {
        q: "Kā jūs nodrošināt projektu termiņu ievērošanu?",
        a: "Mēs izmantojam Agile metodoloģiju un rūpīgi plānojam katru projekta posmu. Regulāras tikšanās ar klientiem un iekšējās komandas sapulces palīdz mums sekot līdzi progresam un ātri risināt jebkādas problēmas. Mūsu mērķis ir nodrošināt ne tikai termiņu ievērošanu, bet arī augstu kvalitāti.",
        icon: <FiClock />,
      },
      {
        q: "Kā jūs nodrošināt mājas lapu drošību?",
        a: "Drošība ir mūsu galvenā prioritāte. Mēs izmantojam jaunākos drošības protokolus, regulāri veicam drošības auditus, izmantojam SSL sertifikātus un implementējam vairāku līmeņu autentifikāciju. Turklāt mēs regulāri atjauninām visas sistēmas un apmācām klientus par labākajām drošības praksēm.",
        icon: <FiShield />,
      },
      {
        q: "Kā jūs nodrošināt, ka mājas lapa būs optimizēta meklētājprogrammām (SEO)?",
        a: "SEO ir integrēta mūsu izstrādes procesā no paša sākuma. Mēs izmantojam jaunākās SEO prakses, tostarp tehnisko optimizāciju, satura stratēģiju un off-page SEO taktikas. Mēs arī nodrošinām, ka vietne ir ātra, mobilajām ierīcēm draudzīga un ar kvalitatīvu saturu, kas ir būtiski mūsdienu SEO prasībām.",
        icon: <FiSearch />,
      },
      {
        q: "Vai jūs varat palīdzēt ar esošas mājas lapas modernizāciju?",
        a: "Jā, mēs specializējamies esošu mājas lapu atjaunināšanā un modernizācijā. Mūsu eksperti veic rūpīgu jūsu pašreizējās vietnes analīzi, identificē uzlabojumu iespējas un izstrādā stratēģiju, lai paaugstinātu tās veiktspēju, uzlabotu lietotāju pieredzi un palielinātu konversijas rādītājus.",
        icon: <FiZap />,
      },
      {
        q: "Kādas tehnoloģijas jūs izmantojat web risinājumu izstrādē?",
        a: "Mēs izmantojam jaunākās un efektīvākās web tehnoloģijas, tostarp React, Vue.js, Angular front-end izstrādei, Node.js un Python back-end risinājumiem, kā arī AWS un Azure mākoņpakalpojumus hostinga risinājumiem. Mūsu pieeja ir elastīga, un mēs izvēlamies tehnoloģijas, kas vislabāk atbilst katra projekta specifiskajām vajadzībām.",
        icon: <FiLayers />,
      },
      {
        q: "Vai jūs piedāvājat atbalstu pēc projekta pabeigšanas?",
        a: "Jā, mēs piedāvājam dažādus pēcprojekta atbalsta plānus. Tie ietver regulāru uzturēšanu, satura atjaunināšanu, veiktspējas optimizāciju un tehnisko atbalstu. Mēs uzskatām, ka ilgtermiņa partnerība ir atslēga uz jūsu digitālā projekta ilgtspējīgu panākumu.",
        icon: <FiUsers />,
      },
      {
        q: "Kā jūs pielāgojat savus pakalpojumus dažādu nozaru uzņēmumiem?",
        a: "Mēs lepojamies ar savu spēju pielāgoties dažādu nozaru specifiskajām vajadzībām. Mūsu komanda veic padziļinātu izpēti par katru nozari, ar kuru strādājam, lai izprastu tās unikālās problēmas un iespējas. Mēs izmantojam šīs zināšanas, lai pielāgotu mūsu risinājumus, integrējot nozarei specifiskas funkcijas un labākās prakses. Turklāt mēs cieši sadarbojamies ar klientiem, lai nodrošinātu, ka mūsu risinājumi pilnībā atbilst viņu biznesa mērķiem un nozares standartiem.",
        icon: <FiGlobe />,
      },
    ],
    []
  );

  const handleServiceClick = useCallback((index: number) => {
    setSelectedService((prevSelected) =>
      prevSelected === index ? null : index
    );
  }, []);

  const handleFAQExpand = useCallback((index: number) => {
    setExpandedFAQ((prevExpanded) => (prevExpanded === index ? null : index));
  }, []);

  return (
    <TooltipProvider>
      <DownArrowGuide />
      <DoContainer />
      <div className="min-h-screen overflow-hidden relative">
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-[#EEC71B] z-50"
          style={{ scaleX: scrollProgress }}
        />
        <main className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16 relative"
          >
            {/* Subtle design elements */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl">
              <div className="relative mb-4">
                <div className="w-full h-2 bg-[#8CB8B4] rounded-full blur-[3px]"></div>
              </div>
              <div className="relative mb-4">
                <div className="w-3/4 h-2 bg-[#EEC71B] rounded-full blur-[2px] mx-auto"></div>
              </div>
              <div className="relative">
                <div className="w-1/2 h-2 bg-[#CF4B43] rounded-full blur-[1px] mx-auto"></div>
              </div>
            </div>
            <div className="pt-12">
              <h1 className="text-4xl md:text-5xl font-bold text-[#3D3B4A] mb-4">
                Digitālie Risinājumi Jūsu Biznesam
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-6">
                Inovatīvas tehnoloģijas • Radošas stratēģijas • Izmērāmi
                rezultāti
              </p>
              <div className="w-24 h-1 bg-[#EEC71B] mx-auto mb-8"></div>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                WebWorks piedāvā progresīvus digitālos risinājumus, kas ne tikai
                atbilst jūsu biznesa vajadzībām, bet arī pārspēj konkurentu
                piedāvājumus. Mūsu ekspertu komanda ir gatava pārvērst jūsu
                vīziju realitātē.
              </p>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                service={service}
                isSelected={selectedService === index}
                onClick={() => handleServiceClick(index)}
              />
            ))}
          </div>
          <WhyChooseWebWorksSection />
          {/* Enhanced FAQ Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-bold text-[#3D3B4A] mb-8 text-center">
              Bieži Uzdotie Jautājumi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {faqs.map((faq, index) => (
                <FAQCard
                  key={index}
                  faq={faq}
                  index={index}
                  expandedFAQ={expandedFAQ}
                  setExpandedFAQ={handleFAQExpand}
                />
              ))}
            </div>
          </motion.section>
          <OurInnovativeApproachesSection />
          <TechStack />
          <CallToAction />
        </main>
      </div>
    </TooltipProvider>
  );
};

export default React.memo(PakalpojumiPage);
