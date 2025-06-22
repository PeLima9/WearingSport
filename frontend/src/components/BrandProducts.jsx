import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BrandProducts.css';

const BrandProducts = ({ brandName }) => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    fetch('http://localhost:4000/api/Products/con-oferta')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(prod => prod.brandId?.brandName === brandName);
        setProductos(filtered);
        setCurrentPage(1);
      })
      .catch(err => console.error('Error al cargar productos:', err));
  }, [brandName]);

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

  const calcularPrecioConDescuento = (precio, descuento) => {
    return (precio - (precio * descuento) / 100).toFixed(2);
  };

  return (
    <div className="brand-page">
      <div className="brand-header h1">
        <h1>{brandName}</h1>
      </div>

      <div className="product-grid">
        {currentProducts.map((prod) => (
          <div
            key={prod._id}
            className="product-card"
            onClick={() => handleCardClick(prod._id)}
            style={{ cursor: 'pointer' }}
          >
            <img src={prod.imageUrl} alt={prod.productName} />
            <div className="product-info">
              <h3>{prod.productName}</h3>

              {prod.oferta ? (
                <>
                  <p>
                    <span className="precio-original">${prod.price.toFixed(2)}</span>{' '}
                    <span className="precio-descuento">
                      ${calcularPrecioConDescuento(prod.price, prod.oferta.descuento)}
                    </span>
                  </p>
                  <p className="descuento-text">{prod.oferta.descuento}% OFF</p>
                </>
              ) : (
                <p>${prod.price.toFixed(2)}</p>
              )}
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

export default BrandProducts;
