import React, { useState,useEffect } from 'react';
import styles from './QuickLinks.module.css';

const QuickLinks = () => {

    const [links, setLinks] = useState([]);


    // Google Favicon API (64px size for crisp quality)
    const getFavicon = (url) => `https://www.google.com/s2/favicons?domain=${url}&sz=64`;
    const defaultLinks = [
        { id: 'lc', url: 'https://leetcode.com', name: 'LeetCode' },
        { id: 'cf', url: 'https://codeforces.com', name: 'Codeforces' },
        { id: 'gh', url: 'https://github.com', name: 'GitHub' },
    ];

    // Load from local storage
    useEffect(() => {
        const savedLinks = localStorage.getItem('cp_nexus_links');
        if (savedLinks) {
        setLinks(JSON.parse(savedLinks));
        } else {
        setLinks(defaultLinks);
        }
    }, []);

    // Add new link logic
    const handleAddLink = () => {
        const url = prompt('Enter the Website URL (e.g., https://instagram.com):');
        if (!url) return;
        
        let formattedUrl = url;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
        formattedUrl = 'https://' + url;
        }

        const name = prompt('Enter the Name (e.g., Instagram):') || 'App';
        
        const newLinks = [...links, { id: Date.now().toString(), url: formattedUrl, name }];
        setLinks(newLinks);
        localStorage.setItem('cp_nexus_links', JSON.stringify(newLinks));
    };

    // Remove link logic (Right click)
    const handleRemoveLink = (e, id) => {
        e.preventDefault(); // Prevent standard right-click menu
        if (window.confirm('Delete this shortcut?')) {
        const newLinks = links.filter(link => link.id !== id);
        setLinks(newLinks);
        localStorage.setItem('cp_nexus_links', JSON.stringify(newLinks));
        }
    };

  

  return (
    <div className={styles.gridContainer}>
        {links.map((link) => (
            <a 
            key={link.id} 
            href={link.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.linkTile}
            title={`${link.name}\nRight-click to delete`}
            onContextMenu={(e) => handleRemoveLink(e, link.id)}
            >
            <img src={getFavicon(link.url)} alt={link.name} className={styles.iconImage} />
            <span className={styles.linkName}>{link.name}</span>
            </a>
        ))}

      {/* ADD NEW LINK BUTTON */}
      <div className={`${styles.linkTile} ${styles.addButton}`} onClick={handleAddLink}>
        <div className={styles.addIcon}>＋</div>
        <span className={styles.linkName}>Add App</span>
      </div>


    </div>
  );
};

export default QuickLinks;