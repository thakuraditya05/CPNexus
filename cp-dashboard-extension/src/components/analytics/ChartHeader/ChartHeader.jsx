import React from 'react';
import styles from './ChartHeader.module.css';

// Props receive kar raha hai: title, dotColor, subText, aur koi extra element right side ke liye
const ChartHeader = ({ title, dotColor = 'cyan', subText, rightContent }) => {
  
  // Color ke hisab se dot ki CSS class decide karna
  const getDotClass = () => {
    switch (dotColor) {
      case 'cyan': return styles.dotCyan;
      case 'green': return styles.dotGreen;
      case 'purple': return styles.dotPurple;
      case 'orange': return styles.dotOrange;
      case 'yellow': return styles.dotYellow;
      case 'teal': return styles.dotTeal;
      default: return styles.dotCyan;
    }
  };

  return (
    <div className={styles.sh}>
      {/* ── LEFT: Blinking Dot & Title ── */}
      <div className={styles.shTitle}>
        <div className={`${styles.shDot} ${getDotClass()}`}></div>
        {title}
      </div>

      {/* ── RIGHT: Subtitle ya Custom Buttons ── */}
      <div className={styles.shRight}>
        {subText && <div className={styles.shSub}>{subText}</div>}
        {rightContent && rightContent}
      </div>
    </div>
  );
};

export default ChartHeader;