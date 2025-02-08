import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { SharedLayout } from "../components/SharedLayout/SharedLayout.jsx";
import { PrivateRoute } from "../components/PrivateRoute/PrivateRoute.jsx";
import { RestrictedRoute } from "../components/RestrictedRoute/RestrictedRoute.jsx";
import Loader from "../components/Loader/Loader.jsx";


import css from "./App.module.css";


const HomePage = lazy(() => import("../pages/HomePage/HomePage.jsx"));
const SignUpPage = lazy(() => import("../pages/SignupPage/SignupPage.jsx"));
const SignInPage = lazy(() => import("../pages/SigninPage/SigninPage.jsx"));
const WelcomePage = lazy(() => import("../pages/WelcomePage/WelcomePage.jsx"));

const NotFoundPage = lazy(() =>import("../pages/NotFoundPage/NotFoundPage.jsx"));

export default function App() {


  return (
    <div className={css.app}>
      <Suspense fallback={<Loader loader={true} />}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
          <Route index element={<Navigate to="/welcome" replace />} />
            <Route path="/welcome" element={<WelcomePage />}></Route>
            <Route
              path="/signup"
              element={
                <RestrictedRoute
                  redirectTo="/home"
                  component={<SignUpPage />}
                />
              }
            ></Route>
            <Route
              path="/signin"
              element={
                <RestrictedRoute
                  redirectTo="/home"
                  component={<SignInPage />}
                />
              }
            ></Route>
            <Route
            path="/home"
             element={
                <PrivateRoute
                  redirectTo="/signin"
                  component={<HomePage />}
                  />
                }
            ></Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}
