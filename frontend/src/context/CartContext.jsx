// src/context/CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Crear el contexto
const CartContext = createContext();

// 2. Hook personalizado para acceder más fácil
export const useCart = () => useContext(CartContext);

// 3. Proveedor que envuelve la app y maneja el estado global del carrito
export const CartProvider = ({ children }) => {
  // Cargar carrito desde localStorage (si existe)
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Guardar carrito cada vez que cambia
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Agregar producto al carrito
  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  // Eliminar producto por ID
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
