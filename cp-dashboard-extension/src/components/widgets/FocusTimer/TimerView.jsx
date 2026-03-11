import React from 'react';
import styles from './TimerView.module.css';

const TimerView = ({ 
  mode, setMode, 
  timeLeft, 
  isRunning, toggleTimer, resetTimer, 
  session, totalSessions, skipSession 
}) => {

  // Math for SVG Arc (Radius = 30)
  const circumference = 2 * Math.PI * 30;
  const progress = 1 - (timeLeft / (mode * 60));
  const strokeDashoffset = circumference * progress;

  // Formatting Time (e.g., 45:00)
  const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const s = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <div className={styles.pomoWrap}>
      {/* SVG Progress Arc */}
      <div className={styles.pomoArc}>
        <svg className={styles.arcSvg} viewBox="0 0 68 68">
          <defs>
            <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9b59f7"/>
              <stop offset="100%" stopColor="#00e5ff"/>
            </linearGradient>
          </defs>
          <circle className={styles.arcBg} cx="34" cy="34" r="30"/>
          <circle 
            className={styles.arcFill} 
            cx="34" cy="34" r="30" 
            style={{ strokeDasharray: circumference, strokeDashoffset: strokeDashoffset }}
          />
        </svg>
        <div className={styles.pomoArcInner}>🎯</div>
      </div>

      {/* Controls & Digits */}
      <div className={styles.controlsWrap}>
        <div className={styles.digitsRow}>
          <div className={styles.digits}>{m}:{s}</div>
          <div className={styles.phaseInfo}>
            <div className={styles.phaseLabel}>Focus</div>
            <div className={styles.sessionCount}>
              <div className={styles.dots}>
                {[...Array(totalSessions)].map((_, i) => (
                  <div key={i} className={`${styles.sDot} ${i < session ? styles.sDotDone : ''}`}></div>
                ))}
              </div>
              <span>Session {session}/{totalSessions}</span>
            </div>
          </div>
        </div>

        {/* Duration Modes */}
        <div className={styles.modes}>
            {[25, 45, 60, 90].map(mVal => (
                <div 
                key={mVal} 
                className={`${styles.modeBtn} ${mode === mVal ? styles.modeActive : ''}`}
                onClick={() => !isRunning && setMode(mVal)}
                >
                {mVal}m
                </div>
            ))}
            
            {/* ── NEW CUSTOM TIME BUTTON ── */}
            <div 
                className={styles.modeBtn}
                onClick={() => {
                if (!isRunning) {
                    const customMins = prompt("Enter custom minutes (e.g., 10):");
                    if (customMins && !isNaN(customMins) && parseInt(customMins) > 0) {
                    setMode(parseInt(customMins));
                    }
                }
                }}
            >
                + Custom
            </div>
            </div>

        {/* Action Buttons */}
        <div className={styles.actionBtns}>
          <div 
            className={`${styles.btn} ${isRunning ? styles.btnPause : styles.btnStart}`} 
            onClick={toggleTimer}
          >
            {isRunning ? '⏸ Pause' : '▶ Start'}
          </div>
          <div className={`${styles.btn} ${styles.btnReset}`} onClick={resetTimer}>↺ Reset</div>
          <div className={`${styles.btn} ${styles.btnSkip}`} onClick={skipSession}>⏭ Skip</div>
        </div>
      </div>
    </div>
  );
};

export default TimerView;