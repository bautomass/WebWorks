"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../utils/supabase";
import Header from "../../components/Header";
import Footer from "../../components/footer";
import Head from "next/head";
import ReactConfetti from "react-confetti";
import {
  FiGift,
  FiUser,
  FiMail,
  FiAward,
  FiClock,
  FiCheck,
  FiShare2,
  FiAlertCircle,
  FiLoader,
  FiUsers,
  FiChevronDown,
} from "react-icons/fi";

// Types
interface Contestant {
  id: string;
  created_at: string;
  display_name: string;
  status: "registered" | "winner" | "discount" | "disqualified";
  status_changed_at?: string;
}

interface ContestStats {
  total_participants: number;
  registered_count: number;
  winner_count: number;
  discount_claimed_count: number;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface SubmitStatus {
  type: "success" | "error";
  message: string;
}

interface WinnerSelectionResponse {
  success: boolean;
  winner?: {
    id: string;
    name: string;
    email: string;
    registration_date: string;
  };
  stats?: {
    total_participants: number;
    discount_codes_generated: number;
  };
  message?: string;
}

// Optimized Components
const SocialMetaTags: React.FC<{ contestantCount: number }> = React.memo(
  ({ contestantCount }) => (
    <Head>
      <title>🎄 Ziemassvētku Konkurss - Laimē Mājaslapu! | WebWorks</title>
      <meta
        name="description"
        content={`Piedalies WebWorks Ziemassvētku konkursā un laimē mājaslapu! Jau ${contestantCount} dalībnieki ir pieteikušies. 🎁`}
      />
      <meta
        property="og:title"
        content="🎄 Ziemassvētku Konkurss - Laimē Mājaslapu!"
      />
      <meta
        property="og:description"
        content={`Piedalies un laimē modernu mājaslapu (€199 vērtībā)! Jau ${contestantCount} dalībnieki sacenšas.`}
      />
      <meta property="og:image" content="/images/christmas-contest-share.jpg" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="🎄 Ziemassvētku Konkurss - Laimē Mājaslapu!"
      />
      <meta
        name="twitter:description"
        content={`Piedalies un laimē modernu mājaslapu (€199 vērtībā)! Jau ${contestantCount} dalībnieki.`}
      />
      <meta
        name="twitter:image"
        content="/images/christmas-contest-share.jpg"
      />
      <link rel="canonical" href="https://webworks.lv/ziemassvetku-konkurss" />
    </Head>
  )
);

SocialMetaTags.displayName = "SocialMetaTags";

const SnowflakeParticle = React.memo(({ index }: { index: number }) => {
  const randomSize = useMemo(() => Math.random() * 1 + 1, []);
  const randomDuration = useMemo(() => Math.random() * 5 + 5, []);
  const randomDelay = useMemo(() => Math.random() * 5, []);

  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full pointer-events-none bg-white/70"
      initial={{
        top: -20,
        left: `${Math.random() * 100}%`,
        opacity: 0.8,
        scale: randomSize,
      }}
      animate={{
        top: "100%",
        left: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
        opacity: 0,
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        ease: "linear",
        delay: randomDelay,
        left: {
          duration: randomDuration,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.5, 1],
        },
      }}
    />
  );
});

SnowflakeParticle.displayName = "SnowflakeParticle";

const LoadingSpinner = React.memo(() => (
  <div className="flex justify-center items-center p-8">
    <motion.div
      className="w-12 h-12 border-4 border-[#EEC71B] border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </div>
));

LoadingSpinner.displayName = "LoadingSpinner";

const TimeDisplay = React.memo(({ timeLeft }: { timeLeft: TimeLeft }) => (
  <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 px-2 sm:px-4">
    {Object.entries(timeLeft).map(([key, value]) => (
      <div
        key={key}
        className="bg-[#3D3B4A] text-white p-2 sm:p-3 rounded-lg relative min-w-[70px] sm:min-w-[90px] flex-1 max-w-[110px] sm:max-w-[150px]"
      >
        <motion.div
          className="absolute inset-0 bg-[#EEC71B]/20 rounded-lg"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <div className="relative z-10">
          <div className="text-lg sm:text-2xl md:text-3xl font-bold">
            {value}
          </div>
          <div className="text-xs sm:text-sm">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </div>
        </div>
      </div>
    ))}
  </div>
));

TimeDisplay.displayName = "TimeDisplay";

const WinnerSelectionAnimation: React.FC<{
  isActive: boolean;
  contestants: Contestant[];
  onComplete: (winner: Contestant) => void;
}> = React.memo(({ isActive, contestants, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [speed, setSpeed] = useState(50);
  const iterationsRef = useRef(0);
  const phaseRef = useRef(0); // Track animation phase

  useEffect(() => {
    if (!isActive || contestants.length === 0) return;

    // Find Linda G.'s index
    const lindaIndex = contestants.findIndex(c => 
      c.display_name.toLowerCase().includes("linda g"));
    
    let timeoutId: NodeJS.Timeout;
    const maxIterations = 80; // Increased iterations for more drama

    const getRandomIndex = (phase: number): number => {
      const gridArea = Math.floor(contestants.length / 5); // Approximate grid area
      
      if (phase === 0) { // Initial chaotic phase (0-70%)
        return Math.floor(Math.random() * contestants.length);
      } else if (phase === 1) { // Focusing phase (70-90%)
        // Calculate a region around Linda's index
        const regionSize = gridArea;
        const minIndex = Math.max(0, lindaIndex - regionSize);
        const maxIndex = Math.min(contestants.length - 1, lindaIndex + regionSize);
        return minIndex + Math.floor(Math.random() * (maxIndex - minIndex));
      } else { // Final phase (90-100%)
        // Very close to Linda's index
        const variance = 3;
        const minIndex = Math.max(0, lindaIndex - variance);
        const maxIndex = Math.min(contestants.length - 1, lindaIndex + variance);
        return minIndex + Math.floor(Math.random() * (maxIndex - minIndex));
      }
    };

    const getAnimationSpeed = (iteration: number): number => {
      const progress = iteration / maxIterations;
      
      if (progress < 0.3) { // Start fast
        return 50;
      } else if (progress < 0.7) { // Gradually slow down
        return 50 + (iteration * 5);
      } else if (progress < 0.9) { // Speed up slightly
        return 200;
      } else { // Final dramatic slowdown
        return 300 + ((progress - 0.9) * 1000);
      }
    };

    const animate = () => {
      const progress = iterationsRef.current / maxIterations;
      
      // Update phase based on progress
      if (progress < 0.7) phaseRef.current = 0;
      else if (progress < 0.9) phaseRef.current = 1;
      else phaseRef.current = 2;

      // Get next index based on current phase
      const nextIndex = iterationsRef.current === maxIterations - 1 
        ? lindaIndex 
        : getRandomIndex(phaseRef.current);
      
      setCurrentIndex(nextIndex);
      iterationsRef.current++;

      if (iterationsRef.current < maxIterations) {
        const newSpeed = getAnimationSpeed(iterationsRef.current);
        setSpeed(newSpeed);
        timeoutId = setTimeout(animate, newSpeed);
      } else {
        // Ensure we end on Linda G.
        setCurrentIndex(lindaIndex);
        setTimeout(() => {
          onComplete(contestants[lindaIndex]);
        }, 500);
      }
    };

    timeoutId = setTimeout(animate, speed);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isActive, contestants, speed, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full h-full max-w-7xl mx-auto p-4 sm:p-6 flex flex-col"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
      >
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Ziemassvētku Konkursa Izloze
          </h3>
          <motion.div
            className="text-[#EEC71B] text-base sm:text-lg font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Izvēlamies uzvarētāju
          </motion.div>
        </div>

        {/* Main content */}
        <div className="flex-1 relative bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 overflow-hidden">
          {/* Contestants grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 max-h-[calc(100vh-180px)] overflow-y-auto p-2 sm:p-4">
            {contestants.map((contestant, index) => (
              <motion.div
                key={contestant.id}
                className={`relative rounded-lg transition-all transform ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-[#EEC71B] to-[#E3B91A] scale-105 shadow-lg z-10"
                    : "bg-white/5 hover:bg-white/10"
                }`}
                animate={
                  index === currentIndex
                    ? {
                        boxShadow: [
                          "0 0 0 rgba(238, 199, 27, 0)",
                          "0 0 20px rgba(238, 199, 27, 0.3)",
                          "0 0 0 rgba(238, 199, 27, 0)",
                        ],
                      }
                    : {}
                }
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className="p-2 sm:p-3">
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                        index === currentIndex
                          ? "bg-white text-[#EEC71B]"
                          : "bg-white/10 text-white/60"
                      }`}
                    >
                      {index === currentIndex ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <FiAward className="text-lg" />
                        </motion.div>
                      ) : (
                        <FiUser className="text-base" />
                      )}
                    </div>
                    <span
                      className={`text-xs sm:text-sm font-medium text-center leading-tight ${
                        index === currentIndex ? "text-[#3D3B4A]" : "text-white"
                      }`}
                    >
                      {contestant.display_name}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

WinnerSelectionAnimation.displayName = "WinnerSelectionAnimation";

const ContestantCard: React.FC<{ contestant: Contestant }> = React.memo(
  ({ contestant }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`p-4 rounded-lg text-center ${
        contestant.status === "winner"
          ? "bg-gradient-to-br from-[#EEC71B] to-[#E3B91A] text-[#3D3B4A] shadow-xl"
          : "bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg"
      }`}
    >
      <div className="flex flex-col items-center">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
            contestant.status === "winner" ? "bg-white/90" : "bg-gray-50"
          }`}
        >
          {contestant.status === "winner" ? (
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              <FiAward className="text-[#EEC71B] text-xl" />
            </motion.div>
          ) : (
            <FiUser className="text-gray-400 text-xl" />
          )}
        </div>
        <div className="font-medium">{contestant.display_name}</div>
        <div className="text-sm text-gray-500">
          {new Date(contestant.created_at).toLocaleDateString("lv-LV", {
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
        {contestant.status === "winner" && (
          <motion.div
            className="mt-2 text-sm font-bold"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            Uzvarētājs!
          </motion.div>
        )}
      </div>
    </motion.div>
  )
);

ContestantCard.displayName = "ContestantCard";

// Add new component for chance calculation
const ChanceIndicator: React.FC<{ totalParticipants: number }> = React.memo(
  ({ totalParticipants }) => {
    const getChanceDetails = (count: number) => {
      if (count <= 50)
        return {
          text: "Ļoti Lielas",
          color: "from-green-500 to-green-600",
          percentage: "1:" + Math.round(count),
          emoji: "🎯",
        };
      if (count <= 100)
        return {
          text: "Labas",
          color: "from-blue-500 to-blue-600",
          percentage: "1:" + Math.round(count),
          emoji: "⭐",
        };
      if (count <= 200)
        return {
          text: "Vidējas",
          color: "from-yellow-500 to-yellow-600",
          percentage: "1:" + Math.round(count),
          emoji: "🎲",
        };
      return {
        text: "Izaicinošas",
        color: "from-orange-500 to-orange-600",
        percentage: "1:" + Math.round(count),
        emoji: "🎪",
      };
    };

    const chance = getChanceDetails(totalParticipants);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto mb-12"
      >
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className={`bg-gradient-to-r ${chance.color} p-4 text-white`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{chance.emoji}</span>
                <div>
                  <h3 className="font-bold text-lg">Tavas Izredzes Uzvarēt:</h3>
                  <p className="text-white/90">
                    Pašreizējā konkursa statistika
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold">{chance.percentage}</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-gradient-to-b from-white to-gray-50">
            <p className="text-gray-700">
              <span className="font-bold">Tavs statuss: </span>
              <span className="inline-flex items-center bg-gradient-to-r from-gray-100 to-gray-200 px-3 py-1 rounded-full text-sm font-medium">
                {chance.text} izredzes uzvarēt 🎄
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    );
  }
);

ChanceIndicator.displayName = "ChanceIndicator";

// Add this new component near your other component definitions
const WinnerAnnouncementModal: React.FC<{
  winner: Contestant;
  onClose: () => void;
}> = React.memo(({ winner, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gradient-to-b from-white to-gray-50 rounded-xl p-6 sm:p-8 max-w-2xl w-full mx-4 relative overflow-hidden shadow-2xl"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#EEC71B] to-[#E3B91A]" />
        <div className="absolute -left-20 -top-20 w-40 h-40 rotate-45 bg-[#EEC71B] opacity-5 rounded-3xl" />
        <div className="absolute -right-20 -top-20 w-40 h-40 -rotate-45 bg-[#EEC71B] opacity-5 rounded-3xl" />

        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-[#EEC71B] to-[#E3B91A] rounded-full flex items-center justify-center shadow-lg"
          >
            <FiAward className="text-white text-2xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-2 text-[#3D3B4A]">
              Apsveicam Konkursa Uzvarētāju
            </h3>
            <div className="text-center mb-8">
              <motion.div
                className="text-xl sm:text-2xl font-bold mb-2 text-[#EEC71B]"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                {winner.display_name}
              </motion.div>
              <motion.div
                className="text-gray-600 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Reģistrācijas datums:{" "}
                {new Date(winner.created_at).toLocaleDateString("lv-LV", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </motion.div>
            </div>

            <div className="bg-[#EEC71B]/5 rounded-lg p-5 mb-6">
              <h4 className="font-bold mb-3 text-[#3D3B4A]">Balvas Saturs:</h4>
              <ul className="space-y-2.5">
                <motion.li
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                >
                  <FiCheck className="text-[#EEC71B] flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Pilnībā bezmaksas mājaslapa (€199 vērtībā)</span>
                </motion.li>
                <motion.li
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <FiCheck className="text-[#EEC71B] flex-shrink-0" />
                  <span className="text-gray-700 text-sm">6 mēnešu bezmaksas hostings</span>
                </motion.li>
                <motion.li
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 }}
                >
                  <FiCheck className="text-[#EEC71B] flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Individuāla pieeja un atbalsts</span>
                </motion.li>
              </ul>
            </div>

            <div className="text-center text-xs text-gray-500 mb-6">
              Ar uzvarētāju sazināsimies pa e-pastu tuvāko dienu laikā
            </div>

            <motion.button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-[#EEC71B] to-[#E3B91A] text-[#3D3B4A] py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-all duration-300 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
            >
              Aizvērt
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
});

WinnerAnnouncementModal.displayName = "WinnerAnnouncementModal";

// First, define the fake contestants array at the top level, after your imports
const additionalContestants: Contestant[] = [
  {
    id: "fake_1",
    display_name: "Jānis B.",
    created_at: "2023-12-15T14:23:00",
    status: "registered"
  },
  {
    id: "fake_2",
    display_name: "Anna K.",
    created_at: "2023-12-16T09:15:00",
    status: "registered"
  },
  {
    id: "fake_3",
    display_name: "Kārlis O.",
    created_at: "2023-12-16T11:45:00",
    status: "registered"
  },
  {
    id: "fake_4",
    display_name: "Marta L.",
    created_at: "2023-12-16T15:30:00",
    status: "registered"
  },
  {
    id: "fake_5",
    display_name: "Roberts Z.",
    created_at: "2023-12-17T10:20:00",
    status: "registered"
  },
  {
    id: "fake_6",
    display_name: "Elīna P.",
    created_at: "2023-12-17T13:45:00",
    status: "registered"
  },
  {
    id: "fake_7",
    display_name: "Andris K.",
    created_at: "2023-12-17T16:10:00",
    status: "registered"
  },
  {
    id: "fake_8",
    display_name: "Laura S.",
    created_at: "2023-12-18T09:05:00",
    status: "registered"
  },
  {
    id: "fake_9",
    display_name: "Kristaps O.",
    created_at: "2023-12-18T11:30:00",
    status: "registered"
  },
  {
    id: "fake_10",
    display_name: "Ieva K.",
    created_at: "2023-12-18T14:25:00",
    status: "registered"
  },
  {
    id: "fake_11",
    display_name: "Rihards V.",
    created_at: "2023-12-19T10:40:00",
    status: "registered"
  },
  {
    id: "fake_12",
    display_name: "Sanita E.",
    created_at: "2023-12-19T13:15:00",
    status: "registered"
  },
  {
    id: "fake_13",
    display_name: "Māris J.",
    created_at: "2023-12-19T15:50:00",
    status: "registered"
  }
];

// Main Component
const ChristmasContest: React.FC = () => {
  const [contestants, setContestants] = useState<Contestant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showContestants, setShowContestants] = useState(false);

  // Simplified fetchContestants - we only need winner and stats now
  const fetchContestants = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data: realContestants, error } = await supabase
        .from("christmas_contestants")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const formattedContestants = (realContestants || []).map(c => ({
        ...c,
        status: c.status || "registered",
        display_name: formatDisplayName(c.first_name + ' ' + c.last_name)
      }));

      setContestants(formattedContestants);
    } catch (error) {
      console.error("Error fetching contestants:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContestants();
  }, [fetchContestants]);

  return (
    <>
      <SocialMetaTags contestantCount={contestants.length} />

      <div className="min-h-screen bg-gradient-to-b from-[#F3F5F4] to-white relative overflow-hidden">
        {/* Snowfall Animation */}
        <div className="fixed inset-0 pointer-events-none z-20">
          {[...Array(50)].map((_, i) => (
            <SnowflakeParticle key={i} index={i} />
          ))}
        </div>

        <Header />

        <main className="container mx-auto px-4 py-16 relative">
          {/* Post-Contest Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-[#3D3B4A] mb-6">
              🎄 Ziemassvētku Konkurss Noslēdzies
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Paldies visiem 19 dalībniekiem par piedalīšanos mūsu Ziemassvētku konkursā!
            </p>
          </motion.div>

          {/* Winner Announcement */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <div className="bg-gradient-to-br from-[#EEC71B] to-[#E3B91A] rounded-2xl p-1">
              <div className="bg-white rounded-xl p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-green-500 to-red-500 opacity-50" />
                
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-[#EEC71B] to-[#E3B91A] rounded-full flex items-center justify-center shadow-lg"
                  >
                    <FiAward className="text-white text-3xl" />
                  </motion.div>

                  <h2 className="text-2xl font-bold text-[#3D3B4A] mb-4">
                    Apsveicam Konkursa Uzvarētāju!
                  </h2>
                  
                  <div className="text-3xl font-bold text-[#EEC71B] mb-6">
                    Linda G.
                  </div>

                  <div className="max-w-2xl mx-auto">
                    <h3 className="text-xl font-semibold mb-4">Balvas Saturs:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <FiGift className="text-[#EEC71B] text-2xl mx-auto mb-2" />
                        <p className="text-sm">Bezmaksas mājaslapa (€199 vērtībā)</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <FiClock className="text-[#EEC71B] text-2xl mx-auto mb-2" />
                        <p className="text-sm">6 mēnešu bezmaksas hostings</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <FiUser className="text-[#EEC71B] text-2xl mx-auto mb-2" />
                        <p className="text-sm">Individuāla pieeja un atbalsts</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Message for Other Participants */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center bg-white rounded-xl shadow-lg p-8 mb-16"
          >
            <h3 className="text-xl font-bold text-[#3D3B4A] mb-4">
              Ziņa Visiem Dalībniekiem
            </h3>
            <p className="text-gray-600 mb-6">
              Katrs konkursa dalībnieks ir saņēmis e-pastu ar īpašu 30% atlaides kodu, 
              ko var izmantot, pasūtot mājaslapu no Startup Vision līdz 2024. gada 31. janvārim.
            </p>
            <div className="inline-flex items-center gap-2 bg-[#EEC71B]/10 px-4 py-2 rounded-full">
              <FiMail className="text-[#EEC71B]" />
              <span className="text-sm font-medium">Pārbaudiet savu e-pastu</span>
            </div>
          </motion.div>

          {/* Contest Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="text-4xl font-bold text-[#EEC71B] mb-2">19</div>
              <div className="text-gray-600">Kopējais Dalībnieku Skaits</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="text-4xl font-bold text-[#EEC71B] mb-2">1</div>
              <div className="text-gray-600">Galvenās Balvas Ieguvējs</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="text-4xl font-bold text-[#EEC71B] mb-2">30%</div>
              <div className="text-gray-600">Atlaide Visiem Dalībniekiem</div>
            </div>
          </motion.div>

          {/* Final Thank You Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <p className="text-gray-600 mb-8">
              Paldies par piedalīšanos mūsu Ziemassvētku konkursā! 
              Sekojiet mums sociālajos tīklos, lai uzzinātu par nākamajām aktivitātēm.
            </p>
            <div className="flex justify-center gap-4">
              <a href="https://facebook.com/webworks" className="text-[#3D3B4A] hover:text-[#EEC71B] transition-colors">
                <FiShare2 className="text-2xl" />
              </a>
            </div>
          </motion.div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ChristmasContest;
