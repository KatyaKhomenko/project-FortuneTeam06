import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeMonth,
  generateDaysInMonth,
  setSelectedDay,
  closeModal,
} from '../../redux/monthWater/slice';
import {
  selectSelectedMonth,
  selectDaysInMonth,
  selectSelectedDay,
  selectLoading,
  selectError,
  selectIsCurrentMonth,
  selectIsModalOpen,
} from '../../redux/monthWater/selectors';
import { fetchWaterData } from '../../redux/monthWater/operations';
import DaysGeneralStats from '../DaysGeneralStats/DaysGeneralStats';
import styles from './MonthStatsTable.module.css';

const MonthStatsTable = () => {
  const dispatch = useDispatch();
  const selectedMonth = useSelector(selectSelectedMonth);
  const isCurrentMonth = useSelector(selectIsCurrentMonth);
  const daysInMonth = useSelector(selectDaysInMonth);
  const selectedDay = useSelector(selectSelectedDay);
  const isModalOpen = useSelector(selectIsModalOpen);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(generateDaysInMonth());
    const date = new Date(selectedMonth + '-01');
    dispatch(fetchWaterData(date.toISOString().slice(0, 7)));
  }, [selectedMonth, dispatch]);

  const handleMonthChange = offset => {
    dispatch(changeMonth(offset));
  };

  const handleDayClick = day => {
    const monthName = new Date(selectedMonth + '-01').toLocaleString('en-US', {
      month: 'long',
    });
    dispatch(setSelectedDay({ day, month: monthName })); // Передаємо назву місяця, а не YYYY-MM
  };

  const handleCloseModal = () => {
    dispatch(closeModal()); // Закриваємо модалку
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Month</h2>
        <div className={styles.paginator}>
          <button
            className={styles.arrow}
            onClick={() => handleMonthChange(-1)}
          >
            &lt;
          </button>
          <span>
            {new Date(selectedMonth + '-01').toLocaleString('en-US', {
              month: 'long',
              year: 'numeric',
            })}
          </span>
          {!isCurrentMonth && (
            <button
              className={styles.arrow}
              onClick={() => handleMonthChange(1)}
            >
              &gt;
            </button>
          )}
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <div className={styles.daysList}>
        {daysInMonth.map(({ day, dailyNorma }) => (
          <div
            key={day}
            className={`${styles.day} ${
              dailyNorma && dailyNorma < 100 ? styles.incomplete : ''
            }`}
            onClick={() => handleDayClick(day)}
          >
            <div className={styles.dayCircle}>{day}</div>
            <p>{dailyNorma ? `${dailyNorma}%` : ''}</p>
          </div>
        ))}
      </div>
      {isModalOpen && selectedDay && (
        <DaysGeneralStats dayData={selectedDay} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default MonthStatsTable;
