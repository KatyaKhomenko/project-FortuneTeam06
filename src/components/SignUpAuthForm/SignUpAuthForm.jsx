import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import AuthForm from '../AuthForm/AuthForm';
import { login, register } from '../../redux/auth/operations';
import { validationRegisterSchema } from '../../utils/schema';
import { useEffect, useState } from 'react';
import { selectError } from '../../redux/auth/selectors.js';

const INITIAL_VALUES = { email: '', password: '', repeatPassword: '' };

const SignUpAuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sendForm, setSendForm] = useState(false);
  const error = useSelector(selectError);

  const handleSubmit = async (values, actions) => {
    delete values.repeatPassword;

    await dispatch(register(values));
    setSendForm(true);
    actions.resetForm();
  };

  useEffect(() => {
    if (sendForm && error) {
      setSendForm(false);
      // toast.error('This email is already in use');
      alert('This email is already in use');
    } else if (sendForm && !error) {
      navigate('/signin');
    }
    setSendForm(false);
  }, [sendForm, error, navigate]);

  return (
    <AuthForm
      title="Sign Up"
      initialValues={INITIAL_VALUES}
      validationSchema={validationRegisterSchema}
      onSubmit={handleSubmit}
      submitText="Sign Up"
      extraNav={<button onClick={() => navigate('/signin')}>Sign In</button>}
    />
  );
};

export default SignUpAuthForm;
