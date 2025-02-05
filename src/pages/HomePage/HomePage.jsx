import MonthStatsTable from '../../components/MonthStatsTable/MonthStatsTable';
import DailyNorma from '../../components/DailyNorma/DailyNorma';
import WaterRatioPanel from '../../components/WaterRatioPanel/WaterRatioPanel';
import TodayWaterList from '../../components/TodayWaterList/TodayWaterList';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <main className={styles.pageContainer}>
      <DailyNorma />
      <WaterRatioPanel />
      <div className={styles.statiscsContainer}>
        <TodayWaterList />
        <MonthStatsTable />
      </div>
    </main>
  );
};

export default HomePage;
