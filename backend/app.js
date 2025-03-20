//Importar librerías
import express from "express";
import brandsRoutes from "./src/routes/brands.js";
import customersRoutes from "./src/routes/customers.js";
import employeesRoutes from "./src/routes/employees.js";
//[Agregar import de Orders]
import productsRoutes from "./src/routes/products.js";
import reviewsRoutes from "./src/routes/reviews.js";
import salesRoutes from "./src/routes/sales.js";

//Crear constante para la libreria
const app = express();

//Usar Middleware para .json
app.use(express.json())

//Definir la ruta
app.use("/api/Brands", brandsRoutes);
app.use("/api/Customers", customersRoutes);
app.use("/api/Employees", employeesRoutes);
//[Agregar ruta de Orders]
app.use("/api/Products", productsRoutes);
app.use("/api/Reviews", reviewsRoutes);
app.use("/api/Sales", salesRoutes);

//Hacer la constante global
export default app;
