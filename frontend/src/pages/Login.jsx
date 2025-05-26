import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Por favor, llena todos los campos.");
      return;
    }

    const result = await login(email, password);

  if (result.success) {
  if (result.user) {
    const rol = result.user.rol;
    console.log("Rol del usuario:", rol);

    if (rol === "admin") navigate("/admin");
    else if (rol === "employee") navigate("/admin");
    else if (rol === "cliente") navigate("/cliente");
    else navigate("/inicio"); // fallback
  } else {
    navigate("/inicio");
  }
}
 else {
  setError(result.message || "Error al iniciar sesión.");
}
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Inicio de Sesión</h2>
      <form className="login-box" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group password-group">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="forgot-password">
          <Link to="/recuperar">¿Olvidaste tu contraseña?</Link>
        </div>

        <button className="login-button" type="submit">
          Iniciar sesión
        </button>

        <div className="create-account">
          <Link to="/crear-cuenta">Crear cuenta</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
