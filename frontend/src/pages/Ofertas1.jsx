import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Ofertas1.css';

const Ofertas = () => {
  const navigate = useNavigate();

  const phrases = [
    "Aprovecha estas ofertas 🎉",
    "¡Solo por hoy!     QUE ESPERAS 🤷‍♂️",
    "No puedes perderte estas promociones 🚨",
    "Descuentos especiales por tiempo limitado🙈",
    "Encuentra tu estilo al mejor precio  👟💵 $$"
  ];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPhraseIndex(prevIndex => (prevIndex + 1) % phrases.length);
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(intervalId);
  }, [phrases.length]);

  const handleRedirect = () => {
    console.log("Redirigiendo a la página de ofertas...");
    navigate('/ofertas');
  };

  return (
    <div className="ofertas-container">
      <div className="offers-box">
        {/* Frase que se desliza */}
        <div className="marquee-container">
          <div className="marquee">
            <span key={currentPhraseIndex}>{phrases[currentPhraseIndex]}</span>
          </div>
        </div>

        <button className="ofertas-button" onClick={handleRedirect}>
          Ofertas 👈
        </button>
      </div>

      <div className="image-container">
        <img src="img/oferta.jpg" alt="Ofertas" className="ofertas-image" />
      </div>
    </div>
  );
};

export default Ofertas;
