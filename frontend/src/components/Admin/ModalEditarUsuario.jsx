import React from "react";

const ModalEditarUsuario = ({
  usuarioEditando,
  onChange,
  onSubmit,
  onCerrar,
  mensajeError,
}) => {
  if (!usuarioEditando) return null;

  return (
    <div className="modal" onClick={onCerrar}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h3>Editar Usuario</h3>
        {mensajeError && <p style={{ color: "red" }}>{mensajeError}</p>}
        <form onSubmit={onSubmit}>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={usuarioEditando.name}
            onChange={onChange}
            required
          />

          <label>Correo:</label>
          <input
            type="email"
            name="email"
            value={usuarioEditando.email}
            onChange={onChange}
            required
          />

          <label>Rol:</label>
          <select
            name="rol"
            value={usuarioEditando.rol}
            onChange={onChange}
            required
          >
            <option value="">-- Selecciona un rol --</option>
            <option value="cliente">Cliente</option>
            <option value="admin">Admin</option>
            <option value="empleado">Empleado</option>
          </select>

          <br />
          <br />

          <button type="submit">Guardar</button>
          <button type="button" onClick={onCerrar}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalEditarUsuario;
