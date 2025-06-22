import express from "express";
import reviewsController from "../controllers/reviewsController.js";
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js'; // Middleware para verificar rol admin

const router = express.Router();

// Ruta protegida: solo admins pueden ver todas las reviews con info completa
router.get("/", authMiddleware, adminMiddleware, reviewsController.getReviews);

// Insertar review (puede ser para cualquier usuario autenticado)
router.post("/", authMiddleware, reviewsController.insertReviews);

// Obtener reviews por producto
router.get("/producto/:productId", reviewsController.getReviewsByProduct);

// Validar si usuario compró el producto (solo usuarios autenticados)
router.get("/usuario-compro/:userId/:productId", authMiddleware, reviewsController.usuarioComproProducto);

// Actualizar y eliminar review (opcional, con autenticación)
router.route("/:id")
  .put(authMiddleware, reviewsController.updateReviews)
  .delete(authMiddleware, reviewsController.deleteReviews);

export default router;
