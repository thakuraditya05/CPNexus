import React, { useState } from 'react';
import styles from './DailyNotes.module.css';

const DailyNotes = ({ notes, setNotes }) => {
  const [inputText, setInputText] = useState('');

  const addSticky = (color) => {
    if (!inputText.trim()) return;
    const newSticky = { id: Date.now(), text: inputText, color };
    setNotes([newSticky, ...notes]);
    setInputText('');
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  return (
    <div className={styles.panel}>
      <div className={styles.toolbar}>
        <div className={styles.btnGroup}>
          <button className={`${styles.colorBtn} ${styles.btnY}`} onClick={() => addSticky('y')}>🟡 Yellow</button>
          <button className={`${styles.colorBtn} ${styles.btnG}`} onClick={() => addSticky('g')}>🟢 Green</button>
          <button className={`${styles.colorBtn} ${styles.btnP}`} onClick={() => addSticky('p')}>🟣 Purple</button>
        </div>
      </div>
      
      <textarea 
        className={styles.textArea} 
        placeholder="Type a quick note and pick a color..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows="3"
      />

      <div className={styles.grid}>
        {notes.length === 0 && <div className={styles.emptyMsg}>No quick notes.</div>}
        {notes.map(note => (
          <div key={note.id} className={`${styles.sticky} ${styles[note.color]}`}>
            {note.text}
            <span className={styles.delIcon} onClick={() => deleteNote(note.id)}>✕</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyNotes;










// import React, { useState, useEffect } from 'react';
// import styles from './DailyNotes.module.css';

// const DailyNotes = () => {
//   const [notes, setNotes] = useState('');

//   // Load existing notes when component mounts
//   useEffect(() => {
//     const savedNotes = localStorage.getItem('cp_nexus_daily_notes');
//     if (savedNotes) {
//       setNotes(savedNotes);
//     }
//   }, []);

//   // Save notes to localStorage on every keystroke
//   const handleNotesChange = (e) => {
//     const newText = e.target.value;
//     setNotes(newText);
//     localStorage.setItem('cp_nexus_daily_notes', newText);
//   };

//   return (
//     <div className={styles.notesWrapper}>
//       <textarea 
//         className={styles.notesInput}
//         value={notes}
//         onChange={handleNotesChange}
//         placeholder="// Code likhne se pehle plan banao...&#10;> CSES 1620 solve karna hai&#10;> AtCoder ABC 340 upsolve&#10;> Netflix pe Arcane dekhna hai"
//         spellCheck="false"
//       />
//     </div>
//   );
// };

// export default DailyNotes;
