import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:4000/api/Login", {
        method: "POST",
        credentials: "include", // Necesario para enviar la cookie
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const userLogged = {
          email,
          rol: data.user.rol,
        };
        setUser(userLogged); // Guardar el usuario en contexto

        return {
          success: true,
          user: userLogged,
        };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: "Error del servidor" };
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await fetch("http://localhost:4000/api/Login/logout", {
        method: "POST",
        credentials: "include",
      });

      setUser(null);
      navigate("/inicio");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Revisa si hay sesión activa al recargar
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/Login/profile", {
          credentials: "include",
        });

        const data = await response.json();

        if (data.success) {
          setUser({
            email: data.user.email,
            rol: data.rol,
          });
        }
      } catch (error) {
        console.error("Error al verificar sesión:", error);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para consumir el contexto
export const useAuth = () => useContext(AuthContext);
