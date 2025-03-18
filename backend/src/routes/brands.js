import express from "express";
import brandsController from "../controllers/brandsController.js";

//Router
const router = express.Router();

//Select - Insert
router.route("/")
    .get(brandsController.getBrands)
    .post(brandsController.insertBrand);

//Delete - Update
router.route("/:id")
    .put(brandsController.updateBrand)
    .delete(brandsController.deleteBrand);

//Export
export default router;
