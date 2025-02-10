import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectToken } from '../../redux/auth/selectors.js';

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
   const token = useSelector(selectToken);

  return token && isLoggedIn ? Component : <Navigate to={redirectTo} />;
};
