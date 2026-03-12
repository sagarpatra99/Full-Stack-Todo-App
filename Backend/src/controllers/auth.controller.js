const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const blacklistModel = require("../model/blacklist.model");
const { sendEmail } = require("../services/mail.service");

const controllerRegister = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser)
      return res.status(409).json({
        message: "Email already exists!",
        success: false,
        error: "User already exists",
      });

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      fullname,
      email,
      password: hash,
    });

    const emailVerificationToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    try {
      await sendEmail({
        to: email,
        subject: "Welcome to DO IT",
        html: `
      <div style="font-family: Arial, sans-serif; padding:20px; background:#f4f4f4;">
        <div style="max-width:600px; margin:auto; background:white; padding:30px; border-radius:8px;">
          
          <h2 style="color:#0EA5E9;">Welcome to DO IT 🚀</h2>

          <p>Hi <b>${fullname}</b>,</p>

          <p>
            Thank you for registering at <b>DO IT</b>.  
            We're excited to have you on board!
          </p>

          <p>
            Start organizing your tasks and boost your productivity today.
          </p>

          <p>
            Please verify your email by clicking the link below :-
          </p>

          <a href="https://full-stack-todo-app-3v4h.onrender.com/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>

          <hr style="margin:20px 0"/>

          <p style="font-size:14px; color:gray;">
            Best regards,<br/>
            <b>DO IT Team</b>
          </p>

        </div>
      </div>
    `,
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError.message);
    }

    // const token = jwt.sign(
    //   { id: user._id, email: user.email },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1h" },
    // );

    res.cookie("token", emailVerificationToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.status(201).json({
      message: "User Registered Successfully",
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const controllerVerifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne({ email: decoded.email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid token",
        success: false,
        err: "User not found",
      });
    }

    user.verified = true;

    await user.save();

    res.send(`
      <html>
        <head>
          <title>Email Verified</title>
        </head>
        <body style="font-family: Arial; background:#f4f4f4; display:flex; justify-content:center; align-items:center; height:100vh;">
          <div style="background:white; padding:40px; border-radius:10px; text-align:center; max-width:500px;">
            
            <h2 style="color:#22c55e;">Email Verified Successfully 🎉</h2>

            <p>Hello <b>${user.fullname}</b>,</p>

            <p>Your email has been successfully verified.</p>

            <p>You can now start using <b>DO IT</b>.</p>

            <a href="https://todo-app-sagar.vercel.app/login"
              style="display:inline-block;margin-top:20px;padding:10px 20px;background:#0EA5E9;color:white;text-decoration:none;border-radius:6px;">
              Go to App
            </a>

          </div>
        </body>
      </html>
    `);
  } catch (error) {
    res.status(400).json({
      message: "Invalid or Expired Token",
      error: error.message,
    });
  }
};

const controllerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user)
      return res.status(401).json({
        message: "Invalid email or password!",
      });

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
      return res.status(401).json({
        message: "Invalid email or password!",
      });

    if (!user.verified) {
      return res.status(400).json({
        message: "Please verify your email before loggin in",
        success: false,
        err: "Email not verified",
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.status(200).json({
      message: "User Login Successfully",
      success: true,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const controllerGetMe = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userModel.findById(userId);

    if (!user)
      return res.status(404).json({
        message: "User not found",
      });

    res.status(200).json({
      message: "User details fetched Successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const controllerLogoutUser = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (token) {
      await blacklistModel.create({ token });
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({
      message: "User logout successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  controllerRegister,
  controllerVerifyEmail,
  controllerLogin,
  controllerGetMe,
  controllerLogoutUser,
};
