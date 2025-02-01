import MonthStatsTable from '../../components/MonthStatsTable/MonthStatsTable';
import DailyNorma from '../../components/DailyNorma/DailyNorma';
import WaterRatioPanel from '../../components/WaterRatioPanel/WaterRatioPanel';
import TodayWaterList from '../../components/TodayWaterList/TodayWaterList';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <main>
      <DailyNorma />
      <WaterRatioPanel />
      <div className={styles.statiscs}>
        <TodayWaterList />
        <MonthStatsTable />
      </div>
    </main>
  );
};

export default HomePage;
