import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './TodayWaterListModal.module.css';

const TodayWaterListModal = ({ isOpen, setIsOpen }) => {
  const [waterAmount, setWaterAmount] = useState(250);
  const [inputWaterAmount, setInputWaterAmount] = useState('');
  const [recordingTime, setRecordingTime] = useState('');
  const [lastWaterTime, setLastWaterTime] = useState('');

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

    const fetchLastWaterIntakeTime = async () => {
      try {
        const response = await axios.get('/api/water-intake/last');
        const data = response.data;

        if (data && data.time) {
          const todayDate = new Date().toISOString().split('T')[0];
          const intakeDate = new Date(data.time).toISOString().split('T')[0];

          if (todayDate === intakeDate) {
            setLastWaterTime(new Date(data.time).toLocaleTimeString());
          } else {
            setLastWaterTime(`${hours}:${minutes}`);
          }
        } else {
          setLastWaterTime(`${hours}:${minutes}`);
        }
      } catch (error) {
        console.error('Error fetching last water intake time:', error);
        setLastWaterTime(`${hours}:${minutes}`);
      }
    };

    fetchLastWaterIntakeTime();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const increaseWaterAmount = () => {
    const newAmount = waterAmount + 50;
    setWaterAmount(newAmount);
    setInputWaterAmount(newAmount);
  };

  const decreaseWaterAmount = () => {
    const newAmount = Math.max(waterAmount - 50, 0);
    setWaterAmount(newAmount);
    setInputWaterAmount(newAmount);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('Saving data:', { amount: waterAmount, time: recordingTime });
    setLastWaterTime(recordingTime);
  };

  const handleBlurInput = () => {
    const value = parseInt(inputWaterAmount, 10);
    if (!isNaN(value) && value >= 0) {
      setWaterAmount(value);
    } else {
      setWaterAmount(0);
    }
  };

  const handleChangeInput = e => {
    const value = e.target.value;
    setInputWaterAmount(value);

    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue) && numericValue >= 0) {
      setWaterAmount(numericValue);
    }
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
              <div className={styles.lastWaterTime}>{lastWaterTime}</div>
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
                className={styles.updateInput}
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
              <div className={styles.formFeald}>
                <label className={styles.label}>
                  Recording time:
                  <select
                    className={styles.select}
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
                <label className={styles.labelSecond}>
                  Enter the value of the water used:
                  <input
                    className={styles.valueWater}
                    type="text"
                    value={inputWaterAmount}
                    onChange={handleChangeInput}
                    onBlur={handleBlurInput}
                  />
                </label>
              </div>
              <div className={styles.footerModal}>
                <div className={styles.finalWater}>{waterAmount}ml</div>
                <button type="submit" className={styles.saveBtn}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodayWaterListModal;
