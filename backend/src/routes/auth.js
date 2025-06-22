// src/routes/auth.routes.js
import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

// Rutas de recuperación de contraseña
router.post("/forgot-password", authController.sendRecoveryEmail);
router.post("/verify-recovery-code", authController.verifyRecoveryCode);
router.post("/reset-password", authController.resetPassword);

export default router;