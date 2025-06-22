import React from "react";
import "./Carrito.css";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Carrito = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const calcularSubtotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );
  };

  const handlePagarAhora = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate("/comprar");
  };

  // Función para manejar el botón "Agregar más"
  const handleAgregarMas = () => {
    navigate("/marcas/nike");
  };

  if (cartItems.length === 0) {
    return (
      <div className="carrito-container">
        <p>Tu carrito está vacío.</p>
      </div>
    );
  }

  return (
    <div className="carrito-container">
      <h2>¡Bienvenido a tu carrito de compras!</h2>

      {cartItems.map((item) => (
        <div className="producto-carrito" key={item._id}>
          <div className="producto-imagen">
            <img src={item.image} alt={item.name} />
          </div>

          <div className="producto-detalles">
            <h3>{item.name}</h3>
            <p>{item.descripcion}</p>

            {item.precioOriginal && item.precioOriginal > item.price ? (
              <p>
                <span className="precio-original">
                  ${item.precioOriginal.toFixed(2)}
                </span>{" "}
                <span className="precio-descuento">
                  ${item.price.toFixed(2)}
                </span>
              </p>
            ) : (
              <p>
                <strong>${item.price.toFixed(2)}</strong>
              </p>
            )}

            {/* Controles para cantidad y botón "Agregar más" */}
            <div className="controls-wrapper">
              <div className="cantidad-controles">
                <button
                  className="btn-cantidad"
                  onClick={() => updateQuantity(item._id, (item.quantity || 1) - 1)}
                  disabled={(item.quantity || 1) <= 1}
                >
                  -
                </button>
                <span className="cantidad-numero">{item.quantity || 1}</span>
                <button
                  className="btn-cantidad"
                  onClick={() => updateQuantity(item._id, (item.quantity || 1) + 1)}
                >
                  +
                </button>

                {/* Botón Agregar más - CORREGIDO */}
                <button 
                  className="view-more"
                  onClick={handleAgregarMas}
                >
                  Agregar más
                </button>
              </div>

              {/* Botón Borrar separado */}
             <button
  className="btn-borrar"
  onClick={() => {
    const confirmar = window.confirm(`¿Estás seguro de eliminar "${item.name}" del carrito?`);
    if (confirmar) {
      removeFromCart(item._id);
    }
  }}
  style={{ marginLeft: "20px" }}
>
  🗑️ Borrar
</button>
            </div>
          </div>
        </div>
      ))}

      {/* Subtotal y botón Pagar ahora */}
      <div className="subtotal-carrito" style={{ marginTop: "20px", textAlign: "right" }}>
        <h3>Subtotal: ${calcularSubtotal().toFixed(2)}</h3>
        <button 
          className="buy-now" 
          style={{ marginTop: "10px", padding: "12px 24px", fontSize: "16px", cursor: "pointer" }} 
          onClick={handlePagarAhora}
        >
          Pagar 
        </button>
      </div>
    </div>
  );
};

export default Carrito;