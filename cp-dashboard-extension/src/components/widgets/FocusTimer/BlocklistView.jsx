import React, { useState } from 'react';
import styles from './BlocklistView.module.css';

const BlocklistView = ({ blocklist, setBlocklist, closeView }) => {
  const [newSite, setNewSite] = useState('');

  const handleAdd = () => {
    if (newSite.trim() !== '') {
      let cleanSite = newSite.trim().replace(/^https?:\/\//, '').split('/')[0];
      if (!blocklist.includes(cleanSite)) {
        setBlocklist([...blocklist, cleanSite]);
      }
      setNewSite('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd();
  };

  const removeSite = (siteToRemove) => {
    setBlocklist(blocklist.filter(site => site !== siteToRemove));
  };

  return (
    <div className={styles.blocklistView}>
      <div className={styles.blHeader}>
        <span className={styles.blTitle}>🚫 Sites to block during focus</span>
        <span className={styles.blDone} onClick={closeView}>Done</span>
      </div>
      
      {/* ── NEW INPUT GROUP WITH ADD BUTTON ── */}
      <div className={styles.inputGroup}>
        <input 
          type="text" 
          className={styles.blInput} 
          placeholder="e.g., reddit.com"
          value={newSite}
          onChange={(e) => setNewSite(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className={styles.addBtn} onClick={handleAdd}>Add</button>
      </div>

      <div className={styles.blTags}>
        {blocklist.map(site => (
          <div key={site} className={styles.blTag}>
            {site} <span className={styles.tagClose} onClick={() => removeSite(site)}>✕</span>
          </div>
        ))}
        {blocklist.length === 0 && <span className={styles.emptyMsg}>No sites blocked.</span>}
      </div>
    </div>
  );
};

export default BlocklistView;