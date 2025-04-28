import React, { useState } from 'react';
import './Nike.css'; // Archivo de estilos

const Adidas = () => {
  const nikeShoes = [
    { id: 1, name: 'Nike Air Max', price: '$120', image: 'nike_air_max.jpg' },
    { id: 2, name: 'Nike Zoom', price: '$140', image: 'nike_zoom.jpg' },
    { id: 3, name: 'Nike Vapor', price: '$160', image: 'nike_vapor.jpg' },
    { id: 4, name: 'Nike Pegasus', price: '$130', image: 'nike_pegasus.jpg' },
    { id: 5, name: 'Nike React', price: '$150', image: 'nike_react.jpg' },
    { id: 6, name: 'Nike Free Run', price: '$125', image: 'nike_free_run.jpg' },
    { id: 7, name: 'Nike Air Zoom Pegasus', price: '$155', image: 'nike_air_zoom_pegasus.jpg' },
    { id: 8, name: 'Nike SB Dunk', price: '$170', image: 'nike_sb_dunk.jpg' },
    { id: 9, name: 'Nike Cortez', price: '$110', image: 'nike_cortez.jpg' },
    { id: 10, name: 'Nike Blazer', price: '$130', image: 'nike_blazer.jpg' },
    { id: 11, name: 'Nike Air Force 1', price: '$140', image: 'nike_air_force1.jpg' },
    { id: 12, name: 'Nike Revolution', price: '$100', image: 'nike_revolution.jpg' },
    { id: 13, name: 'Nike Air Max 90', price: '$160', image: 'nike_air_max_90.jpg' },
    { id: 14, name: 'Nike Free TR', price: '$110', image: 'nike_free_tr.jpg' },
    { id: 15, name: 'Nike Air Zoom Fly', price: '$180', image: 'nike_air_zoom_fly.jpg' },
    { id: 16, name: 'Nike Cortez Classic', price: '$120', image: 'nike_cortez_classic.jpg' },
    { id: 17, name: 'Nike Air Zoom Structure', price: '$140', image: 'nike_air_zoom_structure.jpg' },
    { id: 18, name: 'Nike React Element', price: '$150', image: 'nike_react_element.jpg' },
    { id: 19, name: 'Nike Hyperdunk', price: '$170', image: 'nike_hyperdunk.jpg' },
    { id: 20, name: 'Nike Zoom Freak', price: '$160', image: 'nike_zoom_freak.jpg' },
    { id: 21, name: 'Nike KD', price: '$130', image: 'nike_kd.jpg' },
    { id: 22, name: 'Nike LeBron', price: '$180', image: 'nike_lebron.jpg' },
    { id: 23, name: 'Nike Air Max Plus', price: '$140', image: 'nike_air_max_plus.jpg' },
    { id: 24, name: 'Nike Zoom Kobe', price: '$200', image: 'nike_zoom_kobe.jpg' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // MOSTRAR 8 productos

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

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = nikeShoes.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(nikeShoes.length / productsPerPage);

  return (
    <div className="nike-page">
      <div className="brand-box">
        <h1>Adidas</h1>
      </div>

      <div className="product-grid">
        {currentProducts.map((shoe) => (
          <div key={shoe.id} className="product-card">
            <img src={`/img/${shoe.image}`} alt={shoe.name} />
            <div className="product-info">
              <h3>{shoe.name}</h3>
              <p>{shoe.price}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="carousel">
        <button onClick={handlePrev} className="carousel-button">
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

        <button onClick={handleNext} className="carousel-button">
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default Adidas;
