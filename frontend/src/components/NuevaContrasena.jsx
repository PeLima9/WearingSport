// src/pages/NuevaContrasena.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Recuperar.css";

const NuevaContrasena = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/Auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ newPassword: password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Contraseña actualizada correctamente.");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(data.message || "Error al actualizar la contraseña");
      }
    } catch (err) {
      setError("Error en la conexión con el servidor");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Nueva contraseña</h2>
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <div className="input-group password-group">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nueva contraseña"
              required
            />
            <button
              type="button"
              className="show-password-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <div className="input-group password-group">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirmar contraseña"
              required
            />
            <button
              type="button"
              className="show-password-btn"
              onClick={() => setShowConfirm(!showConfirm)}
              aria-label={showConfirm ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showConfirm ? "🙈" : "👁️"}
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <button type="submit" className="login-button">Actualizar</button>
        </form>
      </div>
    </div>
  );
};

export default NuevaContrasena;
