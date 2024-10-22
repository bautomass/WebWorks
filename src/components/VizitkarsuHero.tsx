import React, { useState } from "react";
import {
  Edit3,
  Share2,
  ChevronRight,
  Check,
  Zap,
  Globe,
  Smartphone,
} from "lucide-react";

const VizitkarsuHero2026: React.FC = () => {
  const [activeMenuItem, setActiveMenuItem] = useState("portfolio");
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    businessName: "WebWorks",
    businessType: "Digitālo Risinājumu Uzņēmums",
    slogan: "Jūsu digitālās nākotnes veidotāji",
    phone: "+371 26282630",
    email: "info@webworks.lv",
    address: "Brīvības iela 76, Rīga, LV-1001",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleFlip = () => {
    if (!isEditing) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    setIsFlipped(false);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert("Dalīšanās funkcionalitāte šeit!");
  };

  const menuItems = [
    "Portfollio",
    "Pakalpojumi",
    "Komanda",
    "Klienti",
    "Kontakti",
  ];

  const services = [
    {
      title: "Digitālā Stratēģija",
      description: "Personalizēta digitālā stratēģija jūsu biznesam.",
      icon: <Globe className="w-8 h-8 text-blue-500" />,
    },
    {
      title: "Mobilās Lietotnes",
      description: "Intuitīvas mobilās lietotnes jūsu klientiem.",
      icon: <Smartphone className="w-8 h-8 text-blue-500" />,
    },
    {
      title: "AI Risinājumi",
      description: "Mākslīgā intelekta risinājumi efektivitātei.",
      icon: <Zap className="w-8 h-8 text-blue-500" />,
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-800 font-sans">
      {/* Mobile-optimized navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="text-xl sm:text-2xl font-bold text-blue-600">
              WebWorks
            </div>
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="w-6 h-0.5 bg-gray-600 mb-1"></div>
              <div className="w-6 h-0.5 bg-gray-600 mb-1"></div>
              <div className="w-6 h-0.5 bg-gray-600"></div>
            </button>
            {/* Desktop menu */}
            <div className="hidden md:flex space-x-4">
              {menuItems.map((item) => (
                <button
                  key={item}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeMenuItem === item.toLowerCase()
                      ? "bg-blue-500 text-white"
                      : "text-gray-600 hover:bg-blue-50 hover:text-blue-500"
                  }`}
                  onClick={() => setActiveMenuItem(item.toLowerCase())}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          {/* Mobile menu dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-2 space-y-2 pb-3">
              {menuItems.map((item) => (
                <button
                  key={item}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeMenuItem === item.toLowerCase()
                      ? "bg-blue-500 text-white"
                      : "text-gray-600 hover:bg-blue-50 hover:text-blue-500"
                  }`}
                  onClick={() => {
                    setActiveMenuItem(item.toLowerCase());
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <main className="container mx-auto px-4 py-6 sm:py-12">
        <section className="text-center mb-8 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-blue-600">
            Nākotnes Digitālā Klātbūtne
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Mēs veidojam revolucionārus digitālos risinājumus, kas pārveido jūsu
            biznesu un rada paliekošu iespaidu digitālajā pasaulē.
          </p>
        </section>

        {/* Optimized card container */}
        <div className="max-w-4xl mx-auto mb-8 sm:mb-16">
          <div
            className={`relative w-full min-h-[500px] sm:min-h-[400px] rounded-3xl shadow-2xl transition-all duration-500 ${
              isFlipped ? "[transform:rotateY(180deg)]" : ""
            }`}
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
            onClick={handleFlip}
          >
            {/* Front of card */}
            <div className="absolute w-full h-full rounded-3xl p-4 sm:p-6 md:p-8 bg-gradient-to-br from-white to-blue-50 [backface-visibility:hidden] flex flex-col justify-between border-2 border-blue-200">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="w-full">
                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        name="businessName"
                        value={cardInfo.businessName}
                        onChange={handleInputChange}
                        className="text-2xl sm:text-3xl font-bold bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none w-full px-2 py-1"
                        placeholder="Uzņēmuma nosaukums"
                      />
                      <input
                        type="text"
                        name="businessType"
                        value={cardInfo.businessType}
                        onChange={handleInputChange}
                        className="text-lg sm:text-xl text-gray-600 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none w-full px-2 py-1"
                        placeholder="Uzņēmuma veids"
                      />
                      <input
                        type="text"
                        name="slogan"
                        value={cardInfo.slogan}
                        onChange={handleInputChange}
                        className="text-base sm:text-lg text-gray-600 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none w-full px-2 py-1"
                        placeholder="Sauklis"
                      />
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-blue-600">
                        {cardInfo.businessName}
                      </h2>
                      <p className="text-lg sm:text-xl text-gray-600 mb-2">
                        {cardInfo.businessType}
                      </p>
                      <p className="text-base sm:text-lg text-gray-600">
                        {cardInfo.slogan}
                      </p>
                    </>
                  )}
                </div>
                <div className="flex space-x-2">
                  {isEditing ? (
                    <button
                      onClick={handleSave}
                      className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-200"
                    >
                      <Check size={20} />
                    </button>
                  ) : (
                    <button
                      onClick={handleEdit}
                      className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200"
                    >
                      <Edit3 size={20} />
                    </button>
                  )}
                  <button
                    onClick={handleShare}
                    className="p-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors duration-200"
                  >
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
              <div className="space-y-3 text-sm sm:text-base text-gray-600 mt-4">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="phone"
                      value={cardInfo.phone}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none px-2 py-1"
                      placeholder="Tālrunis"
                    />
                    <input
                      type="text"
                      name="email"
                      value={cardInfo.email}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none px-2 py-1"
                      placeholder="E-pasts"
                    />
                    <input
                      type="text"
                      name="address"
                      value={cardInfo.address}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none px-2 py-1"
                      placeholder="Adrese"
                    />
                  </>
                ) : (
                  <>
                    <p>{cardInfo.phone}</p>
                    <p className="break-all">{cardInfo.email}</p>
                    <p>{cardInfo.address}</p>
                  </>
                )}
              </div>
              {!isEditing && (
                <div className="text-blue-500 flex items-center justify-end mt-4 text-sm sm:text-base">
                  Apgriezt, lai apskatītu pakalpojumus{" "}
                  <ChevronRight size={16} className="ml-1" />
                </div>
              )}
            </div>
            {/* Back of card - Updated version with conditional scrolling */}
            <div className="absolute w-full h-full rounded-3xl bg-gradient-to-br from-blue-50 to-white [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col border-2 border-blue-200 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-blue-100 rounded-full -mr-12 -mt-12"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-40 sm:h-40 bg-blue-100 rounded-full -ml-16 -mb-16"></div>

              {/* Content container - scrollable only on smaller screens */}
              <div className="relative h-full overflow-y-auto md:overflow-y-visible">
                {/* Inner content wrapper with padding */}
                <div className="p-4 sm:p-6 md:p-8">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-blue-600 text-center md:static sticky top-0 bg-white md:bg-transparent">
                    Mūsu Pakalpojumi
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-4">
                    {services.map((service, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-blue-100 group hover:-translate-y-1"
                      >
                        <div className="flex items-center justify-center mb-3 bg-blue-50 rounded-full w-12 h-12 sm:w-16 sm:h-16 mx-auto group-hover:bg-blue-100 transition-colors duration-300">
                          {service.icon}
                        </div>
                        <h3 className="font-semibold text-base sm:text-lg mb-2 text-center text-gray-800">
                          {service.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 text-center">
                          {service.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Back button - Fixed at bottom only on mobile */}
                  <div className="md:static sticky bottom-0 bg-white md:bg-transparent pt-4">
                    <div className="flex justify-center">
                      <button
                        onClick={handleFlip}
                        className="flex items-center space-x-1 sm:space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium py-2 px-3 sm:px-4 rounded-full transition-colors duration-300 text-sm sm:text-base"
                      >
                        <ChevronRight
                          size={16}
                          className="transform rotate-180"
                        />
                        <span>Atpakaļ uz uzņēmuma informāciju</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features section */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg max-w-4xl mx-auto border-2 border-blue-200">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 text-center text-blue-600">
            Kāpēc izvēlēties mūsu digitālo vizītkarti?
          </h2>
          <div className="grid gap-3 sm:gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "24/7 Pieejamība",
                description:
                  "Jūsu biznesa informācija ir pieejama klientiem jebkurā laikā un vietā.",
              },
              {
                title: "Profesionāls Tēls",
                description:
                  "Radiet modernu un inovatīvu iespaidu digitālajā vidē.",
              },
              {
                title: "Viegla Kontaktu Apmaiņa",
                description:
                  "Klienti var ātri un ērti saglabāt jūsu kontaktus savās ierīcēs.",
              },
              {
                title: "Pielāgojamība",
                description:
                  "Viegli atjauniniet savu informāciju reāllaikā bez papildu izmaksām.",
              },
              {
                title: "SEO Priekšrocības",
                description:
                  "Uzlabojiet sava uzņēmuma redzamību meklētājprogrammās.",
              },
              {
                title: "Detalizēta Analītika",
                description:
                  "Iegūstiet vērtīgus datus par klientu interesēm un mijiedarbību.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-3 sm:p-4 md:p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-blue-100"
              >
                <h3 className="font-semibold text-base sm:text-lg md:text-xl mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 sm:mt-8 md:mt-12 text-center">
            <button className="w-full sm:w-auto px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-blue-500 text-white rounded-full text-sm sm:text-base md:text-lg font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg border-2 border-blue-400">
              Izveidot Manu Digitālo Vizītkarti
            </button>
          </div>
        </div>
      </main>

      {/* Optional footer */}
      <footer className="bg-white mt-8 py-4 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>© 2024 WebWorks. Visas tiesības aizsargātas.</p>
        </div>
      </footer>
    </div>
  );
};

export default VizitkarsuHero2026;
