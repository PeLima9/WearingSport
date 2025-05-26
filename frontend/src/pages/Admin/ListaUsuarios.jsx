import React, { useEffect, useState } from "react";
import "./ListaUsuarios.css";

const ListaUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado para edición
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  // Abrir modal con datos del usuario a editar
  const abrirModalEdicion = (usuario) => {
    setUsuarioEditando(usuario);
    setMostrarModal(true);
  };

  // Cerrar modal
  const cerrarModal = () => {
    setMostrarModal(false);
    setUsuarioEditando(null);
  };

  // Obtener usuarios del backend
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

  // Guardar cambios del usuario editado
  const handleEditarUsuario = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:4000/api/Employees/${usuarioEditando._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioEditando),
      });

      if (!response.ok) throw new Error("Error al actualizar usuario");

      // Actualizar lista localmente
      const usuariosActualizados = usuarios.map((u) =>
        u._id === usuarioEditando._id ? usuarioEditando : u
      );
      setUsuarios(usuariosActualizados);
      cerrarModal();
    } catch (error) {
      alert("Error al actualizar usuario");
      console.error(error);
    }
  };

  // Manejar cambios en los inputs del formulario de edición
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuarioEditando({ ...usuarioEditando, [name]: value });
  };

  const eliminarUsuario = async (id) => {
  const confirmar = window.confirm("¿Estás seguro de que quieres eliminar este usuario?");
  if (!confirmar) return;

  try {
    const response = await fetch(`http://localhost:4000/api/Employees/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Error al eliminar usuario");

    // Eliminar usuario de la lista localmente
    const nuevosUsuarios = usuarios.filter((u) => u._id !== id);
    setUsuarios(nuevosUsuarios);
  } catch (error) {
    alert("Error al eliminar usuario");
    console.error(error);
  }
};

  return (
    <div className="lista-usuario-container">
      <h2>Lista de Usuarios</h2>

      {loading && <p>Cargando usuarios...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && usuarios.length === 0 && <p>No hay usuarios registrados.</p>}

      {!loading && !error && usuarios.length > 0 && (
        <table className="tabla-usuarios">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario._id}>
                <td>{usuario.name}</td>
                <td>{usuario.email}</td>
                <td>{usuario.rol}</td>
                <td>
                  <button
                    className="btn-editar"
                    onClick={() => abrirModalEdicion(usuario)}
                  >
                    Editar
                  </button>
                  <button
  className="btn-eliminar"
  onClick={() => eliminarUsuario(usuario._id)}
>
  Eliminar
</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal de edición */}
      {mostrarModal && usuarioEditando && (
        <div className="modal">
          <div className="modal-content">
            <h3>Editar Usuario</h3>
            <form onSubmit={handleEditarUsuario}>
              <label>Nombre:</label>
              <input
                type="text"
                name="name"
                value={usuarioEditando.name}
                onChange={handleChange}
                required
              />

              <label>Correo:</label>
              <input
                type="email"
                name="email"
                value={usuarioEditando.email}
                onChange={handleChange}
                required
              />

              <label>Rol:</label>
<select
  name="rol"
  value={usuarioEditando.rol}
  onChange={handleChange}
  required
>
  <option value="">-- Selecciona un rol --</option>
  <option value="cliente">Cliente</option>
  <option value="admin">Admin</option>
</select>
<br></br>
<br></br>

              <button type="submit">Guardar</button>
              <button type="button" onClick={cerrarModal}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaUsuario;
