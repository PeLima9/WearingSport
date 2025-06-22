// src/components/HistorialPedidos.jsx
import { useEffect, useState } from "react";

const estadoClase = {
  Pendiente: "estado-pendiente",
  Enviado: "estado-enviado",
  Cancelado: "estado-cancelado",
};

const HistorialPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerPedidos = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/Pedidos/mios", {
          credentials: "include", // ✅ importante para que se envíe la cookie
        });
        const data = await res.json();
        if (data.success) {
          setPedidos(data.pedidos);
        } else {
          setPedidos([]);
        }
      } catch (error) {
        console.error("Error al obtener pedidos:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerPedidos();
  }, []);

  if (loading) return <p>Cargando historial...</p>;
  if (pedidos.length === 0) return <p>No tienes pedidos realizados.</p>;

  return (
    <div className="historial-pedidos">
      <h3>Historial de Pedidos</h3>
      {pedidos.map((pedido) => (
        <div key={pedido._id} className="pedido-card">
          <p><strong>Fecha:</strong> {new Date(pedido.fecha).toLocaleString()}</p>
          <p>
            <strong>Estado:</strong>{" "}
            <span className={estadoClase[pedido.estado] || ""}>
              {pedido.estado}
            </span>
          </p>
          <p><strong>Total:</strong> ${pedido.total.toFixed(2)}</p>
          <ul>
            {pedido.productos.map((prod, i) => (
              <li key={i}>
                {prod.name} x {prod.quantity} - ${prod.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default HistorialPedidos;
