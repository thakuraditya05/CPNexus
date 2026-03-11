import { useState, useEffect } from 'react';
import styles from './Screensaver.module.css';

const Screensaver = () => {
  const [time, setTime] = useState(new Date());

  // Real-time update for the clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  
  // Example: Wednesday, March 11
  const dateStr = time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className={styles.overlay}>
      <div className={styles.clockWrapper}>
        
        {/* Flip Clock Blocks */}
        <div className={styles.timeBlock}>{hours}</div>
        <div className={styles.timeBlock}>{minutes}</div>
        <div className={styles.timeBlock}>{seconds}</div>
        
      </div>
      <div className={styles.dateText}>{dateStr}</div>
    </div>
  );
};

export default Screensaver;