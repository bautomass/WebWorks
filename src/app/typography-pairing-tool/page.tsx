"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiRefreshCw,
  FiDownload,
  FiCopy,
  FiHeart,
  FiZap,
  FiSmartphone,
  FiTablet,
  FiMonitor,
} from "react-icons/fi";
import Header from "../../components/Header";

const fontPairs = [
  { heading: "Roboto", body: "Open Sans" },
  { heading: "Playfair Display", body: "Source Sans Pro" },
  { heading: "Montserrat", body: "Merriweather" },
  { heading: "Lora", body: "Nunito" },
  { heading: "Oswald", body: "Lato" },
  { heading: "Raleway", body: "Roboto" },
  { heading: "Abril Fatface", body: "Poppins" },
  { heading: "Ubuntu", body: "Open Sans" },
  { heading: "Roboto Slab", body: "Roboto" },
  { heading: "Quicksand", body: "Nunito" },
  { heading: "Alegreya", body: "Lora" },
  { heading: "Josefin Sans", body: "Merriweather" },
  { heading: "Spectral", body: "Karla" },
  { heading: "Work Sans", body: "Crimson Text" },
  { heading: "Archivo", body: "Lato" },
  { heading: "Cormorant Garamond", body: "Proza Libre" },
  { heading: "Fjalla One", body: "Noto Sans" },
  { heading: "Libre Franklin", body: "Libre Baskerville" },
  { heading: "Darker Grotesque", body: "IBM Plex Sans" },
  { heading: "Tenor Sans", body: "Crimson Pro" },
  { heading: "Bebas Neue", body: "Roboto" },
  { heading: "Muli", body: "Cardo" },
  { heading: "Zilla Slab", body: "Lato" },
  { heading: "Heebo", body: "PT Serif" },
  { heading: "Vollkorn", body: "Nunito" },
  { heading: "Anton", body: "Raleway" },
  { heading: "Kanit", body: "Hind" },
  { heading: "Mukta", body: "Rubik" },
  { heading: "Signika", body: "Tinos" },
  { heading: "Titillium Web", body: "Muli" },
  { heading: "Cinzel", body: "Cabin" },
  { heading: "Amatic SC", body: "Josefin Sans" },
  { heading: "Dosis", body: "Fira Sans" },
  { heading: "PT Sans", body: "PT Serif" },
  { heading: "Rokkitt", body: "Lora" },
  { heading: "Nanum Gothic", body: "Nanum Myeongjo" },
  { heading: "Arvo", body: "Open Sans" },
  { heading: "Catamaran", body: "Bitter" },
  { heading: "Inconsolata", body: "Libre Franklin" },
  { heading: "Merriweather", body: "Montserrat" },
  { heading: "Asap", body: "Asap Condensed" },
  { heading: "Baloo", body: "Noto Serif" },
  { heading: "Cardo", body: "Palanquin" },
  { heading: "Exo", body: "Work Sans" },
  { heading: "Fira Sans", body: "Merriweather" },
  { heading: "Hind", body: "Source Sans Pro" },
  { heading: "Jura", body: "Karla" },
  { heading: "Karla", body: "Rubik" },
  { heading: "Lobster", body: "Cabin" },
  { heading: "Maitree", body: "Karla" },
  { heading: "Noticia Text", body: "Source Sans Pro" },
  { heading: "Overpass", body: "Quicksand" },
  { heading: "Palanquin", body: "Roboto" },
  { heading: "Questrial", body: "Merriweather" },
  { heading: "Rambla", body: "Roboto Slab" },
  { heading: "Saira", body: "Libre Franklin" },
  { heading: "Teko", body: "Source Sans Pro" },
  { heading: "Unna", body: "Cabin" },
  { heading: "Varela Round", body: "Open Sans" },
  { heading: "Yrsa", body: "Merriweather" },
  { heading: "Zilla Slab Highlight", body: "Roboto" },
];

const TypographyPairingTool = () => {
  const [currentPairs, setCurrentPairs] = useState([
    fontPairs[0],
    fontPairs[1],
  ]);
  const [headingSizes, setHeadingSizes] = useState([36, 36]);
  const [bodySizes, setBodySizes] = useState([16, 16]);
  const [favorites, setFavorites] = useState([]);
  const [headingColors, setHeadingColors] = useState(["#333333", "#333333"]);
  const [bodyColors, setBodyColors] = useState(["#666666", "#666666"]);
  const [backgroundColors, setBackgroundColors] = useState([
    "#ffffff",
    "#ffffff",
  ]);
  const [previewDevice, setPreviewDevice] = useState("desktop");
  const [livePreviewText, setLivePreviewText] = useState(
    "Ievadiet savu tekstu šeit, lai redzētu, kā tas izskatīsies ar izvēlētajiem fontiem."
  );

  useEffect(() => {
    const storedFavorites = localStorage.getItem("typographyFavorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("typographyFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const getRandomPair = (index) => {
    const newPair = fontPairs[Math.floor(Math.random() * fontPairs.length)];
    setCurrentPairs((prevPairs) => {
      const newPairs = [...prevPairs];
      newPairs[index] = newPair;
      return newPairs;
    });
  };

  const toggleFavorite = (index) => {
    const pair = currentPairs[index];
    const isFavorite = favorites.some(
      (fav) => fav.heading === pair.heading && fav.body === pair.body
    );
    if (isFavorite) {
      setFavorites(
        favorites.filter(
          (fav) => fav.heading !== pair.heading || fav.body !== pair.body
        )
      );
    } else {
      setFavorites([...favorites, pair]);
    }
  };

  const generateCSS = (index) => {
    const pair = currentPairs[index];
    const css = `
      /* Heading */
      h1, h2, h3, h4, h5, h6 {
        font-family: '${pair.heading}', sans-serif;
        color: ${headingColors[index]};
      }

      /* Body */
      body {
        font-family: '${pair.body}', sans-serif;
        color: ${bodyColors[index]};
        background-color: ${backgroundColors[index]};
      }

      /* Responsive Typography */
      @media (max-width: 768px) {
        h1 { font-size: ${headingSizes[index] * 0.8}px; }
        body { font-size: ${bodySizes[index] * 0.9}px; }
      }

      @media (max-width: 480px) {
        h1 { font-size: ${headingSizes[index] * 0.7}px; }
        body { font-size: ${bodySizes[index] * 0.8}px; }
      }
    `;
    return css.trim();
  };

  const copyCSS = (index) => {
    const css = generateCSS(index);
    navigator.clipboard.writeText(css);
    alert("CSS ir nokopēts uz starpliktuvi!");
  };

  const suggestAIPair = (index) => {
    // Simulated AI suggestion
    const aiSuggestion =
      fontPairs[Math.floor(Math.random() * fontPairs.length)];
    setCurrentPairs((prevPairs) => {
      const newPairs = [...prevPairs];
      newPairs[index] = aiSuggestion;
      return newPairs;
    });
    alert("AI ir ieteikusi jaunu fontu pāri!");
  };

  const renderFontPairPreview = (index) => {
    const pair = currentPairs[index];
    return (
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between mb-4">
            <div>
              <h2
                className="text-2xl font-bold"
                style={{
                  fontFamily: pair.heading,
                  color: headingColors[index],
                }}
              >
                {pair.heading}
              </h2>
              <p
                className="text-lg"
                style={{ fontFamily: pair.body, color: bodyColors[index] }}
              >
                {pair.body}
              </p>
            </div>
            <div>
              <button
                onClick={() => getRandomPair(index)}
                className="mr-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FiRefreshCw className="mr-2" /> Jauns Pāris
              </button>
              <button
                onClick={() => toggleFavorite(index)}
                className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md ${
                  favorites.some(
                    (fav) =>
                      fav.heading === pair.heading && fav.body === pair.body
                  )
                    ? "text-white bg-pink-600 hover:bg-pink-700"
                    : "text-pink-600 bg-white hover:bg-pink-50"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500`}
              >
                <FiHeart className="mr-2" /> Favorīts
              </button>
            </div>
          </div>

          <div
            className={`mt-8 p-4 rounded ${
              previewDevice === "mobile"
                ? "w-64 mx-auto"
                : previewDevice === "tablet"
                ? "w-96 mx-auto"
                : "w-full"
            }`}
            style={{ backgroundColor: backgroundColors[index] }}
          >
            <h3
              className="text-2xl mb-2"
              style={{
                fontFamily: pair.heading,
                fontSize: `${headingSizes[index]}px`,
                color: headingColors[index],
              }}
            >
              Šis ir virsraksta paraugs
            </h3>
            <p
              style={{
                fontFamily: pair.body,
                fontSize: `${bodySizes[index]}px`,
                color: bodyColors[index],
              }}
            >
              {livePreviewText}
            </p>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Virsraksta krāsa
              </label>
              <input
                type="color"
                value={headingColors[index]}
                onChange={(e) =>
                  setHeadingColors((prev) => {
                    const newColors = [...prev];
                    newColors[index] = e.target.value;
                    return newColors;
                  })
                }
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pamatteksta krāsa
              </label>
              <input
                type="color"
                value={bodyColors[index]}
                onChange={(e) =>
                  setBodyColors((prev) => {
                    const newColors = [...prev];
                    newColors[index] = e.target.value;
                    return newColors;
                  })
                }
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fona krāsa
              </label>
              <input
                type="color"
                value={backgroundColors[index]}
                onChange={(e) =>
                  setBackgroundColors((prev) => {
                    const newColors = [...prev];
                    newColors[index] = e.target.value;
                    return newColors;
                  })
                }
                className="mt-1 block w-full"
              />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor={`headingSize${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Virsraksta izmērs: {headingSizes[index]}px
              </label>
              <input
                type="range"
                id={`headingSize${index}`}
                min="20"
                max="72"
                value={headingSizes[index]}
                onChange={(e) =>
                  setHeadingSizes((prev) => {
                    const newSizes = [...prev];
                    newSizes[index] = Number(e.target.value);
                    return newSizes;
                  })
                }
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label
                htmlFor={`bodySize${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Pamatteksta izmērs: {bodySizes[index]}px
              </label>
              <input
                type="range"
                id={`bodySize${index}`}
                min="12"
                max="24"
                value={bodySizes[index]}
                onChange={(e) =>
                  setBodySizes((prev) => {
                    const newSizes = [...prev];
                    newSizes[index] = Number(e.target.value);
                    return newSizes;
                  })
                }
                className="mt-1 block w-full"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-between">
            <button
              onClick={() => suggestAIPair(index)}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <FiZap className="mr-2" /> AI Ieteikums
            </button>
            <button
              onClick={() => copyCSS(index)}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FiCopy className="mr-2" /> Kopēt CSS
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <Head>
        <title>Tipogrāfijas Pāru Rīks - Fontu Kombinācijas</title>
        <meta
          name="description"
          content="Atklājiet ideālās fontu kombinācijas jūsu tīmekļa dizaina projektiem ar mūsu uzlaboto Tipogrāfijas Pāru Rīku."
        />
        <meta
          name="keywords"
          content="tipogrāfija, fontu pāri, web dizains, fontu kombinācijas, dizaina rīki"
        />
        <link
          rel="canonical"
          href="https://jusu-domena.lv/typography-pairing-tool"
        />
      </Head>
      <Header />
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
            Tipogrāfijas Pāru Rīks
          </h1>
          <p className="text-xl text-gray-600 text-center mb-8">
            Atklājiet ideālās fontu kombinācijas jūsu projektiem
          </p>
        </motion.div>

        <div className="mb-8">
          <label
            htmlFor="livePreview"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Dzīvais priekšskatījums:
          </label>
          <textarea
            id="livePreview"
            rows={3}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            value={livePreviewText}
            onChange={(e) => setLivePreviewText(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-8 flex justify-center space-x-4">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {renderFontPairPreview(0)}
          {renderFontPairPreview(1)}
        </div>

        {favorites.length > 0 && (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-8">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium mb-4">Jūsu Favorīti</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {favorites.map((pair, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded">
                    <h4
                      className="font-bold"
                      style={{ fontFamily: pair.heading }}
                    >
                      {pair.heading}
                    </h4>
                    <p style={{ fontFamily: pair.body }}>{pair.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-8">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium mb-4">
              Padomi Efektīvai Fontu Pārošanai
            </h2>
            <ul className="list-disc pl-5 text-gray-600">
              <li>
                Izvēlieties kontrastējošus fontus, piemēram, sans-serif
                virsrakstam un serif pamattekstam.
              </li>
              <li>
                Pārliecinieties, ka abi fonti ir labi salasāmi dažādos izmēros.
              </li>
              <li>
                Izmēģiniet dažādas fontu kombinācijas, lai atrastu perfekto
                balansu.
              </li>
              <li>
                Ņemiet vērā jūsu zīmola personību un mērķauditoriju, izvēloties
                fontus.
              </li>
              <li>
                Pārbaudiet, kā fontu pāris izskatās dažādās ierīcēs un ekrāna
                izmēros.
              </li>
              <li>
                Izmantojiet ne vairāk kā 2-3 dažādus fontus vienā projektā, lai
                saglabātu konsistenci.
              </li>
              <li>
                Eksperimentējiet ar krāsu kombinācijām, lai uzlabotu lasāmību un
                vizuālo pievilcību.
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TypographyPairingTool;

// "use client";

// import React, { useState, useEffect } from "react";
// import Head from "next/head";
// import { motion } from "framer-motion";
// import {
//   FiRefreshCw,
//   FiDownload,
//   FiCopy,
//   FiHeart,
//   FiZap,
// } from "react-icons/fi";
// import Header from "../../components/Header";

// const fontPairs = [
//   { heading: "Roboto", body: "Open Sans" },
//   { heading: "Playfair Display", body: "Source Sans Pro" },
//   { heading: "Montserrat", body: "Merriweather" },
//   { heading: "Lora", body: "Nunito" },
//   { heading: "Oswald", body: "Lato" },
//   { heading: "Raleway", body: "Roboto" },
//   { heading: "Abril Fatface", body: "Poppins" },
//   { heading: "Ubuntu", body: "Open Sans" },
//   { heading: "Roboto Slab", body: "Roboto" },
//   { heading: "Quicksand", body: "Nunito" },
//   { heading: "Alegreya", body: "Lora" },
//   { heading: "Josefin Sans", body: "Merriweather" },
//   { heading: "Spectral", body: "Karla" },
//   { heading: "Work Sans", body: "Crimson Text" },
//   { heading: "Archivo", body: "Lato" },
//   { heading: "Cormorant Garamond", body: "Proza Libre" },
//   { heading: "Fjalla One", body: "Noto Sans" },
//   { heading: "Libre Franklin", body: "Libre Baskerville" },
//   { heading: "Darker Grotesque", body: "IBM Plex Sans" },
//   { heading: "Tenor Sans", body: "Crimson Pro" },
//   { heading: "Bebas Neue", body: "Roboto" },
//   { heading: "Muli", body: "Cardo" },
//   { heading: "Zilla Slab", body: "Lato" },
//   { heading: "Heebo", body: "PT Serif" },
//   { heading: "Vollkorn", body: "Nunito" },
//   { heading: "Anton", body: "Raleway" },
//   { heading: "Kanit", body: "Hind" },
//   { heading: "Mukta", body: "Rubik" },
//   { heading: "Signika", body: "Tinos" },
//   { heading: "Titillium Web", body: "Muli" },
//   { heading: "Cinzel", body: "Cabin" },
//   { heading: "Amatic SC", body: "Josefin Sans" },
//   { heading: "Dosis", body: "Fira Sans" },
//   { heading: "PT Sans", body: "PT Serif" },
//   { heading: "Rokkitt", body: "Lora" },
//   { heading: "Nanum Gothic", body: "Nanum Myeongjo" },
//   { heading: "Arvo", body: "Open Sans" },
//   { heading: "Catamaran", body: "Bitter" },
//   { heading: "Inconsolata", body: "Libre Franklin" },
//   { heading: "Merriweather", body: "Montserrat" },
//   { heading: "Asap", body: "Asap Condensed" },
//   { heading: "Baloo", body: "Noto Serif" },
//   { heading: "Cardo", body: "Palanquin" },
//   { heading: "Exo", body: "Work Sans" },
//   { heading: "Fira Sans", body: "Merriweather" },
//   { heading: "Hind", body: "Source Sans Pro" },
//   { heading: "Jura", body: "Karla" },
//   { heading: "Karla", body: "Rubik" },
//   { heading: "Lobster", body: "Cabin" },
//   { heading: "Maitree", body: "Karla" },
//   { heading: "Noticia Text", body: "Source Sans Pro" },
//   { heading: "Overpass", body: "Quicksand" },
//   { heading: "Palanquin", body: "Roboto" },
//   { heading: "Questrial", body: "Merriweather" },
//   { heading: "Rambla", body: "Roboto Slab" },
//   { heading: "Saira", body: "Libre Franklin" },
//   { heading: "Teko", body: "Source Sans Pro" },
//   { heading: "Unna", body: "Cabin" },
//   { heading: "Varela Round", body: "Open Sans" },
//   { heading: "Yrsa", body: "Merriweather" },
//   { heading: "Zilla Slab Highlight", body: "Roboto" },
// ];

// const TypographyPairingTool = () => {
//   const [currentPair, setCurrentPair] = useState(fontPairs[0]);
//   const [headingSize, setHeadingSize] = useState(36);
//   const [bodySize, setBodySize] = useState(16);
//   const [favorites, setFavorites] = useState([]);
//   const [headingColor, setHeadingColor] = useState("#333333");
//   const [bodyColor, setBodyColor] = useState("#666666");
//   const [backgroundColor, setBackgroundColor] = useState("#ffffff");

//   useEffect(() => {
//     const storedFavorites = localStorage.getItem("typographyFavorites");
//     if (storedFavorites) {
//       setFavorites(JSON.parse(storedFavorites));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("typographyFavorites", JSON.stringify(favorites));
//   }, [favorites]);

//   const getRandomPair = () => {
//     const newPair = fontPairs[Math.floor(Math.random() * fontPairs.length)];
//     setCurrentPair(newPair);
//   };

//   const toggleFavorite = () => {
//     const isFavorite = favorites.some(
//       (fav) =>
//         fav.heading === currentPair.heading && fav.body === currentPair.body
//     );
//     if (isFavorite) {
//       setFavorites(
//         favorites.filter(
//           (fav) =>
//             fav.heading !== currentPair.heading || fav.body !== currentPair.body
//         )
//       );
//     } else {
//       setFavorites([...favorites, currentPair]);
//     }
//   };

//   const copyCSS = () => {
//     const css = `
//       /* Heading */
//       font-family: '${currentPair.heading}', sans-serif;
//       font-size: ${headingSize}px;
//       color: ${headingColor};

//       /* Body */
//       font-family: '${currentPair.body}', sans-serif;
//       font-size: ${bodySize}px;
//       color: ${bodyColor};

//       /* Background */
//       background-color: ${backgroundColor};
//     `;
//     navigator.clipboard.writeText(css.trim());
//     alert("CSS ir nokopēts uz starpliktuvi!");
//   };

//   const suggestAIPair = () => {
//     // Simulated AI suggestion
//     const aiSuggestion =
//       fontPairs[Math.floor(Math.random() * fontPairs.length)];
//     setCurrentPair(aiSuggestion);
//     alert("AI ir ieteikusi jaunu fontu pāri!");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
//       <Head>
//         <title>Tipogrāfijas Pāru Rīks - Fontu Kombinācijas</title>
//         <meta
//           name="description"
//           content="Atklājiet ideālās fontu kombinācijas jūsu tīmekļa dizaina projektiem ar mūsu uzlaboto Tipogrāfijas Pāru Rīku."
//         />
//         <meta
//           name="keywords"
//           content="tipogrāfija, fontu pāri, web dizains, fontu kombinācijas, dizaina rīki"
//         />
//         <link
//           rel="canonical"
//           href="https://jusu-domena.lv/typography-pairing-tool"
//         />
//       </Head>
//       <Header />
//       <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
//             Tipogrāfijas Pāru Rīks
//           </h1>
//           <p className="text-xl text-gray-600 text-center mb-8">
//             Atklājiet ideālās fontu kombinācijas jūsu projektiem
//           </p>
//         </motion.div>

//         <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
//           <div className="px-4 py-5 sm:p-6">
//             <div className="flex justify-between mb-4">
//               <div>
//                 <h2
//                   className="text-2xl font-bold"
//                   style={{
//                     fontFamily: currentPair.heading,
//                     color: headingColor,
//                   }}
//                 >
//                   {currentPair.heading}
//                 </h2>
//                 <p
//                   className="text-lg"
//                   style={{ fontFamily: currentPair.body, color: bodyColor }}
//                 >
//                   {currentPair.body}
//                 </p>
//               </div>
//               <div>
//                 <button
//                   onClick={getRandomPair}
//                   className="mr-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   <FiRefreshCw className="mr-2" /> Jauns Pāris
//                 </button>
//                 <button
//                   onClick={toggleFavorite}
//                   className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md ${
//                     favorites.some(
//                       (fav) =>
//                         fav.heading === currentPair.heading &&
//                         fav.body === currentPair.body
//                     )
//                       ? "text-white bg-pink-600 hover:bg-pink-700"
//                       : "text-pink-600 bg-white hover:bg-pink-50"
//                   } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500`}
//                 >
//                   <FiHeart className="mr-2" /> Favorīts
//                 </button>
//               </div>
//             </div>

//             <div className="mt-8 p-4 rounded" style={{ backgroundColor }}>
//               <h3
//                 className="text-2xl mb-2"
//                 style={{
//                   fontFamily: currentPair.heading,
//                   fontSize: `${headingSize}px`,
//                   color: headingColor,
//                 }}
//               >
//                 Šis ir virsraksta paraugs
//               </h3>
//               <p
//                 style={{
//                   fontFamily: currentPair.body,
//                   fontSize: `${bodySize}px`,
//                   color: bodyColor,
//                 }}
//               >
//                 Šis ir pamatteksta paraugs. Tas demonstrē, kā izvēlētie fonti
//                 izskatās kopā garākā tekstā. Laba fontu kombinācija nodrošina
//                 labu lasāmību un vizuālo harmoniju.
//               </p>
//             </div>

//             <div className="mt-4 grid grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Virsraksta krāsa
//                 </label>
//                 <input
//                   type="color"
//                   value={headingColor}
//                   onChange={(e) => setHeadingColor(e.target.value)}
//                   className="mt-1 block w-full"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Pamatteksta krāsa
//                 </label>
//                 <input
//                   type="color"
//                   value={bodyColor}
//                   onChange={(e) => setBodyColor(e.target.value)}
//                   className="mt-1 block w-full"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Fona krāsa
//                 </label>
//                 <input
//                   type="color"
//                   value={backgroundColor}
//                   onChange={(e) => setBackgroundColor(e.target.value)}
//                   className="mt-1 block w-full"
//                 />
//               </div>
//             </div>

//             <div className="mt-4 grid grid-cols-2 gap-4">
//               <div>
//                 <label
//                   htmlFor="headingSize"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Virsraksta izmērs: {headingSize}px
//                 </label>
//                 <input
//                   type="range"
//                   id="headingSize"
//                   min="20"
//                   max="72"
//                   value={headingSize}
//                   onChange={(e) => setHeadingSize(Number(e.target.value))}
//                   className="mt-1 block w-full"
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="bodySize"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Pamatteksta izmērs: {bodySize}px
//                 </label>
//                 <input
//                   type="range"
//                   id="bodySize"
//                   min="12"
//                   max="24"
//                   value={bodySize}
//                   onChange={(e) => setBodySize(Number(e.target.value))}
//                   className="mt-1 block w-full"
//                 />
//               </div>
//             </div>

//             <div className="mt-4 flex justify-between">
//               <button
//                 onClick={suggestAIPair}
//                 className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//               >
//                 <FiZap className="mr-2" /> AI Ieteikums
//               </button>
//               <button
//                 onClick={copyCSS}
//                 className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 <FiCopy className="mr-2" /> Kopēt CSS
//               </button>
//             </div>
//           </div>
//         </div>

//         {favorites.length > 0 && (
//           <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
//             <div className="px-4 py-5 sm:p-6">
//               <h3 className="text-lg font-medium mb-4">Jūsu Favorīti</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                 {favorites.map((pair, index) => (
//                   <div key={index} className="bg-gray-100 p-4 rounded">
//                     <h4
//                       className="font-bold"
//                       style={{ fontFamily: pair.heading }}
//                     >
//                       {pair.heading}
//                     </h4>
//                     <p style={{ fontFamily: pair.body }}>{pair.body}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//           <div className="px-4 py-5 sm:p-6">
//             <h2 className="text-lg font-medium mb-4">
//               Padomi Efektīvai Fontu Pārošanai
//             </h2>
//             <ul className="list-disc pl-5 text-gray-600">
//               <li>
//                 Izvēlieties kontrastējošus fontus, piemēram, sans-serif
//                 virsrakstam un serif pamattekstam.
//               </li>
//               <li>
//                 Pārliecinieties, ka abi fonti ir labi salasāmi dažādos izmēros.
//               </li>
//               <li>
//                 Izmēģiniet dažādas fontu kombinācijas, lai atrastu perfekto
//                 balansu.
//               </li>
//               <li>
//                 Ņemiet vērā jūsu zīmola personību un mērķauditoriju, izvēloties
//                 fontus.
//               </li>
//               <li>
//                 Pārbaudiet, kā fontu pāris izskatās dažādās ierīcēs un ekrāna
//                 izmēros.
//               </li>
//               <li>
//                 Izmantojiet ne vairāk kā 2-3 dažādus fontus vienā projektā, lai
//                 saglabātu konsistenci.
//               </li>
//             </ul>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default TypographyPairingTool;
