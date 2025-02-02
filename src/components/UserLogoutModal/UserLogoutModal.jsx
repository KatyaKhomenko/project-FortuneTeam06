import React, { useState, useEffect } from 'react';
import styles from '../UserLogoutModal/UserLogoutModal.module.css';
import { useDispatch } from 'react-redux';

const UserLogoutModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEscKeyDown, setIsEscKeyDown] = useState(false);
  // const dispatch = useDispatch();

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

  const handleLogout = () => {
    console.log('Lgout!');
    // dispatch(logout());
    handleCloseModal();
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
              <h2 className={styles.titleModal}>Log out</h2>
              <button className={styles.closeBtn} onClick={handleCloseModal}>
                &times;
              </button>
            </div>
            <div className={styles.modalContent}>
              <p className={styles.textModal}>Do you really want to leave?</p>
            </div>
            <div className={styles.modalActions}>
              <button className={styles.deleteBtn} onClick={handleLogout}>
                Log out
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

export default UserLogoutModal;
