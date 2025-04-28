// src/components/AboutUs.jsx
import React from "react";
import "./About.css";

function AboutUs() {
  return (
    <div className="about-container">
      <div className="left-section">

        {/* Ahora todo el título y texto dentro de una box */}
        <div className="box">
          <h1 className="main-title">Sobre Nosotros</h1>
          <p className="text">
          En WearingSport, creemos que cada paso cuenta. Nuestra pasión
 por el deporte y el estilo nos llevó a crear una tienda en línea 
 especializada en calzado deportivo de alta calidad, combinando
 rendimiento, comodidad y las últimas tendencias.
          </p>
        </div>

        <div className="box">
          <h1 className="subtitle">¿Por qué elegirnos?</h1>
          <p className="text">
          ✔️ Variedad de modelos y marcas líderes <br></br>✔️ Envíos rápidos y seguros a todo el país <br></br>✔️  Asesoría personalizada para encontrar tu par perfecto <br></br>✔️ Calidad garantizada y precios competitivos
          </p>
        </div>

      </div>

      <div className="right-section">
        <div className="box">
          <h1 className="subtitle">Misión</h1>
          <p className="text">
          Ofrecer a nuestros clientes una experiencia 
 de compra en línea ágil, segura y confiable, 
 proporcionando calzado deportivo de alta calidad que
 combine comodidad,rendimiento y estilo. Nos
 comprometemos a innovar constantemente en nuestra
 plataforma digital para facilitarel acceso a productos
 exclusivos y garantizarla satisfacción de cada cliente
 con un servicio excepcional.
          </p>
        </div>

        <div className="box">
          <h1 className="subtitle">Nuestro Compromiso</h1>
          <p className="text">
          Nos esforzamos por ofrecerte una experiencia de compra
  fácil y segura, con productos auténticos y atención al
  cliente de primer nivel. Queremos ser más que una
  tienda: ser tu aliado en el camino hacia el éxito 
  deportivo. ¡Únete a la familia WearingSport y camina 
  con confianza hacia tus objetivos! 💪👟
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
