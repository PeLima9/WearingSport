import express from "express";
import salesController from "../controllers/salesController.js"

//Router
const router = express.Router();

//Select - Insert
router.route("/")
    .get(salesController.getSales)
    .post(salesController.insertSales);

//Delete - Update
router.route("/")
    .put(salesController.updateSales)
    .delete(salesController.deleteSales);

//Export
export default router;