import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import SigninPage from '../pages/SigninPage/SigninPage';
import SignupPage from '../pages/SignupPage/SingupPage';
import WelcomePage from '../pages/WelcomePage/WelcomePage';
import ProtectedRoute from '../components/ProtectedRoute';

function App() {
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <div>
      <Routes>
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/welcome" element={<WelcomePage />} />

        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
