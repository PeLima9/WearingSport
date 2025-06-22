// src/components/NavbarAdmin.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./NavbarAdmin.css";

const NavbarAdmin = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <nav className="navbar-admin">
      <div className="navbar-logo">AdminPanel</div>

      <div className="menu-icon" onClick={toggleMenu}>
        {menuAbierto ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={menuAbierto ? "nav-links activo" : "nav-links"}>
        <li><Link to="/admin" onClick={cerrarMenu}>Dashboard</Link></li>
        <li><Link to="/admin/agregarusuario" onClick={cerrarMenu}>Empleado</Link></li>
        <li><Link to="/admin/agregarproducto" onClick={cerrarMenu}>Productos</Link></li>
        <li><Link to="/admin/crearoferta" onClick={cerrarMenu}>Ofertas</Link></li>
        <li><Link to="/admin/crearmarca" onClick={cerrarMenu}>Marca</Link></li>
        <li><Link to="/admin/crearcategoria" onClick={cerrarMenu}>Categoría</Link></li>
        <li><Link to="/admin/verpedidos" onClick={cerrarMenu}>Pedidos</Link></li>
        <li><Link to="/admin/verreview" onClick={cerrarMenu}>Reviews</Link></li>
        <li><Link to="/login" onClick={cerrarMenu}>Cerrar sesión</Link></li>
      </ul>
    </nav>
  );
};

export default NavbarAdmin;
