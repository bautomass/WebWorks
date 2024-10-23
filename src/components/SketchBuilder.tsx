"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  FaSave,
  FaShare,
  FaUndo,
  FaRedo,
  FaEye,
  FaPalette,
  FaShoppingCart,
  FaPenSquare,
  FaBriefcase,
  FaGraduationCap,
  FaTheaterMasks,
  FaNewspaper,
  FaUsers,
  FaHandsHelping,
  FaComments,
  FaUtensils,
  FaPlane,
  FaHome,
  FaDumbbell,
  FaHospital,
  FaCog,
  FaMobileAlt,
  FaSearch,
  FaEnvelope,
  FaLock,
  FaLanguage,
  FaCreditCard,
  FaImages,
  FaVideo,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsersCog,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Types
interface WebsiteType {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  basePrice: number;
  recommendedFeatures: string[];
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

interface Feature {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: JSX.Element;
  applicableTypes: string[];
  complexity: "basic" | "intermediate" | "advanced";
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

interface ProjectState {
  websiteType?: string;
  colorScheme?: string;
  fontPair?: string;
  layout?: string;
  features: string[];
  name: string;
}

// Constants
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
  },
  {
    id: "portfolio",
    name: "Portfolio",
    description: "Eleganta vietne jūsu darbu un talantu prezentēšanai",
    icon: <FaPalette className="w-8 h-8" />,
    basePrice: 600,
    recommendedFeatures: ["gallery", "animations", "contactForm"],
  },
  {
    id: "blog",
    name: "Blogs",
    description: "Moderna platforma jūsu stāstu un ideju publicēšanai",
    icon: <FaPenSquare className="w-8 h-8" />,
    basePrice: 500,
    recommendedFeatures: ["blog", "newsletter", "socialMedia"],
  },
];

const colorSchemes: ColorScheme[] = [
  {
    id: "professional",
    name: "Profesionālā",
    description: "Klasiskas krāsas, kas raisa uzticamību",
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
    description: "Tīrs dizains ar spilgtiem akcentiem",
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
    description: "Silti un viesmīlīgi toņi",
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
    description: "Mierīgi un harmoniski zaļie toņi",
    colors: {
      primary: "#27ae60",
      secondary: "#2ecc71",
      accent: "#f1c40f",
      background: "#f4f9f4",
      text: "#2c3e50",
    },
    recommendedFor: ["blog", "portfolio"],
  },
  {
    id: "minimal",
    name: "Minimālā",
    description: "Tīrs un fokusēts dizains",
    colors: {
      primary: "#333333",
      secondary: "#666666",
      accent: "#000000",
      background: "#ffffff",
      text: "#333333",
    },
    recommendedFor: ["portfolio", "business"],
  },
  {
    id: "bold",
    name: "Drosmīgā",
    description: "Spilgti un iedvesmojoši toņi",
    colors: {
      primary: "#8e44ad",
      secondary: "#9b59b6",
      accent: "#e74c3c",
      background: "#ffffff",
      text: "#2c3e50",
    },
    recommendedFor: ["ecommerce", "entertainment"],
  },
];

const fontPairs: FontPair[] = [
  {
    id: "classic",
    name: "Klasiskais",
    heading: "Playfair Display",
    body: "Source Sans Pro",
    description: "Elegants un profesionāls",
    preview: "Aa Bb Cc 123",
  },
  {
    id: "modern",
    name: "Modernais",
    heading: "Montserrat",
    body: "Open Sans",
    description: "Tīrs un laikmetīgs",
    preview: "Aa Bb Cc 123",
  },
  {
    id: "minimal",
    name: "Minimālais",
    heading: "Helvetica Neue",
    body: "Arial",
    description: "Vienkāršs un funkcionāls",
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
  {
    id: "tech",
    name: "Tehniskais",
    heading: "Space Grotesk",
    body: "Inter",
    description: "Moderns un tehnisks",
    preview: "Aa Bb Cc 123",
  },
  {
    id: "elegant",
    name: "Elegantais",
    heading: "Cormorant Garamond",
    body: "Lato",
    description: "Izsmalcināts un gaumīgs",
    preview: "Aa Bb Cc 123",
  },
];

const features: Feature[] = [
  {
    id: "responsiveDesign",
    name: "Responsīvs dizains",
    description: "Pielāgojas visu ierīču izmēriem",
    price: 200,
    icon: <FaMobileAlt />,
    applicableTypes: ["all"],
    complexity: "basic",
  },
  {
    id: "seo",
    name: "SEO optimizācija",
    description: "Uzlabo redzamību meklētājprogrammās",
    price: 300,
    icon: <FaSearch />,
    applicableTypes: ["all"],
    complexity: "intermediate",
  },
  {
    id: "contactForm",
    name: "Kontaktu forma",
    description: "Ērta saziņa ar klientiem",
    price: 100,
    icon: <FaEnvelope />,
    applicableTypes: ["business", "portfolio"],
    complexity: "basic",
  },
  {
    id: "analytics",
    name: "Statistikas rīki",
    description: "Detalizēta apmeklējumu analīze",
    price: 150,
    icon: <FaCog />,
    applicableTypes: ["all"],
    complexity: "intermediate",
  },
  {
    id: "security",
    name: "Drošības pakotne",
    description: "Papildus drošības līdzekļi",
    price: 250,
    icon: <FaLock />,
    applicableTypes: ["ecommerce", "business"],
    complexity: "advanced",
  },
  {
    id: "multiLanguage",
    name: "Daudzvalodu atbalsts",
    description: "Vietnes saturs vairākās valodās",
    price: 400,
    icon: <FaLanguage />,
    applicableTypes: ["business", "ecommerce"],
    complexity: "advanced",
  },
];

const layouts: Layout[] = [
  {
    id: "classic",
    name: "Klasiskais",
    description: "Tradicionāls, pārbaudīts izkārtojums",
    image: "/layouts/classic.svg",
    priceModifier: 1,
    recommendedFor: ["business", "portfolio"],
    features: ["header", "footer", "navigation"],
  },
  {
    id: "modern",
    name: "Modernais",
    description: "Mūsdienīgs vienas lapas dizains",
    image: "/layouts/modern.svg",
    priceModifier: 1.2,
    recommendedFor: ["portfolio", "startup"],
    features: ["animations", "parallax", "smoothScroll"],
  },
  {
    id: "minimal",
    name: "Minimālais",
    description: "Vienkāršs un fokusēts dizains",
    image: "/layouts/minimal.svg",
    priceModifier: 0.9,
    recommendedFor: ["portfolio", "personal"],
    features: ["whitespace", "typography"],
  },
  {
    id: "magazine",
    name: "Žurnāla stils",
    description: "Bagātīgs, satura orientēts izkārtojums",
    image: "/layouts/magazine.svg",
    priceModifier: 1.3,
    recommendedFor: ["blog", "news"],
    features: ["grid", "categories", "featured"],
  },
  {
    id: "ecommerce",
    name: "E-komercijas",
    description: "Optimizēts produktu pārdošanai",
    image: "/layouts/ecommerce.svg",
    priceModifier: 1.4,
    recommendedFor: ["ecommerce", "marketplace"],
    features: ["productGrid", "cart", "checkout"],
  },
  {
    id: "app",
    name: "Lietotnes stils",
    description: "Modernā web aplikācijas saskarne",
    image: "/layouts/app.svg",
    priceModifier: 1.5,
    recommendedFor: ["saas", "application"],
    features: ["dashboard", "sidebar", "widgets"],
  },
];

// Main component
const SketchBuilder: React.FC = () => {
  const [step, setStep] = useState(0);
  const [project, setProject] = useState<ProjectState>({
    features: [],
    name: "",
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [history, setHistory] = useState<ProjectState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Calculate total price whenever project changes
  useEffect(() => {
    calculateTotalPrice();
  }, [project]);

  const calculateTotalPrice = useCallback(() => {
    let price = 0;

    // Base price from website type
    if (project.websiteType) {
      const type = websiteTypes.find((t) => t.id === project.websiteType);
      if (type) {
        price += type.basePrice;
      }
    }

    // Add feature prices
    project.features.forEach((featureId) => {
      const feature = features.find((f) => f.id === featureId);
      if (feature) {
        price += feature.price;
      }
    });

    // Apply layout modifier
    if (project.layout) {
      const layout = layouts.find((l) => l.id === project.layout);
      if (layout) {
        price *= layout.priceModifier;
      }
    }

    setTotalPrice(Math.round(price));
  }, [project]);

  // Save history for undo/redo
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

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${project.name || "website"}-sketch.pdf`);

        toast.success("PDF veiksmīgi izveidots!");
      } catch (error) {
        toast.error("Kļūda PDF izveidē. Lūdzu mēģiniet vēlreiz.");
        console.error("PDF export error:", error);
      }
    }
  };

  const steps = [
    {
      title: "Projekta informācija",
      description: "Sāksim ar pamata informāciju par jūsu projektu",
      component: ProjectInfoStep,
    },
    {
      title: "Mājaslapas tips",
      description:
        "Izvēlieties mājaslapas veidu, kas vislabāk atbilst jūsu vajadzībām",
      component: WebsiteTypeStep,
    },
    {
      title: "Dizaina elementi",
      description: "Pielāgojiet krāsas un fontus",
      component: DesignStep,
    },
    {
      title: "Izkārtojums",
      description: "Izvēlieties lapas strukturālo izkārtojumu",
      component: LayoutStep,
    },
    {
      title: "Funkcionalitāte",
      description: "Pievienojiet nepieciešamās funkcijas",
      component: FeaturesStep,
    },
  ];

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
              Izveidojiet savas mājaslapas vīziju 5 vienkāršos soļos
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
              <button
                onClick={() => setStep((prev) => prev + 1)}
                disabled={step === steps.length - 1}
                className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
              >
                Tālāk
              </button>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="w-96">
            <div
              id="preview-panel"
              className="bg-white rounded-lg shadow-lg p-6 sticky top-8"
            >
              <h3 className="text-lg font-semibold mb-4">
                Projekta kopsavilkums
              </h3>

              {/* Project Preview */}
              <PreviewPanel project={project} totalPrice={totalPrice} />

              {/* Price */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Kopējās izmaksas:</span>
                  <span className="text-2xl font-bold text-blue-500">
                    {totalPrice}€
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
};

// Step Components
const ProjectInfoStep: React.FC<{
  project: ProjectState;
  updateProject: (updates: Partial<ProjectState>) => void;
}> = ({ project, updateProject }) => {
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
    </div>
  );
};

const WebsiteTypeStep: React.FC<{
  project: ProjectState;
  updateProject: (updates: Partial<ProjectState>) => void;
}> = ({ project, updateProject }) => {
  return (
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
              <div className="flex space-x-2">
                {Object.values(scheme.colors).map((color, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full border border-gray-200"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-600">{scheme.description}</p>
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
              <div className="space-y-2">
                <p style={{ fontFamily: pair.heading }} className="text-lg">
                  {pair.preview}
                </p>
                <p style={{ fontFamily: pair.body }} className="text-sm">
                  {pair.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const LayoutStep: React.FC<{
  project: ProjectState;
  updateProject: (updates: Partial<ProjectState>) => void;
}> = ({ project, updateProject }) => {
  return (
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
          <p className="text-sm text-gray-600 mb-2">{layout.description}</p>
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
        </motion.div>
      ))}
    </div>
  );
};

const FeaturesStep: React.FC<{
  project: ProjectState;
  updateProject: (updates: Partial<ProjectState>) => void;
}> = ({ project, updateProject }) => {
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

  return (
    <div className="space-y-6">
      {["basic", "intermediate", "advanced"].map((complexity) => (
        <div key={complexity}>
          <h3 className="text-lg font-medium mb-4 capitalize">
            {complexity} funkcijas
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {applicableFeatures
              .filter((feature) => feature.complexity === complexity)
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
                    </div>
                    <span className="text-sm font-medium text-blue-500">
                      {feature.price}€
                    </span>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const PreviewPanel: React.FC<{
  project: ProjectState;
  totalPrice: number;
}> = ({ project, totalPrice }) => {
  const selectedWebsiteType = websiteTypes.find(
    (type) => type.id === project.websiteType
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
      {/* Project Name */}
      {project.name && (
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-1">
            Projekta nosaukums
          </h4>
          <p className="font-medium">{project.name}</p>
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
        </div>
      )}

      {/* Color Scheme */}
      {selectedColorScheme && (
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-1">
            Krāsu palete
          </h4>
          <div className="space-y-2">
            <p>{selectedColorScheme.name}</p>
            <div className="flex gap-2">
              {Object.values(selectedColorScheme.colors).map((color, index) => (
                <div
                  key={index}
                  className="w-6 h-6 rounded-full border border-gray-200"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
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
          <div className="space-y-1">
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

      {/* Layout */}
      {selectedLayout && (
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-1">
            Izkārtojums
          </h4>
          <p>{selectedLayout.name}</p>
          <img
            src={selectedLayout.image}
            alt={selectedLayout.name}
            className="mt-2 w-full h-32 object-cover rounded-lg"
          />
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

      {/* Price Breakdown */}
      <div className="border-t pt-4 mt-6">
        <div className="space-y-2">
          {selectedWebsiteType && (
            <div className="flex justify-between text-sm">
              <span>Pamata cena</span>
              <span>{selectedWebsiteType.basePrice}€</span>
            </div>
          )}
          {project.features.map((featureId) => {
            const feature = features.find((f) => f.id === featureId);
            return feature ? (
              <div key={feature.id} className="flex justify-between text-sm">
                <span>{feature.name}</span>
                <span>{feature.price}€</span>
              </div>
            ) : null;
          })}
          {selectedLayout && selectedLayout.priceModifier !== 1 && (
            <div className="flex justify-between text-sm">
              <span>Izkārtojuma modifikators</span>
              <span>×{selectedLayout.priceModifier}</span>
            </div>
          )}
          <div className="border-t pt-2 mt-2 flex justify-between font-medium">
            <span>Kopā</span>
            <span className="text-blue-500">{totalPrice}€</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper components
const Button: React.FC<{
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}> = ({
  variant = "primary",
  children,
  onClick,
  disabled = false,
  className = "",
}) => {
  const baseStyles =
    "px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
    secondary:
      "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default SketchBuilder;
