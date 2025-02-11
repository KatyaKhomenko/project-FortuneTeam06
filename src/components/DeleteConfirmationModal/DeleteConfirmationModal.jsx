import React, { useState, useEffect } from 'react';
import styles from '../DeleteConfirmationModal/DeleteConfirmationModal.module.css';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { deleteWater } from '../../redux/todayWater/operations';

import sprite from '../../assets/icons/sprite.svg';

const DeleteConfirmationModal = ({ isOpen = false, setIsOpen, id }) => {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleKeyDown = event => {
    if (event.key === 'Escape' && isOpen) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleDelete = async () => {
    if (!id) {
      toast.error('No entry selected for deletion.');
      return;
    }

    try {
      await dispatch(deleteWater(id)).unwrap();
      toast.success('Entry deleted successfully');
      handleCloseModal();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete the entry. Please try again.');
    }
  };
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleCloseModal}>
      <div className={styles.modalWindow} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.titleModal}>Delete entry</h2>
          <button className={styles.closeBtn} onClick={handleCloseModal}>
            <svg className={styles.icon} aria-hidden="true">
              <use href={`${sprite}#icon-outline`} />
            </svg>
          </button>
        </div>
        <div className={styles.modalContent}>
          <p className={styles.textModal}>
            Are you sure you want to delete the entry?
          </p>
        </div>
        <div className={styles.modalActions}>
          <button className={styles.deleteBtn} onClick={handleDelete}>
            Delete
          </button>
          <button className={styles.cancelBtn} onClick={handleCloseModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
