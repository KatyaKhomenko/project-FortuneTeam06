import React, { useState } from 'react';
import styles from './MonthStatsTable.module.css';

const MonthStatsTable = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const handlePrevMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(currentMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(currentMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  const monthName = months[currentMonth.getMonth()];
  const year = currentMonth.getFullYear();

  const daysInMonth = new Date(year, currentMonth.getMonth() + 1, 0).getDate();

  const daysArray = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1
  );

  return (
    <div className={styles.monthStatsTable}>
      <div className={styles.header}>
        <h2 className={styles.monthTitle}>Month</h2>
        <div className={styles.monthControls}>
          <button className={styles.switchButton} onClick={handlePrevMonth}>
            ←
          </button>
          <span className={styles.monthName}>
            {monthName}, {year}
          </span>
          <button className={styles.switchButton} onClick={handleNextMonth}>
            →
          </button>
        </div>
      </div>

      <div className={styles.daysWrapper}>
        {daysArray.map(day => (
          <div key={day} className={styles.dayCell}>
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthStatsTable;