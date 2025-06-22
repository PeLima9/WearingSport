import { useState } from "react";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const abrir = () => setIsOpen(true);
  const cerrar = () => setIsOpen(false);

  return { isOpen, abrir, cerrar };
};
