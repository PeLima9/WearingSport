import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";

import clientsModel from "../models/Customers.js";
import {config} from "../config.js";

const registerCliController = {};

registerCliController.register = async (req, res) => {
    const {name, email, password, phoneNumber, isVerified} = req.body;

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
            password: passwordHash,
            phoneNumber,
            isVerified
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
    text: `Verificación de Correo electrónico. Para activar su cuenta ingrese el siguiente código: ${verificationCode}. Código expira en 2 horas, no comparta este código con nadie`,
    html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Account Verification</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f6f6f6; font-family: Arial, Helvetica, sans-serif;">
            <!-- Outer Container -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding: 20px 0;">
                <tr>
                    <td align="center">
                        <!--[if mso]>
                        <table border="0" cellpadding="0" cellspacing="0" width="600">
                        <tr><td>
                        <![endif]-->
                        
                        <!-- Main Email Container -->
                        <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: rgb(29, 0, 102); border: 1px solid #dddddd; border-radius: 10px;">
                            <!-- Header -->
                            <tr>
                                <td align="center" style="padding: 20px 20px 0 20px;">
                                    <h1 style="color: #f4f4f4; font-size: 24px; margin-top: 0; margin-bottom: 20px; font-family: Arial, sans-serif;">Password Recovery</h1>
                                </td>
                            </tr>
                            
                            <!-- Main Content -->
                            <tr>
                                <td align="center" style="padding: 0 20px;">
                                    <p style="font-size: 16px; color: #dcdcdc; line-height: 1.5; font-family: Arial, sans-serif; text-align: center;">
                                        Greetings. To use your account to the full potential, you need to verify it. Use this verification code to Proceed:
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="padding: 20px;">
                                    <table border="0" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td align="center" style="background-color: rgb(29, 0, 102); border: 1px solid rgb(255, 255, 255); border-radius: 5px; padding: 10px 20px;">
                                                <span style="font-size: 18px; font-weight: bold; color: #ffffff; font-family: Arial, sans-serif;">${verificationCode}</span>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            
                            <!-- Important Note -->
                            <tr>
                                <td align="center" style="padding: 0 20px;">
                                    <p style="font-size: 14px; color: #f2f600; line-height: 1.5; font-family: Arial, sans-serif; text-align: center;">
                                        This code is valid for the next <strong style="font-weight: bold;">2 Hours</strong>. If you <strong style="font-weight: bold;">did not</strong> request this email, please ignore it.
                                    </p>
                                </td>
                            </tr>
                            
                            <!-- Divider -->
                            <tr>
                                <td style="padding: 20px;">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top: 1px solid #ffffff;">
                                        <tr><td></td></tr>
                                    </table>
                                </td>
                            </tr>
                            
                            <!-- Footer -->
                            <tr>
                                <td align="center" style="padding: 0 20px 20px 20px;">
                                    <p style="font-size: 12px; color: #f4f4f4; font-family: Arial, sans-serif; text-align: center; margin: 0;">
                                        If you need further assistance, please contact our support team at the
                                        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" rel="noopener" style="color: rgb(116, 192, 244); text-decoration: none;">Support Team Contact Page</a>.
                                    </p>
                                </td>
                            </tr>
                        </table>
                        
                        <!--[if mso]>
                        </td></tr>
                        </table>
                        <![endif]-->
                    </td>
                </tr>
            </table>
        </body>
        </html>
    `
};

        //Sending
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) return res.json({message: "Error sending the email"})
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
        console.log("Error: " + error);
    };
};

export default registerCliController;