"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiRefreshCw,
  FiCopy,
  FiHeart,
  FiSmartphone,
  FiTablet,
  FiMonitor,
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
} from "react-icons/fi";
import Header from "../../components/Header";

const cookieConsentTemplates = [
  {
    name: "Minimāls",
    text: "Mēs izmantojam sīkdatnes, lai uzlabotu jūsu pieredzi.",
    buttonText: "Labi",
    style: {
      backgroundColor: "#f8f9fa",
      textColor: "#212529",
      buttonColor: "#0d6efd",
      buttonTextColor: "#ffffff",
      fontFamily: "'Arial', sans-serif",
      fontSize: "14px",
      borderRadius: "4px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    },
  },
  {
    name: "Modernais tumšais",
    text: "Šī vietne izmanto sīkdatnes, lai uzlabotu jūsu pārlūkošanas pieredzi. Turpinot, jūs piekrītat mūsu sīkdatņu politikai.",
    buttonText: "Pieņemt",
    style: {
      backgroundColor: "#1a1a1a",
      textColor: "#ffffff",
      buttonColor: "#3498db",
      buttonTextColor: "#ffffff",
      fontFamily: "'Roboto', sans-serif",
      fontSize: "16px",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
    },
  },
  {
    name: "Elegantais",
    text: "Mēs izmantojam sīkdatnes, lai nodrošinātu jums labāko pieredzi mūsu vietnē. Uzziniet vairāk par to, kā mēs izmantojam sīkdatnes.",
    buttonText: "Saprotu",
    style: {
      backgroundColor: "#ffffff",
      textColor: "#333333",
      buttonColor: "#4a4a4a",
      buttonTextColor: "#ffffff",
      fontFamily: "'Playfair Display', serif",
      fontSize: "15px",
      borderRadius: "0",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    },
  },
  {
    name: "Korporatīvais",
    text: "Mēs cenšamies nodrošināt jums labāko pieredzi. Izmantojot sīkdatnes, mēs varam personalizēt saturu un analizēt mūsu datplūsmu.",
    buttonText: "Pieņemt visas sīkdatnes",
    secondaryButtonText: "Tikai nepieciešamās",
    style: {
      backgroundColor: "#f1f3f5",
      textColor: "#495057",
      buttonColor: "#28a745",
      buttonTextColor: "#ffffff",
      secondaryButtonColor: "#6c757d",
      secondaryButtonTextColor: "#ffffff",
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: "14px",
      borderRadius: "6px",
      boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
    },
  },
  {
    name: "Spilgtais",
    text: "Hei! Mēs izmantojam sīkdatnes, lai padarītu jūsu apmeklējumu jautrāku un personalizētāku!",
    buttonText: "Forši, pieņemu!",
    style: {
      backgroundColor: "#ffd700",
      textColor: "#333333",
      buttonColor: "#ff4500",
      buttonTextColor: "#ffffff",
      fontFamily: "'Comic Sans MS', cursive",
      fontSize: "16px",
      borderRadius: "25px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    },
  },
];

const CookieConsentGenerator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(
    cookieConsentTemplates[0]
  );
  const [customTemplate, setCustomTemplate] = useState(null);
  const [previewDevice, setPreviewDevice] = useState("desktop");
  const [favorites, setFavorites] = useState([]);
  const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0);
  const [bannerPosition, setBannerPosition] = useState("bottom");
  const [animationStyle, setAnimationStyle] = useState("fade");

  useEffect(() => {
    const storedFavorites = localStorage.getItem("cookieConsentFavorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cookieConsentFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const nextTemplate = () => {
    setCurrentTemplateIndex(
      (prevIndex) => (prevIndex + 1) % cookieConsentTemplates.length
    );
    setSelectedTemplate(
      cookieConsentTemplates[
        (currentTemplateIndex + 1) % cookieConsentTemplates.length
      ]
    );
    setCustomTemplate(null);
  };

  const prevTemplate = () => {
    setCurrentTemplateIndex((prevIndex) =>
      prevIndex === 0 ? cookieConsentTemplates.length - 1 : prevIndex - 1
    );
    setSelectedTemplate(
      cookieConsentTemplates[
        currentTemplateIndex === 0
          ? cookieConsentTemplates.length - 1
          : currentTemplateIndex - 1
      ]
    );
    setCustomTemplate(null);
  };

  const toggleFavorite = () => {
    const template = customTemplate || selectedTemplate;
    const isFavorite = favorites.some((fav) => fav.name === template.name);
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.name !== template.name));
    } else {
      setFavorites([...favorites, template]);
    }
  };

  const copyCSS = () => {
    const template = customTemplate || selectedTemplate;
    const css = `
      .cookie-consent-banner {
        background-color: ${template.style.backgroundColor};
        color: ${template.style.textColor};
        font-family: ${template.style.fontFamily};
        font-size: ${template.style.fontSize};
        padding: 1rem;
        position: fixed;
        ${bannerPosition}: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 9999;
        border-radius: ${template.style.borderRadius};
        box-shadow: ${template.style.boxShadow};
        animation: ${animationStyle} 0.5s ease-in-out;
      }

      .cookie-consent-text {
        margin-right: 1rem;
      }

      .cookie-consent-button {
        background-color: ${template.style.buttonColor};
        color: ${template.style.buttonTextColor};
        border: none;
        padding: 0.5rem 1rem;
        cursor: pointer;
        border-radius: ${template.style.borderRadius};
      }

      ${
        template.secondaryButtonText
          ? `
      .cookie-consent-secondary-button {
        background-color: ${template.style.secondaryButtonColor};
        color: ${template.style.secondaryButtonTextColor};
        border: none;
        padding: 0.5rem 1rem;
        cursor: pointer;
        border-radius: ${template.style.borderRadius};
        margin-right: 0.5rem;
      }
      `
          : ""
      }

      @keyframes fade {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes slideUp {
        from { transform: translateY(100%); }
        to { transform: translateY(0); }
      }

      @keyframes slideDown {
        from { transform: translateY(-100%); }
        to { transform: translateY(0); }
      }
    `;
    navigator.clipboard.writeText(css.trim());
    alert("CSS ir nokopēts uz starpliktuvi!");
  };

  const copyHTML = () => {
    const template = customTemplate || selectedTemplate;
    const html = `
      <div class="cookie-consent-banner">
        <div class="cookie-consent-text">${template.text}</div>
        <div>
          ${
            template.secondaryButtonText
              ? `
          <button class="cookie-consent-secondary-button">${template.secondaryButtonText}</button>
          `
              : ""
          }
          <button class="cookie-consent-button">${template.buttonText}</button>
        </div>
      </div>
    `;
    navigator.clipboard.writeText(html.trim());
    alert("HTML ir nokopēts uz starpliktuvi!");
  };

  const downloadConfig = () => {
    const template = customTemplate || selectedTemplate;
    const config = {
      template: template,
      bannerPosition: bannerPosition,
      animationStyle: animationStyle,
    };
    const jsonString = JSON.stringify(config, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "cookie-consent-config.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderCookieConsentPreview = () => {
    const template = customTemplate || selectedTemplate;
    return (
      <motion.div
        className={`mt-8 p-4 rounded ${
          previewDevice === "mobile"
            ? "w-64 mx-auto"
            : previewDevice === "tablet"
            ? "w-96 mx-auto"
            : "w-full"
        }`}
        style={{
          ...template.style,
          maxWidth: previewDevice === "desktop" ? "100%" : undefined,
        }}
        initial={{ opacity: 0, y: bannerPosition === "top" ? -50 : 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <p className="mb-2">{template.text}</p>
        <div>
          {template.secondaryButtonText && (
            <button
              style={{
                backgroundColor: template.style.secondaryButtonColor,
                color: template.style.secondaryButtonTextColor,
                marginRight: "0.5rem",
              }}
              className="px-4 py-2 rounded"
            >
              {template.secondaryButtonText}
            </button>
          )}
          <button
            style={{
              backgroundColor: template.style.buttonColor,
              color: template.style.buttonTextColor,
            }}
            className="px-4 py-2 rounded"
          >
            {template.buttonText}
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <Header />
      <Head>
        <title>
          Sīkdatņu piekrišanas ģenerators - GDPR atbilstošu sīkdatņu paziņojumu
          izveide
        </title>
        <meta
          name="description"
          content="Izveidojiet profesionālus, pielāgojamus un GDPR atbilstošus sīkdatņu piekrišanas paziņojumus jūsu vietnei ar mūsu uzlaboto Sīkdatņu piekrišanas ģeneratoru."
        />
        <meta
          name="keywords"
          content="sīkdatņu piekrišana, GDPR, sīkdatņu paziņojums, sīkdatņu baneris, tīmekļa izstrāde, privātums, personalizācija"
        />
        <link
          rel="canonical"
          href="https://jusu-domena.lv/cookie-consent-generator"
        />
      </Head>
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
            Sīkdatņu piekrišanas ģenerators
          </h1>
          <p className="text-xl text-gray-600 text-center mb-8">
            Izveidojiet profesionālus, pielāgotus un GDPR atbilstošus sīkdatņu
            piekrišanas paziņojumus
          </p>
        </motion.div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={prevTemplate}
                className="text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                <FiChevronLeft size={24} />
              </button>
              <h2 className="text-2xl font-bold text-center">
                {customTemplate ? "Pielāgots šablons" : selectedTemplate.name}
              </h2>
              <button
                onClick={nextTemplate}
                className="text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                <FiChevronRight size={24} />
              </button>
            </div>

            {renderCookieConsentPreview()}

            <div className="mt-8">
              <h3 className="text-lg font-medium mb-2">Pielāgošana</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teksts
                  </label>
                  <textarea
                    value={customTemplate?.text || selectedTemplate.text}
                    onChange={(e) =>
                      setCustomTemplate({
                        ...(customTemplate || selectedTemplate),
                        text: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    rows="3"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pogas teksts
                  </label>
                  <input
                    type="text"
                    value={
                      customTemplate?.buttonText || selectedTemplate.buttonText
                    }
                    onChange={(e) =>
                      setCustomTemplate({
                        ...(customTemplate || selectedTemplate),
                        buttonText: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                {(customTemplate?.secondaryButtonText ||
                  selectedTemplate.secondaryButtonText) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sekundārās pogas teksts
                    </label>
                    <input
                      type="text"
                      value={
                        customTemplate?.secondaryButtonText ||
                        selectedTemplate.secondaryButtonText
                      }
                      onChange={(e) =>
                        setCustomTemplate({
                          ...(customTemplate || selectedTemplate),
                          secondaryButtonText: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fona krāsa
                  </label>
                  <input
                    type="color"
                    value={
                      customTemplate?.style.backgroundColor ||
                      selectedTemplate.style.backgroundColor
                    }
                    onChange={(e) =>
                      setCustomTemplate({
                        ...(customTemplate || selectedTemplate),
                        style: {
                          ...(customTemplate || selectedTemplate).style,
                          backgroundColor: e.target.value,
                        },
                      })
                    }
                    className="w-full h-10 p-1 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teksta krāsa
                  </label>
                  <input
                    type="color"
                    value={
                      customTemplate?.style.textColor ||
                      selectedTemplate.style.textColor
                    }
                    onChange={(e) =>
                      setCustomTemplate({
                        ...(customTemplate || selectedTemplate),
                        style: {
                          ...(customTemplate || selectedTemplate).style,
                          textColor: e.target.value,
                        },
                      })
                    }
                    className="w-full h-10 p-1 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pogas krāsa
                  </label>
                  <input
                    type="color"
                    value={
                      customTemplate?.style.buttonColor ||
                      selectedTemplate.style.buttonColor
                    }
                    onChange={(e) =>
                      setCustomTemplate({
                        ...(customTemplate || selectedTemplate),
                        style: {
                          ...(customTemplate || selectedTemplate).style,
                          buttonColor: e.target.value,
                        },
                      })
                    }
                    className="w-full h-10 p-1 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pogas teksta krāsa
                  </label>
                  <input
                    type="color"
                    value={
                      customTemplate?.style.buttonTextColor ||
                      selectedTemplate.style.buttonTextColor
                    }
                    onChange={(e) =>
                      setCustomTemplate({
                        ...(customTemplate || selectedTemplate),
                        style: {
                          ...(customTemplate || selectedTemplate).style,
                          buttonTextColor: e.target.value,
                        },
                      })
                    }
                    className="w-full h-10 p-1 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fonta izmērs
                  </label>
                  <input
                    type="range"
                    min="12"
                    max="24"
                    value={parseInt(
                      customTemplate?.style.fontSize ||
                        selectedTemplate.style.fontSize
                    )}
                    onChange={(e) =>
                      setCustomTemplate({
                        ...(customTemplate || selectedTemplate),
                        style: {
                          ...(customTemplate || selectedTemplate).style,
                          fontSize: `${e.target.value}px`,
                        },
                      })
                    }
                    className="w-full"
                  />
                  <span className="text-sm text-gray-500">
                    {customTemplate?.style.fontSize ||
                      selectedTemplate.style.fontSize}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Noapaļojums
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    value={parseInt(
                      customTemplate?.style.borderRadius ||
                        selectedTemplate.style.borderRadius
                    )}
                    onChange={(e) =>
                      setCustomTemplate({
                        ...(customTemplate || selectedTemplate),
                        style: {
                          ...(customTemplate || selectedTemplate).style,
                          borderRadius: `${e.target.value}px`,
                        },
                      })
                    }
                    className="w-full"
                  />
                  <span className="text-sm text-gray-500">
                    {customTemplate?.style.borderRadius ||
                      selectedTemplate.style.borderRadius}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Banera novietojums
                  </label>
                  <select
                    value={bannerPosition}
                    onChange={(e) => setBannerPosition(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="top">Augšā</option>
                    <option value="bottom">Apakšā</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Animācijas stils
                  </label>
                  <select
                    value={animationStyle}
                    onChange={(e) => setAnimationStyle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="fade">Izzūdošs</option>
                    <option value="slideUp">Slīdošs uz augšu</option>
                    <option value="slideDown">Slīdošs uz leju</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={() => setPreviewDevice("mobile")}
                className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md ${
                  previewDevice === "mobile"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-indigo-600"
                } hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                <FiSmartphone className="mr-2" /> Mobilais
              </button>
              <button
                onClick={() => setPreviewDevice("tablet")}
                className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md ${
                  previewDevice === "tablet"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-indigo-600"
                } hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                <FiTablet className="mr-2" /> Planšete
              </button>
              <button
                onClick={() => setPreviewDevice("desktop")}
                className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md ${
                  previewDevice === "desktop"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-indigo-600"
                } hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                <FiMonitor className="mr-2" /> Dators
              </button>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={toggleFavorite}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
                  favorites.some(
                    (fav) =>
                      fav.name === (customTemplate || selectedTemplate).name
                  )
                    ? "text-white bg-pink-600 hover:bg-pink-700"
                    : "text-pink-600 bg-white hover:bg-pink-50"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500`}
              >
                <FiHeart className="mr-2" />{" "}
                {favorites.some(
                  (fav) =>
                    fav.name === (customTemplate || selectedTemplate).name
                )
                  ? "Noņemt no favorītiem"
                  : "Pievienot favorītiem"}
              </button>
              <div>
                <button
                  onClick={copyCSS}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-2"
                >
                  <FiCopy className="mr-2" /> Kopēt CSS
                </button>
                <button
                  onClick={copyHTML}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-2"
                >
                  <FiCopy className="mr-2" /> Kopēt HTML
                </button>
                <button
                  onClick={downloadConfig}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  <FiDownload className="mr-2" /> Lejupielādēt konfigurāciju
                </button>
              </div>
            </div>
          </div>
        </div>

        {favorites.length > 0 && (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium mb-4">Jūsu Favorīti</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {favorites.map((template, index) => (
                  <div
                    key={index}
                    className="p-4 rounded cursor-pointer"
                    style={{
                      backgroundColor: template.style.backgroundColor,
                      color: template.style.textColor,
                      fontFamily: template.style.fontFamily,
                      fontSize: template.style.fontSize,
                      borderRadius: template.style.borderRadius,
                      boxShadow: template.style.boxShadow,
                    }}
                    onClick={() => {
                      setSelectedTemplate(template);
                      setCustomTemplate(null);
                    }}
                  >
                    <h4 className="font-bold mb-2">{template.name}</h4>
                    <p className="text-sm mb-2">{template.text}</p>
                    <button
                      style={{
                        backgroundColor: template.style.buttonColor,
                        color: template.style.buttonTextColor,
                      }}
                      className="px-2 py-1 rounded text-sm"
                    >
                      {template.buttonText}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium mb-4">
              Padomi efektīvai sīkdatņu piekrišanas paziņojumu izveidei
            </h2>
            <ul className="list-disc pl-5 text-gray-600">
              <li>
                Izmantojiet vienkāršu un saprotamu valodu, lai izskaidrotu
                sīkdatņu izmantošanu.
              </li>
              <li>Nodrošiniet skaidru un viegli pamanāmu piekrišanas pogu.</li>
              <li>
                Piedāvājiet iespēju uzzināt vairāk par sīkdatņu izmantošanu,
                iekļaujot saiti uz jūsu sīkdatņu politiku.
              </li>
              <li>
                Pārliecinieties, ka jūsu sīkdatņu paziņojums ir responsīvs un
                labi izskatās dažādās ierīcēs.
              </li>
              <li>
                Regulāri pārskatiet un atjauniniet savu sīkdatņu politiku un
                paziņojumu, lai tie atbilstu jaunākajām GDPR prasībām.
              </li>
              <li>
                Apsveriet iespēju piedāvāt lietotājiem izvēli par dažādu
                sīkdatņu kategoriju pieņemšanu vai noraidīšanu.
              </li>
              <li>
                Izmantojiet krāsas un stilus, kas saskan ar jūsu vietnes
                dizainu, lai nodrošinātu vizuālo saskaņotību.
              </li>
              <li>
                Testējiet savu sīkdatņu paziņojumu dažādās pārlūkprogrammās un
                ierīcēs, lai nodrošinātu konsekventu izskatu un funkcionalitāti.
              </li>
              <li>
                Apsveriet iespēju izmantot animācijas, lai pievērstu uzmanību
                sīkdatņu paziņojumam, bet pārliecinieties, ka tās nav pārāk
                uzbāzīgas.
              </li>
              <li>
                Nodrošiniet vieglu veidu, kā lietotāji var mainīt savas sīkdatņu
                preferences vēlāk.
              </li>
              <li>
                Iekļaujiet informāciju par to, kā lietotāji var dzēst vai bloķēt
                sīkdatnes savā pārlūkprogrammā.
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CookieConsentGenerator;
