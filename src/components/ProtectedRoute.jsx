import React from 'react';
import { useFirebase } from '../context/Firebase';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => { // <-- accept children as a prop
  const { user } = useFirebase();

  if (user === undefined) return null; // optional: wait for auth state to load

  return user ? children : <Navigate to='/login' />;
};

export default ProtectedRoute;

