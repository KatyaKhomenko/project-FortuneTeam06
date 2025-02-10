import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import AuthForm from '../AuthForm/AuthForm';
import { login } from '../../redux/auth/operations';
import { validationLoginSchema } from '../../utils/schema';
import { useEffect, useState } from 'react';
import { selectError } from '../../redux/auth/selectors';

const INITIAL_VALUES = { email: '', password: '' };

const SignInAuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sendForm, setSendForm] = useState(false);
  const error = useSelector(selectError);

  const handleSubmit = async (values, actions) => {
    await dispatch(login(values));
    setSendForm(true);
    actions.resetForm();
  };
  useEffect(() => {
    if (sendForm && error) {
      setSendForm(false);
      toast.error('Invalid email or password');
    } else if (sendForm && !error) {
      navigate('/home');
    }
    setSendForm(false);
  }, [sendForm, error, navigate]);

  return (
    <AuthForm
      title="Sign In"
      initialValues={INITIAL_VALUES}
      validationSchema={validationLoginSchema}
      onSubmit={handleSubmit}
      submitText="Sign In"
      extraNav={<Link to={'/signup'}>Sign Up</Link>}
    />
  );
};

export default SignInAuthForm;
