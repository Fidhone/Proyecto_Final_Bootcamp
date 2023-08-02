import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App.jsx';
import { Protected, ProtectedCheckChildren } from './components';
import { AuthContextProvider } from './context/authContext.jsx';
import {
  AboutUs,
  Admin,
  Contact,
  Dashboard,
  ForgotPassword,
  Home,
  Login,
  Profile,
  Register,
  VerifyCode,
} from './pages';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route
              path="/register"
              element={
                <ProtectedCheckChildren>
                  <Register />
                </ProtectedCheckChildren>
              }
            />
            <Route
              path="/verifyCode"
              element={
                <ProtectedCheckChildren>
                  <VerifyCode />
                </ProtectedCheckChildren>
              }
            />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route
              path="/login"
              element={
                <ProtectedCheckChildren>
                  <Login />
                </ProtectedCheckChildren>
              }
            />
            <Route
              path="/dashboard"
              element={
                <Protected>
                  <Dashboard />
                </Protected>
              }
            />
            <Route
              path="/profile"
              element={
                <Protected>
                  <Profile />
                </Protected>
              }
            />
            <Route
              path="/admin"
              element={
                <Protected>
                  <Admin />
                </Protected>
              }
            />
            <Route
              path="/contact"
              element={
                <Protected>
                  <Contact />
                </Protected>
              }
            />
            <Route
              path="/aboutus"
              element={
                <Protected>
                  <AboutUs />
                </Protected>
              }
            />
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
