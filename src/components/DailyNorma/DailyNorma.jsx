import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Skeleton from 'react-loading-skeleton';

import DailyNormaModal from '../../components/DailyNormaModal/DailyNormaModal';

import { selectUser } from '../../redux/userDataSettings/selectors';

import styles from './DailyNorma.module.css';

const DailyNorma = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [waterNorm, setWaterNorm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const userData = useSelector(selectUser);
  const dailyNorma = userData?.data?.dailyNorm;

  useEffect(() => {
    if (dailyNorma !== undefined) {
      setWaterNorm(dailyNorma / 1000);
      setIsLoading(false);
    }
  }, [dailyNorma]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  /*   const handleWaterNormChange = newWaterNorm => {
    setWaterNorm(newWaterNorm);
  }; */

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  return (
    <div className={styles.dailyNormaBox}>
      <h3 className={styles.dailyNormaTitle}>My daily norma</h3>

      {isLoading ? (
        <div className={styles.loader}>
          <Skeleton
            width={35}
            height={4}
            borderRadius={4}
            baseColor={'#9ebbff'}
          />
        </div>
      ) : (
        <>
          <p className={styles.dailyNormaValue}>{waterNorm} L</p>
          <button
            type="button"
            onClick={openModal}
            className={styles.dailyNormaBtn}
          >
            Edit
          </button>
        </>
      )}

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
