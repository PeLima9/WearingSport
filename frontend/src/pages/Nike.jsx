import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Nike.css';

const Nike = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    // Llama al backend
    fetch('http://localhost:4000/api/Products') // Ajusta la URL si es diferente
      .then(res => res.json())
      .then(data => {
        // Filtra productos de la marca Nike
        const nikeProducts = data.filter(prod => prod.brand === 'Nike');
        setProductos(nikeProducts);
      })
      .catch(err => console.error('Error al cargar productos:', err));
  }, []);

  const handleCardClick = (id) => {
    navigate(`/producto/${id}`);
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(productos.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productos.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(productos.length / productsPerPage);

  return (
    <div className="nike-page">
      <div className="brand-box">
        <h1>Nike</h1>
      </div>

      <div className="product-grid">
        {currentProducts.map((shoe) => (
          <div
            key={shoe._id}
            className="product-card"
            onClick={() => handleCardClick(shoe._id)}
            style={{ cursor: 'pointer' }}
          >
            <img src={shoe.imageUrl} alt={shoe.productName} />
            <div className="product-info">
              <h3>{shoe.productName}</h3>
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

export default Nike;
