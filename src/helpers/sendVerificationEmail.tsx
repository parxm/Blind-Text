import { ApiResponse } from "@/types/ApiResponse";
require("dotenv").config();

const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for other ports
  auth: {
    user: process.env.USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  const mailOptions = {
    from: {
      name: "Blind-Text",
      address: process.env.USER,
    },
    to: email,
    subject: "Blind-Text Verification Code",
    html: `<p>Your verification code is: ${verifyCode}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
    return { success: true, message: "Verification email sent successfully" };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return { success: false, message: "Failed to send verification email" };
  }
}
