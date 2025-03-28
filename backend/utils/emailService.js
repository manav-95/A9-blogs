import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';

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

            html: `
  <!DOCTYPE html>
<html>

<head>
    <title>OTP Verification</title>
</head>

<body style="background-color: #f3f4f6;">

    <div style=" background-color: #ffffff; padding: 20px; border-radius: 8px; 
                box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); border: 1px solid #ddd; font-family: Arial, sans-serif;">

        <!-- Logo -->
        <div style="text-align: center;">
            <img src="https://img.freepik.com/free-vector/colorful-bird-illustration-gradient_343694-1741.jpg?w=740"
                alt="Logo"
                style="width: 100px; height: 100px; border-radius: 50%; border: 3px solid #ddd; margin-bottom: 15px;">
            <h2 style="color: #333; margin-bottom: 10px;">A9 Blogs - OTP Verification</h2>
        </div>

        <!-- Message -->
        <p style="color: #555; font-size: 16px; text-align: center;">
            Hello, <br>Your One-Time Password (OTP) for verification is:
        </p>

        <!-- OTP Box -->
        <div style="display: flex; justify-content: center;">
            <p style="font-size: 24px; font-weight: bold; text-align: center; padding: 10px; background: #f4f4f4;
                  border-radius: 5px; display: block; min-width: 200px; margin: 10px auto; color: #222;">
                ${otp}
            </p>
        </div>

        <p style="font-size: 14px; color: #777; text-align: center;">
            This OTP is valid for <b>10 minutes</b>. Do not share it with anyone.
        </p>

        <!-- Footer -->
        <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="text-align: center; font-size: 12px; color: #888;">&copy; <span id="year"></span> A9 Blogs. All rights
            reserved.</p>
    </div>

    <script>
        document.getElementById("year").innerText = new Date().getFullYear();
    </script>

</body>

</html>

  `,
            //   attachments: [
            //     {
            //         filename: "logo.jpg",
            //         path: path.join(process.cwd(), "uploads", "logo.jpg"), // Absolute path to logo
            //         cid: "logo", // Content-ID (cid) to reference in HTML
            //     },
            // ],

        };

        await transporter.sendMail(mailOptions);
        console.log("OTP email sent successfully");

    } catch (error) {
        console.error("Error sending OTP Email: ", error)
        throw new Error("Failed to send OTP Email")
    }
}