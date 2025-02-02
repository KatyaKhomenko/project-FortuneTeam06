import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

import AuthForm from '../AuthForm/AuthForm';
import { register } from '../../redux/auth/operations';
import { validationRegisterSchema } from '../../utils/schema';

const INITIAL_VALUES = { email: '', password: '', confirmPassword: '' };

const SignUpAuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, actions) => {
    console.log(values);

    try {
      await dispatch(
        register({ ...values, email: values.email.trim() })
      ).unwrap();
      navigate('/signin');
    } catch (err) {
      toast.error('Registration failed');
    }
    actions.resetForm();
  };

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
