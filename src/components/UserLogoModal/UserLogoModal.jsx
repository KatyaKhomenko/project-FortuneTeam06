import { useEffect, useRef, useState } from 'react';
import css from './UserLogoModal.module.css';
import UserLogoutModal from '../UserLogoutModal/UserLogoutModal';
import SettingModal from '../SettingModal/SettingModal';
import spriteIcon from '../../assets/icons/sprite.svg';

const UserLogoModal = ({ setIsOpenUserModal }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !event.target.closest('.userLogoButton') &&
        !isSettingModalOpen &&
        !isLogoutModalOpen
      ) {
        setIsOpenUserModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpenUserModal, isSettingModalOpen, isLogoutModalOpen]);

  return (
    <>
      <ul className={css.dropDownMenu} ref={modalRef}>
        <li>
          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              setIsSettingModalOpen(true);
            }}
            className={css.dropDownButton}
          >
            <svg width="16" height="16" className={css.icon}>
              <use href={`${spriteIcon}#icon-settings`}></use>
            </svg>
            Setting
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              setIsLogoutModalOpen(true);
            }}
            className={css.dropDownButton}
          >
            <svg width="16" height="16" className={css.icon}>
              <use href={`${spriteIcon}#icon-logout`}></use>
            </svg>
            Log out
          </button>
        </li>
      </ul>
      {isLogoutModalOpen && (
        <UserLogoutModal
          isOpen={isLogoutModalOpen}
          setIsOpen={setIsLogoutModalOpen}
        />
      )}
      {isSettingModalOpen && (
        <SettingModal
          isOpen={isSettingModalOpen}
          onClose={() => {
            setIsSettingModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default UserLogoModal;
