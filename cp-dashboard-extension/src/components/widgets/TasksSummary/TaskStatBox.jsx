import styles from './TasksSummary.module.css';

const TaskStatBox = ({ value, label, colorClass }) => (
  <div className={styles.tstat}>
    <div className={`${styles.tstatV} ${colorClass}`}>{value}</div>
    <div className={styles.tstatL}>{label}</div>
  </div>
);



export default TaskStatBox;
