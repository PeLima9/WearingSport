import { useState } from "react";
import "./CrearMarca.css";

const CrearMarca = () => {
  const [brandName, setBrandName] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/Brands", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          brandName,
          description,
          country,
        }),
      });

      if (res.ok) {
        setMensaje("Marca creada correctamente ✅");
        setBrandName("");
        setDescription("");
        setCountry("");
      } else {
        setMensaje("❌ Error al crear la marca");
      }
    } catch (error) {
      console.error("Error:", error);
      setMensaje("❌ Error de red o servidor");
    }
  };

  return (
    <div className="crear-marca-container">
      <h2>Crear Marca</h2>
      <form className="form-crear-marca" onSubmit={handleSubmit}>
        <label>
          Nombre de la marca:
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            required
          />
        </label>

        <label>
          Descripción:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>

        <label>
          País:
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>

        <button type="submit">Crear Marca</button>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default CrearMarca;
