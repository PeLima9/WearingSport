import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css'; // Si tienes un archivo CSS para los detalles del producto

const ProductDetail = () => {
  // Obtener el ID del producto desde la URL
  const { id } = useParams();

  // Estado para almacenar los detalles del producto
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Efecto para obtener los datos del producto
  useEffect(() => {
    // Simulando una llamada a la API para obtener los datos del producto
    fetch(`/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar los detalles del producto:", error);
        setLoading(false);
      });
  }, [id]);

  // Si estamos cargando, mostramos un mensaje de carga
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Si no se encuentra el producto, mostrar un mensaje de error
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

        {/* Botones */}
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
