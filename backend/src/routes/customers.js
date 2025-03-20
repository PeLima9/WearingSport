import express from "express";
import customersController from "../controllers/customersController.js";

//Router
const router = express.Router();

//Select - Insert
router.route("/")
    .get(customersController.getCustomers)
    .post(customersController.insertCustomer)

//Delete - Update
router.route("/:id")
    .delete(customersController.deleteCustomer)
    .put(customersController.updateCustomer)

//Export
export default router;