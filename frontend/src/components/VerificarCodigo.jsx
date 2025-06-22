import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VerificarCodigo = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/api/RegisterClients/verifyCodeEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verificationCode: code }),
        credentials: "include"  // <--- Esto permite enviar cookies
      });

      const data = await response.json();

      if (response.ok) {
        // Código válido, redirigir a login
        navigate("/login");
      } else {
        setError(data.message || "Código inválido");
      }
    } catch {
      setError("Error al verificar el código");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Verificar Cuenta</h2>
      <div className="login-box">
        <p>Hemos enviado un código de verificación al correo <b>{email}</b></p>
        <form onSubmit={handleVerify}>
          <div className="input-group">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Código de verificación"
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" disabled={loading} className="login-button">
            {loading ? "Verificando..." : "Verificar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerificarCodigo;
