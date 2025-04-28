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
              <img src="/images/email-icon.png" alt="Email" />
              www.@wearingsport.com
            </a>
            <a href="tel:7082-9812">
              <img src="/images/phone-icon.png" alt="Teléfono" />
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
              <img src="/images/facebook-icon.png" alt="Facebook" />
            </a>
            <a href="#" className="social-icon">
              <img src="/images/instagram-icon.png" alt="Instagram" />
            </a>
            <a href="#" className="social-icon">
              <img src="/images/tiktok-icon.png" alt="TikTok" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;  
