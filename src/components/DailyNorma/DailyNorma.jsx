import { useState } from 'react';

import DailyNormaModal from '../../components/DailyNormaModal/DailyNormaModal';

import styles from './DailyNorma.module.css';

const DailyNorma = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [waterNorm, setWaterNorm] = useState(2.0);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleWaterNormChange = newWaterNorm => {
    setWaterNorm(newWaterNorm);
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
          onWaterNormChange={setWaterNorm}
        />
      )}
    </div>
  );
};

export default DailyNorma;
