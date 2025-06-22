import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { promisify } from "util"; // Para convertir sendMail a promesa

import clientsModel from "../models/Customers.js";
import { config } from "../config.js";

const registerCliController = {};

// REGISTRO
registerCliController.register = async (req, res) => {
  const { name, email, password, phoneNumber, isVerified } = req.body;

  try {
    console.log("Paso 1: Verificando si el cliente ya existe...");
    const clientExists = await clientsModel.findOne({ email });
    if (clientExists) {
      console.log("El cliente ya está registrado con ese correo.");
      return res.json({ message: "Client Already Exists" });
    }

    console.log("Paso 2: Encriptando contraseña...");
    const passwordHash = await bcryptjs.hash(password, 10);

    console.log("Paso 3: Creando nuevo cliente...");
    const newClient = new clientsModel({
      name,
      email,
      password: passwordHash,
      phoneNumber,
      isVerified
    });

    await newClient.save();
    console.log("Cliente guardado en la base de datos.");

    const verificationCode = crypto.randomBytes(3).toString("hex");
    console.log("Paso 4: Código de verificación generado:", verificationCode);

    const tokenCode = jwt.sign(
      { email, verificationCode },
      config.JWT.secret,
      { expiresIn: "2h" }
    );
    console.log("Paso 5: Token generado.");

    res.cookie("VerificationToken", tokenCode, { maxAge: 2 * 60 * 60 * 1000 });
    console.log("Paso 6: Cookie del token de verificación guardada.");

    console.log("Paso 7: Configurando transporte de correo...");
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

    const mailOptions = {
      from: config.email.email_user,
      to: email,
      subject: "Email Verification | Account Activation",
      text: `Código de verificación: ${verificationCode}. Expira en 2 horas.`,
      html: `
          <h1 style="color: #1d0066;">Verifica tu cuenta</h1>
          <p>Utiliza el siguiente código para verificar tu cuenta:</p>
          <h2 style="color: #333;">${verificationCode}</h2>
          <p>Este código es válido por 2 horas.</p>
      `,
    };

    console.log("Paso 8: Enviando correo...");
    const sendMail = promisify(transporter.sendMail).bind(transporter);
    await sendMail(mailOptions);
    console.log("Correo enviado exitosamente a:", email);

    return res.json({
      message: "Register Successful. Please verify your email with the code sent via Email"
    });

  } catch (error) {
    console.error("❌ Error en registro:", error);
    return res.status(500).json({ message: "Error en el servidor: " + error.message });
  }
};

// VERIFICACIÓN DE CÓDIGO
registerCliController.verifyCodeEmail = async (req, res) => {
  const { verificationCode } = req.body;
  const token = req.cookies.VerificationToken;

  try {
    const decoded = jwt.verify(token, config.JWT.secret);
    const { email, verificationCode: storedCode } = decoded;

    if (verificationCode !== storedCode) {
      return res.json({ message: "Invalid Code" });
    }

    const client = await clientsModel.findOne({ email });
    client.isVerified = true;
    await client.save();

    res.clearCookie("VerificationToken");
    return res.json({ message: "Email Verified Successfully" });

  } catch (error) {
    console.error("❌ Error verifying code:", error);
    return res.status(500).json({ message: "Verification failed" });
  }
};

export default registerCliController;
