import express from "express";
import registerEmpController from "../controllers/registerEmpController.js";

const router = express.Router();

router.route("/").post(registerEmpController.registerEmployee);

export default router;