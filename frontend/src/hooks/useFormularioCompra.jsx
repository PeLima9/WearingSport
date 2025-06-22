import { useState } from "react";

export const useFormularioCompra = () => {
  const [form, setForm] = useState({
    paymentMethod: "",
    address: "",
    cardNumber: "",
    cardName: "",
    cardCVV: "",
    cardExpiry: "",
    focus: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (e) => {
    setForm((prev) => ({ ...prev, focus: e.target.name }));
  };

  return {
    form,
    setForm,
    handleChange,
    handleFocus,
  };
};
