import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUser, FaShoppingCart } from 'react-icons/fa'; // Importa los íconos
import './Nav.css';

const Nav = () => {
  const location = useLocation(); // Obtiene la ruta actual
  const [showBrandsMenu, setShowBrandsMenu] = useState(false); // Estado para el submenú de marcas
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false); // Estado para el submenú de categorías

  // Verificar si estamos en la página de login o recuperar o crear cuenta
  const isLoginOrRecoverPage = location.pathname === '/login' || location.pathname === '/recuperar' || location.pathname === '/crear-cuenta';

  // Función para alternar el menú desplegable de marcas
  const toggleBrandsMenu = () => {
    setShowBrandsMenu(!showBrandsMenu);
  };

  // Función para alternar el menú desplegable de categorías
  const toggleCategoriesMenu = () => {
    setShowCategoriesMenu(!showCategoriesMenu);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="logo-link">
          <h1>WearingSport</h1>
        </Link>
      </div>

      {/* Mostrar los enlaces de navegación solo si no estamos en la página de login o recuperar contraseña */}
      {!isLoginOrRecoverPage && (
        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>

          {/* Enlace de marcas que activa el menú desplegable */}
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

          {/* Enlace de categorías que activa el menú desplegable */}
          <li className="categories" 
              onMouseEnter={() => setShowCategoriesMenu(true)} 
              onMouseLeave={() => setShowCategoriesMenu(false)}>
            <span>Categorías</span>
            {showCategoriesMenu && (
              <ul className="categories-dropdown">
                <li><Link to="/categorias/runinnyatletismo">Runinng y Atletismo</Link></li>
                <li><Link to="/categorias/entrenamientoygym">Entrenamiento y Gym</Link></li>
                <li><Link to="/categorias/deportesdecancha">Deportes de Cancha</Link></li>
                <li><Link to="/categorias/futbolyfutbolsala">Futbol y futbol sala</Link></li>
                <li><Link to="/categorias/ciclismo">Ciclismo</Link></li>

              </ul>
            )}
          </li>

          <li><Link to="/ofertas">Ofertas</Link></li>
          <li><Link to="/aboutus">Sobre Nosotros</Link></li>
          </ul>
      )}

      {/* Siempre mostrar los íconos de login y carrito */}
      <ul className="nav-icons">
        <li><Link to="/login"><FaUser size={24} /></Link></li>
        <li><Link to="/carrito"><FaShoppingCart size={24} /></Link></li>
      </ul>
    </nav>
  );
};

export default Nav;
