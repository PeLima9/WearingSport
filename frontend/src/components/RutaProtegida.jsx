import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RutaProtegida = ({ children, rolPermitido }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (rolPermitido && user.rol !== rolPermitido) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RutaProtegida;
