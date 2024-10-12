"use client";
import React, { useEffect, useRef } from "react";
import styles from "./doContainer.module.css";

const DoContainer = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const steps = container.querySelectorAll(`.${styles.step}`);
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("class", styles.flowAnimation);
      container.appendChild(svg);

      const sequence = [0, 1, 3, 2, 0]; // Logical sequence of steps, closing the loop
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      let d = "";

      sequence.forEach((currentIndex, index) => {
        const start = steps[currentIndex].getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const x = start.left + start.width / 2 - containerRect.left;
        const y = start.top + start.height / 2 - containerRect.top;

        if (index === 0) {
          d += `M${x},${y}`;
        } else {
          d += ` L${x},${y}`;
        }
      });

      path.setAttribute("d", d);
      path.setAttribute("class", styles.flowLine);
      svg.appendChild(path);

      // Add intersection observer for animation
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              steps.forEach((step, index) => {
                step.style.animation = `${styles.slideIn} 0.5s ease-out ${
                  index * 0.2
                }s forwards`;
              });
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(container);
    }
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>
        Mājaslapas Izstrādes Process: Kā Mēs To Darām
      </h2>
      <div className={styles.doContainer} ref={containerRef}>
        <div className={`${styles.step} ${styles.step1}`}>
          <div className={styles.content}>
            <h3>1. Posms: Klienta vajadzību apspriešana</h3>
            <p>
              Mēs sākam ar detalizētu sarunu, lai izprastu jūsu vajadzības un
              mērķus. Šajā posmā mēs noskaidrojam, ko jūs vēlaties sasniegt ar
              savu mājaslapu un kādi ir jūsu galvenie mērķi.
            </p>
          </div>
          <div className={styles.arrowRight}></div>
        </div>
        <div className={`${styles.step} ${styles.step2}`}>
          <div className={styles.content}>
            <h3>2. Posms: Dizaina izstrāde</h3>
            <p>
              Mūsu dizaineri veido sākotnējo konceptu jūsu mājaslapai. Mēs
              izstrādājam vairākus dizaina variantus un pielāgojam tos,
              pamatojoties uz jūsu atsauksmēm.
            </p>
          </div>
          <div className={styles.arrowDown}></div>
        </div>
        <div className={`${styles.step} ${styles.step4}`}>
          <div className={styles.content}>
            <h3>4. Posms: Vienošanās un līguma noslēgšana</h3>
            <p>
              Pēc dizaina apstiprināšanas mēs pārrunājam gala nosacījumus un
              noslēdzam līgumu. Šajā posmā mēs pārliecināmies, ka viss ir gatavs
              mājaslapas izstrādei un ieviešanai.
            </p>
          </div>
          <div className={styles.arrowUp}></div>
        </div>
        <div className={`${styles.step} ${styles.step3}`}>
          <div className={styles.content}>
            <h3>3. Posms: Koncepta izstrāde un precizēšana</h3>
            <p>
              Pēc sākotnējā dizaina izstrādes mēs veicam finetuning, lai
              nodrošinātu, ka dizains pilnībā atbilst jūsu prasībām un vēlmēm.
            </p>
          </div>
          <div className={styles.arrowLeft}></div>
        </div>
      </div>
    </div>
  );
};

export default DoContainer;
