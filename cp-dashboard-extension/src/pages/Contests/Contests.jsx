import React from 'react';
import styles from './Contests.module.css';

const Contests = () => {
  return (
    <div className={styles.lbWrap}>
      
      {/* ── TOP HEADER (Title + Toggles) ── */}
      <div className={styles.topBar}>
        <div className={styles.pageHeading}>
          <h1>LEADERBOARD</h1>
          <span>// compete with your friends</span>
        </div>
        {/* Tum chaho toh yahan "Leaderboard vs Upcoming Contests" ka toggle daal sakte ho */}
      </div>

      {/* ── MAIN CONTENT (Left: List, Right: Sidebar) ── */}
      <div className={styles.lbContent}>
        
        {/* LEFT AREA: Filters, Podium, Table */}
        <div className={styles.lbMain}>
          
          {/* 1. Filters & Search (Iska component banayenge) */}
          <div className={styles.lbFilters}>
             [ Component: LbHeader / Filters ]
          </div>

          {/* 2. Podium (Top 3) (Iska component banayenge) */}
          <div className={styles.podium}>
             [ Component: Podium ]
          </div>

          {/* 3. Table (Iska component banayenge) */}
          <div className={styles.lbTable}>
             [ Component: LbTable ]
          </div>

        </div>

        {/* RIGHT AREA: Sidebar */}
        <div className={styles.lbRight}>
           [ Component: RightPanel (My Rank, Add Friend, Activity Feed) ]
        </div>

      </div>

    </div>
  );
};

export default Contests;