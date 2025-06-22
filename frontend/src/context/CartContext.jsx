// src/context/CartContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user, loading } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  // Carga inicial del carrito cuando ya está cargado el usuario
  useEffect(() => {
    if (!loading) {
      if (user && user._id) {
        const storedCart = localStorage.getItem(`cartItems_${user._id}`);
        setCartItems(storedCart ? JSON.parse(storedCart) : []);
      } else {
        setCartItems([]);
      }
    }
  }, [user, loading]);

  // Guarda carrito en localStorage cuando haya usuario y datos listos
  useEffect(() => {
    if (!loading && user && user._id) {
      localStorage.setItem(`cartItems_${user._id}`, JSON.stringify(cartItems));
    }
  }, [cartItems, user, loading]);

  const addToCart = (product) => {
    if (!user || !user._id || loading) return;

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);
      if (existingItem) {
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    if (user && user._id) {
      localStorage.removeItem(`cartItems_${user._id}`);
    }
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
