import React from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./FormularioCompra.css";

import { useFormularioCompra } from "../hooks/useFormularioCompra";
import { useCalcularTotal } from "../hooks/useCalcularTotal";
import { useTarjetaForm } from "../hooks/useTarjetaForm";
import TarjetaForm from "../components/TarjetaForm";

const FormularioCompra = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { form, handleChange, handleFocus } = useFormularioCompra();
  const { tarjeta, handleChange: handleCardChange, handleFocus: handleCardFocus } = useTarjetaForm();
  const total = useCalcularTotal(cartItems);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!form.paymentMethod || !form.address) {
      alert("Por favor completa todos los campos requeridos.");
      return;
    }

    if (cartItems.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    if (!user || !user._id) {
      alert("Debes iniciar sesión para realizar la compra.");
      navigate("/login");
      return;
    }

    // Mapear productos para la orden (solo campos necesarios)
    const productosParaOrden = cartItems.map((item) => ({
      productId: item._id || item.id,
      quantity: item.quantity || 1,
      price: item.price,
    }));

    // Para el pedido (historial), se envía el carrito completo con más info
    const productosParaPedido = cartItems.map((item) => ({
      _id: item._id || item.id,
      name: item.productName || item.name,
      descripcion: item.description || "",
      price: item.price,
      quantity: item.quantity || 1,
      image: item.imageUrl || item.image || "",
    }));

    try {
      // 1. Crear la orden
      const orderResponse = await fetch("http://localhost:4000/api/Orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: user._id,
          products: productosParaOrden,
          total,
          orderStatus: "pendiente",
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        alert("Error al crear la orden: " + (orderData.message || "Error desconocido"));
        return;
      }

      // 2. Crear la venta
      const saleResponse = await fetch("http://localhost:4000/api/Sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idOrder: orderData.order._id,
          paymentMethod: Number(form.paymentMethod),
          address: form.address,
        }),
      });

      const saleData = await saleResponse.json();

      if (!saleResponse.ok) {
        alert("Error al registrar la venta: " + (saleData.message || "Error desconocido"));
        return;
      }

      // 3. Crear el pedido para historial (usuario autenticado)
      const pedidoResponse = await fetch("http://localhost:4000/api/Pedidos/crear", {
        method: "POST",
        credentials: "include", // para enviar cookies si usas autenticación con cookies
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productos: productosParaPedido,
          total,
          idOrder: orderData.order._id
        }),
      });

      const pedidoData = await pedidoResponse.json();

      if (!pedidoResponse.ok) {
        alert("Error al crear el historial de pedido: " + (pedidoData.message || "Error desconocido"));
        return;
      }

      // Compra exitosa
      alert("✅ Compra realizada correctamente.");
      clearCart();
      navigate("/");

    } catch (error) {
      alert("Error del servidor al procesar la compra.");
      console.error(error);
    }
  };

  return (
    <div className="formulario-compra-container">
      <h2>Formulario de Compra</h2>
      <form onSubmit={handleSubmit} className="formulario-compra">
        <label>Método de Pago:</label>
        <select
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
          required
        >
          <option value="">-- Seleccionar --</option>
          <option value={1}>Tarjeta</option>
          <option value={2}>Pago contra entrega</option>
        </select>

        {form.paymentMethod === "1" && (
          <TarjetaForm
            tarjeta={tarjeta}
            handleChange={handleCardChange}
            handleFocus={handleCardFocus}
          />
        )}

        <label>Dirección de envío:</label>
        <input
          type="text"
          name="address"
          placeholder="Ej. Calle 123, Ciudad"
          value={form.address}
          onChange={handleChange}
          required
        />

        <p>Total a pagar: ${total.toFixed(2)}</p>

        <button type="submit" className="btn-comprar">
          Finalizar Compra
        </button>
      </form>
    </div>
  );
};

export default FormularioCompra;
