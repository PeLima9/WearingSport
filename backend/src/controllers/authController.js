// src/controllers/authController.js
import clientsModel from "../models/Customers.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import { config } from "../config.js";

const authController = {
  // Enviar código al correo
 sendRecoveryEmail: async (req, res) => {
  const { email } = req.body;
  try {
    const emailLower = email.trim().toLowerCase();

    const client = await clientsModel.findOne({ email: new RegExp(`^${emailLower}$`, "i") });
    if (!client) return res.status(404).json({ message: "Correo no registrado" });

    const code = crypto.randomBytes(3).toString("hex");
    const token = jwt.sign({ email: emailLower, code }, config.JWT.secret, { expiresIn: "10m" });

    res.cookie("RecoveryToken", token, { httpOnly: true, maxAge: 10 * 60 * 1000 });

    const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.email.email_user,
    pass: config.email.email_pass,
  },
  tls: {
    rejectUnauthorized: false
  }
});


    await transporter.sendMail({
      from: config.email.email_user,
      to: emailLower,
      subject: "Código de recuperación",
      html: `<p>Tu código es: <strong>${code}</strong></p>`,
    });

    res.json({ message: "Código enviado al correo." });
  } catch (err) {
    console.error("Error al enviar código:", err);
    res.status(500).json({ message: "Error al enviar el código." });
  }
},


  // Verificar código
  verifyRecoveryCode: async (req, res) => {
    const { code } = req.body;
    const token = req.cookies.RecoveryToken;
    
    try {
      const decoded = jwt.verify(token, config.JWT.secret);
      if (decoded.code !== code) return res.status(400).json({ message: "Código inválido" });
      
      res.json({ message: "Código válido" });
    } catch {
      res.status(401).json({ message: "Token inválido o expirado" });
    }
  },

  // Cambiar contraseña
  resetPassword: async (req, res) => {
    const { newPassword } = req.body;
    const token = req.cookies.RecoveryToken;
    
    try {
      const decoded = jwt.verify(token, config.JWT.secret);
      const hashed = await bcrypt.hash(newPassword, 10);
      
      await clientsModel.findOneAndUpdate({ email: decoded.email }, { password: hashed });
      
      res.clearCookie("RecoveryToken");
      res.json({ message: "Contraseña actualizada" });
    } catch {
      res.status(401).json({ message: "No autorizado" });
    }
  }
};

export default authController;