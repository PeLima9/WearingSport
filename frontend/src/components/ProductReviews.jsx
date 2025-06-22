import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const ProductReviews = ({ productId }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [hasBought, setHasBought] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ qualification: 5, comment: "" });

  // Traer reseñas del producto
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/Reviews/producto/${productId}`);
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.error("Error al cargar reseñas:", error);
      }
    };

    fetchReviews();
  }, [productId]);

  // Verificar si el usuario compró el producto
  useEffect(() => {
    if (!user) {
      setHasBought(false);
      setLoading(false);
      return;
    }
    const checkPurchase = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/Pedidos/haComprado/${user._id}/${productId}`);
        const data = await res.json();
        setHasBought(data.hasBought);
      } catch (error) {
        setHasBought(false);
      } finally {
        setLoading(false);
      }
    };
    checkPurchase();
  }, [user, productId]);

  // Manejo formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.comment.trim()) {
      alert("El comentario no puede estar vacío");
      return;
    }
    if (!user) {
      alert("Debes iniciar sesión para dejar una reseña");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/Reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          qualification: Number(form.qualification),
          comment: form.comment,
          idProducts: productId,
          idClient: user._id,
        }),
      });
      if (!res.ok) throw new Error("Error al enviar reseña");

      alert("Reseña enviada con éxito");
      setForm({ qualification: 5, comment: "" });

      // Refrescar reseñas
      const reviewsRes = await fetch(`http://localhost:4000/api/Reviews/producto/${productId}`);
      const reviewsData = await reviewsRes.json();
      setReviews(reviewsData);
    } catch (error) {
      alert("Error al enviar reseña");
    }
  };

  if (loading) return <p>Cargando reseñas...</p>;

  return (
    <div className="reviews-container">
      <h3>Valoraciones</h3>

      {reviews.length === 0 && <p>No hay valoraciones aún.</p>}

      {reviews.map((review) => (
        <div key={review._id} className="review-item" style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
          <strong>{review.idClient?.name || "Cliente"}</strong>
          <p>⭐ {review.qualification} / 5</p>
          <p>{review.comment}</p>
        </div>
      ))}

      {hasBought ? (
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <h4>Deja tu reseña</h4>
          <label>
            Calificación:
            <select name="qualification" value={form.qualification} onChange={handleChange} required>
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Comentario:
            <textarea
              name="comment"
              value={form.comment}
              onChange={handleChange}
              required
              rows={4}
              style={{ width: "100%" }}
            />
          </label>
          <br />
          <button type="submit">Enviar reseña</button>
        </form>
      ) : (
        <p style={{ marginTop: "20px", fontStyle: "italic", color: "gray" }}>
          Solo puedes dejar una reseña si has comprado este producto.
        </p>
      )}
    </div>
  );
};

export default ProductReviews;
