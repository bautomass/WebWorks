"use client";

import React, { useState } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import Script from "next/script";
import {
  FiSearch,
  FiTrendingUp,
  FiBarChart2,
  FiCheckCircle,
  FiAward,
  FiGlobe,
  FiSettings,
  FiTarget,
  FiAlertCircle,
  FiX,
  FiArrowRight,
} from "react-icons/fi";
import Header from "@/components/Header";
import Footer from "@/components/footer";

interface Package {
  name: string;
  price: string;
  features: string[];
  description: string;
  detailedDescription: string;
  icon: JSX.Element;
  color: string;
}

const packages: Package[] = [
  {
    name: "SEO Pamati",
    price: "299",
    features: [
      "Atslēgvārdu izpēte (10 atslēgvārdi)",
      "On-page SEO optimizācija",
      "Meta tagu optimizācija",
      "Google My Business optimizācija",
      "Pamata analītika un atskaites",
      "1 mēneša atbalsts",
    ],
    description:
      "Ideāls sākums maziem uzņēmumiem, kas vēlas uzlabot savu redzamību meklētājprogrammās un piesaistīt vairāk apmeklētāju.",
    detailedDescription:
      "Mūsu SEO Pamatu pakete ir ideāls sākums jūsu uzņēmuma tiešsaistes redzamībai. Mēs sāksim ar rūpīgu 10 galveno atslēgvārdu izpēti, kas ir būtiski jūsu nozarei. Šie atslēgvārdi tiks stratēģiski integrēti jūsu vietnes saturā, izmantojot on-page SEO optimizācijas metodes. Mēs optimizēsim jūsu lapu meta tagus, ieskaitot virsrakstus un aprakstus, lai tie būtu pievilcīgi gan meklētājprogrammām, gan potenciālajiem klientiem. Ja jums ir fiziska uzņēmuma atrašanās vieta, mēs optimizēsim jūsu Google My Business profilu, lai uzlabotu jūsu lokālo SEO. Jūs saņemsiet pamata analītiku un atskaites, kas parādīs jūsu vietnes snieguma uzlabojumus. Visu mēnesi pēc optimizācijas mēs būsim pieejami, lai atbildētu uz jūsu jautājumiem un sniegtu atbalstu.",
    icon: <FiSearch />,
    color: "#4CAF50",
  },
  {
    name: "SEO Pro",
    price: "599",
    features: [
      "Padziļināta atslēgvārdu izpēte (25 atslēgvārdi)",
      "Visaptveroša on-page un off-page SEO",
      "Satura optimizācija un radīšana",
      "Tehniskā SEO audits un uzlabojumi",
      "Lokālā SEO stratēģija",
      "Konkurentu analīze",
      "Mēneša analītika un detalizētas atskaites",
      "3 mēnešu atbalsts",
    ],
    description:
      "Pilnvērtīgs SEO risinājums vidējiem uzņēmumiem, kas vēlas būtiski uzlabot savu tiešsaistes klātbūtni un pārspēt konkurentus.",
    detailedDescription:
      "SEO Pro pakete ir visaptverošs risinājums uzņēmumiem, kas nopietni vēlas uzlabot savu tiešsaistes redzamību. Mēs sāksim ar padziļinātu 25 atslēgvārdu izpēti, kas ietvers gan populārus, gan nišas atslēgvārdus jūsu nozarē. Veicot visaptverošu on-page un off-page SEO, mēs ne tikai optimizēsim jūsu vietnes saturu, bet arī strādāsim pie ārējo saišu veidošanas stratēģijas. Mūsu komanda radīs jaunu, SEO optimizētu saturu, kas piesaistīs gan meklētājprogrammas, gan lietotājus. Veicot tehnisko SEO auditu, mēs identificēsim un novērsīsim jebkādas tehniskas problēmas, kas varētu kavēt jūsu vietnes sniegumu. Ja jums ir fiziska atrašanās vieta, mēs izstrādāsim pielāgotu lokālā SEO stratēģiju. Konkurentu analīze palīdzēs mums identificēt iespējas un trūkumus jūsu nozarē. Jūs saņemsiet detalizētas ikmēneša atskaites par jūsu SEO progresu, un mūsu komanda būs pieejama 3 mēnešus, lai sniegtu atbalstu un atbildētu uz jautājumiem.",
    icon: <FiTrendingUp />,
    color: "#2196F3",
  },
  {
    name: "SEO Enterprise",
    price: "1299",
    features: [
      "Visaptveroša atslēgvārdu stratēģija (50+ atslēgvārdi)",
      "Pielāgota SEO stratēģija",
      "Regulāra satura radīšana un optimizācija",
      "Padziļināta tehniskā SEO optimizācija",
      "Backlink veidošanas kampaņa",
      "E-commerce SEO (ja piemērojams)",
      "Starptautiskā SEO stratēģija",
      "Konkurences izlūkošana",
      "Detalizēta analītika un ROI atskaites",
      "Prioritārs 6 mēnešu atbalsts",
    ],
    description:
      "Premium SEO pakalpojums lieliem uzņēmumiem un e-komercijas vietnēm, kas vēlas dominēt savā nozarē un sasniegt globālu auditoriju.",
    detailedDescription:
      "SEO Enterprise pakete ir mūsu visaptverošākais SEO risinājums, kas paredzēts uzņēmumiem ar augstām ambīcijām tiešsaistē. Mēs sāksim ar visaptverošu atslēgvārdu stratēģiju, kas ietvers vairāk nekā 50 rūpīgi izvēlētus atslēgvārdus, aptverot visus jūsu produktus, pakalpojumus un nozares nianses. Jūsu uzņēmumam tiks izstrādāta pilnībā pielāgota SEO stratēģija, ņemot vērā jūsu specifiskos mērķus un tirgus pozīciju. Mūsu komanda regulāri radīs un optimizēs augstas kvalitātes saturu, kas ne tikai uzlabos jūsu ranžējumu, bet arī nostiprinās jūsu kā nozares līdera pozīciju. Padziļināta tehniskā SEO optimizācija nodrošinās, ka jūsu vietne darbojas nevainojami un ir pilnībā meklētājprogrammu draudzīga. Mēs īstenosim agresīvu backlink veidošanas kampaņu, lai stiprinātu jūsu vietnes autoritāti. E-komercijas uzņēmumiem mēs piedāvāsim specializētu e-komercijas SEO, optimizējot produktu lapas un uzlabojot konversijas. Ja jūsu mērķi ir starptautiski, mēs izstrādāsim pielāgotu starptautisko SEO stratēģiju. Regulāra konkurences izlūkošana palīdzēs mums identificēt jaunas iespējas un saglabāt jūsu konkurences priekšrocības. Jūs saņemsiet detalizētas analītikas un ROI atskaites, kas parādīs jūsu investīciju atdevi. Mūsu ekspertu komanda būs jūsu rīcībā 6 mēnešus ar prioritāru atbalstu, lai nodrošinātu nepārtrauktu SEO panākumu gūšanu.",
    icon: <FiBarChart2 />,
    color: "#9C27B0",
  },
];

function adjustColor(color: string, amount: number): string {
  return (
    "#" +
    color
      .replace(/^#/, "")
      .replace(/../g, (color) =>
        (
          "0" +
          Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).substr(-2)
      )
  );
}

const SEOOptimizacija: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const openModal = (pkg: Package | "contact"): void => {
    if (pkg === "contact") {
      setSelectedPackage(null);
    } else {
      setSelectedPackage(pkg);
    }
    setShowModal(true);
  };

  const closeModal = (): void => {
    setShowModal(false);
  };

  const PackageCard: React.FC<{ pkg: Package }> = ({ pkg }) => (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="p-6 text-white relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${pkg.color} 0%, ${adjustColor(
            pkg.color,
            -30
          )} 100%)`,
        }}
      >
        <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-white bg-opacity-20 rounded-full p-8 transform rotate-12">
          <motion.div
            className="text-5xl"
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ duration: 0.5 }}
          >
            {pkg.icon}
          </motion.div>
        </div>
        <h3 className="text-2xl font-bold mb-2 relative z-10">{pkg.name}</h3>
        <p className="text-4xl font-extrabold mb-1 relative z-10">
          €{pkg.price}
        </p>
      </div>
      <div className="p-6 flex-grow">
        <p className="text-gray-700 mb-4">{pkg.description}</p>
        <ul className="mb-6" aria-label={`${pkg.name} features`}>
          {pkg.features.map((feature, i) => (
            <li key={i} className="flex items-center mb-2">
              <FiCheckCircle
                className="text-[#EEC71B] mr-2 flex-shrink-0"
                aria-hidden="true"
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6 pt-0">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-[#EEC71B] text-[#3D3B4A] px-6 py-3 rounded-full font-bold mt-auto hover:bg-[#ffd700] transition-colors duration-300 flex items-center justify-center"
          onClick={() => openModal(pkg)}
        >
          Uzzināt Vairāk
          <FiArrowRight className="ml-2" />
        </motion.button>
      </div>
    </motion.div>
  );

  const FeatureCard: React.FC<{
    icon: JSX.Element;
    title: string;
    description: string;
  }> = ({ icon, title, description }) => (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300"
      whileHover={{ y: -5 }}
    >
      <div
        className="text-4xl text-[#EEC71B] mb-4 flex justify-center"
        aria-hidden="true"
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </motion.div>
  );

  return (
    <>
      <Head>
        <title>
          SEO Optimizācija Latvijā | WebWorks - Jūsu Digitālais Partneris
        </title>
        <meta
          name="description"
          content="WebWorks piedāvā profesionālu SEO optimizāciju Latvijā. Uzlabojiet sava uzņēmuma redzamību meklētājprogrammās, palieliniet apmeklētāju skaitu un gūstiet vairāk konversiju ar mūsu SEO pakalpojumiem."
        />
        <meta
          name="keywords"
          content="SEO optimizācija, meklētājprogrammu optimizācija, atslēgvārdu izpēte, on-page SEO, off-page SEO, lokālā SEO, tehniskā SEO, satura optimizācija, Latvija"
        />
        <link rel="canonical" href="https://www.webworks.lv/seo-optimizacija" />
        <meta
          property="og:title"
          content="SEO Optimizācija Latvijā | WebWorks"
        />
        <meta
          property="og:description"
          content="Profesionāla SEO optimizācija Latvijā. Uzlabojiet sava uzņēmuma redzamību meklētājprogrammās un palieliniet apmeklētāju skaitu."
        />
        <meta
          property="og:image"
          content="https://www.webworks.lv/images/seo-optimizacija-og.jpg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="SEO Optimizācija Latvijā | WebWorks"
        />
        <meta
          name="twitter:description"
          content="Profesionāla SEO optimizācija Latvijā. Uzlabojiet sava uzņēmuma redzamību meklētājprogrammās un palieliniet apmeklētāju skaitu."
        />
        <meta
          name="twitter:image"
          content="https://www.webworks.lv/images/seo-optimizacija-og.jpg"
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-[#F3F5F4] to-white">
        <Header />

        <main className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-[#3D3B4A] mb-8">
            SEO Optimizācija, kas Transformē Jūsu Biznesu
          </h1>

          <p className="text-xl text-center text-gray-700 mb-12 max-w-3xl mx-auto">
            Atklājiet sava uzņēmuma potenciālu ar mūsu ekspertu SEO
            pakalpojumiem. Mēs palīdzēsim jums sasniegt augstākas pozīcijas
            meklētājprogrammās, piesaistīt vairāk apmeklētāju un palielināt
            konversijas.
          </p>

          <section aria-labelledby="packages" className="mb-16">
            <h2
              id="packages"
              className="text-3xl font-bold text-[#3D3B4A] mb-8 text-center"
            >
              Mūsu SEO Optimizācijas Pakalpojumi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <PackageCard key={index} pkg={pkg} />
              ))}
            </div>
          </section>

          <section aria-labelledby="why-seo" className="mb-16">
            <h2
              id="why-seo"
              className="text-3xl font-bold text-[#3D3B4A] mb-8 text-center"
            >
              Kāpēc SEO ir Svarīgs Jūsu Biznesam?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<FiTrendingUp />}
                title="Palielināta Redzamība"
                description="SEO palīdz jūsu vietnei parādīties augstākās pozīcijās meklēšanas rezultātos, palielinot jūsu zīmola redzamību un atpazīstamību."
              />
              <FeatureCard
                icon={<FiTarget />}
                title="Mērķtiecīga Auditorija"
                description="Piesaistiet apmeklētājus, kuri aktīvi meklē jūsu produktus vai pakalpojumus, uzlabojot konversijas iespējas."
              />
              <FeatureCard
                icon={<FiAward />}
                title="Uzticamība un Autoritāte"
                description="Augstākas pozīcijas meklētājprogrammās veicina uzticamību un nostiprina jūsu kā nozares eksperta statusu."
              />
              <FeatureCard
                icon={<FiGlobe />}
                title="Globāla Sasniedzamība"
                description="SEO ļauj jums sasniegt plašāku auditoriju, pārvarot ģeogrāfiskos ierobežojumus un paplašinot jūsu tirgus daļu."
              />
              <FeatureCard
                icon={<FiSettings />}
                title="Izmērāmi Rezultāti"
                description="SEO sniedz detalizētus datus un analītiku, ļaujot jums precīzi izmērīt un optimizēt savas digitālās mārketinga aktivitātes."
              />
              <FeatureCard
                icon={<FiAlertCircle />}
                title="Konkurences Priekšrocība"
                description="Efektīva SEO stratēģija palīdz jums izcelties pārpildītā tirgū un iegūt priekšrocības pār konkurentiem."
              />
            </div>
          </section>

          <section
            aria-labelledby="our-process"
            className="mb-16 bg-white p-8 rounded-lg shadow-lg"
          >
            <h2
              id="our-process"
              className="text-3xl font-bold text-[#3D3B4A] mb-8 text-center"
            >
              Mūsu SEO Optimizācijas Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <span className="bg-[#EEC71B] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                    1
                  </span>
                  Audits un Analīze
                </h3>
                <p>
                  Mēs sākam ar rūpīgu jūsu vietnes un esošās SEO stratēģijas
                  auditu, identificējot stiprās puses un uzlabojamās jomas.
                </p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <span className="bg-[#EEC71B] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                    2
                  </span>
                  Atslēgvārdu Izpēte
                </h3>
                <p>
                  Mēs veicam padziļinātu atslēgvārdu izpēti, identificējot
                  vērtīgākos un releventākos atslēgvārdus jūsu biznesam.
                </p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <span className="bg-[#EEC71B] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                    3
                  </span>
                  On-Page Optimizācija
                </h3>
                <p>
                  Mēs optimizējam jūsu vietnes saturu, meta tagus, URL struktūru
                  un citus on-page elementus, lai uzlabotu ranžēšanu.
                </p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <span className="bg-[#EEC71B] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                    4
                  </span>
                  Tehniskā SEO
                </h3>
                <p>
                  Mēs uzlabojam jūsu vietnes tehniskos aspektus, ieskaitot
                  ielādes ātrumu, mobilo optimizāciju un vietnes struktūru.
                </p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <span className="bg-[#EEC71B] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                    5
                  </span>
                  Satura Stratēģija
                </h3>
                <p>
                  Mēs izstrādājam un ieviešam visaptverošu satura stratēģiju,
                  radot vērtīgu un SEO optimizētu saturu.
                </p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <span className="bg-[#EEC71B] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                    6
                  </span>
                  Monitorings un Optimizācija
                </h3>
                <p>
                  Mēs nepārtraukti uzraugām jūsu SEO sniegumu, analizējam
                  rezultātus un veicam nepieciešamās korekcijas, lai nodrošinātu
                  pastāvīgu izaugsmi.
                </p>
              </div>
            </div>
          </section>

          <section
            aria-labelledby="cta"
            className="mb-16 bg-[#3D3B4A] text-white p-8 rounded-lg"
          >
            <h2 id="cta" className="text-3xl font-bold mb-8 text-center">
              Gatavs Uzlabot Savu Tiešsaistes Redzamību?
            </h2>
            <p className="text-xl mb-8 text-center">
              Ļaujiet mums palīdzēt jums sasniegt jaunus augstumus
              meklētājprogrammās un pārvērst jūsu digitālo klātbūtni par spēcīgu
              biznesa instrumentu.
            </p>
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#EEC71B] text-[#3D3B4A] px-8 py-3 rounded-full font-bold text-lg flex items-center"
                onClick={() => openModal("contact")}
              >
                Sazināties ar Mums
                <FiArrowRight className="ml-2" />
              </motion.button>
            </div>
          </section>

          <AnimatePresence>
            {showModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                onClick={closeModal}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-lg p-8 max-w-md w-full relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  {selectedPackage === null ? (
                    <>
                      <h3 className="text-2xl font-bold mb-4">
                        Sazināties ar Mums
                      </h3>
                      <p className="mb-4">
                        Aizpildiet formu zemāk, un mūsu SEO eksperts sazināsies
                        ar jums 24 stundu laikā, lai apspriestu jūsu projektu.
                      </p>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          // Handle form submission here
                          console.log("Form submitted");
                          closeModal();
                        }}
                      >
                        <div className="mb-4">
                          <label className="block mb-2" htmlFor="name">
                            Vārds
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full p-2 border rounded"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2" htmlFor="email">
                            E-pasts
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full p-2 border rounded"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2" htmlFor="website">
                            Jūsu Vietnes URL
                          </label>
                          <input
                            type="url"
                            id="website"
                            name="website"
                            className="w-full p-2 border rounded"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2" htmlFor="message">
                            Jūsu ziņojums
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            className="w-full p-2 border rounded"
                            rows={4}
                            required
                          ></textarea>
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="bg-[#EEC71B] text-[#3D3B4A] px-6 py-2 rounded-full font-bold flex items-center"
                          >
                            Nosūtīt
                            <FiArrowRight className="ml-2" />
                          </button>
                        </div>
                      </form>
                    </>
                  ) : (
                    <>
                      <h3 className="text-2xl font-bold mb-4">
                        {selectedPackage.name}
                      </h3>
                      <p className="text-3xl font-bold text-[#EEC71B] mb-4">
                        €{selectedPackage.price}
                      </p>
                      <p className="mb-4">
                        {selectedPackage.detailedDescription}
                      </p>
                      <h4 className="font-bold mb-2">Iekļautie pakalpojumi:</h4>
                      <ul className="mb-6">
                        {selectedPackage.features.map((feature, index) => (
                          <li key={index} className="flex items-center mb-2">
                            <FiCheckCircle
                              className="text-[#EEC71B] mr-2"
                              aria-hidden="true"
                            />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex justify-end">
                        <button
                          className="bg-[#EEC71B] text-[#3D3B4A] px-6 py-2 rounded-full font-bold flex items-center"
                          onClick={() => openModal("contact")}
                        >
                          Pieteikties
                          <FiArrowRight className="ml-2" />
                        </button>
                      </div>
                    </>
                  )}
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={closeModal}
                    aria-label="Close modal"
                  >
                    <FiX size={24} />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <Footer />

        <JsonLd packages={packages} />
      </div>
    </>
  );
};

const JsonLd: React.FC<{ packages: Package[] }> = ({ packages }) => (
  <Script id="json-ld" type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "SEO Optimizācija Latvijā | WebWorks",
      description:
        "WebWorks piedāvā profesionālu SEO optimizāciju Latvijā. Uzlabojiet sava uzņēmuma redzamību meklētājprogrammās, palieliniet apmeklētāju skaitu un gūstiet vairāk konversiju ar mūsu SEO pakalpojumiem.",
      url: "https://www.webworks.lv/seo-optimizacija",
      mainEntity: {
        "@type": "Service",
        name: "WebWorks SEO Optimizācijas Pakalpojumi",
        description:
          "Profesionāli SEO optimizācijas pakalpojumi, kas palīdz uzņēmumiem uzlabot savu redzamību meklētājprogrammās un piesaistīt vairāk klientu.",
        provider: {
          "@type": "Organization",
          name: "WebWorks",
        },
        areaServed: "Latvija",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "SEO Optimizācijas Pakalpojumi",
          itemListElement: packages.map((pkg) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: pkg.name,
              description: pkg.description,
            },
            price: pkg.price,
            priceCurrency: "EUR",
          })),
        },
      },
    })}
  </Script>
);

export default SEOOptimizacija;

// "use client";

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Script from "next/script";
// import {
//   FiSearch,
//   FiTrendingUp,
//   FiBarChart2,
//   FiCheckCircle,
//   FiAward,
//   FiGlobe,
//   FiSettings,
//   FiTarget,
//   FiAlertCircle,
//   FiX,
//   FiArrowRight,
// } from "react-icons/fi";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import type { Metadata } from "next";

// interface Package {
//   name: string;
//   price: string;
//   features: string[];
//   description: string;
//   detailedDescription: string;
//   icon: JSX.Element;
//   color: string;
// }

// const packages: Package[] = [
//   {
//     name: "SEO Pamati",
//     price: "299",
//     features: [
//       "Atslēgvārdu izpēte (10 atslēgvārdi)",
//       "On-page SEO optimizācija",
//       "Meta tagu optimizācija",
//       "Google My Business optimizācija",
//       "Pamata analītika un atskaites",
//       "1 mēneša atbalsts",
//     ],
//     description:
//       "Ideāls sākums maziem uzņēmumiem, kas vēlas uzlabot savu redzamību meklētājprogrammās un piesaistīt vairāk apmeklētāju.",
//     detailedDescription:
//       "Mūsu SEO Pamatu pakete ir ideāls sākums jūsu uzņēmuma tiešsaistes redzamībai. Mēs sāksim ar rūpīgu 10 galveno atslēgvārdu izpēti, kas ir būtiski jūsu nozarei. Šie atslēgvārdi tiks stratēģiski integrēti jūsu vietnes saturā, izmantojot on-page SEO optimizācijas metodes. Mēs optimizēsim jūsu lapu meta tagus, ieskaitot virsrakstus un aprakstus, lai tie būtu pievilcīgi gan meklētājprogrammām, gan potenciālajiem klientiem. Ja jums ir fiziska uzņēmuma atrašanās vieta, mēs optimizēsim jūsu Google My Business profilu, lai uzlabotu jūsu lokālo SEO. Jūs saņemsiet pamata analītiku un atskaites, kas parādīs jūsu vietnes snieguma uzlabojumus. Visu mēnesi pēc optimizācijas mēs būsim pieejami, lai atbildētu uz jūsu jautājumiem un sniegtu atbalstu.",
//     icon: <FiSearch />,
//     color: "#4CAF50",
//   },
//   {
//     name: "SEO Pro",
//     price: "599",
//     features: [
//       "Padziļināta atslēgvārdu izpēte (25 atslēgvārdi)",
//       "Visaptveroša on-page un off-page SEO",
//       "Satura optimizācija un radīšana",
//       "Tehniskā SEO audits un uzlabojumi",
//       "Lokālā SEO stratēģija",
//       "Konkurentu analīze",
//       "Mēneša analītika un detalizētas atskaites",
//       "3 mēnešu atbalsts",
//     ],
//     description:
//       "Pilnvērtīgs SEO risinājums vidējiem uzņēmumiem, kas vēlas būtiski uzlabot savu tiešsaistes klātbūtni un pārspēt konkurentus.",
//     detailedDescription:
//       "SEO Pro pakete ir visaptverošs risinājums uzņēmumiem, kas nopietni vēlas uzlabot savu tiešsaistes redzamību. Mēs sāksim ar padziļinātu 25 atslēgvārdu izpēti, kas ietvers gan populārus, gan nišas atslēgvārdus jūsu nozarē. Veicot visaptverošu on-page un off-page SEO, mēs ne tikai optimizēsim jūsu vietnes saturu, bet arī strādāsim pie ārējo saišu veidošanas stratēģijas. Mūsu komanda radīs jaunu, SEO optimizētu saturu, kas piesaistīs gan meklētājprogrammas, gan lietotājus. Veicot tehnisko SEO auditu, mēs identificēsim un novērsīsim jebkādas tehniskas problēmas, kas varētu kavēt jūsu vietnes sniegumu. Ja jums ir fiziska atrašanās vieta, mēs izstrādāsim pielāgotu lokālā SEO stratēģiju. Konkurentu analīze palīdzēs mums identificēt iespējas un trūkumus jūsu nozarē. Jūs saņemsiet detalizētas ikmēneša atskaites par jūsu SEO progresu, un mūsu komanda būs pieejama 3 mēnešus, lai sniegtu atbalstu un atbildētu uz jautājumiem.",
//     icon: <FiTrendingUp />,
//     color: "#2196F3",
//   },
//   {
//     name: "SEO Enterprise",
//     price: "1299",
//     features: [
//       "Visaptveroša atslēgvārdu stratēģija (50+ atslēgvārdi)",
//       "Pielāgota SEO stratēģija",
//       "Regulāra satura radīšana un optimizācija",
//       "Padziļināta tehniskā SEO optimizācija",
//       "Backlink veidošanas kampaņa",
//       "E-commerce SEO (ja piemērojams)",
//       "Starptautiskā SEO stratēģija",
//       "Konkurences izlūkošana",
//       "Detalizēta analītika un ROI atskaites",
//       "Prioritārs 6 mēnešu atbalsts",
//     ],
//     description:
//       "Premium SEO pakalpojums lieliem uzņēmumiem un e-komercijas vietnēm, kas vēlas dominēt savā nozarē un sasniegt globālu auditoriju.",
//     detailedDescription:
//       "SEO Enterprise pakete ir mūsu visaptverošākais SEO risinājums, kas paredzēts uzņēmumiem ar augstām ambīcijām tiešsaistē. Mēs sāksim ar visaptverošu atslēgvārdu stratēģiju, kas ietvers vairāk nekā 50 rūpīgi izvēlētus atslēgvārdus, aptverot visus jūsu produktus, pakalpojumus un nozares nianses. Jūsu uzņēmumam tiks izstrādāta pilnībā pielāgota SEO stratēģija, ņemot vērā jūsu specifiskos mērķus un tirgus pozīciju. Mūsu komanda regulāri radīs un optimizēs augstas kvalitātes saturu, kas ne tikai uzlabos jūsu ranžējumu, bet arī nostiprinās jūsu kā nozares līdera pozīciju. Padziļināta tehniskā SEO optimizācija nodrošinās, ka jūsu vietne darbojas nevainojami un ir pilnībā meklētājprogrammu draudzīga. Mēs īstenosim agresīvu backlink veidošanas kampaņu, lai stiprinātu jūsu vietnes autoritāti. E-komercijas uzņēmumiem mēs piedāvāsim specializētu e-komercijas SEO, optimizējot produktu lapas un uzlabojot konversijas. Ja jūsu mērķi ir starptautiski, mēs izstrādāsim pielāgotu starptautisko SEO stratēģiju. Regulāra konkurences izlūkošana palīdzēs mums identificēt jaunas iespējas un saglabāt jūsu konkurences priekšrocības. Jūs saņemsiet detalizētas analītikas un ROI atskaites, kas parādīs jūsu investīciju atdevi. Mūsu ekspertu komanda būs jūsu rīcībā 6 mēnešus ar prioritāru atbalstu, lai nodrošinātu nepārtrauktu SEO panākumu gūšanu.",
//     icon: <FiBarChart2 />,
//     color: "#9C27B0",
//   },
// ];

// function adjustColor(color: string, amount: number): string {
//   return (
//     "#" +
//     color
//       .replace(/^#/, "")
//       .replace(/../g, (color) =>
//         (
//           "0" +
//           Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
//         ).substr(-2)
//       )
//   );
// }

// const SEOOptimizacija: React.FC = () => {
//   const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
//   const [showModal, setShowModal] = useState<boolean>(false);

//   const openModal = (pkg: Package | "contact"): void => {
//     if (pkg === "contact") {
//       setSelectedPackage(null);
//     } else {
//       setSelectedPackage(pkg);
//     }
//     setShowModal(true);
//   };

//   const closeModal = (): void => {
//     setShowModal(false);
//   };

//   const PackageCard: React.FC<{ pkg: Package }> = ({ pkg }) => (
//     <motion.div
//       className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col"
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div
//         className="p-6 text-white relative overflow-hidden"
//         style={{
//           background: `linear-gradient(135deg, ${pkg.color} 0%, ${adjustColor(
//             pkg.color,
//             -30
//           )} 100%)`,
//         }}
//       >
//         <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-white bg-opacity-20 rounded-full p-8 transform rotate-12">
//           <motion.div
//             className="text-5xl"
//             whileHover={{ rotate: 360, scale: 1.2 }}
//             transition={{ duration: 0.5 }}
//           >
//             {pkg.icon}
//           </motion.div>
//         </div>
//         <h3 className="text-2xl font-bold mb-2 relative z-10">{pkg.name}</h3>
//         <p className="text-4xl font-extrabold mb-1 relative z-10">
//           €{pkg.price}
//         </p>
//       </div>
//       <div className="p-6 flex-grow">
//         <p className="text-gray-700 mb-4">{pkg.description}</p>
//         <ul className="mb-6" aria-label={`${pkg.name} features`}>
//           {pkg.features.map((feature, i) => (
//             <li key={i} className="flex items-center mb-2">
//               <FiCheckCircle
//                 className="text-[#EEC71B] mr-2 flex-shrink-0"
//                 aria-hidden="true"
//               />
//               <span>{feature}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="p-6 pt-0">
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="w-full bg-[#EEC71B] text-[#3D3B4A] px-6 py-3 rounded-full font-bold mt-auto hover:bg-[#ffd700] transition-colors duration-300 flex items-center justify-center"
//           onClick={() => openModal(pkg)}
//         >
//           Uzzināt Vairāk
//           <FiArrowRight className="ml-2" />
//         </motion.button>
//       </div>
//     </motion.div>
//   );

//   const FeatureCard: React.FC<{
//     icon: JSX.Element;
//     title: string;
//     description: string;
//   }> = ({ icon, title, description }) => (
//     <motion.div
//       className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300"
//       whileHover={{ y: -5 }}
//     >
//       <div
//         className="text-4xl text-[#EEC71B] mb-4 flex justify-center"
//         aria-hidden="true"
//       >
//         {icon}
//       </div>
//       <h3 className="text-xl font-bold mb-2">{title}</h3>
//       <p className="text-gray-700">{description}</p>
//     </motion.div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#F3F5F4] to-white">
//       <Header />

//       <main className="container mx-auto px-4 py-16">
//         <h1 className="text-4xl md:text-5xl font-bold text-center text-[#3D3B4A] mb-8">
//           SEO Optimizācija, kas Transformē Jūsu Biznesu
//         </h1>

//         <p className="text-xl text-center text-gray-700 mb-12 max-w-3xl mx-auto">
//           Atklājiet sava uzņēmuma potenciālu ar mūsu ekspertu SEO pakalpojumiem.
//           Mēs palīdzēsim jums sasniegt augstākas pozīcijas meklētājprogrammās,
//           piesaistīt vairāk apmeklētāju un palielināt konversijas.
//         </p>

//         <section aria-labelledby="packages" className="mb-16">
//           <h2
//             id="packages"
//             className="text-3xl font-bold text-[#3D3B4A] mb-8 text-center"
//           >
//             Mūsu SEO Optimizācijas Pakalpojumi
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {packages.map((pkg, index) => (
//               <PackageCard key={index} pkg={pkg} />
//             ))}
//           </div>
//         </section>

//         <section aria-labelledby="why-seo" className="mb-16">
//           <h2
//             id="why-seo"
//             className="text-3xl font-bold text-[#3D3B4A] mb-8 text-center"
//           >
//             Kāpēc SEO ir Svarīgs Jūsu Biznesam?
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             <FeatureCard
//               icon={<FiTrendingUp />}
//               title="Palielināta Redzamība"
//               description="SEO palīdz jūsu vietnei parādīties augstākās pozīcijās meklēšanas rezultātos, palielinot jūsu zīmola redzamību un atpazīstamību."
//             />
//             <FeatureCard
//               icon={<FiTarget />}
//               title="Mērķtiecīga Auditorija"
//               description="Piesaistiet apmeklētājus, kuri aktīvi meklē jūsu produktus vai pakalpojumus, uzlabojot konversijas iespējas."
//             />
//             <FeatureCard
//               icon={<FiAward />}
//               title="Uzticamība un Autoritāte"
//               description="Augstākas pozīcijas meklētājprogrammās veicina uzticamību un nostiprina jūsu kā nozares eksperta statusu."
//             />
//             <FeatureCard
//               icon={<FiGlobe />}
//               title="Globāla Sasniedzamība"
//               description="SEO ļauj jums sasniegt plašāku auditoriju, pārvarot ģeogrāfiskos ierobežojumus un paplašinot jūsu tirgus daļu."
//             />
//             <FeatureCard
//               icon={<FiSettings />}
//               title="Izmērāmi Rezultāti"
//               description="SEO sniedz detalizētus datus un analītiku, ļaujot jums precīzi izmērīt un optimizēt savas digitālās mārketinga aktivitātes."
//             />
//             <FeatureCard
//               icon={<FiAlertCircle />}
//               title="Konkurences Priekšrocība"
//               description="Efektīva SEO stratēģija palīdz jums izcelties pārpildītā tirgū un iegūt priekšrocības pār konkurentiem."
//             />
//           </div>
//         </section>

//         <section
//           aria-labelledby="our-process"
//           className="mb-16 bg-white p-8 rounded-lg shadow-lg"
//         >
//           <h2
//             id="our-process"
//             className="text-3xl font-bold text-[#3D3B4A] mb-8 text-center"
//           >
//             Mūsu SEO Optimizācijas Process
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             <div className="bg-gray-100 p-6 rounded-lg">
//               <h3 className="font-bold text-lg mb-4 flex items-center">
//                 <span className="bg-[#EEC71B] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
//                   1
//                 </span>
//                 Audits un Analīze
//               </h3>
//               <p>
//                 Mēs sākam ar rūpīgu jūsu vietnes un esošās SEO stratēģijas
//                 auditu, identificējot stiprās puses un uzlabojamās jomas.
//               </p>
//             </div>
//             <div className="bg-gray-100 p-6 rounded-lg">
//               <h3 className="font-bold text-lg mb-4 flex items-center">
//                 <span className="bg-[#EEC71B] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
//                   2
//                 </span>
//                 Atslēgvārdu Izpēte
//               </h3>
//               <p>
//                 Mēs veicam padziļinātu atslēgvārdu izpēti, identificējot
//                 vērtīgākos un releventākos atslēgvārdus jūsu biznesam.
//               </p>
//             </div>
//             <div className="bg-gray-100 p-6 rounded-lg">
//               <h3 className="font-bold text-lg mb-4 flex items-center">
//                 <span className="bg-[#EEC71B] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
//                   3
//                 </span>
//                 On-Page Optimizācija
//               </h3>
//               <p>
//                 Mēs optimizējam jūsu vietnes saturu, meta tagus, URL struktūru
//                 un citus on-page elementus, lai uzlabotu ranžēšanu.
//               </p>
//             </div>
//             <div className="bg-gray-100 p-6 rounded-lg">
//               <h3 className="font-bold text-lg mb-4 flex items-center">
//                 <span className="bg-[#EEC71B] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
//                   4
//                 </span>
//                 Tehniskā SEO
//               </h3>
//               <p>
//                 Mēs uzlabojam jūsu vietnes tehniskos aspektus, ieskaitot ielādes
//                 ātrumu, mobilo optimizāciju un vietnes struktūru.
//               </p>
//             </div>
//             <div className="bg-gray-100 p-6 rounded-lg">
//               <h3 className="font-bold text-lg mb-4 flex items-center">
//                 <span className="bg-[#EEC71B] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
//                   5
//                 </span>
//                 Satura Stratēģija
//               </h3>
//               <p>
//                 Mēs izstrādājam un ieviešam visaptverošu satura stratēģiju,
//                 radot vērtīgu un SEO optimizētu saturu.
//               </p>
//             </div>
//             <div className="bg-gray-100 p-6 rounded-lg">
//               <h3 className="font-bold text-lg mb-4 flex items-center">
//                 <span className="bg-[#EEC71B] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
//                   6
//                 </span>
//                 Monitorings un Optimizācija
//               </h3>
//               <p>
//                 Mēs nepārtraukti uzraugām jūsu SEO sniegumu, analizējam
//                 rezultātus un veicam nepieciešamās korekcijas, lai nodrošinātu
//                 pastāvīgu izaugsmi.
//               </p>
//             </div>
//           </div>
//         </section>

//         <section
//           aria-labelledby="cta"
//           className="mb-16 bg-[#3D3B4A] text-white p-8 rounded-lg"
//         >
//           <h2 id="cta" className="text-3xl font-bold mb-8 text-center">
//             Gatavs Uzlabot Savu Tiešsaistes Redzamību?
//           </h2>
//           <p className="text-xl mb-8 text-center">
//             Ļaujiet mums palīdzēt jums sasniegt jaunus augstumus
//             meklētājprogrammās un pārvērst jūsu digitālo klātbūtni par spēcīgu
//             biznesa instrumentu.
//           </p>
//           <div className="flex justify-center">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-[#EEC71B] text-[#3D3B4A] px-8 py-3 rounded-full font-bold text-lg flex items-center"
//               onClick={() => openModal("contact")}
//             >
//               Sazināties ar Mums
//               <FiArrowRight className="ml-2" />
//             </motion.button>
//           </div>
//         </section>

//         <AnimatePresence>
//           {showModal && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//               onClick={closeModal}
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 className="bg-white rounded-lg p-8 max-w-md w-full relative"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 {selectedPackage === null ? (
//                   <>
//                     <h3 className="text-2xl font-bold mb-4">
//                       Sazināties ar Mums
//                     </h3>
//                     <p className="mb-4">
//                       Aizpildiet formu zemāk, un mūsu SEO eksperts sazināsies ar
//                       jums 24 stundu laikā, lai apspriestu jūsu projektu.
//                     </p>
//                     <form
//                       onSubmit={(e) => {
//                         e.preventDefault();
//                         // Handle form submission here
//                         console.log("Form submitted");
//                         closeModal();
//                       }}
//                     >
//                       <div className="mb-4">
//                         <label className="block mb-2" htmlFor="name">
//                           Vārds
//                         </label>
//                         <input
//                           type="text"
//                           id="name"
//                           name="name"
//                           className="w-full p-2 border rounded"
//                           required
//                         />
//                       </div>
//                       <div className="mb-4">
//                         <label className="block mb-2" htmlFor="email">
//                           E-pasts
//                         </label>
//                         <input
//                           type="email"
//                           id="email"
//                           name="email"
//                           className="w-full p-2 border rounded"
//                           required
//                         />
//                       </div>
//                       <div className="mb-4">
//                         <label className="block mb-2" htmlFor="website">
//                           Jūsu Vietnes URL
//                         </label>
//                         <input
//                           type="url"
//                           id="website"
//                           name="website"
//                           className="w-full p-2 border rounded"
//                           required
//                         />
//                       </div>
//                       <div className="mb-4">
//                         <label className="block mb-2" htmlFor="message">
//                           Jūsu ziņojums
//                         </label>
//                         <textarea
//                           id="message"
//                           name="message"
//                           className="w-full p-2 border rounded"
//                           rows={4}
//                           required
//                         ></textarea>
//                       </div>
//                       <div className="flex justify-end">
//                         <button
//                           type="submit"
//                           className="bg-[#EEC71B] text-[#3D3B4A] px-6 py-2 rounded-full font-bold flex items-center"
//                         >
//                           Nosūtīt
//                           <FiArrowRight className="ml-2" />
//                         </button>
//                       </div>
//                     </form>
//                   </>
//                 ) : (
//                   <>
//                     <h3 className="text-2xl font-bold mb-4">
//                       {selectedPackage.name}
//                     </h3>
//                     <p className="text-3xl font-bold text-[#EEC71B] mb-4">
//                       €{selectedPackage.price}
//                     </p>
//                     <p className="mb-4">
//                       {selectedPackage.detailedDescription}
//                     </p>
//                     <h4 className="font-bold mb-2">Iekļautie pakalpojumi:</h4>
//                     <ul className="mb-6">
//                       {selectedPackage.features.map((feature, index) => (
//                         <li key={index} className="flex items-center mb-2">
//                           <FiCheckCircle
//                             className="text-[#EEC71B] mr-2"
//                             aria-hidden="true"
//                           />
//                           <span>{feature}</span>
//                         </li>
//                       ))}
//                     </ul>
//                     <div className="flex justify-end">
//                       <button
//                         className="bg-[#EEC71B] text-[#3D3B4A] px-6 py-2 rounded-full font-bold flex items-center"
//                         onClick={() => openModal("contact")}
//                       >
//                         Pieteikties
//                         <FiArrowRight className="ml-2" />
//                       </button>
//                     </div>
//                   </>
//                 )}
//                 <button
//                   className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//                   onClick={closeModal}
//                   aria-label="Close modal"
//                 >
//                   <FiX size={24} />
//                 </button>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </main>

//       <Footer />

//       <JsonLd packages={packages} />
//     </div>
//   );
// };

// const JsonLd: React.FC<{ packages: Package[] }> = ({ packages }) => (
//   <Script id="json-ld" type="application/ld+json">
//     {JSON.stringify({
//       "@context": "https://schema.org",
//       "@type": "WebPage",
//       name: "SEO Optimizācija Latvijā | WebWorks",
//       description:
//         "WebWorks piedāvā profesionālu SEO optimizāciju Latvijā. Uzlabojiet sava uzņēmuma redzamību meklētājprogrammās, palieliniet apmeklētāju skaitu un gūstiet vairāk konversiju ar mūsu SEO pakalpojumiem.",
//       url: "https://www.webworks.lv/seo-optimizacija",
//       mainEntity: {
//         "@type": "Service",
//         name: "WebWorks SEO Optimizācijas Pakalpojumi",
//         description:
//           "Profesionāli SEO optimizācijas pakalpojumi, kas palīdz uzņēmumiem uzlabot savu redzamību meklētājprogrammās un piesaistīt vairāk klientu.",
//         provider: {
//           "@type": "Organization",
//           name: "WebWorks",
//         },
//         areaServed: "Latvija",
//         hasOfferCatalog: {
//           "@type": "OfferCatalog",
//           name: "SEO Optimizācijas Pakalpojumi",
//           itemListElement: packages.map((pkg) => ({
//             "@type": "Offer",
//             itemOffered: {
//               "@type": "Service",
//               name: pkg.name,
//               description: pkg.description,
//             },
//             price: pkg.price,
//             priceCurrency: "EUR",
//           })),
//         },
//       },
//     })}
//   </Script>
// );

// export default SEOOptimizacija;

// "use client";
// import React, { useState } from "react";
// import Head from "next/head";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiSearch,
//   FiTrendingUp,
//   FiBarChart2,
//   FiCheckCircle,
//   FiAward,
//   FiGlobe,
//   FiSettings,
//   FiTarget,
//   FiAlertCircle,
//   FiX,
// } from "react-icons/fi";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// interface Package {
//   name: string;
//   price: string;
//   features: string[];
//   description: string;
//   detailedDescription: string;
//   icon: JSX.Element;
//   color: string;
// }

// const packages: Package[] = [
//   {
//     name: "SEO Pamati",
//     price: "299",
//     features: [
//       "Atslēgvārdu izpēte (10 atslēgvārdi)",
//       "On-page SEO optimizācija",
//       "Meta tagu optimizācija",
//       "Google My Business optimizācija",
//       "Pamata analītika un atskaites",
//       "1 mēneša atbalsts",
//     ],
//     description:
//       "Ideāls sākums maziem uzņēmumiem, kas vēlas uzlabot savu redzamību meklētājprogrammās un piesaistīt vairāk apmeklētāju.",
//     detailedDescription:
//       "Mūsu SEO Pamatu pakete ir ideāls sākums jūsu uzņēmuma tiešsaistes redzamībai. Mēs sāksim ar rūpīgu 10 galveno atslēgvārdu izpēti, kas ir būtiski jūsu nozarei. Šie atslēgvārdi tiks stratēģiski integrēti jūsu vietnes saturā, izmantojot on-page SEO optimizācijas metodes. Mēs optimizēsim jūsu lapu meta tagus, ieskaitot virsrakstus un aprakstus, lai tie būtu pievilcīgi gan meklētājprogrammām, gan potenciālajiem klientiem. Ja jums ir fiziska uzņēmuma atrašanās vieta, mēs optimizēsim jūsu Google My Business profilu, lai uzlabotu jūsu lokālo SEO. Jūs saņemsiet pamata analītiku un atskaites, kas parādīs jūsu vietnes snieguma uzlabojumus. Visu mēnesi pēc optimizācijas mēs būsim pieejami, lai atbildētu uz jūsu jautājumiem un sniegtu atbalstu.",
//     icon: <FiSearch />,
//     color: "#4CAF50",
//   },
//   {
//     name: "SEO Pro",
//     price: "599",
//     features: [
//       "Padziļināta atslēgvārdu izpēte (25 atslēgvārdi)",
//       "Visaptveroša on-page un off-page SEO",
//       "Satura optimizācija un radīšana",
//       "Tehniskā SEO audits un uzlabojumi",
//       "Lokālā SEO stratēģija",
//       "Konkurentu analīze",
//       "Mēneša analītika un detalizētas atskaites",
//       "3 mēnešu atbalsts",
//     ],
//     description:
//       "Pilnvērtīgs SEO risinājums vidējiem uzņēmumiem, kas vēlas būtiski uzlabot savu tiešsaistes klātbūtni un pārspēt konkurentus.",
//     detailedDescription:
//       "SEO Pro pakete ir visaptverošs risinājums uzņēmumiem, kas nopietni vēlas uzlabot savu tiešsaistes redzamību. Mēs sāksim ar padziļinātu 25 atslēgvārdu izpēti, kas ietvers gan populārus, gan nišas atslēgvārdus jūsu nozarē. Veicot visaptverošu on-page un off-page SEO, mēs ne tikai optimizēsim jūsu vietnes saturu, bet arī strādāsim pie ārējo saišu veidošanas stratēģijas. Mūsu komanda radīs jaunu, SEO optimizētu saturu, kas piesaistīs gan meklētājprogrammas, gan lietotājus. Veicot tehnisko SEO auditu, mēs identificēsim un novērsīsim jebkādas tehniskas problēmas, kas varētu kavēt jūsu vietnes sniegumu. Ja jums ir fiziska atrašanās vieta, mēs izstrādāsim pielāgotu lokālā SEO stratēģiju. Konkurentu analīze palīdzēs mums identificēt iespējas un trūkumus jūsu nozarē. Jūs saņemsiet detalizētas ikmēneša atskaites par jūsu SEO progresu, un mūsu komanda būs pieejama 3 mēnešus, lai sniegtu atbalstu un atbildētu uz jautājumiem.",
//     icon: <FiTrendingUp />,
//     color: "#2196F3",
//   },
//   {
//     name: "SEO Enterprise",
//     price: "1299",
//     features: [
//       "Visaptveroša atslēgvārdu stratēģija (50+ atslēgvārdi)",
//       "Pielāgota SEO stratēģija",
//       "Regulāra satura radīšana un optimizācija",
//       "Padziļināta tehniskā SEO optimizācija",
//       "Backlink veidošanas kampaņa",
//       "E-commerce SEO (ja piemērojams)",
//       "Starptautiskā SEO stratēģija",
//       "Konkurences izlūkošana",
//       "Detalizēta analītika un ROI atskaites",
//       "Prioritārs 6 mēnešu atbalsts",
//     ],
//     description:
//       "Premium SEO pakalpojums lieliem uzņēmumiem un e-komercijas vietnēm, kas vēlas dominēt savā nozarē un sasniegt globālu auditoriju.",
//     detailedDescription:
//       "SEO Enterprise pakete ir mūsu visaptverošākais SEO risinājums, kas paredzēts uzņēmumiem ar augstām ambīcijām tiešsaistē. Mēs sāksim ar visaptverošu atslēgvārdu stratēģiju, kas ietvers vairāk nekā 50 rūpīgi izvēlētus atslēgvārdus, aptverot visus jūsu produktus, pakalpojumus un nozares nianses. Jūsu uzņēmumam tiks izstrādāta pilnībā pielāgota SEO stratēģija, ņemot vērā jūsu specifiskos mērķus un tirgus pozīciju. Mūsu komanda regulāri radīs un optimizēs augstas kvalitātes saturu, kas ne tikai uzlabos jūsu ranžējumu, bet arī nostiprinās jūsu kā nozares līdera pozīciju. Padziļināta tehniskā SEO optimizācija nodrošinās, ka jūsu vietne darbojas nevainojami un ir pilnībā meklētājprogrammu draudzīga. Mēs īstenosim agresīvu backlink veidošanas kampaņu, lai stiprinātu jūsu vietnes autoritāti. E-komercijas uzņēmumiem mēs piedāvāsim specializētu e-komercijas SEO, optimizējot produktu lapas un uzlabojot konversijas. Ja jūsu mērķi ir starptautiski, mēs izstrādāsim pielāgotu starptautisko SEO stratēģiju. Regulāra konkurences izlūkošana palīdzēs mums identificēt jaunas iespējas un saglabāt jūsu konkurences priekšrocības. Jūs saņemsiet detalizētas analītikas un ROI atskaites, kas parādīs jūsu investīciju atdevi. Mūsu ekspertu komanda būs jūsu rīcībā 6 mēnešus ar prioritāru atbalstu, lai nodrošinātu nepārtrauktu SEO panākumu gūšanu.",
//     icon: <FiBarChart2 />,
//     color: "#9C27B0",
//   },
// ];

// function adjustColor(color: string, amount: number): string {
//   return (
//     "#" +
//     color
//       .replace(/^#/, "")
//       .replace(/../g, (color) =>
//         (
//           "0" +
//           Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
//         ).substr(-2)
//       )
//   );
// }

// const SEOOptimizacija: React.FC = () => {
//   const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
//   const [showModal, setShowModal] = useState<boolean>(false);

//   const openModal = (pkg: Package | "contact"): void => {
//     if (pkg === "contact") {
//       setSelectedPackage(null);
//     } else {
//       setSelectedPackage(pkg);
//     }
//     setShowModal(true);
//   };

//   const closeModal = (): void => {
//     setShowModal(false);
//   };

//   const PackageCard: React.FC<{ pkg: Package }> = ({ pkg }) => (
//     <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
//       <div
//         className="p-6 text-white relative overflow-hidden"
//         style={{
//           background: `linear-gradient(135deg, ${pkg.color} 0%, ${adjustColor(
//             pkg.color,
//             -30
//           )} 100%)`,
//         }}
//       >
//         <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-white bg-opacity-20 rounded-full p-8 transform rotate-12">
//           <motion.div
//             className="text-5xl"
//             whileHover={{ rotate: 360, scale: 1.2 }}
//             transition={{ duration: 0.5 }}
//           >
//             {pkg.icon}
//           </motion.div>
//         </div>
//         <h3 className="text-2xl font-bold mb-2 relative z-10">{pkg.name}</h3>
//         <p className="text-4xl font-extrabold mb-1 relative z-10">
//           €{pkg.price}
//         </p>
//       </div>
//       <div className="p-6">
//         <p className="text-gray-700 mb-4">{pkg.description}</p>
//         <ul className="mb-6" aria-label={`${pkg.name} features`}>
//           {pkg.features.map((feature, i) => (
//             <li key={i} className="flex items-center mb-2">
//               <FiCheckCircle
//                 className="text-[#EEC71B] mr-2 flex-shrink-0"
//                 aria-hidden="true"
//               />
//               <span>{feature}</span>
//             </li>
//           ))}
//         </ul>
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="w-full bg-[#EEC71B] text-[#3D3B4A] px-6 py-2 rounded-full font-bold mt-auto hover:bg-[#ffd700] transition-colors duration-300"
//           onClick={() => openModal(pkg)}
//         >
//           Uzzināt Vairāk
//         </motion.button>
//       </div>
//     </div>
//   );

//   const FeatureCard: React.FC<{
//     icon: JSX.Element;
//     title: string;
//     description: string;
//   }> = ({ icon, title, description }) => (
//     <motion.div
//       className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300"
//       whileHover={{ y: -5 }}
//     >
//       <div
//         className="text-4xl text-[#EEC71B] mb-4 flex justify-center"
//         aria-hidden="true"
//       >
//         {icon}
//       </div>
//       <h3 className="text-xl font-bold mb-2">{title}</h3>
//       <p className="text-gray-700">{description}</p>
//     </motion.div>
//   );

//   return (
//     <>
//       <Head>
//         <title>
//           SEO Optimizācija Latvijā | WebWorks - Jūsu Digitālais Partneris
//         </title>
//         <meta
//           name="description"
//           content="WebWorks piedāvā profesionālu SEO optimizāciju Latvijā. Uzlabojiet sava uzņēmuma redzamību meklētājprogrammās, palieliniet apmeklētāju skaitu un gūstiet vairāk konversiju ar mūsu SEO pakalpojumiem."
//         />
//         <meta
//           name="keywords"
//           content="SEO optimizācija, meklētājprogrammu optimizācija, atslēgvārdu izpēte, on-page SEO, off-page SEO, lokālā SEO, tehniskā SEO, satura optimizācija, Latvija"
//         />
//         <link rel="canonical" href="https://www.webworks.lv/seo-optimizacija" />
//         <meta
//           property="og:title"
//           content="SEO Optimizācija Latvijā | WebWorks"
//         />
//         <meta
//           property="og:description"
//           content="Profesionāla SEO optimizācija Latvijā. Uzlabojiet sava uzņēmuma redzamību meklētājprogrammās un palieliniet apmeklētāju skaitu."
//         />
//         <meta
//           property="og:image"
//           content="https://www.webworks.lv/images/seo-optimizacija-og.jpg"
//         />
//         <meta
//           property="og:url"
//           content="https://www.webworks.lv/seo-optimizacija"
//         />
//         <meta property="og:type" content="website" />
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta
//           name="twitter:title"
//           content="SEO Optimizācija Latvijā | WebWorks"
//         />
//         <meta
//           name="twitter:description"
//           content="Profesionāla SEO optimizācija Latvijā. Uzlabojiet sava uzņēmuma redzamību meklētājprogrammās un palieliniet apmeklētāju skaitu."
//         />
//         <meta
//           name="twitter:image"
//           content="https://www.webworks.lv/images/seo-optimizacija-og.jpg"
//         />
//       </Head>

//       <div className="min-h-screen bg-gradient-to-b from-[#F3F5F4] to-white">
//         <Header />

//         <main className="container mx-auto px-4 py-16">
//           <h1 className="text-4xl md:text-5xl font-bold text-center text-[#3D3B4A] mb-8">
//             SEO Optimizācija, kas Transformē Jūsu Biznesu
//           </h1>

//           <p className="text-xl text-center text-gray-700 mb-12 max-w-3xl mx-auto">
//             Atklājiet sava uzņēmuma potenciālu ar mūsu ekspertu SEO
//             pakalpojumiem. Mēs palīdzēsim jums sasniegt augstākas pozīcijas
//             meklētājprogrammās, piesaistīt vairāk apmeklētāju un palielināt
//             konversijas.
//           </p>

//           <section aria-labelledby="why-seo" className="mb-16">
//             <h2
//               id="why-seo"
//               className="text-3xl font-bold text-[#3D3B4A] mb-8 text-center"
//             >
//               Kāpēc SEO ir Svarīgs Jūsu Biznesam?
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               <FeatureCard
//                 icon={<FiTrendingUp />}
//                 title="Palielināta Redzamība"
//                 description="SEO palīdz jūsu vietnei parādīties augstākās pozīcijās meklēšanas rezultātos, palielinot jūsu zīmola redzamību un atpazīstamību."
//               />
//               <FeatureCard
//                 icon={<FiTarget />}
//                 title="Mērķtiecīga Auditorija"
//                 description="Piesaistiet apmeklētājus, kuri aktīvi meklē jūsu produktus vai pakalpojumus, uzlabojot konversijas iespējas."
//               />
//               <FeatureCard
//                 icon={<FiAward />}
//                 title="Uzticamība un Autoritāte"
//                 description="Augstākas pozīcijas meklētājprogrammās veicina uzticamību un nostiprina jūsu kā nozares eksperta statusu."
//               />
//               <FeatureCard
//                 icon={<FiGlobe />}
//                 title="Globāla Sasniedzamība"
//                 description="SEO ļauj jums sasniegt plašāku auditoriju, pārvarot ģeogrāfiskos ierobežojumus un paplašinot jūsu tirgus daļu."
//               />
//               <FeatureCard
//                 icon={<FiSettings />}
//                 title="Izmērāmi Rezultāti"
//                 description="SEO sniedz detalizētus datus un analītiku, ļaujot jums precīzi izmērīt un optimizēt savas digitālās mārketinga aktivitātes."
//               />
//               <FeatureCard
//                 icon={<FiAlertCircle />}
//                 title="Konkurences Priekšrocība"
//                 description="Efektīva SEO stratēģija palīdz jums izcelties pārpildītā tirgū un iegūt priekšrocības pār konkurentiem."
//               />
//             </div>
//           </section>

//           <section
//             aria-labelledby="our-process"
//             className="mb-16 bg-white p-8 rounded-lg shadow-lg"
//           >
//             <h2
//               id="our-process"
//               className="text-3xl font-bold text-[#3D3B4A] mb-8 text-center"
//             >
//               Mūsu SEO Optimizācijas Process
//             </h2>
//             <ol className="space-y-6">
//               <li className="flex items-center space-x-4">
//                 <div className="flex-shrink-0 w-8 h-8 bg-[#EEC71B] text-white rounded-full flex items-center justify-center font-bold">
//                   1
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-lg mb-1">Audits un Analīze</h3>
//                   <p>
//                     Mēs sākam ar rūpīgu jūsu vietnes un esošās SEO stratēģijas
//                     auditu, identificējot stiprās puses un uzlabojamās jomas.
//                   </p>
//                 </div>
//               </li>
//               <li className="flex items-center space-x-4">
//                 <div className="flex-shrink-0 w-8 h-8 bg-[#EEC71B] text-white rounded-full flex items-center justify-center font-bold">
//                   2
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-lg mb-1">Atslēgvārdu Izpēte</h3>
//                   <p>
//                     Mēs veicam padziļinātu atslēgvārdu izpēti, identificējot
//                     vērtīgākos un releventākos atslēgvārdus jūsu biznesam.
//                   </p>
//                 </div>
//               </li>
//               <li className="flex items-center space-x-4">
//                 <div className="flex-shrink-0 w-8 h-8 bg-[#EEC71B] text-white rounded-full flex items-center justify-center font-bold">
//                   3
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-lg mb-1">
//                     On-Page Optimizācija
//                   </h3>
//                   <p>
//                     Mēs optimizējam jūsu vietnes saturu, meta tagus, URL
//                     struktūru un citus on-page elementus, lai uzlabotu
//                     ranžēšanu.
//                   </p>
//                 </div>
//               </li>
//               <li className="flex items-center space-x-4">
//                 <div className="flex-shrink-0 w-8 h-8 bg-[#EEC71B] text-white rounded-full flex items-center justify-center font-bold">
//                   4
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-lg mb-1">Tehniskā SEO</h3>
//                   <p>
//                     Mēs uzlabojam jūsu vietnes tehniskos aspektus, ieskaitot
//                     ielādes ātrumu, mobilo optimizāciju un vietnes struktūru.
//                   </p>
//                 </div>
//               </li>
//               <li className="flex items-center space-x-4">
//                 <div className="flex-shrink-0 w-8 h-8 bg-[#EEC71B] text-white rounded-full flex items-center justify-center font-bold">
//                   5
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-lg mb-1">Satura Stratēģija</h3>
//                   <p>
//                     Mēs izstrādājam un ieviešam visaptverošu satura stratēģiju,
//                     radot vērtīgu un SEO optimizētu saturu.
//                   </p>
//                 </div>
//               </li>
//               <li className="flex items-center space-x-4">
//                 <div className="flex-shrink-0 w-8 h-8 bg-[#EEC71B] text-white rounded-full flex items-center justify-center font-bold">
//                   6
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-lg mb-1">Off-Page SEO</h3>
//                   <p>
//                     Mēs strādājam pie jūsu vietnes autoritātes celšanas,
//                     veidojot kvalitatīvas backlink saites un uzlabojot
//                     tiešsaistes reputāciju.
//                   </p>
//                 </div>
//               </li>
//               <li className="flex items-center space-x-4">
//                 <div className="flex-shrink-0 w-8 h-8 bg-[#EEC71B] text-white rounded-full flex items-center justify-center font-bold">
//                   7
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-lg mb-1">
//                     Monitorings un Optimizācija
//                   </h3>
//                   <p>
//                     Mēs nepārtraukti uzraugām jūsu SEO sniegumu, analizējam
//                     rezultātus un veicam nepieciešamās korekcijas, lai
//                     nodrošinātu pastāvīgu izaugsmi.
//                   </p>
//                 </div>
//               </li>
//             </ol>
//           </section>

//           <section aria-labelledby="packages" className="mb-16">
//             <h2
//               id="packages"
//               className="text-3xl font-bold text-[#3D3B4A] mb-8 text-center"
//             >
//               Mūsu SEO Optimizācijas Pakalpojumi
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {packages.map((pkg, index) => (
//                 <PackageCard key={index} pkg={pkg} />
//               ))}
//             </div>
//           </section>

//           <section
//             aria-labelledby="cta"
//             className="mb-16 bg-[#3D3B4A] text-white p-8 rounded-lg"
//           >
//             <h2 id="cta" className="text-3xl font-bold mb-8 text-center">
//               Gatavs Uzlabot Savu Tiešsaistes Redzamību?
//             </h2>
//             <p className="text-xl mb-8 text-center">
//               Ļaujiet mums palīdzēt jums sasniegt jaunus augstumus
//               meklētājprogrammās un pārvērst jūsu digitālo klātbūtni par spēcīgu
//               biznesa instrumentu.
//             </p>
//             <div className="flex justify-center">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-[#EEC71B] text-[#3D3B4A] px-8 py-3 rounded-full font-bold text-lg"
//                 onClick={() => openModal("contact")}
//               >
//                 Sazināties ar Mums
//               </motion.button>
//             </div>
//           </section>

//           <AnimatePresence>
//             {showModal && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//                 onClick={closeModal}
//               >
//                 <motion.div
//                   initial={{ scale: 0.9, opacity: 0 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   exit={{ scale: 0.9, opacity: 0 }}
//                   className="bg-white rounded-lg p-8 max-w-md w-full relative"
//                   onClick={(e) => e.stopPropagation()}
//                 >
//                   {selectedPackage === null ? (
//                     <>
//                       <h3 className="text-2xl font-bold mb-4">
//                         Sazināties ar Mums
//                       </h3>
//                       <p className="mb-4">
//                         Aizpildiet formu zemāk, un mūsu SEO eksperts sazināsies
//                         ar jums 24 stundu laikā, lai apspriestu jūsu projektu.
//                       </p>
//                       <form
//                         onSubmit={(e) => {
//                           e.preventDefault();
//                           // Handle form submission here
//                           console.log("Form submitted");
//                           closeModal();
//                         }}
//                       >
//                         <div className="mb-4">
//                           <label className="block mb-2" htmlFor="name">
//                             Vārds
//                           </label>
//                           <input
//                             type="text"
//                             id="name"
//                             name="name"
//                             className="w-full p-2 border rounded"
//                             required
//                           />
//                         </div>
//                         <div className="mb-4">
//                           <label className="block mb-2" htmlFor="email">
//                             E-pasts
//                           </label>
//                           <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             className="w-full p-2 border rounded"
//                             required
//                           />
//                         </div>
//                         <div className="mb-4">
//                           <label className="block mb-2" htmlFor="website">
//                             Jūsu Vietnes URL
//                           </label>
//                           <input
//                             type="url"
//                             id="website"
//                             name="website"
//                             className="w-full p-2 border rounded"
//                             required
//                           />
//                         </div>
//                         <div className="mb-4">
//                           <label className="block mb-2" htmlFor="message">
//                             Jūsu ziņojums
//                           </label>
//                           <textarea
//                             id="message"
//                             name="message"
//                             className="w-full p-2 border rounded"
//                             rows={4}
//                             required
//                           ></textarea>
//                         </div>
//                         <div className="flex justify-end">
//                           <button
//                             type="submit"
//                             className="bg-[#EEC71B] text-[#3D3B4A] px-6 py-2 rounded-full font-bold"
//                           >
//                             Nosūtīt
//                           </button>
//                         </div>
//                       </form>
//                     </>
//                   ) : (
//                     <>
//                       <h3 className="text-2xl font-bold mb-4">
//                         {selectedPackage.name}
//                       </h3>
//                       <p className="text-3xl font-bold text-[#EEC71B] mb-4">
//                         €{selectedPackage.price}
//                       </p>
//                       <p className="mb-4">
//                         {selectedPackage.detailedDescription}
//                       </p>
//                       <h4 className="font-bold mb-2">Iekļautie pakalpojumi:</h4>
//                       <ul className="mb-6">
//                         {selectedPackage.features.map((feature, index) => (
//                           <li key={index} className="flex items-center mb-2">
//                             <FiCheckCircle
//                               className="text-[#EEC71B] mr-2"
//                               aria-hidden="true"
//                             />
//                             <span>{feature}</span>
//                           </li>
//                         ))}
//                       </ul>
//                       <div className="flex justify-end">
//                         <button
//                           className="bg-[#EEC71B] text-[#3D3B4A] px-6 py-2 rounded-full font-bold"
//                           onClick={() => openModal("contact")}
//                         >
//                           Pieteikties
//                         </button>
//                       </div>
//                     </>
//                   )}
//                   <button
//                     className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//                     onClick={closeModal}
//                     aria-label="Close modal"
//                   >
//                     <FiX size={24} />
//                   </button>
//                 </motion.div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </main>

//         <Footer />
//       </div>

//       <script type="application/ld+json">
//         {JSON.stringify({
//           "@context": "https://schema.org",
//           "@type": "WebPage",
//           name: "SEO Optimizācija Latvijā | WebWorks",
//           description:
//             "WebWorks piedāvā profesionālu SEO optimizāciju Latvijā. Uzlabojiet sava uzņēmuma redzamību meklētājprogrammās, palieliniet apmeklētāju skaitu un gūstiet vairāk konversiju ar mūsu SEO pakalpojumiem.",
//           url: "https://www.webworks.lv/seo-optimizacija",
//           mainEntity: {
//             "@type": "Service",
//             name: "WebWorks SEO Optimizācijas Pakalpojumi",
//             description:
//               "Profesionāli SEO optimizācijas pakalpojumi, kas palīdz uzņēmumiem uzlabot savu redzamību meklētājprogrammās un piesaistīt vairāk klientu.",
//             provider: {
//               "@type": "Organization",
//               name: "WebWorks",
//             },
//             areaServed: "Latvija",
//             hasOfferCatalog: {
//               "@type": "OfferCatalog",
//               name: "SEO Optimizācijas Pakalpojumi",
//               itemListElement: packages.map((pkg) => ({
//                 "@type": "Offer",
//                 itemOffered: {
//                   "@type": "Service",
//                   name: pkg.name,
//                   description: pkg.description,
//                 },
//                 price: pkg.price,
//                 priceCurrency: "EUR",
//               })),
//             },
//           },
//         })}
//       </script>
//     </>
//   );
// };

// export default SEOOptimizacija;
