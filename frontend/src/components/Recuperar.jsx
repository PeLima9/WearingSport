// src/pages/Recuperar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Recuperar.css";

const Recuperar = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Por favor ingresa tu correo electrónico.");
      setSuccess("");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:4000/api/Auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // importante para cookies
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Correo enviado. Revisa tu bandeja de entrada.");
        navigate("/verificar-codigo-recuperacion", { state: { email } });
      } else {
        setError(data.message || "Error al enviar el correo.");
      }
    } catch (err) {
      console.error(err);
      setError("Error en la conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Restablecer tu contraseña</h2>
      <div className="login-box">
        <p className="instruction-text">
          Te enviaremos un correo con un código para restablecer tu contraseña.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Enviando..." : "Enviar"}
          </button>

          <div className="forgot-password">
            <a href="/login">Cancelar</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Recuperar;
