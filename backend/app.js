//Importar librerías
import express from "express";
import brandsRoutes from "./src/routes/brands.js";
import customersRoutes from "./src/routes/customers.js";
import employeesRoutes from "./src/routes/employees.js";
//[Agregar import de Orders]
import productsRoutes from "./src/routes/products.js";
import reviewsRoutes from "./src/routes/reviews.js";
import salesRoutes from "./src/routes/sales.js";
import registerEmpRoutes from "./src/routes/registerEmployees.js";
import registerCliRoutes from "./src/routes/registerClients.js";
import loginRoutes from "./src/routes/login.js";
import cookieParser from "cookie-parser";

//Crear constante para la libreria
const app = express();

//Usar Middleware para .json
app.use(express.json());

//Cookies
app.use(cookieParser());

//Definir la ruta
app.use("/api/Brands", brandsRoutes);
app.use("/api/Customers", customersRoutes);
app.use("/api/Employees", employeesRoutes);
//[Agregar ruta de Orders]
app.use("/api/Products", productsRoutes);
app.use("/api/Reviews", reviewsRoutes);
app.use("/api/Sales", salesRoutes);

//Register
app.use("/api/RegisterEmployees", registerEmpRoutes);
app.use("/api/RegisterClients", registerCliRoutes);

//Login
app.use("/api/Login", loginRoutes);

//Hacer la constante global
export default app;