import React from 'react';
import styles from './Settings.module.css';

const Settings = () => {
  return (
    <div className={styles.settingsContainer}>
      
      {/* ── TOP HEADER ── */}
      <div className={styles.topBar}>
        <div className={styles.pageHeading}>
          <h1>SETTINGS</h1>
          <span>// configure your cpnexus experience</span>
        </div>
      </div>

      {/* ── SETTINGS PANELS GRID ── */}
      <div className={styles.settingsWrap}>
        <div className={styles.settingsPanels}>

          {/* 1. ACCOUNT SYNC (Spans Full Width) */}
          <div className={`${styles.sCard} ${styles.scPurple} ${styles.spanFull}`}>
            <div className={styles.scHeader}>
              <div className={`${styles.scIcon} ${styles.sciPurple}`}>🔗</div>
              <div>
                <div className={styles.scTitle}>Account Sync</div>
                <div className={styles.scSubtitle}>Connect your competitive programming handles</div>
              </div>
            </div>
            {/* Form Placeholder */}
            <div className={styles.placeholderBox}>[ Widget: Account Inputs (LeetCode, CF, etc.) ]</div>
          </div>

          {/* 2. WEBSITE TRACKER (1 Column) */}
          <div className={`${styles.sCard} ${styles.scCyan}`}>
            <div className={styles.scHeader}>
              <div className={`${styles.scIcon} ${styles.sciCyan}`}>🌐</div>
              <div>
                <div className={styles.scTitle}>Website Tracker</div>
                <div className={styles.scSubtitle}>Track any website for updates</div>
              </div>
            </div>
            {/* Form Placeholder */}
            <div className={styles.placeholderBox}>[ Widget: Tracked Sites & Intervals ]</div>
          </div>

          {/* 3. NOTIFICATIONS (1 Column) */}
          <div className={`${styles.sCard} ${styles.scOrange}`}>
            <div className={styles.scHeader}>
              <div className={`${styles.scIcon} ${styles.sciOrange}`}>🔔</div>
              <div>
                <div className={styles.scTitle}>Notification Preferences</div>
                <div className={styles.scSubtitle}>Control when and how CPNexus alerts you</div>
              </div>
            </div>
            {/* Form Placeholder */}
            <div className={styles.placeholderBox}>[ Widget: Notification Toggles ]</div>
          </div>

          {/* 4. ZEN MODE (Spans Full Width) */}
          <div className={`${styles.sCard} ${styles.scGreen} ${styles.spanFull}`}>
            <div className={styles.scHeader}>
              <div className={`${styles.scIcon} ${styles.sciGreen}`}>🧘</div>
              <div>
                <div className={styles.scTitle}>Zen Mode — Focus Timer</div>
                <div className={styles.scSubtitle}>Block distractions. Ship DSA. Pomodoro-style.</div>
              </div>
            </div>
            {/* Form Placeholder */}
            <div className={styles.placeholderBox}>[ Widget: Pomodoro Timer & Blocked Sites ]</div>
          </div>

          {/* 5. BOOKMARK MANAGER (Spans Full Width) */}
          <div className={`${styles.sCard} ${styles.scTeal} ${styles.spanFull}`}>
            <div className={styles.scHeader}>
              <div className={`${styles.scIcon} ${styles.sciTeal}`}>🔖</div>
              <div>
                <div className={styles.scTitle}>Bookmark Manager</div>
                <div className={styles.scSubtitle}>Auto-saved competitive programming bookmarks</div>
              </div>
            </div>
            {/* Form Placeholder */}
            <div className={styles.placeholderBox}>[ Widget: Bookmark Grid & Filters ]</div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Settings;