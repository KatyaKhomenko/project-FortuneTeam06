import { useEffect, useRef, useState } from "react";
import { HiCog6Tooth } from "react-icons/hi2";
import { HiOutlineLogout } from "react-icons/hi";
import css from "./UserLogoModal.module.css";
import UserLogoutModal from "../UserLogoutModal/UserLogoutModal";
// import SettingModal from "../SettingModal/SettingModal";
import { useDispatch } from "react-redux";
import { logOutModal, settingModal } from "../../redux/modal/slice";


const UserLogoModal = () => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  // const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  // const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  const handleLogoutClick = (event) => {
    event.stopPropagation();
    console.log("Logout button clicked!");
    // setIsLogoutModalOpen(true);
    dispatch(logOutModal());
    console.log("isLogoutModalOpen:", true);
  };

  const handleSettingsClick = (event) => {
    event.stopPropagation();
    dispatch(settingModal());
    // setIsSettingsModalOpen(true);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
      // setIsLogoutModalOpen(false);
      // setIsSettingsModalOpen(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsDropdownOpen(false);
      // setIsLogoutModalOpen(false);
      // setIsSettingsModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {isDropdownOpen && (
        <div className={css.dropdownMenu} ref={modalRef}>
          <button className={css.settingsBtn} onClick={handleSettingsClick}>
            <HiCog6Tooth className={css.settingsIcon} />
            Settings
          </button>
          <button className={css.logoutBtn} onClick={handleLogoutClick}>
            <HiOutlineLogout className={css.logoutIcon} />
            Log out
          </button>
        </div>
      )}
      {/* Display SettingModal if open */}
      {/* {isSettingsModalOpen && (<SettingModal onClose={() => setIsSettingsModalOpen(false)}/>)} */}
      <SettingModal/>
      {/* <SettingModal/> */}
      {/**/}
      {/* {isLogoutModalOpen && (<UserLogoutModal onClose={() => setIsLogoutModalOpen(false)} />)} */}
      <UserLogoutModal/>
    </>
  );
};

export default UserLogoModal;
