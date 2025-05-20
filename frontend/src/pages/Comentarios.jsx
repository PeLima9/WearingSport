import React, { useState } from 'react';
import './Comentarios.css';
import { FaStar, FaRegStar, FaThumbsUp, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const commentsData = [
  {
    id: 1,
    name: 'Juan Pérez',
    profileImage: 'https://i.pravatar.cc/150?img=1',
    rating: 4,
    text: 'Muy buen servicio, volveré pronto.',
    likes: 5,
  },
  {
    id: 2,
    name: 'Ana Gómez',
    profileImage: 'https://i.pravatar.cc/150?img=2',
    rating: 5,
    text: 'Excelente atención y calidad.',
    likes: 12,
  },
  {
    id: 3,
    name: 'Carlos Ruiz',
    profileImage: 'https://i.pravatar.cc/150?img=3',
    rating: 3,
    text: 'Buen lugar, pero podría mejorar.',
    likes: 2,
  },
];

const Comentarios = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likes, setLikes] = useState(commentsData.map(c => c.likes));
  const navigate = useNavigate();

  const handleLike = (index) => {
    const updatedLikes = [...likes];
    updatedLikes[index] += 1;
    setLikes(updatedLikes);
  };

  const nextComment = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % commentsData.length);
  };

  const prevComment = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? commentsData.length - 1 : prevIndex - 1
    );
  };

  const goToNuevoComentario = () => {
    navigate('/nuevocomentario'); // Asegúrate de tener esta ruta definida
  };

  const currentComment = commentsData[currentIndex];

  return (
    <div className="carousel-container">
      <h2>Comentarios</h2>
      <div className="carousel-box">
        <button className="nav-button left" onClick={prevComment}>
          <FaChevronLeft />
        </button>

        <div className="comment-card">
          <img src={currentComment.profileImage} alt={currentComment.name} className="profile-img" />
          <h3>{currentComment.name}</h3>
          <div className="stars">
            {[...Array(5)].map((_, i) =>
              i < currentComment.rating ? (
                <FaStar key={i} color="#ffc107" />
              ) : (
                <FaRegStar key={i} color="#ccc" />
              )
            )}
          </div>
          <p className="comment-text">"{currentComment.text}"</p>
          <div className="like-section">
            <button onClick={() => handleLike(currentIndex)}>
              <FaThumbsUp /> {likes[currentIndex]}
            </button>
          </div>
        </div>

        <button className="nav-button right" onClick={nextComment}>
          <FaChevronRight />
        </button>
      </div>

      <button className="more-button" onClick={goToNuevoComentario}> Ir..</button>
    </div>
  );
};

export default Comentarios;
