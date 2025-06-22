import { useEffect, useState } from 'react';

export const useCategorias = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/Categories');
        const data = await res.json();
        setCategorias(data);
      } catch (err) {
        console.error('Error al obtener categorías:', err);
      }
    };

    fetchCategorias();
  }, []);

  return categorias;
};
