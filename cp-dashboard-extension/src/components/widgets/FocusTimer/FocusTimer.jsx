/* global chrome */
import React, { useState, useEffect } from 'react';
import styles from './FocusTimer.module.css';
import TimerView from './TimerView';
import BlocklistView from './BlocklistView';

// ── INITIALIZATION LOGIC ──
// Ye function naya tab khulne par check karta hai ki timer pehle se chal raha tha ya nahi
const getInitialTimeLeft = () => {
  const isRunning = localStorage.getItem('cp_zen_isRunning') === 'true';
  const endTime = parseInt(localStorage.getItem('cp_zen_endTime'));
  const savedTimeLeft = parseInt(localStorage.getItem('cp_zen_timeLeft'));

  if (isRunning && endTime) {
    const remaining = Math.floor((endTime - Date.now()) / 1000);
    return remaining > 0 ? remaining : 0; // Agar time bacha hai toh wo do, warna 0
  }
  return savedTimeLeft || (45 * 60);
};

const FocusTimer = () => {
  const [showBlocklist, setShowBlocklist] = useState(false);
  const totalSessions = 4;

  // ── PERSISTENT STATES ──
  const [mode, setMode] = useState(() => parseInt(localStorage.getItem('cp_zen_mode')) || 45);
  const [timeLeft, setTimeLeft] = useState(getInitialTimeLeft);
  const [isRunning, setIsRunning] = useState(() => localStorage.getItem('cp_zen_isRunning') === 'true');
  const [session, setSession] = useState(() => parseInt(localStorage.getItem('cp_zen_session')) || 1);

  const [blocklist, setBlocklist] = useState(() => {
    return JSON.parse(localStorage.getItem('cp_zen_blocklist')) || ['youtube.com', 'instagram.com'];
  });

  // Blocklist save
  useEffect(() => {
    localStorage.setItem('cp_zen_blocklist', JSON.stringify(blocklist));
  }, [blocklist]);

  // ── CROSS-TAB SYNC (Agar 2 tab ek sath khule hon) ──
  useEffect(() => {
    const syncState = (e) => {
      if (e.key === 'cp_zen_isRunning') setIsRunning(e.newValue === 'true');
      if (e.key === 'cp_zen_timeLeft') setTimeLeft(parseInt(e.newValue) || 0);
      if (e.key === 'cp_zen_mode') setMode(parseInt(e.newValue) || 45);
      if (e.key === 'cp_zen_session') setSession(parseInt(e.newValue) || 1);
    };
    window.addEventListener('storage', syncState);
    return () => window.removeEventListener('storage', syncState);
  }, []);

  // ── HELPER: UNBLOCK SITES ──
  const stopBlocking = () => {
    try {
      if (window.chrome && window.chrome.runtime) {
        window.chrome.runtime.sendMessage({ action: "STOP_ZEN_MODE" });
      }
    } catch (error) {
      console.log("Local Dev Mode - Unblocked");
    }
  };

  // ── MASTER TIMER LOGIC (Timestamp Based) ──
  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        const end = parseInt(localStorage.getItem('cp_zen_endTime'));
        if (end) {
          const remaining = Math.floor((end - Date.now()) / 1000);
          if (remaining >= 0) {
            setTimeLeft(remaining);
            localStorage.setItem('cp_zen_timeLeft', remaining);
          } else {
            // Timer Finished!
            clearInterval(interval);
            setIsRunning(false);
            setTimeLeft(0);
            localStorage.setItem('cp_zen_isRunning', 'false');
            localStorage.setItem('cp_zen_timeLeft', 0);
            localStorage.removeItem('cp_zen_endTime');
            stopBlocking();
          }
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  // ── HANDLERS ──
  const toggleTimer = () => {
    const newIsRunning = !isRunning;
    setIsRunning(newIsRunning);
    localStorage.setItem('cp_zen_isRunning', newIsRunning);

    if (newIsRunning) {
      // STARTING: Future end time calculate karke save karo
      const endTime = Date.now() + (timeLeft * 1000);
      localStorage.setItem('cp_zen_endTime', endTime);
      try {
        if (window.chrome && window.chrome.runtime) {
          window.chrome.runtime.sendMessage({ action: "START_ZEN_MODE", blocklist: blocklist });
        }
      } catch (e) {}
    } else {
      // PAUSING
      localStorage.removeItem('cp_zen_endTime');
      localStorage.setItem('cp_zen_timeLeft', timeLeft);
      stopBlocking();
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode * 60);
    localStorage.setItem('cp_zen_isRunning', 'false');
    localStorage.removeItem('cp_zen_endTime');
    localStorage.setItem('cp_zen_timeLeft', mode * 60);
    stopBlocking();
  };

  const handleSetMode = (newMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(newMode * 60);
    localStorage.setItem('cp_zen_mode', newMode);
    localStorage.setItem('cp_zen_isRunning', 'false');
    localStorage.removeItem('cp_zen_endTime');
    localStorage.setItem('cp_zen_timeLeft', newMode * 60);
    stopBlocking();
  };

  const skipSession = () => {
    setIsRunning(false);
    const nextSession = session < totalSessions ? session + 1 : 1;
    setSession(nextSession);
    setTimeLeft(mode * 60);
    localStorage.setItem('cp_zen_session', nextSession);
    localStorage.setItem('cp_zen_isRunning', 'false');
    localStorage.removeItem('cp_zen_endTime');
    localStorage.setItem('cp_zen_timeLeft', mode * 60);
    stopBlocking();
  };

  return (
    <div className={styles.container}>
      {/* ── HEADER ── */}
      <div className={styles.header}>
        <div className={styles.title}>
          <div className={styles.dot}></div>
          Focus Timer
        </div>
        <div 
          className={`${styles.zenBadge} ${isRunning ? styles.zenOn : styles.zenOff}`}
          onClick={() => !isRunning && setShowBlocklist(!showBlocklist)}
          title={isRunning ? "Timer is running. Focus!" : "Edit blocked sites"}
        >
          🧘 Zen Mode: {isRunning ? 'ON' : 'OFF'}
        </div>
      </div>

      {/* ── VIEWS ── */}
      {!showBlocklist ? (
        <TimerView 
          mode={mode} setMode={handleSetMode}
          timeLeft={timeLeft}
          isRunning={isRunning} toggleTimer={toggleTimer} resetTimer={resetTimer}
          session={session} totalSessions={totalSessions} skipSession={skipSession}
        />
      ) : (
        <BlocklistView 
          blocklist={blocklist} 
          setBlocklist={setBlocklist} 
          closeView={() => setShowBlocklist(false)} 
        />
      )}
    </div>
  );
};

export default FocusTimer;