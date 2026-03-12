import React, { useState, useEffect } from 'react';
import styles from './TasksSummary.module.css';
import TaskListItem from './TaskListItem';
import TaskStatBox from './TaskStatBox';


export default function  TasksSummary(){

    const [tasks, setTasks] = useState([]);
    const [stats, setStats] = useState({ done: 0, pending: 0, overdue: 0, progress: 0 });

    // Load real data from DualNotes local storage
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('cp_sched_notes')) || [];
        // If no real tasks, use dummy data for UI display
        if (savedTasks.length === 0) {
        setTasks([
            { id: 1, text: 'OS Assignment — OVERDUE', status: 'overdue', timeStr: '2d late' },
            { id: 2, text: 'Solve 3 LC DP problems', status: 'today', timeStr: 'Today' },
            { id: 3, text: 'Push DSA repo to GitHub', status: 'done', timeStr: '✓ Done' },
            { id: 4, text: 'CF Round 987 — Register', status: 'future', timeStr: 'Tomorrow' },
        ]);
        setStats({ done: 3, pending: 2, overdue: 1, progress: 50 });
        return;
        }
        // Process real data
        let doneCount = 0;
        let overdueCount = 0;
        const todayStr = new Date().toISOString().split('T')[0];
        const processedTasks = savedTasks.map(task => {
        let status = 'future';
        let timeStr = task.date;
        if (task.done) {
            doneCount++;
            status = 'done';
            timeStr = '✓ Done';
        } else if (task.date < todayStr) {
            overdueCount++;
            status = 'overdue';
            timeStr = 'Late';
        } else if (task.date === todayStr) {
            status = 'today';
            timeStr = 'Today';
        }
        return { ...task, status, timeStr };
        });
        const total = savedTasks.length;
        const pendingCount = total - doneCount;
        const progressPct = total === 0 ? 0 : Math.round((doneCount / total) * 100);
        setStats({ done: doneCount, pending: pendingCount, overdue: overdueCount, progress: progressPct });
        setTasks(processedTasks.slice(0, 5)); // Show only top 5
    }, []);

  return (
    <div className={styles.tasksSummary}>
      
      {/* ── STATS ROW ── */}
      <div className={styles.taskStatRow}>
        <TaskStatBox value={stats.done} label="Done" colorClass={styles.cGreen} />
        <TaskStatBox value={stats.pending} label="Pending" colorClass={styles.cYellow} />
        <TaskStatBox value={stats.overdue} label="Overdue" colorClass={styles.cRed} />
      </div>

      {/* ── PROGRESS BAR ── */}
      <div className={styles.progressBarWrap}>
        <div className={styles.progressBar} style={{ width: `${stats.progress}%` }}></div>
      </div>
      <div className={styles.progressText}>{stats.progress}% complete today</div>

      {/* ── TASK LIST ── */}
      <div className={styles.todayTasks}>
        {tasks.map((task) => (
          <TaskListItem 
            key={task.id} 
            text={task.text} 
            timeStr={task.timeStr} 
            status={task.status} 
          />
        ))}
      </div>

    </div>
  );
}

