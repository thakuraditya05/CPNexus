import React, { useState } from 'react';
import styles from './ScheduledNotes.module.css';

const ScheduledNotes = ({ notes, setNotes }) => {
  const [inputText, setInputText] = useState('');
  const [inputDate, setInputDate] = useState(new Date().toISOString().split('T')[0]);

  const addNote = () => {
    if (!inputText.trim()) return;
    const newNote = {
      id: Date.now(),
      text: inputText,
      date: inputDate,
      done: false,
    };
    // Save to top of list
    setNotes([newNote, ...notes]);
    setInputText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addNote();
  };

  const toggleDone = (id) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, done: !note.done } : note
    ));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  // Helper function to get smart styling based on date
  const getSmartStyle = (dateStr, isDone) => {
    if (isDone) return { badge: styles.dbDone, text: '✓ Done', wrapper: styles.itemDone };
    
    const today = new Date().toISOString().split('T')[0];
    if (dateStr < today) return { badge: styles.dbOverdue, text: '⚠ Overdue', wrapper: styles.itemOverdue };
    if (dateStr === today) return { badge: styles.dbToday, text: '📅 Today', wrapper: styles.itemToday };
    return { badge: styles.dbSoon, text: `📆 ${dateStr}`, wrapper: styles.itemUpcoming };
  };

  return (
    <div className={styles.panel}>
      {/* ── Input Area ── */}
      <div className={styles.addBar}>
        <input 
          className={styles.input} 
          placeholder="Add task / reminder..." 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input 
          type="date" 
          className={styles.dateInput} 
          value={inputDate}
          onChange={(e) => setInputDate(e.target.value)}
        />
        <button className={styles.addBtn} onClick={addNote}>＋ Add</button>
      </div>

      {/* ── Task List ── */}
      <div className={styles.list}>
        {notes.length === 0 && <div className={styles.emptyMsg}>No tasks scheduled. Chill maro! 🏖️</div>}
        
        {notes.map(note => {
          const smartStyle = getSmartStyle(note.date, note.done);
          return (
            <div key={note.id} className={`${styles.item} ${smartStyle.wrapper}`}>
              <div 
                className={`${styles.checkCircle} ${note.done ? styles.checked : ''}`} 
                onClick={() => toggleDone(note.id)}
              >
                {note.done && '✓'}
              </div>
              <div className={styles.itemBody}>
                <div className={`${styles.itemText} ${note.done ? styles.textStrikethrough : ''}`}>
                  {note.text}
                </div>
                <div className={styles.itemMeta}>
                  <span className={`${styles.dateBadge} ${smartStyle.badge}`}>
                    {smartStyle.text}
                  </span>
                </div>
              </div>
              <span className={styles.delIcon} onClick={() => deleteNote(note.id)}>✕</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScheduledNotes;