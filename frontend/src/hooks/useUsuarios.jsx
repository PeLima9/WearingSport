import { useState, useEffect } from "react";

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/Employees");
        if (!response.ok) throw new Error("Error al obtener usuarios");
        const data = await response.json();
        setUsuarios(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsuarios();
  }, []);

  const actualizarUsuario = async (usuarioEditado) => {
    try {
      const response = await fetch(`http://localhost:4000/api/Employees/${usuarioEditado._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioEditado),
      });
      if (!response.ok) throw new Error("Error al actualizar usuario");
      setUsuarios((prev) =>
        prev.map((u) => (u._id === usuarioEditado._id ? usuarioEditado : u))
      );
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const eliminarUsuario = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/Employees/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar usuario");
      setUsuarios((prev) => prev.filter((u) => u._id !== id));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  return {
    usuarios,
    loading,
    error,
    actualizarUsuario,
    eliminarUsuario,
  };
};
