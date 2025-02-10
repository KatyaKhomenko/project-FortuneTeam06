import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/monthWater/slice';
import {
  selectSelectedDay,
  selectSelectedDayData,
  selectLoading,
  selectError,
} from '../../redux/monthWater/selectors';
import styles from './DaysGeneralStats.module.css';

const DaysGeneralStats = ({ dayRefs }) => {
  const dispatch = useDispatch();
  const selectedDay = useSelector(selectSelectedDay);
  const selectedDayData = useSelector(selectSelectedDayData);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  if (!selectedDay) return null;

  const handleOverlayClick = () => {
    dispatch(closeModal());
  };

  const handleModalClick = e => {
    e.stopPropagation();
  };

  const { top, left } = dayRefs.current || {};

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div
        className={styles.modal}
        style={{
          top: top - 3,
          // left: left
        }}
        onClick={handleModalClick}
      >
        <h3 className={styles.dayGenTitle}>
          {selectedDay.day}, {selectedDay.month}
        </h3>
        <ul className={styles.dayGenUl}>
          <li>
            <p>
              Daily norm:{' '}
              <span className={styles.dayGenValue}>
                {selectedDayData?.['Daily norma'] || ''}
              </span>
            </p>
          </li>
          <li>
            <p>
              Fulfillment of the daily norm:{' '}
              <span className={styles.dayGenValue}>
                {selectedDayData?.['Fulfillment of the daily norm'] || ''}%
              </span>
            </p>
          </li>
          <li>
            <p>
              How many servings of water:{' '}
              <span className={styles.dayGenValue}>
                {selectedDayData?.['How many servings of water'] || ''}
              </span>
            </p>
          </li>
        </ul>

        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className={styles.error}>Error</p>
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </div>
  );
};

export default DaysGeneralStats;
