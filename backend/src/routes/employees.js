import express from "express";
import employeesController from "../controllers/employeesController.js";

//Router
const router = express.Router();

//Select - Insert
router.route("/")
    .get(employeesController.getEmployees)
    .post(employeesController.insertEmployee)

//Delete - Update
router.route("/:id")

    .get(employeesController.getEmployeeById) 
    .delete(employeesController.deleteEmployee)
    .put(employeesController.updateEmployee)

//Export
export default router;