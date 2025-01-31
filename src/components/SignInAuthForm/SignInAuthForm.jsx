import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import css from '../SignInAuthForm/SignInAuthForm.module.css';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must be the most 64 characters')
    .required('Required'),
});

const initialValues = {
  email: '',
  password: '',
};

const SingInAuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sendForm, setSendForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values, actions) => {
    await dispatch(register(values))
    setSendForm(true);
    actions.resetForm();
  };
  useEffect(() => {
    if (sendForm && !!'error') {
      navigate('/');
    }

    setSendForm(false);
  }, [sendForm, navigate]);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={LoginSchema}
    >
      <Form className={css.form}>
        <h2 className={css.title}>Sign In</h2>
        <label className={css.label}>
          <p className={css.inputText}>Enter your email</p>
          <Field
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
        <label className={css.label}>
          <p className={css.inputText}>Enter your password</p>
          <div className={css.inputCont}>
            <Field
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
              {showPassword ? 'Close' : 'Open'}
            </button>
          </div>
          <ErrorMessage
            className={css.errorMessage}
            name="password"
            component="span"
          />
        </label>
        <button type="submit" className={css.singin}>
          Sing In
        </button>
        <div className={css.btnCont}>
          <button
            type="button"
            className={css.footerBtn}
            onClick={() => navigate('/signup')}
          >
            Sing In
          </button>
          <button type="button" className={css.footerBtn}>
            Forgot Password
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default SingInAuthForm;
