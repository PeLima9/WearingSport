// Nueva pantalla: ProductosAdmin.jsx
import React, { useState, useEffect } from 'react';
import './ProductosAdmin.css';

const ProductosAdmin = () => {
  const [productos, setProductos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtroMarca, setFiltroMarca] = useState('');
  const [productoEditando, setProductoEditando] = useState(null);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [notificacion, setNotificacion] = useState('');
  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    description: '',
    image: null,
    categories: '',
    brandId: '',
    stock: '',
  });

  useEffect(() => {
    const fetchMarcas = async () => {
      const res = await fetch('http://localhost:4000/api/Brands');
      const data = await res.json();
      setMarcas(data);
    };
    const fetchCategorias = async () => {
      const res = await fetch('http://localhost:4000/api/Categories');
      const data = await res.json();
      setCategorias(data);
    };
    fetchMarcas();
    fetchCategorias();
  }, []);

  useEffect(() => {
    const fetchProductos = async () => {
      const res = await fetch('http://localhost:4000/api/Products');
      const data = await res.json();
      setProductos(data);
    };
    fetchProductos();
  }, []);

  const confirmarDelete = async () => {
    if (!productoAEliminar) return;
    await fetch(`http://localhost:4000/api/Products/${productoAEliminar}`, { method: 'DELETE' });
    setProductos(productos.filter(p => p._id !== productoAEliminar));
    setProductoAEliminar(null);
    setNotificacion('Producto eliminado exitosamente.');
    setTimeout(() => setNotificacion(''), 3000);
  };

  const handleEditClick = (producto) => {
    setProductoEditando(producto);
    setFormData({
      productName: producto.productName,
      price: producto.price,
      description: producto.description,
      image: null,
      categories: producto.categories._id || producto.categories,
      brandId: producto.brandId._id || producto.brandId,
      stock: producto.stock,
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const dataToSend = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (val) dataToSend.append(key, val);
    });

    const res = await fetch(`http://localhost:4000/api/Products/${productoEditando._id}`, {
      method: 'PUT',
      body: dataToSend
    });

    const updated = await res.json();
    setProductoEditando(null);
    setProductos(prev => prev.map(p => p._id === updated.updatedProduct._id ? updated.updatedProduct : p));
    setNotificacion('Producto actualizado exitosamente.');
    setTimeout(() => setNotificacion(''), 3000);
  };

  const productosFiltrados = filtroMarca
    ? productos.filter(p => {
        if (typeof p.brandId === 'object' && p.brandId !== null) {
          return p.brandId._id === filtroMarca;
        } else {
          return p.brandId === filtroMarca;
        }
      })
    : productos;

  return (
    <div className="productos-admin-container">
      <h2>Productos Agregados</h2>

      {notificacion && <div className="notificacion">{notificacion}</div>}

      <select value={filtroMarca} onChange={(e) => setFiltroMarca(e.target.value)}>
        <option value="">-- Filtrar por marca --</option>
        {marcas.map((m) => (
          <option key={m._id} value={m._id}>{m.brandName}</option>
        ))}
      </select>

      <div className="productos-lista">
        {productosFiltrados.map((prod) => (
          <div key={prod._id} className="producto-item">
            <img src={prod.imageUrl} alt={prod.productName} width="100" />
            <h4>{prod.productName}</h4>
            <p>Precio: ${prod.price}</p>
            <p>Stock: {prod.stock}</p>
            <button onClick={() => setProductoAEliminar(prod._id)}>Eliminar</button>
            <button onClick={() => handleEditClick(prod)}>Editar</button>
          </div>
        ))}
      </div>

      {productoAEliminar && (
        <div className="modal-overlay">
          <div className="modal modal-confirm">
            <h3>Confirmar Eliminación</h3>
            <p>¿Estás seguro que deseas eliminar este producto?</p>
            <div className="modal-buttons">
              <button className="btn-confirm" onClick={confirmarDelete}>Sí, eliminar</button>
              <button className="btn-cancel" onClick={() => setProductoAEliminar(null)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {productoEditando && (
        <div className="modal-overlay">
          <div className="modal modal-editar">
            <h3>Editar Producto</h3>
            <form onSubmit={handleUpdate} className="editar-formulario">
              <div className="form-group">
                <label>Nombre:</label>
                <input type="text" name="productName" value={formData.productName} onChange={handleFormChange} required />
              </div>
              <div className="form-group">
                <label>Precio:</label>
                <input type="number" name="price" value={formData.price} onChange={handleFormChange} required />
              </div>
              <div className="form-group">
                <label>Stock:</label>
                <input type="number" name="stock" value={formData.stock} onChange={handleFormChange} required />
              </div>
              <div className="form-group">
                <label>Descripción:</label>
                <textarea name="description" value={formData.description} onChange={handleFormChange} />
              </div>
              <div className="form-group">
                <label>Categoría:</label>
                <select name="categories" value={formData.categories} onChange={handleFormChange} required>
                  <option value="">Selecciona una categoría</option>
                  {categorias.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.categoryName}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Imagen (opcional):</label>
                <input type="file" name="image" onChange={handleFileChange} />
              </div>
              <div className="modal-buttons">
                <button type="submit" className="btn-confirm">Guardar Cambios</button>
                <button type="button" className="btn-cancel" onClick={() => setProductoEditando(null)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductosAdmin;
