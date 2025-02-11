import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/monthWater/slice';
import {
  selectSelectedDay,
  selectSelectedDayData,
  selectLoadingDay,
  selectError,
} from '../../redux/monthWater/selectors';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './DaysGeneralStats.module.css';

const DaysGeneralStats = () => {
  const dispatch = useDispatch();
  const selectedDay = useSelector(selectSelectedDay);
  const selectedDayData = useSelector(selectSelectedDayData);
  const isLoading = useSelector(selectLoadingDay);

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
                {isLoading ? (
                  <Skeleton
                    width={35}
                    height={4}
                    borderRadius={4}
                    baseColor={'#9ebbff'}
                  />
                ) : (
                  `${selectedDayData?.['Daily norma'] || ''}`
                )}
              </span>
            </p>
          </li>
          <li>
            <p className={styles.dayGenDscr}>
              Fulfillment of the daily norm:{' '}
              <span className={styles.dayGenValue}>
                {isLoading ? (
                  <Skeleton
                    width={35}
                    height={4}
                    borderRadius={4}
                    baseColor={'#9ebbff'}
                  />
                ) : (
                  `${selectedDayData?.['Fulfillment of the daily norm'] || ''}`
                )}
              </span>
            </p>
          </li>
          <li>
            <p className={styles.dayGenDscr}>
              How many servings of water:{' '}
              <span className={styles.dayGenValue}>
                {isLoading ? (
                  <Skeleton
                    width={18}
                    height={4}
                    borderRadius={4}
                    baseColor={'#9ebbff'}
                  />
                ) : (
                  `${selectedDayData?.['How many servings of water'] || ''}`
                )}
              </span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DaysGeneralStats;
