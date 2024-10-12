"use client";
import React, { useState } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMonitor,
  FiSmartphone,
  FiLayout,
  FiCode,
  FiZap,
  FiLock,
  FiSearch,
  FiTrendingUp,
  FiPackage,
  FiCheckCircle,
  FiShoppingCart,
  FiGlobe,
  FiGift,
  FiX,
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
    name: "Starta Komplekts",
    price: "299",
    features: [
      "Līdz 3 lapām",
      "Responsīvs dizains",
      "Bāzes SEO optimizācija",
      "Kontaktforma",
      "Google Analytics integrācija",
      "14 dienu atbalsts pēc palaišanas",
    ],
    description:
      "Ideāls risinājums maziem uzņēmumiem vai individuālajiem projektiem, kas vēlas ātri uzsākt savu darbību tiešsaistē.",
    detailedDescription:
      "Mūsu Starta Komplekts ir ideāls sākums jūsu digitālajam ceļojumam. Šis pakalpojums ietver visu nepieciešamo, lai jūsu bizness ātri un efektīvi ienāktu tiešsaistē. Mēs izstrādāsim līdz 3 profesionālām un pilnībā responsīvām lapām, kas izskatīsies lieliski uz visām ierīcēm. Bāzes SEO optimizācija palīdzēs jums būt atrodamiem meklētājprogrammās, bet integrētā kontaktforma un Google Analytics sniegs iespēju efektīvi sazināties ar klientiem un analizēt vietnes apmeklējumus. Pēc palaišanas mēs nodrošināsim 14 dienu atbalstu, lai jūsu jaunā mājaslapa darbotos nevainojami.",
    icon: <FiPackage />,
    color: "#FFD700",
  },
  {
    name: "Biznesa Pamats",
    price: "599",
    features: [
      "Līdz 5 lapām",
      "Pielāgots responsīvs dizains",
      "Padziļināta SEO optimizācija",
      "Blogs vai jaunumu sadaļa",
      "Sociālo mediju integrācija",
      "30 dienu atbalsts pēc palaišanas",
    ],
    description:
      "Perfekts maziem un vidējiem uzņēmumiem, kas vēlas izveidot stabilu tiešsaistes klātbūtni ar pamata funkcionalitāti.",
    detailedDescription:
      "Biznesa Pamats ir plašāks un pielāgotāks risinājums augošiem uzņēmumiem. Šajā paketē mēs izstrādāsim līdz 5 pilnībā pielāgotām un responsīvām lapām, kas atspoguļos jūsu zīmola unikalitāti. Padziļināta SEO optimizācija palīdzēs jums sasniegt augstākas pozīcijas meklētājprogrammās, bet blogs vai jaunumu sadaļa ļaus regulāri atjaunināt saturu un uzturēt aktīvu saziņu ar klientiem. Sociālo mediju integrācija palielinās jūsu redzamību un sasniedzamību dažādās platformās. Pēc palaišanas mēs nodrošināsim 30 dienu atbalstu, lai jūsu mājaslapa darbotos optimāli un jūs varētu pilnībā izmantot visas tās funkcijas.",
    icon: <FiMonitor />,
    color: "#4CAF50",
  },
  {
    name: "E-komercijas Sākums",
    price: "999",
    features: [
      "Līdz 10 produktu lapām",
      "Pilnībā funkcionāls e-veikals",
      "Drošs maksājumu process",
      "Produktu pārvaldības sistēma",
      "Pasūtījumu un piegādes pārvaldība",
      "60 dienu atbalsts pēc palaišanas",
    ],
    description:
      "Ideāls mazumtirgotājiem, kas vēlas uzsākt tiešsaistes pārdošanu ar profesionālu un drošu e-komercijas risinājumu.",
    detailedDescription:
      "E-komercijas Sākums ir ideāls risinājums uzņēmumiem, kas vēlas uzsākt vai paplašināt savu tiešsaistes pārdošanu. Šajā paketē mēs izveidsim pilnvērtīgu e-veikalu ar līdz 10 produktu lapām, kas būs ne tikai vizuāli pievilcīgas, bet arī optimizētas konversijām. Mēs integrēsim drošu maksājumu sistēmu, lai jūsu klienti varētu veikt pirkumus ar pilnu pārliecību. Produktu pārvaldības sistēma ļaus jums viegli pievienot, rediģēt un noņemt preces, bet pasūtījumu un piegādes pārvaldības rīki palīdzēs efektīvi organizēt jūsu biznesu. 60 dienu atbalsts pēc palaišanas nodrošinās, ka jūsu e-veikals darbojas nevainojami un jūs varat pilnībā izmantot visas tā iespējas.",
    icon: <FiShoppingCart />,
    color: "#2196F3",
  },
  {
    name: "Biznesa Izaugsme",
    price: "1499",
    features: [
      "Līdz 20 lapām",
      "Pielāgots unikāls dizains",
      "Padziļināta SEO un veiktspējas optimizācija",
      "Pilna e-komercijas funkcionalitāte",
      "Klientu atbalsta čats",
      "90 dienu atbalsts pēc palaišanas",
    ],
    description:
      "Visaptverošs risinājums augošiem uzņēmumiem, kas vēlas pilnveidot savu tiešsaistes klātbūtni un palielināt pārdošanas apjomus.",
    detailedDescription:
      "Biznesa Izaugsmes pakete ir visaptverošs risinājums uzņēmumiem, kas vēlas dominēt savā nozarē tiešsaistē. Ar līdz 20 pilnībā pielāgotām lapām, mēs radīsim unikālu un iespaidīgu tiešsaistes klātbūtni jūsu zīmolam. Padziļināta SEO un veiktspējas optimizācija nodrošinās, ka jūsu vietne ne tikai izskatās labi, bet arī darbojas ātri un ir viegli atrodama meklētājprogrammās. Pilna e-komercijas funkcionalitāte ļaus jums efektīvi pārdot produktus vai pakalpojumus tiešsaistē, bet integrētais klientu atbalsta čats uzlabos klientu apkalpošanas kvalitāti. 90 dienu atbalsts pēc palaišanas nodrošinās, ka jūsu digitālā platforma darbojas optimāli un jūs varat pilnībā izmantot visas tās iespējas biznesa izaugsmei.",
    icon: <FiTrendingUp />,
    color: "#9C27B0",
  },
  {
    name: "Uzņēmuma Līderis",
    price: "2499",
    features: [
      "Neierobežots lapu skaits",
      "Pilnībā pielāgota CMS sistēma",
      "Daudzvalodu atbalsts",
      "Integrācija ar uzņēmuma sistēmām",
      "Detalizēta analītika un atskaites",
      "12 mēnešu atbalsts un uzturēšana",
    ],
    description:
      "Premium risinājums lieliem uzņēmumiem un korporācijām, kas vēlas dominēt savā nozarē ar izcilu digitālo pieredzi.",
    detailedDescription:
      "Uzņēmuma Līdera pakete ir mūsu premium risinājums, kas paredzēts lieliem uzņēmumiem un korporācijām ar ambicioziem mērķiem digitālajā vidē. Šis pakalpojums ietver neierobežotu lapu skaitu un pilnībā pielāgotu satura pārvaldības sistēmu (CMS), kas ļaus jums viegli pārvaldīt un atjaunināt jūsu plašo digitālo klātbūtni. Daudzvalodu atbalsts paplašinās jūsu globālo sasniedzamību, bet integrācija ar esošajām uzņēmuma sistēmām nodrošinās efektīvu datu plūsmu un procesu automatizāciju. Detalizēta analītika un atskaites sniegs jums dziļu ieskatu jūsu digitālās stratēģijas efektivitātē, ļaujot pieņemt datu vadītus lēmumus. Ar 12 mēnešu atbalstu un uzturēšanu, jūs varat būt droši, ka jūsu digitālā platforma vienmēr būs moderna, droša un optimizēta jūsu biznesa vajadzībām.",
    icon: <FiGlobe />,
    color: "#FF5722",
  },
  {
    name: "Individuāls Projekts",
    price: "Pēc pieprasījuma",
    features: [
      "Pilnībā pielāgots risinājums",
      "Unikālas funkcijas un integrācijas",
      "Sarežģītu sistēmu izstrāde",
      "Ilgtermiņa stratēģiskā partnerība",
      "Nepārtraukta optimizācija un atbalsts",
    ],
    description:
      "Pilnībā pielāgots risinājums unikālām biznesa vajadzībām. Mēs radīsim tieši to, ko jūsu biznesam nepieciešams, lai gūtu panākumus digitālajā pasaulē.",
    detailedDescription:
      "Individuālā Projekta pakete ir paredzēta uzņēmumiem ar īpašām un unikālām vajadzībām digitālajā vidē. Šis pakalpojums paredz ciešu sadarbību ar jūsu komandu, lai izstrādātu pilnībā pielāgotu risinājumu, kas precīzi atbilst jūsu biznesa mērķiem un procesiem. Mēs varam radīt unikālas funkcijas un integrācijas, kas nav pieejamas standarta risinājumos, kā arī izstrādāt sarežģītas sistēmas, kas automatizē un optimizē jūsu biznesa procesus. Šī pakete ietver ilgtermiņa stratēģisko partnerību, kur mēs ne tikai izstrādājam sākotnējo risinājumu, bet arī nepārtraukti to optimizējam un pielāgojam, lai tas vienmēr atbilstu jūsu mainīgajām biznesa vajadzībām. Ar pastāvīgu atbalstu un regulārām konsultācijām, mēs nodrošināsim, ka jūsu digitālā platforma vienmēr ir jūsu biznesa izaugsmes dzinējspēks.",
    icon: <FiCode />,
    color: "#607D8B",
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

const WebIzstrade: React.FC = () => {
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
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
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
          {pkg.price === "Pēc pieprasījuma" ? pkg.price : `€${pkg.price}`}
        </p>
      </div>
      <div className="p-6">
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
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-[#EEC71B] text-[#3D3B4A] px-6 py-2 rounded-full font-bold mt-auto hover:bg-[#ffd700] transition-colors duration-300"
          onClick={() => openModal(pkg)}
        >
          Uzzināt Vairāk
        </motion.button>
      </div>
    </div>
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
          Web Izstrāde Latvijā | WebWorks - Jūsu Digitālais Partneris
        </title>
        <meta
          name="description"
          content="WebWorks piedāvā profesionālu web izstrādi Latvijā. Radām SEO optimizētas, responsīvas un konversijām orientētas mājaslapas. Uzziniet par mūsu pakalpojumiem!"
        />
        <meta
          name="keywords"
          content="web izstrāde, mājaslapa, responsīvs dizains, e-komercija, SEO optimizācija, CMS, web dizains, Latvija, Rīga"
        />
        <link rel="canonical" href="https://www.webworks.lv/web-izstrade" />
        <meta property="og:title" content="Web Izstrāde Latvijā | WebWorks" />
        <meta
          property="og:description"
          content="Profesionāla web izstrāde Latvijā. Radām konversijām orientētas, SEO optimizētas mājaslapas."
        />
        <meta
          property="og:image"
          content="https://www.webworks.lv/images/web-izstrade-og.jpg"
        />
        <meta
          property="og:url"
          content="https://www.webworks.lv/web-izstrade"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Web Izstrāde Latvijā | WebWorks" />
        <meta
          name="twitter:description"
          content="Profesionāla web izstrāde Latvijā. Radām konversijām orientētas, SEO optimizētas mājaslapas."
        />
        <meta
          name="twitter:image"
          content="https://www.webworks.lv/images/web-izstrade-og.jpg"
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-[#F3F5F4] to-white">
        <Header />

        <main className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-[#3D3B4A] mb-8">
            Inovatīva Web Izstrāde Jūsu Biznesam
          </h1>

          <p className="text-xl text-center text-gray-700 mb-12 max-w-3xl mx-auto">
            Mēs radām ne tikai mājaslapas, bet digitālās pieredzes, kas pārvērš
            apmeklētājus lojālos klientos. Ļaujiet mums pārvērst jūsu vīziju
            digitālā realitātē!
          </p>

          <section aria-labelledby="special-offer" className="mb-12">
            <h2 id="special-offer" className="sr-only">
              Īpašais piedāvājums
            </h2>
            <div className="bg-gradient-to-r from-[#EEC71B] to-[#FFD700] text-[#3D3B4A] p-6 rounded-lg shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    Īpašais piedāvājums!
                  </h3>
                  <p className="text-lg mb-2">
                    Rezervējiet web izstrādes pakalpojumu līdz mēneša beigām un
                    saņemiet:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>6 mēnešu bezmaksas hostings</li>
                    <li>Bezmaksas domēna reģistrācija</li>
                    <li>SSL sertifikāts uz 1 gadu</li>
                  </ul>
                  <p className="font-bold">
                    Ietaupiet līdz pat €300!
                    <span className="text-sm">
                      (Balstoties uz populāru hostinga kompāniju cenām)
                    </span>
                  </p>
                </div>
                <div className="hidden md:block" aria-hidden="true">
                  <FiGift className="text-6xl" />
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#3D3B4A] text-white px-6 py-2 rounded-full font-bold mt-4"
                onClick={() => openModal("contact")}
              >
                Izmantot Piedāvājumu
              </motion.button>
            </div>
          </section>

          <section aria-labelledby="services" className="mb-16">
            <h2
              id="services"
              className="text-3xl font-bold text-[#3D3B4A] mb-8 text-center"
            >
              Mūsu Web Izstrādes Pakalpojumi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <PackageCard key={index} pkg={pkg} />
              ))}
            </div>
          </section>

          <section aria-labelledby="why-choose-us" className="mb-16">
            <h2
              id="why-choose-us"
              className="text-3xl font-bold text-[#3D3B4A] mb-8 text-center"
            >
              Kāpēc Izvēlēties WebWorks?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<FiMonitor />}
                title="Inovatīvs Dizains"
                description="Mēs radām vizuāli piesaistošas un lietotājiem draudzīgas mājaslapas, kas atspoguļo jūsu zīmola unikālo identitāti."
              />
              <FeatureCard
                icon={<FiSmartphone />}
                title="Pilnībā Responsīvs"
                description="Jūsu mājaslapa izskatīsies un darbosies nevainojami uz visām ierīcēm - no galddatoriem līdz viedtālruņiem."
              />
              <FeatureCard
                icon={<FiZap />}
                title="Zibens Ātrums"
                description="Mēs optimizējam katru mājaslapas aspektu, lai nodrošinātu zibenīgu ielādes laiku un nevainojamu veiktspēju."
              />
              <FeatureCard
                icon={<FiLock />}
                title="Uzlabota Drošība"
                description="Mēs izmantojam jaunākās drošības tehnoloģijas, lai aizsargātu jūsu un jūsu klientu datus no kiberapdraudējumiem."
              />
              <FeatureCard
                icon={<FiSearch />}
                title="SEO Dominance"
                description="Mēs veidojam mājaslapas ar integrētu SEO stratēģiju, lai jūs būtu viegli atrodami un dominētu meklētājprogrammu rezultātos."
              />
              <FeatureCard
                icon={<FiTrendingUp />}
                title="Konversiju Maģija"
                description="Mūsu dizains un funkcionalitāte ir vērsta uz to, lai maksimāli palielinātu konversijas un uzlabotu jūsu ROI."
              />
            </div>
          </section>

          <section
            aria-labelledby="cta"
            className="mb-16 bg-[#3D3B4A] text-white p-8 rounded-lg"
          >
            <h2 id="cta" className="text-3xl font-bold mb-8 text-center">
              Gatavs Sākt Savu Digitālo Transformāciju?
            </h2>
            <p className="text-xl mb-8 text-center">
              Mēs esam šeit, lai palīdzētu jums izveidot mājaslapu, kas ne tikai
              izskatās lieliski, bet arī sasniedz jūsu biznesa mērķus.
            </p>
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#EEC71B] text-[#3D3B4A] px-8 py-3 rounded-full font-bold text-lg"
                onClick={() => openModal("contact")}
              >
                Sazināties ar Mums
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
                        Mēs priecāsimies atbildēt uz jūsu jautājumiem un
                        palīdzēt jums sākt jūsu web izstrādes projektu.
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
                            className="bg-[#EEC71B] text-[#3D3B4A] px-6 py-2 rounded-full font-bold"
                          >
                            Nosūtīt
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
                        {selectedPackage.price === "Pēc pieprasījuma"
                          ? selectedPackage.price
                          : `€${selectedPackage.price}`}
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
                          className="bg-[#EEC71B] text-[#3D3B4A] px-6 py-2 rounded-full font-bold"
                          onClick={() => openModal("contact")}
                        >
                          Pieteikties
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
      </div>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Web Izstrāde Latvijā | WebWorks",
          description:
            "WebWorks piedāvā profesionālu web izstrādi Latvijā. Radām SEO optimizētas, responsīvas un konversijām orientētas mājaslapas.",
          url: "https://www.webworks.lv/web-izstrade",
          mainEntity: {
            "@type": "WebApplication",
            name: "WebWorks Web Izstrāde",
            applicationCategory: "WebApplication",
            offers: packages.map((pkg) => ({
              "@type": "Offer",
              name: pkg.name,
              description: pkg.description,
              price:
                pkg.price === "Pēc pieprasījuma"
                  ? "Pēc pieprasījuma"
                  : pkg.price,
              priceCurrency: "EUR",
            })),
          },
        })}
      </script>
    </>
  );
};

export default WebIzstrade;
