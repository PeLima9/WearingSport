import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Ofertas1.css'; // Asegúrate de que el archivo CSS esté bien vinculado

const Ofertas = () => {
  const navigate = useNavigate();

  // Función para manejar la redirección
  const handleRedirect = () => {
    console.log("Redirigiendo a la página de ofertas...");
    navigate('/ofertas');
  };

  return (
    <div className="ofertas-container">
      {/* Imagen a la derecha */}
      <div className="image-container">
        {/* Ruta de la imagen */}
        <img src="ofertas_zapa.jpg" alt="Ofertas" className="ofertas-image" />
        
        {/* Recuadro con el color degradado encima de la imagen */}
        <div className="offers-box">
          <div className="text-above-button">
            <h2>Aprovecha estas ofertas</h2>
          </div>
          {/* Botón dentro del recuadro */}
          <button className="ofertas-button" onClick={handleRedirect}>
            Ofertas
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ofertas;
