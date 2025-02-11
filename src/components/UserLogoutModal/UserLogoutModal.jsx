import React, { useEffect } from 'react';
import styles from '../UserLogoutModal/UserLogoutModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/operations';
import toast from 'react-hot-toast';
import { selectLoading } from '../../redux/auth/selectors';

import sprite from '../../assets/icons/sprite.svg';

const UserLogoutModal = ({ isOpen = false, setIsOpen }) => {
   const sessionId = localStorage.getItem('sessionId');
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape' && isOpen) {
        handleCloseModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await dispatch(logout(sessionId));
      handleCloseModal();
      toast.success('Successfully logged out!');
    } catch (error) {
      toast.error('Failed to log out. Please try again.');
    }
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
            className={styles.modalWindow}
            onClick={e => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2 className={styles.mainTitle}>Log out</h2>
              <button
                className={styles.closeBtn}
                onClick={e => {
                  e.stopPropagation();
                  handleCloseModal();
                }}
              >
                <svg className={styles.icon} aria-hidden="true">
                  <use href={`${sprite}#icon-outline`} />
                </svg>
              </button>
            </div>
            <div className={styles.modalContent}>
              <p className={styles.textModal}>Do you really want to leave?</p>
            </div>
            <div className={styles.modalActions}>
              <button
                className={styles.deleteBtn}
                onClick={handleLogout}
                disabled={isLoading}
              >
                Log out
              </button>
              <button
                className={styles.cancelBtn}
                onClick={e => {
                  e.preventDefault();
                  handleCancel();
                }}
              >
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
