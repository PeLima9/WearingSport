const customersController = {};
import customersModel from "../models/Customers.js";

//Select / Get
customersController.getCustomers = async (req, res) => {
    const customers = await customersModel.find();
    res.json(customers);
};

//Insert / Post
customersController.insertCustomer = async (req, res) => {
    const {name, email, password, phoneNumber} = req.body;
    const newCustomer = customersModel({name, email, password, phoneNumber});
    await newCustomer.save();
    res.json({message: "Customer Saved"});
};

//Delete
customersController.deleteCustomer = async (req, res) => {
    await customersModel.findByIdAndDelete(req.params.id);
    res.json({message: "Customer Deleted"});
};

//Update / Put
customersController.updateCustomer = async (req, res) => {
    const {name, email, password, phoneNumber} = req.body;
    await brandsModel.findByIdAndUpdate(req.params.id, {name, email, password, phoneNumber}, {new: true});
    res.json({message: "Customer Updated"});
};

//Export
export default customersController;