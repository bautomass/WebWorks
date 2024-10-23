"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  FaSave,
  FaUndo,
  FaRedo,
  FaPalette,
  FaShoppingCart,
  FaPenSquare,
  FaBriefcase,
  FaGraduationCap,
  FaMobileAlt,
  FaSearch,
  FaLock,
  FaChartLine,
  FaServer,
  FaCheck,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Enhanced Types
interface ProjectState {
  websiteType?: string;
  websiteSubtype?: string; // New field for website subtypes
  colorScheme?: string;
  fontPair?: string;
  layout?: string;
  features: string[];
  name: string;
  timeline?: string; // New field
  budget?: string; // New field
  targetAudience?: string; // New field
  businessGoals?: string[]; // New field
  setupCosts: string[]; // New field for tracking selected setup costs
}

interface WebsiteSubtype {
  id: string;
  name: string;
  description: string;
  additionalPrice: number;
}

interface WebsiteType {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  basePrice: number;
  recommendedFeatures: string[];
  subtypes: WebsiteSubtype[]; // New field for subtypes
}

// Enhanced website types with subtypes
const websiteTypes: WebsiteType[] = [
  {
    id: "business",
    name: "Uzņēmuma mājaslapa",
    description: "Profesionāla un uzticamību raisoša mājaslapa jūsu uzņēmumam",
    icon: <FaBriefcase className="w-8 h-8" />,
    basePrice: 800,
    recommendedFeatures: [
      "contactForm",
      "responsiveDesign",
      "seo",
      "analytics",
    ],
    subtypes: [
      {
        id: "small",
        name: "Mazs bizness",
        description:
          "Ideāli piemērota maziem uzņēmumiem un individuālajiem komersantiem",
        additionalPrice: 0,
      },
      {
        id: "medium",
        name: "Vidējs uzņēmums",
        description: "Papildus funkcionalitāte augošiem uzņēmumiem",
        additionalPrice: 400,
      },
      {
        id: "corporate",
        name: "Korporatīvais",
        description: "Pilna servisa risinājums lieliem uzņēmumiem",
        additionalPrice: 800,
      },
    ],
  },
  {
    id: "ecommerce",
    name: "E-komercijas vietne",
    description: "Pilnvērtīgs interneta veikals ar drošiem maksājumiem",
    icon: <FaShoppingCart className="w-8 h-8" />,
    basePrice: 1500,
    recommendedFeatures: [
      "payments",
      "productCatalog",
      "cart",
      "customerAccounts",
    ],
    subtypes: [
      {
        id: "starter",
        name: "Sākuma veikals",
        description: "Līdz 100 produktiem, ideāls maziem veikaliem",
        additionalPrice: 0,
      },
      {
        id: "professional",
        name: "Profesionālais veikals",
        description: "Līdz 1000 produktiem ar paplašinātu funkcionalitāti",
        additionalPrice: 600,
      },
      {
        id: "enterprise",
        name: "Uzņēmuma veikals",
        description: "Neierobežots produktu skaits ar pilnu integrāciju",
        additionalPrice: 1200,
      },
    ],
  },
  {
    id: "portfolio",
    name: "Portfolio",
    description: "Eleganta vietne jūsu darbu un talantu prezentēšanai",
    icon: <FaPalette className="w-8 h-8" />,
    basePrice: 600,
    recommendedFeatures: ["gallery", "animations", "contactForm"],
    subtypes: [
      {
        id: "basic",
        name: "Pamata portfolio",
        description: "Vienkārša, bet eleganta darbu galerija",
        additionalPrice: 0,
      },
      {
        id: "creative",
        name: "Radošais portfolio",
        description: "Interaktīvs portfolio ar animācijām",
        additionalPrice: 300,
      },
      {
        id: "advanced",
        name: "Pro portfolio",
        description: "Pilnībā pielāgojams ar īpašiem efektiem",
        additionalPrice: 600,
      },
    ],
  },
  {
    id: "blog",
    name: "Blogs",
    description: "Moderna platforma jūsu stāstu un ideju publicēšanai",
    icon: <FaPenSquare className="w-8 h-8" />,
    basePrice: 500,
    recommendedFeatures: ["blog", "newsletter", "socialMedia"],
    subtypes: [
      {
        id: "personal",
        name: "Personālais blogs",
        description: "Ideāls individuāliem blogotājiem",
        additionalPrice: 0,
      },
      {
        id: "professional",
        name: "Pro blogs",
        description: "Blogs ar papildus funkcijām un monetizāciju",
        additionalPrice: 300,
      },
      {
        id: "magazine",
        name: "Žurnāla stils",
        description: "Daudzautoru blogs ar žurnāla izkārtojumu",
        additionalPrice: 500,
      },
    ],
  },
  {
    id: "education",
    name: "Mācību platforma",
    description: "Izglītības un apmācību materiālu vietne",
    icon: <FaGraduationCap className="w-8 h-8" />,
    basePrice: 1000,
    recommendedFeatures: ["userAccounts", "contentManagement", "videoPlayer"],
    subtypes: [
      {
        id: "courses",
        name: "Kursu vietne",
        description: "Vienkārša kursu un materiālu platforma",
        additionalPrice: 0,
      },
      {
        id: "interactive",
        name: "Interaktīvā platforma",
        description: "Ar testiem un progress tracking",
        additionalPrice: 500,
      },
      {
        id: "enterprise",
        name: "Izglītības portāls",
        description: "Pilna LMS ar visām funkcijām",
        additionalPrice: 1000,
      },
    ],
  },
];

// Setup costs definition
interface SetupCost {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  required: boolean;
  applicableTypes: string[];
}

const setupCosts: SetupCost[] = [
  {
    id: "domain",
    name: "Domēna vārds",
    description: "Jūsu vietnes adrese internetā (piem., jusuuznemums.lv)",
    monthlyPrice: 1,
    yearlyPrice: 12,
    required: true,
    applicableTypes: ["all"],
  },
  {
    id: "hosting",
    name: "Hostings",
    description: "Jūsu mājaslapas mitināšana uz mūsu serveriem",
    monthlyPrice: 10,
    yearlyPrice: 100,
    required: true,
    applicableTypes: ["all"],
  },
  {
    id: "ssl",
    name: "SSL Sertifikāts",
    description: "Drošai datu apmaiņai un SEO uzlabošanai",
    monthlyPrice: 5,
    yearlyPrice: 50,
    required: true,
    applicableTypes: ["all"],
  },
  {
    id: "cms",
    name: "Satura pārvaldības sistēma",
    description: "Ērta satura pārvaldība bez tehniskām zināšanām",
    monthlyPrice: 15,
    yearlyPrice: 150,
    required: false,
    applicableTypes: ["business", "blog", "portfolio"],
  },
  {
    id: "ecommerce_platform",
    name: "E-komercijas platforma",
    description: "Drošiem maksājumiem un preču pārvaldībai",
    monthlyPrice: 29,
    yearlyPrice: 290,
    required: true,
    applicableTypes: ["ecommerce"],
  },
  {
    id: "maintenance",
    name: "Uzturēšana un atbalsts",
    description: "Regulāri atjauninājumi un tehniskais atbalsts",
    monthlyPrice: 25,
    yearlyPrice: 250,
    required: false,
    applicableTypes: ["all"],
  },
];

// Color schemes with enhanced descriptions
const colorSchemes: ColorScheme[] = [
  {
    id: "professional",
    name: "Profesionālā",
    description: "Klasiskas krāsas, kas raisa uzticamību un profesionalitāti",
    colors: {
      primary: "#2c3e50",
      secondary: "#34495e",
      accent: "#3498db",
      background: "#ffffff",
      text: "#2c3e50",
    },
    recommendedFor: ["business", "portfolio"],
  },
  {
    id: "modern",
    name: "Modernā",
    description: "Tīrs, moderns dizains ar spilgtiem akcentiem",
    colors: {
      primary: "#000000",
      secondary: "#ffffff",
      accent: "#ff0066",
      background: "#f8f9fa",
      text: "#212529",
    },
    recommendedFor: ["portfolio", "blog"],
  },
  {
    id: "warm",
    name: "Siltā",
    description: "Silti un viesmīlīgi toņi, kas rada mājīgu sajūtu",
    colors: {
      primary: "#c0392b",
      secondary: "#d35400",
      accent: "#f1c40f",
      background: "#fff9f0",
      text: "#2c3e50",
    },
    recommendedFor: ["restaurant", "portfolio"],
  },
  {
    id: "nature",
    name: "Dabas",
    description: "Mierīgi, zaļie toņi harmoniskai saskaņai",
    colors: {
      primary: "#27ae60",
      secondary: "#2ecc71",
      accent: "#f1c40f",
      background: "#f4f9f4",
      text: "#2c3e50",
    },
    recommendedFor: ["blog", "portfolio"],
  },
  // New color scheme added
  {
    id: "creative",
    name: "Radošā",
    description: "Drosmīga un unikāla krāsu kombinācija radošiem projektiem",
    colors: {
      primary: "#9b59b6",
      secondary: "#8e44ad",
      accent: "#e74c3c",
      background: "#f0f0f0",
      text: "#2c3e50",
    },
    recommendedFor: ["portfolio", "creative"],
  },
];

const fontPairs: FontPair[] = [
  {
    id: "classic",
    name: "Klasiskais",
    heading: "Playfair Display",
    body: "Source Sans Pro",
    description: "Elegants un profesionāls, ideāls biznesam",
    preview: "Aa Bb Cc 123",
  },
  {
    id: "modern",
    name: "Modernais",
    heading: "Montserrat",
    body: "Open Sans",
    description: "Tīrs un laikmetīgs dizains",
    preview: "Aa Bb Cc 123",
  },
  {
    id: "minimal",
    name: "Minimālais",
    heading: "Helvetica Neue",
    body: "Arial",
    description: "Vienkāršs un viegli lasāms",
    preview: "Aa Bb Cc 123",
  },
  {
    id: "creative",
    name: "Radošais",
    heading: "Abril Fatface",
    body: "Roboto",
    description: "Izteiksmīgs un unikāls",
    preview: "Aa Bb Cc 123",
  },
  // New font pair added
  {
    id: "dynamic",
    name: "Dinamiskais",
    heading: "Lora",
    body: "Merriweather",
    description: "Moderns un dinamiks kontrasts",
    preview: "Aa Bb Cc 123",
  },
];

// Child-friendly layout descriptions
const layouts: Layout[] = [
  {
    id: "classic",
    name: "Klasiskais",
    description:
      "Kā tava iecienītākā grāmata - viss ir precīzi sakārtots un viegli atrodams! Augšā ir izvēlne, pa vidu - vissvarīgākā informācija, un apakšā - papildus lietas.",
    image: "/layouts/classic.svg",
    priceModifier: 1,
    recommendedFor: ["business", "portfolio"],
    features: ["header", "footer", "navigation"],
  },
  {
    id: "modern",
    name: "Modernais",
    description:
      "Iedomājies slidkalniņu - visa informācija plūstoši slīd no augšas uz leju! Kad ritini lapu, parādās jaunas, interesantas lietas.",
    image: "/layouts/modern.svg",
    priceModifier: 1.2,
    recommendedFor: ["portfolio", "startup"],
    features: ["animations", "parallax", "smoothScroll"],
  },
  {
    id: "minimal",
    name: "Vienkāršais",
    description:
      "Kā tīra, sakopta istaba - tikai pašas svarīgākās lietas, bez liekiem niekiem. Viegli atrast to, kas tev vajadzīgs!",
    image: "/layouts/minimal.svg",
    priceModifier: 0.9,
    recommendedFor: ["portfolio", "personal"],
    features: ["whitespace", "typography"],
  },
  {
    id: "magazine",
    name: "Žurnāla stils",
    description:
      "Līdzīgi kā tavs mīļākais žurnāls - daudz skaistu bilžu un interesantu stāstu, viss skaisti sakārtots mazākās daļās.",
    image: "/layouts/magazine.svg",
    priceModifier: 1.3,
    recommendedFor: ["blog", "news"],
    features: ["grid", "categories", "featured"],
  },
];
// Enhanced features with more detailed descriptions
const features: Feature[] = [
  {
    id: "responsiveDesign",
    name: "Responsīvs dizains",
    description:
      "Lapa izskatās labi uz visām ierīcēm - telefona, planšetes un datora",
    price: 200,
    icon: <FaMobileAlt />,
    applicableTypes: ["all"],
    complexity: "basic",
  },
  {
    id: "seo",
    name: "SEO optimizācija",
    description: "Jūsu mājaslapa būs viegli atrodama Google meklētājā",
    price: 300,
    icon: <FaSearch />,
    applicableTypes: ["all"],
    complexity: "intermediate",
  },
  {
    id: "contentManagement",
    name: "Satura pārvaldība",
    description: "Vienkārša sistēma tekstu un attēlu mainīšanai",
    price: 400,
    icon: <FaPenSquare />,
    applicableTypes: ["all"],
    complexity: "intermediate",
  },
  {
    id: "analytics",
    name: "Apmeklējumu analītika",
    description: "Uzziniet, kas un kā skatās jūsu mājaslapu",
    price: 250,
    icon: <FaChartLine />,
    applicableTypes: ["all"],
    complexity: "intermediate",
  },
  {
    id: "security",
    name: "Drošības pakotne",
    description: "Papildus aizsardzība pret uzlaušanu un vīrusiem",
    price: 350,
    icon: <FaLock />,
    applicableTypes: ["all"],
    complexity: "advanced",
  },
  // New feature added
  {
    id: "backups",
    name: "Automātiskās rezerves kopijas",
    description: "Regulāra datu dublēšana drošai glabāšanai",
    price: 150,
    icon: <FaServer />,
    applicableTypes: ["all"],
    complexity: "basic",
  },
];

// Main component
const SketchBuilder: React.FC = () => {
  const [step, setStep] = useState(0);
  const [project, setProject] = useState<ProjectState>({
    features: [],
    name: "",
    setupCosts: [], // Added for setup costs
    businessGoals: [], // Added for business goals
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [history, setHistory] = useState<ProjectState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [monthlyPrice, setMonthlyPrice] = useState(0); // Added for monthly costs
  const [yearlyPrice, setYearlyPrice] = useState(0); // Added for yearly costs

  // Enhanced steps array with more detailed descriptions
  const steps = [
    {
      title: "Projekta informācija",
      description:
        "Pastāstiet vairāk par savu projektu, lai varam labāk saprast jūsu vajadzības",
      component: ProjectInfoStep,
    },
    {
      title: "Mājaslapas tips",
      description:
        "Izvēlieties sev piemērotāko mājaslapas veidu un tā variantu",
      component: WebsiteTypeStep,
    },
    {
      title: "Dizaina elementi",
      description: "Pielāgojiet krāsas un fontus atbilstoši savam zīmolam",
      component: DesignStep,
    },
    {
      title: "Izkārtojums",
      description: "Izvēlieties, kā informācija tiks izvietota jūsu mājaslapā",
      component: LayoutStep,
    },
    {
      title: "Funkcionalitāte",
      description: "Atlasiet nepieciešamās funkcijas un papildinājumus",
      component: FeaturesStep,
    },
    {
      title: "Izmaksas un apstiprināšana",
      description: "Pārskatiet izmaksas un apstipriniet savu izvēli",
      component: CostSummaryStep,
    },
  ];

  // Enhanced price calculation with setup costs
  useEffect(() => {
    calculateTotalPrice();
  }, [project]);

  const calculateTotalPrice = useCallback(() => {
    let basePrice = 0;
    let monthlyTotal = 0;
    let yearlyTotal = 0;

    // Base price from website type
    if (project.websiteType) {
      const type = websiteTypes.find((t) => t.id === project.websiteType);
      if (type) {
        basePrice += type.basePrice;

        // Add subtype price if selected
        if (project.websiteSubtype) {
          const subtype = type.subtypes.find(
            (st) => st.id === project.websiteSubtype
          );
          if (subtype) {
            basePrice += subtype.additionalPrice;
          }
        }
      }
    }

    // Add feature prices
    project.features.forEach((featureId) => {
      const feature = features.find((f) => f.id === featureId);
      if (feature) {
        basePrice += feature.price;
      }
    });

    // Calculate setup costs
    project.setupCosts.forEach((costId) => {
      const cost = setupCosts.find((c) => c.id === costId);
      if (cost) {
        monthlyTotal += cost.monthlyPrice;
        yearlyTotal += cost.yearlyPrice;
      }
    });

    // Apply layout modifier
    if (project.layout) {
      const layout = layouts.find((l) => l.id === project.layout);
      if (layout) {
        basePrice *= layout.priceModifier;
      }
    }

    setTotalPrice(Math.round(basePrice));
    setMonthlyPrice(monthlyTotal);
    setYearlyPrice(yearlyTotal);
  }, [project]);

  // History management functions
  useEffect(() => {
    if (project !== history[historyIndex]) {
      setHistory((prev) => [...prev.slice(0, historyIndex + 1), project]);
      setHistoryIndex((prev) => prev + 1);
    }
  }, [project, history, historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1);
      setProject(history[historyIndex - 1]);
    }
  }, [historyIndex, history]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prev) => prev + 1);
      setProject(history[historyIndex + 1]);
    }
  }, [historyIndex, history]);

  const updateProject = useCallback((updates: Partial<ProjectState>) => {
    setProject((prev) => ({
      ...prev,
      ...updates,
    }));
  }, []);

  // Enhanced export function with more details
  const exportToPDF = async () => {
    if (document.getElementById("preview-panel")) {
      try {
        const canvas = await html2canvas(
          document.getElementById("preview-panel")!
        );
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        // Add title
        pdf.setFontSize(20);
        pdf.text("Mājaslapas projekta specifikācija", 20, 20);

        // Add project details
        pdf.setFontSize(12);
        pdf.text(`Projekta nosaukums: ${project.name}`, 20, 40);
        pdf.text(`Datums: ${new Date().toLocaleDateString()}`, 20, 50);

        // Add main image
        pdf.addImage(imgData, "PNG", 0, 60, pdfWidth, pdfHeight);

        pdf.save(`${project.name || "website"}-specification.pdf`);

        toast.success("PDF veiksmīgi izveidots un saglabāts!");
      } catch (error) {
        toast.error("Kļūda PDF izveidē. Lūdzu mēģiniet vēlreiz.");
        console.error("PDF export error:", error);
      }
    }
  };

  // New function to send project details
  const sendProjectDetails = async () => {
    try {
      // Here you would normally send the data to your backend
      // For now, we'll just show a success message
      toast.success(
        "Projekta detaļas nosūtītas! Mēs ar jums sazināsimies tuvāko 24h laikā."
      );
    } catch (error) {
      toast.error("Kļūda sūtot projekta detaļas. Lūdzu mēģiniet vēlreiz.");
    }
  };

  // Main component render
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Mājaslapas Skices Veidotājs
            </h1>
            <p className="mt-2 text-gray-600">
              Izveidojiet savas mājaslapas vīziju {steps.length} vienkāršos
              soļos
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={undo}
              disabled={historyIndex <= 0}
              className="p-2 rounded-full bg-white shadow hover:bg-gray-50 disabled:opacity-50"
              title="Atsaukt"
            >
              <FaUndo />
            </button>
            <button
              onClick={redo}
              disabled={historyIndex >= history.length - 1}
              className="p-2 rounded-full bg-white shadow hover:bg-gray-50 disabled:opacity-50"
              title="Atcelt atsaukšanu"
            >
              <FaRedo />
            </button>
            <button
              onClick={exportToPDF}
              className="p-2 rounded-full bg-white shadow hover:bg-gray-50"
              title="Eksportēt PDF"
            >
              <FaSave />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((s, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  index === steps.length - 1 ? "" : "flex-1"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index <= step
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 ${
                      index < step ? "bg-blue-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between px-4">
            {steps.map((s, index) => (
              <div
                key={index}
                className={`text-sm ${
                  index <= step ? "text-blue-500" : "text-gray-500"
                }`}
              >
                {s.title}
              </div>
            ))}
          </div>
        </div>
        {/* Main Content */}
        <div className="flex gap-8">
          {/* Step Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                {steps[step].title}
              </h2>
              <p className="text-gray-600 mb-6">{steps[step].description}</p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {React.createElement(steps[step].component, {
                    project,
                    updateProject,
                    totalPrice,
                    monthlyPrice,
                    yearlyPrice,
                    onSubmit: sendProjectDetails,
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setStep((prev) => prev - 1)}
                disabled={step === 0}
                className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
              >
                Atpakaļ
              </button>
              {step === steps.length - 1 ? (
                <button
                  onClick={sendProjectDetails}
                  className="px-6 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
                >
                  Apstiprināt un nosūtīt
                </button>
              ) : (
                <button
                  onClick={() => setStep((prev) => prev + 1)}
                  disabled={step === steps.length - 1}
                  className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
                >
                  Tālāk
                </button>
              )}
            </div>
          </div>

          {/* Preview Panel remains the same but updated with new fields */}
          <div className="w-96">
            <div
              id="preview-panel"
              className="bg-white rounded-lg shadow-lg p-6 sticky top-8"
            >
              <h3 className="text-lg font-semibold mb-4">
                Projekta kopsavilkums
              </h3>

              {/* Project Preview */}
              <PreviewPanel
                project={project}
                totalPrice={totalPrice}
                monthlyPrice={monthlyPrice}
                yearlyPrice={yearlyPrice}
              />
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
};

// Enhanced Step Components
const ProjectInfoStep: React.FC<{
  project: ProjectState;
  updateProject: (updates: Partial<ProjectState>) => void;
}> = ({ project, updateProject }) => {
  const timelineOptions = [
    { value: "1_month", label: "1 mēnesis" },
    { value: "2_months", label: "2 mēneši" },
    { value: "3_months", label: "3 mēneši" },
    { value: "flexible", label: "Elastīgs termiņš" },
  ];

  const budgetOptions = [
    { value: "small", label: "Līdz 1000€" },
    { value: "medium", label: "1000€ - 3000€" },
    { value: "large", label: "3000€ - 5000€" },
    { value: "enterprise", label: "Virs 5000€" },
  ];

  const businessGoals = [
    "Palielināt pārdošanas apjomu",
    "Piesaistīt jaunus klientus",
    "Uzlabot zīmola atpazīstamību",
    "Automatizēt procesus",
    "Izveidot online preču/pakalpojumu katalogu",
    "Nodrošināt klientu atbalstu",
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Projekta nosaukums
        </label>
        <input
          type="text"
          value={project.name}
          onChange={(e) => updateProject({ name: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Piemēram: Mana Jaunā Mājaslapa"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Vēlamais izstrādes termiņš
        </label>
        <select
          value={project.timeline}
          onChange={(e) => updateProject({ timeline: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Izvēlieties termiņu</option>
          {timelineOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Plānotais budžets
        </label>
        <select
          value={project.budget}
          onChange={(e) => updateProject({ budget: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Izvēlieties budžeta diapazonu</option>
          {budgetOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mērķa auditorija
        </label>
        <input
          type="text"
          value={project.targetAudience}
          onChange={(e) => updateProject({ targetAudience: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Piemēram: Jauni profesionāļi vecumā 25-40 gadi"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Biznesa mērķi (izvēlieties līdz 3)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {businessGoals.map((goal) => (
            <label key={goal} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={project.businessGoals?.includes(goal)}
                onChange={(e) => {
                  const goals = project.businessGoals || [];
                  if (e.target.checked) {
                    if (goals.length < 3) {
                      updateProject({ businessGoals: [...goals, goal] });
                    }
                  } else {
                    updateProject({
                      businessGoals: goals.filter((g) => g !== goal),
                    });
                  }
                }}
                className="rounded text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm">{goal}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
const WebsiteTypeStep: React.FC<{
  project: ProjectState;
  updateProject: (updates: Partial<ProjectState>) => void;
}> = ({ project, updateProject }) => {
  const selectedType = websiteTypes.find(
    (type) => type.id === project.websiteType
  );

  return (
    <div className="space-y-8">
      {/* Website Types Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {websiteTypes.map((type) => (
          <motion.div
            key={type.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() =>
              updateProject({
                websiteType: type.id,
                features: type.recommendedFeatures,
                websiteSubtype: undefined,
              })
            }
            className={`p-6 rounded-lg border-2 cursor-pointer transition-colors ${
              project.websiteType === type.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-blue-200"
            }`}
          >
            <div className="mb-4 text-3xl text-blue-500">{type.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{type.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{type.description}</p>
            <p className="text-sm font-medium text-blue-500">
              Sākot no {type.basePrice}€
            </p>
          </motion.div>
        ))}
      </div>

      {/* Subtypes Selection */}
      {selectedType && (
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">
            Izvēlieties {selectedType.name.toLowerCase()} variantu
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {selectedType.subtypes.map((subtype) => (
              <motion.div
                key={subtype.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => updateProject({ websiteSubtype: subtype.id })}
                className={`p-4 rounded-lg border-2 cursor-pointer ${
                  project.websiteSubtype === subtype.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-200"
                }`}
              >
                <h4 className="font-medium mb-2">{subtype.name}</h4>
                <p className="text-sm text-gray-600 mb-2">
                  {subtype.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-blue-500">
                    +{subtype.additionalPrice}€
                  </span>
                  {project.websiteSubtype === subtype.id && (
                    <span className="text-green-500">
                      <FaCheck className="w-5 h-5" />
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Features Preview */}
      {selectedType && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Ieteicamās funkcijas:
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedType.recommendedFeatures.map((featureId) => {
              const feature = features.find((f) => f.id === featureId);
              return feature ? (
                <span
                  key={featureId}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {feature.name}
                </span>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const DesignStep: React.FC<{
  project: ProjectState;
  updateProject: (updates: Partial<ProjectState>) => void;
}> = ({ project, updateProject }) => {
  return (
    <div className="space-y-8">
      {/* Color Schemes */}
      <div>
        <h3 className="text-lg font-medium mb-4">Krāsu palete</h3>
        <div className="grid grid-cols-2 gap-4">
          {colorSchemes.map((scheme) => (
            <motion.div
              key={scheme.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => updateProject({ colorScheme: scheme.id })}
              className={`p-4 rounded-lg border-2 cursor-pointer ${
                project.colorScheme === scheme.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-200"
              }`}
            >
              <h4 className="font-medium mb-2">{scheme.name}</h4>
              <div className="flex space-x-2 mb-3">
                {Object.values(scheme.colors).map((color, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full border border-gray-200"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">{scheme.description}</p>

              {/* Color Preview */}
              <div
                className="mt-4 p-3 rounded"
                style={{ backgroundColor: scheme.colors.background }}
              >
                <div
                  className="text-sm font-medium mb-1"
                  style={{ color: scheme.colors.primary }}
                >
                  Virsraksta piemērs
                </div>
                <div className="text-xs" style={{ color: scheme.colors.text }}>
                  Teksta parauga piemērs
                </div>
                <button
                  className="mt-2 px-3 py-1 text-xs rounded"
                  style={{
                    backgroundColor: scheme.colors.accent,
                    color: scheme.colors.background,
                  }}
                >
                  Pogas piemērs
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Font Pairs */}
      <div>
        <h3 className="text-lg font-medium mb-4">Fontu kombinācijas</h3>
        <div className="grid grid-cols-2 gap-4">
          {fontPairs.map((pair) => (
            <motion.div
              key={pair.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => updateProject({ fontPair: pair.id })}
              className={`p-4 rounded-lg border-2 cursor-pointer ${
                project.fontPair === pair.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-200"
              }`}
            >
              <h4 className="font-medium mb-2">{pair.name}</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Virsraksts:</p>
                  <p style={{ fontFamily: pair.heading }} className="text-xl">
                    {pair.preview}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Pamatteksts:</p>
                  <p style={{ fontFamily: pair.body }} className="text-base">
                    {pair.preview}
                  </p>
                </div>
                <p className="text-sm text-gray-600 mt-2">{pair.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Font Size Preview */}
      {project.fontPair && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-4">
            Teksta izmēru priekšskatījums
          </h4>
          <div className="space-y-3">
            {["xl", "lg", "base", "sm"].map((size) => (
              <div key={size} className="flex items-center justify-between">
                <span className="text-sm text-gray-500 w-24">
                  {size === "xl"
                    ? "Galvenais"
                    : size === "lg"
                    ? "Apakšvirsraksts"
                    : size === "base"
                    ? "Pamatteksts"
                    : "Mazs teksts"}
                </span>
                <div className={`text-${size} flex-1`}>
                  Teksta parauga piemērs
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
const LayoutStep: React.FC<{
  project: ProjectState;
  updateProject: (updates: Partial<ProjectState>) => void;
}> = ({ project, updateProject }) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-6">
        {layouts.map((layout) => (
          <motion.div
            key={layout.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => updateProject({ layout: layout.id })}
            className={`p-4 rounded-lg border-2 cursor-pointer ${
              project.layout === layout.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-blue-200"
            }`}
          >
            <img
              src={layout.image}
              alt={layout.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h4 className="font-medium mb-2">{layout.name}</h4>
            <p className="text-sm text-gray-600 mb-4">{layout.description}</p>

            {/* Layout Features */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-500">Iekļauj:</p>
              <div className="flex flex-wrap gap-2">
                {layout.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Price Modifier */}
            <div className="mt-4 text-sm">
              <span className="text-gray-600">Cenas koeficients: </span>
              <span className="font-medium text-blue-500">
                ×{layout.priceModifier}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Layout Preview with Explanation */}
      {project.layout && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Ko šis izkārtojums nozīmē praktiski?
          </h4>
          <div className="text-sm text-gray-600">
            {layouts.find((l) => l.id === project.layout)?.description}
          </div>
        </div>
      )}
    </div>
  );
};

const FeaturesStep: React.FC<{
  project: ProjectState;
  updateProject: (updates: Partial<ProjectState>) => void;
}> = ({ project, updateProject }) => {
  const [selectedComplexity, setSelectedComplexity] = useState<string>("all");

  const applicableFeatures = useMemo(
    () =>
      features.filter(
        (feature) =>
          feature.applicableTypes.includes("all") ||
          (project.websiteType &&
            feature.applicableTypes.includes(project.websiteType))
      ),
    [project.websiteType]
  );

  const toggleFeature = useCallback(
    (featureId: string) => {
      updateProject({
        features: project.features.includes(featureId)
          ? project.features.filter((f) => f !== featureId)
          : [...project.features, featureId],
      });
    },
    [project.features, updateProject]
  );

  // Setup costs section
  const relevantSetupCosts = setupCosts.filter(
    (cost) =>
      cost.applicableTypes.includes("all") ||
      (project.websiteType &&
        cost.applicableTypes.includes(project.websiteType))
  );

  const toggleSetupCost = useCallback(
    (costId: string) => {
      const cost = setupCosts.find((c) => c.id === costId);
      if (cost?.required) return; // Can't untoggle required costs

      updateProject({
        setupCosts: project.setupCosts.includes(costId)
          ? project.setupCosts.filter((c) => c !== costId)
          : [...project.setupCosts, costId],
      });
    },
    [project.setupCosts, updateProject]
  );

  return (
    <div className="space-y-8">
      {/* Features Section */}
      <div>
        <h3 className="text-lg font-medium mb-4">Funkcionalitāte</h3>

        {/* Complexity Filter */}
        <div className="mb-6">
          <div className="flex space-x-4">
            {["all", "basic", "intermediate", "advanced"].map((complexity) => (
              <button
                key={complexity}
                onClick={() => setSelectedComplexity(complexity)}
                className={`px-4 py-2 rounded-lg text-sm ${
                  selectedComplexity === complexity
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {complexity === "all"
                  ? "Visas"
                  : complexity === "basic"
                  ? "Pamata"
                  : complexity === "intermediate"
                  ? "Vidējās"
                  : "Sarežģītās"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {applicableFeatures
            .filter(
              (feature) =>
                selectedComplexity === "all" ||
                feature.complexity === selectedComplexity
            )
            .map((feature) => (
              <motion.div
                key={feature.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleFeature(feature.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer ${
                  project.features.includes(feature.id)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-200"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl text-blue-500">
                        {feature.icon}
                      </span>
                      <h4 className="font-medium">{feature.name}</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                    <div className="mt-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          feature.complexity === "basic"
                            ? "bg-green-100 text-green-800"
                            : feature.complexity === "intermediate"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {feature.complexity === "basic"
                          ? "Pamata"
                          : feature.complexity === "intermediate"
                          ? "Vidēja"
                          : "Sarežģīta"}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-blue-500">
                    {feature.price}€
                  </span>
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      {/* Setup Costs Section */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Uzturēšanas izmaksas</h3>
        <div className="grid grid-cols-2 gap-4">
          {relevantSetupCosts.map((cost) => (
            <div
              key={cost.id}
              onClick={() => !cost.required && toggleSetupCost(cost.id)}
              className={`p-4 rounded-lg border-2 ${
                cost.required
                  ? "border-gray-200 bg-gray-50"
                  : project.setupCosts.includes(cost.id)
                  ? "border-blue-500 bg-blue-50 cursor-pointer"
                  : "border-gray-200 hover:border-blue-200 cursor-pointer"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium flex items-center gap-2">
                    {cost.name}
                    {cost.required && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        Obligāts
                      </span>
                    )}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {cost.description}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-blue-500">
                    {cost.monthlyPrice}€/mēn
                  </div>
                  <div className="text-xs text-gray-500">
                    vai {cost.yearlyPrice}€/gadā
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
const CostSummaryStep: React.FC<{
  project: ProjectState;
  totalPrice: number;
  monthlyPrice: number;
  yearlyPrice: number;
  onSubmit: () => void;
}> = ({ project, totalPrice, monthlyPrice, yearlyPrice, onSubmit }) => {
  const [paymentType, setPaymentType] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const [agreement, setAgreement] = useState(false);

  const selectedType = websiteTypes.find(
    (type) => type.id === project.websiteType
  );
  const selectedSubtype = selectedType?.subtypes.find(
    (st) => st.id === project.websiteSubtype
  );

  return (
    <div className="space-y-8">
      {/* Cost Breakdown */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Izmaksu sadalījums</h3>

        {/* One-time Costs */}
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Vienreizējās izmaksas
            </h4>
            <div className="space-y-2">
              {/* Base Price */}
              <div className="flex justify-between text-sm">
                <span>Pamata cena ({selectedType?.name})</span>
                <span className="font-medium">{selectedType?.basePrice}€</span>
              </div>

              {/* Subtype Price */}
              {selectedSubtype && (
                <div className="flex justify-between text-sm">
                  <span>Papildus ({selectedSubtype.name})</span>
                  <span className="font-medium">
                    +{selectedSubtype.additionalPrice}€
                  </span>
                </div>
              )}

              {/* Features */}
              {project.features.map((featureId) => {
                const feature = features.find((f) => f.id === featureId);
                return feature ? (
                  <div
                    key={feature.id}
                    className="flex justify-between text-sm"
                  >
                    <span>{feature.name}</span>
                    <span className="font-medium">{feature.price}€</span>
                  </div>
                ) : null;
              })}

              {/* Layout Price Modifier */}
              {project.layout && (
                <div className="flex justify-between text-sm">
                  <span>Izkārtojuma koeficients</span>
                  <span className="font-medium">
                    ×
                    {
                      layouts.find((l) => l.id === project.layout)
                        ?.priceModifier
                    }
                  </span>
                </div>
              )}

              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-medium">
                  <span>Kopā vienreizējās izmaksas</span>
                  <span className="text-blue-500">{totalPrice}€</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recurring Costs */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Regulārās izmaksas
            </h4>
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => setPaymentType("monthly")}
                className={`px-4 py-2 rounded-lg text-sm ${
                  paymentType === "monthly"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Mēneša maksājums
              </button>
              <button
                onClick={() => setPaymentType("yearly")}
                className={`px-4 py-2 rounded-lg text-sm ${
                  paymentType === "yearly"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Gada maksājums
              </button>
            </div>

            <div className="space-y-2">
              {project.setupCosts.map((costId) => {
                const cost = setupCosts.find((c) => c.id === costId);
                return cost ? (
                  <div key={cost.id} className="flex justify-between text-sm">
                    <span>{cost.name}</span>
                    <span className="font-medium">
                      {paymentType === "monthly"
                        ? `${cost.monthlyPrice}€/mēn`
                        : `${cost.yearlyPrice}€/gadā`}
                    </span>
                  </div>
                ) : null;
              })}

              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-medium">
                  <span>Kopā regulārās izmaksas</span>
                  <span className="text-blue-500">
                    {paymentType === "monthly"
                      ? `${monthlyPrice}€/mēn`
                      : `${yearlyPrice}€/gadā`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Summary */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Projekta kopsavilkums</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm text-gray-500">Projekta nosaukums</h4>
            <p className="font-medium">{project.name}</p>
          </div>

          <div>
            <h4 className="text-sm text-gray-500">Izstrādes termiņš</h4>
            <p className="font-medium">{project.timeline}</p>
          </div>

          <div>
            <h4 className="text-sm text-gray-500">Mērķa auditorija</h4>
            <p className="font-medium">{project.targetAudience}</p>
          </div>

          <div>
            <h4 className="text-sm text-gray-500">Galvenie mērķi</h4>
            <div className="flex flex-wrap gap-2 mt-1">
              {project.businessGoals?.map((goal) => (
                <span
                  key={goal}
                  className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                >
                  {goal}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Agreement and Submit */}
      <div className="space-y-4">
        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            checked={agreement}
            onChange={(e) => setAgreement(e.target.checked)}
            className="mt-1"
          />
          <span className="text-sm text-gray-600">
            Es piekrītu, ka manis sniegtā informācija tiks izmantota projekta
            realizācijas vajadzībām. Esmu iepazinies ar izmaksu aprēķinu un
            saprotu, ka faktiskās izmaksas var mainīties atkarībā no projekta
            specifikācijas precizēšanas.
          </span>
        </label>

        <button
          onClick={onSubmit}
          disabled={!agreement}
          className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg font-medium
                   disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600
                   transition-colors"
        >
          Apstiprināt un nosūtīt pieprasījumu
        </button>
      </div>
    </div>
  );
};

const PreviewPanel: React.FC<{
  project: ProjectState;
  totalPrice: number;
  monthlyPrice: number;
  yearlyPrice: number;
}> = ({ project, totalPrice, monthlyPrice, yearlyPrice }) => {
  const selectedWebsiteType = websiteTypes.find(
    (type) => type.id === project.websiteType
  );

  const selectedSubtype = selectedWebsiteType?.subtypes.find(
    (st) => st.id === project.websiteSubtype
  );

  const selectedColorScheme = colorSchemes.find(
    (scheme) => scheme.id === project.colorScheme
  );

  const selectedFontPair = fontPairs.find(
    (pair) => pair.id === project.fontPair
  );

  const selectedLayout = layouts.find((layout) => layout.id === project.layout);

  return (
    <div className="space-y-6">
      {/* Project Basic Info */}
      {project.name && (
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-1">
            Projekta nosaukums
          </h4>
          <p className="font-medium">{project.name}</p>
        </div>
      )}

      {/* Timeline & Budget */}
      {(project.timeline || project.budget) && (
        <div className="flex gap-4">
          {project.timeline && (
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-600 mb-1">
                Termiņš
              </h4>
              <p className="text-sm">{project.timeline}</p>
            </div>
          )}
          {project.budget && (
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-600 mb-1">
                Budžets
              </h4>
              <p className="text-sm">{project.budget}</p>
            </div>
          )}
        </div>
      )}

      {/* Website Type */}
      {selectedWebsiteType && (
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-1">
            Mājaslapas tips
          </h4>
          <div className="flex items-center gap-2">
            <span className="text-blue-500">{selectedWebsiteType.icon}</span>
            <span>{selectedWebsiteType.name}</span>
          </div>
          {selectedSubtype && (
            <p className="text-sm text-gray-600 mt-1">
              Variants: {selectedSubtype.name}
            </p>
          )}
        </div>
      )}

      {/* Color Scheme */}
      {selectedColorScheme && (
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-1">
            Krāsu palete
          </h4>
          <p>{selectedColorScheme.name}</p>
          <div className="flex gap-2 mt-2">
            {Object.values(selectedColorScheme.colors).map((color, index) => (
              <div
                key={index}
                className="w-6 h-6 rounded-full border border-gray-200"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Font Pair */}
      {selectedFontPair && (
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-1">
            Fontu kombinācija
          </h4>
          <p>{selectedFontPair.name}</p>
          <div className="mt-2 space-y-1">
            <p
              style={{ fontFamily: selectedFontPair.heading }}
              className="text-lg"
            >
              Virsraksts
            </p>
            <p
              style={{ fontFamily: selectedFontPair.body }}
              className="text-sm"
            >
              Pamatteksts
            </p>
          </div>
        </div>
      )}

      {/* Selected Features */}
      {project.features.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-1">
            Izvēlētās funkcijas
          </h4>
          <div className="space-y-2">
            {project.features.map((featureId) => {
              const feature = features.find((f) => f.id === featureId);
              return feature ? (
                <div key={feature.id} className="flex items-center gap-2">
                  <span className="text-blue-500">{feature.icon}</span>
                  <span className="text-sm">{feature.name}</span>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}

      {/* Setup Costs */}
      {project.setupCosts.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-1">
            Uzturēšanas pakalpojumi
          </h4>
          <div className="space-y-2">
            {project.setupCosts.map((costId) => {
              const cost = setupCosts.find((c) => c.id === costId);
              return cost ? (
                <div key={cost.id} className="flex justify-between text-sm">
                  <span>{cost.name}</span>
                  <span>{cost.monthlyPrice}€/mēn</span>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}

      {/* Total Costs */}
      <div className="border-t pt-4 mt-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Vienreizējās izmaksas</span>
            <span className="font-medium">{totalPrice}€</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Ikmēneša izmaksas</span>
            <span className="font-medium">{monthlyPrice}€/mēn</span>
          </div>
          <div className="border-t pt-2 mt-2 flex justify-between font-medium">
            <span>Kopā pirmajā mēnesī</span>
            <span className="text-blue-500">{totalPrice + monthlyPrice}€</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SketchBuilder;
