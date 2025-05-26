import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditarUsuario.css";

const EditarUsuario = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // ← obtenemos el ID desde la URL

  const [usuario, setUsuario] = useState({
    name: "",
    email: "",
    password: "",
    rol: "cliente",
  });

  // Cargar datos del usuario existente
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/Employees/${id}`);
        const data = await res.json();
        setUsuario(data);
      } catch (error) {
        console.error("Error al cargar usuario:", error);
      }
    };
    fetchUsuario();
  }, [id]);

  // Manejador de cambios en el formulario
  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  // Manejador de envío
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:4000/api/Employees/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Usuario actualizado con éxito");
        navigate("/admin/listausuarios"); // ← o a donde desees
      } else {
        alert(`Error: ${data.message || "No se pudo actualizar el usuario"}`);
      }
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      alert("Error al actualizar usuario");
    }
  };

  return (
    <div className="editar-usuario-container">
      <h2>Editar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={usuario.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Correo:
          <input
            type="email"
            name="email"
            value={usuario.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            value={usuario.password}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Rol:
          <select name="rol" value={usuario.rol} onChange={handleChange}>
            <option value="admin">Administrador</option>
            <option value="cliente">Cliente</option>
          </select>
        </label>

        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarUsuario;
