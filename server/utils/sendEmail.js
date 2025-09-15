const nodemailer = require('nodemailer');
const asyncHandler = require('./asyncHandler.js');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
    }
});

const sendEmail = asyncHandler(async (email, otp) => {
    const emailHtml = `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2>Welcome to ManKoSathi!</h2>
            <p>Thank you for registering. Please use the following One-Time Password (OTP) to verify your email address.</p>
            <p style="font-size: 24px; font-weight: bold; letter-spacing: 2px;">${otp}</p>
            <p>This code will expire in 10 minutes.</p>
            <p>If you did not request this, please ignore this email.</p>
        </div>
    `;

    const mailOptions = {
        from: `"ManKoSathi" <${process.env.EMAIL_USER}>`, 
        to: email,
        subject: "Your OTP Verification Code for ManKoSathi",
        html: emailHtml
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully! Message ID:", info.messageId);
        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Email could not be sent.");
    }
});

module.exports = sendEmail;