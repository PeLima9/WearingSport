import { useState } from "react";

export const useTarjetaForm = () => {
  const [tarjeta, setTarjeta] = useState({
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCVV: "",
    focus: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTarjeta((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (e) => {
    setTarjeta((prev) => ({ ...prev, focus: e.target.name }));
  };

  return {
    tarjeta,
    handleChange,
    handleFocus,
  };
};
