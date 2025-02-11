import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import sprite from '../../assets/icons/sprite.svg';

import AddWaterModal from '../../components/AddWaterModal/AddWaterModal';

import { addWater } from '../../redux/todayWater/operations';

import { selectTodayWater } from '../../redux/todayWater/selectors';

import styles from './WaterRatioPanel.module.css';

const WaterRatioPanel = () => {
  const dispatch = useDispatch();
  const todayWater = useSelector(selectTodayWater);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const saveWaterData = data => {
    dispatch(addWater(data));
    setIsModalOpen(false);
  };

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  const norma = 2000;
  const totalWater = todayWater.reduce(
    (sum, item) => sum + item.drinkedWater,
    0
  );

  const ratio = Math.min(totalWater / norma, 1) * 100;

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
    <div className={styles.waterRatioPanelBox}>
      <div className={styles.waterBox}>
        <h3 className={styles.addWaterTitle}>Today</h3>
        <div className={styles.box}>
          <div className={styles.progressBar}>
            <div
              className={styles.filledTrack}
              style={{ width: `${ratio}%` }}
            ></div>
            <div className={styles.track}></div>

            <div
              className={styles.indicator}
              style={{ left: `${ratio}%` }}
            ></div>
          </div>
        </div>

        <div className={styles.scale}>
          <span className={ratio <= 0 ? styles.active : ''}>0%</span>
          <span className={ratio >= 50 && ratio < 100 ? styles.active : ''}>
            50%
          </span>
          <span className={ratio >= 100 ? styles.active : ''}>100%</span>
        </div>
      </div>

      <button
        className={styles.addWaterBtn}
        type="button"
        onClick={toggleModal}
      >
        <svg className={styles.addIcon} width="24" height="24">
          <use className={styles.add} href={`${sprite}#icon-plus-circle`}></use>
        </svg>
        Add Water
      </button>

      {isModalOpen && (
        <AddWaterModal
          setIsModalOpen={setIsModalOpen}
          saveWaterData={saveWaterData}
        />
      )}
    </div>
  );
};

export default WaterRatioPanel;
