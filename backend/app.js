// app.js

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Importar rutas personalizadas
import brandsRoutes from "./src/routes/brands.js";
import customersRoutes from "./src/routes/customers.js";
import employeesRoutes from "./src/routes/employees.js";
import productsRoutes from "./src/routes/products.js";
import reviewsRoutes from "./src/routes/reviews.js";
import salesRoutes from "./src/routes/sales.js";
import registerEmpRoutes from "./src/routes/registerEmployees.js";
import registerCliRoutes from "./src/routes/registerClients.js";
import loginRoutes from "./src/routes/login.js";
import categoriesRoutes from "./src/routes/categories.js";
import ofertasRoutes from "./src/routes/ofertas.js";
import ordersRoutes from "./src/routes/orders.js";
import pedidoRoutes from './src/routes/pedido.js';
import authRoutes from './src/routes/auth.js'

const app = express();

// Configuración de CORS
const allowedOrigins = ["http://localhost:5173"]; // Ajusta esta URL según tu frontend real

app.use(cors({
  origin: function(origin, callback) {
    // Permitir solicitudes sin origen (Postman, curl, etc)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `La política CORS no permite acceso desde el origen: ${origin}`;
      return callback(new Error(msg), false);
    }

    return callback(null, true);
  },
  credentials: true, // importante para que el navegador permita cookies
}));

// Manejar solicitudes preflight OPTIONS
app.options("*", cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Middleware para parsear JSON
app.use(express.json());

// Middleware para manejar cookies
app.use(cookieParser());

// Servir archivos estáticos
app.use('/uploads', express.static('uploads'));

// Definición de rutas
app.use("/api/Brands", brandsRoutes);
app.use("/api/Categories", categoriesRoutes);
app.use("/api/Customers", customersRoutes);
app.use("/api/Employees", employeesRoutes);
app.use("/api/Products", productsRoutes);
app.use("/api/Reviews", reviewsRoutes);
app.use("/api/Sales", salesRoutes);
app.use("/api/RegisterEmployees", registerEmpRoutes);
app.use("/api/RegisterClients", registerCliRoutes);
app.use("/api/Login", loginRoutes);
app.use("/api/Ofertas", ofertasRoutes);
app.use("/api/Orders", ordersRoutes);
app.use('/api/Pedidos', pedidoRoutes);
app.use('/api/Auth', authRoutes);


export default app;
