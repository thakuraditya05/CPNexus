/* global chrome */
import React, { useState, useEffect, useRef } from 'react';
import styles from './FocusTimer.module.css';
import TimerView from './TimerView';
import BlocklistView from './BlocklistView';

// ── INITIALIZATION LOGIC ──
const getInitialTimeLeft = () => {
  const isRunning = localStorage.getItem('cp_zen_isRunning') === 'true';
  const endTime = parseInt(localStorage.getItem('cp_zen_endTime'));
  const savedTimeLeft = parseInt(localStorage.getItem('cp_zen_timeLeft'));

  if (isRunning && endTime) {
    const remaining = Math.floor((endTime - Date.now()) / 1000);
    return remaining > 0 ? remaining : 0;
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

  // ── ALARM STATES ──
  const [isAlarmRinging, setIsAlarmRinging] = useState(false);
  const audioRef = useRef(null); // Reference to hold the audio object

  // Blocklist save
  useEffect(() => {
    localStorage.setItem('cp_zen_blocklist', JSON.stringify(blocklist));
  }, [blocklist]);

  // Request Notification Permission on mount
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted" && Notification.permission !== "denied") {
      Notification.requestPermission();
    }
  }, []);

  // ── HELPER: UNBLOCK SITES ──
  const stopBlocking = () => {
    try {
      if (window.chrome && window.chrome.runtime && window.chrome.runtime.sendMessage) {
        window.chrome.runtime.sendMessage({ action: "STOP_ZEN_MODE" });
      }
    } catch (error) {
      console.log("Local Dev Mode - Unblocked");
    }
  };

  // ── HELPER: PLAY ALARM ──
  const playAlarm = () => {
    try {
      const audioUrl = window.chrome?.runtime?.getURL('alarm.mp3') || '/alarm.mp3';
      const audio = new Audio(audioUrl);
      audio.loop = true; // Alarm tab tak bajega jab tak band na kiya jaye
      audioRef.current = audio;
      audio.play();
      setIsAlarmRinging(true);
    } catch (e) {
      console.log("Audio error", e);
    }
  };

  // ── HELPER: STOP ALARM ──
  const stopAlarm = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsAlarmRinging(false);
  };

// ── HELPER: SHOW NOTIFICATION (Via Background Script) ──
  const showNotification = () => {
    try {
      if (window.chrome && window.chrome.runtime && window.chrome.runtime.sendMessage) {
        // Background ko message bhejo notification dikhane ke liye
        window.chrome.runtime.sendMessage({ action: "TIMER_FINISHED" });
      }
    } catch (error) {
      console.log("Local Dev Mode - No Notification", error);
    }
  };



  // ── MASTER TIMER LOGIC ──
  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        const end = parseInt(localStorage.getItem('cp_zen_endTime'));
        if (end) {
          const remaining = Math.floor((end - Date.now()) / 1000);
          if (remaining > 0) {
            setTimeLeft(remaining);
            localStorage.setItem('cp_zen_timeLeft', remaining);
          } else {
            // 🚨 TIMER FINISHED LOGIC 🚨
            clearInterval(interval);
            setIsRunning(false);
            setTimeLeft(0);
            localStorage.setItem('cp_zen_isRunning', 'false');
            localStorage.setItem('cp_zen_timeLeft', 0);
            localStorage.removeItem('cp_zen_endTime');
            
            stopBlocking();
            playAlarm();
            showNotification();
          }
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  // ── HANDLERS ──
  const toggleTimer = () => {
    if (isAlarmRinging) stopAlarm(); // Stop alarm if user clicks start again

    const newIsRunning = !isRunning;
    setIsRunning(newIsRunning);
    localStorage.setItem('cp_zen_isRunning', newIsRunning);

    if (newIsRunning) {
      const endTime = Date.now() + (timeLeft * 1000);
      localStorage.setItem('cp_zen_endTime', endTime);
      try {
        if (window.chrome && window.chrome.runtime && window.chrome.runtime.sendMessage) {
          window.chrome.runtime.sendMessage({ action: "START_ZEN_MODE", blocklist: blocklist });
        }
      } catch (e) {}
    } else {
      localStorage.removeItem('cp_zen_endTime');
      localStorage.setItem('cp_zen_timeLeft', timeLeft);
      stopBlocking();
    }
  };

  const resetTimer = () => {
    if (isAlarmRinging) stopAlarm();
    setIsRunning(false);
    setTimeLeft(mode * 60);
    localStorage.setItem('cp_zen_isRunning', 'false');
    localStorage.removeItem('cp_zen_endTime');
    localStorage.setItem('cp_zen_timeLeft', mode * 60);
    stopBlocking();
  };

  const handleSetMode = (newMode) => {
    if (isAlarmRinging) stopAlarm();
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
    if (isAlarmRinging) stopAlarm();
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
        
        {/* Dynamic Header actions */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {/* Ye Stop Alarm ka chamakta button hai jo tabhi aayega jab alarm bajega */}
          {isAlarmRinging && (
            <div 
              className={styles.stopAlarmBtn}
              onClick={stopAlarm}
            >
              🛑 Stop Alarm
            </div>
          )}
          
          <div 
            className={`${styles.zenBadge} ${isRunning ? styles.zenOn : styles.zenOff}`}
            onClick={() => !isRunning && setShowBlocklist(!showBlocklist)}
            title={isRunning ? "Timer is running. Focus!" : "Edit blocked sites"}
          >
            🧘 Zen Mode: {isRunning ? 'ON' : 'OFF'}
          </div>
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