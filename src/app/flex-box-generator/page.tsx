"use client";

import React, { useState, useEffect } from "react";
import { FiPlus, FiMinus, FiCode, FiCopy, FiInfo } from "react-icons/fi";
import Head from "next/head";
import Header from "../../components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FlexItem = {
  id: number;
  width: string;
  height: string;
  order: number;
  flexGrow: number;
  flexShrink: number;
  flexBasis: string;
  alignSelf: string;
};

const propertyOptions = {
  flexDirection: ["row", "row-reverse", "column", "column-reverse"],
  justifyContent: [
    "flex-start",
    "flex-end",
    "center",
    "space-between",
    "space-around",
    "space-evenly",
  ],
  alignItems: ["flex-start", "flex-end", "center", "baseline", "stretch"],
  flexWrap: ["nowrap", "wrap", "wrap-reverse"],
  alignSelf: [
    "auto",
    "flex-start",
    "flex-end",
    "center",
    "baseline",
    "stretch",
  ],
};

const CSSFlexboxĢenerators: React.FC = () => {
  const [containerProps, setContainerProps] = useState({
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "stretch",
    flexWrap: "nowrap",
  });
  const [items, setItems] = useState<FlexItem[]>([
    {
      id: 1,
      width: "100px",
      height: "100px",
      order: 0,
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: "auto",
      alignSelf: "auto",
    },
    {
      id: 2,
      width: "100px",
      height: "100px",
      order: 0,
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: "auto",
      alignSelf: "auto",
    },
    {
      id: 3,
      width: "100px",
      height: "100px",
      order: 0,
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: "auto",
      alignSelf: "auto",
    },
  ]);
  const [cssCode, setCssCode] = useState<string>("");
  const [showHelp, setShowHelp] = useState<boolean>(false);

  useEffect(() => {
    generateCSSCode();
  }, [containerProps, items]);

  const addItem = () => {
    const newId = Math.max(...items.map((item) => item.id), 0) + 1;
    setItems([
      ...items,
      {
        id: newId,
        width: "100px",
        height: "100px",
        order: 0,
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: "auto",
        alignSelf: "auto",
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

  const updateItemProp = (id: number, prop: string, value: string | number) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [prop]: value } : item))
    );
  };

  const generateCSSCode = () => {
    let code = `.container {
  display: flex;
  flex-direction: ${containerProps.flexDirection};
  justify-content: ${containerProps.justifyContent};
  align-items: ${containerProps.alignItems};
  flex-wrap: ${containerProps.flexWrap};
}

`;

    items.forEach((item, index) => {
      code += `.item-${index + 1} {
  width: ${item.width};
  height: ${item.height};
  order: ${item.order};
  flex-grow: ${item.flexGrow};
  flex-shrink: ${item.flexShrink};
  flex-basis: ${item.flexBasis};
  align-self: ${item.alignSelf};
}

`;
    });

    setCssCode(code);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    toast.success("CSS kods nokopēts starpliktuvē!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <Head>
        <title>CSS Flexbox Ģenerators | Vienkāršs Rīks Flexbox Izveidei</title>
        <meta
          name="description"
          content="Izmantojiet mūsu bezmaksas CSS Flexbox ģeneratoru, lai viegli izveidotu un vizualizētu Flexbox izkārtojumus. Iegūstiet gatavu CSS kodu saviem projektiem un uzlabojiet savas tīmekļa dizaina prasmes."
        />
        <meta
          name="keywords"
          content="CSS Flexbox, Flexbox ģenerators, CSS ģenerators, tīmekļa izstrāde, responsive dizains, Flexbox tutoriāls"
        />
        <link
          rel="canonical"
          href="https://jusudomens.lv/css-flexbox-generator"
        />
        <meta
          property="og:title"
          content="CSS Flexbox Ģenerators | Vienkāršs Rīks Flexbox Izveidei"
        />
        <meta
          property="og:description"
          content="Radiet pielāgotus Flexbox izkārtojumus ar mūsu interaktīvo rīku. Ideāls gan iesācējiem, gan pieredzējušiem izstrādātājiem."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://jusudomens.lv/css-flexbox-generator"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="CSS Flexbox Ģenerators | Vienkāršs Rīks Flexbox Izveidei"
        />
        <meta
          name="twitter:description"
          content="Radiet pielāgotus Flexbox izkārtojumus ar mūsu interaktīvo rīku. Ideāls gan iesācējiem, gan pieredzējušiem izstrādātājiem."
        />
      </Head>
      <Header />
      <ToastContainer position="bottom-right" autoClose={3000} />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center mb-8">
          CSS Flexbox Ģenerators
        </h1>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold mb-4">Konteinera Iestatījumi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(containerProps).map(([prop, value]) => (
                <div key={prop}>
                  <label
                    htmlFor={prop}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {prop}
                  </label>
                  <select
                    id={prop}
                    value={value}
                    onChange={(e) => updateContainerProp(prop, e.target.value)}
                    className="w-full px-3 py-2 text-gray-700 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {propertyOptions[prop as keyof typeof propertyOptions].map(
                      (option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      )
                    )}
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold mb-4">Flexbox Priekšskatījums</h2>
            <div
              className="border p-4 mb-4"
              style={{ ...containerProps, display: "flex", minHeight: "200px" }}
            >
              {items.map((item, index) => (
                <div
                  key={item.id}
                  style={{
                    width: item.width,
                    height: item.height,
                    order: item.order,
                    flexGrow: item.flexGrow,
                    flexShrink: item.flexShrink,
                    flexBasis: item.flexBasis,
                    alignSelf: item.alignSelf as any,
                    backgroundColor: `hsl(${index * 60}, 70%, 80%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "5px",
                  }}
                >
                  Item {index + 1}
                </div>
              ))}
            </div>
            <button
              onClick={addItem}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
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
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold mb-4">Elementu Iestatījumi</h2>
            {items.map((item, index) => (
              <div key={item.id} className="mb-4 p-4 border rounded">
                <h3 className="text-lg font-semibold mb-2">
                  Elements {index + 1}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(item).map(
                    ([prop, value]) =>
                      prop !== "id" && (
                        <div key={prop}>
                          <label
                            htmlFor={`${item.id}-${prop}`}
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            {prop}
                          </label>
                          {prop === "alignSelf" ? (
                            <select
                              id={`${item.id}-${prop}`}
                              value={value as string}
                              onChange={(e) =>
                                updateItemProp(item.id, prop, e.target.value)
                              }
                              className="w-full px-3 py-2 text-gray-700 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            >
                              {propertyOptions.alignSelf.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              id={`${item.id}-${prop}`}
                              type={
                                typeof value === "number" ? "number" : "text"
                              }
                              value={value}
                              onChange={(e) =>
                                updateItemProp(item.id, prop, e.target.value)
                              }
                              className="w-full px-3 py-2 text-gray-700 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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

        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold mb-4">Ģenerētais CSS Kods</h2>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
              <code>{cssCode}</code>
            </pre>
            <button
              onClick={copyToClipboard}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              <FiCopy className="inline-block mr-1" /> Kopēt CSS Kodu
            </button>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h2
              className="text-2xl font-bold mb-4 flex items-center cursor-pointer"
              onClick={() => setShowHelp(!showHelp)}
            >
              <FiInfo className="mr-2" />
              Flexbox Pamācība
              <span className="ml-2 text-sm text-blue-600">
                {showHelp ? "Aizvērt" : "Atvērt"}
              </span>
            </h2>
            {showHelp && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Kas ir Flexbox?</h3>
                <p className="mb-4">
                  Flexbox ir CSS izkārtojuma modelis, kas ļauj viegli izveidot
                  elastīgus un atsaucīgus izkārtojumus. Tas ir īpaši noderīgs,
                  veidojot viendimensiju izkārtojumus.
                </p>

                <h3 className="text-xl font-semibold mb-2">
                  Galvenās Flexbox Īpašības
                </h3>
                <ul className="list-disc list-inside mb-4">
                  <li>
                    <strong>flex-direction:</strong> Nosaka galveno asi (row vai
                    column).
                  </li>
                  <li>
                    <strong>align-items:</strong> Izlīdzina elementus pa
                    šķērsasi.
                  </li>
                  <li>
                    <strong>flex-wrap:</strong> Nosaka, vai elementi var pāriet
                    jaunā rindā.
                  </li>
                </ul>

                <h3 className="text-xl font-semibold mb-2">
                  Kā Lietot Šo Rīku
                </h3>
                <ol className="list-decimal list-inside mb-4">
                  <li>
                    Izmantojiet "Konteinera Iestatījumi", lai mainītu galvenā
                    Flexbox konteinera īpašības.
                  </li>
                  <li>
                    Pievienojiet vai noņemiet elementus, izmantojot pogas zem
                    priekšskatījuma.
                  </li>
                  <li>
                    Pielāgojiet katra elementa īpašības "Elementu Iestatījumi"
                    sadaļā.
                  </li>
                  <li>Apskatiet izmaiņas reāllaikā priekšskatījumā.</li>
                  <li>
                    Kad esat apmierināts ar rezultātu, nokopējiet ģenerēto CSS
                    kodu.
                  </li>
                </ol>

                <h3 className="text-xl font-semibold mb-2">
                  Padomi Iesācējiem
                </h3>
                <ul className="list-disc list-inside mb-4">
                  <li>
                    Sāciet ar vienkāršu izkārtojumu un pakāpeniski pievienojiet
                    sarežģītības.
                  </li>
                  <li>
                    Eksperimentējiet ar dažādām īpašību vērtībām, lai labāk
                    izprastu to ietekmi.
                  </li>
                  <li>
                    Pievērsiet uzmanību, kā mainās izkārtojums, mainot
                    konteinera izmēru.
                  </li>
                  <li>
                    Izmantojiet šo rīku kopā ar CSS dokumentāciju, lai
                    padziļinātu izpratni.
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold mb-4">
              Par CSS Flexbox Ģeneratoru
            </h2>
            <p className="mb-4">
              Mūsu CSS Flexbox Ģenerators ir izstrādāts, lai palīdzētu web
              izstrādātājiem un dizaineriem ātri un efektīvi izveidot Flexbox
              izkārtojumus. Neatkarīgi no tā, vai esat iesācējs, kas tikai sāk
              apgūt Flexbox, vai pieredzējis izstrādātājs, kas meklē ātru
              risinājumu, šis rīks ir paredzēts, lai atvieglotu jūsu darbu.
            </p>
            <p className="mb-4">Ar šo rīku jūs varat:</p>
            <ul className="list-disc list-inside mb-4">
              <li>Vizuāli izveidot un pielāgot Flexbox izkārtojumus</li>
              <li>Redzēt izmaiņas reāllaikā</li>
              <li>Eksperimentēt ar dažādām Flexbox īpašībām</li>
              <li>Ģenerēt tīru un gatavu lietošanai CSS kodu</li>
              <li>Ātri kopēt CSS kodu saviem projektiem</li>
            </ul>
            <p>
              Mēs ceram, ka šis rīks palīdzēs jums labāk izprast un efektīvāk
              izmantot CSS Flexbox savos projektos!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CSSFlexboxĢenerators;
