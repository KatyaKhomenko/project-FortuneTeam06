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
import {
  fetchMonthWater,
  fetchDayWater,
} from '../../redux/monthWater/operations';
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
    if (selectedMonth) {
      dispatch(fetchMonthWater(selectedMonth));
    }
  }, [selectedMonth, dispatch]);

  const handleMonthChange = offset => {
    dispatch(changeMonth(offset));
  };

  const handleDayClick = day => {
    const monthName = new Date(selectedMonth + '-01').toLocaleString('en-US', {
      month: 'long',
    });
    const formattedDate = `${selectedMonth}-${String(day).padStart(2, '0')}`;
    dispatch(setSelectedDay({ day, month: monthName }));
    dispatch(fetchDayWater(formattedDate));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <div className={styles.monthWaterBox}>
      <div className={styles.header}>
        <h3 className={styles.monthWaterTitle}>Month</h3>
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

      {/* {loading && <p>Loading...</p>} */}
      {error && <p>Error: {error}</p>}

      <div className={styles.daysList}>
        {daysInMonth.map(({ day, dailyNorma, isFuture }) => (
          <div
            key={day}
            className={`${styles.day} ${isFuture ? styles.disabled : ''}`}
            onClick={() => handleDayClick(day)}
          >
            <div
              className={`${styles.dayCircle} ${
                dailyNorma < 100 ? styles.incomplete : ''
              }`}
            >
              {day}
            </div>
            <p className={styles.dayDrinked}>
              {dailyNorma > 0 ? `${dailyNorma}%` : ''}
            </p>{' '}
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
