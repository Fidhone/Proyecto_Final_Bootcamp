import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../context/authContext';

export const Dashboard = () => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  useEffect(() => {
    console.log(user);
  }, [user]);

  return <div>Dashboard</div>;
};
