import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CrearCuenta = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !phone) {
      setError("Por favor, llena todos los campos.");
      setSuccess("");
      return;
    }

    const phoneRegex = /^[0-9]{7,15}$/;
    if (!phoneRegex.test(phone)) {
      setError("Por favor ingresa un número de teléfono válido.");
      setSuccess("");
      return;
    }

    setError("");

    try {
      const response = await fetch("http://localhost:4000/api/RegisterClients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          email,
          password,
          phoneNumber: phone,
          isVerified: false,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Registro exitoso. Por favor verifica tu correo.");
        setError("");
        // Redirigir a página de verificar código pasando email como query param o state
        navigate("/verificar-codigo", { state: { email } });
      } else {
        setError(data.message || "Error en el registro");
        setSuccess("");
      }
    } catch (error) {
      setError("Error al conectar con el servidor");
      setSuccess("");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Crear Cuenta</h2>
      <div className="login-box">
        <form id="create-account-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre"
              required
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
          </div>

          <div className="input-group">
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*$/.test(val)) setPhone(val);
              }}
              placeholder="Número de teléfono"
              required
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={15}
              autoComplete="tel"
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <button type="submit" className="login-button">Crear Cuenta</button>
        </form>
      </div>
    </div>
  );
};

export default CrearCuenta;
