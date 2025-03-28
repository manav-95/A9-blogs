import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendOTP = async (email, otp) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset OTP",
            text: `your OTP for reset password is ${otp}`,
        };

        await transporter.sendMail(mailOptions);
        console.log("OTP email sent successfully");

    } catch (error) {
        console.error("Error sending OTP Email: ", error)
        throw new Error("Failed to send OTP Email")
    }
}