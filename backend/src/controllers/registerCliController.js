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
        // Verificar si ya existe el cliente
        const clientExists = await clientsModel.findOne({ email });
        if (clientExists) {
            return res.json({ message: "Client Already Exists" });
        }

        // Encriptar contraseña
        const passwordHash = await bcryptjs.hash(password, 10);

        // Crear y guardar nuevo cliente
        const newClient = new clientsModel({
            name,
            email,
            password: passwordHash,
            phoneNumber,
            isVerified
        });

        await newClient.save();

        // Generar código de verificación
        const verificationCode = crypto.randomBytes(3).toString("hex");

        // Crear token
        const tokenCode = jwt.sign(
            { email, verificationCode },
            config.JWT.secret,
            { expiresIn: "2h" }
        );

        // Guardar token en cookie
        res.cookie("VerificationToken", tokenCode, { maxAge: 2 * 60 * 60 * 1000 });

        // Configurar nodemailer
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.email_user,
                pass: config.email.email_pass
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
            `
        };

        // Enviar correo con await usando promisify
        const sendMail = promisify(transporter.sendMail).bind(transporter);
        await sendMail(mailOptions);

        // Respuesta final
        return res.json({
            message: "Register Successful. Please verify your email with the code sent via Email"
        });

    } catch (error) {
        console.error("Error en registro:", error);
        return res.status(500).json({ message: "Server error during registration" });
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
        console.error("Error verifying code:", error);
        return res.status(500).json({ message: "Verification failed" });
    }
};

export default registerCliController;
