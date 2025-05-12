import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";

import clientsModel from "../models/Customers.js";
import {config} from "../config.js";

const registerCliController = {};

registerCliController.register = async (req, res) => {
    const {name, lastName, birthday, email, password, telephone, dui, isVerified} = req.body;

    try {
        //Verify existing Client
        const clientExists = await clientsModel.findOne({email});
        if(clientExists){
            return res.json({message: "Client Already Exists"});
        }

        //Encrypt password
        const passwordHash = await bcryptjs.hash(password, 10)

        //Save
        const newClient = new clientsModel({
            name,
            email,
            password,
            phoneNumber
        });
            
        await newClient.save();

        //Generate verification code
        const verificationCode = crypto.randomBytes(3).toString("hex");

        //Token Generator
        const tokenCode = jwt.sign(

            //What to save
            {email, verificationCode},

            //Secret code
            config.JWT.secret,

            //Expires in
            {expiresIn: "2h"}
        );

        res.cookie("VerificationToken", tokenCode, {maxAge: 2*60*60*1000});

        //Sent email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.email_user,
                pass: config.email.email_pass
            }
        });

        //Receipient
        const mailOptions = {
            from: config.email.email_user,
            to: email,
            subject: "Email Verification | Account Activation",
            text: `Verificación de Correo electrónico. 
            Para activar su cuenta ingrese el siguiente código:
            
            ${verificationCode}

            Código expira en 2 horas, no comparta este código con nadie
            
            Hola jaja
            `
        }

        //Sending
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) return res.json({message: "Error"})
            console.log("Email Sent")
        });

        res.json({message: "Register Successful. Please verify your email with the code sent via Email"})

    } 
    catch (error) {
        res.json({message: "Error: " + error})
    }
};

//Verify code
registerCliController.verifyCodeEmail = async (req, res) => {
    const {verificationCode} = req.body;
    const token = req.cookies.VerificationToken;

    try {
        //Verify and decode
        const decoded = jwt.verify(token, config.JWT.secret)
        const {email, verificationCode: storedCode} = decoded;

        //Compare code
        if (verificationCode !== storedCode){
            return res.json({message: "Invalid Code"})
        }

        //isVerified Value
        const client = await clientsModel.findOne({email});
        client.isVerified = true;
        await client.save();
        res.json({message: "Email Verified Successfully"});

        //Clear Cookie
        res.clearCookie("VerificationToken");

    }
    catch (error) {
        res.json({message: "Error"})
    };
};

export default registerCliController;