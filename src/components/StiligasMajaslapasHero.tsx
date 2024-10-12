import React from "react";
import styles from "./StiligasMajaslapasHero.module.css";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaSearch,
} from "react-icons/fa";

const StiligasMajaslapasHero = () => {
  return (
    <div className={styles.heroContainer}>
      <header className={styles.header}>
        <div className={styles.logo}>Stilīgas Mājaslapas</div>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Meklēt..."
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>
            <FaSearch />
          </button>
        </div>
      </header>
      <div className={styles.heroContent}>
        <nav className={styles.nav}>
          <ul>
            <li>
              <a href="#home">Sākums</a>
            </li>
            <li>
              <a href="#services">Pakalpojumi</a>
            </li>
            <li>
              <a href="#portfolio">Portfolio</a>
            </li>
            <li>
              <a href="#contact">Kontakti</a>
            </li>
          </ul>
          <div className={styles.socialIcons}>
            <a href="#" className={styles.socialIcon}>
              <FaFacebookF />
            </a>
            <a href="#" className={styles.socialIcon}>
              <FaTwitter />
            </a>
            <a href="#" className={styles.socialIcon}>
              <FaLinkedinIn />
            </a>
            <a href="#" className={styles.socialIcon}>
              <FaInstagram />
            </a>
          </div>
          <div className={styles.contactInfo}>
            <p>Tālrunis: +371 12345678</p>
            <p>E-pasts: info@stiligasmajaslapas.lv</p>
            <p>Adrese: Rīga, LV-1001</p>
          </div>
        </nav>
        <div className={styles.imageContainer}>
          <img
            src="/images/customer-website-design-hero.svg"
            alt="Hero Background"
            className={styles.heroImage}
          />
        </div>
        <div className={styles.featureCardsContainer}>
          <div className={styles.card}>
            <h3>Unikāls Dizains</h3>
            <p>
              Katra mājaslapa tiek veidota ar individuālu pieeju un unikālu
              dizainu.
            </p>
            <button className={styles.ctaButton}>Uzzināt Vairāk</button>
          </div>
          <div className={styles.card}>
            <h3>SEO Optimizācija</h3>
            <p>
              Mūsu mājaslapas ir SEO optimizētas, lai nodrošinātu labākus
              rezultātus meklētājprogrammās.
            </p>
            <button className={styles.ctaButton}>Uzzināt Vairāk</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StiligasMajaslapasHero;
