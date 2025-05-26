import React from 'react';
import './AgregarProducto.css';

const AgregarProducto = () => {
  return (
    <div className="agregar-producto-container">
      <h2>Agregar Nuevo Producto</h2>
      <form className="form-agregar-producto">
        <label>
          Nombre del producto:
          <input type="text" placeholder="Ej. Nike Air Max" />
        </label>
        <label>
          Precio:
          <input type="number" placeholder="Ej. 99.99" />
        </label>
        <label>
          Descripción:
          <textarea placeholder="Descripción del producto" />
        </label>
        <label>
          Imagen:
          <input type="file" />
        </label>
        <label>
          Categoría:
          <select>
            <option value="">Selecciona una categoría</option>
            <option value="running">Running</option>
            <option value="gym">Entrenamiento</option>
            <option value="moda">Moda</option>
          </select>
        </label>
        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
};

export default AgregarProducto;
