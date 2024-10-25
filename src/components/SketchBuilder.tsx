"use client";

import { supabase } from "../utils/supabase";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  FaSave,
  FaUndo,
  FaRedo,
  FaPalette,
  FaShoppingCart,
  FaPenSquare,
  FaBriefcase,
  FaMobileAlt,
  FaSearch,
  FaLock,
  FaChartLine,
  FaServer,
  FaCheck,
  FaLandmark,
  FaIdCard,
  FaBlog,
  FaTimes,
} from "react-icons/fa";

// All Interfaces
interface ProjectState {
  websiteType?: string;
  websiteSubtype?: string;
  colorScheme?: string;
  fontPair?: string;
  layout?: string;
  features: string[];
  name: string;
  timeline?: string;
  budget?: string;
  targetAudience?: string;
  businessGoals?: string[];
  setupCosts: string[];
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  paymentOption: string;
  paymentSplits: number;
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
  subtypes: WebsiteSubtype[];
}

interface SetupCost {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  required: boolean;
  applicableTypes: string[];
}

interface ColorScheme {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  recommendedFor: string[];
}

interface FontPair {
  id: string;
  name: string;
  heading: string;
  body: string;
  description: string;
  preview: string;
}

interface Layout {
  id: string;
  name: string;
  description: string;
  image: string;
  priceModifier: number;
  recommendedFor: string[];
  features: string[];
}

interface Feature {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: JSX.Element;
  applicableTypes: string[];
  complexity: "basic" | "intermediate" | "advanced";
}

interface StepProps {
  project: ProjectState;
  updateProject: (updates: Partial<ProjectState>) => void;
}

interface CostSummaryStepProps extends StepProps {
  totalPrice: number;
  monthlyPrice: number;
  yearlyPrice: number;
  onSubmit: () => void;
}

interface PreviewPanelProps {
  project: ProjectState;
  totalPrice: number;
  monthlyPrice: number;
  yearlyPrice: number;
}

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientName: string;
  clientEmail: string;
}

// Constants
const websiteTypes: WebsiteType[] = [
  // New budget-friendly options
  {
    id: "landing",
    name: "Landing Page",
    description:
      "Efektīva vienas lapas vietne ar skaidru mērķi un aicinājumu rīkoties",
    icon: <FaLandmark className="w-8 h-8" />,
    basePrice: 300,
    recommendedFeatures: [
      "responsiveDesign",
      "seo",
      "contactForm",
      "analytics",
    ],
    subtypes: [
      {
        id: "basic",
        name: "Pamata",
        description: "Vienkārša, bet efektīva vienas lapas vietne",
        additionalPrice: 0,
      },
      {
        id: "premium",
        name: "Premium",
        description: "Papildus sekcijas un interaktīvi elementi",
        additionalPrice: 100,
      },
      {
        id: "advanced",
        name: "Pro",
        description: "Pilnībā pielāgojama ar A/B testēšanu",
        additionalPrice: 200,
      },
    ],
  },
  {
    id: "business-card",
    name: "Vizītkarte",
    description: "Kompakta un profesionāla digitālā vizītkarte jūsu biznesam",
    icon: <FaIdCard className="w-8 h-8" />,
    basePrice: 400,
    recommendedFeatures: ["responsiveDesign", "contactForm", "seo"],
    subtypes: [
      {
        id: "basic",
        name: "Pamata",
        description: "Vienkārša digitālā vizītkarte",
        additionalPrice: 0,
      },
      {
        id: "interactive",
        name: "Interaktīvā",
        description: "Ar animācijām un interaktīviem elementiem",
        additionalPrice: 100,
      },
      {
        id: "premium",
        name: "Premium",
        description: "Ar papildus biznesa funkcijām",
        additionalPrice: 200,
      },
    ],
  },
  {
    id: "starter-blog",
    name: "Starter Blog",
    description: "Ideāls risinājums blogošanas uzsākšanai",
    icon: <FaBlog className="w-8 h-8" />,
    basePrice: 500,
    recommendedFeatures: ["blog", "socialMedia", "seo", "contentManagement"],
    subtypes: [
      {
        id: "basic",
        name: "Pamata",
        description: "Vienkāršs blogs ar pamatfunkcijām",
        additionalPrice: 0,
      },
      {
        id: "advanced",
        name: "Paplašinātais",
        description: "Ar kategorijām un komentāriem",
        additionalPrice: 100,
      },
      {
        id: "premium",
        name: "Premium",
        description: "Pilna funkcionalitāte ar newsletter",
        additionalPrice: 200,
      },
    ],
  },
  // Continuing websiteTypes array
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
        description: "Ideāli piemērota maziem uzņēmumiem",
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
        description: "Līdz 100 produktiem",
        additionalPrice: 0,
      },
      {
        id: "professional",
        name: "Profesionālais",
        description: "Līdz 1000 produktiem",
        additionalPrice: 600,
      },
      {
        id: "enterprise",
        name: "Uzņēmuma",
        description: "Neierobežots produktu skaits",
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
];

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
    applicableTypes: ["business", "blog", "portfolio", "starter-blog"],
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
    recommendedFor: ["business", "portfolio", "business-card"],
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
    recommendedFor: ["portfolio", "landing", "starter-blog"],
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
    recommendedFor: ["landing", "portfolio", "business-card"],
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
    recommendedFor: ["starter-blog", "portfolio", "landing"],
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
];

const layouts: Layout[] = [
  {
    id: "classic",
    name: "Klasiskais",
    description: "Tradicionals, pārbaudīts izkārtojums ar skaidru hierarhiju",
    image: "/layouts/classic.svg",
    priceModifier: 1,
    recommendedFor: ["business", "portfolio", "business-card"],
    features: ["header", "footer", "navigation", "sidebar"],
  },
  {
    id: "modern",
    name: "Modernais",
    description: "Mūsdienīgs izkārtojums ar dinamiskām sekcijām",
    image: "/layouts/modern.svg",
    priceModifier: 1.2,
    recommendedFor: ["portfolio", "landing", "starter-blog"],
    features: ["animations", "parallax", "smoothScroll", "fullscreen"],
  },
  {
    id: "minimal",
    name: "Minimālais",
    description: "Vienkāršs un elegants dizains ar fokusu uz saturu",
    image: "/layouts/minimal.svg",
    priceModifier: 0.9,
    recommendedFor: ["portfolio", "business-card", "landing"],
    features: ["whitespace", "typography", "cleanNav"],
  },
];

const features: Feature[] = [
  {
    id: "responsiveDesign",
    name: "Responsīvs dizains",
    description: "Pielāgojas visām ierīcēm - datoriem, planšetēm un telefoniem",
    price: 200,
    icon: <FaMobileAlt />,
    applicableTypes: ["all"],
    complexity: "basic",
  },
  {
    id: "seo",
    name: "SEO optimizācija",
    description: "Uzlabota atrašana meklētājprogrammās",
    price: 300,
    icon: <FaSearch />,
    applicableTypes: ["all"],
    complexity: "intermediate",
  },
  {
    id: "contentManagement",
    name: "Satura pārvaldība",
    description: "Ērta satura rediģēšana bez programmēšanas zināšanām",
    price: 400,
    icon: <FaPenSquare />,
    applicableTypes: ["all"],
    complexity: "intermediate",
  },
  {
    id: "analytics",
    name: "Apmeklējumu analītika",
    description: "Detalizēta statistika par vietnes apmeklējumiem",
    price: 250,
    icon: <FaChartLine />,
    applicableTypes: ["all"],
    complexity: "intermediate",
  },
  {
    id: "security",
    name: "Drošības pakotne",
    description: "Papildus aizsardzība pret uzlaušanu",
    price: 350,
    icon: <FaLock />,
    applicableTypes: ["all"],
    complexity: "advanced",
  },
  {
    id: "backups",
    name: "Automātiskās rezerves kopijas",
    description: "Regulāra datu dublēšana",
    price: 150,
    icon: <FaServer />,
    applicableTypes: ["all"],
    complexity: "basic",
  },
];

// Success Modal Component
const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  clientName,
  clientEmail,
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-2xl shadow-xl max-w-lg w-full mx-4 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        <div className="p-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheck className="w-10 h-10 text-green-500" />
          </div>

          <h2 className="text-2xl font-bold text-center mb-4">
            Paldies, {clientName}!
          </h2>

          <div className="text-center space-y-3">
            <p className="text-gray-600">
              Jūsu projekta pieteikums ir veiksmīgi nosūtīts.
            </p>
            <p className="text-gray-600">
              Apstiprinājums ir nosūtīts uz{" "}
              <span className="font-medium">{clientEmail}</span>
            </p>
            <p className="text-gray-600">
              Mēs ar Jums sazināsimies tuvāko 24 stundu laikā.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-8 px-6 py-3 bg-blue-500 text-white rounded-lg
                     hover:bg-blue-600 transition-colors"
          >
            Aizvērt
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
// ProjectInfoStep Component
const ProjectInfoStep: React.FC<StepProps> = ({ project, updateProject }) => {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Project Name */}
      <div className="space-y-2">
        <label
          htmlFor="projectName"
          className="block text-sm font-medium text-gray-700"
        >
          Projekta nosaukums
          <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          id="projectName"
          type="text"
          value={project.name}
          onChange={(e) => updateProject({ name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Piemēram: Mana Jaunā Mājaslapa"
          required
        />
      </div>

      {/* Timeline Selection */}
      <div className="space-y-2">
        <label
          htmlFor="timeline"
          className="block text-sm font-medium text-gray-700"
        >
          Vēlamais izstrādes termiņš
        </label>
        <select
          id="timeline"
          value={project.timeline || ""}
          onChange={(e) => updateProject({ timeline: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Izvēlieties termiņu</option>
          {timelineOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Budget Selection */}
      <div className="space-y-2">
        <label
          htmlFor="budget"
          className="block text-sm font-medium text-gray-700"
        >
          Plānotais budžets
        </label>
        <select
          id="budget"
          value={project.budget || ""}
          onChange={(e) => updateProject({ budget: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Izvēlieties budžeta diapazonu</option>
          {budgetOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Target Audience */}
      <div className="space-y-2">
        <label
          htmlFor="targetAudience"
          className="block text-sm font-medium text-gray-700"
        >
          Mērķa auditorija
        </label>
        <input
          id="targetAudience"
          type="text"
          value={project.targetAudience || ""}
          onChange={(e) => updateProject({ targetAudience: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Piemēram: Jauni profesionāļi vecumā 25-40 gadi"
        />
      </div>

      {/* Business Goals */}
      <div className="space-y-4">
        <fieldset>
          <legend className="block text-sm font-medium text-gray-700 mb-3">
            Biznesa mērķi (izvēlieties līdz 3)
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {businessGoals.map((goal) => (
              <label
                key={goal}
                className={`
                  flex items-start p-3 rounded-lg border cursor-pointer
                  transition-all duration-200
                  ${
                    project.businessGoals?.includes(goal)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-200"
                  }
                `}
              >
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
                  className="w-4 h-4 rounded text-blue-500 border-gray-300
                           focus:ring-blue-500 transition-colors duration-200
                           mt-1"
                />
                <span className="ml-3 text-sm text-gray-700">{goal}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Selected Goals Counter */}
      {project.businessGoals && project.businessGoals.length > 0 && (
        <div className="text-sm text-gray-500">
          Izvēlēti {project.businessGoals.length} no 3 mērķiem
        </div>
      )}
    </motion.div>
  );
};
// WebsiteTypeStep Component
const WebsiteTypeStep: React.FC<StepProps> = ({ project, updateProject }) => {
  const selectedType = websiteTypes.find(
    (type) => type.id === project.websiteType
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Website Types Grid */}
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
            className={`
              p-6 rounded-xl border-2 cursor-pointer
              ${
                project.websiteType === type.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-200"
              }
            `}
          >
            {/* Icon and Title */}
            <div className="flex items-center gap-4 mb-4">
              <div className="text-3xl text-blue-500">{type.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {type.name}
                </h3>
                <p className="text-sm text-blue-500 font-medium">
                  Sākot no {type.basePrice}€
                </p>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4">{type.description}</p>

            {/* Features Preview */}
            <div className="flex flex-wrap gap-2">
              {type.recommendedFeatures.map((featureId) => {
                const feature = features.find((f) => f.id === featureId);
                return feature ? (
                  <span
                    key={featureId}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {feature.name}
                  </span>
                ) : null;
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Subtypes Selection */}
      {selectedType && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 space-y-4"
        >
          <h3 className="text-lg font-medium text-gray-800">
            Izvēlieties {selectedType.name.toLowerCase()} variantu
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedType.subtypes.map((subtype) => (
              <motion.div
                key={subtype.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => updateProject({ websiteSubtype: subtype.id })}
                className={`
                  p-4 rounded-lg border-2 cursor-pointer
                  ${
                    project.websiteSubtype === subtype.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-200"
                  }
                `}
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-800">
                      {subtype.name}
                    </h4>
                    <span className="text-sm font-medium text-blue-500">
                      +{subtype.additionalPrice}€
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{subtype.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Selected Features Summary */}
      {selectedType && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 p-4 bg-gray-50 rounded-lg"
        >
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Iekļautās funkcijas:
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedType.recommendedFeatures.map((featureId) => {
              const feature = features.find((f) => f.id === featureId);
              return feature ? (
                <div
                  key={featureId}
                  className="flex items-center gap-2 px-3 py-1 bg-white
                           rounded-full border text-sm text-gray-700"
                >
                  <span className="text-blue-500">{feature.icon}</span>
                  <span>{feature.name}</span>
                </div>
              ) : null;
            })}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

// DesignStep Component
const DesignStep: React.FC<StepProps> = ({ project, updateProject }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-12"
    >
      {/* Color Schemes */}
      <section>
        <h3 className="text-lg font-medium text-gray-800 mb-4">Krāsu palete</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {colorSchemes.map((scheme) => (
            <motion.div
              key={scheme.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => updateProject({ colorScheme: scheme.id })}
              className={`
                p-6 rounded-xl border-2 cursor-pointer
                ${
                  project.colorScheme === scheme.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-200"
                }
              `}
            >
              <h4 className="font-medium text-gray-800 mb-3">{scheme.name}</h4>

              {/* Color Swatches */}
              <div className="grid grid-cols-5 gap-2 mb-4">
                {Object.entries(scheme.colors).map(([name, color]) => (
                  <div key={name} className="space-y-1">
                    <div
                      className="w-full h-8 rounded-lg border border-gray-200"
                      style={{ backgroundColor: color }}
                      title={`${name}: ${color}`}
                    />
                    <span className="text-xs text-gray-500 block text-center">
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Preview Section */}
              <div
                className="p-4 rounded-lg mb-3"
                style={{ backgroundColor: scheme.colors.background }}
              >
                <div
                  className="text-lg font-semibold mb-2"
                  style={{ color: scheme.colors.primary }}
                >
                  Virsraksta piemērs
                </div>
                <div
                  className="text-sm mb-3"
                  style={{ color: scheme.colors.text }}
                >
                  Šis ir parauga teksts, kas demonstrē krāsu paletes izskatu.
                </div>
                <button
                  className="px-4 py-2 rounded-lg text-sm"
                  style={{
                    backgroundColor: scheme.colors.accent,
                    color: scheme.colors.background,
                  }}
                >
                  Pogas piemērs
                </button>
              </div>

              <p className="text-sm text-gray-600">{scheme.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Font Pairs Section */}
      <section>
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Fontu kombinācijas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fontPairs.map((pair) => (
            <motion.div
              key={pair.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => updateProject({ fontPair: pair.id })}
              className={`
                p-6 rounded-xl border-2 cursor-pointer
                ${
                  project.fontPair === pair.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-200"
                }
              `}
            >
              <h4 className="font-medium text-gray-800 mb-4">{pair.name}</h4>

              {/* Font Preview */}
              <div className="space-y-6 mb-4">
                <div>
                  <label className="text-xs text-gray-500">Virsraksts</label>
                  <p
                    className="text-2xl mt-1"
                    style={{ fontFamily: pair.heading }}
                  >
                    {pair.preview}
                  </p>
                </div>

                <div>
                  <label className="text-xs text-gray-500">Pamatteksts</label>
                  <p
                    className="text-base mt-1"
                    style={{ fontFamily: pair.body }}
                  >
                    {pair.preview}
                    <br />
                    ABCDEFGHIJKLMNOPQRSTUVWXYZ
                    <br />
                    abcdefghijklmnopqrstuvwxyz
                    <br />
                    1234567890
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-600">{pair.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

// LayoutStep Component
const LayoutStep: React.FC<StepProps> = ({ project, updateProject }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {layouts.map((layout) => (
          <motion.div
            key={layout.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => updateProject({ layout: layout.id })}
            className={`
              p-6 rounded-xl border-2 cursor-pointer
              ${
                project.layout === layout.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-200"
              }
            `}
          >
            {/* Layout Preview */}
            <div className="aspect-video mb-4 overflow-hidden rounded-lg bg-gray-100">
              <img
                src={layout.image}
                alt={`${layout.name} layout`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Layout Info */}
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-medium text-gray-800">
                  {layout.name}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {layout.description}
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-gray-700">
                  Iekļautie elementi:
                </h5>
                <div className="flex flex-wrap gap-2">
                  {layout.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-2 py-1 bg-blue-100 text-blue-800 
                               text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price Modifier */}
              <div className="pt-4 border-t flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Cenas modifikators
                </span>
                <span className="font-medium text-blue-500">
                  ×{layout.priceModifier}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Selected Layout Details */}
      {project.layout && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-50 p-6 rounded-xl"
        >
          <h4 className="text-lg font-medium text-gray-800 mb-4">
            Izkārtojuma detaļas
          </h4>

          <div className="space-y-6">
            {/* Recommended Uses */}
            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-2">
                Ieteicams:
              </h5>
              <div className="flex flex-wrap gap-2">
                {layouts
                  .find((l) => l.id === project.layout)
                  ?.recommendedFor.map((type) => (
                    <span
                      key={type}
                      className="px-3 py-1 bg-white text-gray-700 
                               text-sm rounded-full border"
                    >
                      {type}
                    </span>
                  ))}
              </div>
            </div>

            {/* Technical Details */}
            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-2">
                Tehniskā informācija:
              </h5>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <FaCheck className="text-green-500" />
                  Pilnībā responsīvs dizains
                </li>
                <li className="flex items-center gap-2">
                  <FaCheck className="text-green-500" />
                  Optimizēts ielādes ātrums
                </li>
                <li className="flex items-center gap-2">
                  <FaCheck className="text-green-500" />
                  SEO draudzīga struktūra
                </li>
                <li className="flex items-center gap-2">
                  <FaCheck className="text-green-500" />
                  Modernās pārlūkprogrammu tehnoloģijas
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
// FeaturesStep Component
const FeaturesStep: React.FC<StepProps> = ({ project, updateProject }) => {
  const [selectedComplexity, setSelectedComplexity] = useState<
    "all" | "basic" | "intermediate" | "advanced"
  >("all");

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

  const filteredFeatures = useMemo(
    () =>
      applicableFeatures.filter(
        (feature) =>
          selectedComplexity === "all" ||
          feature.complexity === selectedComplexity
      ),
    [applicableFeatures, selectedComplexity]
  );

  const relevantSetupCosts = useMemo(
    () =>
      setupCosts.filter(
        (cost) =>
          cost.applicableTypes.includes("all") ||
          (project.websiteType &&
            cost.applicableTypes.includes(project.websiteType))
      ),
    [project.websiteType]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-12"
    >
      {/* Features Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-800">Funkcionalitāte</h3>

          {/* Complexity Filter */}
          <div className="flex gap-2">
            {[
              { value: "all", label: "Visas" },
              { value: "basic", label: "Pamata" },
              { value: "intermediate", label: "Vidējās" },
              { value: "advanced", label: "Sarežģītās" },
            ].map((complexity) => (
              <button
                key={complexity.value}
                onClick={() =>
                  setSelectedComplexity(
                    complexity.value as
                      | "all"
                      | "basic"
                      | "intermediate"
                      | "advanced"
                  )
                }
                className={`
                  px-4 py-2 rounded-lg text-sm transition-all
                  ${
                    selectedComplexity === complexity.value
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                {complexity.label}
              </button>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFeatures.map((feature) => (
            <motion.div
              key={feature.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const features = project.features || [];
                if (features.includes(feature.id)) {
                  updateProject({
                    features: features.filter((f) => f !== feature.id),
                  });
                } else {
                  updateProject({ features: [...features, feature.id] });
                }
              }}
              className={`
                p-6 rounded-xl border-2 cursor-pointer
                ${
                  project.features.includes(feature.id)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-200"
                }
              `}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`
                    p-3 rounded-lg
                    ${
                      project.features.includes(feature.id)
                        ? "bg-blue-100 text-blue-500"
                        : "bg-gray-100 text-gray-500"
                    }
                  `}
                >
                  {feature.icon}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-800">
                      {feature.name}
                    </h4>
                    <span className="text-sm font-medium text-blue-500">
                      {feature.price}€
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">
                    {feature.description}
                  </p>

                  <div className="flex items-center gap-2">
                    <span
                      className={`
                        px-2 py-1 text-xs rounded-full
                        ${
                          feature.complexity === "basic"
                            ? "bg-green-100 text-green-700"
                            : feature.complexity === "intermediate"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }
                      `}
                    >
                      {feature.complexity === "basic"
                        ? "Pamata"
                        : feature.complexity === "intermediate"
                        ? "Vidēja"
                        : "Sarežģīta"}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Setup Costs Section */}
      <section>
        <h3 className="text-lg font-medium text-gray-800 mb-6">
          Uzturēšanas pakalpojumi
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {relevantSetupCosts.map((cost) => (
            <motion.div
              key={cost.id}
              whileHover={cost.required ? undefined : { scale: 1.02 }}
              whileTap={cost.required ? undefined : { scale: 0.98 }}
              onClick={() => {
                if (!cost.required) {
                  const costs = project.setupCosts || [];
                  if (costs.includes(cost.id)) {
                    updateProject({
                      setupCosts: costs.filter((c) => c !== cost.id),
                    });
                  } else {
                    updateProject({
                      setupCosts: [...costs, cost.id],
                    });
                  }
                }
              }}
              className={`
                p-6 rounded-xl border-2 transition-all
                ${cost.required ? "bg-gray-50" : "cursor-pointer"}
                ${
                  project.setupCosts.includes(cost.id)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }
                ${!cost.required && "hover:border-blue-200"}
              `}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-medium text-gray-800 flex items-center gap-2">
                    {cost.name}
                    {cost.required && (
                      <span
                        className="px-2 py-1 bg-blue-100 text-blue-700 
                                     text-xs rounded-full"
                      >
                        Obligāts
                      </span>
                    )}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {cost.description}
                  </p>
                </div>
              </div>

              {/* Pricing Options */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Mēnesī</div>
                  <div className="text-lg font-medium text-gray-800 mt-1">
                    {cost.monthlyPrice}€
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Gadā</div>
                  <div className="text-lg font-medium text-gray-800 mt-1">
                    {cost.yearlyPrice}€
                  </div>
                </div>
              </div>

              {/* Annual Savings */}
              {cost.yearlyPrice < cost.monthlyPrice * 12 && (
                <div className="mt-3 text-sm text-green-600 flex items-center gap-2">
                  <FaCheck className="w-4 h-4" />
                  Ietaupījums gadā:{" "}
                  {(cost.monthlyPrice * 12 - cost.yearlyPrice).toFixed(2)}€
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};
// CostSummaryStep Component
const CostSummaryStep: React.FC<CostSummaryStepProps> = ({
  project,
  updateProject,
  totalPrice,
  monthlyPrice,
  yearlyPrice,
  onSubmit,
}) => {
  const [isValidating, setIsValidating] = useState(false);
  const [agreement, setAgreement] = useState(false);

  // Payment Plan Cards Component
  const PaymentPlanCards = () => {
    const plans = [
      {
        id: "full",
        name: "Pilns maksājums",
        description: "Vienreizējs maksājums ar 5% atlaidi",
        splits: 1,
        icon: <FaCheck className="w-5 h-5" />,
        isRecommended: true,
      },
      {
        id: "split-2",
        name: "Divi maksājumi",
        description: "Sadalīts divos vienādos maksājumos",
        splits: 2,
        icon: <FaChartLine className="w-5 h-5" />,
      },
      {
        id: "split-3",
        name: "Trīs maksājumi",
        description: "Sadalīts trijos vienādos maksājumos",
        splits: 3,
        icon: <FaChartLine className="w-5 h-5" />,
      },
      {
        id: "split-4",
        name: "Četri maksājumi",
        description: "Sadalīts četros vienādos maksājumos",
        splits: 4,
        icon: <FaChartLine className="w-5 h-5" />,
      },
    ];

    const calculatePayment = (splits: number) => {
      if (splits === 1) {
        // 5% discount for full payment
        return {
          totalAmount: totalPrice * 0.95,
          splitAmount: totalPrice * 0.95,
          discount: totalPrice * 0.05,
          fee: 0,
        };
      } else {
        const fee = totalPrice * 0.02 * (splits - 1);
        const totalWithFee = totalPrice + fee;
        return {
          totalAmount: totalWithFee,
          splitAmount: totalWithFee / splits,
          discount: 0,
          fee,
        };
      }
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((plan) => {
          const payment = calculatePayment(plan.splits);
          const isSelected =
            project.paymentOption === (plan.splits === 1 ? "full" : "split") &&
            project.paymentSplits === plan.splits;

          return (
            <motion.div
              key={plan.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                updateProject({
                  paymentOption: plan.splits === 1 ? "full" : "split",
                  paymentSplits: plan.splits,
                })
              }
              className={`
                relative p-6 rounded-xl border-2 cursor-pointer transition-all
                ${isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200"}
                ${
                  plan.isRecommended
                    ? "ring-2 ring-green-500 ring-offset-2"
                    : ""
                }
              `}
            >
              {/* Recommended Badge */}
              {plan.isRecommended && (
                <div className="absolute -top-3 -right-3">
                  <span
                    className="px-3 py-1 bg-green-500 text-white text-xs 
                                 rounded-full shadow-lg"
                  >
                    Ieteicamais
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 text-blue-500 rounded-lg">
                  {plan.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{plan.name}</h3>
                  <p className="text-sm text-gray-500">{plan.description}</p>
                </div>
              </div>

              {/* Pricing Details */}
              <div className="space-y-3">
                <div className="text-2xl font-bold text-gray-800">
                  {payment.splitAmount.toFixed(2)}€
                  {plan.splits > 1 && (
                    <span className="text-sm font-normal text-gray-500">
                      {" "}
                      / maksājums
                    </span>
                  )}
                </div>

                {/* Additional Information */}
                <div className="space-y-2 text-sm text-gray-600">
                  {payment.discount > 0 && (
                    <div className="flex items-center gap-2 text-green-600">
                      <FaCheck className="w-4 h-4" />
                      <span>Ietaupījums {payment.discount.toFixed(2)}€</span>
                    </div>
                  )}
                  {payment.fee > 0 && (
                    <div className="flex items-center gap-2">
                      <span>Apstrādes maksa: {payment.fee.toFixed(2)}€</span>
                    </div>
                  )}
                  <div className="pt-2 border-t mt-2">
                    <span className="font-medium">
                      Kopā: {payment.totalAmount.toFixed(2)}€
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  const validateForm = () => {
    setIsValidating(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]?[\d\s-]{8,}$/;

    if (!project.clientName?.trim()) {
      toast.error("Lūdzu ievadiet vārdu un uzvārdu");
      return false;
    }

    if (!project.clientEmail?.trim() || !emailRegex.test(project.clientEmail)) {
      toast.error("Lūdzu ievadiet derīgu e-pasta adresi");
      return false;
    }

    if (!project.clientPhone?.trim() || !phoneRegex.test(project.clientPhone)) {
      toast.error("Lūdzu ievadiet derīgu telefona numuru");
      return false;
    }

    if (!agreement) {
      toast.error("Lūdzu apstipriniet noteikumus");
      return false;
    }

    return true;
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Client Information Form */}
      <section className="space-y-6">
        <h3 className="text-lg font-medium text-gray-800">
          Klienta informācija
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label
              htmlFor="clientName"
              className="block text-sm font-medium text-gray-700"
            >
              Vārds Uzvārds
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              id="clientName"
              type="text"
              value={project.clientName}
              onChange={(e) => updateProject({ clientName: e.target.value })}
              className={`
                w-full px-4 py-2 border rounded-lg
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                transition-colors
                ${
                  isValidating && !project.clientName?.trim()
                    ? "border-red-500"
                    : "border-gray-300"
                }
              `}
              placeholder="Jānis Bērziņš"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label
              htmlFor="clientEmail"
              className="block text-sm font-medium text-gray-700"
            >
              E-pasts
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              id="clientEmail"
              type="email"
              value={project.clientEmail}
              onChange={(e) => updateProject({ clientEmail: e.target.value })}
              className={`
                w-full px-4 py-2 border rounded-lg
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                transition-colors
                ${
                  isValidating &&
                  (!project.clientEmail?.trim() ||
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(project.clientEmail))
                    ? "border-red-500"
                    : "border-gray-300"
                }
              `}
              placeholder="janis.berzins@example.com"
            />
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <label
              htmlFor="clientPhone"
              className="block text-sm font-medium text-gray-700"
            >
              Telefons
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              id="clientPhone"
              type="tel"
              value={project.clientPhone}
              onChange={(e) => updateProject({ clientPhone: e.target.value })}
              className={`
                w-full px-4 py-2 border rounded-lg
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                transition-colors
                ${
                  isValidating &&
                  (!project.clientPhone?.trim() ||
                    !/^[+]?[\d\s-]{8,}$/.test(project.clientPhone))
                    ? "border-red-500"
                    : "border-gray-300"
                }
              `}
              placeholder="+371 20000000"
            />
          </div>
        </div>
      </section>

      {/* Payment Plans */}
      <section>
        <h3 className="text-lg font-medium text-gray-800 mb-6">
          Maksājuma veids
        </h3>
        <PaymentPlanCards />
      </section>

      {/* Cost Summary */}
      <section className="bg-gray-50 p-6 rounded-xl">
        <h3 className="text-lg font-medium text-gray-800 mb-6">
          Izmaksu kopsavilkums
        </h3>

        <div className="space-y-6">
          {/* One-time Costs */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Vienreizējās izmaksas
            </h4>
            <div className="space-y-2">
              {/* Base Price */}
              {project.websiteType && (
                <div className="flex justify-between text-sm">
                  <span>Pamata cena</span>
                  <span className="font-medium">
                    {
                      websiteTypes.find((t) => t.id === project.websiteType)
                        ?.basePrice
                    }
                    €
                  </span>
                </div>
              )}

              {/* Subtype Price */}
              {project.websiteType && project.websiteSubtype && (
                <div className="flex justify-between text-sm">
                  <span>Papildus funkcionalitāte</span>
                  <span className="font-medium">
                    +
                    {
                      websiteTypes
                        .find((t) => t.id === project.websiteType)
                        ?.subtypes.find(
                          (st) => st.id === project.websiteSubtype
                        )?.additionalPrice
                    }
                    €
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

              {/* Payment Plan Adjustment */}
              {project.paymentOption === "full" ? (
                <div className="flex justify-between text-sm text-green-600">
                  <span>5% atlaide par pilnu maksājumu</span>
                  <span className="font-medium">
                    -{(totalPrice * 0.05).toFixed(2)}€
                  </span>
                </div>
              ) : (
                project.paymentSplits > 1 && (
                  <div className="flex justify-between text-sm">
                    <span>
                      Dalītā maksājuma maksa ({(project.paymentSplits - 1) * 2}
                      %)
                    </span>
                    <span className="font-medium">
                      +
                      {(
                        totalPrice *
                        0.02 *
                        (project.paymentSplits - 1)
                      ).toFixed(2)}
                      €
                    </span>
                  </div>
                )
              )}

              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-medium">
                  <span>Kopā vienreizējās izmaksas</span>
                  <span className="text-blue-500">{totalPrice}€</span>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly/Yearly Costs */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Regulārās izmaksas
            </h4>
            <div className="space-y-2">
              {project.setupCosts.map((costId) => {
                const cost = setupCosts.find((c) => c.id === costId);
                return cost ? (
                  <div key={cost.id} className="flex justify-between text-sm">
                    <span>{cost.name}</span>
                    <div className="text-right">
                      <div className="font-medium">
                        {cost.monthlyPrice}€/mēn
                      </div>
                      <div className="text-xs text-gray-500">
                        vai {cost.yearlyPrice}€/gadā
                      </div>
                    </div>
                  </div>
                ) : null;
              })}

              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-medium">
                  <span>Kopā regulārās izmaksas</span>
                  <div className="text-right">
                    <div className="text-blue-500">{monthlyPrice}€/mēn</div>
                    <div className="text-sm text-gray-500">
                      vai {yearlyPrice}€/gadā
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agreement and Submit */}
      <section className="space-y-4">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={agreement}
            onChange={(e) => setAgreement(e.target.checked)}
            className="mt-1 rounded border-gray-300 text-blue-500
                     focus:ring-blue-500 transition-colors"
          />
          <span className="text-sm text-gray-600">
            Es piekrītu, ka manis sniegtā informācija tiks izmantota projekta
            realizācijas vajadzībām. Esmu iepazinies ar izmaksu aprēķinu un
            saprotu, ka faktiskās izmaksas var mainīties atkarībā no projekta
            specifikācijas precizēšanas.
          </span>
        </label>

        <button
          onClick={() => {
            if (validateForm()) {
              onSubmit();
            }
          }}
          disabled={!agreement}
          className="w-full py-3 bg-blue-500 text-white rounded-lg
                   hover:bg-blue-600 transition-colors disabled:opacity-50
                   disabled:cursor-not-allowed flex items-center justify-center
                   gap-2"
        >
          <span>Pabeigt un nosūtīt</span>
        </button>
      </section>
    </motion.div>
  );
};
// PreviewPanel Component
const PreviewPanel: React.FC<PreviewPanelProps> = ({
  project,
  totalPrice,
  monthlyPrice,
  yearlyPrice,
}) => {
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

  return (
    <div className="space-y-6">
      {/* Project Info */}
      {project.name && (
        <section className="pb-4 border-b">
          <h4 className="text-sm font-medium text-gray-600 mb-2">
            Projekta nosaukums
          </h4>
          <p className="text-lg font-medium text-gray-900">{project.name}</p>
        </section>
      )}

      {/* Client Info */}
      {(project.clientName || project.clientEmail || project.clientPhone) && (
        <section className="pb-4 border-b">
          <h4 className="text-sm font-medium text-gray-600 mb-3">
            Klienta informācija
          </h4>
          <div className="space-y-2">
            {project.clientName && (
              <div className="flex items-center gap-2 text-sm">
                <FaBriefcase className="text-gray-400" />
                <span>{project.clientName}</span>
              </div>
            )}
            {project.clientEmail && (
              <div className="flex items-center gap-2 text-sm">
                <FaPenSquare className="text-gray-400" />
                <span>{project.clientEmail}</span>
              </div>
            )}
            {project.clientPhone && (
              <div className="flex items-center gap-2 text-sm">
                <FaMobileAlt className="text-gray-400" />
                <span>{project.clientPhone}</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Website Type */}
      {selectedWebsiteType && (
        <section className="pb-4 border-b">
          <h4 className="text-sm font-medium text-gray-600 mb-3">
            Mājaslapas tips
          </h4>
          <div className="flex items-center gap-3 mb-2">
            <div className="text-blue-500">{selectedWebsiteType.icon}</div>
            <div>
              <p className="font-medium text-gray-900">
                {selectedWebsiteType.name}
              </p>
              {selectedSubtype && (
                <p className="text-sm text-gray-600">
                  {selectedSubtype.name} (+{selectedSubtype.additionalPrice}€)
                </p>
              )}
            </div>
          </div>
          <p className="text-sm text-gray-600">
            {selectedWebsiteType.description}
          </p>
        </section>
      )}

      {/* Design Elements */}
      {(selectedColorScheme || selectedFontPair) && (
        <section className="pb-4 border-b">
          <h4 className="text-sm font-medium text-gray-600 mb-3">
            Dizaina elementi
          </h4>

          {selectedColorScheme && (
            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">
                Krāsu palete
              </h5>
              <div className="flex gap-2">
                {Object.entries(selectedColorScheme.colors).map(
                  ([name, color]) => (
                    <div
                      key={name}
                      className="w-6 h-6 rounded-full border border-gray-200"
                      style={{ backgroundColor: color }}
                      title={`${name}: ${color}`}
                    />
                  )
                )}
              </div>
            </div>
          )}

          {selectedFontPair && (
            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-2">
                Fontu kombinācija
              </h5>
              <div
                style={{ fontFamily: selectedFontPair.heading }}
                className="text-lg mb-1"
              >
                Virsraksts
              </div>
              <div
                style={{ fontFamily: selectedFontPair.body }}
                className="text-sm"
              >
                Pamatteksts
              </div>
            </div>
          )}
        </section>
      )}

      {/* Selected Features */}
      {project.features.length > 0 && (
        <section className="pb-4 border-b">
          <h4 className="text-sm font-medium text-gray-600 mb-3">
            Izvēlētās funkcijas
          </h4>
          <div className="space-y-2">
            {project.features.map((featureId) => {
              const feature = features.find((f) => f.id === featureId);
              return feature ? (
                <div
                  key={feature.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500">{feature.icon}</span>
                    <span className="text-sm">{feature.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    {feature.price}€
                  </span>
                </div>
              ) : null;
            })}
          </div>
        </section>
      )}

      {/* Setup Costs */}
      {project.setupCosts.length > 0 && (
        <section className="pb-4 border-b">
          <h4 className="text-sm font-medium text-gray-600 mb-3">
            Uzturēšanas pakalpojumi
          </h4>
          <div className="space-y-2">
            {project.setupCosts.map((costId) => {
              const cost = setupCosts.find((c) => c.id === costId);
              return cost ? (
                <div
                  key={cost.id}
                  className="flex justify-between items-center"
                >
                  <span className="text-sm">{cost.name}</span>
                  <div className="text-right">
                    <span className="text-sm font-medium">
                      {cost.monthlyPrice}€/mēn
                    </span>
                    <span className="text-xs text-gray-500 block">
                      vai {cost.yearlyPrice}€/gadā
                    </span>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </section>
      )}

      {/* Total Costs */}
      <section>
        <h4 className="text-sm font-medium text-gray-600 mb-3">
          Kopējās izmaksas
        </h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">
              Vienreizējās izmaksas:
            </span>
            <span className="font-medium">{totalPrice}€</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Ikmēneša izmaksas:</span>
            <div className="text-right">
              <span className="font-medium">{monthlyPrice}€/mēn</span>
              <span className="text-xs text-gray-500 block">
                vai {yearlyPrice}€/gadā
              </span>
            </div>
          </div>

          <div className="pt-3 border-t">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-700">
                Kopā pirmajā mēnesī:
              </span>
              <span className="text-lg font-medium text-blue-500">
                {(totalPrice + monthlyPrice).toFixed(2)}€
              </span>
            </div>
          </div>

          {project.paymentOption === "split" && (
            <div className="text-sm text-gray-500">
              * Dalītā maksājuma gadījumā:{" "}
              {(totalPrice / project.paymentSplits).toFixed(2)}€ ×{" "}
              {project.paymentSplits}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
// Main SketchBuilder Component
const SketchBuilder: React.FC = () => {
  // State declarations
  const [step, setStep] = useState(0);
  const [project, setProject] = useState<ProjectState>({
    features: [],
    name: "",
    setupCosts: [],
    businessGoals: [],
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    paymentOption: "full",
    paymentSplits: 1,
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [monthlyPrice, setMonthlyPrice] = useState(0);
  const [yearlyPrice, setYearlyPrice] = useState(0);
  const [history, setHistory] = useState<ProjectState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Steps configuration
  const steps = [
    {
      title: "Projekta informācija",
      description: "Pastāstiet vairāk par savu projektu",
      component: ProjectInfoStep,
    },
    {
      title: "Mājaslapas tips",
      description: "Izvēlieties sev piemērotāko variantu",
      component: WebsiteTypeStep,
    },
    {
      title: "Dizaina elementi",
      description: "Pielāgojiet krāsas un fontus",
      component: DesignStep,
    },
    {
      title: "Izkārtojums",
      description: "Izvēlieties mājaslapas struktūru",
      component: LayoutStep,
    },
    {
      title: "Funkcionalitāte",
      description: "Atlasiet nepieciešamās funkcijas",
      component: FeaturesStep,
    },
    {
      title: "Pabeigšana",
      description: "Pārskatiet un apstipriniet projektu",
      component: CostSummaryStep,
    },
  ];

  // Price calculation effect
  useEffect(() => {
    calculateTotalPrice();
  }, [project]);

  // Price calculation function
  const calculateTotalPrice = useCallback(() => {
    let basePrice = 0;
    let monthlyTotal = 0;
    let yearlyTotal = 0;

    // Base price from website type
    if (project.websiteType) {
      const type = websiteTypes.find((t) => t.id === project.websiteType);
      if (type) {
        basePrice += type.basePrice;

        // Add subtype price
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

    // Apply payment plan adjustments
    if (project.paymentOption === "split" && project.paymentSplits > 1) {
      const splitFee = basePrice * 0.02 * (project.paymentSplits - 1);
      basePrice += splitFee;
    } else if (project.paymentOption === "full") {
      // 5% discount for full payment
      basePrice *= 0.95;
    }

    setTotalPrice(Math.round(basePrice));
    setMonthlyPrice(monthlyTotal);
    setYearlyPrice(yearlyTotal);
  }, [project]);

  // History management
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

  // Project update handler
  const updateProject = useCallback((updates: Partial<ProjectState>) => {
    setProject((prev) => ({ ...prev, ...updates }));
  }, []);

  // PDF export function
  const exportToPDF = async () => {
    const previewPanel = document.getElementById("preview-panel");
    if (!previewPanel) return;

    try {
      setIsLoading(true);
      const canvas = await html2canvas(previewPanel);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.setFontSize(20);
      pdf.text("Mājaslapas projekta specifikācija", 20, 20);

      pdf.setFontSize(12);
      pdf.text(`Projekta nosaukums: ${project.name}`, 20, 40);
      pdf.text(`Datums: ${new Date().toLocaleDateString()}`, 20, 50);
      pdf.text(`Klienta vārds: ${project.clientName}`, 20, 60);

      pdf.addImage(imgData, "PNG", 0, 80, pdfWidth, pdfHeight);
      pdf.save(`${project.name || "website"}-specification.pdf`);
      toast.success("PDF veiksmīgi izveidots!");
    } catch (error) {
      console.error("PDF export error:", error);
      toast.error("Kļūda PDF izveidē. Lūdzu mēģiniet vēlreiz.");
    } finally {
      setIsLoading(false);
    }
  };

  // Project submission function
  const sendProjectDetails = async () => {
    try {
      setIsLoading(true);
      const projectData = {
        name: project.name,
        website_type: project.websiteType,
        website_subtype: project.websiteSubtype,
        color_scheme: project.colorScheme,
        font_pair: project.fontPair,
        layout: project.layout,
        timeline: project.timeline,
        budget: project.budget,
        target_audience: project.targetAudience,
        business_goals: project.businessGoals,
        features: project.features,
        setup_costs: project.setupCosts,
        total_price: totalPrice,
        monthly_price: monthlyPrice,
        yearly_price: yearlyPrice,
        client_name: project.clientName,
        client_email: project.clientEmail,
        client_phone: project.clientPhone,
        payment_option: project.paymentOption,
        payment_splits: project.paymentSplits,
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("projects")
        .insert([projectData])
        .select();

      if (error) throw error;

      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Kļūda sūtot projekta detaļas. Lūdzu mēģiniet vēlreiz.");
    } finally {
      setIsLoading(false);
    }
  };

  // Reset project function
  const resetProject = useCallback(() => {
    setProject({
      features: [],
      name: "",
      setupCosts: [],
      businessGoals: [],
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      paymentOption: "full",
      paymentSplits: 1,
    });
    setStep(0);
    setHistory([]);
    setHistoryIndex(-1);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div
          className="mb-8 flex flex-col sm:flex-row justify-between items-start 
                      sm:items-center space-y-4 sm:space-y-0"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Mājaslapas Skices Veidotājs
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Izveidojiet savas mājaslapas vīziju {steps.length} vienkāršos
              soļos
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={undo}
              disabled={historyIndex <= 0 || isLoading}
              className="p-2 rounded-full bg-white shadow hover:bg-gray-50 
                       disabled:opacity-50 transition-all"
              title="Atsaukt"
            >
              <FaUndo className="w-5 h-5" />
            </button>
            <button
              onClick={redo}
              disabled={historyIndex >= history.length - 1 || isLoading}
              className="p-2 rounded-full bg-white shadow hover:bg-gray-50 
                       disabled:opacity-50 transition-all"
              title="Atcelt atsaukšanu"
            >
              <FaRedo className="w-5 h-5" />
            </button>
            <button
              onClick={exportToPDF}
              disabled={isLoading}
              className="p-2 rounded-full bg-white shadow hover:bg-gray-50 
                       disabled:opacity-50 transition-all"
              title="Eksportēt PDF"
            >
              <FaSave className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="hidden sm:flex justify-between mb-2">
            {steps.map((s, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  index === steps.length - 1 ? "" : "flex-1"
                }`}
              >
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    ${
                      index <= step
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-500"
                    }
                  `}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`
                      h-1 flex-1 mx-2
                      ${index < step ? "bg-blue-500" : "bg-gray-200"}
                    `}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between px-4 text-sm text-gray-600 mt-2">
            {steps.map((s, index) => (
              <div
                key={index}
                className={`
                  hidden sm:block
                  ${index <= step ? "text-blue-500" : "text-gray-500"}
                `}
              >
                {s.title}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
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
                disabled={step === 0 || isLoading}
                className={`
                  px-6 py-2 rounded-lg transition-all
                  ${
                    step === 0
                      ? "opacity-0 pointer-events-none"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }
                `}
              >
                Atpakaļ
              </button>

              <button
                onClick={() => {
                  if (step === steps.length - 1) {
                    sendProjectDetails();
                  } else {
                    setStep((prev) => prev + 1);
                  }
                }}
                disabled={isLoading}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg 
                         hover:bg-blue-600 disabled:opacity-50 
                         disabled:cursor-not-allowed transition-all
                         flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div
                      className="w-5 h-5 border-2 border-white border-t-transparent 
                                  rounded-full animate-spin"
                    />
                    <span>Apstrādā...</span>
                  </>
                ) : step === steps.length - 1 ? (
                  "Pabeigt un nosūtīt"
                ) : (
                  "Tālāk"
                )}
              </button>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="w-full lg:w-96">
            <div
              id="preview-panel"
              className="bg-white rounded-lg shadow-lg p-6 lg:sticky lg:top-8"
            >
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
      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <SuccessModal
            isOpen={showSuccessModal}
            onClose={() => {
              setShowSuccessModal(false);
              resetProject();
            }}
            clientName={project.clientName}
            clientEmail={project.clientEmail}
          />
        )}
      </AnimatePresence>

      {/* Toast Container */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{
          backgroundColor: "white",
          color: "#1f2937",
          borderRadius: "0.5rem",
          boxShadow:
            "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        }}
      />

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center 
                     justify-center z-50"
          >
            <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4 text-center">
              <div
                className="w-16 h-16 border-4 border-blue-500 border-t-transparent 
                            rounded-full animate-spin mx-auto mb-4"
              />
              <p className="text-gray-800 font-medium">Lūdzu uzgaidiet...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Helper Functions
const formatPrice = (price: number): string => {
  return price.toFixed(2);
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString("lv-LV", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[+]?[\d\s-]{8,}$/;
  return phoneRegex.test(phone);
};

const calculateSplitPaymentFee = (
  basePrice: number,
  splits: number
): number => {
  return basePrice * 0.02 * (splits - 1);
};

const calculateFullPaymentDiscount = (basePrice: number): number => {
  return basePrice * 0.05;
};

// Export the main component
export default SketchBuilder;
