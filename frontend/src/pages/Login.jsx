import React, { useState } from "react";
import { Link } from "react-router-dom"; // 👈 Importamos Link
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Por favor, llena todos los campos.");
    } else {
      setError("");
      console.log("Formulario enviado", { email, password });
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Inicio de Sesión</h2>
      <div className="login-box">
        <div className="input-group">
          <label htmlFor="email"></label>
          <input
            type="email"
            id="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="forgot-password">
          <Link to="/recuperar">¿Olvidaste tu contraseña?</Link> {/* 👈 Link en lugar de <a> */}
        </div>

        <button className="login-button" onClick={handleSubmit}>
          Iniciar sesión
        </button>

        <div className="create-account">
          <Link to="/crear-cuenta">Crear cuenta</Link> {/* 👈 Aquí cambié el enlace */}
        </div>
      </div>
    </div>
  );
};

export default Login;
