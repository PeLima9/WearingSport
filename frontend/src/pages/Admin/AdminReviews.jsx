import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import "./AdminReviews.css";

const AdminReviews = () => {
  const { user, loading } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loading && user && user.rol === "admin") {
      fetchReviews();
    }
  }, [loading, user]);

  const fetchReviews = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/Reviews", {
        credentials: "include", // para enviar cookies con token JWT
      });
      if (!res.ok) {
        throw new Error("Error al obtener las reseñas");
      }
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (!user || user.rol !== "admin") return <p>No autorizado</p>;

  return (
    <div className="admin-reviews-container">
      <h2>Reseñas de Productos</h2>
      {error && <p className="error">{error}</p>}
      {reviews.length === 0 ? (
        <p>No hay reseñas para mostrar.</p>
      ) : (
        <table className="reviews-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cliente</th>
              <th>Calificación</th>
              <th>Comentario</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((rev) => (
              <tr key={rev._id}>
                <td>{rev.idProducts?.productName || "Desconocido"}</td>
                <td>{rev.idClient?.name || "Anónimo"}</td>
                <td>{rev.qualification} ⭐</td>
                <td>{rev.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminReviews;
