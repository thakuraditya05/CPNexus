import { useState, useEffect } from 'react';
import styles from './BottomBar.module.css';





const TABS = [
  { id: 'home', icon: '🏠', label: 'Home' },
  { id: 'dashboard', icon: '⊞', label: 'Dashboard' },
  { id: 'analytics', icon: '📊', label: 'Analytics' },
  { id: 'contests', icon: '🏆', label: 'Contests' },
  { id: 'settings', icon: '⚙', label: 'Settings' }
];


export default function BottomBar({ activeTab, setActiveTab, theme, toggleTheme }) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

// Formatting Time: MON 09 MAR 2026 · 14:47:31 IST
  const dayStr = time.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  const dateStr = time.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
  const timeStr = time.toLocaleTimeString('en-US', { hour12: true }); 
  const fullTimestamp = `${dayStr} ${dateStr} · ${timeStr} `;

return (
    <div className={styles.bottomBar}>

    {/* LEFT SECTION */}
      <div className={styles.bbLeft}>
        <div className={styles.bbStatus}><div className={styles.bbDot}></div>All synced</div>
        <div className={styles.bbDivider}></div>
        <div className={styles.bbTimeFull}>{fullTimestamp}</div>
      </div>

    {/* CENTER SECTION (Yahan hum loop chala rahe hain) */}
      <div className={styles.bbCenter}>
        {TABS.map(tab => (
          <div 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)} // Ye App.jsx ka state change karega
            className={`${styles.bbTab} ${activeTab === tab.id ? styles.active : ''}`}
          >
            {tab.icon} {tab.label}
          </div>
        ))}
      </div>


    {/* RIGHT SECTION */}
      <div className={styles.bbRight}>
        {/* GitHub Redirect Link (Wrapped in <a> tag) */}
        <a href="https://github.com/thakuraditya05/CPNexus" target="_blank" rel="noopener noreferrer" className={styles.bbExt} style={{ textDecoration: 'none' }}>⚡ CPNexus v2.0</a>
        
        {/* Dynamic Theme Toggle Button */}
        <div className={styles.bbTheme} onClick={toggleTheme}>
          {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
        </div>
        
    </div>


    </div>
  );
}