import { useState, useEffect } from "react";
import "./ListaMarcas.css";

const ListaCategorias = () => {
  const [categories, setCategories] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  // Carga categorías
  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/Categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      } else {
        setMensaje("Error al cargar categorías");
      }
    } catch {
      setMensaje("Error de red al cargar categorías");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Eliminar categoría
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar esta categoría?")) return;
    try {
      const res = await fetch(`http://localhost:4000/api/Categories/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMensaje("Categoría eliminada correctamente ✅");
        fetchCategories();
      } else {
        setMensaje("Error al eliminar la categoría");
      }
    } catch {
      setMensaje("Error de red al eliminar la categoría");
    }
  };

  // Abrir modal con datos para editar
  const handleEditClick = (category) => {
    setEditCategory(category);
    setModalOpen(true);
  };

  // Cerrar modal
  const closeModal = () => {
    setModalOpen(false);
    setEditCategory(null);
    setMensaje("");
  };

  // Guardar cambios (PUT)
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:4000/api/Categories/${editCategory._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoryName: editCategory.categoryName,
          description: editCategory.description,
        }),
      });
      if (res.ok) {
        setMensaje("Categoría actualizada correctamente ✅");
        fetchCategories();
        closeModal();
      } else {
        setMensaje("Error al actualizar la categoría");
      }
    } catch {
      setMensaje("Error de red al actualizar la categoría");
    }
  };

  // Manejar inputs del modal
  const handleChange = (e) => {
    setEditCategory({ ...editCategory, [e.target.name]: e.target.value });
  };

  return (
    <div className="visualizar-marcas-container">
      <h2>Categorías Existentes</h2>

      {mensaje && <p className="mensaje">{mensaje}</p>}

      <table className="brands-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan="3" className="no-data">
                No hay categorías para mostrar
              </td>
            </tr>
          ) : (
            categories.map((category) => (
              <tr key={category._id}>
                <td>{category.categoryName}</td>
                <td>{category.description}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEditClick(category)}>
                    Editar
                  </button>
                  <button className="btn-delete" onClick={() => handleDelete(category._id)}>
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
            <h3>Editar Categoría</h3>
            <form onSubmit={handleSave}>
              <label>
                Nombre:
                <input
                  name="categoryName"
                  value={editCategory.categoryName}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Descripción:
                <textarea
                  name="description"
                  value={editCategory.description}
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

export default ListaCategorias;