import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Sección izquierda - Nombre y contacto */}
        <div className="footer-left">
          <div className="footer-title">WearingSport</div>
          <div className="footer-contact">
            <a href="mailto:www.@wearingsport.com">
              <i className="fas fa-envelope"></i>
              www.@wearingsport.com
            </a>
            <a href="tel:7082-9812">
              <i className="fas fa-phone-alt"></i>
              7082-9812
            </a>
          </div>
        </div>
        
        {/* Sección central - Enlaces */}
        <div className="footer-center">
          <div className="footer-links">
            <a href="#">Comentarios</a>
          </div>
          <div className="footer-links">
            <a href="#">Términos y condiciones</a>
          </div>
        </div>
        
        {/* Sección derecha - Redes sociales */}
        <div className="footer-right">
          <div className="footer-social-title">Síguenos en:</div>
          <div className="footer-social-icons">
            <a href="#" className="social-icon">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-tiktok"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
