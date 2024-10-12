"use client";
import React, { useState } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import Script from "next/script";
import {
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiLayout,
  FiBarChart2,
  FiMessageCircle,
  FiCheckCircle,
  FiX,
  FiArrowRight,
  FiGlobe,
} from "react-icons/fi";
import Header from "@/components/Header";
import Footer from "@/components/footer";

interface Service {
  name: string;
  price: string;
  features: string[];
  description: string;
  detailedDescription: string;
  icon: JSX.Element;
  color: string;
}

const services: Service[] = [
  {
    name: "Digitālā Mārketinga Stratēģija",
    price: "799",
    features: [
      "Pilnīga tirgus analīze",
      "Mērķauditorijas izpēte",
      "Konkurentu analīze",
      "Kanālu stratēģijas izstrāde",
      "Mērķu un KPI noteikšana",
      "3 mēnešu īstenošanas plāns",
    ],
    description:
      "Visaptveroša digitālā mārketinga stratēģija, kas palīdzēs jūsu uzņēmumam sasniegt konkrētus biznesa mērķus.",
    detailedDescription:
      "Mūsu Digitālā Mārketinga Stratēģijas pakalpojums ir ideāls risinājums uzņēmumiem, kas vēlas maksimāli izmantot digitālā mārketinga potenciālu. Mēs sākam ar padziļinātu tirgus analīzi, lai izprastu jūsu nozares tendences un iespējas. Veicam rūpīgu mērķauditorijas izpēti, lai precīzi definētu jūsu ideālo klientu. Konkurentu analīze palīdz identificēt tirgus nišas un konkurences priekšrocības. Balstoties uz šiem datiem, izstrādājam pielāgotu kanālu stratēģiju, kas ietver sociālos medijus, e-pasta mārketingu, SEO, maksas reklāmas un citus atbilstošus kanālus. Nosakām skaidrus un izmērāmus mērķus, kā arī KPI, lai varētu sekot stratēģijas efektivitātei. Visbeidzot, piedāvājam detalizētu 3 mēnešu īstenošanas plānu, kas palīdzēs jums soli pa solim realizēt izstrādāto stratēģiju.",
    icon: <FiTarget />,
    color: "#4CAF50",
  },
  {
    name: "Sociālo Mediju Pārvaldība",
    price: "599",
    features: [
      "Profilu optimizācija",
      "Satura plāna izstrāde",
      "Regulāra satura publicēšana",
      "Kopienas pārvaldība",
      "Reklāmu pārvaldība",
      "Ikmēneša atskaites",
    ],
    description:
      "Pilna sociālo mediju pārvaldība, kas palielinās jūsu zīmola atpazīstamību un iesaisti ar mērķauditoriju.",
    detailedDescription:
      "Mūsu Sociālo Mediju Pārvaldības pakalpojums ir izstrādāts, lai maksimāli palielinātu jūsu zīmola klātbūtni un iesaisti sociālajos tīklos. Mēs sākam ar visu jūsu sociālo mediju profilu pilnīgu optimizāciju, nodrošinot konsekventu un profesionālu tēlu visās platformās. Izstrādājam detalizētu satura plānu, kas atbilst jūsu mērķauditorijas interesēm un jūsu biznesa mērķiem. Mūsu komanda nodrošina regulāru, augstas kvalitātes satura publicēšanu, izmantojot dažādus formātus - attēlus, video, infografikas un citus. Aktīvi pārvaldām jūsu kopienu, atbildot uz komentāriem, ziņām un atsauksmēm, veicinot pozitīvu mijiedarbību ar jūsu sekotājiem. Papildus tam, mēs izstrādājam un pārvaldām mērķtiecīgas sociālo mediju reklāmu kampaņas, lai palielinātu jūsu sasniedzamību un piesaistītu jaunus potenciālos klientus. Katru mēnesi saņemsiet detalizētas atskaites par jūsu sociālo mediju sniegumu, ietverot galvenos rādītājus un ieteikumus turpmākiem uzlabojumiem.",
    icon: <FiUsers />,
    color: "#2196F3",
  },
  {
    name: "SEO & Satura Mārketings",
    price: "899",
    features: [
      "Atslēgvārdu izpēte",
      "On-page un off-page SEO",
      "Satura stratēģijas izstrāde",
      "Regulāra bloga rakstu publicēšana",
      "Backlink veidošana",
      "Mēneša analītika un optimizācija",
    ],
    description:
      "Uzlabojiet savu redzamību meklētājprogrammās un piesaistiet organisko trafiku ar SEO un kvalitatīvu saturu.",
    detailedDescription:
      "Mūsu SEO & Satura Mārketinga pakalpojums ir veidots, lai palielinātu jūsu vietnes organisko trafiku un uzlabotu pozīcijas meklētājprogrammās. Sākam ar padziļinātu atslēgvārdu izpēti, identificējot vērtīgākos un relevantākos atslēgvārdus jūsu nozarē. Veicam pilnīgu on-page SEO optimizāciju, uzlabojot jūsu vietnes struktūru, meta tagus, un iekšējo saišu struktūru. Off-page SEO ietvaros strādājam pie jūsu vietnes autoritātes celšanas, veidojot kvalitatīvas backlink saites. Izstrādājam visaptverošu satura stratēģiju, kas ne tikai atbilst SEO prasībām, bet arī sniedz vērtību jūsu mērķauditorijai. Regulāri publicējam augstas kvalitātes bloga rakstus un cita veida saturu, kas palīdz piesaistīt un noturēt apmeklētājus. Katru mēnesi veicam detalizētu analīzi un nepieciešamos optimizācijas darbus, lai nodrošinātu nepārtrauktu snieguma uzlabošanos.",
    icon: <FiTrendingUp />,
    color: "#9C27B0",
  },
  {
    name: "PPC & Displeja Reklāmas",
    price: "749",
    features: [
      "Google Ads un Facebook Ads kampaņu izveide",
      "Reklāmu tekstu un vizuālo materiālu izstrāde",
      "Mērķauditorijas segmentācija",
      "A/B testēšana",
      "Budžeta optimizācija",
      "Konversiju izsekošana un optimizācija",
    ],
    description:
      "Maksimizējiet savu ROI ar profesionāli pārvaldītām PPC un displeja reklāmu kampaņām.",
    detailedDescription:
      "Mūsu PPC & Displeja Reklāmu pakalpojums ir veidots, lai palīdzētu jums sasniegt maksimālu atdevi no jūsu reklāmas budžeta. Mēs izveidojam un pārvaldām efektīvas Google Ads un Facebook Ads kampaņas, kas precīzi mērķētas uz jūsu potenciālajiem klientiem. Mūsu komanda izstrādā pārliecinošus reklāmu tekstus un vizuālos materiālus, kas piesaista uzmanību un veicina klikšķus. Veicam rūpīgu mērķauditorijas segmentāciju, lai nodrošinātu, ka jūsu reklāmas sasniedz tieši tos cilvēkus, kuri visticamāk būs ieinteresēti jūsu produktos vai pakalpojumos. Regulāri veicam A/B testēšanu, lai nepārtraukti uzlabotu reklāmu sniegumu. Mēs rūpīgi optimizējam jūsu reklāmas budžetu, nodrošinot, ka katra iztērētā eiro sniedz maksimālu vērtību. Ieviešam detalizētu konversiju izsekošanu un veicam nepārtrauktu optimizāciju, lai palielinātu konversijas rādītājus un samazinātu klienta piesaistes izmaksas.",
    icon: <FiLayout />,
    color: "#FF5722",
  },
  {
    name: "E-pasta Mārketings",
    price: "499",
    features: [
      "E-pasta kampaņu stratēģijas izstrāde",
      "Abonentu saraksta pārvaldība un segmentācija",
      "Pielāgotu e-pastu dizains un izstrāde",
      "A/B testēšana",
      "Automātisko e-pastu secību izveide",
      "Snieguma analīze un optimizācija",
    ],
    description:
      "Veidojiet spēcīgas attiecības ar saviem klientiem un palieliniet pārdošanas apjomus ar efektīvām e-pasta kampaņām.",
    detailedDescription:
      "Mūsu E-pasta Mārketinga pakalpojums ir izstrādāts, lai palīdzētu jums veidot un uzturēt ilgtermiņa attiecības ar jūsu klientiem, vienlaikus palielinot konversijas un pārdošanas apjomus. Mēs sākam ar visaptverošas e-pasta kampaņu stratēģijas izstrādi, kas atbilst jūsu biznesa mērķiem un mērķauditorijas vajadzībām. Veicam rūpīgu jūsu abonentu saraksta pārvaldību un segmentāciju, lai nodrošinātu, ka katrs klients saņem viņam visatbilstošāko saturu. Mūsu dizaineri un satura veidotāji izstrādā pielāgotus, vizuāli pievilcīgus un efektīvus e-pastus, kas motivē saņēmējus veikt vēlamās darbības. Regulāri veicam A/B testēšanu, lai nepārtraukti uzlabotu e-pastu efektivitāti. Izveidojam automatizētas e-pastu secības dažādiem klientu ceļojuma posmiem, piemēram, uvesveicināšanas e-pastus jauniem abonentiem vai pamesto grozu atgādinājumus. Katru mēnesi veicam detalizētu snieguma analīzi, izsekojot tādus rādītājus kā atvēršanas rādītāji, klikšķu rādītāji un konversijas, un veicam nepieciešamās optimizācijas, lai nepārtraukti uzlabotu jūsu e-pasta mārketinga kampaņu rezultātus.",
    icon: <FiMessageCircle />,
    color: "#FFC107",
  },
  {
    name: "All-in-One Digitālais Mārketings",
    price: "1999",
    features: [
      "Visaptveroša digitālā mārketinga stratēģija",
      "SEO & satura mārketings",
      "Sociālo mediju pārvaldība",
      "PPC & displeja reklāmas",
      "E-pasta mārketinga kampaņas",
      "Mēneša analītika un optimizācija",
      "Konkurentu analīze un tirgus izpēte",
      "Zīmola identitātes stiprināšana",
      "Konversijas ceļa optimizācija",
      "Pielāgoti mēneša pārskati",
      "Prioritārs 24/7 atbalsts",
    ],
    description:
      "Visaptverošs digitālā mārketinga risinājums, kas apvieno visus mūsu pakalpojumus vienā integrētā stratēģijā.",
    detailedDescription:
      "Mūsu All-in-One Digitālā Mārketinga pakalpojums ir ideāls risinājums uzņēmumiem, kas vēlas pilnībā izmantot digitālā mārketinga potenciālu. Šis pakalpojums apvieno visus mūsu digitālā mārketinga risinājumus vienā visaptverošā stratēģijā. Mēs sākam ar padziļinātu tirgus un konkurentu analīzi, lai izstrādātu pielāgotu digitālā mārketinga stratēģiju, kas atbilst jūsu biznesa mērķiem. SEO un satura mārketings palīdzēs uzlabot jūsu vietnes redzamību meklētājprogrammās un piesaistīt organisko trafiku. Mūsu sociālo mediju eksperti pārvaldīs jūsu sociālo platformu klātbūtni, veicinot iesaisti un zīmola atpazīstamību. PPC un displeja reklāmu kampaņas tiks izstrādātas un optimizētas, lai maksimāli palielinātu jūsu ROI. E-pasta mārketinga kampaņas palīdzēs uzturēt attiecības ar esošajiem klientiem un piesaistīt jaunus. Mēs nepārtraukti analizēsim un optimizēsim visus digitālā mārketinga aspektus, sniedzot detalizētus ikmēneša pārskatus. Papildus tam, mēs strādāsim pie jūsu zīmola identitātes stiprināšanas un konversijas ceļa optimizācijas. Ar šo pakalpojumu jūs saņemsiet prioritāru 24/7 atbalstu no mūsu ekspertu komandas.",
    icon: <FiTarget />,
    color: "#3F51B5",
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

const DigitalaisMarketings: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const openModal = (service: Service | "contact"): void => {
    if (service === "contact") {
      setSelectedService(null);
    } else {
      setSelectedService(service);
    }
    setShowModal(true);
  };

  const closeModal = (): void => {
    setShowModal(false);
  };

  const ServiceCard: React.FC<{ service: Service }> = ({ service }) => (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="p-6 text-white relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${
            service.color
          } 0%, ${adjustColor(service.color, -30)} 100%)`,
        }}
      >
        <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-white bg-opacity-20 rounded-full p-8 transform rotate-12">
          <motion.div
            className="text-5xl"
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ duration: 0.5 }}
          >
            {service.icon}
          </motion.div>
        </div>
        <h3 className="text-2xl font-bold mb-2 relative z-10">
          {service.name}
        </h3>
        <p className="text-4xl font-extrabold mb-1 relative z-10">
          €{service.price}
        </p>
      </div>
      <div className="p-6 flex-grow">
        <p className="text-gray-700 mb-4">{service.description}</p>
        <ul className="mb-6" aria-label={`${service.name} features`}>
          {service.features.map((feature, i) => (
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
          onClick={() => openModal(service)}
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
          Digitālais Mārketings Latvijā | WebWorks - Jūsu Digitālais Partneris
        </title>
        <meta
          name="description"
          content="WebWorks piedāvā profesionālus digitālā mārketinga pakalpojumus Latvijā. Palieliniet savu tiešsaistes klātbūtni, piesaistiet vairāk klientu un uzlabojiet sava zīmola atpazīstamību ar mūsu ekspertu izstrādātajām digitālā mārketinga stratēģijām."
        />
        <meta
          name="keywords"
          content="digitālais mārketings, mārketinga stratēģija, sociālie mediji, SEO, PPC, e-pasta mārketings, satura mārketings, Latvija"
        />
        <link
          rel="canonical"
          href="https://www.webworks.lv/digitalais-marketings"
        />
        <meta
          property="og:title"
          content="Digitālais Mārketings Latvijā | WebWorks"
        />
        <meta
          property="og:description"
          content="Profesionāli digitālā mārketinga pakalpojumi Latvijā. Palieliniet savu tiešsaistes klātbūtni un piesaistiet vairāk klientu ar WebWorks."
        />
        <meta
          property="og:image"
          content="https://www.webworks.lv/images/digitalais-marketings-og.jpg"
        />
        <meta
          property="og:url"
          content="https://www.webworks.lv/digitalais-marketings"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Digitālais Mārketings Latvijā | WebWorks"
        />
        <meta
          name="twitter:description"
          content="Profesionāli digitālā mārketinga pakalpojumi Latvijā. Palieliniet savu tiešsaistes klātbūtni un piesaistiet vairāk klientu ar WebWorks."
        />
        <meta
          name="twitter:image"
          content="https://www.webworks.lv/images/digitalais-marketings-og.jpg"
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-[#F3F5F4] to-white">
        <Header />

        <main className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-[#3D3B4A] mb-8">
            Digitālais Mārketings, kas Virza Jūsu Biznesu uz Priekšu
          </h1>

          <p className="text-xl text-center text-gray-700 mb-12 max-w-3xl mx-auto">
            Atklājiet sava uzņēmuma potenciālu ar mūsu ekspertu digitālā
            mārketinga pakalpojumiem. Mēs palīdzēsim jums sasniegt jaunas
            virsotnes tiešsaistē, piesaistīt vairāk klientu un palielināt peļņu.
          </p>

          <section aria-labelledby="services" className="mb-16">
            <h2
              id="services"
              className="text-3xl font-bold text-[#3D3B4A] mb-8 text-center"
            >
              Mūsu Digitālā Mārketinga Pakalpojumi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>
          </section>

          <section aria-labelledby="why-digital-marketing" className="mb-16">
            <h2
              id="why-digital-marketing"
              className="text-3xl font-bold text-[#3D3B4A] mb-8 text-center"
            >
              Kāpēc Izvēlēties Digitālo Mārketingu?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<FiTarget />}
                title="Precīza Mērķauditorijas Sasniegšana"
                description="Digitālais mārketings ļauj jums precīzi mērķēt uz jūsu ideālo klientu, maksimāli palielinot jūsu mārketinga budžeta efektivitāti."
              />
              <FeatureCard
                icon={<FiTrendingUp />}
                title="Izmērāmi Rezultāti"
                description="Ar digitālo mārketingu jūs varat precīzi izmērīt katras kampaņas sniegumu un ROI, ļaujot jums nepārtraukti optimizēt savus centienus."
              />
              <FeatureCard
                icon={<FiUsers />}
                title="Uzlabota Klientu Iesaiste"
                description="Digitālās platformas ļauj jums veidot dziļākas un jēgpilnākas attiecības ar jūsu klientiem, veicinot lojalitāti un atkārtotus pirkumus."
              />
              <FeatureCard
                icon={<FiGlobe />}
                title="Globāla Sasniedzamība"
                description="Digitālais mārketings ļauj jūsu biznesam sasniegt klientus visā pasaulē, paplašinot jūsu potenciālo tirgu."
              />
              <FeatureCard
                icon={<FiBarChart2 />}
                title="Konkurētspējas Priekšrocība"
                description="Efektīva digitālā mārketinga stratēģija var palīdzēt jums izcelties pārpildītā tirgū un apsteigt konkurentus."
              />
              <FeatureCard
                icon={<FiLayout />}
                title="Personalizēta Pieredze"
                description="Digitālais mārketings ļauj jums personalizēt savu vēstījumu un piedāvājumus, uzlabojot klientu pieredzi un palielinot konversijas."
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
              Mūsu Digitālā Mārketinga Process
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
                  Mēs sākam ar rūpīgu jūsu pašreizējās digitālās klātbūtnes un
                  mārketinga centienu analīzi, identificējot stiprās puses un
                  uzlabojamās jomas.
                </p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <span className="bg-[#EEC71B] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                    2
                  </span>
                  Stratēģijas Izstrāde
                </h3>
                <p>
                  Balstoties uz analīzes rezultātiem, mēs izstrādājam pielāgotu
                  digitālā mārketinga stratēģiju, kas atbilst jūsu biznesa
                  mērķiem un mērķauditorijai.
                </p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <span className="bg-[#EEC71B] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                    3
                  </span>
                  Īstenošana
                </h3>
                <p>
                  Mēs realizējam izstrādāto stratēģiju, izmantojot dažādus
                  digitālos kanālus un rīkus, lai maksimāli palielinātu jūsu
                  sasniegto auditoriju un iesaisti.
                </p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <span className="bg-[#EEC71B] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                    4
                  </span>
                  Monitorings un Optimizācija
                </h3>
                <p>
                  Mēs nepārtraukti uzraugām kampaņu sniegumu, analizējam datus
                  un veicam nepieciešamās korekcijas, lai nodrošinātu optimālus
                  rezultātus.
                </p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <span className="bg-[#EEC71B] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                    5
                  </span>
                  Atskaites un Analīze
                </h3>
                <p>
                  Regulāri sniedzam detalizētas atskaites par kampaņu
                  rezultātiem, ROI un ieteikumus turpmākiem uzlabojumiem.
                </p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <span className="bg-[#EEC71B] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                    6
                  </span>
                  Nepārtraukta Pilnveidošana
                </h3>
                <p>
                  Mēs nepārtraukti meklējam jaunas iespējas un inovācijas
                  digitālajā mārketingā, lai nodrošinātu, ka jūsu stratēģija
                  vienmēr ir aktuāla un efektīva.
                </p>
              </div>
            </div>
          </section>

          <section
            aria-labelledby="cta"
            className="mb-16 bg-[#3D3B4A] text-white p-8 rounded-lg"
          >
            <h2 id="cta" className="text-3xl font-bold mb-8 text-center">
              Gatavs Uzlabot Savu Digitālo Klātbūtni?
            </h2>
            <p className="text-xl mb-8 text-center">
              Ļaujiet mums palīdzēt jums sasniegt jaunus augstumus digitālajā
              vidē un pārvērst jūsu tiešsaistes klātbūtni par spēcīgu biznesa
              izaugsmes dzinējspēku.
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
                  {selectedService === null ? (
                    <>
                      <h3 className="text-2xl font-bold mb-4">
                        Sazināties ar Mums
                      </h3>
                      <p className="mb-4">
                        Aizpildiet formu zemāk, un mūsu digitālā mārketinga
                        eksperts sazināsies ar jums 24 stundu laikā, lai
                        apspriestu jūsu projektu.
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
                          <label className="block mb-2" htmlFor="company">
                            Uzņēmums
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            className="w-full p-2 border rounded"
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
                        {selectedService.name}
                      </h3>
                      <p className="text-3xl font-bold text-[#EEC71B] mb-4">
                        €{selectedService.price}
                      </p>
                      <p className="mb-4">
                        {selectedService.detailedDescription}
                      </p>
                      <h4 className="font-bold mb-2">Iekļautie pakalpojumi:</h4>
                      <ul className="mb-6">
                        {selectedService.features.map((feature, index) => (
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

        <JsonLd services={services} />
      </div>
    </>
  );
};

const JsonLd: React.FC<{ services: Service[] }> = ({ services }) => (
  <Script id="json-ld" type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Digitālais Mārketings Latvijā | WebWorks",
      description:
        "WebWorks piedāvā profesionālus digitālā mārketinga pakalpojumus Latvijā. Palieliniet savu tiešsaistes klātbūtni, piesaistiet vairāk klientu un uzlabojiet sava zīmola atpazīstamību ar mūsu ekspertu izstrādātajām digitālā mārketinga stratēģijām.",
      url: "https://www.webworks.lv/digitalais-marketings",
      mainEntity: {
        "@type": "Service",
        name: "WebWorks Digitālā Mārketinga Pakalpojumi",
        description:
          "Profesionāli digitālā mārketinga pakalpojumi, kas palīdz uzņēmumiem uzlabot savu tiešsaistes klātbūtni un piesaistīt vairāk klientu.",
        provider: {
          "@type": "Organization",
          name: "WebWorks",
        },
        areaServed: "Latvija",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Digitālā Mārketinga Pakalpojumi",
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.name,
              description: service.description,
            },
            price: service.price,
            priceCurrency: "EUR",
          })),
        },
      },
    })}
  </Script>
);

export default DigitalaisMarketings;
