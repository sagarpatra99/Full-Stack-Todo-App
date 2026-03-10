const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const blacklistModel = require("../model/blacklist.model");

const controllerRegister = async (req, res) => {
  try {
    const { fullname, email, password, profileImg } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser)
      return res.status(409).json({
        message: "Email already exists!",
      });

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      fullname,
      email,
      password: hash,
      profileImg,
    });

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

    res.status(201).json({
      message: "User Registered Successfully",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        profileImg: user.profileImg,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
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
  const token = req.cookies.token;

  res.clearCookie("token");

  await blacklistModel.create({ token });

  res.status(201).json({
    message: "User Logout Successfully",
  });
};

module.exports = { controllerRegister, controllerLogin, controllerGetMe, controllerLogoutUser };
