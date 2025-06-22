import React, { useState } from "react";
import { useMarcas } from "../../hooks/useMarcas";
import { useProductos } from "../../hooks/useProductos";
import { useModal } from "../../hooks/useModal";
import ModalOferta from "../../components/Admin/ModalOferta";
import "./AdminCrearOferta.css";

function AdminCrearOferta() {
  const marcas = useMarcas();
  const productos = useProductos();
  const { isOpen: modalAbierto, abrir: abrirModalHook, cerrar: cerrarModalHook } = useModal();

  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [marcaSeleccionada, setMarcaSeleccionada] = useState("");

  const [descuento, setDescuento] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [mensaje, setMensaje] = useState("");

  const productosFiltrados = marcaSeleccionada
    ? productos.filter((p) => p.brandId?.brandName === marcaSeleccionada)
    : productos;

  const abrirModal = (producto) => {
    setProductoSeleccionado(producto);
    setDescuento("");
    setFechaInicio("");
    setFechaFin("");
    setMensaje("");
    abrirModalHook();
  };

  const cerrarModal = () => {
    cerrarModalHook();
    setProductoSeleccionado(null);
  };

  const handleCrearOferta = async () => {
    if (!descuento || !fechaInicio || !fechaFin) {
      setMensaje("❌ Todos los campos son obligatorios");
      return;
    }

    if (descuento < 1 || descuento > 100) {
      setMensaje("❌ El descuento debe estar entre 1% y 100%");
      return;
    }

    if (new Date(fechaInicio) >= new Date(fechaFin)) {
      setMensaje("❌ La fecha fin debe ser posterior a la fecha inicio");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/Ofertas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: productoSeleccionado._id,
          descuento,
          fechaInicio,
          fechaFin,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Error al crear la oferta");

      setMensaje("✅ Oferta creada con éxito");
      setDescuento("");
      setFechaInicio("");
      setFechaFin("");
    } catch (error) {
      setMensaje(`❌ ${error.message}`);
    }
  };

  return (
    <div className="admin-oferta2">
      <h2>Crear Nueva Oferta</h2>

      <div className="filtro-marca">
        <label>Filtrar por marca:</label>
        <select
          value={marcaSeleccionada}
          onChange={(e) => setMarcaSeleccionada(e.target.value)}
        >
          <option value="">-- Todas las marcas --</option>
          {marcas.map((marca) => (
            <option key={marca._id} value={marca.brandName}>
              {marca.brandName}
            </option>
          ))}
        </select>
      </div>

      <div className="lista-productos">
        {productosFiltrados.length === 0 && <p>No hay productos para mostrar.</p>}

        {productosFiltrados.map((producto) => (
          <div key={producto._id} className="producto-card">
            <img
              src={producto.imageUrl || "https://via.placeholder.com/120"}
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

      {modalAbierto && (
        <ModalOferta
          producto={productoSeleccionado}
          descuento={descuento}
          fechaInicio={fechaInicio}
          fechaFin={fechaFin}
          mensaje={mensaje}
          onDescuentoChange={(e) => setDescuento(e.target.value)}
          onFechaInicioChange={(e) => setFechaInicio(e.target.value)}
          onFechaFinChange={(e) => setFechaFin(e.target.value)}
          onCrearOferta={handleCrearOferta}
          onCerrar={cerrarModal}
        />
      )}
    </div>
  );
}

export default AdminCrearOferta;
