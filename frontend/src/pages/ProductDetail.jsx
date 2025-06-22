import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from "../context/AuthContext";
import ProductReviews from '../components/ProductReviews';
import FormValoracion from '../components/FormValoracion';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [puedeValorar, setPuedeValorar] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();

  // ✅ Obtener producto y verificar si el usuario puede valorar
  useEffect(() => {
    const fetchProductAndCheckValoracion = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/Products/con-oferta');
        const data = await res.json();
        const encontrado = data.find(p => p._id === id);
        setProduct(encontrado);

        // ✅ Verificar si puede valorar solo si hay usuario
        if (user && encontrado) {
          const resCheck = await fetch(`http://localhost:4000/api/Reviews/usuario-compro/${user._id}/${id}`, {
            credentials: "include", // ✅ importante para que se envíe la cookie con el token
          });

          const dataCheck = await resCheck.json();
          setPuedeValorar(dataCheck.puedeValorar);
        }
      } catch (err) {
        console.error('Error al obtener producto o verificar valoración:', err);
      }
    };

    fetchProductAndCheckValoracion();
  }, [id, user]);

  const handleAddToCart = () => {
    if (!user || !user._id) {
      navigate("/login");
      return;
    }

    const precioFinal = product.oferta
      ? product.price - (product.price * product.oferta.descuento) / 100
      : product.price;

    const productoFormateado = {
      _id: product._id,
      name: product.productName,
      descripcion: product.description,
      price: parseFloat(precioFinal.toFixed(2)),
      precioOriginal: product.price,
      image: product.imageUrl,
      quantity: 1
    };

    addToCart(productoFormateado);

    setTimeout(() => {
      navigate("/carrito");
    }, 100);
  };

  const handleBuyNow = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/comprar');
  };

  const calcularPrecioConDescuento = (precio, descuento) => {
    return (precio - (precio * descuento) / 100).toFixed(2);
  };

  if (!product) {
    return (
      <div className="product-detail">
        <p>Producto no encontrado</p>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="product-detail-images">
        <div className="product-detail-image-left">
          <img src={product.imageUrl} alt={product.productName} />
        </div>
      </div>

      <div className="product-detail-info">
        <h1>{product.productName}</h1>
        <p>{product.description}</p>

        {product.oferta ? (
          <>
            <p>
              <span className="precio-original">${product.price.toFixed(2)}</span>{' '}
              <span className="precio-descuento">
                ${calcularPrecioConDescuento(product.price, product.oferta.descuento)}
              </span>
            </p>
            <p className="descuento-text">{product.oferta.descuento}% OFF</p>
          </>
        ) : (
          <p className="price">${product.price.toFixed(2)}</p>
        )}

        <div className="product-detail-buttons">
          <button className="add-to-cart" onClick={handleAddToCart}>
            Agregar al carrito
          </button>
          <button className="buy-now" onClick={handleBuyNow}>
            Comprar ahora
          </button>
          <button
            className="view-more"
            onClick={() => navigate(`/marcas/${product.brandId?.brandName}`)}
          >
            Ver más productos
          </button>
        </div>
      </div>

      {/* Reseñas y formulario de valoración */}
      <div className="product-reviews-section">
        <h2>Reseñas del producto</h2>
        <ProductReviews productId={product._id} />

        {puedeValorar && (
          <div style={{ marginTop: "20px" }}>
            <h4>Deja tu valoración:</h4>
            <FormValoracion productId={product._id} userId={user._id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
