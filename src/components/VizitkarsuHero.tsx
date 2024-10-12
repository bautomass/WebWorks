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
      icon: <Globe className="w-10 h-10 text-blue-500" />,
    },
    {
      title: "Mobilās Lietotnes",
      description: "Intuitīvas mobilās lietotnes jūsu klientiem.",
      icon: <Smartphone className="w-10 h-10 text-blue-500" />,
    },
    {
      title: "AI Risinājumi",
      description: "Mākslīgā intelekta risinājumi efektivitātei.",
      icon: <Zap className="w-10 h-10 text-blue-500" />,
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-800 font-sans">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600">
              WebWorks
            </div>
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
        </div>
      </nav>

      <main className="container mx-auto px-4 sm:px-6 py-12">
        <section className="text-center mb-16 sm:mb-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-blue-600">
            Nākotnes Digitālā Klātbūtne
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Mēs veidojam revolucionārus digitālos risinājumus, kas pārveido jūsu
            biznesu un rada paliekošu iespaidu digitālajā pasaulē.
          </p>
        </section>

        <div className="max-w-4xl mx-auto mb-16 sm:mb-20">
          <div
            className={`relative w-full h-[450px] sm:h-[400px] rounded-3xl shadow-2xl transition-all duration-500 ${
              isFlipped ? "[transform:rotateY(180deg)]" : ""
            }`}
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
            onClick={handleFlip}
          >
            <div className="absolute w-full h-full rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-white to-blue-50 [backface-visibility:hidden] flex flex-col justify-between border-2 border-blue-200">
              <div className="flex justify-between items-start">
                <div className="w-full">
                  {isEditing ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="businessName"
                        value={cardInfo.businessName}
                        onChange={handleInputChange}
                        className="text-3xl sm:text-4xl font-bold bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none w-full px-2 py-1"
                        placeholder="Uzņēmuma nosaukums"
                      />
                      <input
                        type="text"
                        name="businessType"
                        value={cardInfo.businessType}
                        onChange={handleInputChange}
                        className="text-xl sm:text-2xl text-gray-600 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none w-full px-2 py-1"
                        placeholder="Uzņēmuma veids"
                      />
                      <input
                        type="text"
                        name="slogan"
                        value={cardInfo.slogan}
                        onChange={handleInputChange}
                        className="text-lg sm:text-xl text-gray-600 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none w-full px-2 py-1"
                        placeholder="Sauklis"
                      />
                    </div>
                  ) : (
                    <>
                      <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-blue-600">
                        {cardInfo.businessName}
                      </h2>
                      <p className="text-xl sm:text-2xl text-gray-600 mb-2">
                        {cardInfo.businessType}
                      </p>
                      <p className="text-lg sm:text-xl text-gray-600">
                        {cardInfo.slogan}
                      </p>
                    </>
                  )}
                </div>
                <div className="flex space-x-2 ml-4">
                  {isEditing ? (
                    <button
                      onClick={handleSave}
                      className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-200"
                    >
                      <Check size={24} />
                    </button>
                  ) : (
                    <button
                      onClick={handleEdit}
                      className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200"
                    >
                      <Edit3 size={24} />
                    </button>
                  )}
                  <button
                    onClick={handleShare}
                    className="p-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors duration-200"
                  >
                    <Share2 size={24} />
                  </button>
                </div>
              </div>
              <div className="space-y-3 text-base sm:text-lg text-gray-600">
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
                    <p>{cardInfo.email}</p>
                    <p>{cardInfo.address}</p>
                  </>
                )}
              </div>
              {!isEditing && (
                <div className="text-blue-500 flex items-center justify-end mt-4">
                  Apgriezt, lai apskatītu pakalpojumus{" "}
                  <ChevronRight size={20} />
                </div>
              )}
            </div>
            <div className="absolute w-full h-full rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-blue-50 to-white [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-between border-2 border-blue-200 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -mr-16 -mt-16 z-0"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-100 rounded-full -ml-20 -mb-20 z-0"></div>

              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-blue-600 text-center relative z-10">
                Mūsu Pakalpojumi
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 flex-grow relative z-10">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-blue-100 group hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-center mb-4 bg-blue-50 rounded-full w-16 h-16 mx-auto group-hover:bg-blue-100 transition-colors duration-300">
                      {React.cloneElement(service.icon, {
                        className:
                          "w-8 h-8 text-blue-500 group-hover:text-blue-600",
                      })}
                    </div>
                    <h3 className="font-semibold text-xl mb-3 text-center text-gray-800">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 text-center">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="text-blue-500 flex items-center justify-center mt-6 relative z-10">
                <button
                  onClick={handleFlip}
                  className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium py-2 px-4 rounded-full transition-colors duration-300"
                >
                  <ChevronRight size={20} className="transform rotate-180" />
                  <span>Atpakaļ uz uzņēmuma informāciju</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg max-w-4xl mx-auto border-2 border-blue-200">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-blue-600">
            Kāpēc izvēlēties mūsu digitālo vizītkarti?
          </h2>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              "24/7 Pieejamība",
              "Profesionāls Tēls",
              "Viegla Kontaktu Apmaiņa",
              "Pielāgojamība",
              "SEO Priekšrocības",
              "Detalizēta Analītika",
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-4 sm:p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-blue-100"
              >
                <h3 className="font-semibold text-lg sm:text-xl mb-2">
                  {item}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item === "24/7 Pieejamība"
                    ? "Jūsu biznesa informācija ir pieejama klientiem jebkurā laikā un vietā."
                    : item === "Profesionāls Tēls"
                    ? "Radiet modernu un inovatīvu iespaidu digitālajā vidē."
                    : item === "Viegla Kontaktu Apmaiņa"
                    ? "Klienti var ātri un ērti saglabāt jūsu kontaktus savās ierīcēs."
                    : item === "Pielāgojamība"
                    ? "Viegli atjauniniet savu informāciju reāllaikā bez papildu izmaksām."
                    : item === "SEO Priekšrocības"
                    ? "Uzlabojiet sava uzņēmuma redzamību meklētājprogrammās."
                    : "Iegūstiet vērtīgus datus par klientu interesēm un mijiedarbību."}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 sm:mt-12 text-center">
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-500 text-white rounded-full text-lg font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg border-2 border-blue-400">
              Izveidot Manu Digitālo Vizītkarti
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VizitkarsuHero2026;
