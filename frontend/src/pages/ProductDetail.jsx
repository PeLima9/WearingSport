import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productos from '../data/productos'; // ⬅️ Importas el array simulado
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Simular búsqueda del producto por ID
    const productoEncontrado = productos.find((p) => p.id === Number(id));
    setProduct(productoEncontrado);
  }, [id]);

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div className="product-detail">
      <div className="product-detail-images">
        <div className="product-detail-image-left">
          <img src={product.image1} alt={product.name} />
        </div>
        <div className="product-detail-image-right">
          <img src={product.image2} alt={product.name} />
        </div>
      </div>

      <div className="product-detail-info">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <span className="price">${product.price}</span>

        <div className="product-detail-buttons">
          <button className="add-to-cart">Agregar al carrito</button>
          <button className="buy-now">Comprar ahora</button>
          <button className="view-more">Ver más productos</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
