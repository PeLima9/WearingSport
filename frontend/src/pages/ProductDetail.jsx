import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productos from '../data/productos'; // <-- Importas el array simulado
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // asegúrate de importar bien

import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const navigate = useNavigate();
const { addToCart } = useCart();

const handleAddToCart = () => {
  addToCart(product); // Agregar al carrito
  navigate('/carrito'); // Redirigir al carrito
};


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
        <img src={`/img/${product.image}`} alt={product.name} />
        </div>
        <div className="product-detail-image-right">
        <img src={`/img/${product.image}`} alt={product.name} />
        </div>
      </div>

      <div className="product-detail-info">
        <h1>{product.name}</h1>
        <p>{product.descripcion}</p>
        <span className="price">{product.price}</span>

        <div className="product-detail-buttons">
        <button className="add-to-cart" onClick={handleAddToCart}>
  Agregar al carrito
</button>          <button className="buy-now">Comprar ahora</button>
          <a  href="/marcas/nike"><button  className="view-more" >Ver más productos</button></a>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
