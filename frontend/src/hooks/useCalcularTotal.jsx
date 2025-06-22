export const useCalcularTotal = (cartItems) => {
  return cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );
};
