// File: AgriTechApp.tsx
import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
  type FC,
  type ReactElement,
  Suspense,
} from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Leaf,
  Menu,
  X,
  ChevronRight,
  LineChart,
  Sprout,
  CloudRain,
  Sun,
  ArrowRight,
  Mail,
  Loader2,
  AlertTriangle,
} from "lucide-react";

// Types
type Metric = {
  readonly label: string;
  readonly value: string;
};

interface Solution {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly icon: React.ElementType;
  readonly metrics: readonly Metric[];
}

interface NavigationProps {
  readonly isOpen: boolean;
  readonly onToggle: () => void;
}

interface SolutionsSectionProps {
  readonly activeSolution: number;
  readonly setActiveSolution: (id: number) => void;
  readonly currentSolution: Solution | undefined;
}

interface ErrorBoundaryProps {
  readonly children: React.ReactNode;
}

interface ErrorBoundaryState {
  readonly hasError: boolean;
  readonly error?: Error;
}

// Error Boundary Component
class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Component Error:", error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-red-50 rounded-lg">
          <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
          <h2 className="text-xl font-bold text-red-700 mb-2">
            Kaut kas nogāja greizi
          </h2>
          <p className="text-red-600 mb-4">
            Lūdzu, atsvaidziniet lapu vai mēģiniet vēlāk
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Mēģināt vēlreiz
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading Spinner Component
const LoadingSpinner: FC = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
  </div>
);

// Animation Variants
const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

const slideInVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

// Constants
const SOLUTIONS: readonly Solution[] = [
  {
    id: 1,
    title: "Viedā Lauksaimniecība",
    description: "AI un IoT risinājumi efektīvai saimniekošanai",
    icon: LineChart,
    metrics: [
      { label: "Ražas Pieaugums", value: "+35%" },
      { label: "Izmaksu Samazinājums", value: "-28%" },
    ],
  },
  {
    id: 2,
    title: "Precīzā Apūdeņošana",
    description: "Automatizēta laistīšanas vadība",
    icon: CloudRain,
    metrics: [
      { label: "Ūdens Ekonomija", value: "42%" },
      { label: "Augu Veselība", value: "+45%" },
    ],
  },
  {
    id: 3,
    title: "Siltumnīcu Kontrole",
    description: "Pilnībā automatizēta vides kontrole",
    icon: Sun,
    metrics: [
      { label: "Enerģijas Ietaupījums", value: "38%" },
      { label: "Ražošanas Efektivitāte", value: "+52%" },
    ],
  },
] as const;

const STATS = [
  { value: "500+", label: "Klienti" },
  { value: "15k", label: "Hektāri" },
  { value: "42%", label: "Pieaugums" },
  { value: "24/7", label: "Atbalsts" },
] as const;

const FOOTER_SECTIONS = [
  {
    title: "Risinājumi",
    items: ["Viedā Lauksaimniecība", "Apūdeņošana", "Konsultācijas"],
  },
  {
    title: "Uzņēmums",
    items: ["Par Mums", "Komanda", "Karjera"],
  },
  {
    title: "Kontakti",
    items: ["info@agrotech.lv", "+371 20123456", "Rīga, Latvija"],
  },
] as const;

// Custom Hooks
const useIntersectionObserver = (
  elementRef: React.RefObject<Element>,
  {
    threshold = 0.1,
    root = null,
    rootMargin = "0px",
  }: IntersectionObserverInit = {}
): boolean => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [elementRef, threshold, root, rootMargin]);

  return isVisible;
};

// Form validation hook
const useFormValidation = (initialState: Record<string, string>) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!values.email?.includes("@")) {
      newErrors.email = "Nepareizs e-pasta formāts";
    }
    if (!values.name?.trim()) {
      newErrors.name = "Lauks ir obligāts";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values]);

  const handleSubmit = async (callback: () => Promise<void>) => {
    setIsSubmitting(true);
    if (validateForm()) {
      try {
        await callback();
      } catch (error) {
        console.error("Form submission error:", error);
      }
    }
    setIsSubmitting(false);
  };

  return { values, setValues, errors, handleSubmit, isSubmitting };
};

// Main Component
const AgriTechMockup: FC = () => {
  const [activeSolution, setActiveSolution] = useState<number>(1);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const currentSolution = useMemo(
    () => SOLUTIONS.find((s) => s.id === activeSolution),
    [activeSolution]
  );

  return (
    <ErrorBoundary>
      <div
        ref={containerRef}
        className="relative w-full h-full min-h-screen bg-gradient-to-br from-green-50 to-white overflow-hidden rounded-lg shadow-lg"
      >
        <div className="absolute inset-0 overflow-auto">
          <Header isMenuOpen={isMenuOpen} onToggleMenu={toggleMenu} />
          <Suspense fallback={<LoadingSpinner />}>
            <main className="relative w-full">
              <HeroSection />
              <NewsletterBanner />
              <SolutionsSection
                activeSolution={activeSolution}
                setActiveSolution={setActiveSolution}
                currentSolution={currentSolution}
              />
              <StatsSection />
              <Footer />
            </main>
          </Suspense>
        </div>
      </div>
    </ErrorBoundary>
  );
};

// Header Components
const Header: FC<{ isMenuOpen: boolean; onToggleMenu: () => void }> =
  React.memo(({ isMenuOpen, onToggleMenu }) => (
    <header className="sticky top-0 z-50 px-4 py-3 bg-white/90 backdrop-blur-md border-b border-green-100">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Logo />
        <Navigation isOpen={isMenuOpen} onToggle={onToggleMenu} />
      </div>
    </header>
  ));

const Logo: FC = React.memo(() => (
  <div className="flex items-center space-x-2">
    <div className="bg-gradient-to-br from-green-500 to-green-600 p-2 rounded-lg">
      <Leaf className="h-6 w-6 text-white" />
    </div>
    <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
      AgroTech
    </span>
  </div>
));

const Navigation: FC<NavigationProps> = React.memo(({ isOpen, onToggle }) => (
  <>
    <button
      onClick={onToggle}
      className="md:hidden p-2 hover:bg-green-50 rounded-lg transition-all"
      aria-label="Toggle menu"
      aria-expanded={isOpen}
    >
      {isOpen ? <X /> : <Menu />}
    </button>

    <nav
      className={`${
        isOpen ? "block" : "hidden"
      } md:block absolute md:relative top-full left-0 w-full md:w-auto bg-white/95 md:bg-transparent pb-4 md:pb-0 shadow-lg md:shadow-none transform-gpu transition-all duration-200 ease-in-out z-50`}
    >
      <ul className="flex flex-col md:flex-row md:items-center md:space-x-8 px-4 md:px-0">
        {["Sākums", "Risinājumi", "Kontakti"].map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase()}`}
              className="block py-2 text-gray-600 hover:text-green-600 transition-all hover:translate-x-1 md:hover:translate-x-0 md:hover:scale-105"
            >
              {item}
            </a>
          </li>
        ))}
        <li>
          <button className="mt-4 md:mt-0 w-full md:w-auto px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
            Sākt
          </button>
        </li>
      </ul>
    </nav>
  </>
));

// Hero Section
const HeroSection: FC = React.memo(() => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  return (
    <section
      ref={sectionRef}
      id="sakums"
      className="relative py-12 px-4 overflow-hidden"
    >
      <motion.div
        variants={fadeInUpVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="max-w-6xl mx-auto bg-white/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={slideInVariants} className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Modernā{" "}
              <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                Lauksaimniecība
              </span>
            </h1>
            <p className="text-gray-600 text-lg">
              Izmantojiet jaunākās tehnoloģijas efektīvākai saimniekošanai
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
                Konsultācija
                <ArrowRight className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-3 border-2 border-green-600 text-green-600 rounded-xl hover:bg-green-50 transition-all duration-300 hover:scale-105">
                Uzzināt Vairāk
              </button>
            </div>
          </motion.div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/modern_farming.jpg"
                alt="Modern Farming"
                className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <StatsCard />
          </div>
        </div>
      </motion.div>
    </section>
  );
});

const StatsCard: FC = React.memo(() => (
  <motion.div
    variants={scaleInVariants}
    initial="hidden"
    animate="visible"
    className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4"
  >
    <div className="flex items-start space-x-3">
      <div className="p-2 bg-gradient-to-br from-green-100 to-green-200 rounded-lg">
        <LineChart className="w-5 h-5 text-green-600" />
      </div>
      <div>
        <p className="font-medium text-gray-600">Pieaugums</p>
        <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
          +42%
        </p>
      </div>
    </div>
  </motion.div>
));

// Newsletter Banner
const NewsletterBanner: FC = React.memo(() => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(bannerRef, { threshold: 0.1 });
  const { values, setValues, errors, handleSubmit, isSubmitting } =
    useFormValidation({
      name: "",
      email: "",
    });

  const onSubmit = async () => {
    // Implement your newsletter submission logic here
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Newsletter subscription:", values);
  };

  return (
    <div ref={bannerRef} className="py-12 px-4">
      <motion.div
        variants={fadeInUpVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="max-w-6xl mx-auto bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 shadow-lg"
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-4">Piesakies Jaunumiem</h2>
            <p className="mb-6">
              Saņem jaunāko informāciju par lauksaimniecības inovācijām un mūsu
              piedāvājumiem.
            </p>
            <div className="flex items-center space-x-4">
              <Mail className="w-12 h-12 text-green-200" />
              <div>
                <p className="text-xl font-semibold">Iknedēļas Apskats</p>
                <p className="text-green-100">Vairāk nekā 5000 abonentu</p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(onSubmit);
              }}
              className="space-y-4"
            >
              <div>
                <input
                  type="text"
                  placeholder="Vārds"
                  value={values.name}
                  onChange={(e) =>
                    setValues({ ...values, name: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.name ? "border-red-300" : "border-green-200"
                  } focus:border-green-400 focus:ring-2 focus:ring-green-400/20 outline-none transition-all bg-white`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-100">{errors.name}</p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="E-pasts"
                  value={values.email}
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.email ? "border-red-300" : "border-green-200"
                  } focus:border-green-400 focus:ring-2 focus:ring-green-400/20 outline-none transition-all bg-white`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-100">{errors.email}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-white text-green-600 font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                ) : (
                  "Pieteikties"
                )}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
});

// Solutions Section
const SolutionsSection: FC<SolutionsSectionProps> = React.memo(
  ({ activeSolution, setActiveSolution, currentSolution }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

    return (
      <section ref={sectionRef} id="risinajumi" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
              Mūsu Risinājumi
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {SOLUTIONS.map((solution) => (
                <motion.div
                  key={solution.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * solution.id }}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                    activeSolution === solution.id
                      ? "bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg"
                      : "hover:bg-white hover:shadow-md"
                  }`}
                  onClick={() => setActiveSolution(solution.id)}
                  role="button"
                  tabIndex={0}
                  aria-pressed={activeSolution === solution.id}
                >
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <solution.icon
                      className={`w-6 h-6 ${
                        activeSolution === solution.id
                          ? "text-green-600"
                          : "text-green-500"
                      }`}
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {solution.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{solution.description}</p>
                  <AnimatePresence mode="wait">
                    {activeSolution === solution.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="grid grid-cols-2 gap-4"
                      >
                        {solution.metrics.map((metric, idx) => (
                          <div
                            key={idx}
                            className="bg-white p-3 rounded-lg shadow-sm"
                          >
                            <p className="text-sm text-gray-600">
                              {metric.label}
                            </p>
                            <p className="text-lg font-bold text-green-600">
                              {metric.value}
                            </p>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    );
  }
);

// Stats Section
const StatsSection: FC = React.memo(() => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  return (
    <section ref={sectionRef} className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 shadow-lg"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 bg-white/10 rounded-xl backdrop-blur-sm text-center transform transition-transform hover:scale-105"
              >
                <motion.p
                  className="text-3xl font-bold text-white mb-1"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: idx * 0.1 + 0.2 }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-green-100">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
});

// Footer
const Footer: FC = React.memo(() => (
  <footer className="px-4 pb-4">
    <div className="bg-gray-900 rounded-2xl p-6 md:p-8 text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Logo />
          <p className="mt-4 text-gray-400">
            Modernās tehnoloģijas ilgtspējīgai lauksaimniecībai
          </p>
        </div>
        {FOOTER_SECTIONS.map((section, idx) => (
          <div key={idx}>
            <h4 className="text-lg font-semibold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              {section.title}
            </h4>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:ml-0 group-hover:opacity-100 transition-all duration-300" />
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-8 pt-6 border-t border-gray-800 text-center">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} AgroTech Latvia. Visas tiesības
          aizsargātas.
        </p>
      </div>
    </div>
  </footer>
));

// Styles
const styles = `
  @layer utilities {
    .animate-blob {
      animation: blob 7s infinite;
    }
    
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    
    .animation-delay-4000 {
      animation-delay: 4s;
    }
  }
  
  @keyframes blob {
    0%, 100% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
  }
`;

// Export the main component
export default React.memo(AgriTechMockup);

// import React, {
//   useState,
//   useCallback,
//   useMemo,
//   useRef,
//   useEffect,
// } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Leaf,
//   Menu,
//   X,
//   ChevronRight,
//   LineChart,
//   Sprout,
//   CloudRain,
//   Sun,
//   ArrowRight,
// } from "lucide-react";

// // Types
// interface Solution {
//   id: number;
//   title: string;
//   description: string;
//   icon: React.ElementType;
//   metrics: { label: string; value: string }[];
// }

// // Constants
// const SOLUTIONS = [
//   {
//     id: 1,
//     title: "Viedā Lauksaimniecība",
//     description: "AI un IoT risinājumi efektīvai saimniekošanai",
//     icon: LineChart,
//     metrics: [
//       { label: "Ražas Pieaugums", value: "+35%" },
//       { label: "Izmaksu Samazinājums", value: "-28%" },
//     ],
//   },
//   {
//     id: 2,
//     title: "Precīzā Apūdeņošana",
//     description: "Automatizēta laistīšanas vadība",
//     icon: CloudRain,
//     metrics: [
//       { label: "Ūdens Ekonomija", value: "42%" },
//       { label: "Augu Veselība", value: "+45%" },
//     ],
//   },
//   {
//     id: 3,
//     title: "Siltumnīcu Kontrole",
//     description: "Pilnībā automatizēta vides kontrole",
//     icon: Sun,
//     metrics: [
//       { label: "Enerģijas Ietaupījums", value: "38%" },
//       { label: "Ražošanas Efektivitāte", value: "+52%" },
//     ],
//   },
// ] as const;

// // Types & Constants remain the same...
// // [Previous types and SOLUTIONS array remain unchanged]

// // Performance optimized hooks
// const useIntersectionObserver = (
//   elementRef: React.RefObject<Element>,
//   options: IntersectionObserverInit
// ) => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     if (!elementRef.current) return;

//     const observer = new IntersectionObserver(([entry]) => {
//       setIsVisible(entry.isIntersecting);
//     }, options);

//     observer.observe(elementRef.current);
//     return () => observer.disconnect();
//   }, [elementRef, options]);

//   return isVisible;
// };

// const AgriTechMockup: React.FC = () => {
//   const [activeSolution, setActiveSolution] = useState(1);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const containerRef = useRef<HTMLDivElement>(null);

//   const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

//   const currentSolution = useMemo(
//     () => SOLUTIONS.find((s) => s.id === activeSolution),
//     [activeSolution]
//   );

//   return (
//     <div
//       ref={containerRef}
//       className="relative w-full h-full min-h-screen bg-gradient-to-br from-green-50 to-white overflow-hidden rounded-lg shadow-lg"
//     >
//       <div className="absolute inset-0 overflow-auto">
//         {/* Header - Now contained within the component */}
//         <div className="sticky top-0 z-50 px-4 py-3 bg-white/90 backdrop-blur-md border-b border-green-100">
//           <div className="max-w-6xl mx-auto flex items-center justify-between">
//             <Logo />
//             <Navigation isOpen={isMenuOpen} onToggle={toggleMenu} />
//           </div>
//         </div>

//         {/* Main Content Container */}
//         <main className="relative w-full">
//           {/* Hero Section - Enhanced */}
//           <HeroSection />

//           {/* Solutions Section - Enhanced */}
//           <SolutionsSection
//             activeSolution={activeSolution}
//             setActiveSolution={setActiveSolution}
//             currentSolution={currentSolution}
//           />

//           {/* Stats Section - Enhanced */}
//           <StatsSection />

//           {/* Contact Section - Enhanced */}
//           <ContactSection />

//           {/* Footer - Enhanced */}
//           <Footer />
//         </main>
//       </div>
//     </div>
//   );
// };

// // Enhanced component implementations with better UI and performance
// const Logo: React.FC = React.memo(() => (
//   <div className="flex items-center space-x-2">
//     <div className="bg-gradient-to-br from-green-500 to-green-600 p-2 rounded-lg">
//       <Leaf className="h-6 w-6 text-white" />
//     </div>
//     <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
//       AgroTech
//     </span>
//   </div>
// ));

// const Navigation: React.FC<{ isOpen: boolean; onToggle: () => void }> =
//   React.memo(({ isOpen, onToggle }) => (
//     <>
//       <button
//         onClick={onToggle}
//         className="md:hidden p-2 hover:bg-green-50 rounded-lg transition-all"
//         aria-label="Toggle menu"
//       >
//         {isOpen ? <X /> : <Menu />}
//       </button>

//       <nav
//         className={`${
//           isOpen ? "block" : "hidden"
//         } md:block absolute md:relative top-full left-0 w-full md:w-auto bg-white/95 md:bg-transparent pb-4 md:pb-0 shadow-lg md:shadow-none transform-gpu transition-all duration-200 ease-in-out`}
//       >
//         <ul className="flex flex-col md:flex-row md:items-center md:space-x-8 px-4 md:px-0">
//           {["Sākums", "Risinājumi", "Kontakti"].map((item) => (
//             <li key={item}>
//               <a
//                 href="#"
//                 className="block py-2 text-gray-600 hover:text-green-600 transition-all hover:translate-x-1 md:hover:translate-x-0 md:hover:scale-105"
//               >
//                 {item}
//               </a>
//             </li>
//           ))}
//           <li>
//             <button className="mt-4 md:mt-0 w-full md:w-auto px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
//               Sākt
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </>
//   ));

// const HeroSection: React.FC = React.memo(() => {
//   const sectionRef = useRef<HTMLElement>(null);
//   const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

//   return (
//     <section ref={sectionRef} className="relative py-12 px-4 overflow-hidden">
//       <div className="max-w-6xl mx-auto bg-white/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg">
//         <div className="grid md:grid-cols-2 gap-12 items-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
//             transition={{ duration: 0.5 }}
//             className="space-y-6"
//           >
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
//               Modernā{" "}
//               <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
//                 Lauksaimniecība
//               </span>
//             </h1>
//             <p className="text-gray-600 text-lg">
//               Izmantojiet jaunākās tehnoloģijas efektīvākai saimniekošanai
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4">
//               <button className="group px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
//                 Konsultācija
//                 <ArrowRight className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform" />
//               </button>
//               <button className="px-8 py-3 border-2 border-green-600 text-green-600 rounded-xl hover:bg-green-50 transition-all duration-300 hover:scale-105">
//                 Uzzināt Vairāk
//               </button>
//             </div>
//           </motion.div>

//           <div className="relative">
//             <div className="relative rounded-2xl overflow-hidden shadow-2xl">
//               <img
//                 src="/api/placeholder/600/400"
//                 alt="Modern Farming"
//                 className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
//                 loading="lazy"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
//             </div>
//             <StatsCard />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// });

// // Continue with enhanced StatsCard, SolutionsSection, StatsSection, ContactSection, and Footer...
// // Would you like me to continue with the rest of the optimized components?

// const StatsCard: React.FC = React.memo(() => (
//   <motion.div
//     initial={{ opacity: 0, x: 20 }}
//     animate={{ opacity: 1, x: 0 }}
//     transition={{ delay: 0.3 }}
//     className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4"
//   >
//     <div className="flex items-start space-x-3">
//       <div className="p-2 bg-gradient-to-br from-green-100 to-green-200 rounded-lg">
//         <LineChart className="w-5 h-5 text-green-600" />
//       </div>
//       <div>
//         <p className="font-medium text-gray-600">Pieaugums</p>
//         <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
//           +42%
//         </p>
//       </div>
//     </div>
//   </motion.div>
// ));

// // Would you like me to continue with the remaining enhanced components?

// const SolutionsSection: React.FC<{
//   activeSolution: number;
//   setActiveSolution: (id: number) => void;
//   currentSolution: (typeof SOLUTIONS)[number] | undefined;
// }> = React.memo(({ activeSolution, setActiveSolution, currentSolution }) => {
//   const sectionRef = useRef<HTMLElement>(null);
//   const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

//   return (
//     <section ref={sectionRef} className="py-16 px-4">
//       <div className="max-w-6xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
//           className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg"
//         >
//           <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
//             Mūsu Risinājumi
//           </h2>
//           <div className="grid md:grid-cols-3 gap-6">
//             {SOLUTIONS.map((solution) => (
//               <motion.div
//                 key={solution.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.1 * solution.id }}
//                 className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
//                   activeSolution === solution.id
//                     ? "bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg"
//                     : "hover:bg-white hover:shadow-md"
//                 }`}
//                 onClick={() => setActiveSolution(solution.id)}
//               >
//                 <div className="bg-gradient-to-br from-green-100 to-emerald-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
//                   <solution.icon
//                     className={`w-6 h-6 ${
//                       activeSolution === solution.id
//                         ? "text-green-600"
//                         : "text-green-500"
//                     }`}
//                   />
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2">{solution.title}</h3>
//                 <p className="text-gray-600 mb-4">{solution.description}</p>
//                 <AnimatePresence mode="wait">
//                   {activeSolution === solution.id && (
//                     <motion.div
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: "auto" }}
//                       exit={{ opacity: 0, height: 0 }}
//                       className="grid grid-cols-2 gap-4"
//                     >
//                       {solution.metrics.map((metric, idx) => (
//                         <div
//                           key={idx}
//                           className="bg-white p-3 rounded-lg shadow-sm"
//                         >
//                           <p className="text-sm text-gray-600">
//                             {metric.label}
//                           </p>
//                           <p className="text-lg font-bold text-green-600">
//                             {metric.value}
//                           </p>
//                         </div>
//                       ))}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// });

// const StatsSection: React.FC = React.memo(() => {
//   const sectionRef = useRef<HTMLElement>(null);
//   const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

//   const stats = [
//     { value: "500+", label: "Klienti" },
//     { value: "15k", label: "Hektāri" },
//     { value: "42%", label: "Pieaugums" },
//     { value: "24/7", label: "Atbalsts" },
//   ];

//   return (
//     <section ref={sectionRef} className="py-16 px-4">
//       <div className="max-w-6xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
//           className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 shadow-lg"
//         >
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {stats.map((stat, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: idx * 0.1 }}
//                 className="p-4 bg-white/10 rounded-xl backdrop-blur-sm text-center transform transition-transform hover:scale-105"
//               >
//                 <motion.p
//                   className="text-3xl font-bold text-white mb-1"
//                   initial={{ scale: 0.5 }}
//                   animate={{ scale: 1 }}
//                   transition={{ delay: idx * 0.1 + 0.2 }}
//                 >
//                   {stat.value}
//                 </motion.p>
//                 <p className="text-green-100">{stat.label}</p>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// });

// const ContactSection: React.FC = React.memo(() => {
//   const sectionRef = useRef<HTMLElement>(null);
//   const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

//   return (
//     <section ref={sectionRef} className="py-16 px-4">
//       <div className="max-w-md mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
//           className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg"
//         >
//           <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
//             Sazināties
//           </h2>
//           <form className="space-y-4">
//             <div className="group">
//               <input
//                 type="email"
//                 placeholder="E-pasts"
//                 className="w-full px-4 py-3 rounded-xl border border-green-200 focus:border-green-600 focus:ring-2 focus:ring-green-600/20 outline-none transition-all bg-white/50 backdrop-blur-sm group-hover:border-green-400"
//               />
//             </div>
//             <div className="group">
//               <textarea
//                 placeholder="Ziņojums"
//                 rows={4}
//                 className="w-full px-4 py-3 rounded-xl border border-green-200 focus:border-green-600 focus:ring-2 focus:ring-green-600/20 outline-none transition-all bg-white/50 backdrop-blur-sm group-hover:border-green-400"
//               />
//             </div>
//             <button className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
//               Nosūtīt
//             </button>
//           </form>
//         </motion.div>
//       </div>
//     </section>
//   );
// });

// const Footer: React.FC = React.memo(() => {
//   const footerSections = [
//     {
//       title: "Risinājumi",
//       items: ["Viedā Lauksaimniecība", "Apūdeņošana", "Konsultācijas"],
//     },
//     {
//       title: "Uzņēmums",
//       items: ["Par Mums", "Komanda", "Karjera"],
//     },
//     {
//       title: "Kontakti",
//       items: ["info@agrotech.lv", "+371 20123456", "Rīga, Latvija"],
//     },
//   ];

//   return (
//     <footer className="px-4 pb-4">
//       <div className="bg-gray-900 rounded-2xl p-6 md:p-8 text-white">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
//           <div>
//             <Logo />
//             <p className="mt-4 text-gray-400">
//               Modernās tehnoloģijas ilgtspējīgai lauksaimniecībai
//             </p>
//           </div>
//           {footerSections.map((section, idx) => (
//             <div key={idx}>
//               <h4 className="text-lg font-semibold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
//                 {section.title}
//               </h4>
//               <ul className="space-y-2">
//                 {section.items.map((item) => (
//                   <li key={item}>
//                     <a
//                       href="#"
//                       className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
//                     >
//                       <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:ml-0 group-hover:opacity-100 transition-all duration-300" />
//                       <span>{item}</span>
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//         <div className="mt-8 pt-6 border-t border-gray-800 text-center">
//           <p className="text-gray-400 text-sm">
//             &copy; {new Date().getFullYear()} AgroTech Latvia. Visas tiesības
//             aizsargātas.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// });

// // CSS and Animation styles...
// const styles = `
//   @keyframes blob {
//     0% { transform: translate(0px, 0px) scale(1); }
//     33% { transform: translate(30px, -50px) scale(1.1); }
//     66% { transform: translate(-20px, 20px) scale(0.9); }
//     100% { transform: translate(0px, 0px) scale(1); }
//   }

//   .animate-blob {
//     animation: blob 7s infinite;
//   }

//   .animation-delay-2000 {
//     animation-delay: 2s;
//   }

//   .animation-delay-4000 {
//     animation-delay: 4s;
//   }
// `;

// export default React.memo(AgriTechMockup);
