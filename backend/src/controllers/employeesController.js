const employeesController = {};
import employeesModel from "../models/Employees.js";
import bcryptjs from "bcryptjs";

//Select / Get
employeesController.getEmployees = async (req, res) => {
    const employees = await employeesModel.find();
    res.json(employees)
};

//Insert / Post
employeesController.insertEmployee = async (req, res) => {
    const {name, email, password, rol} = req.body;
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newEmployee = employeesModel({name, email, password: hashedPassword, rol});
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
    const {name, email, password, rol} = req.body;
    await employeesModel.findByIdAndUpdate(req.params.id, {name, email, password, rol}, {new: true});
    res.json({message: "Employee Updated"});
};

employeesController.getEmployeeById = async (req, res) => {
    try {
        const employee = await employeesModel.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el empleado", error });
    }
};

//Export
export default employeesController;