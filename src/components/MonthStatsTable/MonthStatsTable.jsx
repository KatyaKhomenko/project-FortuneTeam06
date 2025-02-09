import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeMonth,
  generateDaysInMonth,
  setSelectedDay,
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
import sprite from '../../assets/icons/sprite.svg';
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

  const dayRefs = useRef({});

  useEffect(() => {
    dispatch(generateDaysInMonth());
    if (selectedMonth) {
      dispatch(fetchMonthWater(selectedMonth));
    }
  }, [selectedMonth, dispatch]);

  const handleMonthChange = offset => {
    dispatch(changeMonth(offset));
  };

  const handleDayClick = (day, e) => {
    const rect = e.target.getBoundingClientRect();
    const monthName = new Date(selectedMonth + '-01').toLocaleString('en-US', {
      month: 'long',
    });
    const formattedDate = `${selectedMonth}-${String(day).padStart(2, '0')}`;
    dispatch(setSelectedDay({ day, month: monthName }));
    dispatch(fetchDayWater(formattedDate));
    dayRefs.current = { top: rect.top, left: rect.left };
  };

  return (
    <div className={styles.monthWaterBox}>
      <div className={styles.header}>
        <h3 className={styles.monthWaterTitle}>Month</h3>
        <div className={styles.paginator}>
          <button onClick={() => handleMonthChange(-1)}>
            <svg className={styles.chevronLeft}>
              <use href={`${sprite}#icon-chevron-down`}></use>
            </svg>
          </button>
          <span className={styles.paginatorDate}>
            {new Date(selectedMonth + '-01').toLocaleString('en-US', {
              month: 'long',
            })}
            ,{' '}
            {new Date(selectedMonth + '-01').toLocaleString('en-US', {
              year: 'numeric',
            })}
          </span>
          <button
            className={`${isCurrentMonth ? styles.visuallyHidden : ''}`}
            onClick={() => handleMonthChange(1)}
          >
            <svg className={styles.chevronRight}>
              <use href={`${sprite}#icon-chevron-down`}></use>
            </svg>
          </button>
        </div>
      </div>

      <ul className={styles.daysList}>
        {daysInMonth.map(({ day, dailyNorma, isFuture }) => (
          <li
            key={day}
            className={`${styles.day} ${isFuture ? styles.disabled : ''}`}
            onClick={e => handleDayClick(day, e)}
          >
            <div
              className={`${styles.dayCircle} ${
                selectedDay && day === selectedDay.day ? styles.selectedDay : ''
              } ${dailyNorma < 100 ? styles.incomplete : ''}`}
            >
              {day}
            </div>
            <p className={styles.dayDrinked}>
              {dailyNorma > 0 ? `${dailyNorma}%` : ''}
            </p>{' '}
          </li>
        ))}
      </ul>
      {isModalOpen && selectedDay && <DaysGeneralStats dayRefs={dayRefs} />}

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default MonthStatsTable;
