import express from 'express';
import productsController from '../controllers/productsController.js';
import upload from '../middleware/multer.js';  // Importamos el middleware de Multer

// Router 
const router = express.Router();

// Select - Get all products, Insert - Add new product
router.route('/')
  .get(productsController.getProducts)  // Obtener todos los productos
  .post(upload.single('image'), productsController.insertProducts);  // Agregar producto con imagen

// Delete - Delete product, Update - Update product
router.route('/:id')
  .put(productsController.updateProducts)  // Actualizar producto
  .delete(productsController.deleteProducts);  // Eliminar producto

// Export the router
export default router;
