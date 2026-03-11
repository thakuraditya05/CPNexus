import styles from './SummaryPills.module.css';

const SummaryPills = () => {
  // Data array: Isko map karke hum 6 dabbe generate karenge
  const statsData = [
    { id: 1, label: 'Total Solved', value: '218', subText: '↑ +34 vs last month', valColor: styles.cGreen, borderColor: styles.bGreen, isUp: true },
    { id: 2, label: 'Easy', value: '89', subText: '40.8% of total', valColor: styles.cGreen, borderColor: styles.bGreen, isUp: false },
    { id: 3, label: 'Medium', value: '104', subText: '47.7% of total', valColor: styles.cYellow, borderColor: styles.bYellow, isUp: false },
    { id: 4, label: 'Hard', value: '25', subText: '↑ +8 this month', valColor: styles.cRed, borderColor: styles.bRed, isUp: true },
    { id: 5, label: 'Contests', value: '14', subText: '↑ +3 vs last', valColor: styles.cPurple, borderColor: styles.bPurple, isUp: true },
    { id: 6, label: 'Avg Daily', value: '7.2', subText: 'problems/day', valColor: styles.cOrange, borderColor: styles.bOrange, isUp: false },
  ];

  return (
    <div className={styles.summaryRow}>
      {statsData.map((stat) => (
        <div key={stat.id} className={`${styles.statPill} ${stat.borderColor}`}>
          <div className={styles.spLabel}>{stat.label}</div>
          <div className={`${styles.spVal} ${stat.valColor}`}>{stat.value}</div>
          <div className={`${styles.spSub} ${stat.isUp ? styles.up : styles.neutral}`}>
            {stat.subText}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryPills;