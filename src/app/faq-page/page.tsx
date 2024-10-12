"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiPlus,
  FiMinus,
  FiClock,
  FiThumbsUp,
  FiThumbsDown,
  FiMessageSquare,
  FiTrendingUp,
  FiShield,
  FiDollarSign,
  FiMonitor,
  FiBook,
  IconType,
} from "react-icons/fi";
import Header from "../../components/Header";
import Footer from "@/components/footer";

interface FAQ {
  question: string;
  answer: string;
  complexity: 1 | 2 | 3;
  category: string;
  icon: React.ReactElement<IconType>;
  relatedQuestions: number[];
}

const faqs: FAQ[] = [
  {
    question: "Kā es varu paātrināt savu mājaslapu?",
    answer:
      "Mājaslapas ātrumu var uzlabot, optimizējot attēlus, izmantojot kešatmiņu, minimizējot CSS un JavaScript failus, un izvēloties ātru un uzticamu hostinga pakalpojumu sniedzēju. Regulāri pārbaudiet lapas ielādes ātrumu un veiciet nepieciešamos uzlabojumus.",
    complexity: 3,
    category: "Optimizācija",
    icon: <FiTrendingUp />,
    relatedQuestions: [2, 5],
  },
  {
    question: "Kā es varu aizsargāt savu mājaslapu no hakeriem?",
    answer:
      "Lai aizsargātu mājaslapu, izmantojiet drošu HTTPS protokolu, regulāri atjauniniet visas sistēmas un spraudņus, izmantojiet spēcīgas paroles, ieviestiet divfaktoru autentifikāciju, un regulāri veidojiet rezerves kopijas. Apsveriet arī Web Application Firewall (WAF) izmantošanu papildu aizsardzībai.",
    complexity: 3,
    category: "Drošība",
    icon: <FiShield />,
    relatedQuestions: [4, 7],
  },
  {
    question: "Kā es varu integrēt sociālos medijus savā mājaslapā?",
    answer:
      "Sociālo mediju integrācija var ietvert sociālo tīklu pogas, dalīšanās funkcijas, un sociālo mediju plūsmu iekļaušanu. Izmantojiet sociālo mediju API vai gatavus spraudņus, lai pievienotu šīs funkcijas. Pārliecinieties, ka integrācija ir responsīva un nepalēnina jūsu vietni.",
    complexity: 2,
    category: "Mārketings",
    icon: <FiMessageSquare />,
    relatedQuestions: [0, 6],
  },
  {
    question: "Kā es varu uzlabot savas mājaslapas konversijas rādītājus?",
    answer:
      "Lai uzlabotu konversijas, fokusējieties uz lietotāja pieredzi, optimizējiet ielādes ātrumu, izveidojiet pārliecinošus CTA (call-to-action) elementus, izmantojiet A/B testēšanu, un nodrošiniet skaidru un vērtīgu saturu. Analizējiet lietotāju uzvedību ar analītikas rīkiem un pastāvīgi pielāgojiet savu stratēģiju.",
    complexity: 3,
    category: "Optimizācija",
    icon: <FiTrendingUp />,
    relatedQuestions: [1, 8],
  },
  {
    question:
      "Kā es varu izveidot e-komercijas funkcionalitāti savā mājaslapā?",
    answer:
      "E-komercijas funkcionalitāti var pievienot, izmantojot platformas kā WooCommerce (WordPress), Shopify vai Magento. Izvēlieties platformu, kas atbilst jūsu biznesa vajadzībām, integrējiet drošus maksājumu gateway, optimizējiet produktu lapas un nodrošiniet vienkāršu pirkšanas procesu.",
    complexity: 3,
    category: "E-komercija",
    icon: <FiDollarSign />,
    relatedQuestions: [3, 9],
  },
  {
    question:
      "Kā es varu nodrošināt, ka mana mājaslapa ir pieejama cilvēkiem ar īpašām vajadzībām?",
    answer:
      "Lai uzlabotu pieejamību, izmantojiet skaidru un lasāmu fontu, nodrošiniet pietiekamu kontrastu, pievienojiet alt tekstus attēliem, strukturējiet saturu ar virsrakstiem, nodrošiniet tastatūras navigāciju un sekojiet WCAG vadlīnijām. Regulāri testējiet savu vietni ar pieejamības rīkiem.",
    complexity: 2,
    category: "Pieejamība",
    icon: <FiMonitor />,
    relatedQuestions: [0, 5],
  },
  {
    question: "Kā es varu izveidot daudzvalodu mājaslapu?",
    answer:
      "Daudzvalodu mājaslapas izveidei izmantojiet CMS ar iebūvētu valodu atbalstu vai specializētus spraudņus. Strukturējiet URL, izmantojot valodu kodus (piem., /lv/, /en/), nodrošiniet precīzus tulkojumus, un implementējiet valodas pārslēgšanas funkciju. Apsveriet arī hreflang tagu izmantošanu SEO vajadzībām.",
    complexity: 3,
    category: "Izstrāde",
    icon: <FiBook />,
    relatedQuestions: [2, 8],
  },
  {
    question: "Kā es varu optimizēt savu mājaslapu mobilajām ierīcēm?",
    answer:
      "Mobilā optimizācija ietver responsīva dizaina izmantošanu, ātra ielādes laika nodrošināšanu, skārienjutīgu elementu izmantošanu, un satura pielāgošanu mazākiem ekrāniem. Testējiet savu vietni uz dažādām mobilajām ierīcēm un izmantojiet Google Mobile-Friendly testu.",
    complexity: 2,
    category: "Optimizācija",
    icon: <FiMonitor />,
    relatedQuestions: [0, 4],
  },
  {
    question:
      "Kā es varu izmērīt savas mājaslapas veiktspēju un apmeklētāju uzvedību?",
    answer:
      "Izmantojiet analītikas rīkus kā Google Analytics vai Matomo, lai sekotu apmeklētāju plūsmai, lapas skatījumiem, un konversijām. Iestatiet mērķus un notikumus, analizējiet lietotāju ceļu un atbiruma rādītājus. Regulāri pārskatiet datus un veiciet nepieciešamās optimizācijas.",
    complexity: 2,
    category: "Analītika",
    icon: <FiTrendingUp />,
    relatedQuestions: [3, 7],
  },
  {
    question: "Kā es varu uzlabot savas mājaslapas ielādes ātrumu?",
    answer:
      "Lai uzlabotu ielādes ātrumu, optimizējiet attēlus, izmantojiet pārlūka kešatmiņu, minimizējiet un apvienojiet CSS/JavaScript failus, izmantojiet CDN, un izvēlieties ātru hostingu. Regulāri testējiet vietnes ātrumu ar rīkiem kā Google PageSpeed Insights un veiciet ieteiktos uzlabojumus.",
    complexity: 3,
    category: "Optimizācija",
    icon: <FiClock />,
    relatedQuestions: [1, 6],
  },
];

// Add answers for related questions
const relatedAnswers: Record<string, string> = {
  "Kā es varu paātrināt savu mājaslapu?":
    "Lai paātrinātu mājaslapu, optimizējiet attēlus, izmantojiet kešatmiņu, minimizējiet CSS un JavaScript failus, un izvēlieties ātru hostingu. Regulāri veiciet ātruma testus un optimizējiet saturu. Apsveriet arī CDN izmantošanu statiskajam saturam.",

  "Kā es varu aizsargāt savu mājaslapu no hakeriem?":
    "Aizsargājiet mājaslapu, izmantojot HTTPS, regulāri atjauninot sistēmas, izmantojot drošas paroles un divfaktoru autentifikāciju. Apsveriet Web Application Firewall (WAF) izmantošanu papildu aizsardzībai. Regulāri veiciet drošības auditus un izglītojiet savu komandu par kiberdrošības labākajām praksēm.",

  "Kā es varu integrēt sociālos medijus savā mājaslapā?":
    "Integrējiet sociālos medijus, pievienojot dalīšanās pogas, iegultos sociālo mediju plūsmas un sociālo tīklu pieteikšanās opcijas. Izmantojiet oficiālās sociālo mediju API vai spraudņus, lai nodrošinātu drošu un efektīvu integrāciju. Pārliecinieties, ka sociālo mediju elementi nepalēnina jūsu vietni.",

  "Kā es varu uzlabot savas mājaslapas konversijas rādītājus?":
    "Uzlabojiet konversijas, optimizējot ielādes ātrumu, izveidojot pārliecinošus CTA (call-to-action) elementus un nodrošinot skaidru, vērtīgu saturu. Izmantojiet A/B testēšanu, lai optimizētu dizainu un saturu. Analizējiet lietotāju uzvedību ar analītikas rīkiem un pastāvīgi pielāgojiet savu stratēģiju.",

  "Kā es varu izveidot e-komercijas funkcionalitāti savā mājaslapā?":
    "E-komercijas funkcionalitāti var pievienot, izmantojot platformas kā WooCommerce (WordPress), Shopify vai Magento. Izvēlieties platformu, kas atbilst jūsu biznesa vajadzībām, integrējiet drošus maksājumu risinājumus, optimizējiet produktu lapas un nodrošiniet vienkāršu pirkšanas procesu. Pievērsiet uzmanību mobilajai optimizācijai un ātrai ielādei.",

  "Kā es varu nodrošināt, ka mana mājaslapa ir pieejama cilvēkiem ar īpašām vajadzībām?":
    "Lai uzlabotu pieejamību, izmantojiet skaidru un lasāmu fontu, nodrošiniet pietiekamu kontrastu, pievienojiet alt tekstus attēliem, strukturējiet saturu ar virsrakstiem un nodrošiniet tastatūras navigāciju. Sekojiet WCAG vadlīnijām un regulāri testējiet savu vietni ar pieejamības rīkiem. Apsveriet arī teksta izmēra maiņas un ekrāna lasītāju atbalsta opcijas.",

  "Kā es varu izveidot daudzvalodu mājaslapu?":
    "Daudzvalodu mājaslapas izveidei izmantojiet CMS ar iebūvētu valodu atbalstu vai specializētus spraudņus. Strukturējiet URL, izmantojot valodu kodus (piem., /lv/, /en/), nodrošiniet precīzus tulkojumus un implementējiet valodas pārslēgšanas funkciju. Izmantojiet hreflang tagus SEO vajadzībām un pārliecinieties, ka saturs ir pielāgots katrai valodai un kultūrai.",

  "Kā es varu optimizēt savu mājaslapu mobilajām ierīcēm?":
    "Mobilā optimizācija ietver responsīva dizaina izmantošanu, ātra ielādes laika nodrošināšanu, skārienjutīgu elementu izmantošanu un satura pielāgošanu mazākiem ekrāniem. Izmantojiet mobilajām ierīcēm draudzīgas navigācijas risinājumus, optimizējiet attēlus un testējiet savu vietni uz dažādām mobilajām ierīcēm. Regulāri pārbaudiet mobilās lietojamības rādītājus.",

  "Kā es varu izmērīt savas mājaslapas veiktspēju un apmeklētāju uzvedību?":
    "Izmantojiet analītikas rīkus kā Google Analytics vai Matomo, lai sekotu apmeklētāju plūsmai, lapas skatījumiem un konversijām. Iestatiet mērķus un notikumus, analizējiet lietotāju ceļu un atbiruma rādītājus. Izmantojiet karstuma kartes un sesiju ierakstus, lai labāk izprastu lietotāju uzvedību. Regulāri pārskatiet datus un veiciet nepieciešamās optimizācijas.",

  "Kā es varu uzlabot savas mājaslapas ielādes ātrumu?":
    "Lai uzlabotu ielādes ātrumu, optimizējiet attēlus, izmantojiet pārlūka kešatmiņu, minimizējiet un apvienojiet CSS/JavaScript failus, izmantojiet CDN un izvēlieties ātru hostingu. Izmantojiet lazy loading attēliem un saturam, kas nav tūlītēji nepieciešams. Regulāri testējiet vietnes ātrumu ar rīkiem kā Google PageSpeed Insights un veiciet ieteiktos uzlabojumus.",
};

interface ComplexityIndicatorProps {
  level: 1 | 2 | 3;
}

const ComplexityIndicator: React.FC<ComplexityIndicatorProps> = React.memo(
  ({ level }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i <= level ? "bg-[#EEC71B]" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    );
  }
);

ComplexityIndicator.displayName = "ComplexityIndicator";

interface RelatedQuestionProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
}

const RelatedQuestion: React.FC<RelatedQuestionProps> = React.memo(
  ({ question, answer, isOpen, toggleOpen }) => {
    return (
      <div className="mt-2">
        <button
          className="flex justify-between items-center w-full text-left text-sm font-medium text-gray-700 hover:text-gray-900"
          onClick={toggleOpen}
        >
          <span>{question}</span>
          <span className="ml-2">{isOpen ? <FiMinus /> : <FiPlus />}</span>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="mt-2 text-sm text-gray-600">{answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

RelatedQuestion.displayName = "RelatedQuestion";

interface FAQItemProps {
  faq: FAQ;
  isOpen: boolean;
  toggleOpen: () => void;
  relatedFAQs: FAQ[];
}

const FAQItem: React.FC<FAQItemProps> = React.memo(
  ({ faq, isOpen, toggleOpen, relatedFAQs }) => {
    const [openRelatedQuestion, setOpenRelatedQuestion] = useState<
      number | null
    >(null);

    const toggleRelatedQuestion = useCallback((index: number) => {
      setOpenRelatedQuestion((prev) => (prev === index ? null : index));
    }, []);

    return (
      <motion.div
        className="border-b border-gray-200 py-4"
        initial={false}
        animate={{
          backgroundColor: isOpen ? "rgba(238, 199, 27, 0.1)" : "transparent",
        }}
        transition={{ duration: 0.3 }}
      >
        <button
          className="flex justify-between items-center w-full text-left"
          onClick={toggleOpen}
        >
          <span className="flex items-center">
            <span className="mr-2">{faq.icon}</span>
            <span className="text-lg font-semibold">{faq.question}</span>
          </span>
          <span className="text-2xl">{isOpen ? <FiMinus /> : <FiPlus />}</span>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="mt-2 text-gray-600">{faq.answer}</p>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">{faq.category}</span>
                  <ComplexityIndicator level={faq.complexity} />
                </div>
                <div className="flex space-x-2">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <FiThumbsUp />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <FiThumbsDown />
                  </button>
                </div>
              </div>
              {relatedFAQs.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Saistītie jautājumi:</h4>
                  {relatedFAQs.map((relatedFAQ, index) => (
                    <RelatedQuestion
                      key={relatedFAQ.question}
                      question={relatedFAQ.question}
                      answer={relatedAnswers[relatedFAQ.question]}
                      isOpen={openRelatedQuestion === index}
                      toggleOpen={() => toggleRelatedQuestion(index)}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);

FAQItem.displayName = "FAQItem";

const FAQPage: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredFAQs, setFilteredFAQs] = useState<FAQ[]>(faqs);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  useEffect(() => {
    const filtered = faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFAQs(filtered);
  }, [searchTerm]);

  const getRelatedFAQs = useCallback((relatedQuestions: number[]): FAQ[] => {
    return faqs.filter((_, index) => relatedQuestions.includes(index));
  }, []);

  const toggleFAQ = useCallback((index: number) => {
    setOpenFAQ((prev) => (prev === index ? null : index));
  }, []);

  const memoizedFAQItems = useMemo(
    () =>
      filteredFAQs.map((faq, index) => (
        <FAQItem
          key={faq.question}
          faq={faq}
          isOpen={openFAQ === index}
          toggleOpen={() => toggleFAQ(index)}
          relatedFAQs={getRelatedFAQs(faq.relatedQuestions)}
        />
      )),
    [filteredFAQs, openFAQ, toggleFAQ, getRelatedFAQs]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F3F5F4] to-white">
      <Head>
        <title>
          Bieži Uzdotie Jautājumi | WebWorks - Jūsu Digitālais Partneris
        </title>
        <meta
          name="description"
          content="Uzziniet atbildes uz biežāk uzdotajiem jautājumiem par web izstrādi, dizainu, SEO un digitālo mārketingu. WebWorks ekspertu padomi un skaidrojumi."
        />
        <meta
          name="keywords"
          content="FAQ, bieži uzdotie jautājumi, web izstrāde, web dizains, SEO, digitālais mārketings, responsīvs dizains, CMS, Latvija"
        />
        <link rel="canonical" href="https://www.webworks.lv/faq" />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-[#3D3B4A] mb-8">
          Bieži Uzdotie Jautājumi
        </h1>

        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Meklēt jautājumus..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-4 pr-12 rounded-full border-2 border-[#EEC71B] focus:outline-none focus:ring-2 focus:ring-[#EEC71B] focus:border-transparent"
            />
            <FiSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl text-[#EEC71B]" />
          </div>
        </div>

        <div className="max-w-3xl mx-auto">{memoizedFAQItems}</div>

        <div className="max-w-3xl mx-auto mt-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">
            Neatradāt atbildi uz savu jautājumu?
          </h2>
          <p className="mb-4">
            Mēs vienmēr cenšamies uzlabot mūsu FAQ sadaļu. Ja jūs neatradāt
            atbildi uz savu jautājumu, lūdzu, uzdodiet to šeit, un mēs
            centīsimies atbildēt pēc iespējas ātrāk.
          </p>
          <div className="flex">
            <input
              type="text"
              placeholder="Jūsu jautājums..."
              className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#EEC71B]"
            />
            <button className="bg-[#EEC71B] text-white px-4 py-2 rounded-r-md hover:bg-opacity-90 transition-colors duration-300">
              <FiMessageSquare className="inline-block mr-2" />
              Uzdot Jautājumu
            </button>
          </div>
        </div>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </div>
  );
};

export default FAQPage;
