import React from "react";
import "./Carrito.css";

const Carrito = () => {
  return (
    <div className="carrito-container">
      <h2>¡Bienvenido a tu carrito de compras!</h2>
      <p>Aquí podrás ver los productos que agregues al carrito.</p>

      {/* Contenedor para el producto del carrito */}
      <div className="producto-carrito">
        <div className="producto-imagen">
          <img src='nike_air_force1.jpg' alt="Imagen del producto" />
        </div>
        <div className="producto-detalles">
          <h3>Nombre del Producto</h3>
          <p>Descripción corta del producto</p>
          <div className="producto-cantidad">
            <button className="btn-agregar">Agregar más</button>
            <button className="btn-borrar">🗑️ Borrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
