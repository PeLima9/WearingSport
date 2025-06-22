import React, { useState } from "react";
import { useUsuarios } from "../../hooks/useUsuarios";
import ModalEditarUsuario from "../../components/Admin/ModalEditarUsuario";
import "./ListaUsuarios.css";

const ListaUsuario = () => {
  const { usuarios, loading, error, actualizarUsuario, eliminarUsuario } = useUsuarios();

  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensajeErrorEdicion, setMensajeErrorEdicion] = useState("");

  const abrirModalEdicion = (usuario) => {
    setUsuarioEditando(usuario);
    setMensajeErrorEdicion("");
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setUsuarioEditando(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuarioEditando((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditarUsuario = async (e) => {
    e.preventDefault();
    const res = await actualizarUsuario(usuarioEditando);
    if (res.success) {
      cerrarModal();
    } else {
      setMensajeErrorEdicion(res.message || "Error al actualizar usuario");
    }
  };

  const handleEliminarUsuario = async (id) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) return;
    const res = await eliminarUsuario(id);
    if (!res.success) alert(res.message || "Error al eliminar usuario");
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
                    onClick={() => handleEliminarUsuario(usuario._id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {mostrarModal && usuarioEditando && (
        <ModalEditarUsuario
          usuarioEditando={usuarioEditando}
          onChange={handleChange}
          onSubmit={handleEditarUsuario}
          onCerrar={cerrarModal}
          mensajeError={mensajeErrorEdicion}
        />
      )}
    </div>
  );
};

export default ListaUsuario;
