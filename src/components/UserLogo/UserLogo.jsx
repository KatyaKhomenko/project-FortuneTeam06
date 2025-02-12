import { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserLogoModal from '../UserLogoModal/UserLogoModal';
import { HiOutlineChevronDown } from 'react-icons/hi2';
import css from './UserLogo.module.css';
import { selectUser } from '../../redux/userDataSettings/selectors';
import { getUserInfo } from '../../redux/userDataSettings/operations';

export default function UserLogo() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector(selectUser);
  const [avatar, setAvatar] = useState(user?.data?.avatarUrl || null);

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  useEffect(() => {
    setAvatar(user?.data?.avatarUrl || null);
  }, [user?.data?.avatarUrl]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const closeModal = () => setIsModalOpen(false);

  const initials = useMemo(() => {
    if (user?.data?.name) return user.data.name[0].toUpperCase();
    if (user?.data?.email) return user.data.email[0].toUpperCase();
    return '?';
  }, [user?.data?.name, user?.data?.email]);

  return (
    <>
      <div className={css.userLogo} onClick={toggleModal}>
        <span className={css.userName}>
          {user?.data?.name || user?.data?.email || 'User'}
        </span>
        <div className={css.avatarWrapper}>
          {avatar ? (
            <img className={css.userAvatar} src={avatar} alt={initials} />
          ) : (
            <span className={css.initials}>{initials}</span>
          )}
        </div>
        <HiOutlineChevronDown className={css.dropdownIcon} />
        {isModalOpen && <UserLogoModal setIsOpenUserModal={closeModal} />}
      </div>
    </>
  );
}
