import express from "express";
import reviewsController from "../controllers/reviewsController.js";

//Router
const router = express.Router();

//Select - Insert
router.route("/")
    .get(reviewsController.getReviews)
    .post(reviewsController.insertReviews);

//Delete - Update
router.route("/:id")
    .put(reviewsController.updateReviews)
    .delete(reviewsController.deleteReviews);

//Export
export default router;