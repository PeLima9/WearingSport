// Importar librerías principales
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

// Crear instancia de la app
const app = express();

// Middleware para permitir peticiones desde el frontend (ej. React en localhost:4000)

const allowedOrigins = ["http://localhost:5173"]; // Aquí pones el URL de tu frontend real

app.use(cors({
  origin: function(origin, callback){
    // Permitir peticiones sin origen (como Postman) o que estén en la lista
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = `La política CORS no permite acceso desde el origen: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));


// Sirve archivos estáticos (por ejemplo, imágenes subidas temporalmente por Multer)
app.use('/uploads', express.static('uploads'));


// Middleware para parsear JSON
app.use(express.json());

// Middleware para manejar cookies
app.use(cookieParser());

// Definición de rutas
app.use("/api/Brands", brandsRoutes);
app.use("/api/Customers", customersRoutes);
app.use("/api/Employees", employeesRoutes);
app.use("/api/Products", productsRoutes);
app.use("/api/Reviews", reviewsRoutes);
app.use("/api/Sales", salesRoutes);
app.use("/api/RegisterEmployees", registerEmpRoutes);
app.use("/api/RegisterClients", registerCliRoutes);
app.use("/api/Login", loginRoutes);

// Exportar la app
export default app;
