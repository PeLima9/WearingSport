import React, { useState } from "react";
import "./Recuperar.css"; // Usamos el mismo estilo

const NuevaContrasena = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones
    if (!password || !confirmPassword) {
      setError("Por favor completa todos los campos.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // Si todo es correcto
    setError("");
    setMensaje("Contraseña actualizada exitosamente.");
    console.log("Nueva contraseña:", password);

    // Aquí podrías hacer la llamada a la API para guardar la nueva contraseña
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Crear nueva contraseña</h2>
      <div className="login-box">
        <p className="instruction-text">Ingresa y confirma tu nueva contraseña</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="password"
              placeholder="Nueva contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          {mensaje && <div style={{ color: "#fff", marginBottom: "10px" }}>{mensaje}</div>}

          <button type="submit" className="login-button">
            Guardar nueva contraseña
          </button>

          <div className="forgot-password">
            <a href="/login">Volver a iniciar sesión</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NuevaContrasena;
