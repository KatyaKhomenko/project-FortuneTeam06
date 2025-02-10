import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/monthWater/slice';
import {
  selectSelectedDay,
  selectSelectedDayData,
  selectLoading,
  selectError,
} from '../../redux/monthWater/selectors';
import { selectUser } from '../../redux/userDataSettings/selectors';
import styles from './DaysGeneralStats.module.css';

const DaysGeneralStats = () => {
  const dispatch = useDispatch();
  const selectedDay = useSelector(selectSelectedDay);
  const selectedDayData = useSelector(selectSelectedDayData);
  const userData = useSelector(selectUser);
  console.log(userData);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  if (!selectedDay) return null;

  const handleOverlayClick = () => {
    dispatch(closeModal());
  };

  const handleModalClick = e => {
    e.stopPropagation();
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div
        className={`${styles.modal} ${styles[selectedDay.positionClass] || ''}`}
        style={{
          top: selectedDay.top,
          left: selectedDay.left,
        }}
        onClick={handleModalClick}
      >
        <h3 className={styles.dayGenTitle}>
          {selectedDay.day}, {selectedDay.month}
        </h3>
        <ul className={styles.dayGenUl}>
          <li>
            <p className={styles.dayGenDscr}>
              Daily norm:{' '}
              <span className={styles.dayGenValue}>
                {selectedDayData?.['Daily norma'] || ''}
              </span>
            </p>
          </li>
          <li>
            <p className={styles.dayGenDscr}>
              Fulfillment of the daily norm:{' '}
              <span className={styles.dayGenValue}>
                {selectedDayData?.['Fulfillment of the daily norm'] || ''}
              </span>
            </p>
          </li>
          <li>
            <p className={styles.dayGenDscr}>
              How many servings of water:{' '}
              <span className={styles.dayGenValue}>
                {selectedDayData?.['How many servings of water'] || ''}
              </span>
            </p>
          </li>
        </ul>

        {/* {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className={styles.error}>Error</p>
        ) : (
          <p>No data available.</p>
        )} */}
      </div>
    </div>
  );
};

export default DaysGeneralStats;
