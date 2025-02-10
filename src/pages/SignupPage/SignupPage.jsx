import { Toaster } from 'react-hot-toast';

import AuthBackground from '../../components/AuthBackground/AuthBackground';
import SignUpAuthForm from '../../components/SignUpAuthForm/SignUpAuthForm';

const SignupPage = () => {
  return (
    <>
      <AuthBackground>
        <Toaster />
        <SignUpAuthForm />
      </AuthBackground>
    </>
  );
};

export default SignupPage;
