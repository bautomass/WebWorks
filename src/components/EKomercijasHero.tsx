import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Search,
  User,
  Menu,
  X,
  Truck,
  Shield,
  Clock,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Types
interface Product {
  id: number;
  name: string;
  price: number;
  discountedPrice?: number;
  image: string;
  description: string;
  rating: number;
}

// Constants
const PRODUCTS: Readonly<Product[]> = [
  {
    id: 1,
    name: "Premium Rokas Pulkstenis",
    price: 129.99,
    discountedPrice: 99.99,
    image: "/images/watch.svg",
    description: "Elegants laika mērītājs mūsdienu cilvēkam.",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Stilīga Mugursoma",
    price: 89.99,
    image: "/images/backpack.svg",
    description: "Daudzpusīga soma ikdienas piedzīvojumiem.",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Dizaineru Saulesbrilles",
    price: 59.99,
    discountedPrice: 49.99,
    image: "/images/sunglasses.svg",
    description: "Aizsargā acis ar neatkārtojamu stilu.",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Ādas Apavi",
    price: 149.99,
    image: "/images/shoes.svg",
    description: "Komforts un stils katram solim.",
    rating: 4.9,
  },
];

const MENU_ITEMS = [
  "Sākums",
  "Kategorijas",
  "Produkti",
  "Piedāvājumi",
  "Par Mums",
];

// Component
const EcommerceHeroMockup: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const currentProduct = useMemo(() => PRODUCTS[currentIndex], [currentIndex]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % PRODUCTS.length);
  }, []);

  const handlePrevious = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + PRODUCTS.length) % PRODUCTS.length
    );
  }, []);

  useEffect(() => {
    const timer = setInterval(handleNext, 5000);
    return () => clearInterval(timer);
  }, [handleNext]);

  // Sub-components
  const Header = () => (
    <header className="bg-white bg-opacity-95 shadow-md py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-600 uppercase tracking-wider">
          E-Veikals
        </h1>
        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } md:block absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none`}
        >
          <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 p-4 md:p-0">
            {MENU_ITEMS.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <HeaderIcon Icon={Search} />
          <HeaderIcon Icon={User} />
          <CartIcon />
          <MenuToggle menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </div>
      </div>
    </header>
  );

  const HeaderIcon = React.memo(({ Icon }: { Icon: React.ElementType }) => (
    <button className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
      <Icon size={20} />
    </button>
  ));

  const CartIcon = React.memo(() => (
    <button className="text-gray-600 hover:text-blue-600 transition-colors duration-300 relative">
      <ShoppingCart size={20} />
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
        3
      </span>
    </button>
  ));

  const MenuToggle = React.memo(
    ({
      menuOpen,
      setMenuOpen,
    }: {
      menuOpen: boolean;
      setMenuOpen: (open: boolean) => void;
    }) => (
      <button
        className="md:hidden text-gray-600"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    )
  );

  const ProductCard = () => (
    <motion.div
      key={currentIndex}
      custom={direction}
      variants={{
        enter: (direction: number) => ({
          x: direction > 0 ? 1000 : -1000,
          opacity: 0,
          scale: 0.5,
        }),
        center: {
          x: 0,
          opacity: 1,
          scale: 1,
        },
        exit: (direction: number) => ({
          x: direction < 0 ? 1000 : -1000,
          opacity: 0,
          scale: 0.5,
        }),
      }}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
      className="absolute inset-0 flex flex-col sm:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden"
    >
      <ProductImage />
      <ProductDetails />
    </motion.div>
  );

  const ProductImage = () => (
    <div className="w-full sm:w-1/2 p-4 sm:p-8 flex items-center justify-center relative overflow-hidden group">
      <img
        src={currentProduct.image}
        alt={currentProduct.name}
        className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );

  const ProductDetails = () => (
    <div className="w-full sm:w-1/2 p-4 sm:p-8 flex flex-col justify-center">
      <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2 sm:mb-4">
        {currentProduct.name}
      </h3>
      <p className="text-gray-600 mb-2 sm:mb-4">{currentProduct.description}</p>
      <ProductRating rating={currentProduct.rating} />
      <ProductPrice
        price={currentProduct.price}
        discountedPrice={currentProduct.discountedPrice}
      />
      <AddToCartButton />
    </div>
  );

  const ProductRating = React.memo(({ rating }: { rating: number }) => (
    <div className="flex items-center mb-2 sm:mb-4">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={16}
          className={
            index < Math.floor(rating)
              ? "text-yellow-400 fill-current"
              : "text-gray-300"
          }
        />
      ))}
      <span className="ml-2 text-gray-600 text-sm">({rating.toFixed(1)})</span>
    </div>
  ));

  const ProductPrice = React.memo(
    ({
      price,
      discountedPrice,
    }: {
      price: number;
      discountedPrice?: number;
    }) => (
      <div className="flex items-center mb-4 sm:mb-6">
        {discountedPrice ? (
          <>
            <span className="text-2xl sm:text-4xl font-bold text-blue-600">
              €{discountedPrice.toFixed(2)}
            </span>
            <span className="ml-2 text-lg sm:text-2xl text-gray-500 line-through">
              €{price.toFixed(2)}
            </span>
          </>
        ) : (
          <span className="text-2xl sm:text-4xl font-bold text-blue-600">
            €{price.toFixed(2)}
          </span>
        )}
      </div>
    )
  );

  const AddToCartButton = React.memo(() => (
    <button className="bg-blue-600 text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center">
      <ShoppingCart size={20} className="mr-2" />
      Pievienot Grozam
    </button>
  ));

  const NavigationButton = React.memo(
    ({
      direction,
      onClick,
    }: {
      direction: "left" | "right";
      onClick: () => void;
    }) => (
      <button
        onClick={onClick}
        className={`absolute ${
          direction === "left" ? "left-2 sm:left-4" : "right-2 sm:right-4"
        } top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-100 rounded-full p-2 sm:p-3 transition-all duration-300 focus:outline-none`}
        aria-label={
          direction === "left" ? "Iepriekšējais produkts" : "Nākamais produkts"
        }
      >
        {direction === "left" ? (
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
        ) : (
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
        )}
      </button>
    )
  );

  const TrustIndicators = () => (
    <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
      <TrustIndicator
        Icon={Truck}
        title="Bezmaksas Piegāde"
        description="Pasūtījumiem virs €50"
      />
      <TrustIndicator
        Icon={Shield}
        title="Droši Maksājumi"
        description="100% Droša Transakcija"
      />
      <TrustIndicator
        Icon={Clock}
        title="14 Dienu Atgriešana"
        description="Vienkārša Naudas Atmaksa"
      />
    </div>
  );

  const TrustIndicator = React.memo(
    ({
      Icon,
      title,
      description,
    }: {
      Icon: React.ElementType;
      title: string;
      description: string;
    }) => (
      <div className="flex items-center">
        <Icon size={32} className="text-blue-600 mr-4" />
        <div>
          <h4 className="font-semibold text-lg">{title}</h4>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    )
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 font-sans relative">
      <div className="absolute inset-0 bg-pattern opacity-10"></div>

      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-2 px-4 text-sm flex justify-between items-center">
        <span>Bezmaksas piegāde pasūtījumiem virs €50!</span>
        <div className="flex space-x-4">
          <span>Latviešu</span>
          <span>EUR</span>
        </div>
      </div>

      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div
            className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-800 mb-4 sm:mb-6">
              Atklāj Savu <span className="text-blue-600">Unikālo Stilu</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
              Izcel savu personību ar mūsu ekskluzīvo kolekciju, kas radīta
              tieši Tev. Atrodi savu ideālo stilu mūsu plašajā produktu klāstā.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors duration-300">
                Sākt Iepirkties
              </button>
              <button className="border-2 border-blue-600 text-blue-600 font-semibold py-3 px-8 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300">
                Jaunākās Kolekcijas
              </button>
            </div>
          </motion.div>

          <div className="lg:w-1/2 relative h-64 sm:h-96 lg:h-[32rem] w-full max-w-md mx-auto lg:max-w-none">
            <AnimatePresence initial={false} custom={direction}>
              <ProductCard />
            </AnimatePresence>

            <NavigationButton direction="left" onClick={handlePrevious} />
            <NavigationButton direction="right" onClick={handleNext} />
          </div>
        </div>

        <TrustIndicators />
      </main>

      <style jsx>{`
        .bg-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>

      <NewsletterSignup />
      <Footer />
    </div>
  );
};

const NewsletterSignup = React.memo(() => (
  <div className="bg-blue-600 py-8 sm:py-12 px-4 sm:px-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
      <div className="mb-6 md:mb-0 text-center md:text-left">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
          Pierakstieties Mūsu Jaunumiem
        </h3>
        <p className="text-blue-100 text-sm sm:text-base">
          Saņemiet ekskluzīvus piedāvājumus un jaunākās ziņas tieši savā
          e-pastā.
        </p>
      </div>
      <form className="flex flex-col sm:flex-row w-full md:w-auto">
        <input
          type="email"
          placeholder="Jūsu e-pasta adrese"
          className="px-4 py-2 sm:py-3 rounded-l-lg sm:rounded-r-none mb-2 sm:mb-0 w-full focus:outline-none"
        />
        <button
          type="submit"
          className="bg-yellow-400 text-blue-900 font-semibold px-6 py-2 sm:py-3 rounded-r-lg sm:rounded-l-none hover:bg-yellow-300 transition-colors duration-300"
        >
          Pierakstīties
        </button>
      </form>
    </div>
  </div>
));

const Footer = React.memo(() => (
  <footer className="bg-gray-800 text-white py-8 sm:py-12 px-4 sm:px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      <FooterSection title="Par Mums">
        <p className="text-gray-400 text-sm">
          Mēs piedāvājam augstākās kvalitātes produktus par pieejamām cenām.
        </p>
      </FooterSection>
      <FooterSection title="Ātras Saites">
        <ul className="space-y-2">
          {[
            "Bieži Uzdotie Jautājumi",
            "Piegādes Informācija",
            "Atgriešanas Politika",
          ].map((item) => (
            <li key={item}>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </FooterSection>
      <FooterSection title="Kontakti">
        <p className="text-gray-400 text-sm">Rīga, Latvija</p>
        <p className="text-gray-400 text-sm">Tālr: +371 12345678</p>
        <p className="text-gray-400 text-sm">E-pasts: info@eveikals.lv</p>
      </FooterSection>
      <FooterSection title="Sekojiet Mums">
        <div className="flex space-x-4">
          <SocialIcon
            href="#"
            path="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
          />
          <SocialIcon
            href="#"
            path="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
          />
          <SocialIcon
            href="#"
            path="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"
          />
        </div>
      </FooterSection>
    </div>
    <div className="mt-8 pt-8 border-t border-gray-700 text-center">
      <p className="text-gray-400 text-sm">
        &copy; 2024 E-Veikals. Visas tiesības aizsargātas.
      </p>
    </div>
  </footer>
));

const FooterSection = React.memo(
  ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div>
      <h4 className="text-lg sm:text-xl font-semibold mb-4">{title}</h4>
      {children}
    </div>
  )
);

const SocialIcon = React.memo(
  ({ href, path }: { href: string; path: string }) => (
    <a
      href={href}
      className="text-gray-400 hover:text-white transition-colors duration-300"
    >
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={path} />
      </svg>
    </a>
  )
);

export default React.memo(EcommerceHeroMockup);
