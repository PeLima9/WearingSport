// src/components/NavbarAdmin.jsx
import { Link } from 'react-router-dom';
import './NavbarAdmin.css'; // Estilo separado

const NavbarAdmin = () => {
  return (
    <nav className="navbar-admin">
      <ul>
        <li><Link to="/admin">Dashboard</Link></li>
        <li><Link to="/admin/agregarusuario">AgregarEmpleado</Link></li>
        <li><Link to="/admin/agregarproducto">Productos</Link></li>
        <li><Link to="/admin/ofertas">Ofertas</Link></li>
        <li><Link to="/login">Cerrar sesión</Link></li>
      </ul>
    </nav>
  );
};

export default NavbarAdmin;
