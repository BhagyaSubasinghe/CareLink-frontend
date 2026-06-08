import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  // Replace this with your actual auth context or token check.
  // For example, checking if a user object exists in localStorage and has the role 'admin'.
  // const user = JSON.parse(localStorage.getItem('user'));
  // const isAdmin = user && user.role === 'admin';
  
  const isAdmin = true; // Hardcoded to true for demonstration. Set to false to test the redirect.

  return isAdmin ? children : <Navigate to="/login" replace />;
};

export default AdminRoute;