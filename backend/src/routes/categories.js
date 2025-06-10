import express from "express";
import categoriesController from "../controllers/categoriesController.js";

const router = express.Router();

// GET - Obtener todas las categorías
router.get("/", categoriesController.getCategories);

// POST - Crear nueva categoría
router.post("/", categoriesController.insertCategory);

// PUT - Actualizar categoría
router.put("/:id", categoriesController.updateCategory);

// DELETE - Eliminar categoría
router.delete("/:id", categoriesController.deleteCategory);

export default router;