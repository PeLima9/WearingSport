// context/AuthContext.jsx
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
  try {
    const response = await fetch("http://localhost:4000/api/Login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok && data.message === "Login Successful") {
      return {
        success: true,
        user: {
          email,
          rol: data.user.rol,// esto permite que funcione tu comparación
        },
      };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    return { success: false, message: "Error del servidor" };
  }
};


  const logout = () => {
    setUser(null);
    navigate("/inicio");
  
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto
export const useAuth = () => useContext(AuthContext);
