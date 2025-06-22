import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    // No está logueado, lo mandamos a login
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.rol)) {
    // Tiene sesión pero no tiene rol permitido
    return <Navigate to="/no-autorizado" replace />;
  }

  return children;
};

export default ProtectedRoute;
