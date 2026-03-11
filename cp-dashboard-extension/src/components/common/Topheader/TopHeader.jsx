/* global chrome */


import React from 'react';
import { useEffect, useState } from 'react';
import styles from './TopHeader.module.css';

export default function TopHeader() {
    const [time, setCurrentDate] = useState(new Date());
    const [userName, setUserName] = useState('Aman'); // Default name



    useEffect(()=>{
        const timer = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

  // Fetch Chrome User Name (Safely)
    useEffect(() => {
      // Try-catch lagaya hai taaki localhost pe koi error na aaye
      try {
        if (window.chrome && window.chrome.identity) {
          window.chrome.identity.getProfileUserInfo((userInfo) => {
            if (userInfo && userInfo.email) {
              const namePart = userInfo.email.split('@')[0];
              const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
              setUserName(formattedName);
            }
          });
        }
      } catch (error) {
        console.log("Chrome Identity API not available in local dev environment.", error);
      }
    }, []);



    const timeString = time.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const dateString = time.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
    const start = new Date(time.getFullYear(), 0, 0);
    const diff = time - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);


    return (
<div className={styles.topRow}>
      
      {/* 1. CLOCK SECTION */}
      <div className={styles.timeBlock}>
        <div className={styles.timeDisplay}>{timeString}</div>
        <div className={styles.dateRow}>
          <span className={styles.dateText}>{dateString}</span>
          <div className={styles.dateDivider}></div>
          <span className={styles.dayProg}>Day {dayOfYear} of {time.getFullYear()}</span>
        </div>
      </div>


   {/* 2. GREETING SECTION */}
      <div className={styles.greetingBlock}>
        <div className={styles.greetTag}>// daily.grind</div>
        <div className={styles.greetText}>Welcome back, {userName}! 🚀</div>
        
        {/* Updated Links Section */}
        <div className={styles.greetLinks}>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={`${styles.gsItem} ${styles.linkedin}`}>💼 LinkedIn</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={`${styles.gsItem} ${styles.github}`}>🐙 GitHub</a>
          <a href="https://spotify.com" target="_blank" rel="noopener noreferrer" className={`${styles.gsItem} ${styles.spotify}`}>🎵 Spotify</a>
        </div>


      </div>
    </div>
    );
}
