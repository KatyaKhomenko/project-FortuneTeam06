import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/monthWater/slice';
import {
  selectSelectedDay,
  selectSelectedDayData,
} from '../../redux/monthWater/selectors';
import styles from './DaysGeneralStats.module.css';

const DaysGeneralStats = () => {
  const dispatch = useDispatch();
  const selectedDay = useSelector(selectSelectedDay);
  const selectedDayData = useSelector(selectSelectedDayData);

  if (!selectedDay || !selectedDayData) return null;

  return (
    <div className={styles.overlay} onClick={() => dispatch(closeModal())}>
      <div className={styles.modal}>
        <h3>
          {selectedDay.day}, {selectedDay.month}
        </h3>
        <p>
          <strong>Daily norm:</strong> {selectedDayData['Daily norma']}
        </p>
        <p>
          <strong>Fulfillment:</strong>{' '}
          {selectedDayData['Fulfillment of the daily norm']}%
        </p>
        <p>
          <strong>Servings:</strong>{' '}
          {selectedDayData['How many servings of water']}
        </p>
      </div>
    </div>
  );
};

export default DaysGeneralStats;
