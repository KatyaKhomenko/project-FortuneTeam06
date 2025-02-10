import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeMonth,
  generateDaysInMonth,
  setSelectedDay,
  setDailyNorma,
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
import { selectUser } from '../../redux/userDataSettings/selectors';
import {
  fetchMonthWater,
  fetchDayWater,
} from '../../redux/monthWater/operations';
import DaysGeneralStats from '../DaysGeneralStats/DaysGeneralStats';
import sprite from '../../assets/icons/sprite.svg';
import styles from './MonthStatsTable.module.css';

const MonthStatsTable = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);
  const dailyNorma = userData?.data?.dailyNorm || 1500;
  const selectedMonth = useSelector(selectSelectedMonth);
  const isCurrentMonth = useSelector(selectIsCurrentMonth);
  const daysInMonth = useSelector(selectDaysInMonth);
  const selectedDay = useSelector(selectSelectedDay);
  const isModalOpen = useSelector(selectIsModalOpen);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(setDailyNorma(dailyNorma));
    dispatch(generateDaysInMonth());
    if (selectedMonth) {
      dispatch(fetchMonthWater(selectedMonth));
    }
  }, [selectedMonth, dailyNorma, dispatch]);

  const handleMonthChange = offset => {
    dispatch(changeMonth(offset));
  };

  const handleDayClick = (day, index, e) => {
    const rect = e.target.getBoundingClientRect();
    const screenWidth = window.innerWidth;
    let positionClass = '';
    let left = rect.left;
    let top = rect.top;

    if (screenWidth < 768) {
      left = 'auto';
      top = rect.top - 3;
    } else if (screenWidth >= 768 && screenWidth < 1440) {
      const columnIndex = index % 10;
      positionClass =
        columnIndex < 5 ? 'rightPositionMoadal' : 'leftPositionModal';
    } else {
      positionClass = 'leftPositionModal';
    }

    const monthName = new Date(selectedMonth + '-01').toLocaleString('en-US', {
      month: 'long',
    });
    const formattedDate = `${selectedMonth}-${String(day).padStart(2, '0')}`;
    dispatch(
      setSelectedDay({ day, month: monthName, top, left, positionClass })
    );
    dispatch(fetchDayWater(formattedDate));
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
        {daysInMonth.map(({ day, dailyNorma, isFuture }, index) => (
          <li
            key={day}
            className={`${styles.day} ${isFuture ? styles.disabled : ''}`}
            onClick={e => handleDayClick(day, index, e)}
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
      {isModalOpen && selectedDay && <DaysGeneralStats />}

      {/* {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>} */}
    </div>
  );
};

export default MonthStatsTable;
