import React from "react";

const ModalEditarProducto = ({
  producto,
  categorias,
  formData,
  onChange,
  onFileChange,
  onSubmit,
  onCancelar,
}) => {
  if (!producto) return null;

  return (
    <div className="modal-overlay">
      <div className="modal modal-editar">
        <h3>Editar Producto</h3>
        <form onSubmit={onSubmit} className="editar-formulario">
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Precio:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Stock:</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Descripción:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label>Categoría:</label>
            <select
              name="categories"
              value={formData.categories}
              onChange={onChange}
              required
            >
              <option value="">Selecciona una categoría</option>
              {categorias.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Imagen (opcional):</label>
            <input type="file" name="image" onChange={onFileChange} />
          </div>
          <div className="modal-buttons">
            <button type="submit" className="btn-confirm">
              Guardar Cambios
            </button>
            <button type="button" className="btn-cancel" onClick={onCancelar}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditarProducto;
