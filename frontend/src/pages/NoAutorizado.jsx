import React from 'react';
import { Link } from 'react-router-dom';

const NoAutorizado = () => (
  <div style={{ textAlign: 'center', marginTop: '3rem' }}>
    <h2>No tienes permiso para ver esta página.</h2>
    <p>
      <Link to="/">Volver al inicio</Link>
    </p>
  </div>
);

export default NoAutorizado;
