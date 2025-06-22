import React, { useEffect, useState } from 'react';
import './AdminCrearOferta.css';

function AdminCrearOferta() {
  const [productos, setProductos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [marcaSeleccionada, setMarcaSeleccionada] = useState('');
  
  // Estado modal
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Campos de oferta
  const [descuento, setDescuento] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Carga marcas
  useEffect(() => {
    fetch('http://localhost:4000/api/Brands')
      .then(res => res.json())
      .then(data => setMarcas(data))
      .catch(err => console.error('Error al obtener marcas:', err));
  }, []);

  // Carga productos
  useEffect(() => {
    fetch('http://localhost:4000/api/Products')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error('Error al obtener productos:', err));
  }, []);

  // Filtra productos por marca
  const productosFiltrados = marcaSeleccionada
    ? productos.filter(p => p.brandId?.brandName === marcaSeleccionada)
    : productos;

  // Abrir modal y seleccionar producto
  const abrirModal = (producto) => {
    setProductoSeleccionado(producto);
    setDescuento('');
    setFechaInicio('');
    setFechaFin('');
    setMensaje('');
    setModalAbierto(true);
  };

  // Cerrar modal
  const cerrarModal = () => {
    setModalAbierto(false);
    setProductoSeleccionado(null);
  };

  // Crear oferta
  const handleCrearOferta = async () => {
    if (!descuento || !fechaInicio || !fechaFin) {
      setMensaje('❌ Todos los campos son obligatorios');
      return;
    }

    if (descuento < 1 || descuento > 100) {
      setMensaje('❌ El descuento debe estar entre 1% y 100%');
      return;
    }

    if (new Date(fechaInicio) >= new Date(fechaFin)) {
      setMensaje('❌ La fecha fin debe ser posterior a la fecha inicio');
      return;
    }

    try {
      const res = await fetch('http://localhost:4000/api/Ofertas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: productoSeleccionado._id,
          descuento,
          fechaInicio,
          fechaFin
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Error al crear la oferta');
      }

      setMensaje('✅ Oferta creada con éxito');
      // Limpiar campos
      setDescuento('');
      setFechaInicio('');
      setFechaFin('');
    } catch (error) {
      setMensaje(`❌ ${error.message}`);
    }
  };

  return (
    <div className="admin-oferta2">
      <h2>Crear Nueva Oferta</h2>

      {/* Selector de marca */}
      <div className="filtro-marca">
        <label>Filtrar por marca:</label>
        <select
          value={marcaSeleccionada}
          onChange={e => setMarcaSeleccionada(e.target.value)}
        >
          <option value="">-- Todas las marcas --</option>
          {marcas.map(marca => (
            <option key={marca._id} value={marca.brandName}>
              {marca.brandName}
            </option>
          ))}
        </select>
      </div>

      {/* Lista productos */}
      <div className="lista-productos">
        {productosFiltrados.length === 0 && <p>No hay productos para mostrar.</p>}

        {productosFiltrados.map(producto => (
          <div key={producto._id} className="producto-card">
            <img
              src={producto.imageUrl || 'https://via.placeholder.com/120'}
              alt={producto.productName}
              className="producto-imagen"
            />
            <div className="producto-info">
              <h4>{producto.productName}</h4>
              <p>Precio: ${producto.price}</p>
              <button onClick={() => abrirModal(producto)}>Crear Oferta</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalAbierto && (
        <div className="modal-fondo" onClick={cerrarModal}>
          <div className="modal-contenido" onClick={e => e.stopPropagation()}>
            <h3>Crear oferta para: {productoSeleccionado.productName}</h3>

            {mensaje && <p className="mensaje">{mensaje}</p>}

            <label>Descuento (%)</label>
            <input
              type="number"
              min="1"
              max="100"
              value={descuento}
              onChange={e => setDescuento(e.target.value)}
            />

            <label>Fecha inicio</label>
            <input
              type="date"
              value={fechaInicio}
              onChange={e => setFechaInicio(e.target.value)}
            />

            <label>Fecha fin</label>
            <input
              type="date"
              value={fechaFin}
              onChange={e => setFechaFin(e.target.value)}
            />

            <div className="modal-botones">
              <button onClick={handleCrearOferta}>Crear Oferta</button>
              <button onClick={cerrarModal} className="btn-cerrar">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCrearOferta;
