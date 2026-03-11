
import styles from './Analytics.module.css';
import AnalyticsHeader from '../../components/analytics/AnalyticsHeader/AnalyticsHeader';
import SummaryPills from '../../components/analytics/SummaryPills/SummaryPills';
import ChartHeader from '../../components/analytics/ChartHeader/ChartHeader';




const Analytics = () => {
  return (
    <div className={styles.analyticsContainer}>
      
      {/* ── HEADER ── */}
        <AnalyticsHeader />

      {/* 2. BOOM! Poora 6 pill ka row ek line me aa gaya */}
      <SummaryPills />


        {/* just for sample  */}
        <ChartHeader 
        title="Difficulty Breakdown" 
        dotColor="green" 
        subText="218 total" 
        />


      {/* ── CHARTS GRID ── */}
      <div className={styles.chartsGrid}>
        
        {/* CHART 1: Rating History (Spans 2 rows) */}
        <div className={`${styles.cc} ${styles.ccCyan} ${styles.span2r}`}>
          [ Chart 1: Rating History SVG ]
        </div>

        {/* CHART 2: Difficulty Donut */}
        <div className={`${styles.cc} ${styles.ccGreen}`}>
          [ Chart 2: Difficulty Donut SVG ]
        </div>

        {/* CHART 3: Tag Analysis */}
        <div className={`${styles.cc} ${styles.ccPurple}`}>
          [ Chart 3: Tag Analysis Progress Bars ]
        </div>

        {/* CHART 4: Contest Win Rate */}
        <div className={`${styles.cc} ${styles.ccOrange}`}>
          [ Chart 4: Win Rate Grid ]
        </div>

        {/* CHART 5: Monthly Solved Bar */}
        <div className={`${styles.cc} ${styles.ccYellow}`}>
          [ Chart 5: Stacked Bar Chart ]
        </div>

        {/* CHART 6: Time of Day Heatmap (Spans 2 columns) */}
        <div className={`${styles.cc} ${styles.ccTeal} ${styles.span2c}`}>
          [ Chart 6: Heatmap Grid ]
        </div>

      </div>

    </div>
  );
};

export default Analytics;