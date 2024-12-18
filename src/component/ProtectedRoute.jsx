import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("Token");
  
  if(!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return <Outlet/>;
};

export default ProtectedRoute;
