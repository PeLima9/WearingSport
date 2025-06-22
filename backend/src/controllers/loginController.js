import customersModel from "../models/Customers.js";
import employeesModel from "../models/Employees.js";

import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import { config } from "../config.js";

const loginController = {};

// LOGIN
loginController.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let userFound;
    let userType;

    // Validar admin hardcoded
    if (email === config.emailAdmin.email && password === config.emailAdmin.password) {
      userType = "admin";
      userFound = { _id: "Admin" };
    } else {
      // Buscar en empleados
      userFound = await employeesModel.findOne({ email });

      if (userFound) {
        userType = userFound.rol.toLowerCase();
      } else {
        // Buscar en clientes
        userFound = await customersModel.findOne({ email });
        userType = "client";
      }
    }

    if (!userFound) {
      return res.json({ success: false, message: "User not found" });
    }

    // Validar contraseña (menos para admin hardcoded)
    if (userType !== "admin") {
      const matches = await bcryptjs.compare(password, userFound.password);
      if (!matches) {
        return res.json({ success: false, message: "Invalid Password" });
      }
    }

    // Generar token
    jwt.sign(
      { id: userFound._id, userType },
      config.JWT.secret,
      { expiresIn: config.JWT.expiresIn },
      (error, token) => {
        if (error) {
          console.log(error);
          return res.json({ success: false, message: "Token generation error" });
        }

        // En la parte donde pones la cookie:
res.cookie("authToken", token, {
  httpOnly: true,
  sameSite: "Lax", // o "None" si usas HTTPS y dominios distintos
  secure: false,    // true en prod con HTTPS
  maxAge: 2 * 60 * 60 * 1000
});


        res.json({
          message: "Login Successful",
          success: true,
          user: {
            rol: userType
          }
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.json({ message: "Login Failed", success: false });
  }
};

// LOGOUT
loginController.logout = (req, res) => {
  res.clearCookie("authToken");
  res.json({ success: true, message: "Sesión cerrada correctamente" });
};

// PROFILE
loginController.getProfile = async (req, res) => {
  try {
    const token = req.cookies.authToken;

    if (!token) {
      return res.status(401).json({ success: false, message: "No autenticado" });
    }

    const decoded = jwt.verify(token, config.JWT.secret);

    let userData;

    if (decoded.userType === "client") {
      userData = await customersModel.findById(decoded.id).select("-password");
    } else if (decoded.userType === "empleado" || decoded.userType === "admin") {
      if (decoded.id === "Admin") {
        userData = { name: "Admin", email: config.emailAdmin.email };
      } else {
        userData = await employeesModel.findById(decoded.id).select("-password");
      }
    }

    if (!userData) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }

    res.json({ success: true, user: userData, rol: decoded.userType });
  } catch (error) {
    res.status(401).json({ success: false, message: "Token inválido o expirado" });
  }
};

export default loginController;
