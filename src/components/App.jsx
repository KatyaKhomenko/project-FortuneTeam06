import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from '../pages/HomePage/HomePage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import SigninPage from '../pages/SigninPage/SigninPage';
import SignupPage from '../pages/SignupPage/SignupPage';
import WelcomePage from '../pages/WelcomePage/WelcomePage';
import { RestrictedRoute } from '../components/RestrictedRoute/RestrictedRoute';
import { selectIsLoggedIn } from '../redux/auth/selectors';


function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div>
      <Routes>
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/welcome" element={<WelcomePage />} />

        <Route
          path="/"
          element={<RestrictedRoute component={<HomePage />} />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
