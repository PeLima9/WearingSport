// components/ListaCustomers.jsx
import React from "react";
import { useCustomers } from "../../hooks/useCustomers";
import "./ListaCustomers.css";

const ListaCustomers = () => {
  const { customers, loading, error } = useCustomers();

  return (
    <div className="lista-customers-container">
      <h2>Lista de Clientes</h2>

      {loading && <p>Cargando clientes...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && customers.length === 0 && <p>No hay clientes registrados.</p>}

      {!loading && !error && customers.length > 0 && (
        <table className="tabla-customers">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListaCustomers;
