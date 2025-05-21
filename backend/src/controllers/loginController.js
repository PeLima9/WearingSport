import customersModel from "../models/Customers.js";
import employeesModel from "../models/Employees.js";

import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import {config} from "../config.js";

const loginController = {};

loginController.login = async (req, res) => {
    const {email, password} = req.body;

    try{
        //Validate the account level
        let userFound; //User found
        let userType; //User type

        //Admin
        if (email === config.emailAdmin.email && password === config.emailAdmin.password){
            userType = "Admin";
            userFound = {_id: "Admin"};
        }

        else {
            //Employee
            userFound = await employeesModel.findOne({email});
            userType = "Employee";

            //Client
            if (!userFound){
                userFound = await customersModel.findOne({email});
                userType = "Client";
            }
        }

        //No user found
        if (!userFound){
            return res.json({message: "User not found"});
        }

        //If not admin
        if (userType !== "Admin"){

            //Compares hashed password
            const matches = bcryptjs.compare(password, userFound.password)

            //Invalid password
            if (!matches){
                return res.json({message: "Invalid Password"})
            }
        }

        //Generate token
        jwt.sign(
            
            //What to save
            {id: userFound._id, userType},

            //Secret code
            config.JWT.secret,

            //Expires in
            {expiresIn: config.JWT.expiresIn},

            //Arrow function
            (error, token) => {
                if (error) console.log(error);
                res.cookie("authToken", token);
                res.json({message: "Login Successful"})
            }
        )

    }
    catch(error){
        console.log(error);
        res.json({message: "Login Failed"})
    }
};

export default loginController;