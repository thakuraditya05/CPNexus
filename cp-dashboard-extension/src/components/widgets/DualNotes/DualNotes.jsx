import React, { useState, useEffect } from 'react';
import styles from './DualNotes.module.css';
import ScheduledNotes from '../ScheduledNotes/ScheduledNotes';

import DailyNotes from '../DailyNotes/DailyNotes';

const DualNotes = () => {
  const [activeTab, setActiveTab] = useState('sched');
  const [schedNotes, setSchedNotes] = useState(() => JSON.parse(localStorage.getItem('cp_sched_notes')) || []);
  const [quickNotes, setQuickNotes] = useState(() => JSON.parse(localStorage.getItem('cp_quick_notes')) || []);

  useEffect(() => { localStorage.setItem('cp_sched_notes', JSON.stringify(schedNotes)); }, [schedNotes]);
  useEffect(() => { localStorage.setItem('cp_quick_notes', JSON.stringify(quickNotes)); }, [quickNotes]);

  // 🧹 1. CLEAR ALL FUNCTION
  const handleClear = () => {
    if (window.confirm(`Are you sure you want to clear all ${activeTab === 'sched' ? 'Scheduled Tasks' : 'Quick Notes'}?`)) {
      if (activeTab === 'sched') setSchedNotes([]);
      else setQuickNotes([]);
    }
  };

  // 📥 2. EXPORT AS TXT FUNCTION
  const handleExport = () => {
    let content = `CPNexus - ${activeTab === 'sched' ? 'Scheduled Tasks' : 'Quick Notes'}\n\n`;
    
    if (activeTab === 'sched') {
      schedNotes.forEach((n, i) => {
        content += `${i + 1}. [${n.done ? 'x' : ' '}] ${n.text} (Due: ${n.date})\n`;
      });
    } else {
      quickNotes.forEach((n, i) => {
        content += `${i + 1}. ${n.text}\n`;
      });
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CPNexus_${activeTab}_export.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.container}>
      {/* ── HEADER ACTIONS (Export / Clear) ── */}
      <div className={styles.topActions}>
        <div className={styles.tabs}>
          <div className={`${styles.tab} ${activeTab === 'sched' ? styles.activeSched : ''}`} onClick={() => setActiveTab('sched')}>📅 Scheduled</div>
          <div className={`${styles.tab} ${activeTab === 'quick' ? styles.activeQuick : ''}`} onClick={() => setActiveTab('quick')}>⚡ Quick Notes</div>
        </div>
        
        <div className={styles.utilityActions}>
          <span className={styles.countText}>
            <span style={{ color: 'var(--cyan)' }}>{schedNotes.length}</span> / <span style={{ color: 'var(--green)' }}>{quickNotes.length}</span>
          </span>
          <button className={styles.actionBtn} onClick={handleExport}>📥 Export</button>
          <span className={styles.divider}>|</span>
          <button className={`${styles.actionBtn} ${styles.dangerTxt}`} onClick={handleClear}>🗑 Clear</button>
        </div>
      </div>

      {/* ── CONTENT SWITCHER ── */}
      <div className={styles.contentArea}>
        {activeTab === 'sched' ? (
          <ScheduledNotes notes={schedNotes} setNotes={setSchedNotes} />
        ) : (
          <DailyNotes notes={quickNotes} setNotes={setQuickNotes} />
        )}
      </div>
    </div>
  );
};

export default DualNotes;