import express from "express";
import loginController from "../controllers/loginController.js";

const router = express.Router();

router.post("/", loginController.login);
router.post("/logout", loginController.logout);
router.get("/profile", loginController.getProfile);


export default router;