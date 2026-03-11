import React from 'react';
import styles from './DailyFuel.module.css';

const QuoteBox = ({ text, author }) => {
  return (
    <div className={styles.inspireQuote}>
      <div>
        <div className={styles.iqText}>{text}</div>
        <div className={styles.iqAuthor}>{author}</div>
      </div>
    </div>
  );
};

export default QuoteBox;