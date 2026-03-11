import React from "react";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    // Yahan sirf .mainGrid rahega, .content App.jsx se aayega

    <>
        <div className={styles.topBar}>
            <div className={styles.pageHeading}>
                <h1> DASHBOARD</h1>
                <span>// your daily grind data</span>
            </div>
        </div>
        <main className={styles.mainGrid}>
        
        {/* Column 1: Contests (Left side, spans 2 rows) */}
        <div className={`${styles.card} ${styles.cardCyan} ${styles.span2Rows}`}>
            [ Widget: Upcoming Contests ]
        </div>

        {/* Column 2 (Top): Streak Hero */}
        <div className={`${styles.card} ${styles.cardGreen}`}>
            [ Widget: Platform Streaks & Heatmap ]
        </div>

        {/* Column 3 (Top): Rating Tracker */}
        <div className={`${styles.card} ${styles.cardPurple}`}>
            [ Widget: Rating Tracker ]
        </div>

        {/* Column 4: MANIT Alerts & Quick Links (Right side, spans 2 rows) */}
        <div className={`${styles.card} ${styles.cardOrange} ${styles.span2Rows}`}>
            [ Widget: Actions, MANIT Alerts & Links ]
        </div>

        {/* Column 2 (Bottom): Analytics */}
        <div className={`${styles.card} ${styles.cardYellow}`}>
            [ Widget: Monthly Analytics Chart ]
        </div>

        {/* Column 3 (Bottom): Rating Predictor */}
        <div className={`${styles.card} ${styles.cardPurple}`}>
            [ Widget: Rating Predictor ]
        </div>

        </main>
    </>

  );
};

export default Dashboard;