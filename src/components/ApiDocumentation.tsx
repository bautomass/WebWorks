"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCode,
  FiCpu,
  FiDatabase,
  FiLock,
  FiZap,
  FiCheck,
  FiX,
  FiClipboard,
  FiTerminal,
  FiFileText,
  FiRadio,
  FiActivity,
  FiUsers,
} from "react-icons/fi";
import { supabase } from "../utils/supabase";
import Header from "../components/Header";
import Footer from "../components/footer";
import confetti from "canvas-confetti";

// Types
type BetaRegistration = {
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  company_size: string;
  estimated_requests: string;
  use_case: string;
};

type ApiExample = {
  title: string;
  description: string;
  code: string;
  icon: JSX.Element;
  tags: string[];
};

// Constants
const COMPANY_SIZES = [
  "1-10 darbinieki",
  "11-50 darbinieki",
  "51-200 darbinieki",
  "201-500 darbinieki",
  "500+ darbinieki",
];

const REQUEST_VOLUMES = [
  "Līdz 10,000 mēnesī",
  "10,000 - 50,000 mēnesī",
  "50,000 - 200,000 mēnesī",
  "200,000+ mēnesī",
];

const API_DATA = {
  future_release: {
    date: "2024. gada Jūnijs",
    registration: "Pieejama beta versijas reģistrācija",
    contact: "api@webworks.lv",
  },
  meta: {
    version: "1.0.0-beta",
    status: "coming_soon",
    documentation_url: "https://docs.webworks.lv",
  },
  features: [
    {
      icon: "lock",
      title: "Droša Integrācija",
      description: "Modernā autentifikācija un šifrēšana",
    },
    {
      icon: "zap",
      title: "Ātra Veiktspēja",
      description: "Optimizēti endpointi un kešošana",
    },
    {
      icon: "code",
      title: "Vienkārša Lietošana",
      description: "Detalizēta dokumentācija un piemēri",
    },
  ],
  requirements: {
    authentication: "Bearer Token",
    rate_limits: {
      basic: "1000 requests/hour",
      premium: "10000 requests/hour",
    },
    supported_formats: ["JSON", "XML"],
  },
};

const API_EXAMPLES: ApiExample[] = [
  {
    title: "SEO & Performance Analysis",
    description: "Detalizēta vietnes analīze un optimizācijas ieteikumi ar AI",
    icon: <FiTerminal className="text-[#EEC71B]" />,
    tags: ["AI", "SEO", "Performance"],
    code: `
// Vietnes SEO un veiktspējas analīze
const response = await fetch('https://api.webworks.lv/v1/analyze', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com',
    scan_depth: 3,
    include_seo: true,
    performance_metrics: true,
    accessibility_check: true,
    ai_recommendations: true,
    competitors: ['competitor1.com', 'competitor2.com']
  })
});

const data = await response.json();
console.log(data.recommendations);
`,
  },
  {
    title: "AI Content Generation",
    description: "Progresīva satura ģenerēšana un optimizācija",
    icon: <FiFileText className="text-[#EEC71B]" />,
    tags: ["AI", "Content", "SEO"],
    code: `
// AI satura ģenerēšana un optimizācija
const content = await fetch('https://api.webworks.lv/v1/content/generate', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    type: 'article',
    topic: 'Digital Marketing Trends 2024',
    target_audience: {
      industry: 'e-commerce',
      expertise_level: 'intermediate',
      language: 'lv'
    },
    parameters: {
      tone: 'professional',
      length: 'medium',
      keywords: ['digital marketing', 'e-commerce', 'trends'],
      seo_optimization: true,
      include_statistics: true
    },
    output_format: {
      structure: true,
      meta_description: true,
      social_media_snippets: true
    },
    creativity_level: 0.8,
    fact_checking: true
  })
});

const generatedContent = await content.json();
`,
  },
  {
    title: "Voice Intelligence",
    description: "Balss analīze un apstrāde reālajā laikā",
    icon: <FiRadio className="text-[#EEC71B]" />,
    tags: ["AI", "Voice", "Real-time"],
    code: `
// Balss apstrāde un analīze
const voiceAnalysis = await fetch('https://api.webworks.lv/v1/voice/analyze', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    stream_url: 'wss://your-audio-stream',
    analysis_type: 'comprehensive',
    features: {
      transcription: {
        language: 'lv',
        speaker_diarization: true,
        punctuation: true
      },
      sentiment_analysis: {
        real_time: true,
        emotion_detection: true
      },
      voice_metrics: {
        tone_analysis: true,
        speech_rate: true,
        clarity_score: true
      },
      key_phrases: true,
      intent_recognition: true
    },
    output: {
      format: 'detailed',
      timestamps: true,
      confidence_scores: true
    }
  })
});

const voiceInsights = await voiceAnalysis.json();
`,
  },
  {
    title: "Document Intelligence",
    description: "Automātiska dokumentu analīze un datu izgūšana",
    icon: <FiFileText className="text-[#EEC71B]" />,
    tags: ["AI", "Documents", "Analysis"],
    code: `
// Dokumentu apstrāde un analīze
const docAnalysis = await fetch('https://api.webworks.lv/v1/documents/analyze', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    document_url: 'https://example.com/document.pdf',
    analysis_type: 'full',
    extraction: {
      entities: true,
      tables: true,
      key_value_pairs: true,
      signatures: true
    },
    validation: {
      compliance_check: true,
      completeness: true,
      consistency: true
    },
    document_type: {
      auto_detect: true,
      supported_types: [
        'contract',
        'invoice',
        'receipt',
        'id_document'
      ]
    },
    output_format: {
      structured_data: true,
      summary: true,
      recommendations: true
    }
  })
});

const documentInsights = await docAnalysis.json();
`,
  },
  {
    title: "Testing Automation",
    description: "Progresīva programmatūras testēšanas automatizācija",
    icon: <FiActivity className="text-[#EEC71B]" />,
    tags: ["Testing", "Automation", "QA"],
    code: `
// Automātiskā testēšana
const testSuite = await fetch('https://api.webworks.lv/v1/testing/run', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    application: {
      type: 'web',
      url: 'https://your-app.com',
      credentials: {
        test_user: 'test@example.com',
        test_password: 'secure_password'
      }
    },
    test_types: {
      functional: true,
      performance: true,
      security: true,
      accessibility: true
    },
    coverage: {
      paths: ['/', '/login', '/dashboard'],
      user_flows: ['registration', 'checkout'],
      device_simulation: ['mobile', 'tablet', 'desktop']
    },
    monitoring: {
      real_time: true,
      screenshots: true,
      video_recording: true,
      console_logs: true
    },
    reporting: {
      format: 'detailed',
      include_metrics: true,
      failure_analysis: true
    }
  })
});

const testResults = await testSuite.json();
`,
  },
  {
    title: "Customer Analytics",
    description: "Padziļināta klientu uzvedības analīze",
    icon: <FiUsers className="text-[#EEC71B]" />,
    tags: ["Analytics", "AI", "Behavior"],
    code: `
// Klientu uzvedības analīze
const customerAnalytics = await fetch('https://api.webworks.lv/v1/customers/analyze', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    timeframe: {
      start_date: '2024-01-01',
      end_date: '2024-03-31'
    },
    analysis_types: {
      behavior_patterns: true,
      journey_mapping: true,
      segment_analysis: true,
      predictive_modeling: true
    },
    metrics: {
      engagement: true,
      retention: true,
      satisfaction: true,
      lifetime_value: true
    },
    segmentation: {
      demographic: true,
      behavioral: true,
      value_based: true,
      custom_attributes: ['location', 'device_type']
    },
    predictions: {
      churn_risk: true,
      next_purchase: true,
      lifetime_value: true
    }
  })
});

const customerInsights = await customerAnalytics.json();
`,
  },
  {
    title: "Business Intelligence",
    description: "Reāllaika biznesa analītika un prognozes",
    icon: <FiActivity className="text-[#EEC71B]" />,
    tags: ["Analytics", "BI", "Predictions"],
    code: `
// Biznesa analītika un prognozes
const businessAnalytics = await fetch('https://api.webworks.lv/v1/business/analyze', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    metrics: {
      financial: {
        revenue: true,
        expenses: true,
        margins: true,
        cash_flow: true
      },
      operational: {
        efficiency: true,
        productivity: true,
        resource_utilization: true
      },
      market: {
        share: true,
        competition: true,
        trends: true
      }
    },
    forecasting: {
      time_horizon: '12_months',
      confidence_intervals: true,
      scenario_analysis: true
    },
    reporting: {
      frequency: 'daily',
      automated: true,
      formats: ['dashboard', 'pdf', 'excel']
    }
  })
});

const businessInsights = await businessAnalytics.json();
`,
  },
  {
    title: "Smart Marketing",
    description: "AI-bazēta mārketinga optimizācija",
    icon: <FiZap className="text-[#EEC71B]" />,
    tags: ["Marketing", "AI", "Automation"],
    code: `
// Mārketinga kampaņu optimizācija
const marketingOptimization = await fetch('https://api.webworks.lv/v1/marketing/optimize', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    channels: {
      email: {
        content_optimization: true,
        send_time_optimization: true,
        audience_segmentation: true
      },
      social_media: {
        platform_optimization: true,
        content_scheduling: true,
        engagement_analysis: true
      },
      advertising: {
        budget_optimization: true,
        targeting_refinement: true,
        bid_management: true
      }
    },
    automation: {
      workflows: true,
      triggers: true,
      personalization: true
    },
    analytics: {
      attribution_modeling: true,
      roi_tracking: true,
      conversion_optimization: true
    }
  })
});

const marketingInsights = await marketingOptimization.json();
`,
  },
];

// Success Modal Component
const SuccessModal: React.FC<{
  isVisible: boolean;
  onClose: () => void;
  userName: string;
}> = ({ isVisible, onClose, userName }) => {
  useEffect(() => {
    if (isVisible) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-8 max-w-md w-full text-center relative"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheck className="text-green-500 text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Paldies, {userName}!
              </h3>
              <p className="text-gray-600 mb-6">
                Jūsu pieteikums ir veiksmīgi saņemts. Mēs ar jums sazināsimies
                tuvākajā laikā.
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <FiCheck className="text-green-500" />
                  <span>Pieteikums reģistrēts</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <FiCheck className="text-green-500" />
                  <span>Tehniskā komanda informēta</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <FiCheck className="text-green-500" />
                  <span>Gaidiet mūsu e-pastu</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="mt-8 px-6 py-2 bg-[#EEC71B] text-[#3D3B4A] rounded-lg font-semibold 
                hover:bg-opacity-90 transition-all duration-300 hover:transform hover:scale-105"
              >
                Aizvērt
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ApiDocumentation: React.FC = () => {
  // State management
  const [formData, setFormData] = useState<BetaRegistration>({
    company_name: "",
    contact_name: "",
    email: "",
    phone: "",
    company_size: "",
    estimated_requests: "",
    use_case: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeExample, setActiveExample] = useState(0);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const { error } = await supabase
        .from("beta_registrations")
        .insert([formData]);

      if (error) throw error;

      setSubmitStatus({
        type: "success",
        message: "Reģistrācija veiksmīga!",
      });
      setShowForm(false);
      setShowSuccess(true);

      // Reset form after successful submission
      setFormData({
        company_name: "",
        contact_name: "",
        email: "",
        phone: "",
        company_size: "",
        estimated_requests: "",
        use_case: "",
      });
    } catch (error) {
      console.error("Registration error:", error);
      setSubmitStatus({
        type: "error",
        message: "Radās kļūda reģistrācijas procesā. Lūdzu, mēģiniet vēlreiz.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Copy code helper
  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      // Could add a toast notification here
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  // Tab navigation for API examples
  const handleExampleChange = (index: number) => {
    setActiveExample(index);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center relative overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-[#3D3B4A] mb-6">
                WebWorks API
                <span className="block text-lg md:text-xl text-[#EEC71B] mt-4">
                  Drīzumā pieejams
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                Mūsu jaudīgais API ļaus jums integrēt WebWorks pakalpojumus savā
                platformā. Pašlaik notiek aktīva izstrāde, un mēs gaidām beta
                versijas izlaišanu {API_DATA.future_release.date}.
              </p>
            </motion.div>

            {/* API Examples Section - Improved Navigation */}
            <div className="mb-16">
              <div className="bg-[#2C2A35] rounded-xl p-6 lg:p-8 overflow-hidden max-w-4xl mx-auto shadow-xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
                  {API_EXAMPLES.map((example, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleExampleChange(index)}
                      className={`px-4 py-2 rounded-lg text-sm md:text-base flex items-center gap-2 
                      transition-all duration-300 ${
                        activeExample === index
                          ? "bg-[#EEC71B] text-[#2C2A35] shadow-lg transform scale-105"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:transform hover:scale-102"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {example.icon}
                      <span className="truncate">{example.title}</span>
                    </motion.button>
                  ))}
                </div>

                {/* Example Content with Enhanced Animation */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeExample}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-800 rounded-lg p-6"
                  >
                    <div className="mb-6">
                      <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4 mb-4">
                        <div>
                          <h3 className="text-xl md:text-2xl text-white font-bold mb-2">
                            {API_EXAMPLES[activeExample].title}
                          </h3>
                          <p className="text-gray-300">
                            {API_EXAMPLES[activeExample].description}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {API_EXAMPLES[activeExample].tags.map(
                            (tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-700 text-gray-300 rounded-md text-sm"
                              >
                                {tag}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Code Display with Enhanced Styling */}
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 rounded-full bg-red-500" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500" />
                          <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <motion.button
                          onClick={() =>
                            handleCopyCode(API_EXAMPLES[activeExample].code)
                          }
                          className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-700"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FiClipboard className="text-lg" />
                        </motion.button>
                      </div>
                      <pre className="text-gray-300 overflow-x-auto p-4 bg-[#1E1E1E] rounded-lg">
                        <code>{API_EXAMPLES[activeExample].code}</code>
                      </pre>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12"
            >
              {[
                {
                  icon: <FiLock className="text-[#EEC71B] text-2xl" />,
                  title: "Droša Integrācija",
                  description: "Modernā autentifikācija un šifrēšana",
                },
                {
                  icon: <FiZap className="text-[#EEC71B] text-2xl" />,
                  title: "Ātra Veiktspēja",
                  description: "Optimizēti endpointi un kešošana",
                },
                {
                  icon: <FiCode className="text-[#EEC71B] text-2xl" />,
                  title: "Vienkārša Lietošana",
                  description: "Detalizēta dokumentācija un piemēri",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    {feature.icon}
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Beta Registration CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-[#3D3B4A] text-white p-8 rounded-xl max-w-2xl mx-auto shadow-xl"
            >
              <h2 className="text-2xl font-bold mb-4">Beta Reģistrācija</h2>
              <p className="mb-6">
                Piesakieties beta versijai, lai pirmie izmēģinātu mūsu API un
                saņemtu īpašus nosacījumus.
              </p>
              <motion.button
                onClick={() => setShowForm(true)}
                className="inline-block bg-[#EEC71B] text-[#3D3B4A] px-6 py-3 rounded-lg font-semibold 
                hover:bg-opacity-90 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Pieteikties Beta Versijai
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Beta Registration Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto relative"
              >
                {/* Form content remains the same */}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Modal */}
        <SuccessModal
          isVisible={showSuccess}
          onClose={() => setShowSuccess(false)}
          userName={formData.contact_name}
        />
      </main>
      <Footer />
    </>
  );
};

export default ApiDocumentation;

// "use client";
// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiCode,
//   FiCpu,
//   FiDatabase,
//   FiLock,
//   FiZap,
//   FiCheck,
//   FiX,
//   FiClipboard,
//   FiTerminal,
// } from "react-icons/fi";
// import { supabase } from "../utils/supabase";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// // Types
// type BetaRegistration = {
//   company_name: string;
//   contact_name: string;
//   email: string;
//   phone: string;
//   company_size: string;
//   estimated_requests: string;
//   use_case: string;
// };

// type ApiExample = {
//   title: string;
//   description: string;
//   code: string;
//   icon: JSX.Element;
//   tags: string[];
// };

// // Constants
// const COMPANY_SIZES = [
//   "1-10 darbinieki",
//   "11-50 darbinieki",
//   "51-200 darbinieki",
//   "201-500 darbinieki",
//   "500+ darbinieki",
// ];

// const REQUEST_VOLUMES = [
//   "Līdz 10,000 mēnesī",
//   "10,000 - 50,000 mēnesī",
//   "50,000 - 200,000 mēnesī",
//   "200,000+ mēnesī",
// ];

// const API_DATA = {
//   future_release: {
//     date: "2025. gada Jūnijā",
//     registration: "Pieejama beta versijas reģistrācija",
//     contact: "api@webworks.lv",
//   },
// };

// const API_EXAMPLES: ApiExample[] = [
//   {
//     title: "SEO & Performance Analysis",
//     description: "Detalizēta vietnes analīze un optimizācijas ieteikumi ar AI",
//     icon: <FiTerminal className="text-[#EEC71B]" />,
//     tags: ["AI", "SEO", "Performance"],
//     code: `
// // Vietnes SEO un veiktspējas analīze
// const response = await fetch('https://api.webworks.lv/v1/analyze', {
//   method: 'POST',
//   headers: {
//     'Authorization': 'Bearer YOUR_API_KEY',
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     url: 'https://example.com',
//     scan_depth: 3,
//     include_seo: true,
//     performance_metrics: true,
//     accessibility_check: true,
//     ai_recommendations: true,
//     competitors: ['competitor1.com', 'competitor2.com']
//   })
// });

// const data = await response.json();
// console.log(data.recommendations);
// // Returns comprehensive analysis with AI-powered recommendations
// `,
//   },
//   {
//     title: "AI Tirgus Analīze",
//     description: "Konkurentu un tirgus analīze ar jaunāko AI tehnoloģiju",
//     icon: <FiCpu className="text-[#EEC71B]" />,
//     tags: ["AI", "Market Research", "Competitor Analysis"],
//     code: `
// // Konkurentu analīze ar AI
// const marketAnalysis = await fetch('https://api.webworks.lv/v1/market-intel', {
//   method: 'POST',
//   headers: {
//     'Authorization': 'Bearer YOUR_API_KEY',
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     industry: 'e-commerce',
//     competitors: ['competitor1.com', 'competitor2.com'],
//     analysis_points: [
//       'pricing_strategy',
//       'marketing_channels',
//       'user_experience',
//       'product_positioning',
//       'market_trends',
//       'customer_sentiment'
//     ],
//     language: 'lv',
//     ai_depth: 'comprehensive'
//   })
// });

// const insights = await marketAnalysis.json();
// // Returns detailed market insights and competitive analysis
// `,
//   },
//   {
//     title: "Mārketinga Automatizācija",
//     description: "Visaptverošs mārketinga automatizācijas API",
//     icon: <FiZap className="text-[#EEC71B]" />,
//     tags: ["Marketing", "Automation", "Analytics"],
//     code: `
// // Automatizēta mārketinga kampaņu vadība
// const campaign = await fetch('https://api.webworks.lv/v1/marketing/campaign', {
//   method: 'POST',
//   headers: {
//     'Authorization': 'Bearer YOUR_API_KEY',
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     campaign_type: 'omnichannel',
//     channels: {
//       email: {
//         template_id: 'welcome_series',
//         audience_segment: 'new_customers',
//         personalization: true
//       },
//       social: {
//         platforms: ['facebook', 'instagram', 'linkedin'],
//         content_type: 'carousel',
//         budget_daily: 50,
//         ai_optimization: true
//       },
//       sms: {
//         template: 'flash_sale',
//         timing: 'business_hours',
//         smart_timing: true
//       }
//     },
//     automation_rules: [
//       {
//         trigger: 'cart_abandoned',
//         action: 'send_reminder',
//         delay: '24h',
//         conditions: {
//           cart_value: '>100',
//           customer_segment: 'repeat'
//         }
//       }
//     ]
//   })
// });

// const campaignStatus = await campaign.json();
// // Returns campaign setup confirmation and initial analytics
// `,
//   },
//   {
//     title: "E-komercijas AI",
//     description: "Pārdošanas optimizācija ar mākslīgo intelektu",
//     icon: <FiDatabase className="text-[#EEC71B]" />,
//     tags: ["E-commerce", "AI", "Optimization"],
//     code: `
// // E-komercijas optimizācijas ieteikumi
// const optimization = await fetch('https://api.webworks.lv/v1/ecommerce/optimize', {
//   method: 'POST',
//   headers: {
//     'Authorization': 'Bearer YOUR_API_KEY',
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     store_url: 'https://yourstore.com',
//     analyze: {
//       pricing: {
//         dynamic_pricing: true,
//         competitor_tracking: true,
//         elasticity_analysis: true
//       },
//       inventory: {
//         stock_prediction: true,
//         seasonal_analysis: true
//       },
//       customer_behavior: {
//         journey_mapping: true,
//         segment_analysis: true
//       }
//     },
//     ml_features: {
//       price_elasticity: true,
//       customer_lifetime_value: true,
//       churn_prediction: true,
//       next_best_action: true
//     },
//     recommendations: {
//       cross_sell: true,
//       upsell: true,
//       bundle_suggestions: true,
//       personalization: true
//     }
//   })
// });

// const optimizationInsights = await optimization.json();
// // Returns AI-powered optimization recommendations
// `,
//   },
//   {
//     title: "Drošības Sistēma",
//     description: "Modernā drošības un krāpšanas novēršanas sistēma",
//     icon: <FiLock className="text-[#EEC71B]" />,
//     tags: ["Security", "Fraud Prevention", "AI"],
//     code: `
// // Transakciju drošības pārbaude
// const security = await fetch('https://api.webworks.lv/v1/security/transaction', {
//   method: 'POST',
//   headers: {
//     'Authorization': 'Bearer YOUR_API_KEY',
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     transaction_id: 'tx_123456',
//     amount: 999.99,
//     currency: 'EUR',
//     customer: {
//       ip: '192.168.1.1',
//       device_fingerprint: 'df_789',
//       location: 'LV',
//       history_score: 85,
//       behavior_metrics: {
//         typing_pattern: 'natural',
//         mouse_movement: 'human-like',
//         session_consistency: true
//       }
//     },
//     risk_checks: {
//       velocity: true,
//       geolocation: true,
//       device_fingerprinting: true,
//       behavioral_analysis: true,
//       pattern_recognition: true,
//       machine_learning: {
//         model: 'fraud_detection_v3',
//         confidence_threshold: 0.95
//       }
//     }
//   })
// });

// const securityVerdict = await security.json();
// // Returns comprehensive security analysis and verdict
// `,
//   },
// ];

// const ApiDocumentation: React.FC = () => {
//   // State management
//   const [formData, setFormData] = useState<BetaRegistration>({
//     company_name: "",
//     contact_name: "",
//     email: "",
//     phone: "",
//     company_size: "",
//     estimated_requests: "",
//     use_case: "",
//   });
//   const [showForm, setShowForm] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [activeExample, setActiveExample] = useState(0);
//   const [submitStatus, setSubmitStatus] = useState<{
//     type: "success" | "error" | null;
//     message: string;
//   }>({ type: null, message: "" });

//   // Form submission handler
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitting(true);
//     setSubmitStatus({ type: null, message: "" });

//     try {
//       const { error } = await supabase
//         .from("beta_registrations")
//         .insert([formData]);

//       if (error) throw error;

//       setSubmitStatus({
//         type: "success",
//         message:
//           "Paldies! Jūsu pieteikums beta versijai ir saņemts. Mēs ar jums sazināsimies tuvākajā laikā.",
//       });
//       setShowForm(false);
//       setFormData({
//         company_name: "",
//         contact_name: "",
//         email: "",
//         phone: "",
//         company_size: "",
//         estimated_requests: "",
//         use_case: "",
//       });
//     } catch (error) {
//       console.error("Registration error:", error);
//       setSubmitStatus({
//         type: "error",
//         message: "Radās kļūda reģistrācijas procesā. Lūdzu, mēģiniet vēlreiz.",
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Copy code helper
//   const handleCopyCode = (code: string) => {
//     navigator.clipboard.writeText(code);
//   };

//   return (
//     <>
//       <Header />
//       <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//         {/* Hero Section */}
//         <section className="py-20 px-4 text-center relative overflow-hidden">
//           <div className="max-w-6xl mx-auto">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="mb-8"
//             >
//               <h1 className="text-4xl md:text-6xl font-bold text-[#3D3B4A] mb-6">
//                 WebWorks API
//                 <span className="block text-lg md:text-xl text-[#EEC71B] mt-4">
//                   Drīzumā pieejams
//                 </span>
//               </h1>
//               <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
//                 Mūsu jaudīgais API ļaus jums integrēt WebWorks pakalpojumus savā
//                 platformā. Pašlaik notiek aktīva izstrāde, un mēs gaidām beta
//                 versijas izlaišanu {API_DATA.future_release.date}.
//               </p>
//             </motion.div>

//             {/* API Examples Section */}
//             <div className="mb-16">
//               <div className="bg-[#2C2A35] rounded-xl p-6 lg:p-8 overflow-hidden max-w-4xl mx-auto shadow-xl">
//                 {/* Example Navigation */}
//                 <div className="flex flex-wrap gap-2 mb-6">
//                   {API_EXAMPLES.map((example, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setActiveExample(index)}
//                       className={`px-4 py-2 rounded-lg text-sm md:text-base flex items-center gap-2 transition-all duration-300 ${
//                         activeExample === index
//                           ? "bg-[#EEC71B] text-[#2C2A35] shadow-lg transform scale-105"
//                           : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:transform hover:scale-102"
//                       }`}
//                     >
//                       {example.icon}
//                       {example.title}
//                     </button>
//                   ))}
//                 </div>

//                 {/* Example Content */}
//                 <AnimatePresence mode="wait">
//                   <motion.div
//                     key={activeExample}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     {/* Example Header */}
//                     <div className="mb-6">
//                       <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4 mb-4">
//                         <div>
//                           <h3 className="text-xl md:text-2xl text-white font-bold mb-2">
//                             {API_EXAMPLES[activeExample].title}
//                           </h3>
//                           <p className="text-gray-300">
//                             {API_EXAMPLES[activeExample].description}
//                           </p>
//                         </div>
//                         <div className="flex gap-2">
//                           {API_EXAMPLES[activeExample].tags.map(
//                             (tag, index) => (
//                               <span
//                                 key={index}
//                                 className="px-2 py-1 bg-gray-700 text-gray-300 rounded-md text-sm"
//                               >
//                                 {tag}
//                               </span>
//                             )
//                           )}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Code Display */}
//                     <div className="relative">
//                       <div className="flex items-center justify-between mb-4">
//                         <div className="flex space-x-2">
//                           <div className="w-3 h-3 rounded-full bg-red-500" />
//                           <div className="w-3 h-3 rounded-full bg-yellow-500" />
//                           <div className="w-3 h-3 rounded-full bg-green-500" />
//                         </div>
//                         <button
//                           onClick={() =>
//                             handleCopyCode(API_EXAMPLES[activeExample].code)
//                           }
//                           className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-700"
//                         >
//                           <FiClipboard className="text-lg" />
//                         </button>
//                       </div>
//                       <pre className="text-gray-300 overflow-x-auto p-4 bg-gray-800 rounded-lg">
//                         <code>{API_EXAMPLES[activeExample].code}</code>
//                       </pre>
//                     </div>
//                   </motion.div>
//                 </AnimatePresence>
//               </div>
//             </div>

//             {/* Features Grid */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12"
//             >
//               {[
//                 {
//                   icon: <FiLock className="text-[#EEC71B] text-2xl" />,
//                   title: "Droša Integrācija",
//                   description: "Modernā autentifikācija un šifrēšana",
//                 },
//                 {
//                   icon: <FiZap className="text-[#EEC71B] text-2xl" />,
//                   title: "Ātra Veiktspēja",
//                   description: "Optimizēti endpointi un kešošana",
//                 },
//                 {
//                   icon: <FiCode className="text-[#EEC71B] text-2xl" />,
//                   title: "Vienkārša Lietošana",
//                   description: "Detalizēta dokumentācija un piemēri",
//                 },
//               ].map((feature, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.2 + index * 0.1 }}
//                   className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
//                 >
//                   <div className="flex items-center gap-4 mb-4">
//                     {feature.icon}
//                     <h3 className="text-xl font-semibold">{feature.title}</h3>
//                   </div>
//                   <p className="text-gray-600">{feature.description}</p>
//                 </motion.div>
//               ))}
//             </motion.div>

//             {/* Beta Registration CTA */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5 }}
//               className="bg-[#3D3B4A] text-white p-8 rounded-xl max-w-2xl mx-auto shadow-xl"
//             >
//               <h2 className="text-2xl font-bold mb-4">Beta Reģistrācija</h2>
//               <p className="mb-6">
//                 Piesakieties beta versijai, lai pirmie izmēģinātu mūsu API un
//                 saņemtu īpašus nosacījumus.
//               </p>
//               <button
//                 onClick={() => setShowForm(true)}
//                 className="inline-block bg-[#EEC71B] text-[#3D3B4A] px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 hover:transform hover:scale-105"
//               >
//                 Pieteikties Beta Versijai
//               </button>
//             </motion.div>
//           </div>
//         </section>

//         {/* Beta Registration Modal */}
//         <AnimatePresence>
//           {showForm && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto relative"
//               >
//                 <button
//                   onClick={() => setShowForm(false)}
//                   className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
//                 >
//                   <FiX className="text-xl" />
//                 </button>

//                 <h3 className="text-2xl font-bold text-[#3D3B4A] mb-6">
//                   Beta Versijas Pieteikums
//                 </h3>

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Uzņēmuma nosaukums
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.company_name}
//                       onChange={(e) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           company_name: e.target.value,
//                         }))
//                       }
//                       className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#EEC71B] focus:border-transparent"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Kontaktpersonas vārds
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.contact_name}
//                       onChange={(e) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           contact_name: e.target.value,
//                         }))
//                       }
//                       className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#EEC71B] focus:border-transparent"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       E-pasts
//                     </label>
//                     <input
//                       type="email"
//                       value={formData.email}
//                       onChange={(e) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           email: e.target.value,
//                         }))
//                       }
//                       className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#EEC71B] focus:border-transparent"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Tālrunis
//                     </label>
//                     <input
//                       type="tel"
//                       value={formData.phone}
//                       onChange={(e) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           phone: e.target.value,
//                         }))
//                       }
//                       className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#EEC71B] focus:border-transparent"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Uzņēmuma lielums
//                     </label>
//                     <select
//                       value={formData.company_size}
//                       onChange={(e) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           company_size: e.target.value,
//                         }))
//                       }
//                       className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#EEC71B] focus:border-transparent"
//                       required
//                     >
//                       <option value="">Izvēlieties</option>
//                       {COMPANY_SIZES.map((size) => (
//                         <option key={size} value={size}>
//                           {size}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Plānotais pieprasījumu skaits
//                     </label>
//                     <select
//                       value={formData.estimated_requests}
//                       onChange={(e) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           estimated_requests: e.target.value,
//                         }))
//                       }
//                       className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#EEC71B] focus:border-transparent"
//                       required
//                     >
//                       <option value="">Izvēlieties</option>
//                       {REQUEST_VOLUMES.map((volume) => (
//                         <option key={volume} value={volume}>
//                           {volume}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Lietošanas scenārijs
//                     </label>
//                     <textarea
//                       value={formData.use_case}
//                       onChange={(e) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           use_case: e.target.value,
//                         }))
//                       }
//                       className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#EEC71B] focus:border-transparent"
//                       rows={4}
//                       required
//                       placeholder="Aprakstiet, kā plānojat izmantot API..."
//                     />
//                   </div>

//                   {submitStatus.type && (
//                     <div
//                       className={`p-4 rounded-lg ${
//                         submitStatus.type === "success"
//                           ? "bg-green-100 text-green-800"
//                           : "bg-red-100 text-red-800"
//                       }`}
//                     >
//                       {submitStatus.message}
//                     </div>
//                   )}

//                   <div className="flex justify-end space-x-4 pt-4">
//                     <button
//                       type="button"
//                       onClick={() => setShowForm(false)}
//                       className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
//                     >
//                       Atcelt
//                     </button>
//                     <button
//                       type="submit"
//                       disabled={submitting}
//                       className={`px-6 py-2 bg-[#EEC71B] text-[#3D3B4A] rounded-lg font-semibold
//                           hover:bg-opacity-90 transition-all duration-300 ${
//                             submitting
//                               ? "opacity-50 cursor-not-allowed"
//                               : "hover:transform hover:scale-105"
//                           }`}
//                     >
//                       {submitting ? "Nosūta..." : "Pieteikties Beta Versijai"}
//                     </button>
//                   </div>
//                 </form>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </main>
//       <Footer />
//     </>
//   );
// };

// export default ApiDocumentation;
