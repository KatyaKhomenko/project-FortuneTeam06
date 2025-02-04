import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import AuthForm from '../AuthForm/AuthForm';
import { register } from '../../redux/auth/operations';
import { validationRegisterSchema } from '../../utils/schema';
import { useEffect, useState } from 'react';
import { selectError } from '../../redux/auth/selectors';

const INITIAL_VALUES = { email: '', password: '', repeatPassword: '' };

const SignUpAuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectError);
  // const [sendForm, setSendForm] = useState(false);

  const handleSubmit = async (values, actions) => {
    delete values.repeatPassword;
    console.log(values);
    console.log(error);


    try {
       dispatch(register(values))

      // setSendForm(true);
      actions.resetForm();
    } catch (err) {
      toast.error('Registration failed');
    }
  };
  // useEffect(() => {
  //   if (sendForm && !'error') {
  //   } else if (sendForm && !!'error') {
  //     navigate('/signin');
  //   }
  //   setSendForm(false);
  // }, [sendForm, navigate]);

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
