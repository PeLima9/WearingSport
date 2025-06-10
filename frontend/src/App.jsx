import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // Asegúrate de importar bien
import { UserProvider } from './context/UserContext';
import { AuthProvider } from "./context/AuthContext";

import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Marcas from './pages/Marcas';
import Login from './pages/Login';
import Carrito from './pages/Carrito';
import Ofertas from './pages/Ofertas';
import Ofertas1 from './pages/Ofertas1';
import Recuperar from './components/Recuperar';
import NuevaContrasena from './components/NuevaContrasena';
import CrearCuenta from './components/CrearCuenta';
import About from './pages/About';
import Nike from './pages/Nike';
import Adidas from './pages/Adidas';
import Puma from './pages/Puma';
import Reebok from './pages/Reebok';
import UnderArmour from './pages/UnderArmour';
import Asics from './pages/Asics';
import Converse from './pages/Converse';
import Hoka from './pages/Hoka';
import ProductDetail from './pages/ProductDetail'; // Asegúrate de que esté bien escrito
import Running from './pages/Runnig';
import Entrenamiento from './pages/Entrenamiento';
import Terminos from './components/Terminos';
import Comentarios from './pages/Comentarios';
import NuevoComentario from './pages/NuevoComentario';


///////////////importaciones de Admin
import NavbarAdmin from './components/Admin/NavbarAdmin';
import InicioAdmin from './pages/Admin/InicioAdmin';
import AdminLayout from './layouts/AdminLayouts';
import AgregarUsuario from './pages/Admin/AgregarUsuario';
import AgregarProducto from './pages/Admin/AgregarProducto';
import ListaUsuario from './pages/Admin/ListaUsuarios';
import CrearMarca from './pages/Admin/CrearMarca';
import CrearCategoria from './pages/Admin/CrearCategoria';
import ListaMarcas from './pages/Admin/ListaMarcas';
import BrandProducts from './components/BrandProducts';
import CategoryProducts from './components/CategorieProducts';
import './App.css';

function App() {
  const location = useLocation();

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
                      location.pathname === "/crear-cuenta" ||
                      location.pathname === "/nuevacontrasena" ||
                      location.pathname === "/carrito";

  const isCarritoPage = location.pathname === "/carrito";
 
  const isComentariosPage = location.pathname === "/comentarios";

  const isNuevoComentario = location.pathname === "/nuevocomentario";

  const isOfertas1 = location.pathname === "/ofertas1";

  const isAdminRoute = location.pathname.startsWith("/admin");



  const hideFooter = isMarcaPage || isLoginPage ;
  const hideBackground = isMarcaPage || isLoginPage || isCarritoPage || isComentariosPage || isNuevoComentario || isOfertas1;

  return (

    <div className="app-container">
{!isAdminRoute && <Nav />}
      <CartProvider>
      <div className={hideBackground ? "" : "background"} style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marcas" element={<Marcas />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recuperar" element={<Recuperar />} />
          <Route path='/nuevacontrasena' element={<NuevaContrasena />} />
          <Route path="/crear-cuenta" element={<CrearCuenta />} />
          <Route path="/carrito" element={<Carrito />} />
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

          {/* Vista detalle de producto */}
          <Route path="/producto/:id" element={<ProductDetail />} />

          {/* Rutas categorías */}
          <Route path="/categorias/runinnyatletismo" element={<Running />} />
          <Route path="/categorias/entrenamientoygym" element={<Entrenamiento />} />

          <Route path="/ofertas" element={<Ofertas />} />
          <Route path='/ofertas1' element={<Ofertas1 />} />
          <Route path="/terminos" element={<Terminos />} />
          <Route path='comentarios' element={<Comentarios />} />
          <Route path='nuevocomentario' element={<NuevoComentario />} />

{/* 🔐 Rutas de administrador */}
         <Route path="/admin" element={<AdminLayout />}>
         <Route index element={<InicioAdmin />} />
         <Route path="agregarusuario" element={<AgregarUsuario />} />
         <Route path='agregarproducto' element={<AgregarProducto />} />
         <Route path='listausuarios' element={<ListaUsuario />} />
         <Route path='crearmarca' element={<CrearMarca />} />
         <Route path='crearcategoria' element={<CrearCategoria />} />
         <Route path='listamarcas' element={<ListaMarcas />} />
         <Route path='listacategorias' element={<ListaCategorias />} />
        <Route path='brandproducts' element={<BrandProducts />} />
        <Route path='categorieproducts' element={<CategoryProducts />} />

        </Route>





        </Routes>
      </div>
      </CartProvider>


        {!isAdminRoute && !hideFooter && <Footer />}
    </div>
  );
}

import { BrowserRouter } from 'react-router-dom';
import ListaCategorias from './pages/Admin/ListaCategorias';

export default function WrappedApp() {
  return (
   <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
