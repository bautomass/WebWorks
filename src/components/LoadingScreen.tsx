import React from "react";
import styles from "./LoadingScreen.module.css";

const LoadingScreen: React.FC = () => {
  return (
    <div className={styles.loadingScreen}>
      <div className={styles.spinner}></div>
      <p>Ielādē spēli...</p>
    </div>
  );
};

export default LoadingScreen;
