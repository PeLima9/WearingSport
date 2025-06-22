// Nav.jsx (mejorado con loading)
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './Nav.css';

const Nav = () => {
  const location = useLocation();
  const { user, loading, logout } = useAuth();
  const [showBrandsMenu, setShowBrandsMenu] = useState(false);
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);

  const isLoginOrRecoverPage =
    location.pathname === '/login' ||
    location.pathname === '/recuperar' ||
    location.pathname === '/crear-cuenta';

  // Mientras carga el estado de usuario, evita mostrar nav completo o muestra solo logo
  if (loading) {
    return (
      <nav className="navbar">
        <div className="logo">
          <Link to="/" className="logo-link">
            <h1>WearingSport</h1>
          </Link>
        </div>
        {/* Opcional: podrías agregar un spinner o placeholder aquí */}
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="logo-link">
          <h1>WearingSport</h1>
        </Link>
      </div>

      {!isLoginOrRecoverPage && (
        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li className="brands"
              onMouseEnter={() => setShowBrandsMenu(true)}
              onMouseLeave={() => setShowBrandsMenu(false)}>
            <span>Marcas</span>
            {showBrandsMenu && (
              <ul className="brands-dropdown">
                <li><Link to="/marcas/nike">Nike</Link></li>
                <li><Link to="/marcas/adidas">Adidas</Link></li>
                <li><Link to="/marcas/puma">Puma</Link></li>
                <li><Link to="/marcas/reebok">Reebok</Link></li>
                <li><Link to="/marcas/underarmour">UnderArmour</Link></li>
                <li><Link to="/marcas/asics">Asics</Link></li>
                <li><Link to="/marcas/converse">Converse</Link></li>
                <li><Link to="/marcas/hoka">Hoka</Link></li>
              </ul>
            )}
          </li>
          <li className="categories"
              onMouseEnter={() => setShowCategoriesMenu(true)}
              onMouseLeave={() => setShowCategoriesMenu(false)}>
            <span>Categorías</span>
            {showCategoriesMenu && (
              <ul className="categories-dropdown">
                <li><Link to="/categorias/runinnyatletismo">Runinng y Atletismo</Link></li>
                <li><Link to="/categorias/entrenamientoygym">Entrenamiento y Gym</Link></li>
                <li><Link to="/categorias/deportesdecancha">Deportes de Cancha</Link></li>
                <li><Link to="/categorias/casuales">Casuales</Link></li>
              </ul>
            )}
          </li>
          <li><Link to="/ofertas1">Ofertas</Link></li>
          <li><Link to="/aboutus">Sobre Nosotros</Link></li>
        </ul>
      )}

      <ul className="nav-icons">
        <li>
          {user ? (
            <>
              <Link to="/perfil"><FaUser size={24} title="Mi Perfil" /></Link>
            </>
          ) : (
            <Link to="/login"><FaUser size={24} title="Iniciar sesión / Crear cuenta" /></Link>
          )}
        </li>
        {/* Mostrar carrito solo si hay usuario */}
        {user && (
          <li>
            <Link to="/carrito"><FaShoppingCart size={24} title="Ver carrito" /></Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
