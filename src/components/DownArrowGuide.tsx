import React from "react";
import styles from "./downArrowGuide.module.css";

const DownArrowGuide = () => {
  return (
    <div className={styles.container}>
      <div className={styles.arrowContainer}>
        <div className={styles.arrow}></div>
        <div className={styles.arrow}></div>
        <div className={styles.arrow}></div>
        <div className={styles.arrow}></div>
        <div className={styles.arrow}></div>
      </div>
    </div>
  );
};

export default DownArrowGuide;
