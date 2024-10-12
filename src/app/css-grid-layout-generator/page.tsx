"use client";

import React, { useState, useEffect } from "react";
import {
  FiPlus,
  FiMinus,
  FiCode,
  FiCopy,
  FiInfo,
  FiRefreshCw,
  FiSave,
  FiLoader,
  FiLayout,
  FiDownload,
  FiUpload,
  FiShare2,
  FiEye,
  FiEyeOff,
  FiMoon,
  FiSun,
} from "react-icons/fi";
import Head from "next/head";
import Header from "../../components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type GridItem = {
  id: number;
  gridColumn: string;
  gridRow: string;
  justifySelf: string;
  alignSelf: string;
  content: string;
  backgroundColor: string;
};

const propertyOptions = {
  gridTemplateColumns: [
    "1fr",
    "1fr 1fr",
    "1fr 1fr 1fr",
    "repeat(3, 1fr)",
    "repeat(4, 1fr)",
    "repeat(auto-fit, minmax(200px, 1fr))",
  ],
  gridTemplateRows: [
    "auto",
    "auto auto",
    "auto auto auto",
    "repeat(3, auto)",
    "repeat(4, auto)",
  ],
  justifyItems: ["start", "end", "center", "stretch"],
  alignItems: ["start", "end", "center", "stretch"],
  justifyContent: [
    "start",
    "end",
    "center",
    "stretch",
    "space-around",
    "space-between",
    "space-evenly",
  ],
  alignContent: [
    "start",
    "end",
    "center",
    "stretch",
    "space-around",
    "space-between",
    "space-evenly",
  ],
  justifySelf: ["start", "end", "center", "stretch"],
  alignSelf: ["start", "end", "center", "stretch"],
};

const CSSGridGenerator: React.FC = () => {
  const [containerProps, setContainerProps] = useState({
    gridTemplateColumns: "1fr 1fr 1fr",
    gridTemplateRows: "auto auto auto",
    justifyItems: "stretch",
    alignItems: "stretch",
    justifyContent: "start",
    alignContent: "start",
    gap: "10px",
    width: "100%",
    height: "400px",
  });
  const [items, setItems] = useState<GridItem[]>([
    {
      id: 1,
      gridColumn: "auto",
      gridRow: "auto",
      justifySelf: "stretch",
      alignSelf: "stretch",
      content: "Item 1",
      backgroundColor: "#f0f0f0",
    },
    {
      id: 2,
      gridColumn: "auto",
      gridRow: "auto",
      justifySelf: "stretch",
      alignSelf: "stretch",
      content: "Item 2",
      backgroundColor: "#e0e0e0",
    },
    {
      id: 3,
      gridColumn: "auto",
      gridRow: "auto",
      justifySelf: "stretch",
      alignSelf: "stretch",
      content: "Item 3",
      backgroundColor: "#d0d0d0",
    },
  ]);
  const [cssCode, setCssCode] = useState<string>("");
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [presetLayouts, setPresetLayouts] = useState<
    Array<{ name: string; config: any }>
  >([
    {
      name: "Basic 3x3",
      config: {
        gridTemplateColumns: "1fr 1fr 1fr",
        gridTemplateRows: "auto auto auto",
      },
    },
    {
      name: "Holy Grail",
      config: {
        gridTemplateColumns: "200px 1fr 200px",
        gridTemplateRows: "auto 1fr auto",
      },
    },
    {
      name: "Responsive Dashboard",
      config: {
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gridTemplateRows: "auto",
      },
    },
    {
      name: "Magazine Layout",
      config: {
        gridTemplateColumns: "repeat(4, 1fr)",
        gridTemplateRows: "auto auto auto",
      },
    },
    {
      name: "Mosaic Gallery",
      config: {
        gridTemplateColumns: "repeat(5, 1fr)",
        gridTemplateRows: "repeat(3, 200px)",
      },
    },
    {
      name: "Asymmetric Grid",
      config: {
        gridTemplateColumns: "2fr 1fr 1fr",
        gridTemplateRows: "auto auto auto",
      },
    },
    {
      name: "Card Layout",
      config: {
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gridTemplateRows: "auto",
        gap: "20px",
      },
    },
    {
      name: "Complex Portfolio",
      config: {
        gridTemplateColumns: "repeat(6, 1fr)",
        gridTemplateRows: "repeat(4, minmax(150px, auto))",
        gap: "15px",
      },
    },
    {
      name: "Masonry-style Grid",
      config: {
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gridAutoRows: "minmax(50px, auto)",
        gap: "15px",
      },
    },
    {
      name: "Responsive Blog Layout",
      config: {
        gridTemplateColumns: "minmax(65%, 1fr) minmax(35%, 300px)",
        gridTemplateRows: "auto 1fr auto",
        gap: "20px",
      },
    },
  ]);
  const [selectedPreset, setSelectedPreset] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [showGridLines, setShowGridLines] = useState<boolean>(true);
  const [animateItems, setAnimateItems] = useState<boolean>(false);

  useEffect(() => {
    generateCSSCode();
  }, [containerProps, items]);

  const addItem = () => {
    const newId = Math.max(...items.map((item) => item.id), 0) + 1;
    const newColor = `hsl(${Math.random() * 360}, 70%, 80%)`;
    setItems([
      ...items,
      {
        id: newId,
        gridColumn: "auto",
        gridRow: "auto",
        justifySelf: "stretch",
        alignSelf: "stretch",
        content: `Item ${newId}`,
        backgroundColor: newColor,
      },
    ]);
    toast.success("Jauns elements pievienots!");
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
      toast.info("Elements noņemts.");
    } else {
      toast.warning("Nepieciešams vismaz viens elements.");
    }
  };

  const updateContainerProp = (prop: string, value: string) => {
    setContainerProps({ ...containerProps, [prop]: value });
  };

  const updateItemProp = (id: number, prop: string, value: string) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [prop]: value } : item))
    );
  };

  const generateCSSCode = () => {
    let code = `.container {
  display: grid;
  grid-template-columns: ${containerProps.gridTemplateColumns};
  grid-template-rows: ${containerProps.gridTemplateRows};
  justify-items: ${containerProps.justifyItems};
  align-items: ${containerProps.alignItems};
  justify-content: ${containerProps.justifyContent};
  align-content: ${containerProps.alignContent};
  gap: ${containerProps.gap};
  width: ${containerProps.width};
  height: ${containerProps.height};
}

`;

    items.forEach((item, index) => {
      code += `.item-${index + 1} {
  grid-column: ${item.gridColumn};
  grid-row: ${item.gridRow};
  justify-self: ${item.justifySelf};
  align-self: ${item.alignSelf};
  background-color: ${item.backgroundColor};
}

`;
    });

    if (animateItems) {
      code += `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.container > * {
  animation: fadeIn 0.5s ease-out forwards;
}
`;
    }

    setCssCode(code);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    toast.success("CSS kods nokopēts starpliktuvē!");
  };

  const applyPreset = (presetName: string) => {
    const preset = presetLayouts.find((layout) => layout.name === presetName);
    if (preset) {
      setContainerProps({ ...containerProps, ...preset.config });
      setSelectedPreset(presetName);
      toast.info(`Pielietots izkārtojums: ${presetName}`);
    }
  };

  const saveCurrentLayout = () => {
    const name = prompt("Ievadiet izkārtojuma nosaukumu:");
    if (name) {
      setPresetLayouts([...presetLayouts, { name, config: containerProps }]);
      toast.success(`Izkārtojums "${name}" saglabāts!`);
    }
  };

  const randomizeColors = () => {
    setItems(
      items.map((item) => ({
        ...item,
        backgroundColor: `hsl(${Math.random() * 360}, 70%, 80%)`,
      }))
    );
    toast.info("Elementu krāsas atjaunotas!");
  };

  const generateResponsiveCode = () => {
    let code = cssCode;
    code += `
@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
  }
}
`;
    setCssCode(code);
    toast.info("Pievienots responsīvs kods mobilajām ierīcēm!");
  };

  const exportLayout = () => {
    const layout = {
      containerProps,
      items,
    };
    const blob = new Blob([JSON.stringify(layout)], {
      type: "application/json",
    });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = "grid-layout.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Izkārtojums eksportēts!");
  };

  const importLayout = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const layout = JSON.parse(e.target?.result as string);
          setContainerProps(layout.containerProps);
          setItems(layout.items);
          toast.success("Izkārtojums importēts!");
        } catch (error) {
          toast.error("Kļūda importējot izkārtojumu!");
        }
      };
      reader.readAsText(file);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  const toggleGridLines = () => {
    setShowGridLines(!showGridLines);
  };

  const toggleAnimateItems = () => {
    setAnimateItems(!animateItems);
    generateCSSCode();
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-blue-100 to-white ${
        darkMode ? "dark" : ""
      }`}
    >
      <Head>
        <title>CSS Grid Ģenerators | Interaktīvs Rīks Grid Izveidei</title>
        <meta
          name="description"
          content="Izmantojiet mūsu uzlaboto CSS Grid ģeneratoru, lai viegli izveidotu un vizualizētu sarežģītus Grid izkārtojumus. Ideāls gan iesācējiem, gan pieredzējušiem izstrādātājiem."
        />
        <meta
          name="keywords"
          content="CSS Grid, Grid ģenerators, CSS ģenerators, tīmekļa izstrāde, responsive dizains, Grid tutoriāls"
        />
        <link rel="canonical" href="https://jusudomens.lv/css-grid-generator" />
      </Head>
      <Header />
      <ToastContainer position="bottom-right" autoClose={3000} />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 text-center mb-8">
          CSS Grid Ģenerators
        </h1>

        {/* Preset Layouts */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">
              Gatavie Izkārtojumi
            </h2>
            <div className="flex flex-wrap gap-2">
              {presetLayouts.map((layout) => (
                <button
                  key={layout.name}
                  onClick={() => applyPreset(layout.name)}
                  className={`px-4 py-2 rounded ${
                    selectedPreset === layout.name
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200"
                  }`}
                >
                  {layout.name}
                </button>
              ))}
              <button
                onClick={saveCurrentLayout}
                className="px-4 py-2 rounded bg-blue-500 text-white"
              >
                <FiSave className="inline-block mr-1" /> Saglabāt pašreizējo
              </button>
            </div>
          </div>
        </div>

        {/* Container Settings */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">
              Konteinera Iestatījumi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(containerProps).map(([prop, value]) => (
                <div key={prop}>
                  <label
                    htmlFor={prop}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    {prop}
                  </label>
                  {prop in propertyOptions ? (
                    <select
                      id={prop}
                      value={value}
                      onChange={(e) =>
                        updateContainerProp(prop, e.target.value)
                      }
                      className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                    >
                      {propertyOptions[
                        prop as keyof typeof propertyOptions
                      ].map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={prop}
                      type="text"
                      value={value}
                      onChange={(e) =>
                        updateContainerProp(prop, e.target.value)
                      }
                      className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Grid Preview */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">
              Grid Priekšskatījums
            </h2>
            <div
              className={`border p-4 mb-4 resize-x overflow-auto ${
                showGridLines ? "grid-lines" : ""
              }`}
              style={{
                ...containerProps,
                display: "grid",
                backgroundColor: darkMode ? "#2d3748" : "#f7fafc",
              }}
            >
              {items.map((item, index) => (
                <div
                  key={item.id}
                  style={{
                    gridColumn: item.gridColumn,
                    gridRow: item.gridRow,
                    justifySelf: item.justifySelf,
                    alignSelf: item.alignSelf,
                    backgroundColor: item.backgroundColor,
                    padding: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    animation: animateItems
                      ? `fadeIn 0.5s ease-out ${index * 0.1}s forwards`
                      : "none",
                  }}
                >
                  {item.content}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={addItem}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                <FiPlus className="inline-block mr-1" /> Pievienot Elementu
              </button>
              <button
                onClick={() => removeItem(items[items.length - 1].id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                disabled={items.length <= 1}
              >
                <FiMinus className="inline-block mr-1" /> Noņemt Elementu
              </button>
              <button
                onClick={randomizeColors}
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
              >
                <FiRefreshCw className="inline-block mr-1" /> Mainīt Krāsas
              </button>
              <button
                onClick={generateResponsiveCode}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
              >
                <FiLayout className="inline-block mr-1" /> Pievienot Responsīvo
                Kodu
              </button>
              <button
                onClick={toggleGridLines}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                {showGridLines ? (
                  <FiEyeOff className="inline-block mr-1" />
                ) : (
                  <FiEye className="inline-block mr-1" />
                )}
                {showGridLines ? "Slēpt Grid Līnijas" : "Rādīt Grid Līnijas"}
              </button>
              <button
                onClick={toggleAnimateItems}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
              >
                <FiLoader className="inline-block mr-1" />
                {animateItems ? "Izslēgt Animācijas" : "Ieslēgt Animācijas"}
              </button>
            </div>
          </div>
        </div>

        {/* Item Settings */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">
              Elementu Iestatījumi
            </h2>
            {items.map((item, index) => (
              <div
                key={item.id}
                className="mb-4 p-4 border rounded dark:border-gray-700"
              >
                <h3 className="text-lg font-semibold mb-2 dark:text-gray-100">
                  Elements {index + 1}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(item).map(
                    ([prop, value]) =>
                      prop !== "id" && (
                        <div key={prop}>
                          <label
                            htmlFor={`${item.id}-${prop}`}
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          >
                            {prop}
                          </label>
                          {prop in propertyOptions ? (
                            <select
                              id={`${item.id}-${prop}`}
                              value={value as string}
                              onChange={(e) =>
                                updateItemProp(item.id, prop, e.target.value)
                              }
                              className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                            >
                              {propertyOptions[
                                prop as keyof typeof propertyOptions
                              ].map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              id={`${item.id}-${prop}`}
                              type={
                                prop === "backgroundColor" ? "color" : "text"
                              }
                              value={value as string}
                              onChange={(e) =>
                                updateItemProp(item.id, prop, e.target.value)
                              }
                              className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                            />
                          )}
                        </div>
                      )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Generated CSS Code */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">
              Ģenerētais CSS Kods
            </h2>
            <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm dark:text-gray-300">{cssCode}</code>
            </pre>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={copyToClipboard}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                <FiCopy className="inline-block mr-1" /> Kopēt CSS Kodu
              </button>
              <button
                onClick={exportLayout}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                <FiDownload className="inline-block mr-1" /> Eksportēt
                Izkārtojumu
              </button>
              <label className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded cursor-pointer">
                <FiUpload className="inline-block mr-1" /> Importēt Izkārtojumu
                <input
                  type="file"
                  accept=".json"
                  onChange={importLayout}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Grid Tutorial */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h2
              className="text-2xl font-bold mb-4 flex items-center cursor-pointer dark:text-gray-100"
              onClick={() => setShowHelp(!showHelp)}
            >
              <FiInfo className="mr-2" />
              CSS Grid Pamācība
              <span className="ml-2 text-sm text-blue-600 dark:text-blue-400">
                {showHelp ? "Aizvērt" : "Atvērt"}
              </span>
            </h2>
            {showHelp && (
              <div className="mt-4 dark:text-gray-300">
                <h3 className="text-xl font-semibold mb-2">Kas ir CSS Grid?</h3>
                <p className="mb-4">
                  CSS Grid ir divu dimensiju izkārtojuma sistēma, kas ļauj
                  viegli izveidot sarežģītus un elastīgus dizainus. Tas piedāvā
                  precīzu kontroli pār elementu novietojumu un izmēriem gan
                  horizontāli, gan vertikāli.
                </p>

                <h3 className="text-xl font-semibold mb-2">
                  Galvenās Grid Īpašības
                </h3>
                <ul className="list-disc list-inside mb-4">
                  <li>
                    <strong>grid-template-columns:</strong> Definē kolonnu
                    izmērus un skaitu.
                  </li>
                  <li>
                    <strong>grid-template-rows:</strong> Definē rindu izmērus un
                    skaitu.
                  </li>
                  <li>
                    <strong>gap:</strong> Nosaka atstarpi starp grid elementiem.
                  </li>
                  <li>
                    <strong>justify-items / align-items:</strong> Kontrolē
                    elementu novietojumu šūnās.
                  </li>
                  <li>
                    <strong>justify-content / align-content:</strong> Kontrolē
                    visa grid novietojumu konteinerā.
                  </li>
                </ul>

                <h3 className="text-xl font-semibold mb-2">
                  Kā Lietot Šo Rīku
                </h3>
                <ol className="list-decimal list-inside mb-4">
                  <li>
                    Izvēlieties gatavu izkārtojumu vai sāciet ar tukšu grid.
                  </li>
                  <li>
                    Pielāgojiet konteinera iestatījumus, lai definētu grid
                    struktūru.
                  </li>
                  <li>Pievienojiet vai noņemiet elementus pēc vajadzības.</li>
                  <li>
                    Konfigurējiet katra elementa individuālos iestatījumus.
                  </li>
                  <li>
                    Izmantojiet priekšskatījumu, lai redzētu izmaiņas reāllaikā.
                  </li>
                  <li>
                    Kopējiet ģenerēto CSS kodu un izmantojiet to savā projektā.
                  </li>
                </ol>

                <h3 className="text-xl font-semibold mb-2">
                  Padomi Efektīvai Grid Lietošanai
                </h3>
                <ul className="list-disc list-inside mb-4">
                  <li>Izmantojiet fr vienības elastīgam izkārtojumam.</li>
                  <li>
                    Lietojiet auto-fill un auto-fit funkcijas responsīvam
                    dizainam.
                  </li>
                  <li>
                    Eksperimentējiet ar dažādām grid-area vērtībām sarežģītiem
                    izkārtojumiem.
                  </li>
                  <li>Kombinējiet Grid ar Flexbox optimālam rezultātam.</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">
              Par CSS Grid Ģeneratoru
            </h2>
            <p className="mb-4 dark:text-gray-300">
              Mūsu CSS Grid Ģenerators ir izstrādāts, lai palīdzētu web
              izstrādātājiem un dizaineriem ātri un efektīvi izveidot Grid
              izkārtojumus. Neatkarīgi no tā, vai esat iesācējs, kas tikai sāk
              apgūt CSS Grid, vai pieredzējis izstrādātājs, kas meklē ātru
              risinājumu, šis rīks ir paredzēts, lai atvieglotu jūsu darbu.
            </p>
            <p className="mb-4 dark:text-gray-300">Ar šo rīku jūs varat:</p>
            <ul className="list-disc list-inside mb-4 dark:text-gray-300">
              <li>Vizuāli izveidot un pielāgot Grid izkārtojumus</li>
              <li>Izmantot gatavas izkārtojumu veidnes</li>
              <li>
                Pielāgot gan konteinera, gan individuālo elementu iestatījumus
              </li>
              <li>Redzēt izmaiņas reāllaikā interaktīvā priekšskatījumā</li>
              <li>Ģenerēt tīru un gatavu lietošanai CSS kodu</li>
              <li>Eksperimentēt ar dažādām Grid īpašībām un to vērtībām</li>
              <li>Pievienot responsīvu kodu mobilajām ierīcēm</li>
              <li>Saglabāt un ātri pielietot pielāgotus izkārtojumus</li>
            </ul>
            <p className="dark:text-gray-300">
              Mēs ceram, ka šis rīks palīdzēs jums labāk izprast un efektīvāk
              izmantot CSS Grid savos projektos, ļaujot izveidot modernas un
              responsīvas tīmekļa vietnes ar mazāk piepūles!
            </p>
          </div>
        </div>
      </main>

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="fixed bottom-4 right-4 bg-gray-200 dark:bg-gray-700 p-2 rounded-full shadow-lg"
      >
        {darkMode ? (
          <FiSun className="text-yellow-500" />
        ) : (
          <FiMoon className="text-gray-700" />
        )}
      </button>
    </div>
  );
};

export default CSSGridGenerator;
