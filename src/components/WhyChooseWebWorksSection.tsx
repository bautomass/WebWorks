import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiAward,
  FiUsers,
  FiZap,
  FiMonitor,
  FiRefreshCw,
  FiGlobe,
  FiCheck,
  FiShield,
  FiTrendingUp,
  FiCpu,
  FiHeadphones,
  FiDollarSign,
  FiThumbsUp,
  FiStar,
  FiBarChart,
  FiClock,
  FiTool,
  FiTarget,
  IconType,
} from "react-icons/fi";
import { Tooltip } from "@/components/ui/tooltip";

interface CarouselItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  bullets: string[];
}

interface CarouselProps {
  items: CarouselItem[];
}

interface TabContentItem {
  subtitle: string;
  description: string;
  stats?: Array<{ value: string; label: string }>;
  list?: string[];
}

interface TabContentProps {
  content: TabContentItem[];
}

interface TabContent {
  icon: React.ReactElement<IconType>;
  title: string;
  content: TabContentItem[];
}

interface TabsContent {
  [key: string]: TabContent;
}

const Carousel: React.FC<CarouselProps> = React.memo(({ items }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg shadow-2xl bg-gradient-to-br from-[#8CB8B4] to-[#EEC71B]">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-center p-4 sm:p-8 relative">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-5xl sm:text-8xl text-white mb-4 sm:mb-6 transform hover:scale-110 transition-transform duration-300"
            >
              {items[currentIndex].icon}
            </motion.div>
            <motion.h3
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-xl sm:text-3xl font-bold text-white mb-2 sm:mb-4"
            >
              {items[currentIndex].title}
            </motion.h3>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-sm sm:text-xl text-white mb-3 sm:mb-6"
            >
              {items[currentIndex].description}
            </motion.p>
            <motion.ul
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="space-y-1 sm:space-y-2"
            >
              {items[currentIndex].bullets.map((bullet, index) => (
                <li
                  key={index}
                  className="flex items-center text-white text-sm sm:text-base"
                >
                  <FiCheck
                    className="mr-2 flex-shrink-0 text-[#EEC71B]"
                    aria-hidden="true"
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </motion.ul>
            <div
              className="absolute -bottom-4 -right-4 w-24 h-24 bg-white opacity-10 rounded-full transform rotate-45"
              aria-hidden="true"
            />
            <div
              className="absolute -top-4 -left-4 w-16 h-16 bg-white opacity-10 rounded-full"
              aria-hidden="true"
            />
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 sm:w-6 sm:h-6 p-0.5 sm:p-1 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white scale-125" : "bg-white/50"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          >
            <span className="block w-full h-full rounded-full bg-current"></span>
          </button>
        ))}
      </div>
    </div>
  );
});

Carousel.displayName = "Carousel";

const TabContent: React.FC<TabContentProps> = React.memo(({ content }) => (
  <div className="space-y-6">
    {content.map((item, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200"
      >
        <h4 className="font-bold text-xl text-[#3D3B4A] mb-3">
          {item.subtitle}
        </h4>
        <p className="text-gray-700 mb-4">{item.description}</p>
        {item.stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
            {item.stats.map((stat, statIndex) => (
              <div
                key={statIndex}
                className="text-center bg-white p-3 rounded shadow"
              >
                <p className="text-2xl font-bold text-[#3D3B4A]">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-700">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
        {item.list && (
          <ul className="mt-4 space-y-2">
            {item.list.map((listItem, listIndex) => (
              <li key={listIndex} className="flex items-center text-gray-700">
                <FiCheck className="mr-2 text-[#3D3B4A]" aria-hidden="true" />
                <span>{listItem}</span>
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    ))}
  </div>
));

TabContent.displayName = "TabContent";

const WhyChooseWebWorksSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("efficiency");

  const carouselItems: CarouselItem[] = useMemo(
    () => [
      {
        icon: <FiZap />,
        title: "Svaiga Pieeja",
        description: "Modernas tehnoloģijas un inovatīvi risinājumi",
        bullets: [
          "Jaunākās web tehnoloģijas",
          "Moderna kodu arhitektūra",
          "Inovatīva problēmu risināšana",
          "Atvērtība jaunām idejām",
        ],
      },
      {
        icon: <FiUsers />,
        title: "Personalizēta Sadarbība",
        description: "Cieša komunikācija un individuāla pieeja",
        bullets: [
          "Tiešs kontakts ar izstrādātājiem",
          "Elastīga projektu vadība",
          "Regulāras projekta atskaites",
          "Ātra reaģēšana uz izmaiņām",
        ],
      },
      {
        icon: <FiMonitor />,
        title: "Moderna UX/UI Pieeja",
        description: "Lietotājiem draudzīgi un vizuāli pievilcīgi risinājumi",
        bullets: [
          "Mūsdienīgs dizains",
          "Mobilā optimizācija",
          "Lietotāju testēšana",
          "Pastāvīgi uzlabojumi",
        ],
      },
      {
        icon: <FiStar />,
        title: "Entuziasms un Kvalitāte",
        description: "Aizrautīga pieeja katram projektam",
        bullets: [
          "Rūpīga kvalitātes kontrole",
          "Detalizēta kodu pārbaude",
          "Augsti standarti",
          "Nepārtraukta pilnveidošanās",
        ],
      },
      {
        icon: <FiCpu />,
        title: "Tehniskā Kompetence",
        description: "Specializācija modernās web tehnoloģijās",
        bullets: [
          "React & Next.js ekspertīze",
          "Mūsdienīga back-end izstrāde",
          "AWS mākoņrisinājumi",
          "Performance optimizācija",
        ],
      },
      {
        icon: <FiRefreshCw />,
        title: "Uzticams Atbalsts",
        description: "Pastāvīga komunikācija un tehniskā palīdzība",
        bullets: [
          "Ātra problēmu risināšana",
          "Regulāri atjauninājumi",
          "Tehniskās konsultācijas",
          "Ilgtermiņa partnerība",
        ],
      },
    ],
    []
  );

  const tabsContent: TabsContent = useMemo(
    () => ({
      efficiency: {
        icon: <FiTrendingUp />,
        title: "Efektivitāte un ROI",
        content: [
          {
            subtitle: "Biznesa Procesu Optimizācija",
            description:
              "Mūsu risinājumi optimizē jūsu procesus, ietaupot laiku un resursus.",
            stats: [
              { value: "35%", label: "Efektivitātes pieaugums" },
              { value: "28%", label: "Izmaksu samazinājums" },
              { value: "40%", label: "Ātrāka time-to-market" },
            ],
          },
          {
            subtitle: "Mērāmi Rezultāti",
            description:
              "Detalizēti pārskati par jūsu digitālo aktīvu veiktspēju.",
            list: [
              "Reāllaika datu vizualizācija",
              "Pielāgoti KPI un mērķu izsekošana",
              "Regulāri optimizācijas ieteikumi",
              "A/B testēšanas iespējas",
            ],
          },
        ],
      },
      security: {
        icon: <FiShield />,
        title: "Drošība un Uzticamība",
        content: [
          {
            subtitle: "Visaptverošs Drošības Protokols",
            description: "Augstākie nozares standarti jūsu datu aizsardzībai.",
            stats: [
              { value: "99.9%", label: "Pakalpojumu pieejamība" },
              { value: "0", label: "Veiksmīgi novērsti uzbrukumi" },
              { value: "100%", label: "GDPR atbilstība" },
            ],
          },
          {
            subtitle: "Nepārtraukta Uzraudzība",
            description:
              "24/7 sistēmu monitorings un ātra reaģēšana uz draudiem.",
            list: [
              "Automātiska draudu atklāšana",
              "Regulāri drošības auditi",
              "Penetrācijas testi",
              "Darbinieku drošības apmācības",
            ],
          },
        ],
      },
      scalability: {
        icon: <FiZap />,
        title: "Mērogojamība un Elastība",
        content: [
          {
            subtitle: "Elastīga Arhitektūra",
            description: "Risinājumi, kas pielāgojas jūsu biznesa izaugsmei.",
            stats: [
              { value: "10x", label: "Mērogošanas kapacitāte" },
              { value: "99%", label: "Klientu apmierinātība" },
              { value: "<0.1s", label: "Vidējais atbildes laiks" },
            ],
          },
          {
            subtitle: "Modulāra Pieeja",
            description: "Viegla jaunu funkciju pievienošana un integrācija.",
            list: [
              "Ātra funkciju ieviešana",
              "Vienkārša trešo pušu integrācija",
              "Efektīva resursu izmantošana",
              "Automatizēta testēšana un izvietošana",
            ],
          },
        ],
      },
      innovation: {
        icon: <FiCpu />,
        title: "Inovācijas un Tendences",
        content: [
          {
            subtitle: "Progresīvās Tehnoloģijas",
            description: "Jaunāko tendenču integrācija jūsu risinājumos.",
            stats: [
              { value: "15+", label: "Jaunas tehnoloģijas gadā" },
              { value: "30%", label: "Produktivitātes pieaugums" },
              { value: "5", label: "Patentu pieteikumi" },
            ],
          },
          {
            subtitle: "Pētniecība un Attīstība",
            description: "Nepārtraukta jaunu risinājumu izstrāde.",
            list: [
              "AI un ML integrācija",
              "IoT un Edge skaitļošana",
              "Kvantu skaitļošanas gatavība",
              "Blokķēdes tehnoloģiju izmantošana",
            ],
          },
        ],
      },
      support: {
        icon: <FiHeadphones />,
        title: "Atbalsts un Apmācība",
        content: [
          {
            subtitle: "Visaptverošs Atbalsts",
            description:
              "24/7 pieejama atbalsta komanda ātrai problēmu risināšanai.",
            stats: [
              { value: "<15min", label: "Vidējais reakcijas laiks" },
              { value: "98%", label: "Klientu apmierinātība" },
              { value: "24/7", label: "Atbalsta pieejamība" },
            ],
          },
          {
            subtitle: "Personalizētas Apmācības",
            description: "Pielāgotas apmācību programmas jūsu komandai.",
            list: [
              "Interaktīvi tiešsaistes kursi",
              "Praktiskie semināri",
              "Pastāvīgi atjaunināta dokumentācija",
              "Personalizēti apmācību plāni",
            ],
          },
        ],
      },
      roi: {
        icon: <FiDollarSign />,
        title: "Investīciju Atdeve",
        content: [
          {
            subtitle: "Finansiālā Ietekme",
            description:
              "Mūsu risinājumi nodrošina ievērojamu finansiālo atdevi.",
            stats: [
              { value: "250%", label: "Vidējā ROI" },
              { value: "18 mēn.", label: "Vidējais atmaksāšanās periods" },
              { value: "40%", label: "Ieņēmumu pieaugums" },
            ],
          },
          {
            subtitle: "Ilgtermiņa Vērtība",
            description:
              "Mūsu risinājumi rada ilgtermiņa vērtību jūsu biznesam.",
            list: [
              "Uzlabota klientu lojalitāte",
              "Palielināta tirgus daļa",
              "Samazinātas operacionālās izmaksas",
              "Ātrāka pielāgošanās tirgus izmaiņām",
            ],
          },
        ],
      },
      clientSuccess: {
        icon: <FiThumbsUp />,
        title: "Klientu Panākumi",
        content: [
          {
            subtitle: "Uz Rezultātiem Orientēta Pieeja",
            description:
              "Mēs koncentrējamies uz izmērāmiem rezultātiem un klientu panākumiem.",
            stats: [
              { value: "98%", label: "Projektu pabeigšanas rādītājs laikā" },
              { value: "95%", label: "Klientu apmierinātības rādītājs" },
              { value: "10+", label: "Nozaru pieredze" },
            ],
          },
          {
            subtitle: "Ilgtermiņa Partnerība",
            description:
              "Mēs veidojam ilgstošas attiecības ar mūsu klientiem, koncentrējoties uz viņu ilgtermiņa panākumiem.",
            list: [
              "Regulāras stratēģiskās konsultācijas",
              "Personalizēti izaugsmes plāni",
              "Nepārtraukta atbalsta un uzlabojumu programma",
              "Kopīga inovāciju izstrāde",
            ],
          },
        ],
      },
      qualityAssurance: {
        icon: <FiStar />,
        title: "Kvalitātes Nodrošināšana",
        content: [
          {
            subtitle: "Visaptverošs QA Process",
            description:
              "Mūsu stingrā kvalitātes kontrole nodrošina nevainojamus produktus.",
            stats: [
              { value: "99.9%", label: "Kodu pārklājums ar testiem" },
              { value: "<0.1%", label: "Kļūdu īpatsvars produkcijā" },
              { value: "100%", label: "Automatizēta testēšana" },
            ],
          },
          {
            subtitle: "Nepārtraukta Uzlabošana",
            description:
              "Mēs pastāvīgi pilnveidojam mūsu procesus un produktus.",
            list: [
              "Regulāras kodu pārbaudes",
              "Automatizēta kļūdu atklāšana",
              "Nepārtraukta integrācija un piegāde (CI/CD)",
              "Lietotāju atgriezeniskās saites integrācija",
            ],
          },
        ],
      },
      marketInsights: {
        icon: <FiBarChart />,
        title: "Tirgus Izpratne",
        content: [
          {
            subtitle: "Datu Vadīta Pieeja",
            description:
              "Mēs izmantojam tirgus datus, lai sniegtu jums konkurences priekšrocības.",
            stats: [
              { value: "1M+", label: "Analizētie datu punkti dienā" },
              { value: "50+", label: "Tirgus tendenču ziņojumi gadā" },
              { value: "30%", label: "Ātrāka reakcija uz tirgus izmaiņām" },
            ],
          },
          {
            subtitle: "Stratēģiskā Konsultēšana",
            description:
              "Mūsu eksperti palīdz jums pieņemt informētus lēmumus.",
            list: [
              "Personalizēti tirgus pārskati",
              "Konkurentu analīze",
              "Nākotnes tendenču prognozes",
              "Biznesa stratēģijas konsultācijas",
            ],
          },
        ],
      },
      timeToMarket: {
        icon: <FiClock />,
        title: "Ātrāks Time-to-Market",
        content: [
          {
            subtitle: "Efektīva Projektu Pārvaldība",
            description:
              "Mūsu optimizētie procesi palīdz jums ātrāk sasniegt tirgu.",
            stats: [
              { value: "40%", label: "Ātrāka produktu izlaišana" },
              { value: "30%", label: "Samazināts izstrādes cikls" },
              { value: "95%", label: "Projektu pabeigšana termiņā" },
            ],
          },
          {
            subtitle: "Agilā Metodoloģija",
            description:
              "Izmantojam elastīgas pieejas, lai ātri pielāgotos izmaiņām.",
            list: [
              "Regulāras iterācijas un piegādes",
              "Cieša sadarbība ar klientu",
              "Ātra atsauksmju ieviešana",
              "Nepārtraukta vērtības piegāde",
            ],
          },
        ],
      },
      customization: {
        icon: <FiTool />,
        title: "Pielāgošanas Iespējas",
        content: [
          {
            subtitle: "Individuāli Risinājumi",
            description:
              "Mēs veidojam risinājumus, kas precīzi atbilst jūsu biznesa vajadzībām.",
            stats: [
              { value: "100%", label: "Pielāgoti risinājumi" },
              {
                value: "90%",
                label: "Klientu, kas izvēlas individuālu pieeju",
              },
              {
                value: "15+",
                label: "Nozares, kurām esam pielāgojuši risinājumus",
              },
            ],
          },
          {
            subtitle: "Elastīga Arhitektūra",
            description:
              "Mūsu risinājumi ir veidoti, lai viegli pielāgotos jūsu mainīgajām vajadzībām.",
            list: [
              "Modulāra sistēmas uzbūve",
              "Viegla integrācija ar esošajām sistēmām",
              "Pielāgojama lietotāja saskarne",
              "Specifiskas nozares funkcionalitāte",
            ],
          },
        ],
      },
      sustainability: {
        icon: <FiTarget />,
        title: "Ilgtspējība un Sociālā Atbildība",
        content: [
          {
            subtitle: "Zaļās Tehnoloģijas",
            description:
              "Mēs izmantojam resursus efektīvi un veicinām ilgtspējīgu attīstību.",
            stats: [
              { value: "50%", label: "Enerģijas patēriņa samazinājums" },
              { value: "100%", label: "Atjaunojamās enerģijas izmantošana" },
              { value: "0", label: "Oglekļa emisijas" },
            ],
          },
          {
            subtitle: "Sociālā Ietekme",
            description:
              "Mēs aktīvi piedalāmies sabiedrības attīstībā un izglītošanā.",
            list: [
              "Tehnoloģiju apmācības programmas jauniešiem",
              "Atbalsts vietējām kopienām",
              "Daudzveidības un iekļaušanas iniciatīvas",
              "Ētiska AI un datu izmantošana",
            ],
          },
        ],
      },
    }),
    []
  );

  const handleTabChange = useCallback((key: string) => {
    setActiveTab(key);
  }, []);

  return (
    <section className="relative pt-5 mt-10 sm:mt-20 pb-10 sm:pb-20 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-web-pattern rounded-t-xl"></div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="title-highlight text-3xl sm:text-4xl md:text-5xl font-bold text-[#3D3B4A] mb-8 sm:mb-16 text-center relative inline-block left-1/2 transform -translate-x-1/2">
          Kāpēc Izvēlēties WebWorks
        </h2>

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          <div className="lg:w-2/5">
            <Carousel items={carouselItems} />
          </div>

          <div className="lg:w-3/5 mt-6 lg:mt-0">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 h-full overflow-hidden flex flex-col">
              <div className="flex flex-wrap justify-center gap-2 mb-4 sm:mb-6">
                {Object.entries(tabsContent).map(([key, { icon, title }]) => (
                  <Tooltip key={key} content={title}>
                    <button
                      className={`p-3 sm:p-4 rounded-full transition-all duration-300 ${
                        activeTab === key
                          ? "bg-[#3D3B4A] text-white shadow-md"
                          : "bg-gray-100 text-[#3D3B4A] hover:bg-gray-200"
                      }`}
                      onClick={() => handleTabChange(key)}
                      aria-label={title}
                      aria-pressed={activeTab === key}
                    >
                      {React.cloneElement(icon, { "aria-hidden": "true" })}
                    </button>
                  </Tooltip>
                ))}
              </div>

              <div className="overflow-y-auto flex-grow custom-scrollbar">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TabContent content={tabsContent[activeTab].content} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .bg-web-pattern {
          background-color: #f8f9fa;
          background-image: radial-gradient(#3d3b4a 1px, transparent 1px),
            linear-gradient(to right, #eec71b 2px, transparent 2px),
            linear-gradient(to bottom, #eec71b 2px, transparent 2px);
          background-size: 20px 20px, 60px 60px, 60px 60px;
          background-position: 0 0, 30px 30px, 30px 30px;
          mask-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 1) 70%,
            rgba(0, 0, 0, 0) 100%
          );
          -webkit-mask-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 1) 70%,
            rgba(0, 0, 0, 0) 100%
          );
        }
        .title-highlight {
          padding: 0.5em 1em;
          display: inline-block;
        }
        .title-highlight::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120%;
          height: 150%;
          background: radial-gradient(
            ellipse at center,
            rgba(248, 249, 250, 0.95) 0%,
            rgba(248, 249, 250, 0.7) 50%,
            rgba(248, 249, 250, 0) 80%
          );
          z-index: -1;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3d3b4a;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2a2937;
        }
      `}</style>
    </section>
  );
};

export default React.memo(WhyChooseWebWorksSection);
