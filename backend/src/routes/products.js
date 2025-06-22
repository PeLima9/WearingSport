import express from 'express';
import productsController from '../controllers/productsController.js';
import upload from '../middleware/multer.js';

const router = express.Router();

// Obtener todos los productos sin ofertas
router.get('/', productsController.getProducts);

// Obtener productos con oferta activa
router.get('/con-oferta', productsController.getProductsConOferta);

// Crear producto con imagen
router.post('/', upload.single('image'), productsController.insertProducts);

// Actualizar producto con imagen opcional
router.put('/:id', upload.single('image'), productsController.updateProducts);

// Eliminar producto
router.delete('/:id', productsController.deleteProducts);

// Detalles del producto
router.get('/:id', productsController.getProductById);

export default router;
