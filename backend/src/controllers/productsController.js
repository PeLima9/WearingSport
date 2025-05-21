const productsController = {};
import productsModel from "../models/Products.js";

//Select / Get
productsController.getProducts = async (req, res) => {
    const products = await productsModel.find();
    res.json(products);
};

//Insert / Post
productsController.insertProducts = async (req, res) => {
    const {productName, description, price, stock, categories, idBrands} = req.body;
    const newProducts = new productsModel({productName, description, price, stock, categories, idBrands});
    await newProducts.save();
    res.json({message: "Products Added"});
};

//Delete
productsController.deleteProducts = async (req, res) => {
    await productsModel.findByIdAndDelete(req.params.id);
    res.json({message: "Prodcuts Deleted"});
};

//Update / Put
productsController.updateProducts = async (req, res) => {
    const {productName, description, price, stock, categories, idBrands} = req.body;
    await productsModel.findByIdAndUpdate(req.params.id, {productName, description, price, stock, categories, idBrands}, {new: true});
    res.json({message: "Products Updated"});
};

export default productsController;