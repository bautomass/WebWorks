import React, { useState, useEffect } from "react";
import styles from "./PortfolioHero.module.css";
import {
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaHome,
  FaImage,
  FaUser,
  FaEnvelope,
} from "react-icons/fa";

const ArtisticPortfolio: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "gallery", "about", "contact"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.portfolioContainer}>
      <nav
        className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}
        onMouseEnter={() => setIsSidebarOpen(true)}
        onMouseLeave={() => setIsSidebarOpen(false)}
      >
        <div className={styles.logo}>@PortfolioWebsite</div>
        <ul className={styles.navLinks}>
          {["home", "gallery", "about", "contact"].map((section) => (
            <li
              key={section}
              className={activeSection === section ? styles.active : ""}
            >
              {section === "home" && <FaHome className={styles.icon} />}
              {section === "gallery" && <FaImage className={styles.icon} />}
              {section === "about" && <FaUser className={styles.icon} />}
              {section === "contact" && <FaEnvelope className={styles.icon} />}
              <a href={`#${section}`}>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            </li>
          ))}
        </ul>
        <div className={styles.socialIcons}>
          <FaInstagram />
          <FaTwitter />
          <FaFacebookF />
        </div>
      </nav>
      <main className={styles.content}>
        <header className={styles.header}>
          <div className={styles.hashtags}>
            <span>#World</span>
            <span>#Art</span>
            <span>#Day</span>
          </div>
        </header>
        <section id="home" className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>WORLD</h1>
            <h2 className={styles.subtitle}>ART DAY</h2>
            <p className={styles.description}>
              Come and enliven the art exhibitions and festivals organized by
              the Borcelle art community.
            </p>
            <div className={styles.date}>
              <span>april 15</span>
              <span>2025</span>
            </div>
          </div>
          <div className={styles.artworks}>
            <div className={styles.artwork}>
              <img src="/images/artwork-1.svg" alt="Artwork 1" />
            </div>
            <div className={styles.artwork}>
              <img src="/images/artwork-2.svg" alt="Artwork 2" />
            </div>
            <div className={styles.artwork}>
              <img src="/images/artwork-3.svg" alt="Artwork 3" />
            </div>
          </div>
        </section>
        <section id="gallery" className={styles.seoSection}>
          <h2>Profesionāla Portfolio Vietnes Izstrāde</h2>
          <p>
            Mēs piedāvājam augstākās kvalitātes portfolio vietņu izstrādi, kas
            palīdzēs jums izcelties digitālajā pasaulē. Mūsu risinājumi ir
            pielāgoti jūsu unikālajām vajadzībām, nodrošinot:
          </p>
          <ul>
            <li>Modernas un responsīvas dizaina tendences</li>
            <li>Optimizāciju meklētājprogrammām (SEO)</li>
            <li>Ātru ielādes laiku un nevainojamu veiktspēju</li>
            <li>Integrāciju ar sociālajiem medijiem</li>
            <li>Vieglu satura pārvaldību</li>
          </ul>
          <p>
            Uzticiet savu digitālo klātbūtni profesionāļiem un ļaujiet saviem
            darbiem spīdēt tiešsaistē. Sazinieties ar mums jau šodien, lai sāktu
            sava izcilā portfolio ceļojumu!
          </p>
        </section>
      </main>
    </div>
  );
};

export default ArtisticPortfolio;

// import React, { useState } from "react";
// import styles from "./PortfolioHero.module.css";
// import {
//   FaInstagram,
//   FaTwitter,
//   FaFacebookF,
//   FaHome,
//   FaImage,
//   FaUser,
//   FaEnvelope,
// } from "react-icons/fa";

// const ArtisticPortfolio: React.FC = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   return (
//     <div className={styles.portfolioContainer}>
//       <nav
//         className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}
//         onMouseEnter={() => setIsSidebarOpen(true)}
//         onMouseLeave={() => setIsSidebarOpen(false)}
//       >
//         <div className={styles.logo}>@PortfolioWebsite</div>
//         <ul className={styles.navLinks}>
//           <li>
//             <FaHome className={styles.icon} />
//             <a href="#home">Home</a>
//           </li>
//           <li>
//             <FaImage className={styles.icon} />
//             <a href="#gallery">Gallery</a>
//           </li>
//           <li>
//             <FaUser className={styles.icon} />
//             <a href="#about">About</a>
//           </li>
//           <li>
//             <FaEnvelope className={styles.icon} />
//             <a href="#contact">Contact</a>
//           </li>
//         </ul>
//         <div className={styles.socialIcons}>
//           <FaInstagram />
//           <FaTwitter />
//           <FaFacebookF />
//         </div>
//       </nav>
//       <main className={styles.content}>
//         <header className={styles.header}>
//           <div className={styles.hashtags}>
//             <span>#World</span>
//             <span>#Art</span>
//             <span>#Day</span>
//           </div>
//         </header>
//         <section className={styles.hero}>
//           <div className={styles.heroContent}>
//             <h1 className={styles.title}>WORLD</h1>
//             <h2 className={styles.subtitle}>ART DAY</h2>
//             <p className={styles.description}>
//               Come and enliven the art exhibitions and festivals organized by
//               the Borcelle art community.
//             </p>
//             <div className={styles.date}>
//               <span>april 15</span>
//               <span>2025</span>
//             </div>
//           </div>
//           <div className={styles.artworks}>
//             <div className={styles.artwork}>
//               <img src="/images/artwork-1.svg" alt="Artwork 1" />
//             </div>
//             <div className={styles.artwork}>
//               <img src="/images/artwork-2.svg" alt="Artwork 2" />
//             </div>
//             <div className={styles.artwork}>
//               <img src="/images/artwork-3.svg" alt="Artwork 3" />
//             </div>
//           </div>
//         </section>
//         <section className={styles.seoSection}>
//           <h2>Profesionāla Portfolio Vietnes Izstrāde</h2>
//           <p>
//             Mēs piedāvājam augstākās kvalitātes portfolio vietņu izstrādi, kas
//             palīdzēs jums izcelties digitālajā pasaulē. Mūsu risinājumi ir
//             pielāgoti jūsu unikālajām vajadzībām, nodrošinot:
//           </p>
//           <ul>
//             <li>Modernas un responsīvas dizaina tendences</li>
//             <li>Optimizāciju meklētājprogrammām (SEO)</li>
//             <li>Ātru ielādes laiku un nevainojamu veiktspēju</li>
//             <li>Integrāciju ar sociālajiem medijiem</li>
//             <li>Vieglu satura pārvaldību</li>
//           </ul>
//           <p>
//             Uzticiet savu digitālo klātbūtni profesionāļiem un ļaujiet saviem
//             darbiem spīdēt tiešsaistē. Sazinieties ar mums jau šodien, lai sāktu
//             sava izcilā portfolio ceļojumu!
//           </p>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default ArtisticPortfolio;
