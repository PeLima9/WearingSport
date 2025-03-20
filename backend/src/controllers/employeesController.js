const employeesController = {};
import employeesModel from "../models/Employees.js";

//Select / Get
employeesController.getEmployees = async (req, res) => {
    const employees = await employeesModel.find();
    res.json(employees)
};

//Insert / Post
employeesController.insertEmployee = async (req, res) => {
    const {name, email, password} = req.body;
    const newEmployee = employeesModel({name, email, password});
    await newEmployee.save();
    res.json({message: "Employee Added"});
};

//Delete
employeesController.deleteEmployee = async (req, res) => {
    await employeesModel.findByIdAndDelete(req.params.id);
    res.json({message: "Employee Removed"});
};

//Update / Put
employeesController.updateEmployee = async (req, res) => {
    const {name, email, password} = req.body;
    await employeesModel.findByIdAndUpdate(req.params.id, {name, email, password}, {new: true});
    res.json({message: "Employee Updated"});
};

//Export
export default employeesController;