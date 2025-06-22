// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success) {
        await checkAuth(); // Actualiza user real
        return { success: true, user: data.user };
      }
      return { success: false, message: data.message };
    } catch (err) {
      return { success: false, message: "Error del servidor" };
    }
  };

  const logout = async () => {
    await fetch("http://localhost:4000/api/login/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    navigate("/inicio");
  };

  const checkAuth = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/login/profile", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setUser({
          _id: data.user._id,
          email: data.user.email,
          rol: data.rol,
          
        });
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
