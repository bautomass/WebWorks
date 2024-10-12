"use client";

"use client";

import React, { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import Header from "../../components/Header";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  FiCheck,
  FiAlertTriangle,
  FiSave,
  FiTrash2,
  FiMail,
  FiUser,
  FiGlobe,
  FiCheckCircle,
  FiXCircle,
  FiServer,
  FiPackage,
  FiUserCheck,
  FiDollarSign,
  FiStar,
  FiHelpCircle,
  FiAlertCircle,
  FiInbox,
  FiSettings,
  FiList,
} from "react-icons/fi";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EmailValidationResult {
  can_connect_smtp: boolean;
  did_you_mean: string;
  domain: string;
  email: string;
  free: boolean;
  is_catch_all: boolean;
  is_deliverable: boolean;
  is_disabled: string;
  is_disposable: boolean;
  is_inbox_full: string;
  is_role_account: boolean;
  mx_records: boolean;
  score: number;
  syntax_valid: boolean;
  user: string;
}

const EmailValidator: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [result, setResult] = useState<EmailValidationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showTips, setShowTips] = useState<boolean>(false);
  const [blacklist, setBlacklist] = useState<string[]>([]);
  const [showBlacklist, setShowBlacklist] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [bulkEmails, setBulkEmails] = useState<string>("");
  const [bulkResults, setBulkResults] = useState<EmailValidationResult[]>([]);
  const [activeTab, setActiveTab] = useState<"single" | "bulk">("single");

  useEffect(() => {
    const storedSearches = localStorage.getItem("recentEmailSearches");
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
    const storedBlacklist = localStorage.getItem("emailBlacklist");
    if (storedBlacklist) {
      setBlacklist(JSON.parse(storedBlacklist));
    }
    setApiKey(process.env.NEXT_PUBLIC_APILAYER_API_KEY || null);
  }, []);

  const validateEmail = useCallback(
    async (emailToValidate: string): Promise<EmailValidationResult | null> => {
      if (!emailToValidate) {
        setError("Lūdzu, ievadiet e-pasta adresi.");
        return null;
      }
      if (!apiKey) {
        setError(
          "API atslēga nav konfigurēta. Lūdzu, pārbaudiet vides mainīgos."
        );
        return null;
      }
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.apilayer.com/email_verification/${encodeURIComponent(
            emailToValidate
          )}`,
          {
            method: "GET",
            headers: {
              apikey: apiKey,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `API pieprasījums neizdevās ar statusu ${response.status}`
          );
        }

        const data = await response.json();
        updateRecentSearches(emailToValidate);
        if (data.score > 0.8) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
        return data as EmailValidationResult;
      } catch (error) {
        console.error("Kļūda e-pasta validācijā:", error);
        setError(
          "Radās kļūda e-pasta validācijas laikā. Lūdzu, mēģiniet vēlreiz vēlāk."
        );
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [apiKey]
  );

  const handleSingleValidation = async () => {
    const result = await validateEmail(email);
    if (result) {
      setResult(result);
    }
  };

  const handleBulkValidation = async () => {
    const emails = bulkEmails
      .split("\n")
      .filter((email) => email.trim() !== "");
    const results = [];
    for (const email of emails) {
      const result = await validateEmail(email);
      if (result) {
        results.push(result);
      }
    }
    setBulkResults(results);
  };

  const updateRecentSearches = (newEmail: string) => {
    const updatedSearches = [
      newEmail,
      ...recentSearches.filter((e) => e !== newEmail),
    ].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem(
      "recentEmailSearches",
      JSON.stringify(updatedSearches)
    );
  };

  const addToBlacklist = (emailToBlacklist: string) => {
    if (!blacklist.includes(emailToBlacklist)) {
      const updatedBlacklist = [...blacklist, emailToBlacklist];
      setBlacklist(updatedBlacklist);
      localStorage.setItem("emailBlacklist", JSON.stringify(updatedBlacklist));
    }
  };

  const removeFromBlacklist = (emailToRemove: string) => {
    const updatedBlacklist = blacklist.filter((e) => e !== emailToRemove);
    setBlacklist(updatedBlacklist);
    localStorage.setItem("emailBlacklist", JSON.stringify(updatedBlacklist));
  };

  const ResultCard = ({
    title,
    value,
    icon,
  }: {
    title: string;
    value: boolean | string | number;
    icon: React.ReactNode;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
    >
      <div className="flex items-center">
        <div className="text-indigo-500 mr-3">{icon}</div>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {typeof value === "boolean"
              ? value
                ? "Jā"
                : "Nē"
              : typeof value === "number"
              ? value.toFixed(2)
              : value}
          </p>
        </div>
      </div>
      {typeof value === "boolean" && (
        <div
          className={`flex-shrink-0 ${
            value ? "text-green-500" : "text-red-500"
          }`}
        >
          {value ? <FiCheckCircle size={24} /> : <FiXCircle size={24} />}
        </div>
      )}
    </motion.div>
  );

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
        <Head>
          <title>E-pasta Validācijas Rīks</title>
          <meta
            name="description"
            content="Pārbaudiet e-pasta adrešu derīgumu, formātu un kvalitāti ar mūsu uzlaboto e-pasta validācijas rīku."
          />
          <meta
            name="keywords"
            content="e-pasta validācija, e-pasta pārbaude, e-pasta verifikācija, SMTP pārbaude"
          />
          <link rel="canonical" href="https://jūsu-vietne.lv/email-validator" />
        </Head>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold text-gray-900 text-center mb-8"
          >
            E-pasta Validācijas Rīks
          </motion.h1>
          <p className="text-xl text-gray-600 text-center mb-8">
            Pārbaudiet e-pasta adrešu derīgumu, formātu un kvalitāti.
          </p>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex space-x-4 mb-6">
                <button
                  className={`px-4 py-2 rounded-full ${
                    activeTab === "single"
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  } transition-colors duration-200`}
                  onClick={() => setActiveTab("single")}
                >
                  <FiMail className="inline-block mr-2" />
                  Viena E-pasta Pārbaude
                </button>
                <button
                  className={`px-4 py-2 rounded-full ${
                    activeTab === "bulk"
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  } transition-colors duration-200`}
                  onClick={() => setActiveTab("bulk")}
                >
                  <FiList className="inline-block mr-2" />
                  Vairāku E-pastu Pārbaude
                </button>
              </div>

              {activeTab === "single" ? (
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    E-pasta adrese
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="ievadiet@epasts.lv"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={handleSingleValidation}
                      disabled={isLoading}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                    >
                      {isLoading ? "Pārbauda..." : "Validēt"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mb-4">
                  <label
                    htmlFor="bulkEmails"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Vairāku e-pastu validācija (viens e-pasts katrā rindā)
                  </label>
                  <textarea
                    id="bulkEmails"
                    name="bulkEmails"
                    rows={4}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={bulkEmails}
                    onChange={(e) => setBulkEmails(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={handleBulkValidation}
                    disabled={isLoading}
                    className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                  >
                    Validēt Vairākus E-pastus
                  </button>
                </div>
              )}

              {recentSearches.length > 0 && activeTab === "single" && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Nesenie meklējumi:
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => setEmail(search)}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition duration-150 ease-in-out"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Alert variant="destructive">
                      <FiAlertTriangle className="h-4 w-4" />
                      <AlertTitle>Kļūda!</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {result && activeTab === "single" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="mt-6"
                  >
                    <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Validācijas Rezultāti
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <ResultCard
                        title="E-pasts"
                        value={result.email}
                        icon={<FiMail size={24} />}
                      />
                      <ResultCard
                        title="Lietotājs"
                        value={result.user}
                        icon={<FiUser size={24} />}
                      />
                      <ResultCard
                        title="Domēns"
                        value={result.domain}
                        icon={<FiGlobe size={24} />}
                      />
                      <ResultCard
                        title="Derīgs Formāts"
                        value={result.syntax_valid}
                        icon={<FiCheckCircle size={24} />}
                      />
                      <ResultCard
                        title="MX Ieraksti Atrasti"
                        value={result.mx_records}
                        icon={<FiServer size={24} />}
                      />
                      <ResultCard
                        title="SMTP Savienojums"
                        value={result.can_connect_smtp}
                        icon={<FiPackage size={24} />}
                      />
                      <ResultCard
                        title="Ir Piegādājams"
                        value={result.is_deliverable}
                        icon={<FiCheckCircle size={24} />}
                      />
                      <ResultCard
                        title="Catch-all"
                        value={result.is_catch_all}
                        icon={<FiInbox size={24} />}
                      />
                      <ResultCard
                        title="Lomas Konts"
                        value={result.is_role_account}
                        icon={<FiUserCheck size={24} />}
                      />
                      <ResultCard
                        title="Vienreizējs"
                        value={result.is_disposable}
                        icon={<FiTrash2 size={24} />}
                      />
                      <ResultCard
                        title="Bezmaksas Pakalpojums"
                        value={result.free}
                        icon={<FiDollarSign size={24} />}
                      />
                      <ResultCard
                        title="Kvalitātes Vērtējums"
                        value={result.score}
                        icon={<FiStar size={24} />}
                      />
                      {result.did_you_mean && (
                        <ResultCard
                          title="Vai jūs domājāt"
                          value={result.did_you_mean}
                          icon={<FiHelpCircle size={24} />}
                        />
                      )}
                      {result.is_disabled && (
                        <ResultCard
                          title="Ir Atspējots"
                          value={result.is_disabled}
                          icon={<FiAlertCircle size={24} />}
                        />
                      )}
                      {result.is_inbox_full && (
                        <ResultCard
                          title="Pastkaste Pilna"
                          value={result.is_inbox_full}
                          icon={<FiInbox size={24} />}
                        />
                      )}
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => addToBlacklist(result.email)}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                          >
                            <FiSave className="mr-2" /> Pievienot Melnajam
                            Sarakstam
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Pievienot melnajam sarakstam</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {bulkResults.length > 0 && activeTab === "bulk" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="mt-8"
                  >
                    <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Vairāku E-pastu Validācijas Rezultāti
                    </h2>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              E-pasts
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Derīgs Formāts
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Piegādājams
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Kvalitātes Vērtējums
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Darbības
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {bulkResults.map((result, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {result.email}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {result.syntax_valid ? (
                                  <FiCheckCircle className="text-green-500" />
                                ) : (
                                  <FiXCircle className="text-red-500" />
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {result.is_deliverable ? (
                                  <FiCheckCircle className="text-green-500" />
                                ) : (
                                  <FiXCircle className="text-red-500" />
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {result.score.toFixed(2)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <button
                                      onClick={() =>
                                        addToBlacklist(result.email)
                                      }
                                      className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                    >
                                      <FiSave />
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Pievienot melnajam sarakstam</p>
                                  </TooltipContent>
                                </Tooltip>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setShowTips(!showTips)}
              className="text-indigo-600 hover:text-indigo-800 transition duration-150 ease-in-out flex items-center"
            >
              <FiHelpCircle className="mr-2" />
              {showTips
                ? "Paslēpt Padomus"
                : "Rādīt E-pasta Validācijas Padomus"}
            </button>
            <button
              onClick={() => setShowBlacklist(!showBlacklist)}
              className="text-indigo-600 hover:text-indigo-800 transition duration-150 ease-in-out flex items-center"
            >
              <FiSettings className="mr-2" />
              {showBlacklist
                ? "Paslēpt Melno Sarakstu"
                : "Rādīt Melno Sarakstu"}
            </button>
          </div>

          <AnimatePresence>
            {showTips && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-blue-50 p-4 rounded-md mb-4"
              >
                <h3 className="text-lg font-medium text-blue-900 mb-2">
                  Padomi Efektīvai E-pasta Validācijai:
                </h3>
                <ul className="list-disc pl-5 text-blue-800">
                  <li>
                    Pārliecinieties, ka e-pasta formāts ir pareizs (piemēram,
                    lietotajs@domens.lv).
                  </li>
                  <li>Pārbaudiet, vai domēnam ir derīgi MX ieraksti.</li>
                  <li>
                    Izvairieties no vienreizējām e-pasta adresēm, jo tās bieži
                    tiek izmantotas surogātpastam.
                  </li>
                  <li>
                    Ņemiet vērā e-pasta kvalitātes vērtējumu - augstāki
                    vērtējumi norāda uz labāku uzticamību.
                  </li>
                  <li>
                    Regulāri tīriet savu e-pastu sarakstu, lai uzlabotu piegādes
                    rādītājus.
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showBlacklist && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-50 p-4 rounded-md"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Melnais Saraksts:
                </h3>
                {blacklist.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {blacklist.map((blockedEmail, index) => (
                      <li
                        key={index}
                        className="py-2 flex justify-between items-center"
                      >
                        <span>{blockedEmail}</span>
                        <button
                          onClick={() => removeFromBlacklist(blockedEmail)}
                          className="text-red-600 hover:text-red-800 transition duration-150 ease-in-out"
                        >
                          <FiTrash2 />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Melnais saraksts ir tukšs.</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </TooltipProvider>
  );
};
export default EmailValidator;
// "use client";

// import React, { useState, useEffect } from "react";
// import Header from "../../components/Header";
// import { motion, AnimatePresence } from "framer-motion";
// import confetti from "canvas-confetti";
// import {
//   FiCheck,
//   FiAlertTriangle,
//   FiSave,
//   FiTrash2,
//   FiMail,
//   FiUser,
//   FiGlobe,
//   FiCheckCircle,
//   FiXCircle,
//   FiServer,
//   FiPackage,
//   FiUserCheck,
//   FiDollarSign,
//   FiStar,
//   FiHelpCircle,
//   FiAlertCircle,
//   FiInbox,
// } from "react-icons/fi";

// interface EmailValidationResult {
//   can_connect_smtp: boolean;
//   did_you_mean: string;
//   domain: string;
//   email: string;
//   free: boolean;
//   is_catch_all: boolean;
//   is_deliverable: boolean;
//   is_disabled: string;
//   is_disposable: boolean;
//   is_inbox_full: string;
//   is_role_account: boolean;
//   mx_records: boolean;
//   score: number;
//   syntax_valid: boolean;
//   user: string;
// }

// export default function EmailValidator() {
//   const [email, setEmail] = useState<string>("");
//   const [result, setResult] = useState<EmailValidationResult | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [recentSearches, setRecentSearches] = useState<string[]>([]);
//   const [showTips, setShowTips] = useState<boolean>(false);
//   const [blacklist, setBlacklist] = useState<string[]>([]);
//   const [showBlacklist, setShowBlacklist] = useState<boolean>(false);
//   const [apiKey, setApiKey] = useState<string | null>(null);
//   const [bulkEmails, setBulkEmails] = useState<string>("");
//   const [bulkResults, setBulkResults] = useState<EmailValidationResult[]>([]);

//   useEffect(() => {
//     const storedSearches = localStorage.getItem("recentSearches");
//     if (storedSearches) {
//       setRecentSearches(JSON.parse(storedSearches));
//     }
//     const storedBlacklist = localStorage.getItem("blacklist");
//     if (storedBlacklist) {
//       setBlacklist(JSON.parse(storedBlacklist));
//     }
//     setApiKey(process.env.NEXT_PUBLIC_APILAYER_API_KEY || null);
//   }, []);

//   const validateEmail = async (emailToValidate: string) => {
//     if (!emailToValidate) {
//       setError("Lūdzu, ievadiet e-pasta adresi.");
//       return null;
//     }
//     if (!apiKey) {
//       setError(
//         "API atslēga nav konfigurēta. Lūdzu, pārbaudiet vides mainīgos."
//       );
//       return null;
//     }
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(
//         `https://api.apilayer.com/email_verification/${encodeURIComponent(
//           emailToValidate
//         )}`,
//         {
//           method: "GET",
//           headers: {
//             apikey: apiKey,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error(
//           `API pieprasījums neizdevās ar statusu ${response.status}`
//         );
//       }

//       const data = await response.json();
//       console.log("API Atbilde:", data);
//       updateRecentSearches(emailToValidate);
//       if (data.score > 0.8) {
//         confetti({
//           particleCount: 100,
//           spread: 70,
//           origin: { y: 0.6 },
//         });
//       }
//       return data as EmailValidationResult;
//     } catch (error) {
//       console.error("Kļūda e-pasta validācijā:", error);
//       setError(
//         "Radās kļūda e-pasta validācijas laikā. Lūdzu, mēģiniet vēlreiz vēlāk."
//       );
//       return null;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSingleValidation = async () => {
//     const result = await validateEmail(email);
//     if (result) {
//       setResult(result);
//     }
//   };

//   const handleBulkValidation = async () => {
//     const emails = bulkEmails
//       .split("\n")
//       .filter((email) => email.trim() !== "");
//     const results = [];
//     for (const email of emails) {
//       const result = await validateEmail(email);
//       if (result) {
//         results.push(result);
//       }
//     }
//     setBulkResults(results);
//   };

//   const updateRecentSearches = (newEmail: string) => {
//     const updatedSearches = [
//       newEmail,
//       ...recentSearches.filter((e) => e !== newEmail),
//     ].slice(0, 5);
//     setRecentSearches(updatedSearches);
//     localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
//   };

//   const addToBlacklist = (emailToBlacklist: string) => {
//     if (!blacklist.includes(emailToBlacklist)) {
//       const updatedBlacklist = [...blacklist, emailToBlacklist];
//       setBlacklist(updatedBlacklist);
//       localStorage.setItem("blacklist", JSON.stringify(updatedBlacklist));
//     }
//   };

//   const removeFromBlacklist = (emailToRemove: string) => {
//     const updatedBlacklist = blacklist.filter((e) => e !== emailToRemove);
//     setBlacklist(updatedBlacklist);
//     localStorage.setItem("blacklist", JSON.stringify(updatedBlacklist));
//   };

//   const ResultCard = ({
//     title,
//     value,
//     icon,
//   }: {
//     title: string;
//     value: boolean | string | number;
//     icon: React.ReactNode;
//   }) => (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
//     >
//       <div className="flex items-center">
//         <div className="text-indigo-500 mr-3">{icon}</div>
//         <div>
//           <p className="text-sm font-medium text-gray-500">{title}</p>
//           <p className="mt-1 text-lg font-semibold text-gray-900">
//             {typeof value === "boolean"
//               ? value
//                 ? "Jā"
//                 : "Nē"
//               : typeof value === "number"
//               ? value.toFixed(2)
//               : value}
//           </p>
//         </div>
//       </div>
//       {typeof value === "boolean" && (
//         <div
//           className={`flex-shrink-0 ${
//             value ? "text-green-500" : "text-red-500"
//           }`}
//         >
//           {value ? <FiCheckCircle size={24} /> : <FiXCircle size={24} />}
//         </div>
//       )}
//     </motion.div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
//       <Header />
//       <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
//             E-pasta Validācijas Rīks
//           </h1>
//           <p className="text-xl text-gray-600 text-center mb-8">
//             Pārbaudi e-pasta adrešu derīgumu, formātu un kvalitāti.
//           </p>
//         </motion.div>

//         <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
//           <div className="px-4 py-5 sm:p-6">
//             <div className="mb-4">
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 E-pasta adrese
//               </label>
//               <div className="mt-1 flex rounded-md shadow-sm">
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   placeholder="ievadiet@epasts.lv"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <button
//                   type="button"
//                   onClick={handleSingleValidation}
//                   disabled={isLoading}
//                   className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
//                 >
//                   {isLoading ? "Pārbauda..." : "Validēt"}
//                 </button>
//               </div>
//             </div>

//             {recentSearches.length > 0 && (
//               <div className="mt-4">
//                 <h3 className="text-sm font-medium text-gray-500">
//                   Nesenie meklējumi:
//                 </h3>
//                 <div className="mt-2 flex flex-wrap gap-2">
//                   {recentSearches.map((search, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setEmail(search)}
//                       className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition duration-150 ease-in-out"
//                     >
//                       {search}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             <div className="mt-6">
//               <label
//                 htmlFor="bulkEmails"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Vairāku e-pastu validācija (viens e-pasts katrā rindā)
//               </label>
//               <textarea
//                 id="bulkEmails"
//                 name="bulkEmails"
//                 rows={4}
//                 className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                 value={bulkEmails}
//                 onChange={(e) => setBulkEmails(e.target.value)}
//               />
//               <button
//                 type="button"
//                 onClick={handleBulkValidation}
//                 disabled={isLoading}
//                 className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
//               >
//                 Validēt Vairākus E-pastus
//               </button>
//             </div>

//             <AnimatePresence>
//               {error && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
//                   role="alert"
//                 >
//                   <span className="block sm:inline">{error}</span>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             <AnimatePresence>
//               {result && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: 20 }}
//                   transition={{ duration: 0.5 }}
//                   className="mt-6"
//                 >
//                   <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">
//                     Validācijas Rezultāti
//                   </h2>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     <ResultCard
//                       title="E-pasts"
//                       value={result.email}
//                       icon={<FiMail size={24} />}
//                     />
//                     <ResultCard
//                       title="Lietotājs"
//                       value={result.user}
//                       icon={<FiUser size={24} />}
//                     />
//                     <ResultCard
//                       title="Domēns"
//                       value={result.domain}
//                       icon={<FiGlobe size={24} />}
//                     />
//                     <ResultCard
//                       title="Derīgs Formāts"
//                       value={result.syntax_valid}
//                       icon={<FiCheckCircle size={24} />}
//                     />
//                     <ResultCard
//                       title="MX Ieraksti Atrasti"
//                       value={result.mx_records}
//                       icon={<FiServer size={24} />}
//                     />
//                     <ResultCard
//                       title="SMTP Savienojums"
//                       value={result.can_connect_smtp}
//                       icon={<FiPackage size={24} />}
//                     />
//                     <ResultCard
//                       title="Ir Piegādājams"
//                       value={result.is_deliverable}
//                       icon={<FiCheckCircle size={24} />}
//                     />
//                     <ResultCard
//                       title="Catch-all"
//                       value={result.is_catch_all}
//                       icon={<FiInbox size={24} />}
//                     />
//                     <ResultCard
//                       title="Lomas Konts"
//                       value={result.is_role_account}
//                       icon={<FiUserCheck size={24} />}
//                     />
//                     <ResultCard
//                       title="Vienreizējs"
//                       value={result.is_disposable}
//                       icon={<FiTrash2 size={24} />}
//                     />
//                     <ResultCard
//                       title="Bezmaksas Pakalpojums"
//                       value={result.free}
//                       icon={<FiDollarSign size={24} />}
//                     />
//                     <ResultCard
//                       title="Kvalitātes Vērtējums"
//                       value={result.score}
//                       icon={<FiStar size={24} />}
//                     />
//                     {result.did_you_mean && (
//                       <ResultCard
//                         title="Vai jūs domājāt"
//                         value={result.did_you_mean}
//                         icon={<FiHelpCircle size={24} />}
//                       />
//                     )}
//                     {result.is_disabled && (
//                       <ResultCard
//                         title="Ir Atspējots"
//                         value={result.is_disabled}
//                         icon={<FiAlertCircle size={24} />}
//                       />
//                     )}
//                     {result.is_inbox_full && (
//                       <ResultCard
//                         title="Pastkaste Pilna"
//                         value={result.is_inbox_full}
//                         icon={<FiInbox size={24} />}
//                       />
//                     )}
//                   </div>
//                   <div className="mt-4 flex justify-end">
//                     <button
//                       onClick={() => addToBlacklist(result.email)}
//                       className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//                     >
//                       <FiSave className="mr-2" /> Pievienot Melnajam Sarakstam
//                     </button>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             <AnimatePresence>
//               {bulkResults.length > 0 && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: 20 }}
//                   transition={{ duration: 0.5 }}
//                   className="mt-8"
//                 >
//                   <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">
//                     Vairāku E-pastu Validācijas Rezultāti
//                   </h2>
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                       <thead className="bg-gray-50">
//                         <tr>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                           >
//                             E-pasts
//                           </th>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                           >
//                             Derīgs Formāts
//                           </th>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                           >
//                             Piegādājams
//                           </th>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                           >
//                             Kvalitātes Vērtējums
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {bulkResults.map((result, index) => (
//                           <tr key={index}>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                               {result.email}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                               {result.syntax_valid ? (
//                                 <FiCheckCircle className="text-green-500" />
//                               ) : (
//                                 <FiXCircle className="text-red-500" />
//                               )}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                               {result.is_deliverable ? (
//                                 <FiCheckCircle className="text-green-500" />
//                               ) : (
//                                 <FiXCircle className="text-red-500" />
//                               )}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                               {result.score.toFixed(2)}
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>

//         <div className="flex justify-between items-center mb-4">
//           <button
//             onClick={() => setShowTips(!showTips)}
//             className="text-indigo-600 hover:text-indigo-800 transition duration-150 ease-in-out"
//           >
//             {showTips ? "Paslēpt Padomus" : "Rādīt E-pasta Validācijas Padomus"}
//           </button>
//           <button
//             onClick={() => setShowBlacklist(!showBlacklist)}
//             className="text-indigo-600 hover:text-indigo-800 transition duration-150 ease-in-out"
//           >
//             {showBlacklist ? "Paslēpt Melno Sarakstu" : "Rādīt Melno Sarakstu"}
//           </button>
//         </div>

//         <AnimatePresence>
//           {showTips && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//               className="bg-blue-50 p-4 rounded-md mb-4"
//             >
//               <h3 className="text-lg font-medium text-blue-900 mb-2">
//                 Padomi Efektīvai E-pasta Validācijai:
//               </h3>
//               <ul className="list-disc pl-5 text-blue-800">
//                 <li>
//                   Pārliecinieties, ka e-pasta formāts ir pareizs (piemēram,
//                   lietotajs@domens.lv).
//                 </li>
//                 <li>Pārbaudiet, vai domēnam ir derīgi MX ieraksti.</li>
//                 <li>
//                   Izvairieties no vienreizējām e-pasta adresēm, jo tās bieži
//                   tiek izmantotas surogātpastam.
//                 </li>
//                 <li>
//                   Ņemiet vērā e-pasta kvalitātes vērtējumu - augstāki vērtējumi
//                   norāda uz labāku uzticamību.
//                 </li>
//                 <li>
//                   Regulāri tīriet savu e-pastu sarakstu, lai uzlabotu piegādes
//                   rādītājus.
//                 </li>
//               </ul>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <AnimatePresence>
//           {showBlacklist && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//               className="bg-gray-50 p-4 rounded-md"
//             >
//               <h3 className="text-lg font-medium text-gray-900 mb-2">
//                 Melnais Saraksts:
//               </h3>
//               {blacklist.length > 0 ? (
//                 <ul className="divide-y divide-gray-200">
//                   {blacklist.map((blockedEmail, index) => (
//                     <li
//                       key={index}
//                       className="py-2 flex justify-between items-center"
//                     >
//                       <span>{blockedEmail}</span>
//                       <button
//                         onClick={() => removeFromBlacklist(blockedEmail)}
//                         className="text-red-600 hover:text-red-800 transition duration-150 ease-in-out"
//                       >
//                         <FiTrash2 />
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p>Melnais saraksts ir tukšs.</p>
//               )}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </main>
//     </div>
//   );
// }
