import css from './AuthBackground.module.css';

const AuthBackground = ({ children }) => {
  // const isSignInPage = window.location.pathname === '/signin';

  return <div className={css.background}>{children}</div>;
};

export default AuthBackground;
