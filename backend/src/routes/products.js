import express from "express";
import productsController from "../controllers/productsController.js";

//Router 
const router = express.Router();

//Select - insert
router.route("/")
  .get(productsController.getProducts)
  .post(productsController.insertProducts)

  //Delete - Update
  router.route("/:id")
   .put(productsController.updateProducts)
   .delete(productsController.deleteProducts)

   //Export
   export default router;