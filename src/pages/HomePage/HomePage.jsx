import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import MonthStatsTable from '../../components/MonthStatsTable/MonthStatsTable';
import DailyNorma from '../../components/DailyNorma/DailyNorma';
import WaterRatioPanel from '../../components/WaterRatioPanel/WaterRatioPanel';
import TodayWaterList from '../../components/TodayWaterList/TodayWaterList';
import { getUserInfo } from '../../redux/userDataSettings/operations';
import styles from './HomePage.module.css';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  return (
    <main>
      <div className={styles.container}>
        <section className={styles.dailyNormPanel}>
          <div className={styles.dailyNorma}>
            <DailyNorma />
          </div>
          <div className={styles.waterRatioPanel}>
            <WaterRatioPanel />
          </div>
        </section>
        <section className={styles.statistics}>
          <div className={styles.statisticsContainer}>
            <TodayWaterList />
            <MonthStatsTable />
          </div>
        </section>
      </div>
    </main>
  );
};

export default HomePage;
