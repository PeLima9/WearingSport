// src/routes/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAdminLoggedIn = localStorage.getItem("token"); // cambia esto si usas otro método
  return isAdminLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
