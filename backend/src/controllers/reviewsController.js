const reviewsController = {};
import { model } from "mongoose";
import reviewsModel from "../models/Reviews.js";

//Select / Get
reviewsController.getReviews = async (req, res) => {
    const reviews = await reviewsModel.find();
    res.json(reviews);
};

//Insert / Post
reviewsController.insertReviews = async (req, res) => {
    const {qualification, comment, idProducts, idClient} = req.body;
    const newReviews = new reviewsModel({qualification, comment, idProducts, idClient});
    await newReviews.save();
    res.json({message: "Reviews Added"});
};

//Delete
reviewsController.deleteReviews = async (req, res) => {
    await reviewsModel.findByIdAndDelete(req.params.id);
    res.json({message: "Reviews Deleted"});
};

//Update / Put
reviewsController.updateReviews = async (req, res) => {
    const {qualification, comment, idProducts, idClient} = req.body;
    await reviewsModel.findByIdAndUpdate(req.params.id, {qualification, comment, idProducts, idClient}, {new: true});
    res.json({message: "Reviews Updated"});
};

export default reviewsController;