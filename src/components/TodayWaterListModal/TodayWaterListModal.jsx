import React, { useEffect, useState } from 'react';
import styles from './TodayWaterListModal.module.css';

const TodayWaterListModal = ({ isOpen, setIsOpen }) => {
  const [waterAmount, setWaterAmount] = useState(250);
  const [recordingTime, setRecordingTime] = useState('');

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleKeyDown = e => {
    if (e.key === 'Escape' && isOpen) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    setRecordingTime(`${hours}:${minutes}`);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const increaseWaterAmount = () => {
    setWaterAmount(prevAmount => prevAmount + 50);
  };

  const decreaseWaterAmount = () => {
    setWaterAmount(prevAmount => Math.max(prevAmount - 50, 0));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    console.log('Saving data:', { amount: waterAmount, time: recordingTime });
  };

  const timeOptions = [];
  for (let i = 0; i < 24 * 60; i += 5) {
    const hours = String(Math.floor(i / 60)).padStart(2, '0');
    const minutes = String(i % 60).padStart(2, '0');
    timeOptions.push(`${hours}:${minutes}`);
  }
  return (
    <div onClick={e => isOpen && e.stopPropagation()}>
      {isOpen && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            className={styles.modalWwindow}
            onClick={e => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2 className={styles.titleModal}>
                Edit the entered amount of water
              </h2>
              <button className={styles.closeBtn} onClick={handleCloseModal}>
                &times;
              </button>
            </div>
            <div className={styles.modalContent}>
              🥛 <span className={styles.inputMl}>{waterAmount} ml</span>
            </div>
            <div className={styles.twoTitle}>
              <h3 className={styles.textModal}>Correct entered data:</h3>
              <h4 className={styles.modalSecondText}>Amount of water:</h4>
            </div>

            <div className={styles.plusAndMinus}>
              <button
                className={styles.plusButton}
                type="button"
                onClick={decreaseWaterAmount}
              >
                -
              </button>
              <input
                className={styles.modalInput}
                type="number"
                value={waterAmount}
                readOnly
              />
              <span className={styles.inputMl}>ml</span>
              <button
                className={styles.plusButton}
                type="button"
                onClick={increaseWaterAmount}
              >
                +
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <label>
                  Recording time:
                  <select
                    value={recordingTime}
                    onChange={e => setRecordingTime(e.target.value)}
                  >
                    {timeOptions.map((time, index) => (
                      <option key={index} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Enter the value of the water used:
                  <input type="text" />
                </label>
              </div>
              <button type="submit" className={styles.saveBtn}>
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodayWaterListModal;
