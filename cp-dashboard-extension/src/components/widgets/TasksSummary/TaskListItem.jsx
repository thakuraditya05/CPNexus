import styles from './TasksSummary.module.css';

const TaskListItem = ({text,timeStr,status}) => {

    // Status can be: 'overdue', 'today', 'done', 'future'
   let dotClass, textClass, timeClass, wrapClass;

   switch(status){
    case 'overdue':
        dotClass=styles.dotClass;
        textClass='';
        timeClass=styles.textRed;
        wrapClass=styles.ytUrgent;
        break;

    case 'today':
        dotClass=styles.dotCyan;
        textClass = '';
        timeClass='';
        wrapClass='';
        break;

    case 'done':
        dotClass=styles.dotGreen;
        textClass=styles.textStrikethrough;
        timeClass=styles.textGreen;
        wrapClass='';
        break;

    default:
        dotClass=styles.dotPurple;
        textClass='';
        timeClass='';
        wrapClass='';
   }

return (
    <div className={`${styles.ttItem} ${wrapClass}`}>
      <div className={`${styles.ttDot} ${dotClass}`}></div>
      <div className={`${styles.ttText} ${textClass}`}>{text}</div>
      <div className={`${styles.ttTime} ${timeClass}`}>{timeStr}</div>
    </div>
  );
}


export default TaskListItem;