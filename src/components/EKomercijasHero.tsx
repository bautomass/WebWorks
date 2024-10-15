"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";

import styles from "./EKomercijasHero.module.css";

const products = [
  {
    id: 1,
    name: "Elegants Pulkstenis",
    price: "€129.99",
    discountedPrice: "€99.99",
    image: "/images/watch.svg",
    rating: 4.5,
    discount: true,
    description:
      "Moderns un elegants pulkstenis, kas piešķirs jūsu izskatam īpašu akcentu. Izgatavots no augstas kvalitātes materiāliem.",
  },
  {
    id: 2,
    name: "Modernā Soma",
    price: "€89.99",
    image: "/images/backpack.svg",
    rating: 4.2,
    description:
      "Praktiska un stilīga soma ikdienas lietošanai. Pietiekami ietilpīga, lai tajā ievietotu visas nepieciešamās lietas.",
  },
  {
    id: 3,
    name: "Stilīgas Saulesbrilles",
    price: "€59.99",
    discountedPrice: "€49.99",
    image: "/images/sunglasses.svg",
    rating: 4.7,
    discount: true,
    description:
      "Augstas kvalitātes saulesbrilles ar UV aizsardzību. Piemērotas gan vīriešiem, gan sievietēm.",
  },
  {
    id: 4,
    name: "Ādas Kurpes",
    price: "€149.99",
    image: "/images/shoes.svg",
    rating: 4.8,
    description:
      "Ērtas un izturīgas ādas kurpes, kas lieliski piemērotas gan ikdienai, gan oficiāliem pasākumiem.",
  },
];

const EKomercijasHero: React.FC = () => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) {
        setCurrentProductIndex(
          (prevIndex) => (prevIndex + 1) % products.length
        );
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovering]);

  const handlePrevious = () => {
    setCurrentProductIndex(
      (prevIndex) => (prevIndex - 1 + products.length) % products.length
    );
  };

  const handleNext = () => {
    setCurrentProductIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const renderStars = (rating: number) => {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  };

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <div className={styles.heroContainer}>
      <header className={styles.header}>
        <div className={styles.logo}>E-Komercija</div>
        <nav className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
          <ul>
            <li>
              <a href="#" onClick={() => setMenuOpen(false)}>
                Kategorijas
              </a>
            </li>
            <li>
              <a href="#products" onClick={() => setMenuOpen(false)}>
                Produkti
              </a>
            </li>
            <li>
              <a href="#about" onClick={() => setMenuOpen(false)}>
                Īpašie Piedāvājumi
              </a>
            </li>
            <li>
              <a href="#contact" onClick={() => setMenuOpen(false)}>
                Produkta Atkriešana
              </a>
            </li>
          </ul>
        </nav>
        <div className={styles.cart}>
          <FaShoppingCart className={styles.cartIcon} />
          <div className={styles.cartCount}>{cartCount}</div>
        </div>
        <div
          className={styles.burgerMenu}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          &#9776;
        </div>
      </header>

      <div className={styles.heroContent}>
        <div className={styles.backgroundImageContainer}>
          <Image
            src="/images/e-comm-hero-section-background.svg"
            alt="Background"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className={styles.heroText}>
          <h2>Tavs sapņu e-veikals</h2>
          <p>
            Mēs veidojam izcilus e-komercijas risinājumus, kas pārdod un palīdz
            jūsu biznesam augt
          </p>
          <button className={styles.ctaButton}>SAZINIES AR MUMS</button>
        </div>

        <div
          className={styles.productShowcase}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`${styles.productCard} ${
                index === currentProductIndex ? styles.active : ""
              }`}
            >
              {product.discount && (
                <div className={styles.discountLabel}>Atlaide</div>
              )}
              <div className={styles.productImage}>
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className={styles.productInfo}>
                <h3>{product.name}</h3>
                <p className={styles.productDescription}>
                  {product.description}
                </p>
                <div className={styles.priceContainer}>
                  {product.discount ? (
                    <>
                      <p className={styles.originalPrice}>{product.price}</p>
                      <p className={styles.discountedPrice}>
                        {product.discountedPrice}
                      </p>
                    </>
                  ) : (
                    <p className={styles.price}>{product.price}</p>
                  )}
                </div>
                <div className={styles.rating}>
                  {renderStars(product.rating)}
                </div>
                <div className={styles.buttonGroup}>
                  <button
                    className={styles.actionButtonCart}
                    onClick={addToCart}
                  >
                    Pievienot grozam
                  </button>
                  <button className={styles.actionButtonBuy}>Pirkt</button>
                </div>
              </div>
            </div>
          ))}
          <button className={styles.navButton} onClick={handlePrevious}>
            &lt;
          </button>
          <button className={styles.navButton} onClick={handleNext}>
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default EKomercijasHero;
