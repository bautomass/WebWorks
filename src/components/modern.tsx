"use client";
import React, { useState, useEffect } from "react";
import TicTacToe from "./TicTacToe";
import LoadingScreen from "./LoadingScreen";
import styles from "./Modern.module.css";

const Modern: React.FC = () => {
  const [playerName, setPlayerName] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [gamesWon, setGamesWon] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsPlaying(true);
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleWin = () => {
    const newGamesWon = gamesWon + 1;
    setGamesWon(newGamesWon);
    if (newGamesWon >= 3) {
      setIsLoading(true);
      setTimeout(() => {
        setShowContent(true);
        setIsLoading(false);
      }, 1000);
    } else {
      setIsPlaying(false);
    }
  };

  const handleDraw = () => {
    setIsPlaying(false);
  };

  const handleLose = () => {
    setIsPlaying(false);
  };

  const seoContent = [
    {
      title: "Atslēgvārdu izpēte",
      content:
        "Identificējiet vērtīgus atslēgvārdus, lai efektīvi sasniegtu savu mērķauditoriju un uzlabotu jūsu vietnes redzamību meklētājprogrammās. Analizējiet konkurentu atslēgvārdus un izstrādājiet stratēģijas, lai pārsniegtu viņu pozīcijas.",
    },
    {
      title: "Lapas optimizācija",
      content:
        "Optimizējiet saturu, meta tagus un HTML struktūru, lai uzlabotu jūsu vietnes sniegumu meklētājprogrammās. Pārliecinieties, ka jūsu lapas ielādes ātrums ir optimizēts un jūsu vietne ir mobilajām ierīcēm draudzīga.",
    },
    {
      title: "Satura stratēģija",
      content:
        "Izveidojiet vērtīgu un atbilstošu saturu, kas piesaista un iesaista jūsu mērķauditoriju. Regulāri atjauniniet savu saturu, lai saglabātu auditorijas interesi un uzturētu augstu meklēšanas klasifikāciju.",
    },
    {
      title: "Saišu veidošana",
      content:
        "Attīstiet spēcīgu atpakaļsaišu profilu, lai palielinātu jūsu vietnes autoritāti. Izveidojiet saiknes ar uzticamām un augsta ranga vietnēm, lai uzlabotu savu domēna autoritāti un uzticamību.",
    },
    {
      title: "Tehniskais SEO",
      content:
        "Nodrošiniet, ka jūsu vietnes tehniskie aspekti ir optimizēti meklētājprogrammu rāpuļprogrammām, ieskaitot lapas ielādes ātrumu un drošību. Izmantojiet strukturētus datus, lai palīdzētu meklētājprogrammām labāk saprast jūsu saturu.",
    },
  ];

  useEffect(() => {
    const elements = document.querySelectorAll(`.${styles.seoItem}`);
    elements.forEach((el, index) => {
      if (el instanceof HTMLElement) {
        el.style.animation = `slideIn 0.5s ease-in-out ${
          index * 0.1
        }s forwards`;
      }
    });
  }, [showContent]);

  const toggleTutorial = () => {
    setShowTutorial(!showTutorial);
  };

  return (
    <div className={styles.container}>
      {isLoading && <LoadingScreen />}
      {!isPlaying && !showContent ? (
        <div className={styles.welcomeSection}>
          <h2>Sveiki! Spēlēsim Tic-Tac-Toe?</h2>
          <form onSubmit={handleSubmit} className={styles.inputForm}>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Ievadi savu vārdu"
              className={styles.inputField}
            />
            <button type="submit" className={styles.submitButton}>
              Sākt spēli
            </button>
          </form>
          {gamesWon > 0 && (
            <p className={styles.gamesWonInfo}>
              Tu esi uzvarējis {gamesWon} reizi(-es). Vēl {3 - gamesWon}{" "}
              uzvara(-as) līdz SEO padomiem!
            </p>
          )}
          <button onClick={toggleTutorial} className={styles.tutorialButton}>
            {showTutorial ? "Aizvērt pamācību" : "Parādīt pamācību"}
          </button>
          {showTutorial && (
            <div className={styles.tutorial}>
              <h3>Kā spēlēt Tic-Tac-Toe:</h3>
              <ol>
                <li>Spēlētāji pēc kārtas liek X vai O uz 3x3 režģa.</li>
                <li>
                  Mērķis ir iegūt trīs X vai O vienā rindā, kolonnā vai pa
                  diagonāli.
                </li>
                <li>Pirmais spēlētājs, kurš to izdara, uzvar.</li>
                <li>
                  Ja visi lauciņi ir aizpildīti un neviens nav uzvarējis, spēle
                  beidzas ar neizšķirtu.
                </li>
              </ol>
            </div>
          )}
        </div>
      ) : (
        <>
          {!showContent && (
            <TicTacToe
              playerName={playerName}
              onWin={handleWin}
              onDraw={handleDraw}
              onLose={handleLose}
              onBackToMenu={() => setIsPlaying(false)}
            />
          )}
          {showContent && (
            <div className={styles.content}>
              <h2 className={styles.mainTitle}>
                SEO Stratēģijas mūsdienīgām mājaslapām
              </h2>
              <div className={styles.seoGrid}>
                {seoContent.map((item, index) => (
                  <div key={index} className={styles.seoItem}>
                    <h3>{item.title}</h3>
                    <p>{item.content}</p>
                    <div className={styles.decorativeElement}></div>
                  </div>
                ))}
              </div>
              <button className={styles.learnMoreButton}>Uzzināt vairāk</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Modern;

// "use client";
// import React, { useState, useEffect } from "react";
// import TicTacToe from "./TicTacToe";
// import LoadingScreen from "./LoadingScreen";
// import styles from "./Modern.module.css";

// const Modern: React.FC = () => {
//   const [playerName, setPlayerName] = useState("");
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [showContent, setShowContent] = useState(false);
//   const [gamesWon, setGamesWon] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showTutorial, setShowTutorial] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (playerName.trim()) {
//       setIsLoading(true);
//       setTimeout(() => {
//         setIsPlaying(true);
//         setIsLoading(false);
//       }, 1000);
//     }
//   };

//   const handleWin = () => {
//     const newGamesWon = gamesWon + 1;
//     setGamesWon(newGamesWon);
//     if (newGamesWon >= 3) {
//       setIsLoading(true);
//       setTimeout(() => {
//         setShowContent(true);
//         setIsLoading(false);
//       }, 1000);
//     } else {
//       setIsPlaying(false);
//     }
//   };

//   const seoContent = [
//     {
//       title: "Atslēgvārdu izpēte",
//       content:
//         "Identificējiet vērtīgus atslēgvārdus, lai efektīvi sasniegtu savu mērķauditoriju un uzlabotu jūsu vietnes redzamību meklētājprogrammās. Analizējiet konkurentu atslēgvārdus un izstrādājiet stratēģijas, lai pārsniegtu viņu pozīcijas.",
//     },
//     {
//       title: "Lapas optimizācija",
//       content:
//         "Optimizējiet saturu, meta tagus un HTML struktūru, lai uzlabotu jūsu vietnes sniegumu meklētājprogrammās. Pārliecinieties, ka jūsu lapas ielādes ātrums ir optimizēts un jūsu vietne ir mobilajām ierīcēm draudzīga.",
//     },
//     {
//       title: "Satura stratēģija",
//       content:
//         "Izveidojiet vērtīgu un atbilstošu saturu, kas piesaista un iesaista jūsu mērķauditoriju. Regulāri atjauniniet savu saturu, lai saglabātu auditorijas interesi un uzturētu augstu meklēšanas klasifikāciju.",
//     },
//     {
//       title: "Saišu veidošana",
//       content:
//         "Attīstiet spēcīgu atpakaļsaišu profilu, lai palielinātu jūsu vietnes autoritāti. Izveidojiet saiknes ar uzticamām un augsta ranga vietnēm, lai uzlabotu savu domēna autoritāti un uzticamību.",
//     },
//     {
//       title: "Tehniskais SEO",
//       content:
//         "Nodrošiniet, ka jūsu vietnes tehniskie aspekti ir optimizēti meklētājprogrammu rāpuļprogrammām, ieskaitot lapas ielādes ātrumu un drošību. Izmantojiet strukturētus datus, lai palīdzētu meklētājprogrammām labāk saprast jūsu saturu.",
//     },
//   ];

//   useEffect(() => {
//     const elements = document.querySelectorAll(`.${styles.seoItem}`);
//     elements.forEach((el, index) => {
//       if (el instanceof HTMLElement) {
//         el.style.animation = `slideIn 0.5s ease-in-out ${
//           index * 0.1
//         }s forwards`;
//       }
//     });
//   }, [showContent]);

//   const toggleTutorial = () => {
//     setShowTutorial(!showTutorial);
//   };

//   return (
//     <div className={styles.container}>
//       {isLoading && <LoadingScreen />}
//       {!isPlaying && !showContent ? (
//         <div className={styles.welcomeSection}>
//           <h2>Sveiki! Spēlēsim Tic-Tac-Toe?</h2>
//           <form onSubmit={handleSubmit} className={styles.inputForm}>
//             <input
//               type="text"
//               value={playerName}
//               onChange={(e) => setPlayerName(e.target.value)}
//               placeholder="Ievadi savu vārdu"
//               className={styles.inputField}
//             />
//             <button type="submit" className={styles.submitButton}>
//               Sākt spēli
//             </button>
//           </form>
//           {gamesWon > 0 && (
//             <p className={styles.gamesWonInfo}>
//               Tu esi uzvarējis {gamesWon} reizi(-es). Vēl {3 - gamesWon}{" "}
//               uzvara(-as) līdz SEO padomiem!
//             </p>
//           )}
//           <button onClick={toggleTutorial} className={styles.tutorialButton}>
//             {showTutorial ? "Aizvērt pamācību" : "Parādīt pamācību"}
//           </button>
//           {showTutorial && (
//             <div className={styles.tutorial}>
//               <h3>Kā spēlēt Tic-Tac-Toe:</h3>
//               <ol>
//                 <li>Spēlētāji pēc kārtas liek X vai O uz 3x3 režģa.</li>
//                 <li>
//                   Mērķis ir iegūt trīs X vai O vienā rindā, kolonnā vai pa
//                   diagonāli.
//                 </li>
//                 <li>Pirmais spēlētājs, kurš to izdara, uzvar.</li>
//                 <li>
//                   Ja visi lauciņi ir aizpildīti un neviens nav uzvarējis, spēle
//                   beidzas ar neizšķirtu.
//                 </li>
//               </ol>
//             </div>
//           )}
//         </div>
//       ) : (
//         <>
//           {!showContent && (
//             <TicTacToe
//               playerName={playerName}
//               onWin={handleWin}
//               onBackToMenu={() => setIsPlaying(false)}
//             />
//           )}
//           {showContent && (
//             <div className={styles.content}>
//               <h2 className={styles.mainTitle}>
//                 SEO Stratēģijas mūsdienīgām mājaslapām
//               </h2>
//               <div className={styles.seoGrid}>
//                 {seoContent.map((item, index) => (
//                   <div key={index} className={styles.seoItem}>
//                     <h3>{item.title}</h3>
//                     <p>{item.content}</p>
//                     <div className={styles.decorativeElement}></div>
//                   </div>
//                 ))}
//               </div>
//               <button className={styles.learnMoreButton}>Uzzināt vairāk</button>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Modern;

// "use client";
// import React, { useState, useEffect } from "react";
// import TicTacToe from "./TicTacToe";
// import styles from "./Modern.module.css";

// const Modern: React.FC = () => {
//   const [playerName, setPlayerName] = useState("");
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [showContent, setShowContent] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (playerName.trim()) {
//       setIsPlaying(true);
//     }
//   };

//   const handleWin = () => {
//     setShowContent(true);
//   };

//   const seoContent = [
//     {
//       title: "Atslēgvārdu izpēte",
//       content:
//         "Identificējiet vērtīgus atslēgvārdus, lai efektīvi sasniegtu savu mērķauditoriju un uzlabotu jūsu vietnes redzamību meklētājprogrammās. Analizējiet konkurentu atslēgvārdus un izstrādājiet stratēģijas, lai pārsniegtu viņu pozīcijas.",
//     },
//     {
//       title: "Lapas optimizācija",
//       content:
//         "Optimizējiet saturu, meta tagus un HTML struktūru, lai uzlabotu jūsu vietnes sniegumu meklētājprogrammās. Pārliecinieties, ka jūsu lapas ielādes ātrums ir optimizēts un jūsu vietne ir mobilajām ierīcēm draudzīga.",
//     },
//     {
//       title: "Satura stratēģija",
//       content:
//         "Izveidojiet vērtīgu un atbilstošu saturu, kas piesaista un iesaista jūsu mērķauditoriju. Regulāri atjauniniet savu saturu, lai saglabātu auditorijas interesi un uzturētu augstu meklēšanas klasifikāciju.",
//     },
//     {
//       title: "Saišu veidošana",
//       content:
//         "Attīstiet spēcīgu atpakaļsaišu profilu, lai palielinātu jūsu vietnes autoritāti. Izveidojiet saiknes ar uzticamām un augsta ranga vietnēm, lai uzlabotu savu domēna autoritāti un uzticamību.",
//     },
//     {
//       title: "Tehniskais SEO",
//       content:
//         "Nodrošiniet, ka jūsu vietnes tehniskie aspekti ir optimizēti meklētājprogrammu rāpuļprogrammām, ieskaitot lapas ielādes ātrumu un drošību. Izmantojiet strukturētus datus, lai palīdzētu meklētājprogrammām labāk saprast jūsu saturu.",
//     },
//   ];

//   useEffect(() => {
//     const elements = document.querySelectorAll(`.${styles.seoItem}`);
//     elements.forEach((el, index) => {
//       if (el instanceof HTMLElement) {
//         el.style.animation = `slideIn 0.5s ease-in-out ${
//           index * 0.1
//         }s forwards`;
//       }
//     });
//   }, [showContent]);

//   return (
//     <div className={styles.container}>
//       {!isPlaying ? (
//         <form onSubmit={handleSubmit} className={styles.inputForm}>
//           <input
//             type="text"
//             value={playerName}
//             onChange={(e) => setPlayerName(e.target.value)}
//             placeholder="Ievadi savu vārdu"
//             className={styles.inputField}
//           />
//           <button type="submit" className={styles.submitButton}>
//             Sākt spēli
//           </button>
//         </form>
//       ) : (
//         <>
//           {!showContent && (
//             <TicTacToe playerName={playerName} onWin={handleWin} />
//           )}
//           {showContent && (
//             <div className={styles.content}>
//               <h2 className={styles.mainTitle}>
//                 SEO Stratēģijas mūsdienīgām mājaslapām
//               </h2>
//               <div className={styles.seoGrid}>
//                 {seoContent.map((item, index) => (
//                   <div key={index} className={styles.seoItem}>
//                     <h3>{item.title}</h3>
//                     <p>{item.content}</p>
//                     <div className={styles.decorativeElement}></div>
//                   </div>
//                 ))}
//               </div>
//               <button className={styles.learnMoreButton}>Uzzināt vairāk</button>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Modern;
