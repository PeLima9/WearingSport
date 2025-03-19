const salesController = {};
import salesModel from "../models/Sales.js";

//Select / Get
salesController.getSales = async (req, res) => {
    const sales = await salesModel.find();
    res.json(sales);
};

//Insert / Post
salesController.insertSales = async (req, res) => {
    const {idOrder, paymentMethod, Address} = req.body;
    const newSales = new salesModel({idOrder, paymentMethod, Address});
    await newSales.save();
    res.json({message: "Sales Added"});
};

//Delete
salesController.deleteSales = async (req, res) => {
    await salesModel.findByIdAndDelete(req.params.id);
    res.json({message: "Sales Deleted"});
};

//Update / Put
salesController.updateSales = async (req, res) => {
    const {idOrder, paymentMethod, Address} = req.body;
    await salesModel.findByIdAndUpdate(req.params.id, {idOrder, paymentMethod, Address}, {new: true});
    res.json({message: "Sales Updated"});
};

//Export
export default salesController;
