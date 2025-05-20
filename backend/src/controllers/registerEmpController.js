//Imports
import Employee from "../models/Employees.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {config} from "../config.js";

const registerEmpController = {};

//Insert - Post
registerEmpController.registerEmployee = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        //Check for existing employee
        const exists = await Employee.findOne({email});
        if (exists){
            return res.json({message: "Employee already exists"});
        }   

        //Encript password
        const passwordHash = await bcrypt.hash(password, 10);

        //Save employee
        const newEmployee = new Employee({
            name,
            email,
            password: passwordHash
        });
        await newEmployee.save()

        //Token generator
        jwt.sign(
            {id: newEmployee._id},
            config.JWT.secret,
            {expiresIn: config.JWT.expiresIn},
            (error, token) => {
                if (error) console.log(error)
                res.cookie("authToken")
                res.json({message: "Employee saved"});
            }
        );
    }
    catch (error) {
        console.log(error)
        res.json({message: "Registration Failed"})
    };
};

//Export
export default registerEmpController;