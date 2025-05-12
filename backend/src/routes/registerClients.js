import express from "express";
import registerCliController from "../controllers/registerCliController.js";

const router = express.Router();

router.route("/").post(registerCliController.register);
router.route("/verifyCodeEmail").post(registerCliController.verifyCodeEmail);

export default router;