import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiZap,
  FiUsers,
  FiShield,
  FiGlobe,
  FiCloud,
  FiCode,
  FiCheck,
  IconType,
} from "react-icons/fi";

interface Approach {
  icon: React.ReactElement<IconType>;
  title: string;
  description: string;
  features: string[];
}

const ApproachCard: React.FC<Approach & { index: number }> = React.memo(
  ({ icon, title, description, features, index }) => (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="flex items-center mb-4">
        {React.cloneElement(icon, { className: "text-4xl text-[#EEC71B]" })}
        <h3 className="text-xl font-bold ml-2 text-[#3D3B4A]">{title}</h3>
      </div>
      <p className="text-gray-700 mb-4">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, featureIndex) => (
          <li key={featureIndex} className="flex items-center text-sm">
            <FiCheck className="text-[#EEC71B] mr-2 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#EEC71B] opacity-10 rounded-full" />
    </motion.div>
  )
);

ApproachCard.displayName = "ApproachCard";

const OurInnovativeApproachesSection: React.FC = () => {
  const approaches: Approach[] = useMemo(
    () => [
      {
        icon: <FiZap />,
        title: "Veiktspējas Optimizācija",
        description: "Nodrošinām ārkārtīgi ātru vietnes ielādi un darbību.",
        features: [
          "Serveru puses renderēšana ar Next.js",
          "Koda sadalīšana un lēnā ielāde",
          "CDN integrācija globālai piegādei",
          "Datubāzu indeksēšana un kešošana",
        ],
      },
      {
        icon: <FiUsers />,
        title: "Lietotāju Pieredzes Dizains",
        description: "Veidojam intuitīvas un piesaistošas lietotāju saskarnes.",
        features: [
          "Lietotāju ceļojumu kartēšana un optimizācija",
          "A/B testēšana ar Google Optimize",
          "Pieejamības standartu (WCAG) ieviešana",
          "Mobilā dizaina prioritizēšana",
        ],
      },
      {
        icon: <FiShield />,
        title: "Uzlabota Drošība",
        description: "Izmantojam modernākos drošības protokolus un prakses.",
        features: [
          "SSL/TLS šifrēšana visai datu pārraidei",
          "Daudzfaktoru autentifikācijas ieviešana",
          "Regulāri drošības auditi un ievainojamību novēršana",
          "OWASP vadlīniju ievērošana",
        ],
      },
      {
        icon: <FiGlobe />,
        title: "Globāla Mērogojamība",
        description: "Mūsu risinājumi ir gatavi starptautiskai izaugsmei.",
        features: [
          "Mikroservisu arhitektūra elastīgai mērogošanai",
          "Daudzvalodu un lokalizācijas atbalsts",
          "Datu replikācija starp ģeogrāfiskiem reģioniem",
          "Elastīga mākoņa infrastruktūra ar auto-scaling",
        ],
      },
      {
        icon: <FiCloud />,
        title: "Mākoņa Tehnoloģiju Integrācija",
        description: "Izmantojam jaunākās mākoņa tehnoloģijas efektivitātei.",
        features: [
          "Serverless funkcijas ar AWS Lambda",
          "Konteineru orkestrācija ar Kubernetes",
          "Mākoņa datu glabātuves ar S3 un CloudFront",
          "Reāllaika datu apstrāde ar Apache Kafka",
        ],
      },
      {
        icon: <FiCode />,
        title: "Moderna Izstrādes Prakse",
        description: "Sekojam nozares labākajām praksēm un standartiem.",
        features: [
          "Agile un Scrum metodoloģiju izmantošana",
          "Nepārtraukta integrācija un piegāde (CI/CD)",
          "Koda kvalitātes uzturēšana ar automated testing",
          "Open-source tehnoloģiju un bibliotēku izmantošana",
        ],
      },
    ],
    []
  );

  return (
    <section className="relative pt-5 mt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-web-pattern rounded-t-xl"></div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="title-highlight text-4xl sm:text-5xl font-bold text-[#3D3B4A] mb-16 text-center relative inline-block left-1/2 transform -translate-x-1/2">
          Mūsu Pieeja
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {approaches.map((approach, index) => (
              <ApproachCard key={index} {...approach} index={index} />
            ))}
          </AnimatePresence>
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
          padding: 0.5em 2em;
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
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #eec71b;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d4b017;
        }
      `}</style>
    </section>
  );
};

export default OurInnovativeApproachesSection;
