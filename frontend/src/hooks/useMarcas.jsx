import { useEffect, useState } from 'react';

export const useMarcas = () => {
  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/Brands');
        const data = await res.json();
        setMarcas(data);
      } catch (err) {
        console.error('Error al obtener marcas:', err);
      }
    };

    fetchMarcas();
  }, []);

  return marcas;
};
