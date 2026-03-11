

// All import 
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Contests from './pages/Contests/Contests.jsx';
import Settings from './pages/Settings/Settings.jsx';
import Home from './pages/Home/Home.jsx';
import BottomBar from './components/common/BottomBar/BottomBar.jsx';
import TopHeader from './components/common/TopHeader/TopHeader.jsx';
import { useState,useEffect } from 'react';

import './styles/index.css';
import styles from './App.module.css';
import Analytics from './pages/Analytics/Analytics';

import Screensaver from './components/common/Screensaver/Screensaver';



function App() {
    const [activeTab, setActiveTab] = useState('home');

  // 2. Idle State Tracker
  const [isIdle, setIsIdle] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('cp_nexus_theme') || 'dark');



  // 2. Apply theme class to body
  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
    localStorage.setItem('cp_nexus_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };


// 3. Idle Detection Logic (7 seconds)
  useEffect(() => {
    let timeoutId;

    const resetTimer = () => {
      setIsIdle(false); // User wapas aa gaya, screensaver hatao
      clearTimeout(timeoutId);
      // 10000 ms (10 seconds) baad isIdle true kar do
      timeoutId = setTimeout(() => setIsIdle(true), 10000); 
    };

    // User ki kisi bhi activity par timer reset karo
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('mousedown', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('scroll', resetTimer);

    // Initial start
    resetTimer();

    // Cleanup when component unmounts
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('mousedown', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('scroll', resetTimer);
    };
  }, []);





return (
    <div className={styles.appWrapper}>

      {/* Agar user idle hai, toh Screensaver Overlay dikhao */}
      {isIdle && <Screensaver />}



      {/* Permanent Background Effects */}
      <div className={styles.gridOverlay}></div>
      <div className={styles.scanline}></div>

      <div className={styles.content}>

        
        {/* Permanent Top Header */}

        {/* 🔄 DYNAMIC MIDDLE SECTION */}
        <main className={styles.mainArea}>
          {activeTab === 'home' && <Home />}
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'analytics' && <Analytics />}
          {activeTab === 'contests' &&<Contests />}
          {activeTab === 'settings' && <Settings />}
        </main>



        {/* Permanent Bottom Bar with State passed as Props */}
        <footer className={styles.bottomBarContainer}>
          <BottomBar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            theme={theme}             // Pass theme
            toggleTheme={toggleTheme} // Pass toggle function
          />
        </footer>



      </div>
    </div>
  );
}

export default App;


