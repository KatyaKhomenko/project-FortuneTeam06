/* import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DailyNormaModal from '../../components/DailyNormaModal/DailyNormaModal';

import {
  getDailyNorma,
  updateWaterNorm,
} from '../../redux/dailyNorma/operations';

import { selectDailyNorma } from '../../redux/dailyNorma/selectors';

import styles from './DailyNorma.module.css';

const DailyNorma = () => {
  const dispatch = useDispatch();
  const waterNorm = useSelector(selectDailyNorma);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(getDailyNorma());
  }, [dispatch]);

  const handleWaterNormChange = newNorm => {
    dispatch(updateWaterNorm(newNorm));
  };

  return (
    <div className={styles.dailyNormaBox}>
      <h3 className={styles.dailyNormaTitle}>My daily norma</h3>
      <p className={styles.dailyNormaValue}>{waterNorm} L</p>
      <button
        type="button"
        onClick={openModal}
        className={styles.dailyNormaBtn}
      >
        Edit
      </button>
      {isModalOpen && (
        <DailyNormaModal
          onClose={closeModal}
          onWaterNormChange={handleWaterNormChange}
        />
      )}
    </div>
  );
};

export default DailyNorma; */

const DailyNorma = () => {
  return <div>DailyNorma</div>;
};

export default DailyNorma;
