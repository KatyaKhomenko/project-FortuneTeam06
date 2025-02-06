import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { format } from 'date-fns';

import { selectTodayWater } from '../../redux/todayWater/selectors';

import { getAllTodayWater } from '../../redux/todayWater/operations';

import DeleteConfirmationModal from '../../components/DeleteConfirmationModal/DeleteConfirmationModal';

import styles from './TodayWaterList.module.css';

const TodayWaterList = () => {
  const dispatch = useDispatch();
  const water = useSelector(selectTodayWater);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWaterId, setSelectedWaterId] = useState(null);

  useEffect(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    dispatch(getAllTodayWater(today));
  }, [dispatch]);

  const handleDeleteClick = id => {
    setSelectedWaterId(id);
    setIsModalOpen(true);
  };

  return (
    <div className={styles.todayWaterBox}>
      <h3 className={styles.todayWaterTitle}>Today</h3>
      {water?.length > 0 && (
        <ul className={styles.todayWaterList}>
          {water.map(entry => (
            <li className={styles.todayWaterItem} key={entry._id}>
              <div className={styles.todayWaterValue}>
                <svg className={styles.glassIcon}>
                  <use
                    className={styles.glass}
                    href="/src/assets/icons/sprite.svg#icon-glass"
                  ></use>
                </svg>
                <span className={styles.todayAmount}>
                  {entry.drinkedWater} ml
                </span>
                <span className={styles.todayTime}>
                  {entry.drinkTime.split(' ')[1]}
                </span>
              </div>

              <div className={styles.button}>
                <button
                  className={styles.editWaterBtn}
                  type="button"
                  onClick={() => handleEditWater(entry._id)}
                >
                  <svg className={styles.editIcon}>
                    <use
                      className={styles.edit}
                      href="/src/assets/icons/sprite.svg#icon-edit"
                    ></use>
                  </svg>
                </button>

                <button
                  className={styles.deleteWaterBtn}
                  type="button"
                  onClick={() => handleDeleteClick(entry._id)}
                >
                  <svg className={styles.trashIcon}>
                    <use
                      className={styles.trash}
                      href="/src/assets/icons/sprite.svg#icon-trash"
                    ></use>
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <DeleteConfirmationModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        id={selectedWaterId}
      />

      <button className={styles.addWaterBtn} type="button">
        <svg className={styles.plusIcon}>
          <use
            className={styles.plus}
            href="/src/assets/icons/sprite.svg#icon-plus-small"
          ></use>
        </svg>
        Add water
      </button>
    </div>
  );
};

export default TodayWaterList;
