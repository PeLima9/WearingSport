// routes/ordersRoutes.js
import express from "express";
import ordersController from "../controllers/ordersController.js";

const router = express.Router();

router
  .route("/")
  .get(ordersController.getOrders)
  .post(ordersController.createOrder)
  .put(ordersController.updateOrder)
  .delete(ordersController.deleteOrder);

export default router;
