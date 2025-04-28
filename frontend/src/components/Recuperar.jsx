import React, { useState } from "react";
import "./Recuperar.css";

const Recuperar = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación para asegurarse de que el campo de email no esté vacío
    if (!email) {
      setError("Por favor ingresa tu correo electrónico.");
    } else {
      setError("");
      console.log("Correo enviado para recuperar contraseña:", email);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Restablecer tu contraseña</h2>
      <div className="login-box">
        <p className="instruction-text">
          Te enviaremos un correo electrónico para restablecer tu contraseña
        </p>

        <form id="reset-password-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email"></label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Actualiza el estado con el correo
              placeholder="Correo electrónico"
              required
            />
          </div>

          {/* Mostrar error si el campo está vacío */}
          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button">
            Enviar
          </button>

          <div className="forgot-password">
            <a href="/login">Cancelar</a> {/* Enlace para regresar a login */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Recuperar;
