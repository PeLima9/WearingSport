// hooks/useCustomers.js
import { useEffect, useState } from "react";

export const useCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/Customers");
        if (!res.ok) throw new Error("Error al obtener clientes");
        const data = await res.json();
        setCustomers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return { customers, loading, error };
};
