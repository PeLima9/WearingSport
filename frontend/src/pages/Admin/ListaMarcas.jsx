import { useState, useEffect } from "react";
import "./ListaMarcas.css";

const ListaMarcas = () => {
  const [brands, setBrands] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editBrand, setEditBrand] = useState(null);

  // Carga marcas
  const fetchBrands = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/Brands");
      if (res.ok) {
        const data = await res.json();
        setBrands(data);
      } else {
        setMensaje("Error al cargar marcas");
      }
    } catch {
      setMensaje("Error de red al cargar marcas");
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // Eliminar marca
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar esta marca?")) return;
    try {
      const res = await fetch(`http://localhost:4000/api/Brands/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMensaje("Marca eliminada correctamente ✅");
        fetchBrands();
      } else {
        setMensaje("Error al eliminar la marca");
      }
    } catch {
      setMensaje("Error de red al eliminar la marca");
    }
  };

  // Abrir modal con datos para editar
  const handleEditClick = (brand) => {
    setEditBrand(brand);
    setModalOpen(true);
  };

  // Cerrar modal
  const closeModal = () => {
    setModalOpen(false);
    setEditBrand(null);
    setMensaje("");
  };

  // Guardar cambios (PUT)
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:4000/api/Brands/${editBrand._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brandName: editBrand.brandName,
          description: editBrand.description,
          country: editBrand.country,
        }),
      });
      if (res.ok) {
        setMensaje("Marca actualizada correctamente ✅");
        fetchBrands();
        closeModal();
      } else {
        setMensaje("Error al actualizar la marca");
      }
    } catch {
      setMensaje("Error de red al actualizar la marca");
    }
  };

  // Manejar inputs del modal
  const handleChange = (e) => {
    setEditBrand({ ...editBrand, [e.target.name]: e.target.value });
  };

  return (
    <div className="visualizar-marcas-container">
      <h2>Marcas Existentes</h2>

      {mensaje && <p className="mensaje">{mensaje}</p>}

      <table className="brands-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>País</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {brands.length === 0 ? (
            <tr>
              <td colSpan="4" className="no-data">
                No hay marcas para mostrar
              </td>
            </tr>
          ) : (
            brands.map((brand) => (
              <tr key={brand._id}>
                <td>{brand.brandName}</td>
                <td>{brand.description}</td>
                <td>{brand.country}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEditClick(brand)}>
                    Editar
                  </button>
                  <button className="btn-delete" onClick={() => handleDelete(brand._id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal de edición */}
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Editar Marca</h3>
            <form onSubmit={handleSave}>
              <label>
                Nombre:
                <input
                  name="brandName"
                  value={editBrand.brandName}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Descripción:
                <textarea
                  name="description"
                  value={editBrand.description}
                  onChange={handleChange}
                />
              </label>
              <label>
                País:
                <input
                  name="country"
                  value={editBrand.country}
                  onChange={handleChange}
                  required
                />
              </label>

              <div className="modal-buttons">
                <button type="submit" className="btn-save">
                  Guardar
                </button>
                <button type="button" className="btn-cancel" onClick={closeModal}>
                  Cancelar
                </button>
              </div>
            </form>

            {mensaje && <p className="mensaje">{mensaje}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaMarcas;
