import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { format } from 'date-fns';

import sprite from '../../assets/icons/sprite.svg';

import { selectTodayWater } from '../../redux/todayWater/selectors';
import { selectIsLoading } from '../../redux/todayWater/selectors';

import {
  addWater,
  getAllTodayWater,
  updateWater,
} from '../../redux/todayWater/operations';

import DeleteConfirmationModal from '../../components/DeleteConfirmationModal/DeleteConfirmationModal';
import AddWaterModal from '../../components/AddWaterModal/AddWaterModal';
import TodayWaterListModal from '../../components/TodayWaterListModal/TodayWaterListModal';
import Loader from '../../components/Loader/Loader';

import styles from './TodayWaterList.module.css';

const TodayWaterList = () => {
  const dispatch = useDispatch();
  const water = useSelector(selectTodayWater);
  const isLoading = useSelector(selectIsLoading);

  const [modalType, setModalType] = useState(null);
  const [selectedWaterId, setSelectedWaterId] = useState(null);
  const [selectedWaterEntry, setSelectedWaterEntry] = useState(null);

  useEffect(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    dispatch(getAllTodayWater(today));
  }, []);

  const handleAddWater = () => {
    setModalType('addWater');
  };

  const handleEditWater = entry => {
    setSelectedWaterEntry(entry);
    setModalType('editWater');
  };

  const handleDeleteClick = id => {
    setSelectedWaterId(id);
    setModalType('deleteConfirm');
  };

  const saveWaterData = data => {
    dispatch(addWater(data));
  };

  const saveEditedWater = async updatedEntry => {
    await dispatch(updateWater(updatedEntry)); // Цей запит вже має оновлювати Redux-стан
    setModalType(null); // Закриваємо модалку після збереження
  };

  const closeModal = () => {
    setModalType(null);
  };

  useEffect(() => {
    if (modalType) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modalType]);

  return (
    <div className={styles.todayWaterBox}>
      <h3 className={styles.todayWaterTitle}>Today</h3>
      {isLoading && (
        <div>
          <Loader />
        </div>
      )}

      {!isLoading && water?.length === 0 && (
        <p className={styles.noNotesMessage}>No notes yet.</p>
      )}

      {water?.length > 0 && !isLoading && (
        <ul className={styles.todayWaterList}>
          {water.map(entry => (
            <li className={styles.todayWaterItem} key={entry._id}>
              <div className={styles.todayWaterValue}>
                <svg className={styles.glassIcon}>
                  <use
                    className={styles.glass}
                    href={`${sprite}#icon-glass`}
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
                  onClick={() => handleEditWater(entry)}
                >
                  <svg className={styles.editIcon}>
                    <use
                      className={styles.edit}
                      href={`${sprite}#icon-edit`}
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
                      href={`${sprite}#icon-trash`}
                    ></use>
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button
        className={styles.addWaterBtn}
        type="button"
        onClick={handleAddWater}
      >
        <svg className={styles.plusIcon}>
          <use className={styles.plus} href={`${sprite}#icon-plus-small`}></use>
        </svg>
        Add water
      </button>
      {modalType === 'addWater' && (
        <AddWaterModal
          setIsModalOpen={closeModal}
          saveWaterData={saveWaterData}
        />
      )}
      <DeleteConfirmationModal
        isOpen={modalType === 'deleteConfirm' && !isLoading}
        setIsOpen={closeModal}
        id={selectedWaterId}
      />
      {modalType === 'editWater' && !isLoading && (
        <TodayWaterListModal
          isOpen={true}
          setIsOpen={closeModal}
          onSave={saveEditedWater}
          id={selectedWaterEntry._id}
        />
      )}
    </div>
  );
};

export default TodayWaterList;
