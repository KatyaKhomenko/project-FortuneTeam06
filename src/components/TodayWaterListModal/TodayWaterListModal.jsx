import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format, parseISO, isToday } from 'date-fns';
import styles from './TodayWaterListModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectTodayWater } from '../../redux/todayWater/selectors';
import { getAllTodayWater } from '../../redux/todayWater/operations';

const TodayWaterListModal = ({ isOpen = false, setIsOpen }) => {
  const dispatch = useDispatch();
  const todayWaterData = useSelector(selectTodayWater);

  const [serwerWaterAmount, setServerWaterAmount] = useState(0);
  const [serverLastWaterTime, setServerLastWaterTime] = useState('');
  const [waterAmount, setWaterAmount] = useState(0);
  const [inputWaterAmount, setInputWaterAmount] = useState('');
  const [recordingTime, setRecordingTime] = useState(
    format(new Date(), 'HH:mm')
  );
  const [lastWaterTime, setLastWaterTime] = useState('');

  useEffect(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    dispatch(getAllTodayWater(today));
  }, [dispatch]);

  useEffect(() => {
    if (todayWaterData.length > 0) {
      const lastWater = todayWaterData[todayWaterData.length - 1];

      if (lastWater.drinTime) {
        const parsedTime = new Date(lastWater.drinTime.replace(' ', 'T'));
        setServerLastWaterTime(format(parsedTime, 'HH:mm'));
      } else {
        setServerLastWaterTime(format(new Date(), 'HH:mm'));
      }

      setServerWaterAmount(lastWater.drinkedWater);

      setWaterAmount(lastWater.drinkedWater);
      setInputWaterAmount(lastWater.drinkedWater.toString());
    } else {
      setServerWaterAmount(0);
      setServerLastWaterTime(format(new Date(), 'HH:mm'));
      setWaterAmount(0);
      setInputWaterAmount('0');
    }
  }, [todayWaterData]);

  useEffect(() => {
    const now = format(new Date(), 'HH:mm');
    setRecordingTime(now);
  }, []);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape' && isOpen) {
        handleCloseModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const increaseWaterAmount = () => {
    const newAmount = waterAmount + 50;
    setWaterAmount(newAmount);
    setInputWaterAmount(newAmount.toString());
  };

  const decreaseWaterAmount = () => {
    const newAmount = Math.max(waterAmount - 50, 0);
    setWaterAmount(newAmount);
    setInputWaterAmount(newAmount.toString());
  };

  const handleBlurInput = () => {
    const value = parseInt(inputWaterAmount, 10);
    if (!isNaN(value) && value >= 0) {
      setWaterAmount(value);
    } else {
      setWaterAmount(0);
      setInputWaterAmount('0');
    }
  };

  const handleChangeInput = e => {
    const value = e.target.value;
    setInputWaterAmount(value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('Saving data:', { amount: waterAmount, time: recordingTime });
    setLastWaterTime(recordingTime);
  };

  const timeOptions = Array.from({ length: 288 }, (_, i) => {
    const hours = String(Math.floor(i / 12)).padStart(2, '0');
    const minutes = String((i % 12) * 5).padStart(2, '0');
    return `${hours}:${minutes}`;
  });

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
              <svg className={styles.iconGlass} aria-hidden="true">
                <use href="../../assets/icons/sprite.svg#icon-glass" />
              </svg>
              <span className={styles.inputMl}>{serwerWaterAmount} ml</span>
              <div className={styles.lastWaterTime}>{serverLastWaterTime}</div>
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
                <svg className={styles.icon} aria-hidden="true">
                  <use href="../../assets/icons/sprite.svg#icon-minus-small" />
                </svg>
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
                <svg className={styles.icon} aria-hidden="true">
                  <use href="../../assets/icons/sprite.svg#icon-plus-small" />
                </svg>
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
                  <span className={styles.secondlabelText}>
                    {' '}
                    Enter the value of the water used:
                  </span>
                  <input
                    className={styles.valueWater}
                    type="text"
                    value={inputWaterAmount}
                    onChange={handleChangeInput}
                    onBlur={handleBlurInput}
                    onKeyPress={e => {
                      if (!/[0-9]/.test(e.key) && e.key !== 'Backspace') {
                        e.preventDefault();
                      }
                    }}
                    inputMode="numeric"
                    pattern="[0-9]*"
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
