import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavbarAdmin from '../components/Admin/NavbarAdmin';
import './AdminLayouts.css';

const AdminLayout = () => {
  const location = useLocation();

  // Decide si quitar el fondo en estas rutas
  const sinFondo =
    location.pathname === "/admin/listausuarios" ||
    location.pathname.startsWith("/admin/editar-usuario");

  return (
    <div className={`admin-layout ${sinFondo ? "sin-fondo" : ""}`}>
      <NavbarAdmin />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
