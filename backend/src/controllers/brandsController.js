const brandsController = {};
import brandsModel from "../models/Brands.js";

//Select / Get
brandsController.getBrands = async (req, res) => {
    const brands = await brandsModel.find();
    res.json(brands);
};

//Insert / Post
brandsController.insertBrand = async (req, res) => {
    const {brandName, description, country} = req.body;
    const newBrand = new brandsModel({brandName, description, country});
    await newBrand.save();
    res.json({message: "Brand Added"});
};

//Delete
brandsController.deleteBrand = async (req, res) => {
    await brandsModel.findByIdAndDelete(req.params.id);
    res.json({message: "Brand Deleted"});
};

//Update / Put
brandsController.updateBrand = async (req, res) => {
    const {brandName, description, country} = req.body;
    await brandsModel.findByIdAndUpdate(req.params.id, {brandName, description, country}, {new: true});
    res.json({message: "Brand Updated"});
};

//Export
export default brandsController;