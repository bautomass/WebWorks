"use client";

"use client";

import React, { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../components/Header";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Scatter,
  ScatterChart,
  AreaChart,
  Area,
} from "recharts";
import {
  FaLightbulb,
  FaChartLine,
  FaRobot,
  FaGlobe,
  FaGraduationCap,
  FaChessKnight,
  FaRocket,
  FaMicrophone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const COLORS: string[] = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

interface KeywordData {
  keyword: string;
  searchVolume: number;
  difficulty: number;
  cpc: string;
  trend: number[];
  intent: string;
  seasonality: string;
  competition: number;
  serp: {
    organic: number;
    paid: number;
    features: string[];
  };
  relatedKeywords: string[];
  sentiment: number;
  growthPotential: number;
  aiSuggestions: string[];
  difficultyTrend: number[];
  localRelevance: boolean;
  aiInsights?: string;
}

// Simulated API for real-time data fetching
const fetchKeywordData = async (keyword: string): Promise<KeywordData> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    keyword,
    searchVolume: Math.floor(Math.random() * 10000) + 500,
    difficulty: Math.floor(Math.random() * 100),
    cpc: (Math.random() * 5).toFixed(2),
    trend: Array(12)
      .fill(0)
      .map(() => Math.floor(Math.random() * 1000) + 500),
    intent: ["Informational", "Navigational", "Commercial", "Transactional"][
      Math.floor(Math.random() * 4)
    ],
    seasonality: ["Stable", "Seasonal", "Trending", "Declining"][
      Math.floor(Math.random() * 4)
    ],
    competition: Math.random(),
    serp: {
      organic: Math.floor(Math.random() * 50) + 50,
      paid: Math.floor(Math.random() * 20),
      features: [
        "Featured Snippet",
        "Image Pack",
        "Video Results",
        "People Also Ask",
      ].filter(() => Math.random() > 0.5),
    },
    relatedKeywords: Array(5)
      .fill("")
      .map(
        () => `Related ${keyword} ${Math.random().toString(36).substring(7)}`
      ),
    sentiment: parseFloat((Math.random() * 2 - 1).toFixed(2)),
    growthPotential: Math.floor(Math.random() * 100),
    aiSuggestions: [
      "Optimize for voice search",
      "Create long-form content",
      "Focus on user intent",
      "Improve page loading speed",
    ].filter(() => Math.random() > 0.5),
    difficultyTrend: Array(6)
      .fill(0)
      .map(() => Math.floor(Math.random() * 100)),
    localRelevance: Math.random() > 0.5,
  };
};

interface CustomAlertProps {
  title: string;
  description: string;
  variant?: "default" | "destructive";
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  title,
  description,
  variant = "default",
}) => {
  const bgColor = variant === "destructive" ? "bg-red-100" : "bg-yellow-100";
  const textColor =
    variant === "destructive" ? "text-red-800" : "text-yellow-800";

  return (
    <div className={`${bgColor} ${textColor} p-4 rounded-md mb-6`}>
      <h3 className="font-bold">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

interface KeywordCardProps {
  keyword: KeywordData;
  onSelect: (keyword: KeywordData) => void;
}

const KeywordCard: React.FC<KeywordCardProps> = ({ keyword, onSelect }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    className="bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl"
    onClick={() => onSelect(keyword)}
  >
    <h3 className="text-xl font-bold mb-3 text-indigo-700">
      {keyword.keyword}
    </h3>
    <div className="flex justify-between items-center mb-4">
      <div className="text-sm">
        <p className="font-semibold">
          Apjoms: <span className="text-green-600">{keyword.searchVolume}</span>
        </p>
        <p className="font-semibold">
          Grūtība: <span className="text-orange-500">{keyword.difficulty}</span>
        </p>
        <p className="font-semibold">
          Nolūks: <span className="text-blue-500">{keyword.intent}</span>
        </p>
      </div>
      <div className="w-16 h-16">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={[
                { name: "Difficulty", value: keyword.difficulty },
                { name: "Ease", value: 100 - keyword.difficulty },
              ]}
              cx="50%"
              cy="50%"
              innerRadius={15}
              outerRadius={30}
              fill="#8884d8"
              dataKey="value"
            >
              {[0, 1].map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className="text-xs text-gray-500">
      <p>
        CPC: {keyword.cpc}€ | Sentiments:{" "}
        {parseFloat(keyword.sentiment.toString()) > 0 ? "Pozitīvs" : "Negatīvs"}
      </p>
    </div>
  </motion.div>
);

interface TrendChartProps {
  data: number[];
}

const TrendChart: React.FC<TrendChartProps> = ({ data }) => (
  <ResponsiveContainer width="100%" height={200}>
    <LineChart data={data.map((value, index) => ({ name: index, value }))}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="value"
        stroke="#8884d8"
        strokeWidth={2}
        dot={false}
      />
    </LineChart>
  </ResponsiveContainer>
);

interface CompetitionChartProps {
  competition: number;
}

const CompetitionChart: React.FC<CompetitionChartProps> = ({ competition }) => (
  <ResponsiveContainer width="100%" height={100}>
    <BarChart data={[{ competition }]}>
      <Bar dataKey="competition" fill="#82ca9d" />
      <XAxis tick={false} />
      <YAxis domain={[0, 1]} ticks={[0, 0.25, 0.5, 0.75, 1]} />
      <Tooltip
        formatter={(value: number) => [
          `${(value * 100).toFixed(0)}%`,
          "Konkurence",
        ]}
        labelFormatter={() => ""}
      />
    </BarChart>
  </ResponsiveContainer>
);

interface SentimentRadarProps {
  sentiment: number;
  growthPotential: number;
}

const SentimentRadar: React.FC<SentimentRadarProps> = ({
  sentiment,
  growthPotential,
}) => {
  const data = [
    { subject: "Sentiments", A: (sentiment + 1) * 50, fullMark: 100 },
    { subject: "Izaugsmes potenciāls", A: growthPotential, fullMark: 100 },
  ];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar
          name="Keyword"
          dataKey="A"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

interface KeywordClusterViewProps {
  relatedKeywords: string[];
}

const KeywordClusterView: React.FC<KeywordClusterViewProps> = ({
  relatedKeywords,
}) => {
  const data = relatedKeywords.map((kw) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    z: Math.random() * 1000 + 100,
    name: kw,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <XAxis type="number" dataKey="x" name="Relevance" />
        <YAxis type="number" dataKey="y" name="Competition" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name="Keywords" data={data} fill="#8884d8">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
};

interface GlobalTrendsAnalysisProps {
  keyword: string;
}

const GlobalTrendsAnalysis: React.FC<GlobalTrendsAnalysisProps> = ({
  keyword,
}) => {
  const trendsData = [
    { region: "Eiropa", volume: Math.floor(Math.random() * 1000000) },
    { region: "Ziemeļamerika", volume: Math.floor(Math.random() * 1000000) },
    { region: "Āzija", volume: Math.floor(Math.random() * 1000000) },
    { region: "Dienvidamerika", volume: Math.floor(Math.random() * 1000000) },
    { region: "Afrika", volume: Math.floor(Math.random() * 1000000) },
    { region: "Okeānija", volume: Math.floor(Math.random() * 1000000) },
  ];

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">
        Globālās Tendences: {keyword}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={trendsData}>
          <XAxis dataKey="region" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="volume" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <p className="mt-4 text-gray-600">
        Šī diagramma parāda atslēgvārda "{keyword}" meklēšanas apjomu dažādos
        pasaules reģionos. Izmantojiet šos datus, lai pielāgotu savu globālo
        mārketinga stratēģiju.
      </p>
    </div>
  );
};

interface AIInsightsComponentProps {
  keyword: string;
  aiInsights?: string;
}

const AIInsightsComponent: React.FC<AIInsightsComponentProps> = ({
  keyword,
  aiInsights,
}) => {
  return (
    <div className="mt-8 bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-xl shadow-md">
      <h3 className="text-2xl font-bold mb-4 text-indigo-800">
        <FaLightbulb className="inline-block mr-2" />
        AI Ieskati: {keyword}
      </h3>
      <p className="text-gray-700 mb-4">{aiInsights}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-semibold mb-2">Ieteicamās Darbības</h4>
          <ul className="list-disc pl-5">
            <li>Izveidojiet detalizētu long-form saturu</li>
            <li>Optimizējiet lapas ātrumu mobilajām ierīcēm</li>
            <li>Izmantojiet strukturētos datus (schema markup)</li>
          </ul>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-semibold mb-2">Potenciālie Riski</h4>
          <ul className="list-disc pl-5">
            <li>Augošā konkurence nišas tirgū</li>
            <li>Iespējamās izmaiņas meklētājprogrammu algoritmos</li>
            <li>Sezonālas svārstības pieprasījumā</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

interface KeywordForecastChartProps {
  keyword: string;
}

const KeywordForecastChart: React.FC<KeywordForecastChartProps> = ({
  keyword,
}) => {
  const forecastData = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    volume: Math.floor(Math.random() * 1000 + 500),
  }));

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">
        12 Mēnešu Prognoze: {keyword}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={forecastData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="volume"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
      <p className="mt-4 text-gray-600">
        Šī prognoze parāda paredzamo meklēšanas apjoma dinamiku nākamajiem 12
        mēnešiem. Izmantojiet šos datus, lai plānotu savu satura un SEO
        stratēģiju.
      </p>
    </div>
  );
};

interface SEODifficultyMeterProps {
  difficulty: number;
}

const SEODifficultyMeter: React.FC<SEODifficultyMeterProps> = ({
  difficulty,
}) => {
  const getColor = (value: number): string => {
    if (value <= 30) return "bg-green-500";
    if (value <= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="mt-4">
      <h4 className="text-lg font-semibold mb-2">SEO Grūtības Pakāpe</h4>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${getColor(difficulty)}`}
          style={{ width: `${difficulty}%` }}
        ></div>
      </div>
      <p className="mt-2 text-sm">
        {difficulty <= 30 && "Viegli optimizējams - ideāls iesācējiem!"}
        {difficulty > 30 &&
          difficulty <= 70 &&
          "Mēreni grūts - nepieciešama vidēja pieredze."}
        {difficulty > 70 &&
          "Ļoti konkurētspējīgs - nepieciešama eksperta pieeja."}
      </p>
    </div>
  );
};

interface CompetitorInsightsProps {
  keyword: string;
}

const CompetitorInsights: React.FC<CompetitorInsightsProps> = ({ keyword }) => {
  const competitors = [
    {
      name: "competitor1.lv",
      strength: 85,
      weaknesses: ["Lēns lapas ielādes ātrums", "Vecs saturs"],
    },
    {
      name: "competitor2.lv",
      strength: 72,
      weaknesses: ["Vāja mobilā versija", "Maz iekšējo saišu"],
    },
    {
      name: "competitor3.lv",
      strength: 90,
      weaknesses: ["Nepietiekams saturs", "Vāja sociālo mediju klātbūtne"],
    },
  ];

  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold mb-4 text-indigo-700">
        Konkurentu Analīze
      </h3>
      {competitors.map((competitor, index) => (
        <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-lg font-semibold">{competitor.name}</h4>
          <p className="mb-2">Stiprums: {competitor.strength}/100</p>
          <p className="font-semibold">Vājās vietas:</p>
          <ul className="list-disc pl-5">
            {competitor.weaknesses.map((weakness, wIndex) => (
              <li key={wIndex}>{weakness}</li>
            ))}
          </ul>
        </div>
      ))}
      <p className="mt-4 text-sm text-gray-600">
        Izmantojiet šo informāciju, lai identificētu iespējas un uzlabotu savu
        stratēģiju.
      </p>
    </div>
  );
};

interface ActionableTipsProps {
  keyword: string;
  difficulty: number;
}

const ActionableTips: React.FC<ActionableTipsProps> = ({
  keyword,
  difficulty,
}) => {
  const tips = [
    {
      title: "Optimizējiet Meta Aprakstu",
      description:
        "Izveidojiet pievilcīgu meta aprakstu ar atslēgvārdu, lai uzlabotu CTR.",
      difficulty: "Viegli",
    },
    {
      title: "Uzlabojiet Lapas Ātrdarbību",
      description:
        "Palieliniet lapas ielādes ātrumu, optimizējot attēlus un izmantojot kešatmiņu.",
      difficulty: "Vidēji",
    },
    {
      title: "Veidojiet Autoritatīvu Saturu",
      description:
        "Radiet padziļinātu, vērtīgu saturu par tēmu, iekļaujot ekspertu viedokļus.",
      difficulty: "Grūti",
    },
  ];

  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold mb-4 text-indigo-700">
        Tūlītēji Veicamās Darbības
      </h3>
      {tips.map((tip, index) => (
        <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-lg font-semibold">{tip.title}</h4>
          <p className="mb-2">{tip.description}</p>
          <span
            className={`text-sm font-semibold ${
              tip.difficulty === "Viegli"
                ? "text-green-500"
                : tip.difficulty === "Vidēji"
                ? "text-yellow-500"
                : "text-red-500"
            }`}
          >
            Sarežģītība: {tip.difficulty}
          </span>
        </div>
      ))}
    </div>
  );
};

interface ContentIdeaGeneratorProps {
  keyword: string;
}

const ContentIdeaGenerator: React.FC<ContentIdeaGeneratorProps> = ({
  keyword,
}) => {
  const [ideas, setIdeas] = useState<string[]>([]);

  const generateIdeas = () => {
    const newIdeas = [
      `10 Labākie Padomi par ${keyword}`,
      `Kā ${keyword} Var Uzlabot Jūsu Biznesu`,
      `${keyword} Iesācējiem: Viss, Kas Jums Jāzina`,
      `${keyword} Mīti un Patiesība`,
      `Nākotnes Tendences: ${keyword} 2028. Gadā`,
    ];
    setIdeas(newIdeas);
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold mb-4 text-indigo-700">
        Satura Ideju Ģenerators
      </h3>
      <button
        onClick={generateIdeas}
        className="mb-4 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition duration-300"
      >
        Ģenerēt Idejas
      </button>
      {ideas.length > 0 && (
        <ul className="list-disc pl-5">
          {ideas.map((idea, index) => (
            <li key={index} className="mb-2">
              {idea}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const LearningResources: React.FC = () => {
  const resources = [
    { title: "SEO Pamati", link: "#", icon: <FaGraduationCap /> },
    {
      title: "Atslēgvārdu Izpētes Stratēģijas",
      link: "#",
      icon: <FaChessKnight />,
    },
    { title: "Kā Izmantot AtslēgvārduPro 2027", link: "#", icon: <FaRocket /> },
  ];

  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold mb-4 text-indigo-700">
        Mācību Resursi
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {resources.map((resource, index) => (
          <a
            key={index}
            href={resource.link}
            className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-300"
          >
            <span className="text-2xl mr-3 text-indigo-600">
              {resource.icon}
            </span>
            <span className="font-semibold">{resource.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

interface SERPPreviewProps {
  keyword: string;
}

const SERPPreview: React.FC<SERPPreviewProps> = ({ keyword }) => {
  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold mb-4 text-indigo-700">
        SERP Priekšskatījums
      </h3>
      <div className="border border-gray-300 p-4 rounded-lg">
        <h4 className="text-blue-600 text-xl mb-2 cursor-pointer hover:underline">
          {keyword} - Viss, ko jums jāzina | YourWebsite.lv
        </h4>
        <p className="text-green-700 text-sm mb-2">
          https://www.yourwebsite.lv/{keyword.toLowerCase().replace(/ /g, "-")}
        </p>
        <p className="text-gray-600">
          Uzziniet visu par {keyword}. Mūsu ekspertu sagatavotajā rakstā
          atradīsiet noderīgu informāciju, padomus un ieteikumus. Klikšķiniet,
          lai uzzinātu vairāk!
        </p>
      </div>
    </div>
  );
};

interface KeywordDifficultyTrendProps {
  difficultyTrend: number[];
}

const KeywordDifficultyTrend: React.FC<KeywordDifficultyTrendProps> = ({
  difficultyTrend,
}) => {
  const data = difficultyTrend.map((value, index) => ({
    month: index + 1,
    value,
  }));

  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold mb-4 text-indigo-700">
        Atslēgvārda Grūtības Tendence
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
      <p className="mt-4 text-gray-600">
        Šī diagramma parāda, kā mainījusies atslēgvārda optimizācijas grūtība
        pēdējo 6 mēnešu laikā. Izmantojiet šo informāciju, lai plānotu savu
        ilgtermiņa SEO stratēģiju.
      </p>
    </div>
  );
};

interface ROICalculatorProps {
  keyword: string;
  searchVolume: number;
  cpc: string;
}

const ROICalculator: React.FC<ROICalculatorProps> = ({
  keyword,
  searchVolume,
  cpc,
}) => {
  const [conversionRate, setConversionRate] = useState<number>(2);
  const [averageOrderValue, setAverageOrderValue] = useState<number>(50);

  const potentialRevenue = (
    searchVolume *
    (conversionRate / 100) *
    averageOrderValue
  ).toFixed(2);
  const potentialROI = (
    ((parseFloat(potentialRevenue) - searchVolume * parseFloat(cpc)) /
      (searchVolume * parseFloat(cpc))) *
    100
  ).toFixed(2);

  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold mb-4 text-indigo-700">
        ROI Kalkulators
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Konversijas Līmenis (%)</label>
          <input
            type="number"
            value={conversionRate}
            onChange={(e) => setConversionRate(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Vidējā Pasūtījuma Vērtība (€)</label>
          <input
            type="number"
            value={averageOrderValue}
            onChange={(e) => setAverageOrderValue(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      <div className="mt-4">
        <p className="font-semibold">
          Potenciālie Ieņēmumi: €{potentialRevenue}
        </p>
        <p className="font-semibold">Potenciālais ROI: {potentialROI}%</p>
      </div>
    </div>
  );
};

interface VoiceSearchTipsProps {
  keyword: string;
}

const VoiceSearchTips: React.FC<VoiceSearchTipsProps> = ({ keyword }) => {
  const tips = [
    "Izmantojiet dabiskas valodas frāzes",
    "Atbildiet uz biežāk uzdotajiem jautājumiem",
    "Optimizējiet saturu mobilajām ierīcēm",
    "Izmantojiet strukturētos datus",
    "Fokusējieties uz lokālo SEO (ja attiecināms)",
  ];

  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold mb-4 text-indigo-700">
        <FaMicrophone className="inline-block mr-2" />
        Balss Meklēšanas Optimizācijas Padomi
      </h3>
      <ul className="list-disc pl-5">
        {tips.map((tip, index) => (
          <li key={index} className="mb-2">
            {tip}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-gray-600">
        Pielāgojiet savu saturu, izmantojot šos padomus, lai uzlabotu redzamību
        balss meklēšanas rezultātos atslēgvārdam "{keyword}".
      </p>
    </div>
  );
};

interface LocalSEOInsightsProps {
  keyword: string;
  localRelevance: boolean;
}

const LocalSEOInsights: React.FC<LocalSEOInsightsProps> = ({
  keyword,
  localRelevance,
}) => {
  if (!localRelevance) return null;

  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold mb-4 text-indigo-700">
        <FaMapMarkerAlt className="inline-block mr-2" />
        Vietējā SEO Ieskati
      </h3>
      <p className="mb-4">
        Atslēgvārds "{keyword}" ir būtisks vietējiem meklējumiem. Lūk, daži
        ieteikumi:
      </p>
      <ul className="list-disc pl-5">
        <li>Optimizējiet Google My Business profilu</li>
        <li>Veidojiet vietējās atpakaļsaites</li>
        <li>Iekļaujiet pilsētas un reģionu nosaukumus savā saturā</li>
        <li>Izmantojiet strukturētos datus ar vietējo informāciju</li>
        <li>Veiciniet un pārvaldiet klientu atsauksmes</li>
      </ul>
    </div>
  );
};

const AtslegvarduPetijums: React.FC = () => {
  const [seedKeyword, setSeedKeyword] = useState<string>("");
  const [results, setResults] = useState<KeywordData[]>([]);
  const [selectedKeyword, setSelectedKeyword] = useState<KeywordData | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [aiMode, setAiMode] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await fetchKeywordData(seedKeyword);
      setResults([data]);
      setSelectedKeyword(data);
    } catch (err) {
      setError("Kļūda ielādējot datus. Lūdzu, mēģiniet vēlreiz.");
    } finally {
      setLoading(false);
    }
  };

  const handleAIMode = useCallback(() => {
    setAiMode((prevMode) => !prevMode);
    if (!aiMode) {
      // Simulated AI analysis
      setTimeout(() => {
        setResults((prevResults) =>
          prevResults.map((kw) => ({
            ...kw,
            aiInsights:
              "AI ieteikums: Šis atslēgvārds ir perspektīvs nišas tirgiem. Apsveriet long-tail variācijas.",
          }))
        );
      }, 2000);
    }
  }, [aiMode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <Head>
        <title>
          AtslēgvārduPro 2027 - Nākamās paaudzes atslēgvārdu izpētes rīks
        </title>
        <meta
          name="description"
          content="Izmantojiet mūsu AI-uzlaboto atslēgvārdu izpētes rīku, lai iegūtu dziļāku ieskatu un prognozējošu analīzi jūsu digitālā mārketinga stratēģijai."
        />
        <meta
          name="keywords"
          content="atslēgvārdu izpēte, SEO rīks, AI analīze, digitālais mārketings, 2027"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://atslegvardupro.lv/izpete" />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            AtslēgvārduPro 2027
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Atklājiet nākotnes atslēgvārdus ar mākslīgā intelekta palīdzību
          </p>

          <form onSubmit={handleSubmit} className="mb-8 max-w-xl mx-auto">
            <div className="flex shadow-lg rounded-full overflow-hidden">
              <input
                type="text"
                value={seedKeyword}
                onChange={(e) => setSeedKeyword(e.target.value)}
                placeholder="Ievadiet sākuma atslēgvārdu"
                className="flex-grow p-4 outline-none"
                aria-label="Sākuma atslēgvārds"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 font-bold transition duration-300 hover:opacity-90"
                disabled={loading}
              >
                {loading ? "Meklē..." : "Analizēt"}
              </button>
            </div>
          </form>

          <div className="flex justify-center space-x-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full flex items-center ${
                aiMode ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
              onClick={handleAIMode}
            >
              <FaRobot className="mr-2" /> AI Režīms
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-blue-500 text-white rounded-full flex items-center"
              onClick={() => {
                /* Implement global trends analysis */
              }}
            >
              <FaGlobe className="mr-2" /> Globālās Tendences
            </motion.button>
          </div>
        </motion.div>

        {error && (
          <CustomAlert
            variant="destructive"
            title="Kļūda!"
            description={error}
          />
        )}

        <AnimatePresence>
          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            >
              {results.map((keyword, index) => (
                <KeywordCard
                  key={index}
                  keyword={keyword}
                  onSelect={setSelectedKeyword}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {selectedKeyword && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-2xl p-8 mb-12"
          >
            <h2 className="text-3xl font-bold mb-6 text-indigo-700">
              {selectedKeyword.keyword}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Pamatinformācija</h3>
                <p className="mb-2">
                  <strong>Meklēšanas apjoms:</strong>{" "}
                  {selectedKeyword.searchVolume}
                </p>
                <p className="mb-2">
                  <strong>Grūtības pakāpe:</strong> {selectedKeyword.difficulty}
                </p>
                <p className="mb-2">
                  <strong>CPC:</strong> {selectedKeyword.cpc} €
                </p>
                <p className="mb-2">
                  <strong>Nolūks:</strong> {selectedKeyword.intent}
                </p>
                <p className="mb-2">
                  <strong>Sezonalitāte:</strong> {selectedKeyword.seasonality}
                </p>
                <p className="mb-2">
                  <strong>Izaugsmes potenciāls:</strong>{" "}
                  {selectedKeyword.growthPotential}%
                </p>

                <SEODifficultyMeter difficulty={selectedKeyword.difficulty} />

                <h3 className="text-xl font-semibold mt-6 mb-4">
                  SERP Analīze
                </h3>
                <p className="mb-2">
                  <strong>Organiskās pozīcijas:</strong>{" "}
                  {selectedKeyword.serp.organic}%
                </p>
                <p className="mb-2">
                  <strong>Apmaksātās pozīcijas:</strong>{" "}
                  {selectedKeyword.serp.paid}%
                </p>
                <p className="mb-2">
                  <strong>SERP Funkcijas:</strong>{" "}
                  {selectedKeyword.serp.features.join(", ")}
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">
                  AI Ieteikumi
                </h3>
                <ul className="list-disc pl-5">
                  {selectedKeyword.aiSuggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Meklēšanas tendence
                </h3>
                <TrendChart data={selectedKeyword.trend} />

                <h3 className="text-xl font-semibold mt-6 mb-4">
                  Konkurences līmenis
                </h3>
                <CompetitionChart competition={selectedKeyword.competition} />

                <h3 className="text-xl font-semibold mt-6 mb-4">
                  Sentiments un Izaugsmes Potenciāls
                </h3>
                <SentimentRadar
                  sentiment={selectedKeyword.sentiment}
                  growthPotential={selectedKeyword.growthPotential}
                />

                <h3 className="text-xl font-semibold mt-6 mb-4">
                  Saistīto atslēgvārdu klasteris
                </h3>
                <KeywordClusterView
                  relatedKeywords={selectedKeyword.relatedKeywords}
                />
              </div>
            </div>

            <GlobalTrendsAnalysis keyword={selectedKeyword.keyword} />
            <AIInsightsComponent
              keyword={selectedKeyword.keyword}
              aiInsights={selectedKeyword.aiInsights}
            />
            <KeywordForecastChart keyword={selectedKeyword.keyword} />
            <CompetitorInsights keyword={selectedKeyword.keyword} />
            <ActionableTips
              keyword={selectedKeyword.keyword}
              difficulty={selectedKeyword.difficulty}
            />
            <ContentIdeaGenerator keyword={selectedKeyword.keyword} />
            <SERPPreview keyword={selectedKeyword.keyword} />
            <KeywordDifficultyTrend
              difficultyTrend={selectedKeyword.difficultyTrend}
            />
            <ROICalculator
              keyword={selectedKeyword.keyword}
              searchVolume={selectedKeyword.searchVolume}
              cpc={selectedKeyword.cpc}
            />
            <VoiceSearchTips keyword={selectedKeyword.keyword} />
            <LocalSEOInsights
              keyword={selectedKeyword.keyword}
              localRelevance={selectedKeyword.localRelevance}
            />
          </motion.div>
        )}

        <LearningResources />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold mb-4 text-indigo-700">
            Kā izmantot AtslēgvārduPro 2027
          </h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Ievadiet savu sākuma atslēgvārdu meklēšanas laukā.</li>
            <li>Aktivizējiet AI režīmu papildu ieskatu iegūšanai.</li>
            <li>
              Pārskatiet piedāvātos saistītos atslēgvārdus un to klasterus.
            </li>
            <li>Analizējiet detalizēto informāciju par katru atslēgvārdu.</li>
            <li>Izmantojiet AI ieteikumus un stratēģijas priekšlikumus.</li>
            <li>Pētiet globālās tendences un to ietekmi uz jūsu nišu.</li>
            <li>
              Izmantojiet ROI kalkulatoru, lai novērtētu potenciālo atdevi.
            </li>
            <li>
              Pielāgojiet savu stratēģiju, ņemot vērā balss meklēšanas un
              vietējā SEO ieskatus.
            </li>
            <li>Eksportējiet datus un ģenerējiet detalizētus pārskatus.</li>
          </ol>
        </motion.div>
      </main>

      <footer className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-8 mt-12">
        <div className="container mx-auto text-center">
          <p>&copy; 2027 AtslēgvārduPro. Visas tiesības aizsargātas.</p>
          <p className="mt-2">
            Izmantojam jaunākās AI tehnoloģijas un datu analīzes metodes, lai
            nodrošinātu precīzākos rezultātus.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AtslegvarduPetijums;
