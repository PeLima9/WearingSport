import React from "react";
import "./Carrito.css";
import { useCart } from '../context/CartContext';

const Carrito = () => {
  const { cartItems } = useCart();
  
  

  if (cartItems.length === 0) {
    return <div className="carrito-container"><p>Tu carrito está vacío.</p></div>;
  }

  return (
    <div className="carrito-container">
      <h2>¡Bienvenido a tu carrito de compras!</h2>
      {cartItems.map((item, index) => (
        <div className="producto-carrito" key={index}>
          <div className="producto-imagen">
            <img src={`/img/${item.image}`} alt={item.name} />
          </div>
          <div className="producto-detalles">
            <h3>{item.name}</h3>
            <p>{item.descripcion}</p>
            <p><strong>{item.price}</strong></p>
            <div className="producto-cantidad">
            <a  href="/marcas/nike"><button  className="view-more" >Agregar más</button></a>
            <button className="btn-borrar">🗑️ Borrar</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carrito;
