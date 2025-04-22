import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="logo-section">
        {/* Aquí agregas tu logo más adelante */}
        <img src="/ruta/a/tu/logo.png" alt="WearingSport Logo" className="logo" />
      </div>

      <div className="welcome-box">
        <h2>Bienvenido a la tienda WearingSport</h2>
        <p>Tu destino de confianza en calzado deportivo</p>

        <div className="login-form">
          <h3>Iniciar Sesión</h3>
          <form>
            <input type="email" placeholder="Correo electrónico" required />
            <input type="password" placeholder="Contraseña" required />
            <button type="submit">Ingresar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
