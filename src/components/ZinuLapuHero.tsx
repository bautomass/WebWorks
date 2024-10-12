// ZinuLapuHero.tsx

import React, { useState, useEffect } from "react";
import styles from "./ZinuLapuHero.module.css";

const ZinuLapuHero = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeIndex, setActiveIndex] = useState(0);
  const [weatherTemp, setWeatherTemp] = useState(22);
  const [weatherIcon, setWeatherIcon] = useState("☀️");
  const [pollVotes, setPollVotes] = useState({ yes: 0, no: 0 });
  const [userVoted, setUserVoted] = useState(false);

  const breakingNews = [
    "Jaunākās ziņas: Valdība paziņo par jaunu ekonomisko iniciatīvu",
    "Sporta ziņas: Latvijas hokeja izlase gatavojas pasaules čempionātam",
    "Kultūra: Rīgā atklāta starptautiska mākslas izstāde",
    "Tehnoloģijas: Jauns Latvijas jaunuzņēmums piesaista miljonu eiro investīcijas",
  ];

  const menuItems = [
    "Ziņas",
    "Sports",
    "Bizness",
    "Tehnoloģijas",
    "Izklaide",
    "Veselība",
    "Zinātne",
    "Auto",
  ];

  const liveNewsTicker = [
    "Rīgas dome apstiprina jaunu budžetu",
    "Latvijas zinātnieki atklāj jaunu augu sugu",
    "Nacionālā basketbola komanda gatavojas Eiropas čempionātam",
    "Jaunā filma 'Dvēseļu putenis' saņem starptautisku atzinību",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const newsRotation = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % breakingNews.length);
    }, 5000);

    const weatherUpdate = setInterval(() => {
      setWeatherTemp((prev) => prev + Math.floor(Math.random() * 3) - 1);
      setWeatherIcon(["☀️", "🌤️", "☁️", "🌧️"][Math.floor(Math.random() * 4)]);
    }, 30000);

    return () => {
      clearInterval(timer);
      clearInterval(newsRotation);
      clearInterval(weatherUpdate);
    };
  }, []);

  const handleVote = (choice) => {
    if (!userVoted) {
      setPollVotes((prev) => ({ ...prev, [choice]: prev[choice] + 1 }));
      setUserVoted(true);
    }
  };

  return (
    <header className={styles.heroSection}>
      <div className={styles.topBar}>
        <div className={styles.container}>
          <div className={styles.topBarContent}>
            <div className={styles.currentTime}>
              {currentTime.toLocaleTimeString("lv-LV")}
            </div>
            <div className={styles.weather}>
              <span className={styles.weatherIcon}>{weatherIcon}</span>
              <span className={styles.weatherTemp}>{weatherTemp}°C</span>
            </div>
            <div className={styles.socialIcons}>
              <span className={styles.icon}>📘</span>
              <span className={styles.icon}>🐦</span>
              <span className={styles.icon}>📸</span>
              <span className={styles.icon}>📺</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mainHeader}>
        <div className={styles.container}>
          <div className={styles.logoArea}>
            <div className={styles.logo}>ZIŅU PORTĀLS</div>
            <div className={styles.tagline}>Jūsu uzticamais ziņu avots</div>
          </div>
          <div className={styles.searchArea}>
            <input
              type="text"
              placeholder="Meklēt ziņas..."
              className={styles.searchInput}
            />
            <button className={styles.searchButton}>🔍</button>
          </div>
        </div>
      </div>

      <nav className={styles.mainNav}>
        <div className={styles.container}>
          <ul className={styles.menuItems}>
            {menuItems.map((item, index) => (
              <li key={index} className={styles.menuItem}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className={styles.container}>
        <div className={styles.breakingNews}>
          <span className={styles.breakingLabel}>SVARĪGI:</span>
          <p className={styles.breakingText}>{breakingNews[activeIndex]}</p>
        </div>

        <div className={styles.liveNewsTicker}>
          <span className={styles.liveLabel}>TIEŠRAIDE:</span>
          <div className={styles.tickerWrapper}>
            <ul className={styles.ticker}>
              {liveNewsTicker.map((news, index) => (
                <li key={index} className={styles.tickerItem}>
                  {news}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <div className={styles.mainArticle}>
              <div className={styles.articleImage}></div>
              <div className={styles.articleContent}>
                <span className={styles.articleCategory}>GALVENĀS ZIŅAS</span>
                <p className={styles.articleTitle}>
                  Visi izsistie virsraksti un viltīgākās ziņas vienā vietā!
                </p>
                <p className={styles.articleSnippet}>
                  Sākam ar visaktuālāko un interesantāko saturu, kas ne tikai
                  piesaista uzmanību, bet arī veicina tava biznesa izaugsmi. Jo
                  labāk izskatās tava ziņu vietne, jo vairāk cilvēku gribēs
                  uzzināt, ko tu piedāvā!
                </p>
              </div>
            </div>
            <div className={styles.secondaryArticles}>
              <div className={styles.secondaryArticle}>
                <div className={styles.secondaryImage}></div>
                <div className={styles.secondaryContent}>
                  <span className={styles.articleCategory}>JAUNĀKĀS ZIŅAS</span>
                  <p className={styles.secondaryTitle}>Pēdējās aktualitātes</p>
                  <p className={styles.secondarySnippet}>
                    Iegūsti visjaunāko informāciju no pasaules un vietējās ziņu
                    telpas ar mūsu dizainu, kas uzreiz ievelk lasītāju.
                  </p>
                </div>
              </div>
              <div className={styles.secondaryArticle}>
                <div className={styles.secondaryImage}></div>
                <div className={styles.secondaryContent}>
                  <span className={styles.articleCategory}>ANALĪZE</span>
                  <p className={styles.secondaryTitle}>Ekspertu viedokļi</p>
                  <p className={styles.secondarySnippet}>
                    Precīzas un detalizētas analīzes par aktuāliem notikumiem,
                    iepakotas stilīgā un pārskatāmā veidā.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.whyChooseUs}>
              <p className={styles.sectionTitle}>Kāpēc izvēlēties mūs? 🤔</p>
              <ul className={styles.whyList}>
                <li className={styles.whyItem}>
                  <span className={styles.whyIcon}>🎨</span>
                  <div>
                    <strong>Moderni Dizaini:</strong> Mēs izmantojam
                    vismodernākās tehnoloģijas, lai tava ziņu vietne izskatītos
                    tikpat stilīgi kā mūsu reklāmas banneri.
                  </div>
                </li>
                <li className={styles.whyItem}>
                  <span className={styles.whyIcon}>📊</span>
                  <div>
                    <strong>SEO Gudrība:</strong> Ar mūsu izstrādātajām vietnēm
                    tavs SEO rezultāts pacelsies tāpat kā mūsu kafija uzlabos
                    tavu enerģiju!
                  </div>
                </li>
                <li className={styles.whyItem}>
                  <span className={styles.whyIcon}>⚡</span>
                  <div>
                    <strong>Ātrums un Veiktspēja:</strong> Tāpat kā lielākā daļa
                    no mums var ēst picas ātrāk nekā tās pagatavo, mēs
                    nodrošinām ātras un izturīgas vietnes.
                  </div>
                </li>
                <li className={styles.whyItem}>
                  <span className={styles.whyIcon}>👥</span>
                  <div>
                    <strong>Personīga Pieeja:</strong> Mēs uzskatām, ka katrs
                    klients ir unikāls - tāpat kā mūsu mīļākie šokolādes cepumi.
                  </div>
                </li>
              </ul>
            </div>
            <div className={styles.poll}>
              <p className={styles.sectionTitle}>Dienas aptauja</p>
              <p className={styles.pollQuestion}>
                Vai jūs atbalstāt jauno pilsētas attīstības plānu?
              </p>
              <div className={styles.pollOptions}>
                <button
                  className={`${styles.pollButton} ${
                    userVoted ? styles.voted : ""
                  }`}
                  onClick={() => handleVote("yes")}
                  disabled={userVoted}
                >
                  Jā ({pollVotes.yes})
                </button>
                <button
                  className={`${styles.pollButton} ${
                    userVoted ? styles.voted : ""
                  }`}
                  onClick={() => handleVote("no")}
                  disabled={userVoted}
                >
                  Nē ({pollVotes.no})
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.promoBanner}>
          <p className={styles.promoText}>
            🌟 Uztici mums savu nākamo projektu! Veidosim tādas vietnes, kuras
            pat tavi konkurenti vēlēsies kopēt! 🚀
          </p>
          <button className={styles.promoButton}>Uzzināt vairāk</button>
        </div>
      </div>
    </header>
  );
};

export default ZinuLapuHero;

// // ZinuLapuHero.tsx

// import React, { useState, useEffect } from "react";
// import styles from "./ZinuLapuHero.module.css";

// const ZinuLapuHero = () => {
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [weatherTemp, setWeatherTemp] = useState(22);

//   const breakingNews = [
//     "Jaunākās ziņas: Valdība paziņo par jaunu ekonomisko iniciatīvu",
//     "Sporta ziņas: Latvijas hokeja izlase gatavojas pasaules čempionātam",
//     "Kultūra: Rīgā atklāta starptautiska mākslas izstāde",
//     "Tehnoloģijas: Jauns Latvijas jaunuzņēmums piesaista miljonu eiro investīcijas",
//   ];

//   const menuItems = [
//     "Ziņas",
//     "Sports",
//     "Bizness",
//     "Tehnoloģijas",
//     "Izklaide",
//     "Veselība",
//     "Zinātne",
//     "Auto",
//   ];

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);

//     const newsRotation = setInterval(() => {
//       setActiveIndex((prevIndex) => (prevIndex + 1) % breakingNews.length);
//     }, 5000);

//     const weatherUpdate = setInterval(() => {
//       setWeatherTemp((prev) => prev + Math.floor(Math.random() * 3) - 1);
//     }, 30000);

//     return () => {
//       clearInterval(timer);
//       clearInterval(newsRotation);
//       clearInterval(weatherUpdate);
//     };
//   }, []);

//   return (
//     <header className={styles.heroSection}>
//       <div className={styles.topBar}>
//         <div className={styles.container}>
//           <div className={styles.topBarContent}>
//             <div className={styles.currentTime}>
//               {currentTime.toLocaleTimeString("lv-LV")}
//             </div>
//             <div className={styles.weather}>🌡️ Rīga: {weatherTemp}°C</div>
//             <div className={styles.socialIcons}>
//               <span className={styles.icon}>📘</span>
//               <span className={styles.icon}>🐦</span>
//               <span className={styles.icon}>📸</span>
//               <span className={styles.icon}>📺</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className={styles.mainHeader}>
//         <div className={styles.container}>
//           <div className={styles.logoArea}>
//             <div className={styles.logo}>ZIŅU PORTĀLS</div>
//             <div className={styles.tagline}>Jūsu uzticamais ziņu avots</div>
//           </div>
//           <div className={styles.searchArea}>
//             <input
//               type="text"
//               placeholder="Meklēt ziņas..."
//               className={styles.searchInput}
//             />
//             <button className={styles.searchButton}>🔍</button>
//           </div>
//         </div>
//       </div>

//       <nav className={styles.mainNav}>
//         <div className={styles.container}>
//           <ul className={styles.menuItems}>
//             {menuItems.map((item, index) => (
//               <li key={index} className={styles.menuItem}>
//                 {item}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </nav>

//       <div className={styles.container}>
//         <div className={styles.breakingNews}>
//           <span className={styles.breakingLabel}>SVARĪGI:</span>
//           <p className={styles.breakingText}>{breakingNews[activeIndex]}</p>
//         </div>

//         <div className={styles.heroContent}>
//           <div className={styles.heroLeft}>
//             <div className={styles.mainArticle}>
//               <div className={styles.articleImage}></div>
//               <div className={styles.articleContent}>
//                 <span className={styles.articleCategory}>GALVENĀS ZIŅAS</span>
//                 <p className={styles.articleTitle}>
//                   Visi izsistie virsraksti un viltīgākās ziņas vienā vietā!
//                 </p>
//                 <p className={styles.articleSnippet}>
//                   Sākam ar visaktuālāko un interesantāko saturu, kas ne tikai
//                   piesaista uzmanību, bet arī veicina tava biznesa izaugsmi. Jo
//                   labāk izskatās tava ziņu vietne, jo vairāk cilvēku gribēs
//                   uzzināt, ko tu piedāvā!
//                 </p>
//               </div>
//             </div>
//             <div className={styles.secondaryArticles}>
//               <div className={styles.secondaryArticle}>
//                 <div className={styles.secondaryImage}></div>
//                 <div className={styles.secondaryContent}>
//                   <span className={styles.articleCategory}>JAUNĀKĀS ZIŅAS</span>
//                   <p className={styles.secondaryTitle}>Pēdējās aktualitātes</p>
//                   <p className={styles.secondarySnippet}>
//                     Iegūsti visjaunāko informāciju no pasaules un vietējās ziņu
//                     telpas ar mūsu dizainu, kas uzreiz ievelk lasītāju.
//                   </p>
//                 </div>
//               </div>
//               <div className={styles.secondaryArticle}>
//                 <div className={styles.secondaryImage}></div>
//                 <div className={styles.secondaryContent}>
//                   <span className={styles.articleCategory}>ANALĪZE</span>
//                   <p className={styles.secondaryTitle}>Ekspertu viedokļi</p>
//                   <p className={styles.secondarySnippet}>
//                     Precīzas un detalizētas analīzes par aktuāliem notikumiem,
//                     iepakotas stilīgā un pārskatāmā veidā.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className={styles.heroRight}>
//             <div className={styles.whyChooseUs}>
//               <p className={styles.sectionTitle}>Kāpēc izvēlēties mūs? 🤔</p>
//               <ul className={styles.whyList}>
//                 <li className={styles.whyItem}>
//                   <span className={styles.whyIcon}>🎨</span>
//                   <div>
//                     <strong>Moderni Dizaini:</strong> Mēs izmantojam
//                     vismodernākās tehnoloģijas, lai tava ziņu vietne izskatītos
//                     tikpat stilīgi kā mūsu reklāmas banneri.
//                   </div>
//                 </li>
//                 <li className={styles.whyItem}>
//                   <span className={styles.whyIcon}>📊</span>
//                   <div>
//                     <strong>SEO Gudrība:</strong> Ar mūsu izstrādātajām vietnēm
//                     tavs SEO rezultāts pacelsies tāpat kā mūsu kafija uzlabos
//                     tavu enerģiju!
//                   </div>
//                 </li>
//                 <li className={styles.whyItem}>
//                   <span className={styles.whyIcon}>⚡</span>
//                   <div>
//                     <strong>Ātrums un Veiktspēja:</strong> Tāpat kā lielākā daļa
//                     no mums var ēst picas ātrāk nekā tās pagatavo, mēs
//                     nodrošinām ātras un izturīgas vietnes.
//                   </div>
//                 </li>
//                 <li className={styles.whyItem}>
//                   <span className={styles.whyIcon}>👥</span>
//                   <div>
//                     <strong>Personīga Pieeja:</strong> Mēs uzskatām, ka katrs
//                     klients ir unikāls - tāpat kā mūsu mīļākie šokolādes cepumi.
//                   </div>
//                 </li>
//               </ul>
//             </div>
//             <div className={styles.trendingTopics}>
//               <p className={styles.sectionTitle}>Populārākās tēmas</p>
//               <div className={styles.topicTags}>
//                 <span className={styles.topicTag}>#Politika</span>
//                 <span className={styles.topicTag}>#Ekonomika</span>
//                 <span className={styles.topicTag}>#Sports</span>
//                 <span className={styles.topicTag}>#Veselība</span>
//                 <span className={styles.topicTag}>#Izglītība</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className={styles.promoBanner}>
//           <p className={styles.promoText}>
//             🌟 Uztici mums savu nākamo projektu! Veidosim tādas vietnes, kuras
//             pat tavi konkurenti vēlēsies kopēt! 🚀
//           </p>
//           <button className={styles.promoButton}>Uzzināt vairāk</button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default ZinuLapuHero;
