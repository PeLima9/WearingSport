// middleware/adminMiddleware.js
import jwt from "jsonwebtoken";
import { config } from "../config.js";

const adminMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.authToken;
    if (!token) return res.status(401).json({ message: "No autenticado" });

    const decoded = jwt.verify(token, config.JWT.secret);

    if (decoded.userType !== "admin") {
      return res.status(403).json({ message: "No autorizado" });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};

export default adminMiddleware;
