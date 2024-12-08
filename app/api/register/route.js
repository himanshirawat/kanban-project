import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
let otpStorage = {};

const sendVerificationEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification",
    text: `Your OTP for email verification is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP sent to:", email);
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new Error("Failed to send OTP");
  }
};

export async function POST(req) {
  const { username, email, password, otpEntered } = await req.json(); 
  if (otpEntered) {
    const storedOtp = otpStorage[email];

    if (!storedOtp) {
      return new Response(
        JSON.stringify({ error: "OTP not found for this email" }),
        { status: 400 }
      );
    }

    if (storedOtp === otpEntered) {
      const newUser = { username, email, password };  
      console.log("User created:", newUser);
      return new Response(
        JSON.stringify({ message: "User created successfully" }),
        { status: 201 }
      );
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid OTP" }),
        { status: 400 }
      );
    }
  }

  if (!username || !email || !password) {
    return new Response(
      JSON.stringify({ error: "All fields are required" }),
      { status: 400 }
    );
  }

  const otp = uuidv4().slice(0, 6);
  otpStorage[email] = otp;

  try {
    await sendVerificationEmail(email, otp);
    return new Response(
      JSON.stringify({ message: "OTP sent to email. Please enter it to complete registration." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during registration:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send OTP" }),
      { status: 500 }
    );
  }
}
