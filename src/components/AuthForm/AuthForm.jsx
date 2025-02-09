import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useId, useState } from 'react';
import sprite from '../../assets/icons/sprite.svg';

import css from './AuthForm.module.css';

const AuthForm = ({
  title,
  initialValues,
  validationSchema,
  onSubmit,
  submitText,
  extraButton,
  extraNav,
}) => {
  const emailFieldId = useId();
  const passwordFieldId = useId();
  const repeatPasswordId = useId();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <div className={css.container}>
        <Form className={css.form}>
          <h2 className={css.title}>{title}</h2>
          <label htmlFor={emailFieldId} className={css.label}>
            <p>Enter your email</p>
            <Field
              id={emailFieldId}
              className={css.input}
              type="text"
              name="email"
              placeholder="E-mail"
            />
            <ErrorMessage
              className={css.errorMessage}
              name="email"
              component="span"
            />
          </label>
          <label htmlFor={passwordFieldId} className={css.label}>
            <p>Enter your password</p>

            <div className={css.cont}>
              <Field
                id={passwordFieldId}
                className={css.input}
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
              />

              <button
                className={css.eye}
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg className={css.eyeIcon}>
                    <use
                      className={css.eyeIcon}
                      href={`${sprite}#icon-eye`}
                    ></use>
                  </svg>
                ) : (
                  <svg className={css.eyeIcon}>
                    <use
                      className={css.eyeIcon}
                      href={`${sprite}#icon-eye-slash`}
                    ></use>
                  </svg>
                )}
              </button>
            </div>
            <ErrorMessage
              className={css.errorMessage}
              name="password"
              component="span"
            />
          </label>
          {title === 'Sign Up' && (
            <>
              <label htmlFor={repeatPasswordId} className={css.label}>
                <p>Repeat password</p>

                <div className={css.cont}>
                  <Field
                    id={repeatPasswordId}
                    className={css.input}
                    type={showPassword ? 'text' : 'password'}
                    name="repeatPassword"
                    placeholder="Repeat password"
                  />
                  <button
                    className={css.eye}
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg className={css.eyeIcon}>
                        <use
                          width="16px"
                          height="16px"
                          className={css.eyeIcon}
                          href="/src/assets/icons/sprite.svg#icon-eye"
                        ></use>
                      </svg>
                    ) : (
                      <svg className={css.eyeIcon}>
                        <use
                          width="16px"
                          height="16px"
                          className={css.eyeIcon}
                          href="/src/assets/icons/sprite.svg#icon-eye-slash"
                        ></use>
                      </svg>
                    )}
                  </button>
                </div>
                <ErrorMessage
                  className={css.errorMessage}
                  name="repeatPassword"
                  component="span"
                />
              </label>
            </>
          )}

          <button type="submit" className={css.submit}>
            {submitText}
          </button>

          {extraButton && <div className={css.extrabtn}>{extraButton}</div>}
          {extraNav && <div className={css.extrabtn}>{extraNav}</div>}
        </Form>
      </div>
    </Formik>
  );
};

export default AuthForm;
