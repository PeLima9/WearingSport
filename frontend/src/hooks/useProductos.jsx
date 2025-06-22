import { useState, useEffect } from 'react';

export const useProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/Products')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error('Error al obtener productos:', err));
  }, []);

  return productos;
};
