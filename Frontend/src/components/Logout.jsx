import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  const logout = () => {
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <>
      {isLoggedIn ? <button onClick={logout}>Logout</button> : <p>No estás conectado.</p>}
    </>
  );
};

export default Logout;
