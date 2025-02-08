import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

import AuthForm from '../AuthForm/AuthForm';
import { login } from '../../redux/auth/operations';
import { validationLoginSchema } from '../../utils/schema';

const INITIAL_VALUES = { email: '', password: '' };

const SignInAuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values, actions) => {
    try {
      dispatch(login(values)).unwrap();
      navigate('/');
    } catch (err) {
      toast.error('Invalid email or password');
    }
  };

  return (
    <AuthForm
      title="Sign In"
      initialValues={INITIAL_VALUES}
      validationSchema={validationLoginSchema}
      onSubmit={handleSubmit}
      submitText="Sign In"
      // extraButton={
      //   <button onClick={() => navigate('/forgot-password')}>
      //     Forgot password?
      //   </button>
      // }
      extraNav={<button onClick={() => navigate('/signup')}>Sign Up</button>}
    />
  );
};

export default SignInAuthForm;
