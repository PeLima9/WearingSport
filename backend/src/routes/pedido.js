// routes/pedido.routes.js
import express from 'express';
import pedidoController from '../controllers/pedidoController.js';
import authMiddleware from '../middleware/authMiddleware.js'; // ✅ importa el middleware

const router = express.Router();

// Aplica el middleware a ambas rutas
router.post('/crear', authMiddleware, pedidoController.crearPedido);
router.get('/mios', authMiddleware, pedidoController.obtenerMisPedidos);

router.get('/admin/todos', authMiddleware, pedidoController.obtenerTodosLosPedidos);
 // GET /api/Pedidos/admin/todos
router.put("/admin/:id/estado", authMiddleware, pedidoController.cambiarEstadoPedido);
 // PUT /api/Pedidos/admin/estado/:id

 router.get('/haComprado/:userId/:productId', authMiddleware, pedidoController.haCompradoProducto);



export default router;
