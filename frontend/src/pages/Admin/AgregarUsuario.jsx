import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AgregarUsuario.css"; // Opcional para estilos personalizados

const AgregarUsuario = () => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    name: "",
    email: "",
    password: "",
    rol: "client", // Valor por defecto
  });

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/Employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: usuario.name,
          email: usuario.email,
          password: usuario.password,
          rol: usuario.rol,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Usuario registrado con éxito");
       // navigate("/admin/listausuarios");
       e.target.reset();
      } else {
        alert(`Error: ${data.message || "No se pudo registrar el usuario"}`);
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("Error al registrar usuario");
    }
  };

  return (
    <div className="agregar-usuario-container">
      <h2>Agregar Usuario</h2>
      <form className="form-agregar-usuario" onSubmit={handleSubmit}>
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
          <select
            name="rol"
            value={usuario.rol}
            onChange={handleChange}
            required
          >
            <option value="admin">Administrador</option>
            <option value="client">Cliente</option>
            <option value="employee">Empleado</option>

          </select>
        </label>

        <button type="submit">Registrar Usuario</button>
      </form>

      <button
        className="btn-ver-usuarios"
        onClick={() => navigate("/admin/listausuarios")}
      >
        Gestionar Usuarios
      </button>
    </div>
  );
};

export default AgregarUsuario;
