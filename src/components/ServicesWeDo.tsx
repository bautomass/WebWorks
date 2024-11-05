"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  createContext,
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

// Loading context for managing loading states
const LoadingContext = createContext<{
  progress: number;
  isLoading: boolean;
}>({
  progress: 0,
  isLoading: false,
});

// Dynamic imports for better performance
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

// Type definitions with improved accessibility considerations
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
  readonly ariaLabel?: string;
}

interface ServiceCardProps {
  readonly service: Service;
  readonly isSelected: boolean;
  readonly onClick: () => void;
  readonly index: number;
}

interface FAQ {
  readonly q: string;
  readonly a: string;
  readonly icon: React.ReactElement<IconType>;
  readonly id: string;
}

interface FAQCardProps {
  readonly faq: FAQ;
  readonly index: number;
  readonly expandedFAQ: number | null;
  readonly setExpandedFAQ: (index: number | null) => void;
  readonly totalFAQs: number;
}

const Sparkle: React.FC<{ delay: number; position: string }> = React.memo(
  ({ delay, position }) => {
    const colors = [
      "bg-[#EEC71B]", // Original gold
      "bg-[#FFE074]", // Lighter gold
      "bg-[#8CB8B4]/70", // Subtle teal
      "bg-white", // White sparkle
    ];

    const sizes = ["w-1 h-1", "w-1.5 h-1.5", "w-2 h-2", "w-0.5 h-0.5"];

    // Randomly select color and size
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = sizes[Math.floor(Math.random() * sizes.length)];

    const sparkleVariants = {
      animate: {
        scale: [0, 1, 0],
        opacity: [0, 0.8, 0],
        y: [0, -15, -30],
        x: [0, Math.random() * 10 - 5, Math.random() * 20 - 10],
        rotate: [0, 180, 360],
      },
    };
    return (
      <motion.div
        className={`absolute ${position} ${size} ${color} rounded-full
      backdrop-blur-[0.5px] shadow-sm`}
        initial={{ scale: 0, opacity: 0 }}
        animate="animate"
        variants={sparkleVariants}
        transition={{
          duration: 2 + Math.random(),
          delay,
          repeat: Infinity,
          repeatDelay: 1 + Math.random() * 2,
        }}
        style={{
          filter: "blur(0.2px)",
        }}
        aria-hidden="true"
      />
    );
  }
);

Sparkle.displayName = "Sparkle";

const SparkleGroup: React.FC = React.memo(() => {
  const positions = useMemo(
    () => [
      // Top section
      "top-1/4 left-1/4",
      "top-1/6 right-1/3",
      "top-1/3 right-1/4",
      // Middle section
      "top-1/2 left-1/3",
      "top-1/2 right-1/3",
      "top-[45%] left-1/4",
      // Bottom section
      "bottom-1/4 left-1/3",
      "bottom-1/3 right-1/4",
      "bottom-1/2 left-1/4",
      // Additional corner positions
      "top-[15%] left-[15%]",
      "top-[20%] right-[20%]",
      "bottom-[20%] left-[20%]",
    ],
    []
  );

  const extraPositions = useMemo(() => {
    return Array.from({ length: 6 }, () => {
      const top = Math.random() * 80 + 10; // 10% to 90%
      const left = Math.random() * 80 + 10;
      return `top-[${top}%] left-[${left}%]`;
    });
  }, []);

  const allPositions = [...positions, ...extraPositions];
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      {allPositions.map((position, index) => (
        <Sparkle
          key={`sparkle-${index}`}
          position={position}
          delay={index * 0.15}
        />
      ))}
    </div>
  );
});

SparkleGroup.displayName = "SparkleGroup";

// Services data with enhanced accessibility information
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
    ariaLabel: "Mājas lapu izstrādes pakalpojumi",
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
    ariaLabel: "Mobilo aplikāciju izstrādes pakalpojumi",
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
    ariaLabel: "E-komercijas risinājumu pakalpojumi",
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
    ariaLabel: "SEO optimizācijas pakalpojumi",
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
    ariaLabel: "Digitālā mārketinga pakalpojumi",
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
    ariaLabel: "Web aplikāciju izstrādes pakalpojumi",
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
    ariaLabel: "Kiberdrošības pakalpojumi",
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
    ariaLabel: "Mājas lapu uzturēšanas pakalpojumi",
  },
];

// FAQ data with enhanced accessibility
const faqs: ReadonlyArray<FAQ> = [
  {
    q: "Kāds ir tipiskais mājas lapas izstrādes process un laiks?",
    a: "Mājas lapas izstrādes process ietver vairākus posmus: izpēti, plānošanu, dizainu, izstrādi, testēšanu un palaišanu. Vienkāršākiem projektiem tas var aizņemt 4-6 nedēļas, savukārt sarežģītākiem – 2-4 mēnešus. Mēs vienmēr cenšamies optimizēt procesu, saglabājot augstu kvalitāti.",
    icon: <FiCode />,
    id: "faq-development-process",
  },
  {
    q: "Kādus mājas lapu uzturēšanas pakalpojumus jūs piedāvājat?",
    a: "Mēs piedāvājam visaptverošus mājas lapu uzturēšanas pakalpojumus, kas ietver regulārus drošības atjauninājumus, veiktspējas optimizāciju, satura pārvaldību, rezerves kopēšanu un tehnisko atbalstu. Mūsu mērķis ir nodrošināt, lai jūsu vietne vienmēr darbotos nevainojami un būtu droša.",
    icon: <FiRefreshCw />,
    id: "faq-maintenance-services",
  },
  {
    q: "Kā jūs nodrošināt projektu termiņu ievērošanu?",
    a: "Mēs izmantojam Agile metodoloģiju un rūpīgi plānojam katru projekta posmu. Regulāras tikšanās ar klientiem un iekšējās komandas sapulces palīdz mums sekot līdzi progresam un ātri risināt jebkādas problēmas. Mūsu mērķis ir nodrošināt ne tikai termiņu ievērošanu, bet arī augstu kvalitāti.",
    icon: <FiClock />,
    id: "faq-project-timeline",
  },
  {
    q: "Kā jūs nodrošināt mājas lapu drošību?",
    a: "Drošība ir mūsu galvenā prioritāte. Mēs izmantojam jaunākos drošības protokolus, regulāri veicam drošības auditus, izmantojam SSL sertifikātus un implementējam vairāku līmeņu autentifikāciju. Turklāt mēs regulāri atjauninām visas sistēmas un apmācām klientus par labākajām drošības praksēm.",
    icon: <FiShield />,
    id: "faq-security",
  },
  {
    q: "Kā jūs nodrošināt, ka mājas lapa būs optimizēta meklētājprogrammām (SEO)?",
    a: "SEO ir integrēta mūsu izstrādes procesā no paša sākuma. Mēs izmantojam jaunākās SEO prakses, tostarp tehnisko optimizāciju, satura stratēģiju un off-page SEO taktikas. Mēs arī nodrošinām, ka vietne ir ātra, mobilajām ierīcēm draudzīga un ar kvalitatīvu saturu, kas ir būtiski mūsdienu SEO prasībām.",
    icon: <FiSearch />,
    id: "faq-seo",
  },
  {
    q: "Vai jūs varat palīdzēt ar esošas mājas lapas modernizāciju?",
    a: "Jā, mēs specializējamies esošu mājas lapu atjaunināšanā un modernizācijā. Mūsu eksperti veic rūpīgu jūsu pašreizējās vietnes analīzi, identificē uzlabojumu iespējas un izstrādā stratēģiju, lai paaugstinātu tās veiktspēju, uzlabotu lietotāju pieredzi un palielinātu konversijas rādītājus.",
    icon: <FiZap />,
    id: "faq-modernization",
  },
  {
    q: "Kādas tehnoloģijas jūs izmantojat web risinājumu izstrādē?",
    a: "Mēs izmantojam jaunākās un efektīvākās web tehnoloģijas, tostarp React, Vue.js, Angular front-end izstrādei, Node.js un Python back-end risinājumiem, kā arī AWS un Azure mākoņpakalpojumus hostinga risinājumiem. Mūsu pieeja ir elastīga, un mēs izvēlamies tehnoloģijas, kas vislabāk atbilst katra projekta specifiskajām vajadzībām.",
    icon: <FiLayers />,
    id: "faq-technologies",
  },
  {
    q: "Vai jūs piedāvājat atbalstu pēc projekta pabeigšanas?",
    a: "Jā, mēs piedāvājam dažādus pēcprojekta atbalsta plānus. Tie ietver regulāru uzturēšanu, satura atjaunināšanu, veiktspējas optimizāciju un tehnisko atbalstu. Mēs uzskatām, ka ilgtermiņa partnerība ir atslēga uz jūsu digitālā projekta ilgtspējīgu panākumu.",
    icon: <FiUsers />,
    id: "faq-support",
  },
  {
    q: "Kā jūs pielāgojat savus pakalpojumus dažādu nozaru uzņēmumiem?",
    a: "Mēs lepojamies ar savu spēju pielāgoties dažādu nozaru specifiskajām vajadzībām. Mūsu komanda veic padziļinātu izpēti par katru nozari, ar kuru strādājam, lai izprastu tās unikālās problēmas un iespējas. Mēs izmantojam šīs zināšanas, lai pielāgotu mūsu risinājumus, integrējot nozarei specifiskas funkcijas un labākās prakses.",
    icon: <FiGlobe />,
    id: "faq-industry-adaptation",
  },
];
// Enhanced ServiceCard Component with full accessibility
// const ServiceCard: React.FC<ServiceCardProps> = React.memo(
//   ({ service, isSelected, onClick, index }) => {
//     const cardRef = useRef<HTMLDivElement>(null);

//     // Handle keyboard interactions
//     const handleKeyDown = useCallback(
//       (e: React.KeyboardEvent) => {
//         if (e.key === "Enter" || e.key === " ") {
//           e.preventDefault();
//           onClick();
//         }
//         // Handle Escape key when card is expanded
//         if (e.key === "Escape" && isSelected) {
//           e.preventDefault();
//           onClick();
//         }
//       },
//       [onClick, isSelected]
//     );

//     return (
//       <motion.div
//         ref={cardRef}
//         layout
//         onClick={onClick}
//         className={`bg-white bg-opacity-90 rounded-lg shadow-lg p-6 cursor-pointer transition-all duration-300 ${
//           isSelected ? "col-span-2 row-span-2" : ""
//         }`}
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         role="button"
//         tabIndex={0}
//         aria-expanded={isSelected}
//         aria-label={service.ariaLabel || service.title}
//         aria-controls={`service-content-${index}`}
//         onKeyDown={handleKeyDown}
//         data-expanded={isSelected}
//       >
//         <div className="text-4xl text-[#EEC71B] mb-4" aria-hidden="true">
//           {service.icon}
//         </div>
//         <h2 className="text-xl font-bold mb-2 text-[#3D3B4A]">
//           {service.title}
//         </h2>
//         <p className="text-gray-600 mb-4">{service.description}</p>
//         <AnimatePresence mode="wait">
//           {isSelected && (
//             <motion.div
//               id={`service-content-${index}`}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               aria-label={`${service.title} detalizēta informācija`}
//             >
//               <h3 className="font-bold mb-2">Galvenās Iezīmes:</h3>
//               <ul
//                 className="list-none pl-0 mb-4"
//                 role="list"
//                 aria-label={`${service.title} galvenās iezīmes`}
//               >
//                 {service.details.map((detail, idx) => (
//                   <li
//                     key={idx}
//                     className="flex items-center mb-2"
//                     role="listitem"
//                   >
//                     <FiCheck
//                       className="text-[#EEC71B] mr-2"
//                       aria-hidden="true"
//                     />
//                     <span>{detail}</span>
//                   </li>
//                 ))}
//               </ul>
//               <Card className="bg-gradient-to-br from-white to-gray-50 mb-4 overflow-hidden relative">
//                 <div
//                   className="absolute inset-0 bg-gradient-to-r from-[#EEC71B]/5 to-transparent"
//                   style={{
//                     backgroundImage:
//                       "radial-gradient(circle at 50% 50%, rgba(238, 199, 27, 0.05), transparent)",
//                   }}
//                 />
//                 <SparkleGroup />
//                 <CardHeader className="border-b border-gray-100">
//                   <CardTitle className="text-lg">Veiksmes Stāsts</CardTitle>
//                 </CardHeader>
//                 <CardContent className="pt-4">
//                   <div className="space-y-2">
//                     <p className="text-gray-700">{service.caseStudy.result}</p>
//                     <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
//                       <FiClock
//                         className="text-[#EEC71B]"
//                         aria-hidden="true"
//                         role="img"
//                       />
//                       <span>{service.caseStudy.timeline}</span>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Button
//                 asChild
//                 className="w-full bg-[#EEC71B] text-[#3D3B4A] hover:bg-[#3D3B4A] hover:text-white transition-colors duration-300"
//               >
//                 <a
//                   href={service.link}
//                   onClick={(e) => e.stopPropagation()}
//                   className="flex items-center justify-center"
//                   aria-label={`Uzzināt vairāk par ${service.title.toLowerCase()}`}
//                 >
//                   <span>Uzzināt Vairāk</span>
//                   <FiExternalLink className="ml-2" aria-hidden="true" />
//                 </a>
//               </Button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     );
//   }
// );

const ServiceCard: React.FC<ServiceCardProps> = React.memo(
  ({ service, isSelected, onClick, index }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
        if (e.key === "Escape" && isSelected) {
          e.preventDefault();
          onClick();
        }
      },
      [onClick, isSelected]
    );

    return (
      <motion.div
        ref={cardRef}
        layout
        role="listitem"
        className={`bg-white bg-opacity-90 rounded-lg shadow-lg p-6 transition-all duration-300 ${
          isSelected ? "col-span-2 row-span-2" : ""
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <button
          onClick={onClick}
          onKeyDown={handleKeyDown}
          className="w-full text-left focus:outline-none focus:ring-2 focus:ring-[#EEC71B] rounded"
          aria-expanded={isSelected}
          aria-controls={`service-content-${index}`}
          aria-label={service.ariaLabel || service.title}
        >
          <div className="text-4xl text-[#EEC71B] mb-4" aria-hidden="true">
            {service.icon}
          </div>
          <h2 className="text-xl font-bold mb-2 text-[#3D3B4A]">
            {service.title}
          </h2>
          <p className="text-gray-600 mb-4">{service.description}</p>
        </button>

        <AnimatePresence mode="wait">
          {isSelected && (
            <motion.div
              id={`service-content-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-label={`${service.title} detalizēta informācija`}
            >
              <h3 className="font-bold mb-2">Galvenās Iezīmes:</h3>
              <ul
                className="list-none pl-0 mb-4"
                aria-label={`${service.title} galvenās iezīmes`}
              >
                {service.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center mb-2">
                    <FiCheck
                      className="text-[#EEC71B] mr-2"
                      aria-hidden="true"
                    />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
              <Card className="bg-gradient-to-br from-white to-gray-50 mb-4 overflow-hidden relative">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-[#EEC71B]/5 to-transparent"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 50% 50%, rgba(238, 199, 27, 0.05), transparent)",
                  }}
                />
                <SparkleGroup />
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="text-lg">Veiksmes Stāsts</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <p className="text-gray-700">{service.caseStudy.result}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                      <FiClock
                        className="text-[#EEC71B]"
                        aria-hidden="true"
                        role="img"
                      />
                      <span>{service.caseStudy.timeline}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <a
                href={service.link}
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-[#EEC71B] text-[#3D3B4A] hover:bg-[#3D3B4A] hover:text-white transition-colors duration-300 rounded-md"
                aria-label={`Uzzināt vairāk par ${service.title.toLowerCase()}`}
              >
                <span>Uzzināt Vairāk</span>
                <FiExternalLink className="ml-2" aria-hidden="true" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);

ServiceCard.displayName = "ServiceCard";

// Enhanced FAQCard Component with full accessibility
const FAQCard: React.FC<FAQCardProps> = React.memo(
  ({ faq, index, expandedFAQ, setExpandedFAQ, totalFAQs }) => {
    const isExpanded = expandedFAQ === index;
    const isAnyExpanded = expandedFAQ !== null;

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        // Handle standard button interactions
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setExpandedFAQ(isExpanded ? null : index);
        }

        // Handle arrow key navigation
        if (isExpanded) {
          if (e.key === "ArrowDown" && index < totalFAQs - 1) {
            e.preventDefault();
            setExpandedFAQ(index + 1);
          } else if (e.key === "ArrowUp" && index > 0) {
            e.preventDefault();
            setExpandedFAQ(index - 1);
          } else if (e.key === "Escape") {
            e.preventDefault();
            setExpandedFAQ(null);
          }
        }
      },
      [isExpanded, index, setExpandedFAQ, totalFAQs]
    );

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
        role="listitem"
      >
        <div className="p-6 flex-grow flex flex-col">
          <button
            className="flex items-center mb-4 cursor-pointer w-full text-left focus:outline-none focus:ring-2 focus:ring-[#EEC71B] rounded"
            onClick={() => setExpandedFAQ(isExpanded ? null : index)}
            onKeyDown={handleKeyDown}
            aria-expanded={isExpanded}
            aria-controls={faq.id}
            aria-label={faq.q}
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
                id={faq.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-2"
                role="region"
                aria-label={`Atbilde uz jautājumu: ${faq.q}`}
              >
                <p className="text-gray-700">{faq.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button
          className="w-full p-4 text-left focus:outline-none focus:ring-2 focus:ring-[#EEC71B] bg-gray-100 hover:bg-gray-200 transition-colors duration-300 cursor-pointer mt-auto"
          onClick={() => setExpandedFAQ(isExpanded ? null : index)}
          aria-label={isExpanded ? "Aizvērt atbildi" : "Lasīt atbildi"}
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
  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const scrollListener = useRef<(() => void) | null>(null);
  const mainContentRef = useRef<HTMLElement>(null);

  // Loading state management
  useEffect(() => {
    const handleLoadingState = () => {
      setIsLoading(document.readyState !== "complete");
    };

    window.addEventListener("load", handleLoadingState);
    window.addEventListener("readystatechange", handleLoadingState);

    return () => {
      window.removeEventListener("load", handleLoadingState);
      window.removeEventListener("readystatechange", handleLoadingState);
    };
  }, []);

  // Scroll progress management with performance optimization
  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        if (mainContentRef.current) {
          const totalScroll =
            document.documentElement.scrollHeight - window.innerHeight;
          const currentScroll = window.pageYOffset;
          setScrollProgress(currentScroll / totalScroll);
        }
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

  // Service selection handling
  const handleServiceClick = useCallback(
    (index: number) => {
      setSelectedService((prev) => (prev === index ? null : index));
      // Announce to screen readers
      const service = services[index];
      const announcement =
        selectedService === index
          ? `${service.title} aizvērts`
          : `${service.title} atvērts`;

      const announcementElement = document.createElement("div");
      announcementElement.setAttribute("role", "status");
      announcementElement.setAttribute("aria-live", "polite");
      announcementElement.className = "sr-only";
      announcementElement.textContent = announcement;
      document.body.appendChild(announcementElement);
      setTimeout(() => document.body.removeChild(announcementElement), 1000);
    },
    [selectedService]
  );

  // FAQ expansion handling
  const handleFAQExpand = useCallback((index: number) => {
    setExpandedFAQ((prev) => (prev === index ? null : index));
  }, []);

  // Keyboard navigation for FAQ section
  const handleFAQKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (expandedFAQ !== null) {
        if (e.key === "Escape") {
          setExpandedFAQ(null);
        } else if (e.key === "ArrowDown" && expandedFAQ < faqs.length - 1) {
          setExpandedFAQ(expandedFAQ + 1);
        } else if (e.key === "ArrowUp" && expandedFAQ > 0) {
          setExpandedFAQ(expandedFAQ - 1);
        }
      }
    },
    [expandedFAQ]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleFAQKeyDown);
    return () => window.removeEventListener("keydown", handleFAQKeyDown);
  }, [handleFAQKeyDown]);

  return (
    <LoadingContext.Provider
      value={{ progress: scrollProgress * 100, isLoading }}
    >
      <TooltipProvider>
        {/* Skip link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-white focus:text-[#3D3B4A] focus:outline-none focus:ring-2 focus:ring-[#EEC71B]"
        >
          Pāriet uz galveno saturu
        </a>

        <DownArrowGuide />
        <DoContainer />

        <div className="min-h-screen overflow-hidden relative" role="document">
          {/* Progress indicator with proper ARIA */}
          <div
            role="progressbar"
            aria-label="Lapas ritināšanas progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(scrollProgress * 100)}
            className="sr-only"
          >
            <span>
              Lapas ritināšanas progress: {Math.round(scrollProgress * 100)}%
            </span>
          </div>

          {/* Visual progress bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-[#EEC71B] z-50"
            style={{ scaleX: scrollProgress }}
            aria-hidden="true"
          />

          {/* Main content */}
          <main
            ref={mainContentRef}
            id="main-content"
            className="container mx-auto px-4 py-16"
            role="main"
            aria-label="Galvenais saturs"
          >
            {/* Hero section */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16 relative"
            >
              <div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl"
                aria-hidden="true"
              >
                {/* Decorative elements */}
                <div className="relative mb-4">
                  <div className="w-full h-2 bg-[#8CB8B4] rounded-full blur-[3px]" />
                </div>
                <div className="relative mb-4">
                  <div className="w-3/4 h-2 bg-[#EEC71B] rounded-full blur-[2px] mx-auto" />
                </div>
                <div className="relative">
                  <div className="w-1/2 h-2 bg-[#CF4B43] rounded-full blur-[1px] mx-auto" />
                </div>
              </div>

              <div className="pt-12">
                <h1 className="text-4xl md:text-5xl font-bold text-[#3D3B4A] mb-4">
                  Digitālie Risinājumi Jūsu Biznesam
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-6">
                  <span className="sr-only">
                    Mūsu pakalpojumu galvenās iezīmes:
                  </span>
                  Inovatīvas tehnoloģijas • Radošas stratēģijas • Izmērāmi
                  rezultāti
                </p>
                <div
                  className="w-24 h-1 bg-[#EEC71B] mx-auto mb-8"
                  aria-hidden="true"
                />
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  WebWorks piedāvā progresīvus digitālos risinājumus, kas ne
                  tikai atbilst jūsu biznesa vajadzībām, bet arī pārspēj
                  konkurentu piedāvājumus. Mūsu ekspertu komanda ir gatava
                  pārvērst jūsu vīziju realitātē.
                </p>
              </div>
            </motion.div>

            {/* Services section */}
            <section aria-labelledby="services-title" className="mb-24">
              <h2 id="services-title" className="sr-only">
                Mūsu pakalpojumi
              </h2>
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                role="list"
                aria-label="Pakalpojumu saraksts"
              >
                {services.map((service, index) => (
                  <ServiceCard
                    key={index}
                    service={service}
                    isSelected={selectedService === index}
                    onClick={() => handleServiceClick(index)}
                    index={index}
                  />
                ))}
              </div>
            </section>

            <WhyChooseWebWorksSection />

            {/* FAQ Section */}
            <motion.section
              role="region"
              aria-labelledby="faq-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="mt-16"
            >
              <h2
                id="faq-title"
                className="text-3xl font-bold text-[#3D3B4A] mb-8 text-center"
              >
                Bieži Uzdotie Jautājumi
              </h2>
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                role="list"
                aria-label="Bieži uzdotie jautājumi un atbildes"
              >
                {faqs.map((faq, index) => (
                  <FAQCard
                    key={index}
                    faq={faq}
                    index={index}
                    expandedFAQ={expandedFAQ}
                    setExpandedFAQ={handleFAQExpand}
                    totalFAQs={faqs.length}
                  />
                ))}
              </div>
            </motion.section>

            {/* Additional sections */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="mt-24"
              role="region"
              aria-label="Mūsu inovatīvās pieejas"
            >
              <OurInnovativeApproachesSection />
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="mt-24"
              role="region"
              aria-label="Izmantotās tehnoloģijas"
            >
              <TechStack />
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.8 }}
              className="mt-24 mb-16"
              role="region"
              aria-label="Sazināties ar mums"
            >
              <CallToAction />
            </motion.section>
          </main>

          {/* Loading and navigation announcements */}
          <div className="sr-only" role="status" aria-live="polite">
            {isLoading ? "Lapa tiek ielādēta..." : "Lapa ir ielādēta"}
          </div>

          {/* Keyboard navigation helper */}
          <div className="sr-only" role="note">
            Izmantojiet Tab taustiņu, lai pārvietotos starp pakalpojumiem, un
            Enter vai Space taustiņu, lai tos atvērtu. Izmantojiet
            bulttaustiņus, lai pārvietotos starp BUJ sadaļām. Nospiediet Enter,
            lai atvērtu vai aizvērtu BUJ. Nospiediet Escape taustiņu, lai
            aizvērtu atvērto sadaļu.
          </div>
        </div>
      </TooltipProvider>
    </LoadingContext.Provider>
  );
};

PakalpojumiPage.displayName = "PakalpojumiPage";

export const getStaticProps = async () => {
  return {
    props: {},
    revalidate: 60 * 60 * 24,
  };
};

export default React.memo(PakalpojumiPage);
