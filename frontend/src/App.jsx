// App.jsx
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

// Importa el hook useUser desde tu contexto de usuario
import { useUser } from './context/UserContext';

import { useCart } from './context/CartContext'; // <-- IMPORTANTE
import { useEffect } from 'react'; // <-- NECESARIO PARA useEffect


// Contextos (ya están envueltos en main.jsx)
import { CartProvider } from './context/CartContext'; // Si lo usas aquí
import { UserProvider } from './context/UserContext'; // Si lo usas aquí

// Componentes comunes
import Nav from './components/Nav';
import Footer from './components/Footer';

// Páginas públicas
import Home from './pages/Home';
import Login from './pages/Login';
import Recuperar from './components/Recuperar';
import VerificarCodigoRecuperacion from './components/VerificarCodigoRecuperacion';
import NuevaContrasena from './components/NuevaContrasena';
import CrearCuenta from './components/CrearCuenta';
import VerificarCodigo from './components/VerificarCodigo';
import Perfil from './pages/Perfil';
import About from './pages/About';


// Marcas y categorías
import Marcas from './pages/Marcas';
import Nike from './pages/Nike';
import Adidas from './pages/Adidas';
import Puma from './pages/Puma';
import Reebok from './pages/Reebok';
import UnderArmour from './pages/UnderArmour';
import Asics from './pages/Asics';
import Converse from './pages/Converse';
import Hoka from './pages/Hoka';

import Running from './pages/Runnig';
import Entrenamiento from './pages/Entrenamiento';
import Deportes from './pages/Deportes';
import Casuales from './pages/Casuales';

// Otros componentes y páginas
import ProductDetail from './pages/ProductDetail';
import Ofertas from './pages/Ofertas';
import Ofertas1 from './pages/Ofertas1';
import Terminos from './components/Terminos';
import Comentarios from './pages/Comentarios';
import NuevoComentario from './pages/NuevoComentario';
import Carrito from './pages/Carrito';
import FormularioCompra from './pages/FormularioCompra';
import HistorialPedidos from './components/HistorialPedidos';


// Admin
import AdminLayout from './layouts/AdminLayouts';
import InicioAdmin from './pages/Admin/InicioAdmin';
import AgregarUsuario from './pages/Admin/AgregarUsuario';
import AgregarProducto from './pages/Admin/AgregarProducto';
import ProductosAdmin from './pages/Admin/ProductosAdmin';
import ListaUsuario from './pages/Admin/ListaUsuarios';
import CrearMarca from './pages/Admin/CrearMarca';
import CrearCategoria from './pages/Admin/CrearCategoria';
import ListaMarcas from './pages/Admin/ListaMarcas';
import ListaCategorias from './pages/Admin/ListaCategorias';
import BrandProducts from './components/BrandProducts';
import CategoryProducts from './components/CategorieProducts';
import AdminCrearOferta from './pages/Admin/AdminCrearOferta';
import AdminPedidos from './components/Admin/AdminPedidos';
import AdminReviews from './pages/Admin/AdminReviews';

import ListaCustomers from './components/Admin/ListaCustomers';

// Componente para protección de rutas según rol
import RutaProtegida from './components/RutaProtegida';

import './App.css';

function App() {
  const location = useLocation();

  // Obtén el usuario desde el contexto para validar acceso
  const { user } = useUser();
    const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [user]);

  // Detectamos en qué rutas estamos para mostrar u ocultar Nav, Footer, fondo, etc.
  const isMarcaPage = location.pathname.startsWith("/marcas/");
  const isLoginPage = ["/login", "/recuperar", "/crear-cuenta", "/nuevacontrasena", "/carrito"].includes(location.pathname);
  const isCarritoPage = location.pathname === "/carrito";
  const isComentariosPage = location.pathname === "/comentarios";
  const isNuevoComentario = location.pathname === "/nuevocomentario";
  const isOfertas1 = location.pathname === "/ofertas1";
  const isAdminRoute = location.pathname.startsWith("/admin");

  const hideFooter = isMarcaPage || isLoginPage;
  const hideBackground = isMarcaPage || isLoginPage || isCarritoPage || isComentariosPage || isNuevoComentario || isOfertas1;

  return (
    <div className="app-container">
      {/* Nav solo se muestra si NO es ruta admin */}
      {!isAdminRoute && <Nav />}

      {/* Contenido principal con fondo condicional */}
      <div className={hideBackground ? "" : "background"} style={{ flex: 1 }}>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/marcas" element={<Marcas />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recuperar" element={<Recuperar />} />
          <Route path="/verificar-codigo-recuperacion" element={<VerificarCodigoRecuperacion />} />
          <Route path="/nueva-contrasena" element={<NuevaContrasena />} />
          <Route path="/crear-cuenta" element={<CrearCuenta />} />
          <Route path="/verificar-codigo" element={<VerificarCodigo />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/carrito" element={
            user ? (
              <Carrito />
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          <Route path="/aboutus" element={<About />} />
          <Route path="/marcas/nike" element={<Nike />} />
          <Route path="/marcas/adidas" element={<Adidas />} />
          <Route path="/marcas/puma" element={<Puma />} />
          <Route path="/marcas/reebok" element={<Reebok />} />
          <Route path="/marcas/underarmour" element={<UnderArmour />} />
          <Route path="/marcas/asics" element={<Asics />} />
          <Route path="/marcas/converse" element={<Converse />} />
          <Route path="/marcas/hoka" element={<Hoka />} />

          <Route path="/producto/:id" element={<ProductDetail />} />

          <Route path="/categorias/runinnyatletismo" element={<Running />} />
          <Route path="/categorias/entrenamientoygym" element={<Entrenamiento />} />
          <Route path="/categorias/deportesdecancha" element={<Deportes />} />
          <Route path="/categorias/casuales" element={<Casuales />} />

          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/ofertas1" element={<Ofertas1 />} />
          <Route path="/terminos" element={<Terminos />} />
          <Route path="/comentarios" element={<Comentarios />} />
          <Route path="/nuevocomentario" element={<NuevoComentario />} />
          <Route path="/historialdepedidos" element={<HistorialPedidos />} />
          <Route
            path="/comprar"
            element={
              user ? (
                <FormularioCompra />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Rutas protegidas para admin con componente RutaProtegida */}
          <Route path="/admin" element={
            <RutaProtegida rolPermitido="admin">
              <AdminLayout />
            </RutaProtegida>
          }>
            <Route index element={<InicioAdmin />} />
            <Route path="agregarusuario" element={<AgregarUsuario />} />
            <Route path="agregarproducto" element={<AgregarProducto />} />
            <Route path="productos" element={<ProductosAdmin />} />
            <Route path="listausuarios" element={<ListaUsuario />} />
            <Route path="/admin/customers" element={<ListaCustomers />} />
            <Route path="crearmarca" element={<CrearMarca />} />
            <Route path="crearcategoria" element={<CrearCategoria />} />
            <Route path="listamarcas" element={<ListaMarcas />} />
            <Route path="listacategorias" element={<ListaCategorias />} />
            <Route path="brandproducts" element={<BrandProducts />} />
            <Route path="categorieproducts" element={<CategoryProducts />} />
            <Route path="crearoferta" element={<AdminCrearOferta />} />
            <Route path="verpedidos" element={<AdminPedidos />} />
            <Route path="/admin/verreview" element={<AdminReviews />} />
          </Route>

          {/* Aquí puedes agregar más rutas protegidas para otros roles si quieres */}

        </Routes>
      </div>

      {/* Footer solo se muestra si no es ruta admin y si no debe ocultarse */}
      {!isAdminRoute && !hideFooter && <Footer />}
    </div>
  );
}

export default App;
