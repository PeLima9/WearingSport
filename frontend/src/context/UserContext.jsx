import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Verifica si hay sesión activa al cargar la app
  useEffect(() => {
    fetch("http://localhost:4000/api/Login/profile", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.success) setUser(data.user);
      })
      .catch((err) => {
        console.error("Error al verificar la sesión:", err);
      });
  }, []);

  const login = (userData) => setUser(userData);
  const logout = () => {
    fetch("http://localhost:4000/api/Login/logout", {
      method: "POST",
      credentials: "include",
    })
      .then(() => setUser(null))
      .catch((err) => console.error("Error al cerrar sesión:", err));
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
