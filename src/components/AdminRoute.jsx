import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const isAdmin = Boolean(token && user && user.role === 'admin');

  return isAdmin ? children : <Navigate to="/login" replace />;
};

export default AdminRoute;