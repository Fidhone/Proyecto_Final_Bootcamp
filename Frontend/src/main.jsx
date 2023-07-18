import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App.jsx';
import { AuthContextProvider } from './context/authContext.jsx';
import {
  Dashboard,
  ForgotPassword,
  Home,
  Login,
  // Profile,
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
            <Route path="/register" element={<Register />} />
            <Route path="/verifyCode" element={<VerifyCode />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
