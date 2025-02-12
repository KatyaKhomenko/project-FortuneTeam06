import styles from './SettingModal.module.css';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import sprite from '../../assets/icons/sprite.svg';

import { useDispatch, useSelector } from 'react-redux';
import { selectError } from '../../redux/userDataSettings/selectors';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import { useEffect, useState } from 'react';
import { profileUserDataSchema } from '../../utils/schema.js';

import Loader from '../Loader/Loader';

import {
  getUserInfo,
  updateUser,
  updateUserPassword,
} from '../../redux/userDataSettings/operations';
import { selectUser, selectUserIsLoading } from '../../redux/userDataSettings/selectors';

const SettingModal = () => {
  const sessionId = localStorage.getItem('sessionId');
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const error = useSelector(selectError);
  const loader = useSelector(selectUserIsLoading);

  const [userImg, setUserImg] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [sendData, setSendData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setshowPassword] = useState({
    outdated: false,
    new: false,
    repeat: false,
  });
  const [initialValues, setInitialValues] = useState({
    gender: '',
    name: '',
    email: '',
    photo: '',
    oldPassword: '',
    newPassword: '',
    newPasswordRepeat: '',
  });

  useEffect(() => {
    setLoading(loader);
  }, [loader])

  useEffect(() => {
    if (user && user.data) {
      setInitialValues({
        gender: user.data.gender || '',
        name: user.data.name || '',
        email: user.data.email,
        photo: '',
        oldPassword: '',
        newPassword: '',
        newPasswordRepeat: '',
      });
    }
  }, [user]);

  const togglePassword = typeOfPassword => {
    setshowPassword(prevState => ({
      ...prevState,
      [typeOfPassword]: !prevState[typeOfPassword],
    }));
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleFileChange = event => {
    const photo = event.target.files[0];

    if (!photo) return;

    if (photo) {
      const formPhoto = new FormData();
      formPhoto.append('photo', photo);

      try {
        dispatch(updateUser(formPhoto));
        setSendData(true);
        actions.resetForm();
      } catch (error) {
        toast.error('Photo not found');
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        setUserImg(reader.result);
      };

      reader.readAsDataURL(photo);
    }
  };

  const handleSubmit = async (values, actions) => {
    const getChangedFields = (initial, current) => {
      return Object.keys(current).reduce((changedFields, key) => {
        if (initial[key] !== current[key]) {
          changedFields[key] = current[key];
        }
        return changedFields;
      }, {});
    };

    const changedValues = getChangedFields(initialValues, values);

    if (
      Object.keys(changedValues).includes('oldPassword') &&
      Object.keys(changedValues).includes('newPassword')
    ) {
      const passwordData = {
        oldPassword: changedValues.oldPassword,
        newPassword: changedValues.newPassword,
        sessionId,
      };

      try {
        await dispatch(updateUserPassword(passwordData));
        setSendData(true);
        actions.resetForm();
      } catch (error) {
        toast.error('Error reset your password');
      }
    }

    if (Object.keys(changedValues).length > 0) {
      const hasPasswords =
        Object.keys(changedValues).includes('oldPassword') &&
        Object.keys(changedValues).includes('newPassword');

      const createRequestData = changedValues => {
        const filteredData = Object.fromEntries(
          Object.entries(changedValues).filter(
            ([key]) =>
              key !== 'oldPassword' &&
              key !== 'newPassword' &&
              key !== 'newPasswordRepeat'
          )
        );
        return filteredData;
      };

      const requestData = hasPasswords
        ? createRequestData(changedValues)
        : changedValues;

      try {
        await dispatch(updateUser(requestData));
        await dispatch(getUserInfo());
        setSendData(true);
        actions.resetForm();
      } catch (error) {
        toast.error('User not found');
      }
    }
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (user?.data?.avatarUrl) {
      setUserImg(user.data.avatarUrl);
    }
  }, [user?.data?.avatarUrl]);

  useEffect(() => {
    if (isModalOpen) {
      dispatch(getUserInfo());
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (sendData && error) {
      setSendData(false);
      toast.error('Something wrong!');
    } else if (sendData && !error) {
      toast.success('Data successfully changed');
    }
    setSendData(false);
  }, [sendData, error]);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      className={`${styles.modalOverlay} ${isModalOpen ? styles.isOpen : ''}`}
      onClick={handleBackdropClick}
    >
      <Toaster position="top-center" reverseOrder={false} />
      {loading?(<Loader loader = { true } />):
        (<div className={styles.modalContainer} onClick={e => e.stopPropagation()}>
        <div className={styles.headerModalContainer}>
          <h3 className={styles.titleModal}>Settings</h3>
          <button onClick={toggleModal} className={styles.closeBtn}>
            <svg className={styles.uploadSvg} width="24" height="24">
              <use href={`${sprite}#icon-outline`}></use>
            </svg>
          </button>
        </div>
        <div>
          <div className={styles.formButton}>
            <Formik
              enableReinitialize={true}
              initialValues={initialValues}
              validationSchema={profileUserDataSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <label htmlFor="photo">
                  <h4 className={styles.titlePhoto}>Your photo</h4>
                  <div className={styles.uploadPhotoContainer}>
                    {userImg ? (
                      <img
                        src={userImg}
                        className={styles.uploadPhoto}
                        alt="User image"
                        width="80"
                        height="80"
                      />
                    ) : (
                      <svg
                        className={styles.uploadSvgUser}
                        width="80"
                        height="80"
                      >
                        <use href={`${sprite}#icon-user`}></use>
                      </svg>
                    )}
                    <span className={styles.uploadPhoto}>
                      <svg
                        className={styles.uploadImgSvg}
                        width="16"
                        height="16"
                      >
                        <use href={`${sprite}#icon-upload`}></use>
                      </svg>
                      Upload a photo
                    </span>
                  </div>
                  <Field
                    id="photo"
                    type="file"
                    className={styles.photoLink}
                    name="photo"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <ErrorMessage name="photo" component="span" />
                </label>
                <div className={styles.formContainer}>
                  <div className={styles.formMargin}>
                    <h4 className={styles.titleGender}>Your gender identity</h4>
                    <div className={styles.radioContainer}>
                      <label className={styles.labelTitle}>
                        <Field
                          className={styles.radioButton}
                          type="radio"
                          name="gender"
                          value="female"
                        />
                        Woman
                      </label>
                      <label className={styles.labelTitle}>
                        <Field
                          className={styles.radioButton}
                          type="radio"
                          name="gender"
                          value="male"
                        />
                        Man
                      </label>
                    </div>
                    <ErrorMessage name="gender" component="span" />
                    <div className={styles.form}>
                      <label className={styles.inputContainer}>
                        <span className={styles.title}>Your name</span>
                        <div className={styles.errorContainer}>
                          <Field name="name">
                            {({ field, meta }) => (
                              <input
                                {...field}
                                type="text"
                                placeholder="David"
                                className={`${styles.input} ${
                                  meta.touched && meta.error
                                    ? styles.inputError
                                    : ''
                                }`}
                              />
                            )}
                          </Field>
                          <ErrorMessage
                            className={styles.errorMsg}
                            name="name"
                            component="span"
                          />
                        </div>
                      </label>
                      <label className={styles.inputContainer}>
                        <span className={styles.title}>Email</span>
                        <div className={styles.errorContainer}>
                          <Field className={styles.input} name="email">
                            {({ field, meta }) => (
                              <input
                                {...field}
                                type="text"
                                placeholder="david01@gmail.com"
                                className={`${styles.input} ${
                                  meta.touched && meta.error
                                    ? styles.inputError
                                    : ''
                                }`}
                              />
                            )}
                          </Field>
                          <ErrorMessage
                            className={styles.errorMsg}
                            name="email"
                            component="span"
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className={styles.formPassword}>
                    <h4 className={styles.titleFormPassword}>Password</h4>
                    <label>
                      <span className={styles.titlePassword}>
                        Outdated password:
                      </span>
                      <div className={styles.inputPasswordContainer}>
                        <Field className={styles.input} name="oldPassword">
                          {({ field, meta }) => (
                            <input
                              {...field}
                              type={showPassword.outdated ? 'text' : 'password'}
                              placeholder="Password"
                              className={`${styles.input} ${
                                meta.touched && meta.error
                                  ? styles.inputError
                                  : ''
                              }`}
                            />
                          )}
                        </Field>
                        <button
                          type="button"
                          className={styles.butttonEye}
                          onClick={() => togglePassword('outdated')}
                        >
                          <svg
                            className={styles.uploadSvg}
                            width="16"
                            height="16"
                          >
                            {showPassword.outdated ? (
                              <use href={`${sprite}#icon-eye`}></use>
                            ) : (
                              <use href={`${sprite}#icon-eye-slash`}></use>
                            )}
                          </svg>
                        </button>
                        <ErrorMessage
                          className={styles.errorMsg}
                          name="oldPassword"
                          component="span"
                        />
                      </div>
                    </label>
                    <label>
                      <span className={styles.titlePassword}>
                        New Password:
                      </span>
                      <div className={styles.inputPasswordContainer}>
                        <Field className={styles.input} name="newPassword">
                          {({ field, meta }) => (
                            <input
                              {...field}
                              type={showPassword.new ? 'text' : 'password'}
                              placeholder="Password"
                              className={`${styles.input} ${
                                meta.touched && meta.error
                                  ? styles.inputError
                                  : ''
                              }`}
                            />
                          )}
                        </Field>
                        <button
                          type="button"
                          className={styles.butttonEye}
                          onClick={() => togglePassword('new')}
                        >
                          <svg
                            className={styles.uploadSvg}
                            width="16"
                            height="16"
                          >
                            {showPassword.new ? (
                              <use href={`${sprite}#icon-eye`}></use>
                            ) : (
                              <use href={`${sprite}#icon-eye-slash`}></use>
                            )}
                          </svg>
                        </button>
                        <ErrorMessage
                          className={styles.errorMsg}
                          name="newPassword"
                          component="span"
                        />
                      </div>
                    </label>
                    <label>
                      <span className={styles.titlePassword}>
                        Repeat new password:
                      </span>
                      <div className={styles.inputPasswordContainer}>
                        <Field
                          className={styles.input}
                          name="newPasswordRepeat"
                        >
                          {({ field, meta }) => (
                            <input
                              {...field}
                              type={showPassword.repeat ? 'text' : 'password'}
                              placeholder="Password"
                              className={`${styles.input} ${
                                meta.touched && meta.error
                                  ? styles.inputError
                                  : ''
                              }`}
                            />
                          )}
                        </Field>
                        <button
                          type="button"
                          className={styles.butttonEye}
                          onClick={() => togglePassword('repeat')}
                        >
                          <svg
                            className={styles.uploadSvg}
                            width="16"
                            height="16"
                          >
                            {showPassword.repeat ? (
                              <use href={`${sprite}#icon-eye`}></use>
                            ) : (
                              <use href={`${sprite}#icon-eye-slash`}></use>
                            )}
                          </svg>
                        </button>
                        <ErrorMessage
                          className={styles.errorMsg}
                          name="newPasswordRepeat"
                          component="span"
                        />
                      </div>
                    </label>
                  </div>
                </div>
                <div className={styles.buttonContainer}>
                  <button className={styles.saveButton} type="submit">
                    Save
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>)
      }
    </div>
  );
};

export default SettingModal;
