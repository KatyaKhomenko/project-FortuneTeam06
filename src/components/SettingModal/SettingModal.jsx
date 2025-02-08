import styles from './SettingModal.module.css';
import toast from 'react-hot-toast';

import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { useEffect, useState } from 'react';

import { profileUserDataSchema } from '../../utils/schema.js'
import { getUserInfo, updateUser } from '../../redux/userDataSettings/operations';
import { selectUser } from '../../redux/userDataSettings/selectors';


const SettingModal = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [initialValues, setInitialValues] = useState({
    gender: '',
    name: '',
    email: '',
    photo: '',
    passwordOutdated: '',
    passwordNew: '',
    newPasswordRepeat: ''
  });

  useEffect(() => {
    if (user && user.data) {
      console.log('user: ', user.data);
      setInitialValues({
        gender: user.data.gender || '',
        name: user.data.name || '',
        email: user.data.email,
        photo: user.data.photo || '',
        passwordOutdated: '',
        passwordNew: '',
        newPasswordRepeat: ''
      })
    }
  }, [user]);

  const [showPassword, setshowPassword] = useState({
    outdated: false,
    new: false,
    repeat: false
  });
  const [isModalOpen, setIsModalOpen] = useState(true);

  const togglePassword = (typeOfPassword) => {
    setshowPassword(prevState => ({
      ...prevState,
      [typeOfPassword]: !prevState[typeOfPassword]
    }))
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = (values, actions) => {
    const getChangedFields = (initial, current) => {
        return Object.keys(current).reduce((changedFields, key) => {
            if (initial[key] !== current[key]) {
              changedFields[key] = current[key];
            }
            return changedFields;
        }, {});
    };

    const changedValues = getChangedFields(initialValues, values);

    console.log("Змінені дані:", changedValues);

    if (Object.keys(changedValues).length > 0) {
      try {
        dispatch(updateUser(changedValues));
        actions.resetForm();
      } catch (error) {
        toast.error('User not found');
      }
    }
  }

  useEffect(() => {
    if (isModalOpen) {
      dispatch(getUserInfo());
    }
  }, [isModalOpen]);

  return (
    <div className={`${styles.modalOverlay} ${isModalOpen ? styles.isOpen : ''}`}>
      <div className={styles.modalContainer}>
        <div className={styles.headerModalContainer}>
          <h3 className={styles.titleModal}>Settings</h3>
          <button onClick={toggleModal} className={styles.closeBtn}>
            <svg className={styles.uploadSvg} width="24" height="24">
              <use href="/src/assets/icons/sprite.svg#icon-arrow-left"></use>
            </svg>
          </button>
        </div>
        <div>
          <div>
            <Formik initialValues={initialValues} enableReinitialize={true} validationSchema={profileUserDataSchema} onSubmit={handleSubmit}>
              <Form>
                <label htmlFor="photo">
                  <h4 className={styles.title}>Your photo</h4>
                  <div className={styles.uploadPhotoContainer}>
                    <svg className={styles.uploadSvgUser} width="80" height="80">
                      <use href="/src/assets/icons/sprite.svg#icon-user"></use>
                    </svg>
                    <span className={styles.uploadPhoto}>
                      <svg className={styles.uploadImgSvg} width="16" height="16">
                        <use href="/src/assets/icons/sprite.svg#icon-upload"></use>
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
                  />
                  <ErrorMessage name="photo" component="span" />
                </label>
                <div>
                  <div className={styles.formMargin}>
                    <h4 className={styles.title}>Your gender identity</h4>
                    <div className={styles.radioContainer}>
                      <label className={styles.labelTitle}>
                        <Field className={styles.radioButton} type='radio' name='gender' value='female'/>
                        Woman
                      </label>
                      <label className={styles.labelTitle}>
                        <Field className={styles.radioButton} type='radio' name='gender' value='man'/>
                        Man
                      </label>
                    </div>
                    <ErrorMessage name="gender" component="span" />
                    <div className={styles.form}>
                      <label className={styles.inputContainer}>
                        <span className={styles.title}>Your name</span>
                        <div className={styles.errorContainer}>
                          <Field name='name'>
                            {({ field, meta }) => (
                              <input
                                {...field}
                                type="text"
                                placeholder='David'
                                className={`${styles.input} ${meta.touched && meta.error ? styles.inputError : ''}`}
                              />
                            )}
                          </Field>
                          <ErrorMessage className={styles.errorMsg} name='name' component='span' />
                        </div>
                      </label>
                      <label className={styles.inputContainer}>
                        <span className={styles.title}>Email</span>
                        <div className={styles.errorContainer}>
                          <Field className={styles.input} name='email'>
                            {({ field, meta }) => (
                              <input
                                {...field}
                                type="text"
                                placeholder='david01@gmail.com'
                                className={`${styles.input} ${meta.touched && meta.error ? styles.inputError : ''}`}
                              />
                            )}
                          </Field>
                          <ErrorMessage className={styles.errorMsg} name='email' component='span' />
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className={styles.formPassword}>
                    <h4 className={styles.titleFormPassword}>Password</h4>
                    <label>
                      <span className={styles.titlePassword}>Outdated password:</span>
                      <div className={styles.inputPasswordContainer}>
                        <Field className={styles.input}  name='passwordOutdated'>
                          {({ field, meta }) => (
                            <input
                              {...field}
                              type={showPassword.outdated ? 'text' : 'password'}
                              placeholder='Password'
                              className={`${styles.input} ${meta.touched && meta.error ? styles.inputError : ''}`}
                            />
                          )}
                        </Field>
                        <button
                          type='button'
                          className={styles.butttonEye}
                          onClick={() => togglePassword('outdated')}
                        >
                          <svg className={styles.uploadSvg} width="16" height="16">
                            {showPassword.outdated ?
                              <use href="/src/assets/icons/sprite.svg#icon-eye"></use>
                              :
                              <use href="/src/assets/icons/sprite.svg#icon-eye-slash"></use>
                            }
                          </svg>
                        </button>
                        <ErrorMessage className={styles.errorMsg} name='passwordOutdated' component='span' />
                      </div>
                    </label>
                    <label>
                      <span className={styles.titlePassword}>New Password:</span>
                      <div className={styles.inputPasswordContainer}>
                        <Field className={styles.input} name='passwordNew'>
                          {({ field, meta }) => (
                            <input
                              {...field}
                              type={showPassword.new ? 'text' : 'password'}
                              placeholder='Password'
                              className={`${styles.input} ${meta.touched && meta.error ? styles.inputError : ''}`}
                            />
                          )}
                        </Field>
                        <button
                          type='button'
                          className={styles.butttonEye}
                          onClick={() => togglePassword('new')}
                        >
                          <svg className={styles.uploadSvg} width="16" height="16">
                            {showPassword.new ?
                              <use href="/src/assets/icons/sprite.svg#icon-eye"></use>
                              :
                              <use href="/src/assets/icons/sprite.svg#icon-eye-slash"></use>
                            }
                          </svg>
                        </button>
                        <ErrorMessage className={styles.errorMsg} name='passwordNew' component='span' />
                      </div>
                    </label>
                    <label>
                      <span className={styles.titlePassword}>Repeat new password:</span>
                      <div className={styles.inputPasswordContainer}>
                        <Field className={styles.input} name='newPasswordRepeat'>
                          {({ field, meta }) => (
                            <input
                              {...field}
                              type={showPassword.repeat ? 'text' : 'password'}
                              placeholder='Password'
                              className={`${styles.input} ${meta.touched && meta.error ? styles.inputError : ''}`}
                            />
                          )}
                        </Field>
                        <button
                          type='button'
                          className={styles.butttonEye}
                          onClick={() => togglePassword('repeat')}
                        >
                          <svg className={styles.uploadSvg} width="16" height="16">
                            {showPassword.repeat ?
                              <use href="/src/assets/icons/sprite.svg#icon-eye"></use>
                              :
                              <use href="/src/assets/icons/sprite.svg#icon-eye-slash"></use>
                            }
                          </svg>
                        </button>
                        <ErrorMessage className={styles.errorMsg} name='newPasswordRepeat' component='span' />
                      </div>
                    </label>
                  </div>
                </div>
                <button className={styles.saveButton} type='submit'>Save</button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
   )
}

export default SettingModal;
