import React from "react";

const FormularioAgregarProducto = ({
  formData,
  marcas,
  categorias,
  error,
  loading,
  fileInputRef,
  handleChange,
  handleFileChange,
  handleSubmit,
  handleVerProductos
}) => {
  return (
    <div className="agregar-producto-container">
      <h2>Agregar Nuevo Producto</h2>

      <form className="form-agregar-producto" onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}

        <label>Nombre del producto:
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
          />
        </label>

        <label>Precio:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0.01"
          />
        </label>

        <label>Descripción:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength="500"
          />
        </label>

        <label>Imagen:
          <input
            type="file"
            name="image"
            ref={fileInputRef}
            onChange={handleFileChange}
            required
          />
        </label>

        <label>Marca:
          <select
            name="brandId"
            value={formData.brandId}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una marca</option>
            {marcas.map((m) => (
              <option key={m._id} value={m._id}>
                {m.brandName}
              </option>
            ))}
          </select>
        </label>

        <label>Categoría:
          <select
            name="categories"
            value={formData.categories}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((c) => (
              <option key={c._id} value={c._id}>
                {c.categoryName}
              </option>
            ))}
          </select>
        </label>

        <label>Stock disponible:
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            min="0"
          />
        </label>

        {formData.image && (
          <div>
            <h4>Imagen seleccionada:</h4>
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Previsualización"
              width="100"
            />
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Agregando..." : "Agregar Producto"}
        </button>
      </form>

      <br />
      <button
        onClick={handleVerProductos}
        className="ver-productos-button"
      >
        Ver Productos Agregados
      </button>
    </div>
  );
};

export default FormularioAgregarProducto;
