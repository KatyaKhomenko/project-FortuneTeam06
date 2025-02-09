import { Toaster } from 'react-hot-toast';

import AuthBackground from '../../components/AuthBackground/AuthBackground';
import SignInAuthForm from '../../components/SignInAuthForm/SignInAuthForm';

const SigninPage = () => {
  return (
    <>
      <AuthBackground>
        <Toaster />
        <SignInAuthForm />
      </AuthBackground>
    </>
  );
};

export default SigninPage;
