import React, { useState } from 'react';
import styles from './AnalyticsHeader.module.css';

const AnalyticsHeader = () => {
  // Kaunsa filter active hai, usko track karne ke liye state
  const [activeFilter, setActiveFilter] = useState('30D');

  const filters = ['7D', '30D', '3M', 'All'];

  return (
    <div className={styles.topBar}>
      
      {/* ── LEFT: Title & Subtitle ── */}
      <div className={styles.pageHeading}>
        <h1>ANALYTICS</h1>
        <span>// your competitive programming data</span>
      </div>
      
      {/* ── RIGHT: Time Range Filter ── */}
      <div className={styles.filterContainer}>
        <div className={styles.timeFilter}>
          {filters.map((filter) => (
            <div 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`${styles.tf} ${activeFilter === filter ? styles.tfActive : ''}`}
            >
              {filter}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AnalyticsHeader;