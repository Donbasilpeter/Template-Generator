import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  // If authenticated, redirect to home ("/")
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
