import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useId } from 'react';
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
  const confirmPasswordFieldId = useId();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        console.log('Formik submitting:', values);
        onSubmit(values, actions);
      }}
    >
      <Form className={css.form}>
        <h2 className={css.title}>{title}</h2>
        <label htmlFor={emailFieldId} className={css.label}>
          Enter your email
        </label>
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

        <label htmlFor={passwordFieldId} className={css.label}>
          Enter your password
        </label>
        <Field
          id={passwordFieldId}
          className={css.input}
          type="password"
          name="password"
          placeholder="Password"
        />
        <ErrorMessage
          className={css.errorMessage}
          name="password"
          component="span"
        />

        {title === 'Sign Up' && (
          <>
            <label htmlFor={confirmPasswordFieldId} className={css.label}>
              Repeat password
            </label>
            <Field
              id={confirmPasswordFieldId}
              className={css.input}
              type="password"
              name="confirmPassword"
              placeholder="Repeat password"
            />
            <ErrorMessage
              className={css.errorMessage}
              name="confirmPassword"
              component="span"
            />
          </>
        )}

        <button type="submit" className={css.submit}>
          {submitText}
        </button>
        {extraButton && <div className={css.extrabtn}>{extraButton}</div>}
        {extraNav && <div className={css.extrabtn}>{extraNav}</div>}
      </Form>
    </Formik>
  );
};

export default AuthForm;
