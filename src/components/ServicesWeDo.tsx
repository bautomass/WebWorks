"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
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
  type IconType,
} from "react-icons/fi";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from "next/dynamic";

const DownArrowGuide = dynamic(() => import("../components/DownArrowGuide"), {
  ssr: false,
});
const DoContainer = dynamic(() => import("../components/DoContainer"), {
  ssr: false,
});
const WhyChooseWebWorksSection = dynamic(
  () => import("./WhyChooseWebWorksSection"),
  {
    ssr: false,
  }
);
const OurInnovativeApproachesSection = dynamic(
  () => import("./InnovativeApproaches"),
  {
    ssr: false,
  }
);
const CallToAction = dynamic(() => import("./CallToAction"), {
  ssr: false,
});
const TechStack = dynamic(() => import("./techStack"), {
  ssr: false,
});

// Types
interface Service {
  readonly icon: React.ReactNode;
  readonly title: string;
  readonly description: string;
  readonly details: readonly string[];
  readonly caseStudy: {
    readonly result: string;
    readonly timeline: string;
  };
  readonly link: string;
}

interface ServiceCardProps {
  readonly service: Service;
  readonly isSelected: boolean;
  readonly onClick: () => void;
}

interface FAQ {
  readonly q: string;
  readonly a: string;
  readonly icon: React.ReactElement<IconType>;
}

interface FAQCardProps {
  readonly faq: FAQ;
  readonly index: number;
  readonly expandedFAQ: number | null;
  readonly setExpandedFAQ: (index: number | null) => void;
}

// Sparkle Components
const Sparkle: React.FC<{ delay: number; position: string }> = React.memo(
  ({ delay, position }) => {
    const sparkleVariants = {
      animate: {
        scale: [0, 1, 0],
        opacity: [0, 1, 0],
        y: [0, -10, -20],
        x: [0, 5, 10],
      },
    };

    return (
      <motion.div
        className={`absolute w-1 h-1 bg-[#EEC71B] rounded-full ${position}`}
        initial={{ scale: 0, opacity: 0 }}
        animate="animate"
        variants={sparkleVariants}
        transition={{
          duration: 1.5,
          delay,
          repeat: Infinity,
          repeatDelay: 2,
        }}
      />
    );
  }
);

Sparkle.displayName = "Sparkle";

const SparkleGroup: React.FC = React.memo(() => {
  const positions = useMemo(
    () => [
      "top-1/4 left-1/4",
      "top-1/3 right-1/4",
      "bottom-1/4 left-1/3",
      "top-1/2 right-1/3",
      "bottom-1/3 right-1/4",
      "bottom-1/2 left-1/4",
    ],
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {positions.map((position, index) => (
        <Sparkle key={position} position={position} delay={index * 0.2} />
      ))}
    </div>
  );
});

SparkleGroup.displayName = "SparkleGroup";

// Services Data
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
      result:
        "Vietējam restorānam izveidojām jaunu mājaslapu, kas uzlaboja mobilos pasūtījumus par 47%. Google Core Web Vitals rādītāji sasniedza zaļo līmeni visos mērījumos.",
      timeline: "Projekts realizēts 6 nedēļās",
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
      result:
        "Sporta centra aplikācija sasniedza 2,800 aktīvus lietotājus pirmajā mēnesī. Treniņu rezervācijas pieauga par 34%, lietotāju atsauksmes - 4.7/5.",
      timeline: "Izstrādes periods: 4 mēneši",
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
      result:
        "Mājražotāju kooperatīva e-veikals sasniedza 22% konversijas rādītāju. Vidējais pirkuma grozs pieauga par 31% pēc personalizācijas ieviešanas.",
      timeline: "Izstrāde: 2 mēneši",
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
      result:
        "Veselības pakalpojumu sniedzējam organiskā satiksme pieauga par 156% 6 mēnešu laikā. Konversijas no organiskās meklēšanas uzlabojās par 43%.",
      timeline: "6 mēnešu optimizācijas periods",
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
      result:
        "B2B pakalpojumu sniedzējam LinkedIn kampaņa ģenerēja 47 kvalificētus potenciālos klientus. E-pasta kampaņu atvēršanas rādītājs pieauga līdz 32%.",
      timeline: "3 mēnešu kampaņas periods",
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
      result:
        "Izstrādātā noliktavas vadības sistēma samazināja pasūtījumu apstrādes laiku par 42% un uzlaboja krājumu precizitāti līdz 99.2%.",
      timeline: "Izstrāde un ieviešana: 4 mēneši",
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
      result:
        "Finanšu pakalpojumu uzņēmumam ieviestie protokoli novērsa 99.9% automatizēto uzbrukumu. Darbinieku drošības novērtējums pieauga no 62% līdz 94%.",
      timeline: "Ieviests 3 mēnešu laikā",
    },
    link: "/pakalpojumi/kiberdrosiba",
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
      result:
        "E-komercijas platformas optimizācija samazināja lapu ielādes laiku par 64%. Servera pieejamība sasniedza 99.98%.",
      timeline: "Nepārtraukta uzturēšana kopš 2023. gada",
    },
    link: "/pakalpojumi/uzturesana",
  },
];

// FAQ Data
const faqs: ReadonlyArray<FAQ> = [
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
    a: "Mēs lepojamies ar savu spēju pielāgoties dažādu nozaru specifiskajām vajadzībām. Mūsu komanda veic padziļinātu izpēti par katru nozari, ar kuru strādājam, lai izprastu tās unikālās problēmas un iespējas. Mēs izmantojam šīs zināšanas, lai pielāgotu mūsu risinājumus, integrējot nozarei specifiskas funkcijas un labākās prakses.",
    icon: <FiGlobe />,
  },
];

// ServiceCard Component
const ServiceCard: React.FC<ServiceCardProps> = React.memo(
  ({ service, isSelected, onClick }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    return (
      <motion.div
        ref={cardRef}
        layout
        onClick={onClick}
        className={`bg-white bg-opacity-90 rounded-lg shadow-lg p-6 cursor-pointer transition-all duration-300 ${
          isSelected ? "col-span-2 row-span-2" : ""
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        role="button"
        tabIndex={0}
        aria-expanded={isSelected}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
      >
        <div className="text-4xl text-[#EEC71B] mb-4" aria-hidden="true">
          {service.icon}
        </div>
        <h2 className="text-xl font-bold mb-2 text-[#3D3B4A]">
          {service.title}
        </h2>
        <p className="text-gray-600 mb-4">{service.description}</p>
        <AnimatePresence mode="wait">
          {isSelected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h3 className="font-bold mb-2">Galvenās Iezīmes:</h3>
              <ul className="list-none pl-0 mb-4" role="list">
                {service.details.map((detail, index) => (
                  <li key={index} className="flex items-center mb-2">
                    <FiCheck
                      className="text-[#EEC71B] mr-2"
                      aria-hidden="true"
                    />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
              <Card className="bg-gradient-to-br from-white to-gray-50 mb-4 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#EEC71B]/5 to-transparent" />
                <SparkleGroup />
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="text-lg">Veiksmes Stāsts</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <p className="text-gray-700">{service.caseStudy.result}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                      <FiClock className="text-[#EEC71B]" aria-hidden="true" />
                      <span>{service.caseStudy.timeline}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Button
                asChild
                className="w-full bg-[#EEC71B] text-[#3D3B4A] hover:bg-[#3D3B4A] hover:text-white transition-colors duration-300"
              >
                <a
                  href={service.link}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-center"
                >
                  <span>Uzzināt Vairāk</span>
                  <FiExternalLink className="ml-2" aria-hidden="true" />
                </a>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);

ServiceCard.displayName = "ServiceCard";

// FAQ Card Component
const FAQCard: React.FC<FAQCardProps> = React.memo(
  ({ faq, index, expandedFAQ, setExpandedFAQ }) => {
    const isExpanded = expandedFAQ === index;
    const isAnyExpanded = expandedFAQ !== null;

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setExpandedFAQ(isExpanded ? null : index);
        }
      },
      [isExpanded, index, setExpandedFAQ]
    );

    return (
      <motion.div
        className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 flex flex-col
        ${isAnyExpanded && !isExpanded ? "opacity-40 pointer-events-none" : ""}
        ${isExpanded ? "row-span-2" : ""}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 * index }}
      >
        <div className="p-6 flex-grow flex flex-col">
          <button
            className="flex items-center mb-4 cursor-pointer w-full text-left focus:outline-none focus:ring-2 focus:ring-[#EEC71B] rounded"
            onClick={() => setExpandedFAQ(isExpanded ? null : index)}
            onKeyDown={handleKeyDown}
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
          <AnimatePresence mode="wait">
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
          className="w-full p-4 text-left focus:outline-none focus:ring-2 focus:ring-[#EEC71B] bg-gray-100 hover:bg-gray-200 transition-colors duration-300 cursor-pointer mt-auto"
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
  }
);

FAQCard.displayName = "FAQCard";

// Main PakalpojumiPage Component
const PakalpojumiPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const scrollListener = useRef<(() => void) | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const totalScroll =
          document.documentElement.scrollHeight - window.innerHeight;
        const currentScroll = window.pageYOffset;
        setScrollProgress(currentScroll / totalScroll);
      });
    };

    scrollListener.current = handleScroll;
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (scrollListener.current) {
        window.removeEventListener("scroll", scrollListener.current);
      }
    };
  }, []);

  const handleServiceClick = useCallback((index: number) => {
    setSelectedService((prev) => (prev === index ? null : index));
  }, []);

  const handleFAQExpand = useCallback((index: number) => {
    setExpandedFAQ((prev) => (prev === index ? null : index));
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

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="mt-24"
          >
            <OurInnovativeApproachesSection />
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="mt-24"
          >
            <TechStack />
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.8 }}
            className="mt-24 mb-16"
          >
            <CallToAction />
          </motion.section>
        </main>

        {/* Scroll to top button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{
            opacity: scrollProgress > 0.2 ? 1 : 0,
            y: scrollProgress > 0.2 ? 0 : 20,
          }}
          className="fixed bottom-8 right-8 bg-[#EEC71B] text-[#3D3B4A] p-4 rounded-full shadow-lg hover:bg-[#3D3B4A] hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#EEC71B] focus:ring-offset-2"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>

        {/* Loading indicator for dynamic imports */}
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={scrollProgress * 100}
          className="sr-only"
        >
          Loading progress: {Math.round(scrollProgress * 100)}%
        </div>

        {/* Keyboard navigation helper */}
        <div className="sr-only">
          Use tab to navigate between services and press Enter to expand them.
          Use arrow keys to navigate between FAQ items.
        </div>
      </div>
    </TooltipProvider>
  );
};

export const getStaticProps = async () => {
  return {
    props: {},
    revalidate: 60 * 60 * 24,
  };
};

PakalpojumiPage.displayName = "PakalpojumiPage";

export default React.memo(PakalpojumiPage);
