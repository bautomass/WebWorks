import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import {
  Code,
  Palette,
  Sparkles,
  Zap,
  Shield,
  Rocket,
  AtomIcon,
  Database,
  Wind,
  Server,
  X,
  Check,
  ChevronRight,
  BarChart,
  SmartphoneNfc,
  ShoppingCart,
  AreaChart,
  PieChart,
  Smartphone,
  Apple,
  Store,
  CreditCard,
  Cloud,
} from "lucide-react";

interface Technology {
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  longDescription: string;
  features: string[];
  useCases: string[];
}

const technologies: Technology[] = [
  {
    name: "HTML5",
    icon: <Code />,
    description:
      "Modernā tīmekļa pamatvaloda, kas veido jebkuras mājaslapas struktūru.",
    color: "#E34F26",
    longDescription:
      "HTML5 ir jaunākā versija no Hypertext Markup Language, kas ir standarta marķēšanas valoda tīmekļa lapu veidošanai. Tā nodrošina pamata struktūru un saturu mājaslapām, piedāvājot plašu klāstu jaunu funkciju, tostarp uzlabotu multimediju atbalstu, jaunus semantiskos elementus un uzlabotu veiktspēju mobilajām ierīcēm.",
    features: [
      "Iebūvēts video un audio atbalsts",
      "Canvas elements 2D un 3D grafikas zīmēšanai",
      "Uzlabota veidlapu funkcionalitāte",
      "Offline web aplikāciju atbalsts",
      "Ģeolokācijas API",
    ],
    useCases: [
      "Responsīvu mājaslapu izveide",
      "Progresīvu web aplikāciju (PWA) izstrāde",
      "Interaktīvu lietotāja saskarņu veidošana",
      "Piekļūstamu web risinājumu izstrāde",
    ],
  },
  {
    name: "CSS3",
    icon: <Palette />,
    description:
      "Stilu valoda, kas piešķir mājaslapām vizuālo izskatu un responsivitāti.",
    color: "#1572B6",
    longDescription:
      "CSS3 ir jaunākā Cascading Style Sheets versija, kas ļauj veidot pārsteidzošus, responsīvus dizainus. Tā piedāvā jaunas iespējas, piemēram, animācijas, pārejas efektus, elastīgus izkārtojumus un pielāgojamus fontus, ļaujot izstrādātājiem radīt vizuāli saistošas un lietotājam draudzīgas saskarnes visām ierīcēm.",
    features: [
      "Flexbox un Grid izkārtojumi",
      "Animācijas un pārejas efekti",
      "Media queries responsīvam dizainam",
      "Pielāgojami fonti un ikonu fonti",
      "Krāsu gradientit un ēnas",
    ],
    useCases: [
      "Mobilajām ierīcēm draudzīgu dizainu veidošana",
      "Interaktīvu lietotāja saskarņu animēšana",
      "Sarežģītu, daudzslāņu izkārtojumu izveide",
      "Tēmu un stilu pielāgošana dažādām mērķauditorijām",
    ],
  },
  {
    name: "Sass",
    icon: <Sparkles />,
    description:
      "CSS paplašinājums, kas ļauj efektīvāk un modulārāk rakstīt stilus.",
    color: "#CC6699",
    longDescription:
      "Sass (Syntactically Awesome Style Sheets) ir CSS preprocesors, kas paplašina CSS funkcionalitāti ar mainīgajiem, funkcijām, iebūvētām operācijām un vairāk. Tas ļauj izstrādātājiem rakstīt tīrāku, ātrāk uzturamu un modulārāku CSS kodu, padarot stilu izstrādi efektīvāku un organizētāku.",
    features: [
      "Mainīgie stiliem un krāsām",
      "Nesting selektoru hierarhijas veidošanai",
      "Mixins atkārtoti izmantojamām stilu deklarācijām",
      "Funkcijas un operācijas vērtību aprēķināšanai",
      "Partial faili un importēšana modulārai struktūrai",
    ],
    useCases: [
      "Liela mēroga projektu stilu organizēšana",
      "Tēmu sistēmu izveide ar mainīgajiem",
      "Atkārtoti izmantojamu komponentu bibliotēku veidošana",
      "Ātra prototipēšana ar iepriekš definētiem stiliem",
    ],
  },
  {
    name: "JavaScript",
    icon: <Zap />,
    description:
      "Dinamiska programmēšanas valoda, kas padara mājaslapas interaktīvas.",
    color: "#F7DF1E",
    longDescription:
      "JavaScript ir daudzpusīga programmēšanas valoda, kas ļauj izstrādātājiem veidot interaktīvas un dinamiskas mājaslapas. Tā darbojas gan pārlūkprogrammā, gan serverī, nodrošinot plašas iespējas web aplikāciju izstrādei, no vienkāršas DOM manipulācijas līdz sarežģītām single-page aplikācijām.",
    features: [
      "Asinhronā programmēšana ar Promises un async/await",
      "Moduļu sistēma koda organizēšanai",
      "Funkcionālā un objektorientētā programmēšana",
      "DOM manipulācija un notikumu apstrāde",
      "API integrācija un datu apmaiņa",
    ],
    useCases: [
      "Interaktīvu lietotāja saskarņu izveide",
      "Single-page aplikāciju (SPA) izstrāde",
      "Serverside renderēšana ar Node.js",
      "Reāllaika web aplikāciju veidošana",
    ],
  },
  {
    name: "TypeScript",
    icon: <Shield />,
    description:
      "JavaScript paplašinājums ar stingru tipu pārbaudi, uzlabojot koda kvalitāti.",
    color: "#3178C6",
    longDescription:
      "TypeScript ir JavaScript superset, kas pievieno statisko tipu pārbaudi un citas progresīvas funkcijas. Tas ļauj izstrādātājiem rakstīt drošāku un vieglāk uzturamu kodu, nodrošinot labāku kļūdu atklāšanu izstrādes laikā un uzlabotu koda dokumentāciju.",
    features: [
      "Statiskā tipu pārbaude",
      "Interfaces un tipu anotācijas",
      "Paplašinātas OOP iespējas ar klasēm un moduļiem",
      "Ģeneriskie tipi elastīgiem risinājumiem",
      "Dekoratoru atbalsts metadatu pievienošanai",
    ],
    useCases: [
      "Liela mēroga web aplikāciju izstrāde",
      "Komandu sadarbība ar skaidri definētām saskarnēm",
      "Esošo JavaScript projektu uzlabošana",
      "Sarežģītu datu struktūru un algoritmu implementācija",
    ],
  },
  {
    name: "Next.js",
    icon: <Rocket />,
    description:
      "React ietvars, kas nodrošina ātru un SEO draudzīgu mājaslapu izstrādi.",
    color: "#000000",
    longDescription:
      "Next.js ir populārs React ietvars, kas piedāvā serverside renderēšanu, statisko lapu ģenerēšanu un citas optimizācijas. Tas ievērojami atvieglo ātru, mērogojamu un SEO draudzīgu web aplikāciju izveidi, automatizējot daudzus sarežģītus procesus un nodrošinot labu veiktspēju.",
    features: [
      "Serverside renderēšana (SSR) un statiskā lapu ģenerēšana (SSG)",
      "Automātiska koda sadalīšana un lazy loading",
      "Iebūvēts attēlu optimizācijas risinājums",
      "API maršruti serverless funkcijām",
      "Vienkārša lapu maršrutēšana un dinamiskā importēšana",
    ],
    useCases: [
      "E-komercijas platformu izveide",
      "Korporatīvo mājaslapu un aplikāciju izstrāde",
      "Satura pārvaldības sistēmu (CMS) veidošana",
      "Augstas veiktspējas web aplikācijas ar labu SEO",
    ],
  },
  {
    name: "React.js",
    icon: <AtomIcon />,
    description:
      "Moderna JavaScript bibliotēka lietotāja saskarnes veidošanai.",
    color: "#61DAFB",
    longDescription:
      "React.js ir populāra JavaScript bibliotēka lietotāja saskarņu veidošanai. Tā izmanto virtuālo DOM konceptu efektīvai UI atjaunināšanai un komponentes arhitektūru atkārtoti izmantojamam kodam. React ļauj izstrādātājiem veidot sarežģītas, interaktīvas lietotāja saskarnes ar deklaratīvu un efektīvu pieeju.",
    features: [
      "Komponenšu bāzēta arhitektūra",
      "Virtuālais DOM efektīvai renderēšanai",
      "JSX sintakse vieglai UI veidošanai",
      "Hooks stāvokļa un dzīves cikla pārvaldībai",
      "Plaša ekosistēma ar daudzām bibliotēkām un rīkiem",
    ],
    useCases: [
      "Single-page aplikāciju (SPA) izstrāde",
      "Progresīvu web aplikāciju (PWA) veidošana",
      "Interaktīvu informācijas paneļu izveide",
      "Mobilās aplikācijas ar React Native",
    ],
  },
  {
    name: "MongoDB",
    icon: <Database />,
    description:
      "Elastīga NoSQL datubāze ātrai un mērogojamai datu glabāšanai.",
    color: "#47A248",
    longDescription:
      "MongoDB ir populāra NoSQL datubāze, kas glabā datus BSON (Binary JSON) formātā. Tā piedāvā lielu elastību datu struktūrā, ātru veiktspēju un vieglu mērogojamību. MongoDB ir ideāli piemērota modernām web aplikācijām, kur nepieciešams apstrādāt lielu daudzumu nestrukturētu vai daļēji strukturētu datu.",
    features: [
      "Dokumentu-orientēta datu glabāšana",
      "Elastīgas shēmas bez stingri definētas struktūras",
      "Iebūvēta mērogojamība ar sharding",
      "Bagātīgas vaicājumu iespējas ar aggregation framework",
      "Reāllaika datu apstrāde ar change streams",
    ],
    useCases: [
      "Liela apjoma datu analīzes sistēmas",
      "Satura pārvaldības platformas",
      "Reāllaika analītikas risinājumi",
      "IoT (Internet of Things) datu apstrāde",
    ],
  },
  {
    name: "Tailwind",
    icon: <Wind />,
    description:
      "Utility-first CSS ietvars ātrai un pielāgojamai saskarnes veidošanai.",
    color: "#06B6D4",
    longDescription:
      "Tailwind CSS ir utility-first CSS ietvars, kas ļauj ātri veidot pielāgotas lietotāja saskarnes, izmantojot iepriekš definētas klases. Tas nodrošina zemu abstrakcijas līmeni, ļaujot izstrādātājiem veidot unikālus dizainus bez nepieciešamības rakstīt pielāgotu CSS, vienlaikus saglabājot konsekventu dizaina sistēmu.",
    features: [
      "Plašs utility klašu klāsts visām CSS īpašībām",
      "Responsīvs dizains ar iebūvētiem breikpointiem",
      "Vienkārša pielāgošana ar konfigurācijas failu",
      "Tumšā režīma atbalsts",
      "JIT (Just-In-Time) kompilācija optimālam veiktspējas līmenim",
    ],
    useCases: [
      "Ātra prototipēšana un UI izstrāde",
      "Konsekventu dizaina sistēmu ieviešana lielos projektos",
      "Responsīvu mājaslapu un web aplikāciju veidošana",
      "Pielāgotu komponentu bibliotēku izveide",
    ],
  },
  {
    name: "Supabase",
    icon: <Server />,
    description:
      "Atvērtā pirmkoda Firebase alternatīva ar reāllaika un REST API.",
    color: "#3ECF8E",
    longDescription:
      "Supabase ir atvērtā pirmkoda platforma, kas piedāvā virkni backenda pakalpojumu, tostarp datubāzi, autentifikāciju, storage un reāllaika abonementus. Tā ir veidota kā Firebase alternatīva, bet balstīta uz PostgreSQL, piedāvājot spēcīgas SQL iespējas kopā ar modernām reāllaika funkcijām.",
    features: [
      "PostgreSQL datubāze ar reāllaika atjauninājumiem",
      "Iebūvēta autentifikācija un lietotāju pārvaldība",
      "Failu glabāšana un pārvaldība",
      "Automātiski ģenerēta REST un GraphQL API",
      "Serverless funkcijas ar Edge Functions",
    ],
    useCases: [
      "Reāllaika sadarbības rīki un čati",
      "Daudzlietotāju SaaS aplikācijas",
      "Mobilās aplikācijas ar servera sinhronizāciju",
    ],
  },
  {
    name: "Google Analytics",
    icon: <BarChart />,
    description:
      "Visaptverošs tīmekļa analītikas rīks lietotāju uzvedības izpētei.",
    color: "#E37400",
    longDescription:
      "Google Analytics ir spēcīgs tīmekļa analītikas rīks, kas ļauj uzņēmumiem sekot līdzi vietnes apmeklētāju uzvedībai, konversijām un citiem svarīgiem datiem. Tas sniedz detalizētu ieskatu par to, kā lietotāji mijiedarbojas ar jūsu vietni.",
    features: [
      "Reāllaika datu analīze",
      "Pielāgojami atskaišu paneļi",
      "Mērķu un konversiju izsekošana",
      "Integrācija ar citiem Google rīkiem",
      "Lietotāju plūsmas vizualizācija",
    ],
    useCases: [
      "Vietnes veiktspējas optimizācija",
      "Mārketinga kampaņu efektivitātes mērīšana",
      "Lietotāju uzvedības analīze",
      "E-komercijas pārdošanas izsekošana",
    ],
  },
  {
    name: "SEMrush",
    icon: <AreaChart />,
    description: "Visaptverošs SEO un digitālā mārketinga rīku komplekts.",
    color: "#FF642D",
    longDescription:
      "SEMrush ir daudzpusīga platforma, kas piedāvā rīkus SEO, satura mārketingam, konkurentu izpētei un reklāmai. Tas palīdz uzņēmumiem uzlabot savu tiešsaistes redzamību un palielināt organisko trafiku.",
    features: [
      "Atslēgvārdu izpēte un analīze",
      "Vietnes audits un optimizācijas ieteikumi",
      "Konkurentu analīze",
      "Backlink profila pārvaldība",
      "Satura mārketinga rīki",
    ],
    useCases: [
      "SEO stratēģiju izstrāde",
      "Konkurentu izpēte un analīze",
      "Satura optimizācija meklētājprogrammām",
      "PPC kampaņu plānošana",
    ],
  },
  {
    name: "Hotjar",
    icon: <PieChart />,
    description: "Lietotāju uzvedības analīzes un atgriezeniskās saites rīks.",
    color: "#FF3C00",
    longDescription:
      "Hotjar ir lietotāju uzvedības analīzes rīks, kas palīdz saprast, kā apmeklētāji mijiedarbojas ar jūsu vietni. Tas piedāvā karstuma kartes, sesiju ierakstus un aptaujas, lai sniegtu dziļāku ieskatu lietotāju pieredzē.",
    features: [
      "Karstuma kartes un klikšķu kartes",
      "Lietotāju sesiju ieraksti",
      "Aptaujas un atsauksmju veidlapas",
      "Piltuves analīze",
      "Formu analīze",
    ],
    useCases: [
      "Lietotāju pieredzes (UX) optimizācija",
      "Konversijas līmeņa paaugstināšana",
      "A/B testu rezultātu analīze",
      "Klientu atgriezeniskās saites vākšana",
    ],
  },

  // Mobile App Development
  {
    name: "React Native",
    icon: <Smartphone />,
    description: "Populārs ietvars hibrīdo mobilo lietotņu izstrādei.",
    color: "#61DAFB",
    longDescription:
      "React Native ir atvērtā koda ietvars, kas ļauj izstrādāt mobilās lietotnes gan iOS, gan Android platformām, izmantojot JavaScript un React. Tas ļauj veidot augstas veiktspējas lietotnes ar izskatu un sajūtu, kas līdzinās platformai raksturīgajām lietotnēm.",
    features: [
      "Koda atkārtota izmantošana starp platformām",
      "Liela izstrādātāju kopiena un ekosistēma",
      "Ātra izstrāde ar karstās pārlādēšanas funkciju",
      "Platformai raksturīgi komponenti",
      "Iespēja integrēt ar esošo platformas kodu",
    ],
    useCases: [
      "Krosplatformu mobilo lietotņu izstrāde",
      "Prototipēšana un ātra MVP izveide",
      "Esošo tīmekļa lietotņu pārveidošana mobilajām ierīcēm",
      "Uzņēmumu lietotņu izstrāde",
    ],
  },
  {
    name: "Swift",
    icon: <Apple />,
    description: "Apple izstrādāta programmēšanas valoda iOS lietotnēm.",
    color: "#FFAC45",
    longDescription:
      "Swift ir jaudīga un intuitīva programmēšanas valoda, ko Apple izveidojis iOS, macOS, watchOS un tvOS lietotņu izstrādei. Tā ir moderna, droša un ļauj izstrādātājiem ātri veidot augstas veiktspējas lietotnes ar skaidru un saprotamu kodu.",
    features: [
      "Ātra un efektīva izpilde",
      "Automātiska atmiņas pārvaldība",
      "Plaša standarta bibliotēka",
      "Integrācija ar Objective-C",
      "Playground vide ātrai prototipēšanai",
    ],
    useCases: [
      "iOS lietotņu izstrāde",
      "macOS darbvirsmas lietotņu veidošana",
      "Apple Watch un Apple TV lietotņu izstrāde",
      "Spēļu izstrāde ar SpriteKit vai SceneKit",
    ],
  },
  {
    name: "Kotlin",
    icon: <SmartphoneNfc />,
    description: "Moderna programmēšanas valoda Android lietotņu izstrādei.",
    color: "#7F52FF",
    longDescription:
      "Kotlin ir moderna, ekspresīva programmēšanas valoda, ko Google atbalsta kā galveno valodu Android lietotņu izstrādei. Tā ir pilnībā savietojama ar Java, bet piedāvā daudzas papildu funkcijas un sintakses uzlabojumus, kas padara kodu īsāku un vieglāk lasāmu.",
    features: [
      "Pilnīga savietojamība ar Java",
      "Null drošība un drošāka koda rakstīšana",
      "Funkcionālā programmēšana",
      "Korutīnas asinhronu operāciju veikšanai",
      "Android Jetpack atbalsts",
    ],
    useCases: [
      "Android lietotņu izstrāde",
      "Servera puses izstrāde ar Kotlin/JVM",
      "Krosplatformu mobilo lietotņu izstrāde ar Kotlin Multiplatform",
      "Mašīnmācīšanās ar Kotlin for Data Science",
    ],
  },

  // E-commerce Solutions
  {
    name: "Shopify",
    icon: <ShoppingCart />,
    description:
      "Visaptveroša e-komercijas platforma tiešsaistes veikalu izveidei.",
    color: "#96BF48",
    longDescription:
      "Shopify ir vadošā e-komercijas platforma, kas ļauj uzņēmumiem veidot, pārvaldīt un attīstīt savus tiešsaistes veikalus. Tā piedāvā plašu funkciju klāstu, sākot no veikala dizaina līdz inventāra pārvaldībai un maksājumu apstrādei.",
    features: [
      "Pielāgojamas veikala tēmas",
      "Iebūvēta SEO optimizācija",
      "Drošas maksājumu apstrādes iespējas",
      "Inventāra pārvaldības rīki",
      "Mārketinga un analītikas rīki",
    ],
    useCases: [
      "Tiešsaistes mazumtirdzniecības veikalu izveide",
      "Daudzkanālu pārdošanas integrācija",
      "Dropshipping biznesa uzsākšana",
      "B2B e-komercijas risinājumi",
    ],
  },
  {
    name: "WooCommerce",
    icon: <Store />,
    description: "Populārs e-komercijas spraudnis WordPress platformai.",
    color: "#96588A",
    longDescription:
      "WooCommerce ir atvērtā koda e-komercijas risinājums, kas darbojas kā WordPress spraudnis. Tas ļauj viegli pārvērst jebkuru WordPress vietni par pilnvērtīgu tiešsaistes veikalu, piedāvājot plašas pielāgošanas iespējas un lielu skaitu paplašinājumu.",
    features: [
      "Pilnībā pielāgojams un paplašināms",
      "Liela kopiena un plaša dokumentācija",
      "Daudz bezmaksas un maksas paplašinājumu",
      "SEO draudzīgs",
      "Integrācija ar populārākajām maksājumu sistēmām",
    ],
    useCases: [
      "Mazo un vidējo uzņēmumu tiešsaistes veikali",
      "Digitālo produktu pārdošana",
      "Abonementu un periodisko maksājumu sistēmas",
      "Pielāgoti e-komercijas risinājumi",
    ],
  },
  {
    name: "Stripe",
    icon: <CreditCard />,
    description: "Moderna maksājumu apstrādes platforma tiešsaistes biznesam.",
    color: "#6772E5",
    longDescription:
      "Stripe ir tehnoloģiju uzņēmums, kas nodrošina infrastruktūru internetā veiktajiem ekonomiskajiem darījumiem. Tas piedāvā plašu API un rīku klāstu, kas ļauj uzņēmumiem pieņemt maksājumus, pārvaldīt abonementus un veikt citas finanšu operācijas tiešsaistē.",
    features: [
      "Droša un ātra maksājumu apstrāde",
      "Atbalsts vairāk nekā 135 valūtām",
      "Pielāgojamas maksājumu formas",
      "Abonementu un periodisko maksājumu pārvaldība",
      "Krāpšanas novēršanas rīki",
    ],
    useCases: [
      "E-komercijas maksājumu integrācija",
      "Abonementu biznesa modeļi",
      "Platformas ar vairākiem pārdevējiem",
      "Crowdfunding un ziedojumu vākšanas risinājumi",
    ],
  },
  {
    name: "Docker",
    icon: <Cloud />,
    description:
      "Platforma lietotņu izstrādei, piegādei un darbināšanai konteinerizētā vidē.",
    color: "#2496ED",
    longDescription:
      "Docker ir atvērtā koda platforma, kas automatizē lietotņu izvietošanu, mērogošanu un pārvaldību, izmantojot konteineru tehnoloģiju. Tas ļauj izstrādātājiem 'iepakot' lietotni ar visām tās atkarībām vienā standartizētā vienībā, ko sauc par konteineru.",
    features: [
      "Viegla lietotņu izolācija un pārvaldība",
      "Ātra un konsistenta izstrādes vide",
      "Efektīva resursu izmantošana",
      "Vienkārša mērogošana un atjaunināšana",
      "Liela ekosistēma ar gataviem konteineru attēliem",
    ],
    useCases: [
      "Mikroservisu arhitektūras ieviešana",
      "Nepārtrauktas integrācijas un piegādes (CI/CD) plūsmu uzlabošana",
      "Daudzslāņu lietotņu izstrāde un izvietošana",
      "Konsistentas izstrādes, testēšanas un ražošanas vides nodrošināšana",
    ],
  },
];

const TechStack: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { top } = containerRef.current.getBoundingClientRect();
        const isVisible =
          top < window.innerHeight && top > -containerRef.current.offsetHeight;
        if (isVisible) {
          controls.start("visible");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  const handleCardClick = (tech: Technology) => {
    setSelectedTech(tech);
  };

  return (
    <section
      ref={containerRef}
      className="py-16 px-4 overflow-hidden relative bg-gradient-to-br from-gray-900 to-gray-800"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-white"
        >
          Ko Mēs Izmantojam Izstrādājot Mūsu Produktus
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: index * 0.1 },
                },
              }}
              onClick={() => handleCardClick(tech)}
              className="relative group cursor-pointer"
            >
              <motion.div
                className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-6 shadow-lg transition-all duration-300 group-hover:shadow-2xl border border-gray-700 overflow-hidden"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                style={{ boxShadow: `0 0 20px ${tech.color}40` }}
              >
                <div className="flex flex-col items-center justify-center h-full relative z-10">
                  <div className="mb-4 text-4xl" style={{ color: tech.color }}>
                    {tech.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white text-center">
                    {tech.name}
                  </h3>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-in-out -skew-x-12"></div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selectedTech && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-2/3 lg:w-1/2 bg-gray-900 bg-opacity-95 backdrop-blur-md text-white p-8 overflow-y-auto z-50 custom-scrollbar"
            style={{
              boxShadow: `-10px 0 30px ${selectedTech.color}40`,
            }}
          >
            <button
              onClick={() => setSelectedTech(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <X size={24} />
            </button>
            <div className="flex items-center mb-8">
              <div
                className="text-6xl mr-6"
                style={{ color: selectedTech.color }}
              >
                {selectedTech.icon}
              </div>
              <h2 className="text-4xl font-bold">{selectedTech.name}</h2>
            </div>
            <p className="text-xl mb-8 text-gray-300">
              {selectedTech.description}
            </p>
            <div className="space-y-8">
              <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-4 flex items-center">
                  <ChevronRight
                    className="mr-2"
                    size={24}
                    style={{ color: selectedTech.color }}
                  />
                  Kas ir {selectedTech.name}?
                </h3>
                <p className="text-gray-300 text-lg">
                  {selectedTech.longDescription}
                </p>
              </div>
              <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-4 flex items-center">
                  <ChevronRight
                    className="mr-2"
                    size={24}
                    style={{ color: selectedTech.color }}
                  />
                  Galvenās iezīmes
                </h3>
                <ul className="space-y-3">
                  {selectedTech.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check
                        className="text-green-500 mr-3 mt-1 flex-shrink-0"
                        size={20}
                      />
                      <span className="text-gray-300 text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-4 flex items-center">
                  <ChevronRight
                    className="mr-2"
                    size={24}
                    style={{ color: selectedTech.color }}
                  />
                  Pielietojuma gadījumi
                </h3>
                <ul className="space-y-3">
                  {selectedTech.useCases.map((useCase, index) => (
                    <li key={index} className="flex items-start">
                      <Rocket
                        className="text-blue-500 mr-3 mt-1 flex-shrink-0"
                        size={20}
                      />
                      <span className="text-gray-300 text-lg">{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TechStack;
