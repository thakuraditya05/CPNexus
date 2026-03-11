/* global chrome */
import React, { useState, useEffect } from 'react';
import styles from './FocusTimer.module.css';
import TimerView from './TimerView';
import BlocklistView from './BlocklistView';

const FocusTimer = () => {
  // View Toggle State
  const [showBlocklist, setShowBlocklist] = useState(false);

  // Timer States
  const [mode, setMode] = useState(45);
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [session, setSession] = useState(1);
  const totalSessions = 4;

  // Blocklist States (Persisted)
  const [blocklist, setBlocklist] = useState(() => {
    return JSON.parse(localStorage.getItem('cp_zen_blocklist')) || ['youtube.com', 'instagram.com'];
  });

  useEffect(() => {
    localStorage.setItem('cp_zen_blocklist', JSON.stringify(blocklist));
  }, [blocklist]);

  // ── Helper Function: Unblock Sites ──
  const stopBlocking = () => {
    try {
      if (window.chrome && window.chrome.runtime) {
        window.chrome.runtime.sendMessage({ action: "STOP_ZEN_MODE" });
      }
    } catch (error) {
      console.log("Chrome API not available (Local Dev Mode)", error);
    }
  };

  // ── Master Timer Logic ──
  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      clearInterval(interval);
      setIsRunning(false);
      stopBlocking(); // <-- TIMER KHATAM HOTE HI UNBLOCK
      // Logic for break or next session can be added here
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);


  
  // ── Handlers for Timer View ──
  const toggleTimer = () => {
    const newIsRunning = !isRunning;
    setIsRunning(newIsRunning);

    // Send message to background.js to start/stop blocking
    try {
      if (window.chrome && window.chrome.runtime) {
        if (newIsRunning) {
          window.chrome.runtime.sendMessage({ action: "START_ZEN_MODE", blocklist: blocklist });
        } else {
          stopBlocking();
        }
      }
    } catch (error) {
      console.log("Chrome API not available (Local Dev Mode)", error);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode * 60);
    stopBlocking(); // Stop blocking when reset
  };

  const handleSetMode = (newMode) => { 
    setIsRunning(false); 
    setMode(newMode); 
    setTimeLeft(newMode * 60); 
    stopBlocking(); // Stop blocking when mode changes mid-session
  };

  const skipSession = () => {
    setIsRunning(false);
    setSession(session < totalSessions ? session + 1 : 1);
    setTimeLeft(mode * 60);
    stopBlocking(); // Stop blocking when skipping session
  };

  return (
    <div className={styles.container}>
      
      {/* ── HEADER (Always Visible) ── */}
      <div className={styles.header}>
        <div className={styles.title}>
          <div className={styles.dot}></div>
          Focus Timer
        </div>
        
        {/* Toggle Button */}
        <div 
          className={`${styles.zenBadge} ${isRunning ? styles.zenOn : styles.zenOff}`}
          onClick={() => !isRunning && setShowBlocklist(!showBlocklist)}
          title={isRunning ? "Timer is running. Focus!" : "Edit blocked sites"}
        >
          🧘 Zen Mode: {isRunning ? 'ON' : 'OFF'}
        </div>
      </div>

      {/* ── CONDITIONAL RENDERING ── */}
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