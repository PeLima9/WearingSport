import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Ofertas.css';

const Ofertas = () => {
  const navigate = useNavigate();

  const [ofertas, setOfertas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    fetch('http://localhost:4000/api/Ofertas')
      .then(res => res.json())
      .then(data => {
        setOfertas(Array.isArray(data) ? data : []);
        setCurrentPage(1);
      })
      .catch(err => console.error('Error al cargar ofertas:', err));
  }, []);

  const handleNext = () => {
    if (currentPage < Math.ceil(ofertas.length / productsPerPage)) {
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
  const currentProducts = ofertas.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(ofertas.length / productsPerPage);

  const calcularPrecioConDescuento = (precio, descuento) => {
    return (precio - (precio * descuento) / 100).toFixed(2);
  };

  return (
    <div className="nike-page">
      <div className="brand-box">
        <h1>Ofertas Activas</h1>
      </div>

      <div className="product-grid">
        {currentProducts.map(({ _id, productId, descuento }) => (
          <div
            key={_id}
            className="product-card"
            onClick={() => handleCardClick(productId._id)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={productId.imageUrl || '/img/default-product.jpg'}
              alt={productId.productName}
              className="product-image"
            />
            <div className="product-info">
              <h3>{productId.productName}</h3>
              <p>
                <span className="precio-original">${productId.price.toFixed(2)}</span>{' '}
                <span className="precio-descuento">
                  ${calcularPrecioConDescuento(productId.price, descuento)}
                </span>
              </p>
              <p className="descuento-text">{descuento}% OFF</p>
            </div>
          </div>
        ))}
      </div>

      <div className="carousel">
        <button onClick={handlePrev} className="carousel-button" disabled={currentPage === 1}>
          &#8592;
        </button>
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
        <button onClick={handleNext} className="carousel-button" disabled={currentPage === totalPages}>
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default Ofertas;
