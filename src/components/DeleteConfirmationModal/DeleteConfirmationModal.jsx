import React, { useState, useEffect } from 'react';
import styles from '../DeleteConfirmationModal/DeleteConfirmationModal.module.css';
import { useDispatch } from 'react-redux';

const DeleteConfirmationModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isEscKeyDown, setIsEscKeyDown] = useState(false);
  // const dispatch = useDispatch();

  const handleOpenModal = () => {
    setIsOpen(true);
    setIsEscKeyDown(false);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setIsEscKeyDown(false);
  };

  const handleKeyDown = event => {
    if (event.key === 'Escape' && isOpen) {
      handleCloseModal();
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleDelete = () => {
    console.log('Delete!');
    handleCloseModal();
    // dispatch(delete (id));
  };

  const handleCancel = () => {
    handleCloseModal();
  };

  return (
    <div
      onClick={e => {
        if (isOpen) {
          e.stopPropagation();
        }
      }}
    >
      {isOpen && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            className={styles.modalWwindow}
            onClick={e => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2 className={styles.titleModal}>Delete entry</h2>
              <button className={styles.closeBtn} onClick={handleCloseModal}>
                &times;
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
              <button className={styles.cancelBtn} onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteConfirmationModal;
