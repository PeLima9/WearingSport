//Importar librerías
import express from "express";
import brandsRoutes from "./src/routes/brands.js";
import customersRoutes from "./src/routes/customers.js";
import employeesRoutes from "./src/routes/employees.js";

//Crear constante para la libreria
const app = express();

//Usar Middleware para .json
app.use(express.json())

//Definir la ruta
app.use("/api/Brands", brandsRoutes);
app.use("/api/Customers", customersRoutes);
app.use("/api/Employees", employeesRoutes);

//Hacer la constante global
export default app;
