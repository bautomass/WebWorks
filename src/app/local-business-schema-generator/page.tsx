"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCopy,
  FiHeart,
  FiChevronLeft,
  FiChevronRight,
  FiInfo,
  FiClock,
  FiMapPin,
  FiPhone,
  FiMail,
  FiGlobe,
  FiSave,
  FiTrash2,
  FiEdit3,
} from "react-icons/fi";
import Header from "../../components/Header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const businessTypes = [
  "Restorāns",
  "Veikals",
  "Frizētava",
  "Viesnīca",
  "Sporta zāle",
  "Zobārsts",
  "Auto serviss",
  "Kafejnīca",
  "Grāmatnīca",
  "Aptieka",
];

const daysOfWeek = [
  "Pirmdiena",
  "Otrdiena",
  "Trešdiena",
  "Ceturtdiena",
  "Piektdiena",
  "Sestdiena",
  "Svētdiena",
];

const LocalBusinessSchemaGenerator = () => {
  const [businessInfo, setBusinessInfo] = useState({
    name: "",
    type: businessTypes[0],
    description: "",
    address: {
      streetAddress: "",
      addressLocality: "",
      postalCode: "",
      addressCountry: "Latvija",
    },
    telephone: "",
    email: "",
    url: "",
    openingHours: daysOfWeek.map((day) => ({ day, opens: "", closes: "" })),
  });

  const [favorites, setFavorites] = useState([]);
  const [currentBusinessIndex, setCurrentBusinessIndex] = useState(0);
  const [activeSection, setActiveSection] = useState("info");
  const [schemaPreview, setSchemaPreview] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const storedFavorites = localStorage.getItem(
      "localBusinessSchemeFavorites"
    );
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "localBusinessSchemeFavorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBusinessInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setBusinessInfo((prevInfo) => ({
      ...prevInfo,
      address: {
        ...prevInfo.address,
        [name]: value,
      },
    }));
  };

  const handleOpeningHoursChange = (index, field, value) => {
    setBusinessInfo((prevInfo) => {
      const newOpeningHours = [...prevInfo.openingHours];
      newOpeningHours[index] = {
        ...newOpeningHours[index],
        [field]: value,
      };
      return {
        ...prevInfo,
        openingHours: newOpeningHours,
      };
    });
  };

  const generateSchema = () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      ...businessInfo,
      address: {
        "@type": "PostalAddress",
        ...businessInfo.address,
      },
      openingHoursSpecification: businessInfo.openingHours
        .filter((day) => day.opens && day.closes)
        .map((day) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: day.day,
          opens: day.opens,
          closes: day.closes,
        })),
    };

    const schemaString = JSON.stringify(schema, null, 2);
    setSchemaPreview(schemaString);
    return schemaString;
  };

  const copySchema = () => {
    const schema = generateSchema();
    navigator.clipboard.writeText(schema);
    setAlertMessage("Schema ir nokopēta uz starpliktuvi!");
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const toggleFavorite = () => {
    const isFavorite = favorites.some((fav) => fav.name === businessInfo.name);
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.name !== businessInfo.name));
      setAlertMessage("Bizness noņemts no favorītiem!");
    } else {
      setFavorites([...favorites, businessInfo]);
      setAlertMessage("Bizness pievienots favorītiem!");
    }
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const nextBusiness = () => {
    if (currentBusinessIndex < favorites.length - 1) {
      setCurrentBusinessIndex(currentBusinessIndex + 1);
      setBusinessInfo(favorites[currentBusinessIndex + 1]);
    }
  };

  const prevBusiness = () => {
    if (currentBusinessIndex > 0) {
      setCurrentBusinessIndex(currentBusinessIndex - 1);
      setBusinessInfo(favorites[currentBusinessIndex - 1]);
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
        <Head>
          <title>
            Vietējā biznesa shēmas ģenerators - Strukturētu datu marķējuma
            izveide
          </title>
          <meta
            name="description"
            content="Izveidojiet strukturētu datu marķējumu jūsu vietējam biznesam, lai uzlabotu tā redzamību meklētājprogrammās ar mūsu vietējā biznesa shēmas ģeneratoru."
          />
          <meta
            name="keywords"
            content="vietējais bizness, strukturētie dati, shēma, SEO, meklētājprogrammu optimizācija, Google My Business"
          />
          <link
            rel="canonical"
            href="https://jusu-domena.lv/local-business-schema-generator"
          />
        </Head>
        <Header />
        <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
              Vietējā biznesa shēmas ģenerators
            </h1>
            <p className="text-xl text-gray-600 text-center mb-8">
              Uzlabojiet sava biznesa redzamību meklētājprogrammās ar
              strukturētu datu marķējumu
            </p>
          </motion.div>

          <AnimatePresence>
            {showAlert && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Alert>
                  <AlertTitle>Paziņojums</AlertTitle>
                  <AlertDescription>{alertMessage}</AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={prevBusiness}
                      className="text-gray-600 hover:text-gray-800 focus:outline-none disabled:opacity-50"
                      disabled={currentBusinessIndex === 0}
                    >
                      <FiChevronLeft size={24} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Iepriekšējais bizness</TooltipContent>
                </Tooltip>
                <h2 className="text-2xl font-bold text-center">
                  {businessInfo.name || "Jauns bizness"}
                </h2>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={nextBusiness}
                      className="text-gray-600 hover:text-gray-800 focus:outline-none disabled:opacity-50"
                      disabled={currentBusinessIndex === favorites.length - 1}
                    >
                      <FiChevronRight size={24} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Nākamais bizness</TooltipContent>
                </Tooltip>
              </div>

              <div className="flex mb-6">
                <button
                  onClick={() => setActiveSection("info")}
                  className={`flex-1 py-2 px-4 text-center ${
                    activeSection === "info"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  } rounded-l-lg focus:outline-none transition-colors duration-200`}
                >
                  Pamatinformācija
                </button>
                <button
                  onClick={() => setActiveSection("hours")}
                  className={`flex-1 py-2 px-4 text-center ${
                    activeSection === "hours"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  } rounded-r-lg focus:outline-none transition-colors duration-200`}
                >
                  Darba laiks
                </button>
              </div>

              {activeSection === "info" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Biznesa nosaukums
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={businessInfo.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Piem., Jāņa Kafejnīca"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Biznesa tips
                    </label>
                    <select
                      name="type"
                      value={businessInfo.type}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {businessTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Apraksts
                    </label>
                    <textarea
                      name="description"
                      value={businessInfo.description}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Īss biznesa apraksts..."
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <FiMapPin className="inline mr-1" /> Iela
                      </label>
                      <input
                        type="text"
                        name="streetAddress"
                        value={businessInfo.address.streetAddress}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Piem., Brīvības iela 1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <FiMapPin className="inline mr-1" /> Pilsēta
                      </label>
                      <input
                        type="text"
                        name="addressLocality"
                        value={businessInfo.address.addressLocality}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Piem., Rīga"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <FiMapPin className="inline mr-1" /> Pasta indekss
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={businessInfo.address.postalCode}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Piem., LV-1001"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <FiMapPin className="inline mr-1" /> Valsts
                      </label>
                      <input
                        type="text"
                        name="addressCountry"
                        value={businessInfo.address.addressCountry}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <FiPhone className="inline mr-1" /> Tālrunis
                      </label>
                      <input
                        type="tel"
                        name="telephone"
                        value={businessInfo.telephone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Piem., +371 12345678"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <FiMail className="inline mr-1" /> E-pasts
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={businessInfo.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Piem., info@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <FiGlobe className="inline mr-1" /> Mājas lapa
                    </label>
                    <input
                      type="url"
                      name="url"
                      value={businessInfo.url}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Piem., https://www.example.com"
                    />
                  </div>
                </motion.div>
              )}

              {activeSection === "hours" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-medium mb-4">
                    <FiClock className="inline mr-2" />
                    Darba laiks
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {businessInfo.openingHours.map((day, index) => (
                      <div key={day.day} className="flex flex-col">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {day.day}
                        </label>
                        <div className="flex space-x-2">
                          <input
                            type="time"
                            value={day.opens}
                            onChange={(e) =>
                              handleOpeningHoursChange(
                                index,
                                "opens",
                                e.target.value
                              )
                            }
                            className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          />
                          <input
                            type="time"
                            value={day.closes}
                            onChange={(e) =>
                              handleOpeningHoursChange(
                                index,
                                "closes",
                                e.target.value
                              )
                            }
                            className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              <div className="mt-8 flex justify-between">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={toggleFavorite}
                      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
                        favorites.some((fav) => fav.name === businessInfo.name)
                          ? "text-white bg-pink-600 hover:bg-pink-700"
                          : "text-pink-600 bg-white hover:bg-pink-50"
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-200`}
                    >
                      <FiHeart className="mr-2" />{" "}
                      {favorites.some((fav) => fav.name === businessInfo.name)
                        ? "Noņemt no favorītiem"
                        : "Pievienot favorītiem"}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {favorites.some((fav) => fav.name === businessInfo.name)
                      ? "Noņemt šo biznesu no favorītiem"
                      : "Pievienot šo biznesu favorītiem"}
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={copySchema}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    >
                      <FiCopy className="mr-2" /> Kopēt shēmu
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Kopēt ģenerēto shēmu</TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>

          {favorites.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white shadow-lg rounded-lg overflow-hidden mb-8"
            >
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium mb-4">Jūsu Favorīti</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {favorites.map((business, index) => (
                    <div
                      key={index}
                      className="p-4 rounded cursor-pointer border border-gray-200 hover:border-indigo-500 transition-colors duration-200"
                      onClick={() => {
                        setBusinessInfo(business);
                        setCurrentBusinessIndex(index);
                      }}
                    >
                      <h4 className="font-bold mb-2">{business.name}</h4>
                      <p className="text-sm mb-2">{business.type}</p>
                      <p className="text-sm text-gray-500">
                        {business.address.addressLocality},{" "}
                        {business.address.addressCountry}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FiInfo className="mr-2" /> Kas ir vietējā biznesa shēma un
                kāpēc tā ir svarīga?
              </h2>
              <p className="text-gray-600 mb-4">
                Vietējā biznesa shēma ir strukturētu datu formāts, kas palīdz
                meklētājprogrammām labāk saprast un attēlot jūsu biznesa
                informāciju meklēšanas rezultātos. Tā ietver svarīgus datus par
                jūsu uzņēmumu, piemēram, adresi, darba laiku un
                kontaktinformāciju.
              </p>
              <h3 className="text-lg font-medium mb-2">Ieguvumi:</h3>
              <ul className="list-disc pl-5 text-gray-600 mb-4">
                <li>Uzlabota redzamība Google meklēšanas rezultātos</li>
                <li>Precīzāka informācija potenciālajiem klientiem</li>
                <li>
                  Lielāka iespēja parādīties Google kartēs un vietējās
                  meklēšanas rezultātos
                </li>
                <li>
                  Potenciāli augstāks klikšķu skaits un apmeklējumu skaits
                </li>
              </ul>
              <p className="text-gray-600">
                Izmantojot šo rīku, jūs varat viegli izveidot un pārvaldīt sava
                biznesa strukturētos datus, uzlabojot savu tiešsaistes klātbūtni
                un palielinot iespēju piesaistīt vairāk klientu.
              </p>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium mb-4">
                Padomi efektīvai vietējā biznesa shēmas izveidei
              </h2>
              <ul className="list-disc pl-5 text-gray-600">
                <li>
                  Pārliecinieties, ka visa informācija ir precīza un aktuāla.
                </li>
                <li>
                  Izmantojiet konsekventu formatējumu adreses un
                  kontaktinformācijas norādīšanai.
                </li>
                <li>Iekļaujiet detalizētu un pārliecinošu biznesa aprakstu.</li>
                <li>
                  Norādiet precīzu darba laiku, ieskaitot svētku dienas vai
                  sezonālās izmaiņas.
                </li>
                <li>
                  Ja jūsu biznesam ir vairākas filiāles, izveidojiet atsevišķu
                  shēmu katrai no tām.
                </li>
                <li>
                  Regulāri atjauniniet shēmu, ja mainās biznesa informācija vai
                  darba laiks.
                </li>
                <li>
                  Izmantojiet papildu atribūtus, piemēram, "priceRange" vai
                  "paymentAccepted", lai sniegtu vēl detalizētāku informāciju.
                </li>
                <li>
                  Pārbaudiet, vai jūsu shēma atbilst Google un citu
                  meklētājprogrammu vadlīnijām.
                </li>
              </ul>
            </div>
          </div>

          {schemaPreview && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 bg-gray-100 p-4 rounded-lg"
            >
              <h3 className="text-lg font-medium mb-2">
                Shēmas Priekšskatījums
              </h3>
              <pre className="bg-white p-4 rounded overflow-x-auto">
                <code>{schemaPreview}</code>
              </pre>
            </motion.div>
          )}
        </main>
      </div>
    </TooltipProvider>
  );
};
export default LocalBusinessSchemaGenerator;
