import React from "react";
import styles from "./MetricCard.module.css";

interface MetricCardProps {
  title: string;
  value: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value }) => {
  return (
    <div className={styles.card}>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.value}>{value}%</p>
    </div>
  );
};

export default MetricCard;
