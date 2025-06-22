import React, { useState, useEffect } from 'react';
import { useMarcas } from '../../hooks/useMarcas';
import { useCategorias } from '../../hooks/useCategorias';
import ModalEditarProducto from '../../components/Admin/ModalEditarProducto';
import './ProductosAdmin.css';

const ProductosAdmin = () => {
  const marcas = useMarcas();
  const categorias = useCategorias();

  const [productos, setProductos] = useState([]);
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

  // Cargar productos
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/Products');
        const data = await res.json();
        setProductos(data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };
    fetchProductos();
  }, []);

  // Confirmar eliminación
  const confirmarDelete = async () => {
    if (!productoAEliminar) return;

    try {
      const res = await fetch(`http://localhost:4000/api/Products/${productoAEliminar}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Error al eliminar producto');

      setProductos(productos.filter(p => p._id !== productoAEliminar));
      setNotificacion('Producto eliminado exitosamente.');
      setTimeout(() => setNotificacion(''), 3000);
    } catch (error) {
      setNotificacion('Error al eliminar producto.');
      console.error(error);
    }
    setProductoAEliminar(null);
  };

  // Editar producto
  const handleEditClick = (producto) => {
    setProductoEditando(producto);
    setFormData({
      productName: producto.productName,
      price: producto.price,
      description: producto.description,
      image: null, // se puede cargar null para nueva imagen
      categories: typeof producto.categories === 'object' ? producto.categories._id : producto.categories,
      brandId: typeof producto.brandId === 'object' ? producto.brandId._id : producto.brandId,
      stock: producto.stock,
    });
  };

  // Cambios en formulario
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Cambios en input file
  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  // Guardar cambios producto
  const handleUpdate = async (e) => {
    e.preventDefault();

    const dataToSend = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (val !== null && val !== '') {
        dataToSend.append(key, val);
      }
    });

    try {
      const res = await fetch(`http://localhost:4000/api/Products/${productoEditando._id}`, {
        method: 'PUT',
        body: dataToSend,
      });
      if (!res.ok) throw new Error('Error al actualizar producto');

      const updated = await res.json();
      setProductos(prev =>
        prev.map(p => (p._id === updated.updatedProduct._id ? updated.updatedProduct : p))
      );
      setProductoEditando(null);
      setNotificacion('Producto actualizado exitosamente.');
      setTimeout(() => setNotificacion(''), 3000);
    } catch (error) {
      setNotificacion('Error al actualizar producto.');
      console.error(error);
    }
  };

  // Filtrar productos por marca
  const productosFiltrados = filtroMarca
    ? productos.filter(p => {
        if (typeof p.brandId === 'object' && p.brandId !== null) {
          return p.brandId._id === filtroMarca;
        }
        return p.brandId === filtroMarca;
      })
    : productos;

  return (
    <div className="productos-admin-container">
      <h2>Productos Agregados</h2>

      {notificacion && <div className="notificacion">{notificacion}</div>}

      <select value={filtroMarca} onChange={(e) => setFiltroMarca(e.target.value)}>
        <option value="">-- Filtrar por marca --</option>
        {marcas.map(m => (
          <option key={m._id} value={m._id}>{m.brandName}</option>
        ))}
      </select>

      <div className="productos-lista">
        {productosFiltrados.map(prod => (
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

      {/* Modal para confirmar eliminación */}
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

      {/* Modal para editar producto usando componente separado */}
      {productoEditando && (
        <ModalEditarProducto
          producto={productoEditando}
          categorias={categorias}
          formData={formData}
          onChange={handleFormChange}
          onFileChange={handleFileChange}
          onSubmit={handleUpdate}
          onCancelar={() => setProductoEditando(null)}
        />
      )}
    </div>
  );
};

export default ProductosAdmin;
