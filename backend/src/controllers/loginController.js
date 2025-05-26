import customersModel from "../models/Customers.js";
import employeesModel from "../models/Employees.js";

import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import {config} from "../config.js";

const loginController = {};

loginController.login = async (req, res) => {
    const {email, password} = req.body;

    try {
        let userFound; // Usuario encontrado
        let userType;  // Tipo de usuario (rol)

        // Validar admin hardcoded
        if (email === config.emailAdmin.email && password === config.emailAdmin.password) {
            userType = "admin";
            userFound = { _id: "Admin" };
        } else {
            // Buscar en empleados
            userFound = await employeesModel.findOne({ email });
            
            if (userFound) {
                // Usar el rol real que está guardado en DB (por ejemplo "admin" o "empleado")
                userType = userFound.rol.toLowerCase(); 
            } else {
                // Buscar en clientes
                userFound = await customersModel.findOne({ email });
                userType = "client";
            }
        }

        // Usuario no encontrado
        if (!userFound) {
            return res.json({ success: false, message: "User not found" });
        }

        // Validar contraseña para todos menos admin hardcoded
        if (userType !== "admin") {
            const matches = await bcryptjs.compare(password, userFound.password);
            if (!matches) {
                return res.json({ success: false, message: "Invalid Password" });
            }
        }

        // Generar token
        jwt.sign(
            { id: userFound._id, userType }, // Guardar el id y el rol real
            config.JWT.secret,
            { expiresIn: config.JWT.expiresIn },
            (error, token) => {
                if (error) console.log(error);
                res.cookie("authToken", token);
                res.json({
                    message: "Login Successful",
                    success: true,
                    user: {
                        rol: userType // ya está en minúsculas: "admin", "empleado" o "client"
                    }
                });
            }
        );
    } catch (error) {
        console.log(error);
        res.json({ message: "Login Failed" });
    }
};

export default loginController;
