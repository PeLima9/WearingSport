import React, { useState } from 'react';
import './FormValoracion.css'; // Asegúrate de crear este archivo CSS

const FormValoracion = ({ productId, userId }) => {
  const [qualification, setQualification] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (qualification === 0) {
      alert("Selecciona una calificación");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/Reviews', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qualification, comment, idProducts: productId, idClient: userId }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('¡Gracias por tu valoración!');
        setComment('');
        setQualification(0);
        setHovered(null);
      } else {
        alert('Error al enviar la valoración: ' + data.message);
      }
    } catch (error) {
      alert('Error de red al enviar valoración');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="valoracion-form" onSubmit={handleSubmit}>
      <h4>Deja tu valoración</h4>

      <div className="star-rating">
        {[1, 2, 3, 4, 5].map(star => (
          <span
            key={star}
            className={`star ${star <= (hovered || qualification) ? 'filled' : ''}`}
            onClick={() => setQualification(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(null)}
          >
            ★
          </span>
        ))}
      </div>

      <textarea
        required
        rows="4"
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="Escribe tu opinión aquí"
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar valoración'}
      </button>
    </form>
  );
};

export default FormValoracion;
