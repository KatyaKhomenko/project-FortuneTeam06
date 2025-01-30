import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from 'redux/auth/operations';

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must be the most 64 characters')
    .required('Required'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

const initialValues = {
  email: '',
  password: '',
};

const SignUpAuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sendForm, setSendForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values, actions) => {
    await dispatch(register(values))
      .unwrap()
      .catch(error => {
        if (error === 'Request failed with status code 400') {
          alert('This user is already registered');
        }
      });
    setSendForm(true);
    actions.resetForm();
  };
  useEffect(() => {
    if (sendForm && !!'error') {
      navigate('/signin');
    }

    setSendForm(false);
  }, [sendForm, navigate]);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={RegisterSchema}
    >
      <Form>
        <h2>Sign Up</h2>
        <label>
          <span>Enter your email</span>
          <Field type="text" name="email" placeholder="E-mail" />
          <ErrorMessage name="email" component="span" />
        </label>
        <label>
          <span>Enter your password</span>
          <Field type="password" name="password" placeholder="Password" />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? 'Open' : 'Close'}
          </button>
          <ErrorMessage name="password" component="span" />
        </label>
        <label>
          <span>Repeat password</span>
          <Field
            type="password"
            name="repeatPassword"
            placeholder="Repeat password"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? 'Open' : 'Close'}
          </button>
          <ErrorMessage name="repeatPassword" component="span" />
        </label>
        <button type="submit">Sing Up</button>
        <button type="button" onClick={() => navigate('/signin')}>
          Sing In
        </button>
      </Form>
    </Formik>
  );
};

export default SignUpAuthForm;
