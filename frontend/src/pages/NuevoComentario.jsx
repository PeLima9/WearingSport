import React, { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import './NuevoComentario.css';

const NuevoComentario = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleStarClick = (starIndex) => {
    setRating(starIndex + 1); // El índice de la estrella define la calificación
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    if (comment.length === 0 || rating === 0) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    // Aquí puedes manejar el envío del comentario, como guardarlo en un servidor.
    setSubmitted(true);
    console.log('Comentario enviado:', { rating, comment });
  };

  return (
    <div className="nuevo-comentario-container">
      <h2>Comentarios</h2>

      <div className="comment-box">
        <div className="stars">
          {[...Array(5)].map((_, i) => (
            <span key={i} onClick={() => handleStarClick(i)}>
              {i < rating ? <FaStar color="#ffc107" /> : <FaRegStar color="#ccc" />}
            </span>
          ))}
        </div>

        <textarea
          placeholder="Cuentanos mas sobre tu experiencia"
          value={comment}
          onChange={handleCommentChange}
          rows="4"
        />

        <button className="submit-button" onClick={handleSubmit}>
          Enviar Comentario
        </button>

        {submitted && <p className="success-message">Comentario enviado con éxito!</p>}
      </div>
    </div>
  );
};

export default NuevoComentario;
