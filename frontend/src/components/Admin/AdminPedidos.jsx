import { useEffect, useState } from "react";
import './AdminPedidos.css'; // Asegúrate de tener el CSS

const AdminPedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/Pedidos/admin/todos", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setPedidos(data.pedidos);
        }
      } catch (error) {
        console.error("Error al obtener pedidos:", error);
      }
    };

    fetchPedidos();
  }, []);

  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      const res = await fetch(`http://localhost:4000/api/Pedidos/admin/${id}/estado`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ nuevoEstado }),
      });

      const data = await res.json();
      if (data.success) {
        setPedidos((prev) =>
          prev.map((p) => (p._id === id ? { ...p, estado: nuevoEstado } : p))
        );
      }
    } catch (error) {
      console.error("Error al cambiar estado:", error);
    }
  };

  return (
    <div className="admin-pedidos-container">
      <h2>Gestión de Pedidos</h2>
      {pedidos.length === 0 ? (
        <p>No hay pedidos.</p>
      ) : (
        pedidos.map((pedido) => (
          <div key={pedido._id} className="pedido-card">
            <p><strong>Cliente:</strong> {pedido.userId?.name || "N/A"} ({pedido.userId?.email})</p>
            <p><strong>Total:</strong> ${pedido.total.toFixed(2)}</p>
            <p>
              <strong>Estado:</strong>{" "}
              <span className={`estado-badge ${pedido.estado.toLowerCase()}`}>
                {pedido.estado}
              </span>
            </p>
            <p><strong>Fecha:</strong> {new Date(pedido.fecha).toLocaleString()}</p>
            <ul>
              {pedido.productos.map((prod, i) => (
                <li key={i}>{prod.name} x {prod.quantity}</li>
              ))}
            </ul>
            <select
              value={pedido.estado}
              onChange={(e) => cambiarEstado(pedido._id, e.target.value)}
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Enviado">Enviado</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminPedidos;
