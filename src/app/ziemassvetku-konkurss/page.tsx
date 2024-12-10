"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
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
  <div className="flex justify-center gap-4 mb-8">
    {Object.entries(timeLeft).map(([key, value]) => (
      <div
        key={key}
        className="bg-[#3D3B4A] text-white p-4 rounded-lg relative w-24"
      >
        <motion.div
          className="absolute inset-0 bg-[#EEC71B]/20 rounded-lg"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <div className="relative z-10">
          <div className="text-3xl font-bold">{value}</div>
          <div className="text-sm">
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

  useEffect(() => {
    if (!isActive) return;

    let timeoutId: NodeJS.Timeout;
    let iterations = 0;
    const maxIterations = 50;

    const animate = () => {
      setCurrentIndex((prev) => (prev + 1) % contestants.length);
      iterations++;

      if (iterations < maxIterations) {
        const newSpeed = 50 + iterations * 10;
        setSpeed(newSpeed);
        timeoutId = setTimeout(animate, newSpeed);
      } else {
        onComplete(contestants[currentIndex]);
      }
    };

    timeoutId = setTimeout(animate, speed);
    return () => clearTimeout(timeoutId);
  }, [isActive, contestants, currentIndex, speed, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-xl p-8 max-w-lg w-full mx-4 relative overflow-hidden"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
      >
        {/* Christmas decorations */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-green-500 to-red-500" />
        <div className="absolute -left-4 -top-4 w-16 h-16 rotate-45 bg-[#EEC71B] opacity-20" />
        <div className="absolute -right-4 -top-4 w-16 h-16 -rotate-45 bg-[#EEC71B] opacity-20" />

        <h3 className="text-2xl font-bold text-center mb-6">
          🎄 Izvēlamies Uzvarētāju! 🎄
        </h3>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none z-10" />

          <motion.div
            className="space-y-2 py-4"
            initial={false}
            animate={{ y: -currentIndex * 60 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {contestants.map((contestant, index) => (
              <div
                key={contestant.id}
                className={`p-4 rounded-lg text-center transition-all ${
                  index === currentIndex
                    ? "bg-[#EEC71B] scale-110 transform shadow-lg"
                    : "bg-gray-100"
                }`}
              >
                <span className="font-bold">{contestant.display_name}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mt-6 text-center">
          <motion.div
            className="text-sm text-gray-600"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            Izraudzīsim uzvarētāju... 🎅
          </motion.div>
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

      setContestants(data as Contestant[]);
      const winnerData = data?.find((c) => c.status === "winner") as Contestant;
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
    if (
      !window.confirm(
        "Vai tiešām vēlaties izvēlēties uzvarētāju? Šo darbību nevar atsaukt."
      )
    ) {
      return;
    }

    setIsSelectingWinner(true);

    try {
      const { data, error } = await supabase.rpc("select_christmas_winner", {
        admin_key: process.env.NEXT_PUBLIC_ADMIN_KEY,
      });

      if (error) throw error;

      if (data.success) {
        setShowConfetti(true);
        await fetchContestants();
        await fetchStats();
      } else {
        alert(data.message || "Kļūda izvēloties uzvarētāju");
      }
    } catch (error) {
      console.error("Error selecting winner:", error);
      alert("Kļūda izvēloties uzvarētāju");
    } finally {
      setIsSelectingWinner(false);
      setTimeout(() => setShowConfetti(false), 10000);
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

        <main className="container mx-auto px-4 py-16 relative">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-[#3D3B4A] mb-4">
              🎄 Ziemassvētku Konkurss
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Laimē pilnībā individuāli pielāgotu mājaslapu{" "}
              <span className="text-[#EEC71B] font-bold">Startup Vision</span>{" "}
              pakā!
            </p>

            {/* Countdown Timer */}
            {timeLeft && <TimeDisplay timeLeft={timeLeft} />}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Prize Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-8 rounded-xl shadow-xl relative overflow-hidden"
            >
              <div className="bg-[#3D3B4A] text-white p-6 rounded-lg mb-6 relative overflow-hidden">
                {/* Local snowfall just for this section */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(20)].map((_, i) => (
                    <SnowflakeParticle key={i} index={i} />
                  ))}
                </div>

                {/* Christmas decorations */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-green-500 to-red-500" />

                <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-2">
                    <span className="mr-2">🎄</span>
                    Startup Vision
                  </h2>
                  <p className="text-lg mb-4">
                    Ideāls sākums jūsu digitālajam ceļojumam
                    <span className="ml-2">✨</span>
                  </p>
                  <div className="text-3xl font-bold text-[#EEC71B] flex items-center">
                    <span className="mr-2">🎁</span>
                    €199/projekts
                  </div>
                </div>
              </div>

              <ul className="space-y-4 mb-6">
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
                  <li key={index} className="flex items-center">
                    <FiCheck className="text-[#EEC71B] mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-[#EEC71B]/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-700">
                  🎁 Visi dalībnieki (izņemot uzvarētāju) saņems 30% atlaidi
                  Startup Vision pakam!
                </p>
              </div>
            </motion.div>

            {/* Registration Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-8 rounded-xl shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-6 text-[#3D3B4A]">
                Piedalies Konkursā
              </h3>

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
            className="mt-12 bg-white p-6 rounded-xl shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">
              {isLoading ? "Ielādē dalībniekus..." : "Konkursa Dalībnieki"}
            </h3>

            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {contestants.map((contestant) => (
                  <ContestantCard key={contestant.id} contestant={contestant} />
                ))}
              </div>
            )}

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
              contestants={contestants.filter((c) => c.status === "registered")}
              onComplete={(selectedWinner) => {
                handleSelectWinner();
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
      </div>
    </>
  );
};

export default ChristmasContest;
