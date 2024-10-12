"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCopy,
  FiRefreshCw,
  FiSave,
  FiAlertCircle,
  FiCheckCircle,
  FiCode,
  FiSearch,
  FiTag,
  FiEye,
} from "react-icons/fi";
import axios from "axios";
import Header from "../../components/Header";

interface MetaData {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  og: {
    title: string;
    description: string;
    image: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
  };
}

interface SEOAnalysis {
  titleScore: number;
  descriptionScore: number;
  suggestions: string[];
}

interface SavedAnalysis {
  url: string;
  metaData: MetaData;
  seoAnalysis: SEOAnalysis;
  timestamp: string;
}

interface AlertProps {
  children: React.ReactNode;
  variant?: "default" | "destructive";
}

interface AlertTitleProps {
  children: React.ReactNode;
}

interface AlertDescriptionProps {
  children: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({ children, variant = "default" }) => {
  const bgColor = variant === "destructive" ? "bg-red-100" : "bg-blue-100";
  return <div className={`p-4 rounded-md ${bgColor}`}>{children}</div>;
};

const AlertTitle: React.FC<AlertTitleProps> = ({ children }) => (
  <h5 className="font-medium mb-1">{children}</h5>
);

const AlertDescription: React.FC<AlertDescriptionProps> = ({ children }) => (
  <p className="text-sm">{children}</p>
);

interface MetaTagSectionProps {
  title: string;
  content: string;
  onCopy: (content: string) => void;
}

const MetaTagSection: React.FC<MetaTagSectionProps> = ({
  title,
  content,
  onCopy,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="mb-4"
  >
    <h3 className="text-lg font-semibold mb-2 flex items-center">
      <FiTag className="mr-2" />
      {title}
    </h3>
    <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
      <p className="mr-2 break-all">{content || "Nav definēts"}</p>
      <button
        onClick={() => onCopy(content)}
        className="text-indigo-600 hover:text-indigo-800 flex-shrink-0 transition-colors duration-200"
      >
        <FiCopy />
      </button>
    </div>
  </motion.div>
);

interface ScoreBarProps {
  score: number;
  label: string;
}

const ScoreBar: React.FC<ScoreBarProps> = ({ score, label }) => (
  <div className="mb-2">
    <div className="flex justify-between mb-1">
      <span>{label}</span>
      <span>{score}/100</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${score}%` }}
        transition={{ duration: 0.5 }}
        className={`h-2.5 rounded-full ${
          score >= 70
            ? "bg-green-600"
            : score >= 40
            ? "bg-yellow-400"
            : "bg-red-600"
        }`}
      ></motion.div>
    </div>
  </div>
);

const MetaTagCreator: React.FC = () => {
  const [url, setUrl] = useState<string>("");
  const [metaData, setMetaData] = useState<MetaData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAnalyses, setSavedAnalyses] = useState<SavedAnalysis[]>([]);
  const [seoAnalysis, setSeoAnalysis] = useState<SEOAnalysis | null>(null);
  const [previewMode, setPreviewMode] = useState<boolean>(false);

  useEffect(() => {
    const savedAnalysesFromStorage = localStorage.getItem("savedSEOAnalyses");
    if (savedAnalysesFromStorage) {
      setSavedAnalyses(JSON.parse(savedAnalysesFromStorage));
    }
  }, []);

  const analyzeWebsite = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<MetaData>(
        `/api/fetch-meta-tags?url=${encodeURIComponent(url)}`
      );
      setMetaData(response.data);
      analyzeSEO(response.data);
    } catch (err) {
      console.error("Kļūda analizējot vietni:", err);
      setError(
        "Neizdevās analizēt vietni. Lūdzu, pārbaudiet URL un mēģiniet vēlreiz."
      );
    } finally {
      setLoading(false);
    }
  };

  const analyzeSEO = (data: MetaData): void => {
    const titleLength = data.title ? data.title.length : 0;
    const descriptionLength = data.description ? data.description.length : 0;
    const analysis: SEOAnalysis = {
      titleScore: titleLength >= 50 && titleLength <= 60 ? 100 : 50,
      descriptionScore:
        descriptionLength >= 150 && descriptionLength <= 160 ? 100 : 50,
      suggestions: [],
    };

    if (titleLength < 50)
      analysis.suggestions.push(
        "Virsraksts ir pārāk īss. Ieteicamais garums ir 50-60 rakstzīmes."
      );
    if (titleLength > 60)
      analysis.suggestions.push(
        "Virsraksts ir pārāk garš. Ieteicamais garums ir 50-60 rakstzīmes."
      );
    if (descriptionLength < 150)
      analysis.suggestions.push(
        "Apraksts ir pārāk īss. Ieteicamais garums ir 150-160 rakstzīmes."
      );
    if (descriptionLength > 160)
      analysis.suggestions.push(
        "Apraksts ir pārāk garš. Ieteicamais garums ir 150-160 rakstzīmes."
      );

    setSeoAnalysis(analysis);
  };

  const saveAnalysis = (): void => {
    if (metaData && seoAnalysis) {
      const newAnalysis: SavedAnalysis = {
        url,
        metaData,
        seoAnalysis,
        timestamp: new Date().toISOString(),
      };
      const updatedAnalyses = [...savedAnalyses, newAnalysis];
      setSavedAnalyses(updatedAnalyses);
      localStorage.setItem("savedSEOAnalyses", JSON.stringify(updatedAnalyses));
    }
  };

  const copyToClipboard = (text: string): void => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <Head>
        <title>SEO un Meta Tagu Optimizācijas Rīks</title>
        <meta
          name="description"
          content="Izmantojiet mūsu SEO un meta tagu optimizācijas rīku, lai analizētu un uzlabotu savu tīmekļa vietņu veiktspēju."
        />
        <meta
          name="keywords"
          content="SEO, meta tagi, tīmekļa optimizācija, satura analīze"
        />
        <link
          rel="canonical"
          href="https://jūsu-vietne.lv/seo-optimization-tool"
        />
      </Head>
      <Header />
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold text-gray-900 text-center mb-8"
        >
          SEO un Meta Tagu Optimizācijas Rīks
        </motion.h1>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="px-4 py-5 sm:p-6">
            <div className="mb-4">
              <label
                htmlFor="url"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Ievadiet tīmekļa vietnes URL
              </label>
              <div className="flex">
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUrl(e.target.value)
                  }
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="https://www.piemers.lv"
                />
                <button
                  onClick={analyzeWebsite}
                  disabled={loading}
                  className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {loading ? (
                    <FiRefreshCw className="animate-spin" />
                  ) : (
                    <FiSearch />
                  )}
                  <span className="ml-2">
                    {loading ? "Analizē..." : "Analizēt"}
                  </span>
                </button>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Kļūda!</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <AnimatePresence>
              {metaData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-8"
                >
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <FiCode className="mr-2" />
                    Vietnes Analīze
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3 flex items-center">
                        <FiTag className="mr-2" />
                        Meta Tagi
                      </h3>
                      <MetaTagSection
                        title="Tīmekļa lapas nosaukums"
                        content={metaData.title}
                        onCopy={() => copyToClipboard(metaData.title)}
                      />
                      <MetaTagSection
                        title="Meta apraksts"
                        content={metaData.description}
                        onCopy={() => copyToClipboard(metaData.description)}
                      />
                      <MetaTagSection
                        title="Atslēgvārdi"
                        content={metaData.keywords}
                        onCopy={() => copyToClipboard(metaData.keywords)}
                      />
                      <MetaTagSection
                        title="Kanoniskā saite"
                        content={metaData.canonical}
                        onCopy={() => copyToClipboard(metaData.canonical)}
                      />
                    </div>

                    {seoAnalysis && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h3 className="text-xl font-semibold mb-3 flex items-center">
                          <FiCheckCircle className="mr-2" />
                          SEO Analīze
                        </h3>
                        <ScoreBar
                          score={seoAnalysis.titleScore}
                          label="Virsraksta optimizācija"
                        />
                        <ScoreBar
                          score={seoAnalysis.descriptionScore}
                          label="Apraksta optimizācija"
                        />

                        <h4 className="font-medium mt-4 mb-2">
                          Ieteikumi uzlabojumiem:
                        </h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {seoAnalysis.suggestions.map((suggestion, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="text-sm text-gray-700"
                            >
                              {suggestion}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}

                    <div>
                      <h3 className="text-xl font-semibold mb-3 flex items-center">
                        <FiTag className="mr-2" />
                        Open Graph Dati
                      </h3>
                      <MetaTagSection
                        title="OG Nosaukums"
                        content={metaData.og.title}
                        onCopy={() => copyToClipboard(metaData.og.title)}
                      />
                      <MetaTagSection
                        title="OG Apraksts"
                        content={metaData.og.description}
                        onCopy={() => copyToClipboard(metaData.og.description)}
                      />
                      <MetaTagSection
                        title="OG Attēls"
                        content={metaData.og.image}
                        onCopy={() => copyToClipboard(metaData.og.image)}
                      />
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3 flex items-center">
                        <FiTag className="mr-2" />
                        Twitter Card Dati
                      </h3>
                      <MetaTagSection
                        title="Twitter Karte"
                        content={metaData.twitter.card}
                        onCopy={() => copyToClipboard(metaData.twitter.card)}
                      />
                      <MetaTagSection
                        title="Twitter Nosaukums"
                        content={metaData.twitter.title}
                        onCopy={() => copyToClipboard(metaData.twitter.title)}
                      />
                      <MetaTagSection
                        title="Twitter Apraksts"
                        content={metaData.twitter.description}
                        onCopy={() =>
                          copyToClipboard(metaData.twitter.description)
                        }
                      />
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      onClick={saveAnalysis}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                    >
                      <FiSave className="mr-2" />
                      Saglabāt Analīzes Rezultātus
                    </button>
                    <button
                      onClick={() => setPreviewMode(!previewMode)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                    >
                      <FiEye className="mr-2" />
                      {previewMode
                        ? "Slēpt Priekšskatījumu"
                        : "Rādīt Priekšskatījumu"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {previewMode && metaData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8 border-t pt-8"
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FiEye className="mr-2" />
                  Meta Tagu Priekšskatījums
                </h3>
                <div className="bg-gray-100 p-4 rounded-md">
                  <div className="text-blue-600 text-xl mb-2 hover:underline cursor-pointer">
                    {metaData.title}
                  </div>
                  <div className="text-green-700 text-sm mb-2">{url}</div>
                  <div className="text-gray-600">{metaData.description}</div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {savedAnalyses.length > 0 && (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-8">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <FiSave className="mr-2" />
                Saglabātie Analīzes Rezultāti
              </h2>
              <div className="space-y-4">
                {savedAnalyses.map((analysis, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-gray-100 rounded-md hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold">
                        URL: {analysis.url}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {new Date(analysis.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="mb-2">
                      <span className="font-medium">Nosaukums:</span>{" "}
                      {analysis.metaData.title}
                    </p>
                    <p>
                      <span className="font-medium">Apraksts:</span>{" "}
                      {analysis.metaData.description}
                    </p>
                    <button
                      onClick={() => {
                        setUrl(analysis.url);
                        setMetaData(analysis.metaData);
                        setSeoAnalysis(analysis.seoAnalysis);
                      }}
                      className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                    >
                      <FiRefreshCw className="mr-2" />
                      Ielādēt analīzi
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <FiAlertCircle className="mr-2" />
              SEO Labās Prakses
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                Izveidojiet unikālus un aprakstošus meta tagus katrai lapai.
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Optimizējiet URL struktūru, izmantojot atslēgvārdus un saprotamu
                hierarhiju.
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Nodrošiniet, ka jūsu vietne ir mobilajām ierīcēm draudzīga un
                ātri ielādējas.
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                Izmantojiet strukturētos datus (schema.org), lai uzlabotu
                bagātinātos rezultātus.
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                Regulāri atjauniniet un uzlabojiet vietnes saturu,
                koncentrējoties uz kvalitāti un lietotāju nodomiem.
              </motion.li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MetaTagCreator;
