import React from 'react';
import styles from './Home.module.css';

// Layout & Common Components
import TopHeader from '../../components/common/TopHeader/TopHeader.jsx';

// Widgets
import QuickLinks from '../../components/widgets/QuickLinks/QuickLinks';
// import DailyNotes from '../../components/widgets/DailyNotes/DailyNotes';

// Future Widgets (Placeholders for now)
import FocusTimer from '../../components/widgets/FocusTimer/FocusTimer';
// import TasksSummary from '../../components/widgets/TasksSummary/TasksSummary';
import DailyFuel from '../../components/widgets/DailyFuel/DailyFuel';
import DualNotes from '../../components/widgets/DualNotes/DualNotes';

export default function Home() {
  return (
    <>
      <header className={styles.topRow}>
        <TopHeader />
      </header>

      <div className={styles.mainGrid}>
        {/* ── CARD 1: QUICK LINKS (Top Left) ── */}
        <div className={`${styles.card} ${styles.cCyan}`}>
          <div className={styles.sh}>
            <div className={styles.shTitle}>
              <div className={`${styles.shDot} ${styles.sdCyan}`}></div>
              Quick Links
            </div>
            <div className={styles.shAction}>Manage →</div>
          </div>
          <QuickLinks />
        </div>

        {/* ── CARD 2: FOCUS TIMER (Top Center) ── */}
        <div className={`${styles.card} ${styles.cPurple}`}>
          {/* <div className={styles.placeholderBox}>[ Widget: Focus Timer ]</div> */}
          <FocusTimer />
        </div>

        {/* ── CARD 3: NOTES (Right Column, Spans 2 Rows) ── */}
        <div className={`${styles.card} ${styles.cGreen} ${styles.span2r}`}>
          <div className={styles.sh}>
            <div className={styles.shTitle}>
              <div className={`${styles.shDot} ${styles.sdGreen}`}></div>
              Notes
            </div>

          </div>
          {/* DailyNotes implemented here */}
          <DualNotes /> 
        </div>

        {/* ── CARD 4: TODAY AT A GLANCE (Bottom Left) ── */}
        <div className={`${styles.card} ${styles.cOrange}`}>
          <div className={styles.sh}>
            <div className={styles.shTitle}>
              <div className={`${styles.shDot} ${styles.sdOrange}`}></div>
              Today at a Glance
            </div>
            <div className={styles.shAction}>Add Task →</div>
          </div>
          <div className={styles.placeholderBox}>[ Widget: Tasks Summary ]</div>
          {/* <TasksSummary /> */}
        </div>

        {/* ── CARD 5: DAILY FUEL (Bottom Center) ── */}
        <div className={`${styles.card} ${styles.cPink}`}>
          <DailyFuel />
        </div>
      </div>
    </>
  );
}