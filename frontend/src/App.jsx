import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Marcas from './pages/Marcas';
import Login from './pages/Login';
import Recuperar from './components/Recuperar';
import CrearCuenta from './components/CrearCuenta';
import About from './pages/About';
//////// importaciones de las paginas de marcas
import Nike from './pages/Nike';
import Adidas from './pages/Adidas';
import Puma from './pages/Puma';
import Reebok from './pages/Reebok';
import UnderArmour from './pages/UnderArmour';
import Asics from './pages/Asics';
import Converse from './pages/Converse';
import Hoka from './pages/Hoka';
import ProducDetail from './pages/ProductDetail';
//////////// fin de importaciones de las pantallas de marca
//////importacion de las pantallas de categorias 
import Running from './pages/Runnig';
import Entrenamiento from './pages/Entrenamiento';


////Terminos y condiciones + comentarios "reseñas"
import Terminos from './components/Terminos';


import './App.css';

function App() {
  const location = useLocation(); // Para detectar en qué página estamos

  const isMarcaPage = location.pathname.startsWith("/marcas/nike") ||
                      location.pathname.startsWith("/marcas/adidas") ||
                      location.pathname.startsWith("/marcas/puma") ||
                      location.pathname.startsWith("/marcas/reebok") ||
                      location.pathname.startsWith("/marcas/underarmour") ||
                      location.pathname.startsWith("/marcas/asics") ||
                      location.pathname.startsWith("/marcas/converse") ||
                      location.pathname.startsWith("/marcas/hoka");

  const isLoginPage = location.pathname === "/login" ||
                      location.pathname === "/recuperar" ||
                      location.pathname === "/crear-cuenta";

  const hideFooter = isMarcaPage || isLoginPage;

  return (
    <div className="app-container">
      <Nav />
      {/* Aquí ponemos fondo solo si no es marca */}
      <div className={isMarcaPage ? "" : "background"} style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marcas" element={<Marcas />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recuperar" element={<Recuperar />} />
          <Route path="/crear-cuenta" element={<CrearCuenta />} />
          <Route path="/aboutus" element={<About />} />

          {/* Rutas marcas */}
          <Route path="/marcas/nike" element={<Nike />} />
          <Route path="/marcas/adidas" element={<Adidas />} />
          <Route path="/marcas/puma" element={<Puma />} />
          <Route path="/marcas/reebok" element={<Reebok />} />
          <Route path="/marcas/underarmour" element={<UnderArmour />} />
          <Route path="/marcas/asics" element={<Asics />} />
          <Route path="/marcas/converse" element={<Converse />} />
          <Route path="/marcas/hoka" element={<Hoka />} />
          <Route path="/producto/:id" element={<ProducDetail />} />


          {/* Rutas marcas */}
          <Route path="/categorias/runinnyatletismo" element={<Running />} />
          <Route path="/categorias/entrenamientoygym" element={<Entrenamiento />} />

          {/* Apartado para lo de terminos y condiciones*/}
          <Route path="/terminos" element={<Terminos />} />





        </Routes>
      </div>

      {/* Footer visible solo si no estamos en login o en marca */}
      {!hideFooter && <Footer />}
    </div>
  );
}

import { BrowserRouter } from 'react-router-dom';

export default function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
