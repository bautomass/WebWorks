import React, { useState, useEffect, useRef } from "react";
import styles from "./IzklaidesHero.module.css";

const IzklaidesHero: React.FC = () => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [recommendation, setRecommendation] = useState("");
  const particlesRef = useRef<HTMLDivElement>(null);
  const categories = ["Filmas", "TV Šovi", "Mūzika", "Spēles"];

  const featuredContent = [
    { title: "Oppenheimers", category: "Filmas", rating: "8.9" },
    { title: "Stranger Things", category: "TV Šovi", rating: "8.7" },
    { title: "Ed Sheeran - Shape of You", category: "Mūzika", rating: "4.8" },
    {
      title: "The Legend of Zelda: Tears of the Kingdom",
      category: "Spēles",
      rating: "9.5",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCategory((prev) => (prev + 1) % categories.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (particlesRef.current) {
      createParticles();
    }
  }, []);

  const createParticles = () => {
    const particlesContainer = particlesRef.current;
    if (!particlesContainer) return;

    for (let i = 0; i < 100; i++) {
      const particle = document.createElement("div");
      particle.className = styles.particle;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
      particlesContainer.appendChild(particle);
    }
  };

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const getPersonalizedRecommendation = () => {
    const recommendations = [
      "Pamatojoties uz jūsu skatīšanās vēsturi, mēs domājam, ka jums patiks 'The Mandalorian'!",
      "Tā kā jums patīk zinātniskā fantastika, apskatiet 'Dune: Part Two' kinoteātros jau tagad!",
      "Prāta spēļu cienītāji ir sajūsmā par 'Baba Is You'. Izmēģiniet to!",
      "Ja jums patika Ed Sheeran, jums varētu patikt jaunākais Imagine Dragons albums.",
    ];
    setRecommendation(
      recommendations[Math.floor(Math.random() * recommendations.length)]
    );
  };

  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroContent}>
        <nav className={styles.navbar}>
          <div className={styles.logo}>Izklaides Portāls</div>
          <div className={styles.navLinks}>
            {categories.map((category) => (
              <span key={category} className={styles.navLink}>
                {category}
              </span>
            ))}
          </div>
          <button className={styles.loginButton} onClick={toggleLoginModal}>
            Ienākt
          </button>
        </nav>

        <div className={styles.heroText}>
          <div className={styles.heroTitle}>Tavs Izklaides Portāls</div>
          <div className={styles.heroSubtitle}>
            Atklāj Jaunāko un Labāko{" "}
            <span className={styles.categoryHighlight}>
              {categories[currentCategory]}
            </span>
          </div>
          <div className={styles.heroDescription}>
            Ienirstiet aizraujošā izklaides pasaulē ar mūsu plašo saturu un
            personalizētajiem ieteikumiem.
          </div>
        </div>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Meklēt..."
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>Meklēt</button>
        </div>

        <div className={styles.featuredContent}>
          <div className={styles.featuredTitle}>Populārākais Šobrīd</div>
          <div className={styles.featuredItems}>
            {featuredContent.map((item, index) => (
              <div key={index} className={styles.featuredItem}>
                <div className={styles.itemOverlay}>
                  <div className={styles.itemTitle}>{item.title}</div>
                  <div className={styles.itemCategory}>{item.category}</div>
                  <div className={styles.itemRating}>
                    Vērtējums: {item.rating}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.recommendationContainer}>
          <button
            className={styles.recommendationButton}
            onClick={getPersonalizedRecommendation}
          >
            Saņemt Personalizētu Ieteikumu
          </button>
          {recommendation && (
            <div className={styles.recommendationText}>{recommendation}</div>
          )}
        </div>

        <div className={styles.callToAction}>
          <button className={styles.ctaButton}>Izmēģini Bezmaksas</button>
          <div className={styles.ctaText}>
            Pievienojies šodien un saņem 30 dienu bezmaksas izmēģinājumu!
          </div>
        </div>
      </div>

      {isLoginModalOpen && (
        <div className={styles.loginModal}>
          <div className={styles.loginModalContent}>
            <button className={styles.closeButton} onClick={toggleLoginModal}>
              &times;
            </button>
            <h2>Ienākt</h2>
            <input
              type="email"
              placeholder="E-pasts"
              className={styles.loginInput}
            />
            <input
              type="password"
              placeholder="Parole"
              className={styles.loginInput}
            />
            <button className={styles.loginSubmitButton}>Ienākt</button>
            <div className={styles.forgotPassword}>Aizmirsi paroli?</div>
          </div>
        </div>
      )}

      <div className={styles.heroBackground} ref={particlesRef}></div>
    </div>
  );
};

export default IzklaidesHero;