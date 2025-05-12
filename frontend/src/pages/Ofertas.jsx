import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Ofertas.css';

const Ofertas = () => {
  const navigate = useNavigate();

  const nikeShoes = [
    { id: 1, name: 'Nike Air Max', price: '$120', image: 'nike_air_max.jpg' },
    { id: 2, name: 'Nike Zoom', price: '$140', image: 'nike_zoom.jpg' },
    { id: 3, name: 'Nike Vapor', price: '$160', image: 'nike_vapor.jpg' },
    { id: 4, name: 'Nike Pegasus', price: '$130', image: 'nike_pegasus.jpg' },
    // ... más productos ...
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const handleNext = () => {
    if (currentPage < Math.ceil(nikeShoes.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleCardClick = (id) => {
    navigate(`/producto/${id}`);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = nikeShoes.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(nikeShoes.length / productsPerPage);

  return (
    <div className="nike-page">
      <div className="brand-box">
        <h1>Ofertas %50</h1>
      </div>

      <div className="product-grid">
        {currentProducts.map((shoe) => (
          <div
            key={shoe.id}
            className="product-card"
            onClick={() => handleCardClick(shoe.id)}
            style={{ cursor: 'pointer' }}
          >
            <img src={`/img/${shoe.image}`} alt={shoe.name} />
            <div className="product-info">
              <h3>{shoe.name}</h3>
              <p>{shoe.price}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="carousel">
        <button onClick={handlePrev} className="carousel-button">&#8592;</button>
        <div className="carousel-pages">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`page-number ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button onClick={handleNext} className="carousel-button">&#8594;</button>
      </div>
    </div>
  );
};

export default Ofertas;
