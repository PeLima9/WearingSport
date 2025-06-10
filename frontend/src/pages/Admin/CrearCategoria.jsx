import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./CrearMarca.css";

const CrearCategoria = () => {
  const navigate = useNavigate();

  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/Categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryName,
          description,
        }),
      });

      if (res.ok) {
        setMensaje("Categoría creada correctamente ✅");
        setCategoryName("");
        setDescription("");
      } else {
        setMensaje("❌ Error al crear la categoría");
      }
    } catch (error) {
      console.error("Error:", error);
      setMensaje("❌ Error de red o servidor");
    }
  };

  return (
    <div className="crear-marca-container">
      <h2>Crear Categoría</h2>
      <form className="form-crear-marca" onSubmit={handleSubmit}>
        <label>
          Nombre de la categoría:
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </label>

        <label>
          Descripción:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </label>

        <button type="submit">Crear Categoría</button>
      </form>

      <button
        className="btn-ver-usuarios"
        onClick={() => navigate("/admin/listacategorias")}
      >
        Ver Categorías
      </button>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default CrearCategoria;