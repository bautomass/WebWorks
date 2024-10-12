// import React, { useState, useEffect, useRef, useCallback } from "react";
// import {
//   FaSave,
//   FaShare,
//   FaUndo,
//   FaRedo,
//   FaEye,
//   FaPalette,
//   FaMagic,
//   FaFilePdf,
//   FaFont,
//   FaImage,
//   FaShoppingCart,
//   FaPenSquare,
//   FaBriefcase,
//   FaGraduationCap,
//   FaTheaterMasks,
//   FaNewspaper,
//   FaUsers,
//   FaHandsHelping,
//   FaComments,
//   FaUtensils,
//   FaPlane,
//   FaHome,
//   FaDumbbell,
//   FaHospital,
// } from "react-icons/fa";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import { motion, AnimatePresence } from "framer-motion";
// import { useSpring, animated } from "react-spring";

// const websiteTypes = [
//   { id: "ecommerce", name: "E-komercija", icon: <FaShoppingCart /> },
//   { id: "portfolio", name: "Portfolio", icon: <FaPalette /> },
//   { id: "blog", name: "Blogs", icon: <FaPenSquare /> },
//   { id: "business", name: "Uzņēmums", icon: <FaBriefcase /> },
//   { id: "education", name: "Izglītība", icon: <FaGraduationCap /> },
//   { id: "entertainment", name: "Izklaide", icon: <FaTheaterMasks /> },
//   { id: "news", name: "Ziņu portāls", icon: <FaNewspaper /> },
//   { id: "social", name: "Sociālais tīkls", icon: <FaUsers /> },
//   {
//     id: "nonprofit",
//     name: "Nevalstiska organizācija",
//     icon: <FaHandsHelping />,
//   },
//   { id: "forum", name: "Forums", icon: <FaComments /> },
//   { id: "restaurant", name: "Restorāns", icon: <FaUtensils /> },
//   { id: "travel", name: "Ceļojumu aģentūra", icon: <FaPlane /> },
//   { id: "realestate", name: "Nekustamie īpašumi", icon: <FaHome /> },
//   { id: "fitness", name: "Fitnesa studija", icon: <FaDumbbell /> },
//   { id: "medical", name: "Medicīnas iestāde", icon: <FaHospital /> },
// ];

// const baseColorSchemes = [
//   {
//     id: "professional",
//     name: "Profesionāla",
//     colors: ["#2c3e50", "#34495e", "#95a5a6"],
//   },
//   {
//     id: "vibrant",
//     name: "Dzīvespriecīga",
//     colors: ["#e74c3c", "#3498db", "#2ecc71"],
//   },
//   {
//     id: "minimalist",
//     name: "Minimālistiska",
//     colors: ["#ffffff", "#f1f1f1", "#333333"],
//   },
//   { id: "nature", name: "Dabiska", colors: ["#27ae60", "#2ecc71", "#f1c40f"] },
//   {
//     id: "elegant",
//     name: "Eleganta",
//     colors: ["#2c3e50", "#e74c3c", "#ecf0f1"],
//   },
//   {
//     id: "darkmode",
//     name: "Tumšais režīms",
//     colors: ["#181818", "#282828", "#383838"],
//   },
//   {
//     id: "pastel",
//     name: "Pasteļtoņi",
//     colors: ["#ffadad", "#ffd6a5", "#fdffb6"],
//   },
//   {
//     id: "neon",
//     name: "Neona",
//     colors: ["#ff00ff", "#00ffff", "#ff9900"],
//   },
//   {
//     id: "earthy",
//     name: "Zemes toņi",
//     colors: ["#8B4513", "#A0522D", "#CD853F"],
//   },
//   {
//     id: "monochrome",
//     name: "Melnbaltā",
//     colors: ["#000000", "#666666", "#FFFFFF"],
//   },
//   {
//     id: "retro",
//     name: "Retro",
//     colors: ["#FFD700", "#FF6347", "#4169E1"],
//   },
//   {
//     id: "futuristic",
//     name: "Futuristiska",
//     colors: ["#00FFFF", "#FF00FF", "#FFFF00"],
//   },
// ];

// const layouts = [
//   {
//     id: "layout1",
//     name: "Klasiskais",
//     image: "/images/website-layout-options.svg",
//   },
//   {
//     id: "layout2",
//     name: "Moderna viena lapa",
//     image: "/images/website-layout-options.svg",
//   },
//   {
//     id: "layout3",
//     name: "Asimetriskais",
//     image: "/images/website-layout-options.svg",
//   },
//   {
//     id: "layout4",
//     name: "Režģa izkārtojums",
//     image: "/images/website-layout-options.svg",
//   },
//   {
//     id: "layout5",
//     name: "Minimālistiskais",
//     image: "/images/website-layout-options.svg",
//   },
//   {
//     id: "layout6",
//     name: "Pilnekrāna fons",
//     image: "/images/website-layout-options.svg",
//   },
//   {
//     id: "layout7",
//     name: "Daudzsleju",
//     image: "/images/website-layout-options.svg",
//   },
// ];

// const featuresList = [
//   {
//     id: "contactForm",
//     name: "Kontaktu forma",
//     applicableTypes: ["business", "portfolio", "nonprofit"],
//   },
//   {
//     id: "newsletter",
//     name: "Jaunumu vēstules pierakstīšanās",
//     applicableTypes: ["blog", "ecommerce", "news"],
//   },
//   {
//     id: "liveChat",
//     name: "Tiešsaistes čats",
//     applicableTypes: ["ecommerce", "business", "entertainment"],
//   },
//   {
//     id: "forum",
//     name: "Forums",
//     applicableTypes: ["forum", "social", "education"],
//   },
//   {
//     id: "eventsCalendar",
//     name: "Pasākumu kalendārs",
//     applicableTypes: ["education", "nonprofit", "entertainment"],
//   },
//   {
//     id: "gallery",
//     name: "Galerija",
//     applicableTypes: ["portfolio", "entertainment", "social"],
//   },
//   {
//     id: "ecommerce",
//     name: "E-komercijas funkcionalitāte",
//     applicableTypes: ["ecommerce"],
//   },
//   {
//     id: "blog",
//     name: "Blogs",
//     applicableTypes: ["education", "business", "news"],
//   },
//   {
//     id: "productReviews",
//     name: "Produktu atsauksmes",
//     applicableTypes: ["ecommerce"],
//   },
//   { id: "wishlist", name: "Vēlmju saraksts", applicableTypes: ["ecommerce"] },
//   {
//     id: "userProfiles",
//     name: "Lietotāju profili",
//     applicableTypes: ["social", "forum", "entertainment"],
//   },
//   {
//     id: "searchFunctionality",
//     name: "Meklēšanas funkcionalitāte",
//     applicableTypes: ["ecommerce", "news", "blog", "forum"],
//   },
//   {
//     id: "donationButton",
//     name: "Ziedojumu poga",
//     applicableTypes: ["nonprofit"],
//   },
//   {
//     id: "multiLanguage",
//     name: "Daudzvalodu atbalsts",
//     applicableTypes: ["business", "ecommerce", "education"],
//   },
//   {
//     id: "darkMode",
//     name: "Tumšais režīms",
//     applicableTypes: ["blog", "news", "social"],
//   },
//   {
//     id: "ai",
//     name: "AI asistents",
//     applicableTypes: ["ecommerce", "education", "business"],
//   },
//   {
//     id: "virtualTour",
//     name: "Virtuālā tūre",
//     applicableTypes: ["business", "education", "entertainment"],
//   },
//   {
//     id: "videoStreaming",
//     name: "Video straumēšana",
//     applicableTypes: ["entertainment", "education", "social"],
//   },
//   {
//     id: "subscriptionModel",
//     name: "Abonēšanas modelis",
//     applicableTypes: ["news", "entertainment", "education"],
//   },
//   {
//     id: "augmentedReality",
//     name: "Papildinātā realitāte",
//     applicableTypes: ["ecommerce", "education", "entertainment"],
//   },
//   {
//     id: "socialMediaIntegration",
//     name: "Sociālo mediju integrācija",
//     applicableTypes: ["blog", "portfolio", "business"],
//   },
//   {
//     id: "crowdfunding",
//     name: "Kolektīvā finansēšana",
//     applicableTypes: ["nonprofit", "social", "business"],
//   },
//   {
//     id: "podcastHosting",
//     name: "Podkāstu hostings",
//     applicableTypes: ["blog", "education", "entertainment"],
//   },
//   {
//     id: "jobBoard",
//     name: "Darba sludinājumu dēlis",
//     applicableTypes: ["business", "education", "social"],
//   },
//   {
//     id: "membershipSystem",
//     name: "Dalības sistēma",
//     applicableTypes: ["social", "education", "nonprofit"],
//   },
//   {
//     id: "ticketingSystem",
//     name: "Biļešu sistēma",
//     applicableTypes: ["entertainment", "education", "business"],
//   },
//   {
//     id: "appointmentBooking",
//     name: "Pierakstu sistēma",
//     applicableTypes: ["medical", "fitness", "business"],
//   },
//   {
//     id: "menuManagement",
//     name: "Ēdienkartes pārvaldība",
//     applicableTypes: ["restaurant"],
//   },
//   {
//     id: "propertyListing",
//     name: "Īpašumu saraksts",
//     applicableTypes: ["realestate"],
//   },
//   {
//     id: "travelPlanner",
//     name: "Ceļojumu plānotājs",
//     applicableTypes: ["travel"],
//   },
//   {
//     id: "fitnessTracker",
//     name: "Fitnesa progress",
//     applicableTypes: ["fitness"],
//   },
// ];

// const fontStyles = [
//   { id: "serif", name: "Serif" },
//   { id: "sansSerif", name: "Sans-serif" },
//   { id: "monospace", name: "Monospace" },
//   { id: "cursive", name: "Cursive" },
//   { id: "fantasy", name: "Fantasy" },
//   { id: "modern", name: "Modern" },
//   { id: "geometric", name: "Geometric" },
//   { id: "handwritten", name: "Handwritten" },
//   { id: "display", name: "Display" },
//   { id: "slab", name: "Slab Serif" },
//   { id: "transitional", name: "Transitional" },
//   { id: "humanist", name: "Humanist" },
//   { id: "script", name: "Script" },
//   { id: "blackletter", name: "Blackletter" },
//   { id: "grunge", name: "Grunge" },
//   { id: "grotesque", name: "Grotesque" },
//   { id: "didone", name: "Didone" },
//   { id: "futuristic", name: "Futuristic" },
//   { id: "artDeco", name: "Art Deco" },
//   { id: "pixel", name: "Pixel" },
//   { id: "stencil", name: "Stencil" },
//   { id: "calligraphy", name: "Calligraphy" },
//   { id: "brush", name: "Brush" },
//   { id: "vintage", name: "Vintage" },
// ];

// const SketchBuilder: React.FC = () => {
//   const [step, setStep] = useState(0);
//   const [websiteType, setWebsiteType] = useState("");
//   const [colorScheme, setColorScheme] = useState("");
//   const [customColorScheme, setCustomColorScheme] = useState<any>(null);
//   const [layout, setLayout] = useState("");
//   const [features, setFeatures] = useState<string[]>([]);
//   const [sketch, setSketch] = useState<any>(null);
//   const [history, setHistory] = useState<any[]>([]);
//   const [historyIndex, setHistoryIndex] = useState(-1);
//   const sketchRef = useRef<HTMLDivElement>(null);
//   const [mixColorsEnabled, setMixColorsEnabled] = useState(false);
//   const [selectedPalettes, setSelectedPalettes] = useState<string[]>([]);
//   const [previewMode, setPreviewMode] = useState(false);
//   const [fontStyle, setFontStyle] = useState("");
//   const [headerImage, setHeaderImage] = useState("");
//   const [aiGeneratedContent, setAiGeneratedContent] = useState<string | null>(
//     null
//   );
//   const [interactiveElements, setInteractiveElements] = useState<string[]>([]);
//   const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

//   const steps = [
//     { title: "Izvēlieties mājaslapas tipu", component: WebsiteTypeSelector },
//     { title: "Izvēlieties krāsu shēmu", component: ColorSchemeSelector },
//     { title: "Izvēlieties izkārtojumu", component: LayoutSelector },
//     { title: "Izvēlieties funkcijas", component: FeaturesSelector },
//     { title: "Izvēlieties fonta stilu", component: FontStyleSelector },
//     { title: "Pievienojiet galvenes attēlu", component: HeaderImageSelector },
//     { title: "AI satura ģenerēšana", component: AIContentGenerator },
//     { title: "Interaktīvie elementi", component: InteractiveElementsSelector },
//     { title: "Skices izveide", component: SketchBuilderComponent },
//   ];

//   useEffect(() => {
//     if (sketch) {
//       setHistory((prevHistory) => [
//         ...prevHistory.slice(0, historyIndex + 1),
//         sketch,
//       ]);
//       setHistoryIndex((prevIndex) => prevIndex + 1);
//     }
//   }, [sketch, historyIndex]);

//   const undo = useCallback(() => {
//     if (historyIndex > 0) {
//       setHistoryIndex((prevIndex) => prevIndex - 1);
//       setSketch(history[historyIndex - 1]);
//     }
//   }, [historyIndex, history]);

//   const redo = useCallback(() => {
//     if (historyIndex < history.length - 1) {
//       setHistoryIndex((prevIndex) => prevIndex + 1);
//       setSketch(history[historyIndex + 1]);
//     }
//   }, [historyIndex, history]);

//   const saveSketch = async () => {
//     if (sketchRef.current) {
//       const canvas = await html2canvas(sketchRef.current);
//       const dataURL = canvas.toDataURL("image/png");
//       const link = document.createElement("a");
//       link.href = dataURL;
//       link.download = "sketch.png";
//       link.click();
//       toast.success("Skice veiksmīgi saglabāta!");
//     }
//   };

//   const exportToPDF = async () => {
//     if (sketchRef.current) {
//       setIsGeneratingPDF(true);
//       try {
//         const canvas = await html2canvas(sketchRef.current);
//         const imgData = canvas.toDataURL("image/png");
//         const pdf = new jsPDF();
//         const imgProps = pdf.getImageProperties(imgData);
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//         pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//         pdf.save("website_sketch.pdf");
//         toast.success("Skice veiksmīgi eksportēta kā PDF!");
//       } catch (error) {
//         console.error("PDF generation error:", error);
//         toast.error("Radās kļūda, eksportējot PDF. Lūdzu, mēģiniet vēlreiz.");
//       } finally {
//         setIsGeneratingPDF(false);
//       }
//     }
//   };

//   const handleMixColors = useCallback(() => {
//     if (selectedPalettes.length < 2) return;
//     const combinedColors = selectedPalettes.reduce<string[]>(
//       (acc, paletteId) => {
//         const scheme = baseColorSchemes.find((s) => s.id === paletteId);
//         return scheme ? [...acc, ...scheme.colors] : acc;
//       },
//       []
//     );
//     const uniqueColors = Array.from(new Set(combinedColors));
//     setCustomColorScheme({ name: "Pielāgots mikss", colors: uniqueColors });
//   }, [selectedPalettes]);

//   const togglePreviewMode = () => setPreviewMode(!previewMode);

//   const fadeAnimation = useSpring({
//     opacity: previewMode ? 1 : 0,
//     transform: previewMode ? "translateY(0%)" : "translateY(-10%)",
//   });

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-center">
//         Mājaslapas Skices Veidotājs
//       </h1>
//       <AnimatePresence>
//         {!previewMode && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.3 }}
//             className="mb-6"
//           >
//             <h2 className="text-2xl font-semibold mb-4">{steps[step].title}</h2>
//             <div className="bg-white rounded-lg shadow-md p-6">
//               {React.createElement(steps[step].component, {
//                 websiteType,
//                 setWebsiteType,
//                 colorScheme,
//                 setColorScheme,
//                 customColorScheme,
//                 layout,
//                 setLayout,
//                 features,
//                 setFeatures,
//                 setStep,
//                 handleMixColors,
//                 selectedPalettes,
//                 setSelectedPalettes,
//                 mixColorsEnabled,
//                 setMixColorsEnabled,
//                 setSketch,
//                 fontStyle,
//                 setFontStyle,
//                 headerImage,
//                 setHeaderImage,
//                 aiGeneratedContent,
//                 setAiGeneratedContent,
//                 interactiveElements,
//                 setInteractiveElements,
//               })}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex space-x-2">
//           {step > 0 && !previewMode && (
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
//               onClick={() => setStep(step - 1)}
//             >
//               Atpakaļ
//             </motion.button>
//           )}
//           {step < steps.length - 1 && !previewMode && (
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
//               onClick={() => setStep(step + 1)}
//             >
//               Tālāk
//             </motion.button>
//           )}
//         </div>
//         <div className="flex space-x-2">
//           <ActionButton icon={<FaUndo />} onClick={undo} title="Atsaukt" />
//           <ActionButton icon={<FaRedo />} onClick={redo} title="Atkārtot" />
//           <ActionButton
//             icon={<FaSave />}
//             onClick={saveSketch}
//             title="Saglabāt"
//           />
//           <ActionButton
//             icon={<FaEye />}
//             onClick={togglePreviewMode}
//             title="Priekšskatījums"
//           />
//           <ActionButton
//             icon={<FaFilePdf />}
//             onClick={exportToPDF}
//             title="Eksportēt PDF"
//             disabled={isGeneratingPDF}
//           />
//         </div>
//       </div>
//       <AnimatePresence>
//         {previewMode && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 20 }}
//             transition={{ duration: 0.3 }}
//           >
//             <animated.div
//               style={fadeAnimation}
//               ref={sketchRef}
//               className="bg-white rounded-lg shadow-md p-6"
//             >
//               <SketchPreview
//                 websiteType={websiteType}
//                 colorScheme={colorScheme}
//                 customColorScheme={customColorScheme}
//                 layout={layout}
//                 features={features}
//                 fontStyle={fontStyle}
//                 headerImage={headerImage}
//                 aiGeneratedContent={aiGeneratedContent}
//                 interactiveElements={interactiveElements}
//               />
//             </animated.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//       <ToastContainer position="bottom-right" autoClose={3000} />
//     </div>
//   );
// };

// const ActionButton: React.FC<{
//   icon: React.ReactNode;
//   onClick: () => void;
//   title: string;
//   disabled?: boolean;
// }> = ({ icon, onClick, title, disabled = false }) => (
//   <motion.button
//     whileHover={{ scale: 1.1 }}
//     whileTap={{ scale: 0.9 }}
//     className={`p-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors ${
//       disabled ? "opacity-50 cursor-not-allowed" : ""
//     }`}
//     onClick={onClick}
//     title={title}
//     disabled={disabled}
//   >
//     {icon}
//   </motion.button>
// );

// const WebsiteTypeSelector: React.FC<any> = ({
//   websiteType,
//   setWebsiteType,
// }) => {
//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//       {websiteTypes.map((type) => (
//         <div
//           key={type.id}
//           onClick={() => setWebsiteType(type.id)}
//           className={`p-4 border rounded-lg cursor-pointer transition-colors ${
//             websiteType === type.id
//               ? "bg-blue-200 border-blue-500"
//               : "bg-white hover:bg-gray-100"
//           }`}
//         >
//           <span className="text-4xl block mb-2">{type.icon}</span>
//           <h3 className="text-lg font-semibold">{type.name}</h3>
//         </div>
//       ))}
//     </div>
//   );
// };

// const ColorSchemeSelector: React.FC<any> = ({
//   colorScheme,
//   setColorScheme,
//   customColorScheme,
//   handleMixColors,
//   selectedPalettes,
//   setSelectedPalettes,
//   mixColorsEnabled,
//   setMixColorsEnabled,
// }) => {
//   return (
//     <div>
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
//         {baseColorSchemes.map((scheme) => (
//           <div
//             key={scheme.id}
//             onClick={() => setColorScheme(scheme.id)}
//             className={`p-4 border rounded-lg cursor-pointer transition-colors ${
//               colorScheme === scheme.id
//                 ? "bg-blue-200 border-blue-500"
//                 : "bg-white hover:bg-gray-100"
//             }`}
//           >
//             <h3 className="font-bold mb-2">{scheme.name}</h3>
//             <div className="flex space-x-2">
//               {scheme.colors.map((color) => (
//                 <span
//                   key={color}
//                   className="w-8 h-8 rounded-full border border-gray-300"
//                   style={{ backgroundColor: color }}
//                 ></span>
//               ))}
//             </div>
//             {mixColorsEnabled && (
//               <label className="flex items-center mt-2">
//                 <input
//                   type="checkbox"
//                   checked={selectedPalettes.includes(scheme.id)}
//                   onChange={(e) => {
//                     const selected = e.target.checked;
//                     setSelectedPalettes((prev) =>
//                       selected
//                         ? [...prev, scheme.id]
//                         : prev.filter((id) => id !== scheme.id)
//                     );
//                   }}
//                   className="mr-2"
//                 />
//                 Izvēlēties miksēšanai
//               </label>
//             )}
//           </div>
//         ))}
//       </div>
//       <div className="flex items-center mb-4">
//         <input
//           type="checkbox"
//           checked={mixColorsEnabled}
//           onChange={(e) => setMixColorsEnabled(e.target.checked)}
//           className="mr-2"
//         />
//         <label>Miksēt krāsu Paletes</label>
//       </div>
//       <button
//         onClick={handleMixColors}
//         disabled={!mixColorsEnabled || selectedPalettes.length < 2}
//         className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         <FaMagic className="inline-block mr-2" />
//         Apvienot krāsas
//       </button>
//       {customColorScheme && (
//         <div className="mt-4 p-4 border rounded-lg bg-gray-100">
//           <h3 className="font-bold mb-2">{customColorScheme.name}</h3>
//           <div className="flex space-x-2">
//             {customColorScheme.colors.map((color: string) => (
//               <span
//                 key={color}
//                 className="w-8 h-8 rounded-full border border-gray-300"
//                 style={{ backgroundColor: color }}
//               ></span>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const LayoutSelector: React.FC<any> = ({ layout, setLayout }) => {
//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//       {layouts.map((l) => (
//         <div
//           key={l.id}
//           onClick={() => setLayout(l.id)}
//           className={`p-4 border rounded-lg cursor-pointer transition-colors ${
//             layout === l.id
//               ? "bg-blue-200 border-blue-500"
//               : "bg-white hover:bg-gray-100"
//           }`}
//         >
//           <h3 className="font-bold mb-2">{l.name}</h3>
//           <img
//             src={l.image}
//             alt={l.name}
//             className="w-full h-auto rounded-md"
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// const FeaturesSelector: React.FC<any> = ({
//   features,
//   setFeatures,
//   websiteType,
// }) => {
//   const applicableFeatures = featuresList.filter((feature) =>
//     feature.applicableTypes.includes(websiteType)
//   );

//   const toggleFeature = (featureId: string) => {
//     setFeatures((prevFeatures: string[]) =>
//       prevFeatures.includes(featureId)
//         ? prevFeatures.filter((f) => f !== featureId)
//         : [...prevFeatures, featureId]
//     );
//   };

//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//       {applicableFeatures.map((feature) => (
//         <div
//           key={feature.id}
//           onClick={() => toggleFeature(feature.id)}
//           className={`p-4 border rounded-lg cursor-pointer transition-colors ${
//             features.includes(feature.id)
//               ? "bg-blue-200 border-blue-500"
//               : "bg-white hover:bg-gray-100"
//           }`}
//         >
//           <h3 className="font-bold">{feature.name}</h3>
//         </div>
//       ))}
//     </div>
//   );
// };

// const FontStyleSelector: React.FC<any> = ({ fontStyle, setFontStyle }) => {
//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//       {fontStyles.map((style) => (
//         <div
//           key={style.id}
//           onClick={() => setFontStyle(style.id)}
//           className={`p-4 border rounded-lg cursor-pointer transition-colors ${
//             fontStyle === style.id
//               ? "bg-blue-200 border-blue-500"
//               : "bg-white hover:bg-gray-100"
//           }`}
//         >
//           <h3 className="font-bold" style={{ fontFamily: style.id }}>
//             {style.name}
//           </h3>
//         </div>
//       ))}
//     </div>
//   );
// };

// const HeaderImageSelector: React.FC<any> = ({
//   headerImage,
//   setHeaderImage,
// }) => {
//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setHeaderImage(e.target?.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="p-4 border rounded-lg bg-white">
//       <h3 className="font-bold mb-2">Augšupielādēt galvenes attēlu</h3>
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleImageUpload}
//         className="mb-4"
//       />
//       {headerImage && (
//         <img
//           src={headerImage}
//           alt="Galvenes attēls"
//           className="w-full h-auto rounded-md"
//         />
//       )}
//     </div>
//   );
// };

// const AIContentGenerator: React.FC<{
//   websiteType: string;
//   setAiGeneratedContent: React.Dispatch<React.SetStateAction<string | null>>;
// }> = ({ websiteType, setAiGeneratedContent }) => {
//   const [loading, setLoading] = useState(false);

//   const generateContent = async () => {
//     setLoading(true);
//     await new Promise((resolve) => setTimeout(resolve, 2000));

//     const getRandomContent = (contentArray: string[]) => {
//       return contentArray[Math.floor(Math.random() * contentArray.length)];
//     };

//     let content = "";
//     switch (websiteType) {
//       case "ecommerce":
//         content = getRandomContent([
//           `
//             Virsraksts: Atklājiet Mūsu Jaunāko Kolekciju!

//             Apraksts: Laipni lūgti mūsu tiešsaistes veikalā, kur kvalitāte satiekas ar stilu. Mūsu jaunākā kolekcija ir radīta, domājot par jums. Atrodiet perfekto pirkumu no mūsu rūpīgi atlasītā preču klāsta.

//             Aicinājums Rīkoties: Iepērcieties Tagad un Saņemiet 15% Atlaidi Pirmajam Pirkumam!
//             `,
//           `
//             Virsraksts: Ekskluzīvi Piedāvājumi Tieši Jums!

//             Apraksts: Izpērciet mūsu plašo produktu klāstu un atrodiet lieliskus piedāvājumus. Mēs piedāvājam augstākās kvalitātes preces par konkurētspējīgām cenām. Jūsu apmierinātība ir mūsu prioritāte.

//             Aicinājums Rīkoties: Pievienojieties Mūsu VIP Klubam un Saņemiet Īpašas Atlaides!
//             `,
//           `
//             Virsraksts: Ērti Iepirkumi no Jūsu Mājām

//             Apraksts: Mūsu e-veikals piedāvā plašu produktu klāstu, sākot no modes līdz elektronikai. Baudiet drošus maksājumus, ātru piegādi un vieglu atgriešanas procesu. Jūsu ērtības ir mūsu galvenā prioritāte.

//             Aicinājums Rīkoties: Sāciet Iepirkties un Izbaudiet Bezmaksas Piegādi Pasūtījumiem virs 50€!
//             `,
//           `
//             Virsraksts: Zaļāka Nākotne ar Mūsu Eko Produktiem

//             Apraksts: Atklājiet mūsu ilgtspējīgu produktu līniju, kas ir draudzīga videi un jūsu maciņam. Mēs piedāvājam plašu ekoloģisku preču klāstu, lai palīdzētu jums dzīvot zaļāk.

//             Aicinājums Rīkoties: Iegādājieties Mūsu Eko Produktus un Saņemiet Dāvanā Auduma Iepirkumu Maisiņu!
//             `,
//         ]);
//         break;
//       case "portfolio":
//         content = getRandomContent([
//           `
//             Virsraksts: Radoši Risinājumi Jūsu Vīzijai

//             Apraksts: Sveicināti manā portfolio! Es esmu pieredzējis dizaineris/izstrādātājs, kas specializējas unikālu un efektīvu risinājumu radīšanā. Apskatiet manus projektus un uzziniet, kā es varu palīdzēt jūsu idejas pārvērst realitātē.

//             Aicinājums Rīkoties: Sazināties un Uzsākt Jūsu Projektu
//             `,
//           `
//             Virsraksts: Inovatīvs Dizains, Kas Izceļas

//             Apraksts: Mans portfolio atspoguļo manu kaislību radīt vizuāli saistošus un funkcionālus dizainus. No zīmola identitātes līdz tīmekļa vietnēm - es piedāvāju plašu pakalpojumu klāstu, lai apmierinātu jūsu radošās vajadzības.

//             Aicinājums Rīkoties: Izpētiet Manu Darbu un Pieprasiet Bezmaksas Konsultāciju
//             `,
//           `
//             Virsraksts: No Koncepcijas līdz Realizācijai

//             Apraksts: Kā pieredzējis projektu vadītājs un izstrādātājs, es specializējos sarežģītu ideju pārvēršanā realitātē. Mans portfolio demonstrē manu spēju vadīt projektus no sākotnējās koncepcijas līdz veiksmīgai palaišanai.

//             Aicinājums Rīkoties: Apskatiet Manus Projektus un Ieplānojiet Zvanu
//             `,
//           `
//             Virsraksts: Digitālā Māksla un Ilustrācijas

//             Apraksts: Laipni lūgti manā digitālās mākslas pasaulē! Mans portfolio aptver plašu stilu klāstu - no minimālistiskiem logotipiem līdz detalizētām ilustrācijām. Ļaujiet man palīdzēt jums vizualizēt jūsu nākamo projektu.

//             Aicinājums Rīkoties: Pasūtiet Pielāgotu Mākslas Darbu Jūsu Zīmolam
//             `,
//         ]);
//         break;
//       case "blog":
//         content = getRandomContent([
//           `
//             Virsraksts: Jaunākās Tendences un Padomi

//             Apraksts: Sveicināti mūsu blogā, kur mēs dalāmies ar vērtīgiem padomiem, nozares tendencēm un ekspertu viedokļiem. Pievienojieties mūsu lasītāju kopienai un esiet informēti par jaunākajām aktualitātēm.

//             Aicinājums Rīkoties: Abonējiet Mūsu Jaunumu Vēstuli un Saņemiet Ekskluzīvu Saturu!
//             `,
//           `
//             Virsraksts: Iedvesmojošas Stāsti un Dzīvesstila Padomi

//             Apraksts: Mūsu blogs ir jūsu ceļvedis labākai dzīvei. Mēs piedāvājam iedvesmojošus stāstus, praktiskus padomus un ieteikumus, kas palīdzēs jums sasniegt jūsu personīgos un profesionālos mērķus.

//             Aicinājums Rīkoties: Pievienojieties Mūsu Kopienas Forumam un Dalieties Savā Pieredzē!
//             `,
//           `
//             Virsraksts: Ceļojumu Piedzīvojumi un Kultūras Atklājumi

//             Apraksts: Dodieties virtuālā ceļojumā ar mūsu blogu! Mēs piedāvājam aizraujošus ceļojumu stāstus, kultūras ieskatus un praktiskus ceļošanas padomus, lai iedvesmotu jūsu nākamo piedzīvojumu.

//             Aicinājums Rīkoties: Lejupielādējiet Mūsu Bezmaksas Ceļojumu Plānotāju!
//             `,
//           `
//             Virsraksts: Tehnoloģiju Revolūcija un Digitālās Tendences

//             Apraksts: Mūsu tehnoloģiju blogs ir jūsu avots jaunākajām inovācijām, produktu apskatiem un nozares analīzēm. Palieciet informēti par strauji mainīgo digitālo pasauli.

//             Aicinājums Rīkoties: Piesakieties Mūsu Iknedēļas Tehnoloģiju Kopsavilkumam!
//             `,
//         ]);
//         break;
//       case "business":
//         content = getRandomContent([
//           `
//             Virsraksts: Inovatīvi Biznesa Risinājumi

//             Apraksts: Mēs esam jūsu uzticamais partneris biznesa izaugsmē. Mūsu ekspertu komanda piedāvā individuāli pielāgotus risinājumus, lai palīdzētu jūsu uzņēmumam sasniegt jaunas virsotnes.

//             Aicinājums Rīkoties: Pieprasiet Bezmaksas Biznesa Konsultāciju
//             `,
//           `
//             Virsraksts: Jūsu Veiksmes Stāsts Sākas Šeit

//             Apraksts: Ar ilggadēju pieredzi un inovatīvu pieeju mēs palīdzam uzņēmumiem pārvarēt izaicinājumus un izmantot jaunas iespējas. Uzziniet, kā mēs varam palīdzēt jūsu biznesam augt un attīstīties.

//             Aicinājums Rīkoties: Lejupielādējiet Mūsu E-grāmatu par Biznesa Izaugsmi
//             `,
//           `
//             Virsraksts: Partnerība Ilgtspējīgai Attīstībai

//             Apraksts: Mūsu uzņēmums ir apņēmies veicināt ilgtspējīgu biznesa praksi. Mēs piedāvājam risinājumus, kas ne tikai uzlabo jūsu peļņu, bet arī pozitīvi ietekmē sabiedrību un vidi.

//             Aicinājums Rīkoties: Pievienojieties Mūsu Ilgtspējīga Biznesa Vebināram
//             `,
//           `
//             Virsraksts: Digitālā Transformācija Jūsu Biznesam

//             Apraksts: Esam specializējušies digitālās transformācijas stratēģijās. Mūsu eksperti palīdzēs jums integrēt jaunākās tehnoloģijas, optimizēt procesus un radīt konkurences priekšrocības digitālajā laikmetā.

//             Aicinājums Rīkoties: Pieprasiet Mūsu Digitālās Gatavības Novērtējumu
//             `,
//         ]);
//         break;
//       case "education":
//         content = getRandomContent([
//           `
//             Virsraksts: Atklājiet Savu Potenciālu ar Mums

//             Apraksts: Mūsu izglītības iestāde piedāvā plašu kursu klāstu, lai palīdzētu jums sasniegt jūsu mērķus. No valodu kursiem līdz profesionālās pilnveides programmām - mēs esam šeit, lai atbalstītu jūsu izaugsmi.

//             Aicinājums Rīkoties: Reģistrējieties Bezmaksas Izmēģinājuma Nodarbībai
//             `,
//           `
//             Virsraksts: Mācīšanās, Kas Pielāgojas Jums

//             Apraksts: Mēs ticam, ka katrs students ir unikāls. Tāpēc mūsu platformā piedāvājam personalizētas mācību programmas, kas pielāgojas jūsu mācīšanās stilam un tempam. Atklājiet efektīvāku veidu, kā apgūt jaunas prasmes.

//             Aicinājums Rīkoties: Sāciet Savu Personalizēto Mācību Ceļojumu Šodien
//             `,
//           `
//             Virsraksts: Nākotnes Līderu Veidošana

//             Apraksts: Mūsu akadēmija ir veltīta nākotnes līderu un inovatoru attīstībai. Mēs piedāvājam progresīvas programmas, kas apvieno teorētiskās zināšanas ar praktisko pieredzi, sagatavojot jūs reālās pasaules izaicinājumiem.

//             Aicinājums Rīkoties: Piesakieties Mūsu Līderības Attīstības Programmai
//             `,
//           `
//             Virsraksts: Mūžizglītība Jūsu Pirkstu Galos

//             Apraksts: Ar mūsu tiešsaistes mācību platformu, izglītība ir pieejama jebkurā laikā un vietā. Piekļūstiet augstas kvalitātes kursiem, ekspertu lekcijām un interaktīviem resursiem, lai nepārtraukti pilnveidotos.

//             Aicinājums Rīkoties: Izmēģiniet Mūsu Platformu Bez Maksas 30 Dienas
//             `,
//         ]);
//         break;
//       case "entertainment":
//         content = getRandomContent([
//           `
//             Virsraksts: Jūsu Vārti uz Aizraujošu Izklaidi

//             Apraksts: Laipni lūgti mūsu izklaides pasaulē! Mēs piedāvājam plašu klāstu ar aizraujošiem notikumiem, filmām, spēlēm un vairāk. Atrodiet savu ideālo izklaides veidu un piedzīvojiet neaizmirstamus mirkļus.

//             Aicinājums Rīkoties: Izpētiet Mūsu Jaunākos Piedāvājumus un Rezervējiet Tagad!
//             `,
//           `
//             Virsraksts: Radiet Savas Atmiņas ar Mums

//             Apraksts: No aizraujošiem koncertiem līdz sirreāliem virtuālās realitātes piedzīvojumiem - mēs piedāvājam plašu izklaides iespēju klāstu. Mūsu mērķis ir radīt neaizmirstamus mirkļus, kas ilgi paliks atmiņā.

//             Aicinājums Rīkoties: Pievienojieties Mūsu VIP Klubam Ekskluzīviem Piedāvājumiem
//             `,
//           `
//             Virsraksts: Ģimenei Draudzīga Izklaide Visām Paaudzēm

//             Apraksts: Mēs piedāvājam drošu un jautru vidi visai ģimenei. No interaktīvām izstādēm līdz aizraujošām spēļu zonām - pie mums katrs ģimenes loceklis atradīs kaut ko sev piemērotu.

//             Aicinājums Rīkoties: Iegādājieties Ģimenes Biļeti un Ietaupiet 20%
//             `,
//           `
//             Virsraksts: Piedzīvojiet Mākslu un Kultūru

//             Apraksts: Mūsu kultūras centrs piedāvā plašu mākslas izstāžu, teātra izrāžu un mūzikas pasākumu klāstu. Iegremdējieties mākslas pasaulē un paplašiniet savu kultūras apvārsni.

//             Aicinājums Rīkoties: Apskatiet Mūsu Pasākumu Kalendāru un Rezervējiet Biļetes
//             `,
//         ]);
//         break;
//       case "news":
//         content = getRandomContent([
//           `
//             Virsraksts: Jūsu Uzticamais Ziņu Avots

//             Apraksts: Mēs piedāvājam objektīvu un savlaicīgu informāciju par jaunākajiem notikumiem Latvijā un pasaulē. Mūsu komanda strādā 24/7, lai jūs vienmēr būtu informēti.

//             Aicinājums Rīkoties: Abonējiet Mūsu Ziņu Lietotni un Esiet Vienmēr Informēti
//             `,
//           `
//             Virsraksts: Padziļināta Analīze un Komentāri

//             Apraksts: Mūsu ziņu portāls sniedz ne tikai jaunākās ziņas, bet arī padziļinātu analīzi un ekspertu komentārus. Izprotiet notikumu kontekstu un to ietekmi uz sabiedrību.

//             Aicinājums Rīkoties: Lasiet Mūsu Iknedēļas Analītisko Apskatu
//             `,
//           `
//             Virsraksts: Vietējās Ziņas un Kopienas Stāsti

//             Apraksts: Mēs fokusējamies uz vietējām ziņām un kopienas stāstiem. Uzziniet par notikumiem jūsu apkaimē, vietējiem varoņiem un iniciatīvām, kas veido mūsu sabiedrību.

//             Aicinājums Rīkoties: Dalieties ar Savu Stāstu un Veidojiet Ziņas Kopā ar Mums
//             `,
//           `
//             Virsraksts: Multimediju Ziņu Pieredze

//             Apraksts: Mūsu interaktīvā platforma piedāvā ziņas dažādos formātos - raksti, video reportāžas, podkāsti un infografikas. Izvēlieties sev ērtāko veidu, kā sekot līdzi notikumiem.

//             Aicinājums Rīkoties: Izmēģiniet Mūsu Jaunāko AR Ziņu Pieredzi
//             `,
//         ]);
//         break;
//       case "social":
//         content = getRandomContent([
//           `
//             Virsraksts: Savienojieties ar Pasauli

//             Apraksts: Mūsu sociālā platforma ļauj jums viegli sazināties ar draugiem, ģimeni un jauniem cilvēkiem visā pasaulē. Dalieties ar saviem mirkļiem, idejām un interesēm.

//             Aicinājums Rīkoties: Pievienojieties Mūsu Kopienai un Sāciet Dalīties Jau Šodien
//             `,
//           `
//             Virsraksts: Atklājiet Jaunas Intereses un Kopienas

//             Apraksts: Mūsu platforma ir ideāla vieta, kur atrast cilvēkus ar līdzīgām interesēm. Pievienojieties grupām, piedalieties diskusijās un paplašiniet savu sociālo loku.

//             Aicinājums Rīkoties: Izpētiet Mūsu Tematiskās Grupas un Atrodi Savu Nišu
//             `,
//           `
//             Virsraksts: Drošs un Privāts Sociālais Tīkls

//             Apraksts: Mēs prioritizējam jūsu privātumu un drošību. Mūsu platforma piedāvā pilnu kontroli pār jūsu datiem un to, ar ko jūs dalāties. Izbaudiet sociālo saziņu bez raizēm.

//             Aicinājums Rīkoties: Izveidojiet Savu Drošo Profilu un Sāciet Droši Komunicēt
//             `,
//           `
//             Virsraksts: Sociālā Platforma Profesionāļiem

//             Apraksts: Mūsu tīkls ir veidots, lai palīdzētu profesionāļiem veidot kontaktus, atrast darba iespējas un dalīties ar nozares zināšanām. Paplašiniet savu profesionālo tīklu un karjeras iespējas.

//             Aicinājums Rīkoties: Pievienojieties un Sāciet Veidot Savu Profesionālo Zīmolu
//             `,
//         ]);
//         break;
//       case "nonprofit":
//         content = getRandomContent([
//           `
//             Virsraksts: Kopā Mēs Varam Mainīt Pasauli

//             Apraksts: Mūsu organizācija ir apņēmusies risināt svarīgus sociālos un vides jautājumus. Ar jūsu atbalstu mēs varam radīt pozitīvas pārmaiņas mūsu kopienā un pasaulē.

//             Aicinājums Rīkoties: Ziedojiet Tagad un Palīdziet Mums Sasniegt Mūsu Mērķus
//             `,
//           `
//             Virsraksts: Brīvprātīgo Spēks

//             Apraksts: Mēs ticam, ka katrs var dot savu ieguldījumu. Mūsu organizācija piedāvā dažādas iespējas brīvprātīgajiem iesaistīties un palīdzēt veidot labāku nākotni.

//             Aicinājums Rīkoties: Kļūstiet par Brīvprātīgo un Pievienojieties Mūsu Komandai
//             `,
//           `
//             Virsraksts: Izglītība Ilgtspējīgai Nākotnei

//             Apraksts: Mūsu nevalstiskā organizācija fokusējas uz izglītības veicināšanu ilgtspējīgas attīstības jomā. Mēs piedāvājam programmas un resursus, lai izglītotu un iedvesmotu nākamās paaudzes.

//             Aicinājums Rīkoties: Uzziniet par Mūsu Izglītības Programmām un Iesaistieties
//             `,
//           `
//             Virsraksts: Caurspīdīgums un Atbildība

//             Apraksts: Mēs esam apņēmušies darboties ar augstāko caurspīdīguma un atbildības līmeni. Uzziniet, kā mēs izmantojam ziedojumus un kādu ietekmi tie rada mūsu mērķu sasniegšanā.

//             Aicinājums Rīkoties: Apskatiet Mūsu Gada Pārskatu un Redziet Jūsu Ziedojumu Darbībā
//             `,
//         ]);
//         break;
//       case "forum":
//         content = getRandomContent([
//           `
//             Virsraksts: Pievienojieties Diskusijai

//             Apraksts: Mūsu forums ir vieta, kur cilvēki no visas pasaules satiekas, lai dalītos ar idejām, uzdotu jautājumus un atrastu atbildes. Atrodiet savas intereses un pievienojieties sarunai.

//             Aicinājums Rīkoties: Reģistrējieties un Sāciet Savu Pirmo Diskusiju
//             `,
//           `
//             Virsraksts: Zināšanu Apmaiņas Centrs

//             Apraksts: Mūsu forums ir nenovērtējams resurss dažādu jomu ekspertiem un entuziastiem. Dalieties ar savām zināšanām, mācieties no citiem un kopīgi risiniet sarežģītas problēmas.

//             Aicinājums Rīkoties: Uzdodiet Savu Jautājumu vai Sniedziet Atbildi
//             `,
//           `
//             Virsraksts: Kopiena Katrā Tēmā

//             Apraksts: No tehnoloģijām līdz dārzkopībai - mūsu forums aptver plašu tēmu loku. Atrodiet savu nišu, veidojiet kontaktus ar domubiedriem un paplašiniet savas zināšanas.

//             Aicinājums Rīkoties: Izpētiet Mūsu Tēmu Kategorijas un Atrodiet Savu Interešu Jomu
//             `,
//           `
//             Virsraksts: Droša un Draudzīga Vide Diskusijām

//             Apraksts: Mēs lepojamies ar mūsu foruma pozitīvo un atbalstošo atmosfēru. Mūsu moderatoru komanda nodrošina, ka visas diskusijas ir cieņpilnas un produktīvas.

//             Aicinājums Rīkoties: Iepazīstieties ar Mūsu Kopienas Vadlīnijām un Pievienojieties
//             `,
//         ]);
//         break;
//       case "restaurant":
//         content = getRandomContent([
//           `
//             Virsraksts: Garšas Piedzīvojums Jūsu Šķīvī

//             Apraksts: Mūsu restorāns piedāvā unikālu kulinārijas pieredzi, apvienojot tradicionālās garšas ar mūsdienīgu pieskārienu. Katrs ēdiens ir rūpīgi gatavots, izmantojot svaigākās sastāvdaļas.

//             Aicinājums Rīkoties: Rezervējiet Galdiņu un Izbaudiet Neaizmirstamu Maltīti
//             `,
//           `
//             Virsraksts: No Fermas līdz Galdam

//             Apraksts: Mēs lepojamies ar mūsu sadarbību ar vietējiem zemniekiem un piegādātājiem. Mūsu ēdienkarte atspoguļo sezonas labākos produktus, nodrošinot svaigas un autentiskas garšas.

//             Aicinājums Rīkoties: Apskatiet Mūsu Sezonālo Ēdienkarti un Rezervējiet Tagad
//             `,
//           `
//             Virsraksts: Perfekta Vieta Katram Gadījumam

//             Apraksts: No romantiskām vakariņām līdz biznesa pusdienām - mūsu restorāns piedāvā ideālu atmosfēru katram gadījumam. Izbaudiet izcilu ēdienu, dzērienus un apkalpošanu mājīgā vidē.

//             Aicinājums Rīkoties: Plānojiet Savu Nākamo Pasākumu Pie Mums
//             `,
//           `
//             Virsraksts: Kulinārais Ceļojums Cauri Pasaulei

//             Apraksts: Mūsu šefpavāri piedāvā ēdienus, kas iedvesmoti no dažādām pasaules virtuvēm. Katrs apmeklējums ir kā kulinārais ceļojums, kas ļauj izbaudīt jaunas un aizraujošas garšas.

//             Aicinājums Rīkoties: Atklājiet Mūsu Starptautisko Ēdienkarti un Rezervējiet Savu Ceļojumu
//             `,
//         ]);
//         break;
//       case "travel":
//         content = getRandomContent([
//           `
//             Virsraksts: Atklājiet Pasauli ar Mums

//             Apraksts: Mūsu ceļojumu aģentūra piedāvā neaizmirstamus piedzīvojumus visā pasaulē. No eksotiskām pludmalēm līdz aizraujošiem kalnu pārgājieniem - mēs palīdzēsim jums izveidot ideālo ceļojumu.

//             Aicinājums Rīkoties: Izpētiet Mūsu Ceļojumu Piedāvājumus un Sāciet Plānot Savu Sapņu Brīvdienas
//             `,
//           `
//             Virsraksts: Personalizēti Ceļojumi Katrai Gaumei

//             Apraksts: Mēs ticam, ka katrs ceļojums ir unikāls. Mūsu pieredzējušie ceļojumu konsultanti izveidos jūsu vēlmēm un interesēm pielāgotu maršrutu, nodrošinot neaizmirstamu pieredzi.

//             Aicinājums Rīkoties: Sazinieties ar Mūsu Ceļojumu Ekspertu un Radiet Savu Ideālo Maršrutu
//             `,
//           `
//             Virsraksts: Ilgtspējīga Tūrisma Pionierii

//             Apraksts: Mēs esam apņēmušies veicināt atbildīgu un ilgtspējīgu tūrismu. Mūsu ceļojumi ir veidoti tā, lai minimizētu ietekmi uz vidi un atbalstītu vietējās kopienas.

//             Aicinājums Rīkoties: Uzziniet Vairāk par Mūsu Ekoloģiskajiem Ceļojumiem un Rezervējiet Savu Zaļo Piedzīvojumu
//             `,
//           `
//             Virsraksts: Grupas Ceļojumi un Īpašie Piedāvājumi

//             Apraksts: Pievienojieties mūsu grupu ceļojumiem un satieciet jaunus draugus, daloties neaizmirstamos piedzīvojumos. Mēs piedāvājam arī īpašus piedāvājumus un atlaides agrās rezervācijas gadījumā.

//             Aicinājums Rīkoties: Apskatiet Mūsu Grupas Ceļojumu Grafiku un Izmantojiet Mūsu Īpašos Piedāvājumus
//             `,
//         ]);
//         break;
//       case "realestate":
//         content = getRandomContent([
//           `
//             Virsraksts: Jūsu Sapņu Mājas Gaida

//             Apraksts: Mūsu nekustamo īpašumu aģentūra specializējas ideālo māju un dzīvokļu atrašanā. Ar plašu piedāvājumu klāstu un pieredzējušiem aģentiem mēs palīdzēsim jums atrast perfekto mājvietu.

//             Aicinājums Rīkoties: Sāciet Savu Māju Meklējumus ar Mums - Pieprasiet Bezmaksas Konsultāciju
//             `,
//           `
//             Virsraksts: Investīciju Iespējas Nekustamajā Īpašumā

//             Apraksts: Mēs piedāvājam plašu investīciju īpašumu klāstu - no dzīvokļiem līdz komerciālajiem objektiem. Mūsu eksperti palīdzēs jums pieņemt gudrus lēmumus un maksimizēt jūsu ieguldījumu atdevi.

//             Aicinājums Rīkoties: Izpētiet Mūsu Investīciju Portfeli un Sāciet Savu Nekustamā Īpašuma Ceļojumu
//             `,
//           `
//             Virsraksts: Pārdodiet Savu Īpašumu ar Mums

//             Apraksts: Mūsu pieredzējušā komanda nodrošinās, ka jūsu īpašuma pārdošanas process ir vienkāršs un efektīvs. Mēs izmantojam jaunākās mārketinga stratēģijas, lai maksimizētu jūsu īpašuma vērtību.

//             Aicinājums Rīkoties: Pieprasiet Bezmaksas Īpašuma Novērtējumu un Uzziniet Vairāk par Mūsu Pārdošanas Pakalpojumiem
//             `,
//           `
//             Virsraksts: Jūsu Uzticamais Partneris Nekustamo Īpašumu Jomā

//             Apraksts: Ar ilggadēju pieredzi un dziļām zināšanām par vietējo tirgu, mēs esam jūsu uzticamais partneris visos ar nekustamo īpašumu saistītajos jautājumos. No pirkšanas līdz pārdošanai - mēs esam šeit, lai palīdzētu.

//             Aicinājums Rīkoties: Sazinieties ar Mums un Uzziniet, Kā Mēs Varam Palīdzēt Jūsu Nekustamā Īpašuma Vajadzībās
//             `,
//         ]);
//         break;
//       case "fitness":
//         content = getRandomContent([
//           `
//             Virsraksts: Sasniedziet Savus Fitnesa Mērķus ar Mums

//             Apraksts: Mūsu fitnesa studija piedāvā plašu treniņu programmu klāstu, piemērotu visiem fitnesa līmeņiem. Ar personalizētu pieeju un motivējošiem treneriem mēs palīdzēsim jums sasniegt vēlamos rezultātus.

//             Aicinājums Rīkoties: Piesakieties Bezmaksas Izmēģinājuma Treniņam un Sāciet Savu Fitnesa Ceļojumu
//             `,
//           `
//             Virsraksts: Holistiska Pieeja Veselībai un Fitnesam

//             Apraksts: Mēs ticam, ka fitness ir vairāk nekā tikai vingrojumi. Mūsu studija piedāvā holistisku pieeju, apvienojot treniņus, uztura konsultācijas un stresa pārvaldības tehnikas.

//             Aicinājums Rīkoties: Uzziniet par Mūsu Holistiskajām Programmām un Pieteikties Konsultācijai
//             `,
//           `
//             Virsraksts: Virtuālie Treniņi Jebkurā Laikā un Vietā

//             Apraksts: Mēs piedāvājam plašu virtuālo treniņu klāstu, ļaujot jums trenēties jebkurā laikā un vietā. Pievienojieties mūsu tiešsaistes kopienai un sasniedziet savus mērķus no mājas ērtībām.

//             Aicinājums Rīkoties: Izmēģiniet Mūsu Virtuālos Treniņus ar Bezmaksas 7 Dienu Izmēģinājumu
//             `,
//           `
//             Virsraksts: Personalizēti Treniņi Katram

//             Apraksts: Mūsu pieredzējušie personīgie treneri izstrādās jums individuālu treniņu programmu, kas atbilst jūsu unikālajām vajadzībām un mērķiem. Sasniedziet rezultātus ātrāk ar profesionālu vadību.

//             Aicinājums Rīkoties: Rezervējiet Savu Pirmo Sesiju ar Personīgo Treneri un Sāciet Savu Transformāciju
//             `,
//         ]);
//         break;
//       case "medical":
//         content = getRandomContent([
//           `
//             Virsraksts: Jūsu Veselība ir Mūsu Prioritāte

//             Apraksts: Mūsu medicīnas centrs piedāvā visaptverošu veselības aprūpi, izmantojot jaunākās tehnoloģijas un pieredzējušu medicīnas personālu. Mēs esam šeit, lai rūpētos par jūsu veselību katrā dzīves posmā.

//             Aicinājums Rīkoties: Pierakstieties uz Konsultāciju un Sāciet Savu Ceļu uz Labāku Veselību
//             `,
//           `
//             Virsraksts: Specializētā Aprūpe Jūsu Vajadzībām

//             Apraksts: Mūsu medicīnas iestāde piedāvā plašu specializēto pakalpojumu klāstu, tostarp kardioloģiju, neiroloģiju, ortopēdiju un citas jomas. Mūsu eksperti ir gatavi sniegt jums augstākās kvalitātes aprūpi.

//             Aicinājums Rīkoties: Uzziniet Vairāk par Mūsu Specializētajiem Pakalpojumiem un Rezervējiet Vizīti
//             `,
//           `
//             Virsraksts: Preventīvā Veselības Aprūpe

//             Apraksts: Mēs ticam, ka profilakse ir labāka par ārstēšanu. Mūsu preventīvās veselības programmas palīdzēs jums uzturēt optimālu veselību un novērst potenciālas problēmas, pirms tās rodas.

//             Aicinājums Rīkoties: Piesakieties Mūsu Visaptverošajai Veselības Pārbaudei
//             `,
//           `
//             Virsraksts: Inovatīva Pieeja Medicīnai

//             Apraksts: Mūsu medicīnas iestāde ir aprīkota ar jaunākajām tehnoloģijām un izmanto inovatīvas ārstēšanas metodes. Mēs nepārtraukti attīstāmies, lai nodrošinātu jums vislabāko iespējamo aprūpi.

//             Aicinājums Rīkoties: Uzziniet par Mūsu Jaunākajām Ārstēšanas Metodēm un Tehnoloģijām
//             `,
//         ]);
//         break;
//       default:
//         content = `
//             Virsraksts: Laipni Lūgti Mūsu ${websiteType} Vietnē!

//             Apraksts: Mēs esam šeit, lai sniegtu jums vislabāko pieredzi. Izpētiet mūsu vietni, lai uzzinātu vairāk par mūsu pakalpojumiem un to, kā mēs varam palīdzēt sasniegt jūsu mērķus.

//             Aicinājums Rīkoties: Sazināties ar Mums un Uzzināt Vairāk!
//           `;
//     }

//     setAiGeneratedContent(content);
//     setLoading(false);
//   };

//   return (
//     <div className="p-4 border rounded-lg bg-white">
//       <h3 className="font-bold mb-2">AI Satura Ģenerēšana</h3>
//       <button
//         onClick={generateContent}
//         disabled={loading}
//         className="px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors disabled:opacity-50"
//       >
//         {loading ? "Ģenerē..." : "Ģenerēt Saturu"}
//       </button>
//       {loading && (
//         <p className="mt-2">Lūdzu uzgaidiet, kamēr tiek ģenerēts saturs...</p>
//       )}
//     </div>
//   );
// };

// const InteractiveElementsSelector: React.FC<any> = ({
//   interactiveElements,
//   setInteractiveElements,
// }) => {
//   const elements = [
//     { id: "slider", name: "Attēlu slīdnis" },
//     { id: "carousel", name: "Karuselis" },
//     { id: "accordion", name: "Akordeona izvēlne" },
//     { id: "tabs", name: "Cilnes" },
//     { id: "modal", name: "Modālais logs" },
//     { id: "tooltip", name: "Rīka padomi" },
//     { id: "dropdown", name: "Nolaižamā izvēlne" },
//     { id: "parallax", name: "Paralakses efekts" },
//   ];

//   const toggleElement = (elementId: string) => {
//     setInteractiveElements((prev: string[]) =>
//       prev.includes(elementId)
//         ? prev.filter((id) => id !== elementId)
//         : [...prev, elementId]
//     );
//   };

//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//       {elements.map((element) => (
//         <div
//           key={element.id}
//           onClick={() => toggleElement(element.id)}
//           className={`p-4 border rounded-lg cursor-pointer transition-colors ${
//             interactiveElements.includes(element.id)
//               ? "bg-blue-200 border-blue-500"
//               : "bg-white hover:bg-gray-100"
//           }`}
//         >
//           <h3 className="font-bold">{element.name}</h3>
//         </div>
//       ))}
//     </div>
//   );
// };

// const SketchBuilderComponent: React.FC<any> = ({
//   websiteType,
//   colorScheme,
//   customColorScheme,
//   layout,
//   features,
//   fontStyle,
//   headerImage,
//   aiGeneratedContent,
//   interactiveElements,
//   setSketch,
// }) => {
//   const currentColorScheme =
//     customColorScheme ||
//     baseColorSchemes.find((scheme) => scheme.id === colorScheme);

//   useEffect(() => {
//     setSketch({
//       websiteType,
//       colorScheme: currentColorScheme,
//       layout,
//       features,
//       fontStyle,
//       headerImage,
//       aiGeneratedContent,
//       interactiveElements,
//     });
//   }, [
//     websiteType,
//     colorScheme,
//     customColorScheme,
//     layout,
//     features,
//     fontStyle,
//     headerImage,
//     aiGeneratedContent,
//     interactiveElements,
//     setSketch,
//   ]);

//   return (
//     <div className="p-4 border rounded-lg bg-white shadow-md">
//       <h2 className="text-xl font-bold mb-4">Mājaslapas skice</h2>
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <p className="font-semibold">Tips:</p>
//           <p>{websiteTypes.find((type) => type.id === websiteType)?.name}</p>
//         </div>
//         <div>
//           <p className="font-semibold">Krāsu shēma:</p>
//           <p>{currentColorScheme?.name}</p>
//           <div className="flex space-x-2 mt-2">
//             {currentColorScheme?.colors.map((color) => (
//               <span
//                 key={color}
//                 className="w-6 h-6 rounded-full border border-gray-300"
//                 style={{ backgroundColor: color }}
//               ></span>
//             ))}
//           </div>
//         </div>
//         <div>
//           <p className="font-semibold">Izkārtojums:</p>
//           <p>{layouts.find((l) => l.id === layout)?.name}</p>
//         </div>
//         <div>
//           <p className="font-semibold">Fonta stils:</p>
//           <p>{fontStyles.find((f) => f.id === fontStyle)?.name}</p>
//         </div>
//         <div>
//           <p className="font-semibold">Funkcijas:</p>
//           <ul className="list-disc pl-5">
//             {features.map((f) => (
//               <li key={f}>
//                 {featuresList.find((feature) => feature.id === f)?.name}
//               </li>
//             ))}
//           </ul>
//         </div>
//         {headerImage && (
//           <div>
//             <p className="font-semibold">Galvenes attēls:</p>
//             <img
//               src={headerImage}
//               alt="Galvenes attēls"
//               className="w-full h-auto rounded-md mt-2"
//             />
//           </div>
//         )}
//       </div>
//       <div className="w-full">
//         <h2 className="text-xl font-bold mb-4">AI Ģenerētais Saturs:</h2>

//         <div className="space-y-6">
//           <div>
//             <h3 className="text-lg font-semibold mb-2">Virsraksts:</h3>
//             <p>
//               {aiGeneratedContent
//                 .split("Virsraksts:")[1]
//                 ?.split("Apraksts:")[0]
//                 .trim()}
//             </p>
//           </div>

//           <div>
//             <h3 className="text-lg font-semibold mb-2">Apraksts:</h3>
//             <p className="whitespace-pre-wrap">
//               {aiGeneratedContent
//                 .split("Apraksts:")[1]
//                 ?.split("Aicinājums Rīkoties:")[0]
//                 .trim()}
//             </p>
//           </div>

//           <div>
//             <h3 className="text-lg font-semibold mb-2">Aicinājums Rīkoties:</h3>
//             <p>{aiGeneratedContent.split("Aicinājums Rīkoties:")[1]?.trim()}</p>
//           </div>
//         </div>
//       </div>
//       <div>
//         <p className="font-semibold">Interaktīvie Elementi:</p>
//         <ul className="list-disc pl-5">
//           {interactiveElements.map((element) => (
//             <li key={element}>{element}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// const SketchPreview: React.FC<any> = ({
//   websiteType,
//   colorScheme,
//   customColorScheme,
//   layout,
//   features,
//   fontStyle,
//   headerImage,
//   aiGeneratedContent,
//   interactiveElements,
// }) => {
//   const currentColorScheme =
//     customColorScheme ||
//     baseColorSchemes.find((scheme) => scheme.id === colorScheme);
//   const layoutImage = layouts.find((l) => l.id === layout)?.image;
//   const safeInteractiveElements = Array.isArray(interactiveElements)
//     ? interactiveElements
//     : [];

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-4">Mājaslapas Priekšskatījums</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <h3 className="text-xl font-semibold mb-2">Informācija</h3>
//           <InfoItem
//             label="Tips"
//             value={websiteTypes.find((type) => type.id === websiteType)?.name}
//           />
//           <InfoItem label="Krāsu shēma" value={currentColorScheme?.name} />
//           <div className="flex space-x-2 my-2">
//             {currentColorScheme?.colors.map((color) => (
//               <span
//                 key={color}
//                 className="w-8 h-8 rounded-full border border-gray-300"
//                 style={{ backgroundColor: color }}
//               ></span>
//             ))}
//           </div>
//           <InfoItem
//             label="Izkārtojums"
//             value={layouts.find((l) => l.id === layout)?.name}
//           />
//           <InfoItem
//             label="Fonta stils"
//             value={fontStyles.find((f) => f.id === fontStyle)?.name}
//           />
//           <h4 className="font-semibold mt-4 mb-2">Funkcijas:</h4>
//           <ul className="list-disc pl-5">
//             {features.map((f) => (
//               <li key={f}>
//                 {featuresList.find((feature) => feature.id === f)?.name}
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div>
//           <h3 className="text-xl font-semibold mb-2">
//             Izkārtojuma Priekšskatījums
//           </h3>
//           {layoutImage && (
//             <img
//               src={layoutImage}
//               alt="Layout Preview"
//               className="w-full h-auto rounded-lg border border-gray-300"
//             />
//           )}
//           {headerImage && (
//             <div className="mt-4">
//               <h4 className="font-semibold mb-2">Galvenes Attēls:</h4>
//               <img
//                 src={headerImage}
//                 alt="Header Image"
//                 className="w-full h-auto rounded-lg border border-gray-300"
//               />
//             </div>
//           )}
//         </div>
//       </div>
//       <InteractiveElementsSection elements={safeInteractiveElements} />
//       <ColorDemonstration colors={currentColorScheme?.colors} />
//       <FontStyleSample fontStyle={fontStyle} />
//       <AIGeneratedContentPreview content={aiGeneratedContent} />
//     </div>
//   );
// };

// const InfoItem: React.FC<{ label: string; value: string | undefined }> = ({
//   label,
//   value,
// }) => (
//   <p>
//     <strong>{label}:</strong> {value}
//   </p>
// );

// const InteractiveElementsSection: React.FC<{ elements: string[] }> = ({
//   elements,
// }) => (
//   <div className="mt-6">
//     <h3 className="text-xl font-semibold mb-2">Interaktīvie Elementi</h3>
//     {elements.length > 0 ? (
//       <ul className="list-disc pl-5">
//         {elements.map((element, index) => (
//           <li key={index}>{element}</li>
//         ))}
//       </ul>
//     ) : (
//       <p>Nav izvēlēti interaktīvie elementi.</p>
//     )}
//   </div>
// );

// // ... (previous code remains the same)

// const ColorDemonstration: React.FC<{ colors: string[] | undefined }> = ({
//   colors,
// }) => (
//   <div className="mt-6">
//     <h3 className="text-xl font-semibold mb-2">Krāsu Demonstrācija</h3>
//     <div className="grid grid-cols-3 gap-4">
//       {colors?.map((color, index) => (
//         <div
//           key={color}
//           className="p-4 rounded-lg"
//           style={{ backgroundColor: color }}
//         >
//           <p
//             className="text-center font-semibold"
//             style={{ color: index === 0 ? "#fff" : "#000" }}
//           >
//             Krāsa {index + 1}
//           </p>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// const FontStyleSample: React.FC<{ fontStyle: string }> = ({ fontStyle }) => (
//   <div className="mt-6">
//     <h3 className="text-xl font-semibold mb-2">Fonta Stila Paraugs</h3>
//     <p style={{ fontFamily: fontStyle }} className="text-lg">
//       Šis ir parauga teksts izvēlētajā fonta stilā.
//     </p>
//   </div>
// );

// const AIGeneratedContentPreview: React.FC<{ content: string | null }> = ({
//   content,
// }) => {
//   if (!content) return null;

//   const [title, description, cta] = content.split("\n\n");

//   return (
//     <div className="mt-6 bg-gray-100 p-4 rounded-lg">
//       <h3 className="text-xl font-semibold mb-2">AI Ģenerētais Saturs</h3>
//       <div className="space-y-4">
//         <div>
//           <h4 className="font-semibold">Virsraksts:</h4>
//           <p>{title.replace("Virsraksts: ", "")}</p>
//         </div>
//         <div>
//           <h4 className="font-semibold">Apraksts:</h4>
//           <p>{description.replace("Apraksts: ", "")}</p>
//         </div>
//         <div>
//           <h4 className="font-semibold">Aicinājums Rīkoties:</h4>
//           <p>{cta.replace("Aicinājums Rīkoties: ", "")}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Enhance existing components with animations and improved UI

// const WebsiteTypeSelector: React.FC<any> = ({
//   websiteType,
//   setWebsiteType,
// }) => {
//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//       {websiteTypes.map((type) => (
//         <motion.div
//           key={type.id}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => setWebsiteType(type.id)}
//           className={`p-4 border rounded-lg cursor-pointer transition-colors ${
//             websiteType === type.id
//               ? "bg-blue-200 border-blue-500"
//               : "bg-white hover:bg-gray-100"
//           }`}
//         >
//           <span className="text-4xl block mb-2">{type.icon}</span>
//           <h3 className="text-lg font-semibold">{type.name}</h3>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// const ColorSchemeSelector: React.FC<any> = ({
//   colorScheme,
//   setColorScheme,
//   customColorScheme,
//   handleMixColors,
//   selectedPalettes,
//   setSelectedPalettes,
//   mixColorsEnabled,
//   setMixColorsEnabled,
// }) => {
//   return (
//     <div>
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
//         {baseColorSchemes.map((scheme) => (
//           <motion.div
//             key={scheme.id}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => setColorScheme(scheme.id)}
//             className={`p-4 border rounded-lg cursor-pointer transition-colors ${
//               colorScheme === scheme.id
//                 ? "bg-blue-200 border-blue-500"
//                 : "bg-white hover:bg-gray-100"
//             }`}
//           >
//             <h3 className="font-bold mb-2">{scheme.name}</h3>
//             <div className="flex space-x-2">
//               {scheme.colors.map((color) => (
//                 <span
//                   key={color}
//                   className="w-8 h-8 rounded-full border border-gray-300"
//                   style={{ backgroundColor: color }}
//                 ></span>
//               ))}
//             </div>
//             {mixColorsEnabled && (
//               <label className="flex items-center mt-2">
//                 <input
//                   type="checkbox"
//                   checked={selectedPalettes.includes(scheme.id)}
//                   onChange={(e) => {
//                     const selected = e.target.checked;
//                     setSelectedPalettes((prev) =>
//                       selected
//                         ? [...prev, scheme.id]
//                         : prev.filter((id) => id !== scheme.id)
//                     );
//                   }}
//                   className="mr-2"
//                 />
//                 Izvēlēties miksēšanai
//               </label>
//             )}
//           </motion.div>
//         ))}
//       </div>
//       <div className="flex items-center mb-4">
//         <input
//           type="checkbox"
//           checked={mixColorsEnabled}
//           onChange={(e) => setMixColorsEnabled(e.target.checked)}
//           className="mr-2"
//         />
//         <label>Miksēt krāsu Paletes</label>
//       </div>
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={handleMixColors}
//         disabled={!mixColorsEnabled || selectedPalettes.length < 2}
//         className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         <FaMagic className="inline-block mr-2" />
//         Apvienot krāsas
//       </motion.button>
//       {customColorScheme && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mt-4 p-4 border rounded-lg bg-gray-100"
//         >
//           <h3 className="font-bold mb-2">{customColorScheme.name}</h3>
//           <div className="flex space-x-2">
//             {customColorScheme.colors.map((color: string) => (
//               <span
//                 key={color}
//                 className="w-8 h-8 rounded-full border border-gray-300"
//                 style={{ backgroundColor: color }}
//               ></span>
//             ))}
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// // ... (other enhanced components like LayoutSelector, FeaturesSelector, etc.)

// export default SketchBuilder;
