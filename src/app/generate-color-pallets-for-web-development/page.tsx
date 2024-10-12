"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiRefreshCw,
  FiCopy,
  FiSave,
  FiTrash2,
  FiInfo,
  FiDownload,
  FiLock,
  FiUnlock,
  FiSliders,
  FiCode,
  FiChevronLeft,
  FiChevronRight,
  FiEdit,
} from "react-icons/fi";
import Head from "next/head";
import Header from "../../components/Header";
import html2canvas from "html2canvas";

type ColorPalette = {
  id: string;
  colors: string[];
  name: string;
  tags: string[];
};

type WebsitePreviewColors = {
  header: string;
  nav: string;
  sidebar: string;
  mainContent: string;
  button: string;
};

const PaletteTypes = [
  { value: "analogous", label: "Analogā" },
  { value: "monochromatic", label: "Monohromatiskā" },
  { value: "complementary", label: "Komplementārā" },
  { value: "triadic", label: "Triādiskā" },
  { value: "tetradic", label: "Tetrādiskā" },
  { value: "split-complementary", label: "Dalītā komplementārā" },
];

const KrāsuPalešuMeistars: React.FC = () => {
  const [baseColor, setBaseColor] = useState<string>("#4ECDC4");
  const [paletteType, setPaletteType] = useState<string>("analogous");
  const [palettes, setPalettes] = useState<string[][]>([]);
  const [currentPaletteIndex, setCurrentPaletteIndex] = useState<number>(0);
  const [savedPalettes, setSavedPalettes] = useState<ColorPalette[]>([]);
  const [showGuide, setShowGuide] = useState<boolean>(false);
  const [colorblindMode, setColorblindMode] = useState<string>("normal");
  const [lockedColors, setLockedColors] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [showCSSCode, setShowCSSCode] = useState<boolean>(false);
  const [showAccessibility, setShowAccessibility] = useState<boolean>(false);
  const paletteRef = useRef<HTMLDivElement>(null);
  const [previewStyle, setPreviewStyle] = useState<"light" | "dark">("light");
  const [websitePreviewColors, setWebsitePreviewColors] =
    useState<WebsitePreviewColors>({
      header: "",
      nav: "",
      sidebar: "",
      mainContent: "",
      button: "",
    });
  const [editingElement, setEditingElement] = useState<string | null>(null);

  useEffect(() => {
    generatePalettes();
  }, [baseColor, paletteType]);

  useEffect(() => {
    updateWebsitePreviewColors();
  }, [palettes, currentPaletteIndex]);

  const generatePalettes = () => {
    const newPalettes = Array(10)
      .fill(null)
      .map(() => generatePalette(baseColor, paletteType));
    setPalettes(newPalettes);
    setCurrentPaletteIndex(0);
  };

  const generatePalette = (base: string, type: string): string[] => {
    const hslBase = hexToHSL(base);
    let palette: string[] = [];

    switch (type) {
      case "analogous":
        palette = [
          base,
          hslToHex([(hslBase[0] + 30) % 360, hslBase[1], hslBase[2]]),
          hslToHex([(hslBase[0] + 60) % 360, hslBase[1], hslBase[2]]),
          hslToHex([(hslBase[0] - 30 + 360) % 360, hslBase[1], hslBase[2]]),
          hslToHex([(hslBase[0] - 60 + 360) % 360, hslBase[1], hslBase[2]]),
        ];
        break;
      case "monochromatic":
        palette = [
          base,
          hslToHex([hslBase[0], Math.max(0, hslBase[1] - 20), hslBase[2]]),
          hslToHex([hslBase[0], Math.min(100, hslBase[1] + 20), hslBase[2]]),
          hslToHex([hslBase[0], hslBase[1], Math.max(0, hslBase[2] - 20)]),
          hslToHex([hslBase[0], hslBase[1], Math.min(100, hslBase[2] + 20)]),
        ];
        break;
      case "complementary":
        const complement = (hslBase[0] + 180) % 360;
        palette = [
          base,
          hslToHex([complement, hslBase[1], hslBase[2]]),
          hslToHex([hslBase[0], Math.max(0, hslBase[1] - 20), hslBase[2]]),
          hslToHex([complement, Math.max(0, hslBase[1] - 20), hslBase[2]]),
          hslToHex([hslBase[0], hslBase[1], Math.min(100, hslBase[2] + 20)]),
        ];
        break;
      case "triadic":
        palette = [
          base,
          hslToHex([(hslBase[0] + 120) % 360, hslBase[1], hslBase[2]]),
          hslToHex([(hslBase[0] + 240) % 360, hslBase[1], hslBase[2]]),
          hslToHex([hslBase[0], Math.max(0, hslBase[1] - 20), hslBase[2]]),
          hslToHex([hslBase[0], hslBase[1], Math.min(100, hslBase[2] + 20)]),
        ];
        break;
      case "tetradic":
        palette = [
          base,
          hslToHex([(hslBase[0] + 90) % 360, hslBase[1], hslBase[2]]),
          hslToHex([(hslBase[0] + 180) % 360, hslBase[1], hslBase[2]]),
          hslToHex([(hslBase[0] + 270) % 360, hslBase[1], hslBase[2]]),
          hslToHex([hslBase[0], Math.max(0, hslBase[1] - 20), hslBase[2]]),
        ];
        break;
      case "split-complementary":
        palette = [
          base,
          hslToHex([(hslBase[0] + 150) % 360, hslBase[1], hslBase[2]]),
          hslToHex([(hslBase[0] + 210) % 360, hslBase[1], hslBase[2]]),
          hslToHex([hslBase[0], Math.max(0, hslBase[1] - 20), hslBase[2]]),
          hslToHex([hslBase[0], hslBase[1], Math.min(100, hslBase[2] + 20)]),
        ];
        break;
      default:
        palette = [base, base, base, base, base];
    }

    return palette.map((color, index) =>
      lockedColors[index]
        ? palettes[currentPaletteIndex]?.[index] || color
        : adjustBrightness(color, Math.random() * 40 - 20)
    );
  };

  const updateWebsitePreviewColors = () => {
    const currentPalette = palettes[currentPaletteIndex] || [];
    setWebsitePreviewColors({
      header: currentPalette[0] || "#FFFFFF",
      nav: currentPalette[1] || "#FFFFFF",
      sidebar: currentPalette[2] || "#FFFFFF",
      mainContent: currentPalette[3] || "#FFFFFF",
      button: currentPalette[4] || "#FFFFFF",
    });
  };

  const hexToHSL = (hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return [0, 0, 0];
    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h = 0,
      s,
      l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  };

  const hslToHex = ([h, s, l]: [number, number, number]): string => {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const adjustBrightness = (hex: string, percent: number): string => {
    const hsl = hexToHSL(hex);
    hsl[2] = Math.max(0, Math.min(100, hsl[2] + percent));
    return hslToHex(hsl);
  };

  const getContrastColor = (hexColor: string): string => {
    const hsl = hexToHSL(hexColor);
    return hsl[2] > 50 ? "#000000" : "#FFFFFF";
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const savePalette = () => {
    const newPalette: ColorPalette = {
      id: Date.now().toString(),
      colors: palettes[currentPaletteIndex],
      name: `Palete ${savedPalettes.length + 1}`,
      tags: [paletteType],
    };
    setSavedPalettes([...savedPalettes, newPalette]);
  };

  const deletePalette = (id: string) => {
    setSavedPalettes(savedPalettes.filter((p) => p.id !== id));
  };

  const nextPalette = () => {
    setCurrentPaletteIndex((prevIndex) => (prevIndex + 1) % palettes.length);
  };

  const prevPalette = () => {
    setCurrentPaletteIndex(
      (prevIndex) => (prevIndex - 1 + palettes.length) % palettes.length
    );
  };

  const toggleColorLock = (index: number) => {
    const newLockedColors = [...lockedColors];
    newLockedColors[index] = !newLockedColors[index];
    setLockedColors(newLockedColors);
  };

  const applyColorblindFilter = (color: string): string => {
    const rgb = hexToRGB(color);
    switch (colorblindMode) {
      case "protanopia":
        return rgbToHex([rgb[1], rgb[1], rgb[2]]);
      case "deuteranopia":
        return rgbToHex([rgb[0], rgb[0], rgb[2]]);
      case "tritanopia":
        return rgbToHex([rgb[0], rgb[1], rgb[1]]);
      default:
        return color;
    }
  };

  const exportPalette = async () => {
    if (paletteRef.current) {
      const canvas = await html2canvas(paletteRef.current);
      const image = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const link = document.createElement("a");
      link.download = "my-color-palette.png";
      link.href = image;
      link.click();
    }
  };

  const generateCSSVariables = () => {
    const currentPalette = palettes[currentPaletteIndex];
    return `
:root {
  --color-primary: ${currentPalette[0]};
  --color-secondary: ${currentPalette[1]};
  --color-accent: ${currentPalette[2]};
  --color-background: ${currentPalette[3]};
  --color-text: ${currentPalette[4]};
}
    `;
  };

  const checkAccessibility = () => {
    const currentPalette = palettes[currentPaletteIndex];
    const results = [];
    for (let i = 0; i < currentPalette.length; i++) {
      for (let j = i + 1; j < currentPalette.length; j++) {
        const contrast = getContrastRatio(currentPalette[i], currentPalette[j]);
        results.push({
          color1: currentPalette[i],
          color2: currentPalette[j],
          contrast: contrast,
          passes: {
            AA: contrast >= 4.5,
            AAA: contrast >= 7,
          },
        });
      }
    }
    return results;
  };

  const getContrastRatio = (color1: string, color2: string) => {
    const lum1 = getLuminance(color1);
    const lum2 = getLuminance(color2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  };

  const getLuminance = (color: string) => {
    const rgb = hexToRGB(color);
    const a = rgb.map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const hexToRGB = (hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
        ]
      : [0, 0, 0];
  };

  const rgbToHex = ([r, g, b]: [number, number, number]): string => {
    return (
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  };

  const getColorFromPalette = (index: number): string => {
    return palettes[currentPaletteIndex]?.[index] || "#FFFFFF";
  };

  const handleElementColorChange = (
    element: keyof WebsitePreviewColors,
    color: string
  ) => {
    setWebsitePreviewColors((prev) => ({ ...prev, [element]: color }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <Head>
        <title>Krāsu Palešu Meistars | Inovatīvs Rīks Web Izstrādātājiem</title>
        <meta
          name="description"
          content="Revolucionārs krāsu palešu ģenerators web izstrādātājiem ar reāllaika priekšskatījumu, pieejamības pārbaudi un CSS koda ģenerēšanu. Radiet unikālas un pielāgotas krāsu shēmas jūsu projektiem."
        />
        <meta
          name="keywords"
          content="krāsu palete, web dizains, krāsu shēma, pieejamība, CSS variables, web izstrāde"
        />
        <link
          rel="canonical"
          href="https://jusudomens.lv/krasu-palesu-meistars"
        />
      </Head>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center mb-8">
          Krāsu Palešu Meistars
        </h1>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label
                  htmlFor="baseColor"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Pamata krāsa
                </label>
                <input
                  type="color"
                  id="baseColor"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="w-full h-10 rounded-md cursor-pointer"
                />
              </div>
              <div>
                <label
                  htmlFor="paletteType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Paletes tips
                </label>
                <select
                  id="paletteType"
                  value={paletteType}
                  onChange={(e) => setPaletteType(e.target.value)}
                  className="w-full px-3 py-2 text-gray-700 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {PaletteTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="colorblindMode"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Krāsu akluma simulācija
                </label>
                <select
                  id="colorblindMode"
                  value={colorblindMode}
                  onChange={(e) => setColorblindMode(e.target.value)}
                  className="w-full px-3 py-2 text-gray-700 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="normal">Normāls redzes</option>
                  <option value="protanopia">Protanopija</option>
                  <option value="deuteranopia">Deiteranopija</option>
                  <option value="tritanopia">Tritanopija</option>
                </select>
              </div>
            </div>

            <button
              onClick={generatePalettes}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out flex items-center justify-center mb-6"
            >
              <FiRefreshCw className="mr-2" />
              Ģenerēt Jaunas Paletes
            </button>

            <div className="relative mb-6" ref={paletteRef}>
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={prevPalette}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FiChevronLeft size={24} />
                </button>
                <span className="text-gray-600">
                  Palete {currentPaletteIndex + 1} no {palettes.length}
                </span>
                <button
                  onClick={nextPalette}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FiChevronRight size={24} />
                </button>
              </div>
              <div className="grid grid-cols-5 gap-4">
                {palettes[currentPaletteIndex]?.map((color, index) => (
                  <div
                    key={index}
                    className="relative h-24 rounded-lg shadow-md flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105"
                    style={{ backgroundColor: applyColorblindFilter(color) }}
                    onClick={() => copyToClipboard(color)}
                  >
                    <span style={{ color: getContrastColor(color) }}>
                      {color}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleColorLock(index);
                      }}
                      className="absolute top-1 right-1 bg-white rounded-full p-1"
                    >
                      {lockedColors[index] ? <FiLock /> : <FiUnlock />}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={savePalette}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out flex items-center justify-center"
              >
                <FiSave className="mr-2" />
                Saglabāt Paleti
              </button>
              <button
                onClick={exportPalette}
                className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out flex items-center justify-center"
              >
                <FiDownload className="mr-2" />
                Eksportēt PNG
              </button>
              <button
                onClick={() => setShowCSSCode(!showCSSCode)}
                className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out flex items-center justify-center"
              >
                <FiCode className="mr-2" />
                CSS Kods
              </button>
              <button
                onClick={() => setShowAccessibility(!showAccessibility)}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out flex items-center justify-center"
              >
                <FiSliders className="mr-2" />
                Pieejamība
              </button>
            </div>

            {showCSSCode && (
              <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">CSS Mainīgie</h3>
                <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
                  <code>{generateCSSVariables()}</code>
                </pre>
                <button
                  onClick={() => copyToClipboard(generateCSSVariables())}
                  className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded text-sm"
                >
                  Kopēt CSS
                </button>
              </div>
            )}

            {showAccessibility && (
              <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">
                  Pieejamības Pārbaude
                </h3>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>Krāsa 1</th>
                      <th>Krāsa 2</th>
                      <th>Kontrasts</th>
                      <th>AA</th>
                      <th>AAA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {checkAccessibility().map((result, index) => (
                      <tr key={index}>
                        <td style={{ backgroundColor: result.color1 }}>
                          {result.color1}
                        </td>
                        <td style={{ backgroundColor: result.color2 }}>
                          {result.color2}
                        </td>
                        <td>{result.contrast.toFixed(2)}</td>
                        <td>{result.passes.AA ? "✅" : "❌"}</td>
                        <td>{result.passes.AAA ? "✅" : "❌"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold mb-4">
              Tīmekļa Vietnes Priekšskatījums
            </h2>
            <div className="mb-4">
              <label className="mr-4">
                <input
                  type="radio"
                  value="light"
                  checked={previewStyle === "light"}
                  onChange={() => setPreviewStyle("light")}
                  className="mr-2"
                />
                Gaišs Režīms
              </label>
              <label>
                <input
                  type="radio"
                  value="dark"
                  checked={previewStyle === "dark"}
                  onChange={() => setPreviewStyle("dark")}
                  className="mr-2"
                />
                Tumšs Režīms
              </label>
            </div>
            <div
              className="border rounded-lg p-4"
              style={{
                backgroundColor:
                  previewStyle === "light"
                    ? websitePreviewColors.mainContent
                    : getContrastColor(websitePreviewColors.mainContent),
                color:
                  previewStyle === "light"
                    ? getContrastColor(websitePreviewColors.mainContent)
                    : websitePreviewColors.mainContent,
              }}
            >
              <header
                style={{
                  backgroundColor: websitePreviewColors.header,
                  color: getContrastColor(websitePreviewColors.header),
                }}
                className="p-4 mb-4 relative"
              >
                <h1 className="text-2xl font-bold">Mana Tīmekļa Vietne</h1>
                <div
                  onClick={() => setEditingElement("header")}
                  className="absolute top-1 right-1 bg-white rounded-full p-1 cursor-pointer"
                >
                  <FiEdit />
                </div>
                {editingElement === "header" && (
                  <input
                    type="color"
                    value={websitePreviewColors.header}
                    onChange={(e) =>
                      handleElementColorChange("header", e.target.value)
                    }
                    className="absolute top-1 right-8 w-8 h-8"
                  />
                )}
              </header>
              <nav
                style={{
                  backgroundColor: websitePreviewColors.nav,
                  color: getContrastColor(websitePreviewColors.nav),
                }}
                className="p-2 mb-4 relative"
              >
                <ul className="flex space-x-4">
                  <li>Sākums</li>
                  <li>Par Mums</li>
                  <li>Pakalpojumi</li>
                  <li>Kontakti</li>
                </ul>
                <div
                  onClick={() => setEditingElement("nav")}
                  className="absolute top-1 right-1 bg-white rounded-full p-1 cursor-pointer"
                >
                  <FiEdit />
                </div>
                {editingElement === "nav" && (
                  <input
                    type="color"
                    value={websitePreviewColors.nav}
                    onChange={(e) =>
                      handleElementColorChange("nav", e.target.value)
                    }
                    className="absolute top-1 right-8 w-8 h-8"
                  />
                )}
              </nav>
              <main className="flex">
                <aside
                  style={{
                    backgroundColor: websitePreviewColors.sidebar,
                    color: getContrastColor(websitePreviewColors.sidebar),
                  }}
                  className="w-1/4 p-4 mr-4 relative"
                >
                  <h2 className="text-xl font-semibold mb-2">Sānu Josla</h2>
                  <ul>
                    <li>Saite 1</li>
                    <li>Saite 2</li>
                    <li>Saite 3</li>
                  </ul>
                  <div
                    onClick={() => setEditingElement("sidebar")}
                    className="absolute top-1 right-1 bg-white rounded-full p-1 cursor-pointer"
                  >
                    <FiEdit />
                  </div>
                  {editingElement === "sidebar" && (
                    <input
                      type="color"
                      value={websitePreviewColors.sidebar}
                      onChange={(e) =>
                        handleElementColorChange("sidebar", e.target.value)
                      }
                      className="absolute top-1 right-8 w-8 h-8"
                    />
                  )}
                </aside>
                <section className="w-3/4 relative">
                  <h2 className="text-xl font-semibold mb-2">
                    Galvenais Saturs
                  </h2>
                  <p>
                    Šis ir piemēra teksts, lai parādītu, kā jūsu izvēlētā krāsu
                    palete izskatīsies reālā tīmekļa vietnē. Pielāgojiet krāsas,
                    lai redzētu, kā tās ietekmē dažādus vietnes elementus.
                  </p>
                  <div className="mt-4 relative inline-block">
                    <button
                      style={{
                        backgroundColor: websitePreviewColors.button,
                        color: getContrastColor(websitePreviewColors.button),
                      }}
                      className="px-4 py-2 rounded"
                    >
                      Pogas Piemērs
                    </button>
                    <div
                      onClick={() => setEditingElement("button")}
                      className="absolute top-1 right-1 bg-white rounded-full p-1 cursor-pointer"
                    >
                      <FiEdit />
                    </div>
                    {editingElement === "button" && (
                      <input
                        type="color"
                        value={websitePreviewColors.button}
                        onChange={(e) =>
                          handleElementColorChange("button", e.target.value)
                        }
                        className="absolute top-1 right-8 w-8 h-8"
                      />
                    )}
                  </div>
                  <div
                    onClick={() => setEditingElement("mainContent")}
                    className="absolute top-1 right-1 bg-white rounded-full p-1 cursor-pointer"
                  >
                    <FiEdit />
                  </div>
                  {editingElement === "mainContent" && (
                    <input
                      type="color"
                      value={websitePreviewColors.mainContent}
                      onChange={(e) =>
                        handleElementColorChange("mainContent", e.target.value)
                      }
                      className="absolute top-1 right-8 w-8 h-8"
                    />
                  )}
                </section>
              </main>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold mb-4">Saglabātās Paletes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedPalettes.map((palette) => (
                <div key={palette.id} className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">{palette.name}</h3>
                  <div className="flex mb-2">
                    {palette.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 cursor-pointer"
                        style={{ backgroundColor: color }}
                        onClick={() => copyToClipboard(color)}
                      ></div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {palette.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => copyToClipboard(palette.colors.join(", "))}
                      className="text-blue-600 hover:text-blue-800 text-sm focus:outline-none"
                    >
                      <FiCopy className="inline mr-1" />
                      Kopēt Visas
                    </button>
                    <button
                      onClick={() => deletePalette(palette.id)}
                      className="text-red-600 hover:text-red-800 text-sm focus:outline-none"
                    >
                      <FiTrash2 className="inline mr-1" />
                      Dzēst
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h2
              className="text-2xl font-bold mb-4 flex items-center cursor-pointer"
              onClick={() => setShowGuide(!showGuide)}
            >
              <FiInfo className="mr-2" />
              Krāsu teorijas un izmantošanas ceļvedis
              <span className="ml-2 text-sm text-blue-600">
                {showGuide ? "Aizvērt" : "Atvērt"}
              </span>
            </h2>
            <AnimatePresence>
              {showGuide && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mt-4 text-gray-700">
                    <h3 className="text-xl font-semibold mb-2">
                      Krāsu palešu efektīva izmantošana web dizainā
                    </h3>
                    <ul className="list-disc list-inside space-y-2 mb-4">
                      <li>
                        <strong>60-30-10 likums:</strong> Izmantojiet galveno
                        krāsu 60%, sekundāro 30% un akcenta krāsu 10% no
                        dizaina.
                      </li>
                      <li>
                        <strong>Kontrasts lasāmībai:</strong> Pārliecinieties,
                        ka teksts labi kontrastē ar fonu.
                      </li>
                      <li>
                        <strong>Krāsu psiholoģija:</strong> Ņemiet vērā krāsu
                        emocionālo ietekmi uz lietotājiem.
                      </li>
                      <li>
                        <strong>Konsistence:</strong> Saglabājiet krāsu shēmas
                        konsekvenci visā vietnē.
                      </li>
                      <li>
                        <strong>Pieejamība:</strong> Pārbaudiet krāsu kontrastu
                        attiecību, lai nodrošinātu labu lasāmību visiem
                        lietotājiem.
                      </li>
                    </ul>
                    <h3 className="text-xl font-semibold mb-2">
                      Padomi dažādiem elementiem
                    </h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>
                        <strong>Pogas un CTA:</strong> Izmantojiet spilgtas,
                        kontrastējošas krāsas, lai piesaistītu uzmanību.
                      </li>
                      <li>
                        <strong>Foni:</strong> Izvēlieties neitrālas vai
                        gaišākas krāsas, lai neapgrūtinātu saturu.
                      </li>
                      <li>
                        <strong>Teksts:</strong> Tumšs teksts uz gaiša fona vai
                        otrādi labākai lasāmībai.
                      </li>
                      <li>
                        <strong>Ikonas:</strong> Saskaņojiet ar kopējo krāsu
                        shēmu, bet pietiekami kontrastējošas.
                      </li>
                      <li>
                        <strong>Hover efekti:</strong> Izmantojiet krāsu
                        variācijas, lai norādītu uz interaktivitāti.
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

export default KrāsuPalešuMeistars;
