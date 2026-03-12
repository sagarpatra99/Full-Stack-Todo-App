const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const blacklistModel = require("../model/blacklist.model");
const { sendEmail } = require("../services/mail.service");

// const controllerRegister = async (req, res) => {
//   try {
//     const { fullname, email, password } = req.body;

//     if (!fullname || !email || !password) {
//       return res.status(400).json({
//         message: "All fields are required",
//         success: false,
//       });
//     }

//     const existingUser = await userModel.findOne({ email });

//     if (existingUser)
//       return res.status(409).json({
//         message: "Email already exists!",
//         success: false,
//         error: "User already exists",
//       });

//     const hash = await bcrypt.hash(password, 10);

//     const user = await userModel.create({
//       fullname,
//       email,
//       password: hash,
//     });

//     const emailVerificationToken = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" },
//     );

//     try {
//       sendEmail({
//         to: email,
//         subject: "Welcome to DO IT",
//         html: `
//       <div style="font-family: Arial, sans-serif; padding:20px; background:#f4f4f4;">
//         <div style="max-width:600px; margin:auto; background:white; padding:30px; border-radius:8px;">

//           <h2 style="color:#0EA5E9;">Welcome to DO IT 🚀</h2>

//           <p>Hi <b>${fullname}</b>,</p>

//           <p>
//             Thank you for registering at <b>DO IT</b>.
//             We're excited to have you on board!
//           </p>

//           <p>
//             Start organizing your tasks and boost your productivity today.
//           </p>

//           <p>
//             Please verify your email by clicking the link below :-
//           </p>

//           <a href="https://full-stack-todo-app-3v4h.onrender.com/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>

//           <hr style="margin:20px 0"/>

//           <p style="font-size:14px; color:gray;">
//             Best regards,<br/>
//             <b>DO IT Team</b>
//           </p>

//         </div>
//       </div>
//     `,
//       });
//     } catch (emailError) {
//       console.error("Email sending failed:", emailError.message);
//     }

//     // const token = jwt.sign(
//     //   { id: user._id, email: user.email },
//     //   process.env.JWT_SECRET,
//     //   { expiresIn: "1h" },
//     // );

//     res.cookie("token", emailVerificationToken, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "none",
//       maxAge: 60 * 60 * 1000, // 1 hour
//     });

//     res.status(201).json({
//       message: "User Registered Successfully",
//       success: true,
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };

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

    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists!",
        success: false,
      });
    }

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

    // remove password before sending response
    const { password: _, ...safeUser } = user.toObject();

    // send email AFTER response
    await sendEmail({
      to: email,
      subject: "Welcome to DO IT",
      html: `
      <div style="font-family: Arial, sans-serif; padding:20px; background:#f4f4f4;">
        <div style="max-width:600px; margin:auto; background:white; padding:30px; border-radius:8px;">
          
          <h2 style="color:#0EA5E9;">Welcome to DO IT 🚀</h2>

          <p>Hi <b>${fullname}</b>,</p>

          <p>Thank you for registering at <b>DO IT</b>.</p>

          <p>Please verify your email by clicking the link below:</p>

          <a href="https://full-stack-todo-app-3v4h.onrender.com/api/auth/verify-email?token=${emailVerificationToken}">
          Verify Email
          </a>

          <hr style="margin:20px 0"/>

          <p style="font-size:14px; color:gray;">
            Best regards,<br/>
            <b>DO IT Team</b>
          </p>

        </div>
      </div>
      `,
    }).catch((err) => {
      console.error("Email sending failed:", err.message);
    });

    res.status(201).json({
      message: "User Registered Successfully",
      success: true,
      user: safeUser,
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
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Email Verified</title>

<style>
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family: Arial, Helvetica, sans-serif;
  }

  body{
    background: linear-gradient(135deg,#1251A6,#062949);
    min-height:100vh;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:20px;
  }

  .container{
    background:white;
    width:100%;
    max-width:420px;
    padding:35px 30px;
    border-radius:12px;
    text-align:center;
    box-shadow:0 10px 25px rgba(0,0,0,0.2);
  }

  .icon{
    font-size:48px;
    margin-bottom:15px;
  }

  h2{
    color:#22c55e;
    margin-bottom:12px;
  }

  p{
    color:#444;
    margin-bottom:10px;
    line-height:1.5;
  }

  .btn{
    display:inline-block;
    margin-top:20px;
    padding:12px 24px;
    background:#0EA5E9;
    color:white;
    text-decoration:none;
    border-radius:6px;
    font-weight:bold;
    transition:0.2s;
  }

  .btn:hover{
    background:#0284c7;
  }

  @media (max-width:480px){
    .container{
      padding:28px 20px;
    }

    h2{
      font-size:20px;
    }

    p{
      font-size:14px;
    }
  }
</style>
</head>

<body>

<div class="container">

  <div class="icon">✅</div>

  <h2>Email Verified Successfully 🎉</h2>

  <p>Hello <b>${user.fullname}</b>,</p>

  <p>Your email has been successfully verified.</p>

  <p>You can now start using <b>DO IT</b>.</p>

  <a class="btn" href="https://todo-app-sagar.vercel.app/login">
    Go to Login
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
