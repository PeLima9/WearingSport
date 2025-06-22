import React from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

const TarjetaForm = ({ tarjeta, handleChange, handleFocus }) => (
  <>
    <div className="tarjeta-preview">
      <Cards
        number={tarjeta.cardNumber}
        name={tarjeta.cardName}
        expiry={tarjeta.cardExpiry}
        cvc={tarjeta.cardCVV}
        focused={tarjeta.focus}
      />
    </div>

    <label>Nombre en la tarjeta:</label>
    <input
      type="text"
      name="cardName"
      placeholder="Ej. Juan Pérez"
      value={tarjeta.cardName}
      onChange={handleChange}
      onFocus={handleFocus}
      required
    />

    <label>Número de tarjeta:</label>
    <input
      type="text"
      name="cardNumber"
      placeholder="Ej. 1234 5678 9012 3456"
      value={tarjeta.cardNumber}
      onChange={handleChange}
      onFocus={handleFocus}
      required
    />

    <label>Fecha de expiración (MM/YY):</label>
    <input
      type="text"
      name="cardExpiry"
      placeholder="Ej. 12/24"
      value={tarjeta.cardExpiry}
      onChange={handleChange}
      onFocus={handleFocus}
      required
    />

    <label>CVV:</label>
    <input
      type="text"
      name="cardCVV"
      placeholder="Ej. 123"
      value={tarjeta.cardCVV}
      onChange={handleChange}
      onFocus={handleFocus}
      required
    />
  </>
);

export default TarjetaForm;
