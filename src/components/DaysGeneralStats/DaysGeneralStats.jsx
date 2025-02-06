import { useSelector, useDispatch } from 'react-redux';
import { selectSelectedDay } from '../../redux/monthWater/selectors';
import { setSelectedDay } from '../../redux/monthWater/slice';
import styles from './DaysGeneralStats.module.css';

const DaysGeneralStats = () => {
  const dispatch = useDispatch();
  const selectedDay = useSelector(selectSelectedDay);

  if (!selectedDay) return null;

  const closeModal = e => {
    if (e.target.classList.contains(styles.overlay)) {
      dispatch(setSelectedDay(null));
    }
  };

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modal}>
        <h3>
          {selectedDay?.day}, {selectedDay?.month}
        </h3>
        <p>
          <strong>Daily norm:</strong> {selectedDay['Daily norma']}
        </p>
        <p>
          <strong>Fulfillment:</strong>{' '}
          {selectedDay['Fulfillment of the daily norm']}%
        </p>
        <p>
          <strong>Servings:</strong> {selectedDay['How many servings of water']}
        </p>
      </div>
    </div>
  );
};

export default DaysGeneralStats;
