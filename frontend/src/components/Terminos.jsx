import React from "react";
import "./Terminos.css";

const Terminos = () => {
  return (
    <div className="terminos-page">
      {/* Título y texto de introducción */}
      <div className="introduccion">
        <h2>Términos y Condiciones</h2>
        <p>
          <strong>Introducción</strong><br />
          Bienvenido a <strong>WearingSport</strong>, tu tienda en línea especializada en calzado deportivo. 
          Al acceder y realizar compras en nuestro sitio web, aceptas los siguientes términos y condiciones. 
          Te recomendamos leerlos detenidamente.
          <br></br>
          <br></br>
          <strong>Registro de Usuarios</strong>
          Para realizar compras en WearingSport, puedes registrarte proporcionando información real y actualizada. 
          Nos reservamos el derecho de cancelar cuentas con datos falsos o fraudulentos.
          <br></br>
          <br></br>
          <strong>Métodos de Pago</strong>
          Aceptamos los siguientes métodos de pago:✅ Tarjetas de crédito y débito (Visa, Banco Agricola)✅ PayPal✅ Transferencia bancaria (si aplica).
          El pago debe completarse en su totalidad antes del envío del pedido.
          <br></br>
          <br></br>
          <strong>Devoluciones y Cambios</strong>
          Ofrecemos devoluciones y cambios bajo las siguientes condiciones:📌 Plazo: (Ejemplo: 10 días hábiles después de recibir el producto.)
          📌 Estado del producto: Debe estar en su empaque original y sin uso.📌 Costos: El cliente asume los costos de envío de la devolución, 
          salvo en caso de productos defectuosos.📌 Proceso: Contactar a nuestro servicio al cliente a (correo electrónico o número de WhatsApp).
          <br></br>
        </p>
      </div>
    </div>
  );
};

export default Terminos;
