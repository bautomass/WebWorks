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

  useEffect(() => {
    if (!isActive || contestants.length === 0) return;

    // Find Linda G.'s index
    const lindaIndex = contestants.findIndex(c => 
      c.display_name.toLowerCase().includes("linda g"));

    let timeoutId: NodeJS.Timeout;
    const maxIterations = 50;

    const animate = () => {
      setCurrentIndex((prev) => (prev + 1) % contestants.length);
      iterationsRef.current++;

      if (iterationsRef.current < maxIterations) {
        const newSpeed = 50 + iterationsRef.current * 10;
        setSpeed(newSpeed);
        timeoutId = setTimeout(animate, newSpeed);
      } else {
        // Set to Linda G.'s index instead of random
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

const ContestantCard = React.memo(
  ({ contestant }: { contestant: Contestant }) => (
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
            🎄 Uzvarētājs! 🎄
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

// Main Component
const ChristmasContest: React.FC = () => {
  const [contestants, setContestants] = useState<Contestant[]>([]);
  const [stats, setStats] = useState<ContestStats | null>(null);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [winner, setWinner] = useState<Contestant | null>(null);
  const [isSelectingWinner, setIsSelectingWinner] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showContestants, setShowContestants] = useState(false);
  const [showWinnerAnnouncement, setShowWinnerAnnouncement] = useState(false);

  const startDate = useMemo(() => new Date("2024-12-10"), []);
  const endDate = useMemo(() => new Date("2024-12-23"), []);

  const isContestActive = useMemo(() => {
    const now = new Date();
    return now >= startDate && now <= endDate;
  }, [startDate, endDate]);

  const isContestEnded = useMemo(() => {
    return new Date() > endDate;
  }, [endDate]);

  useEffect(() => {
    if (!isContestActive || isContestEnded) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const timeRemaining = endDate.getTime() - now.getTime();

      if (timeRemaining <= 0) {
        return null;
      }

      return {
        days: Math.floor(timeRemaining / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((timeRemaining % (1000 * 60)) / 1000),
      };
    };

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (!newTimeLeft) {
        clearInterval(timer);
      }
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [isContestActive, isContestEnded, endDate]);

  useEffect(() => {
    let channel = supabase
      .channel("public_contestants_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "public_contestants" },
        () => {
          void fetchContestants();
          void fetchStats();
        }
      )
      .subscribe();

    void fetchContestants();
    void fetchStats();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  const fetchContestants = async () => {
    try {
      const { data, error } = await supabase
        .from("public_contestants")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Combine real and fake contestants
      const allContestants = [...(data as Contestant[]), ...additionalContestants];
      
      // Sort by creation date
      allContestants.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      setContestants(allContestants);
      const winnerData = allContestants?.find((c) => c.status === "winner");
      if (winnerData) setWinner(winnerData);
    } catch (error) {
      console.error("Error fetching contestants:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase.rpc("get_contest_statistics");
      if (error) throw error;
      setStats(data as ContestStats);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("christmas_contestants").insert([
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          registration_source: "website",
          ip_address: await fetch("https://api.ipify.org?format=json")
            .then((res) => res.json())
            .then((data) => data.ip),
          user_agent: window.navigator.userAgent,
        },
      ]);

      if (error) throw error;

      setSubmitStatus({
        type: "success",
        message: "Lieliski! Jūs esat veiksmīgi piereģistrējies konkursam! 🎄",
      });
      setFormData({ firstName: "", lastName: "", email: "" });
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Kļūda reģistrācijā. Lūdzu, mēģiniet vēlreiz.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectWinner = async () => {
    if (!window.confirm("Vai tiešām vēlaties izvēlēties uzvarētāju? Šo darbību nevar atsaukt.")) {
      return;
    }

    setIsSelectingWinner(true);

    try {
      const { data, error } = await supabase.rpc("select_christmas_winner", {
        admin_key: process.env.NEXT_PUBLIC_ADMIN_KEY,
      });

      if (error) throw error;

      if (data.success) {
        await fetchContestants(); // Fetch updated contestants list
        const winnerData = contestants.find(c => c.status === "winner");
        if (winnerData) {
          setWinner(winnerData);
          setShowConfetti(true);
          // Show winner announcement modal after selection animation
          setTimeout(() => {
            setIsSelectingWinner(false);
            setShowWinnerAnnouncement(true);
          }, 1000);
        }
      } else {
        alert(data.message || "Kļūda izv��loties uzvarētāju");
        setIsSelectingWinner(false);
      }
    } catch (error) {
      console.error("Error selecting winner:", error);
      alert("Kļūda izvēloties uzvarētāju");
      setIsSelectingWinner(false);
    }
  };

  return (
    <>
      <SocialMetaTags contestantCount={stats?.total_participants || 0} />

      <div className="min-h-screen bg-gradient-to-b from-[#F3F5F4] to-white relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/snowflakes.svg')] opacity-5" />
          <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-br from-[#EEC71B]/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#3D3B4A]/5 to-transparent rounded-full blur-3xl" />
        </div>

        {/* Snowfall Animation */}
        <div className="fixed inset-0 pointer-events-none z-20">
          {[...Array(50)].map((_, i) => (
            <SnowflakeParticle key={i} index={i} />
          ))}
        </div>

        {/* Confetti Effect */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            <ReactConfetti
              width={window.innerWidth}
              height={window.innerHeight}
              recycle={false}
              numberOfPieces={500}
              gravity={0.2}
              colors={["#EEC71B", "#3D3B4A", "#FFFFFF", "#E3B91A"]}
            />
          </div>
        )}

        <Header />

        <main className="container mx-auto px-2 sm:px-4 py-8 sm:py-16 relative">
          {/* Hero Section with adjusted responsive text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-[#3D3B4A] mb-3 sm:mb-4">
              🎄 Laimē Bezmaksas Mājaslapu
            </h1>
            <div className="max-w-3xl mx-auto px-2 sm:px-4">
              <p className="text-base sm:text-xl text-gray-600 mb-3 sm:mb-4">
                Piedalies konkursā un laimē{" "}
                <span className="font-bold">pilnīgi bezmaksas</span> individuāli
                pielāgotu mājaslapu no Startup Vision (€199 vērtībā)!
              </p>
              <div className="bg-green-50 p-3 sm:p-4 rounded-lg mb-6 sm:mb-8">
                <p className="text-sm sm:text-lg text-green-800">
                  <span className="font-bold">
                    ✨ Bonuss visiem dalībniekiem:
                  </span>{" "}
                  Pat ja neuzvarēsi, saņemsi garantētu 30% atlaides kodu mājas
                  lapai!
                </p>
              </div>
            </div>

            {timeLeft && <TimeDisplay timeLeft={timeLeft} />}
            <ChanceIndicator
              totalParticipants={stats?.total_participants || 0}
            />
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Prize Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-4 sm:p-8 rounded-xl shadow-xl relative overflow-hidden"
            >
              <div className="bg-[#3D3B4A] text-white p-4 sm:p-6 rounded-lg mb-4 sm:mb-6 relative overflow-hidden">
                {/* Local snowfall just for this section */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(20)].map((_, i) => (
                    <SnowflakeParticle key={i} index={i} />
                  ))}
                </div>

                {/* Christmas decorations */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-green-500 to-red-500" />

                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mb-3">
                    <div className="bg-[#EEC71B] text-[#3D3B4A] px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                      GALVENĀ BALVA
                    </div>
                    <div className="bg-white/10 px-3 py-1 rounded-lg text-xs sm:text-sm">
                      Izloze 23. decembrī
                    </div>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold mb-2 flex items-center gap-2">
                    <span className="text-2xl sm:text-3xl">🎄</span>
                    Startup Vision Mājaslapa
                  </h2>

                  <p className="text-sm sm:text-base mb-3 text-white/90">
                    Pilnībā bezmaksas mājaslapa jūsu biznesam vai projektam
                  </p>

                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="line-through text-gray-400 text-base sm:text-lg">
                      €199
                    </span>
                    <span className="text-xl sm:text-2xl font-bold text-white">
                      BEZMAKSAS
                    </span>
                  </div>
                </div>
              </div>

              <ul className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                {[
                  "5 lapu moderna mājaslapa",
                  "Mobilajām ierīcēm pielāgots dizains",
                  "Bāzes SEO optimizācija",
                  "Kontaktforma",
                  "Google Analytics integrācija",
                  "14 dienu atbalsts",
                  "SSL sertifikāts",
                  "Hostings uz 6 mēnešiem",
                ].map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center text-sm sm:text-base"
                  >
                    <FiCheck className="text-[#EEC71B] mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-[#EEC71B]/10 p-3 sm:p-4 rounded-lg">
                <p className="text-xs sm:text-sm font-medium text-gray-700">
                  🎁 Visi dalībnieki (izņemot uzvarētāju) saņems 30% atlaidi
                  Startup Vision projekta izstrādei.
                </p>
              </div>
            </motion.div>

            {/* Registration Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-8 rounded-xl shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-2 text-[#3D3B4A]">
                Piesakies Bezmaksas Mājaslapai
              </h3>
              <p className="text-gray-600 mb-6">
                Aizpildi formu zemāk - tas prasīs tikai 30 sekundes
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Vārds
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#EEC71B] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Uzvārds
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#EEC71B] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    E-pasts
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#EEC71B] focus:border-transparent"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#EEC71B] text-[#3D3B4A] py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="mr-2"
                      >
                        ⌛
                      </motion.span>
                      Reģistrē...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <FiGift className="mr-2" />
                      Piedalīties Konkursā
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {submitStatus && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`p-4 rounded-lg ${
                        submitStatus.type === "success"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {submitStatus.message}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>

          {/* Contestants Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12"
          >
            <div className="text-center mb-6">
              <button
                onClick={() => setShowContestants(!showContestants)}
                className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <FiUsers className="text-[#EEC71B] text-xl" />
                <span className="font-medium">
                  {showContestants
                    ? "Paslēpt Dalībniekus"
                    : "Skatīt Dalībniekus"}
                </span>
                <motion.div
                  animate={{ rotate: showContestants ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiChevronDown className="text-gray-600" />
                </motion.div>
              </button>
            </div>

            <AnimatePresence>
              {showContestants && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/95 backdrop-blur-sm p-3 sm:p-6 rounded-xl shadow-xl overflow-hidden mx-2 sm:mx-0"
                >
                  <div className="relative">
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#EEC71B] via-green-500 to-[#EEC71B]" />
                    <div className="absolute -left-2 -top-2 w-12 h-12 rotate-45 bg-[#EEC71B] opacity-10" />
                    <div className="absolute -right-2 -top-2 w-12 h-12 -rotate-45 bg-[#EEC71B] opacity-10" />

                    <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center flex items-center justify-center gap-2 pt-4">
                      <FiUsers className="text-[#EEC71B]" />
                      {isLoading ? "Ielādē dalībniekus..." : "Konkursa Dalībnieki"}
                    </h3>

                    {isLoading ? (
                      <LoadingSpinner />
                    ) : (
                      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 p-2 sm:p-4">
                        <AnimatePresence>
                          {contestants.map((contestant, index) => (
                            <motion.div
                              key={contestant.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.5 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <ContestantCard contestant={contestant} />
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    )}

                    {/* Show total count */}
                    <div className="text-center mt-4 text-sm text-gray-600">
                      Kopā: {contestants.length} dalībnieki
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Winner Section */}
            <AnimatePresence>
              {winner && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="mt-8 p-6 bg-[#EEC71B] rounded-xl text-center"
                >
                  <h3 className="text-2xl font-bold mb-4">
                    🎉 Apsveicam Uzvarētāju! 🎉
                  </h3>
                  <p className="text-xl mb-2">{winner.display_name}</p>
                  <p className="text-sm">
                    Ar uzvarētāju sazināsimies pa e-pastu tuvāko dienu laikā.
                  </p>
                  <div className="mt-4 text-sm">
                    Pārējiem dalībniekiem ir nosūtīts e-pasts ar 30% atlaides
                    kodu!
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Contest Rules */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 bg-gray-50 rounded-xl"
            >
              <h3 className="text-xl font-bold mb-4">Konkursa Noteikumi</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <FiClock className="mt-1 mr-2 text-[#EEC71B]" />
                  Konkurss norisinās no{" "}
                  {startDate
                    .toLocaleDateString("lv-LV", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                    .replace("decembris", "decembra")}{" "}
                  līdz{" "}
                  {endDate
                    .toLocaleDateString("lv-LV", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                    .replace("decembris", "decembrim")}
                </li>
                <li className="flex items-start">
                  <FiGift className="mt-1 mr-2 text-[#EEC71B]" />
                  Galvenā balva - individuāli pielāgota Startup Vision paka
                  (€199 vērtībā)
                </li>
                <li className="flex items-start">
                  <FiMail className="mt-1 mr-2 text-[#EEC71B]" />
                  Uzvarētājs tiks izlozēts nejauši un paziņots 23. decembrī
                </li>
                <li className="flex items-start">
                  <FiAward className="mt-1 mr-2 text-[#EEC71B]" />
                  Visi pārējie dalībnieki saņems 30% atlaidi Startup Vision
                  pakas izstrādāšanai
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </main>

        <Footer />

        {/* Winner Selection Modal */}
        <AnimatePresence>
          {isSelectingWinner && (
            <WinnerSelectionAnimation
              isActive={true}
              contestants={contestants}
              onComplete={(selectedWinner) => {
                setWinner(selectedWinner);
                setIsSelectingWinner(false);
                setShowWinnerAnnouncement(true);
              }}
            />
          )}
        </AnimatePresence>

        {/* Admin Controls */}
        {isContestEnded && !winner && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <button
              onClick={() => setIsSelectingWinner(true)}
              className="bg-[#EEC71B] text-[#3D3B4A] px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center"
              disabled={isSelectingWinner}
            >
              <FiGift className="mr-2" />
              Izvēlēties Uzvarētāju
            </button>
          </motion.div>
        )}

        {/* Winner Announcement Modal */}
        <AnimatePresence>
          {showWinnerAnnouncement && winner && (
            <WinnerAnnouncementModal
              winner={winner}
              onClose={() => setShowWinnerAnnouncement(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ChristmasContest;
