import React, { useState } from "react";
import "./CrearCuenta.css";

const CrearCuenta = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de campos
    if (!name || !surname || !email || !password) {
      setError("Por favor, llena todos los campos.");
    } else {
      setError("");
      // Lógica para crear cuenta
      console.log("Cuenta creada:", { name, surname, email, password });
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Crear Cuenta</h2>
      <div className="login-box">
        <form id="create-account-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name"></label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="surname"></label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              placeholder="Apellido"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email"></label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password"></label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
          </div>

          {/* Mostrar error si algún campo está vacío */}
          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button">
            Crear Cuenta
          </button>
        </form>
      </div>
    </div>
  );
};

export default CrearCuenta;
