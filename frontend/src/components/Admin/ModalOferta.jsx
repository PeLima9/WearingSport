import React from "react";


const ModalOferta = ({
  producto,
  descuento,
  fechaInicio,
  fechaFin,
  mensaje,
  onDescuentoChange,
  onFechaInicioChange,
  onFechaFinChange,
  onCrearOferta,
  onCerrar
}) => {
  if (!producto) return null;

  return (
    <div className="modal-fondo" onClick={onCerrar}>
      <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
        <h3>Crear oferta para: {producto.productName}</h3>
        {mensaje && <p className="mensaje">{mensaje}</p>}

        <label>Descuento (%)</label>
        <input
          type="number"
          min="1"
          max="100"
          value={descuento}
          onChange={onDescuentoChange}
        />

        <label>Fecha inicio</label>
        <input
          type="date"
          value={fechaInicio}
          onChange={onFechaInicioChange}
        />

        <label>Fecha fin</label>
        <input
          type="date"
          value={fechaFin}
          onChange={onFechaFinChange}
        />

        <div className="modal-botones">
          <button onClick={onCrearOferta}>Crear Oferta</button>
          <button onClick={onCerrar} className="btn-cerrar">Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalOferta;
