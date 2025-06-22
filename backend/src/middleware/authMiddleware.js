import jwt from "jsonwebtoken";
import { config } from "../config.js";
import customersModel from "../models/Customers.js";
import employeesModel from "../models/Employees.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.authToken;

    if (!token) {
      return res.status(401).json({ success: false, message: "No autenticado" });
    }

    const decoded = jwt.verify(token, config.JWT.secret);

    let userData;
    let userType;

    if (decoded.userType === "client") {
      userData = await customersModel.findById(decoded.id).select("-password");
      userType = "client";
    } else if (decoded.userType === "empleado") {
      userData = await employeesModel.findById(decoded.id).select("-password");
      userType = "empleado";
    } else if (decoded.userType === "admin") {
      userData = { _id: "Admin", name: "Admin", email: config.emailAdmin.email, rol: "admin" };
      userType = "admin";
    } else {
      return res.status(401).json({ success: false, message: "Tipo de usuario inválido" });
    }

    if (!userData) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }

    req.user = userData;
    req.userType = userType;
    next();
  } catch (error) {
    console.error("authMiddleware error:", error);
    return res.status(401).json({ success: false, message: "Token inválido o expirado" });
  }
};

export default authMiddleware;
