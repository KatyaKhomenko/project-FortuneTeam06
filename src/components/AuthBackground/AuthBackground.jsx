import css from './AuthBackground.module.css';

const AuthBackground = ({ children }) => {
  return <div className={css.background}>{children}</div>;
};

export default AuthBackground;
