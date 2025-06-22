// src/pages/VerificarCodigoRecuperacion.jsx
import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Recuperar.css";

const VerificarCodigoRecuperacion = () => {
  const [codes, setCodes] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const handleChange = (element, index) => {
    // Permitir letras mayúsculas, minúsculas y números
    if (!/^[a-zA-Z0-9]?$/.test(element.value)) return;

    const newCodes = [...codes];
    newCodes[index] = element.value; // Aquí no modificamos mayúsculas/minúsculas
    setCodes(newCodes);

    if (element.value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !codes[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = codes.join("");

    if (code.length < 6) {
      setError("Por favor completa el código de 6 dígitos");
      return;
    }

    setError("");

    try {
      const res = await fetch("http://localhost:4000/api/Auth/verify-recovery-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/nueva-contrasena", { state: { email } });
      } else {
        setError(data.message || "Código inválido");
      }
    } catch (err) {
      setError("Error en la conexión con el servidor");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Verificar código</h2>
      <div className="login-box">
        <p>
          Ingresa el código que enviamos al correo: <strong>{email}</strong>
        </p>

        <form onSubmit={handleSubmit} className="code-form">
          <div className="code-inputs" style={{ display: "flex", gap: "10px" }}>
            {codes.map((code, idx) => (
              <input
                key={idx}
                type="text"
                maxLength="1"
                value={code}
                onChange={(e) => handleChange(e.target, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                ref={(el) => (inputsRef.current[idx] = el)}
                autoFocus={idx === 0}
                className="code-input"
                style={{
                  width: "40px",
                  height: "50px",
                  fontSize: "2rem",
                  textAlign: "center",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
                spellCheck="false"
                autoComplete="off"
              />
            ))}
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button" style={{ marginTop: "20px" }}>
            Verificar
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerificarCodigoRecuperacion;
