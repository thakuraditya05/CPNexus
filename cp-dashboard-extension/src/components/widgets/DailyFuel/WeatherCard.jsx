import React from 'react';
import styles from './DailyFuel.module.css';

const WeatherCard = ({ icon, value, label, colorClass }) => {
  return (
    <div className={styles.ibCard}>
      <div className={styles.ibcIcon}>{icon}</div>
      {/* Dynamic color class pass kar rahe hain */}
      <div className={`${styles.ibcVal} ${colorClass ? styles[colorClass] : ''}`}>
        {value}
      </div>
      <div className={ `${styles.ibcLbl} ` }>{label}</div>
    </div>
  );
};

export default WeatherCard;