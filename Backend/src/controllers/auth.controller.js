const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const controllerRegister = async (req, res) => {
  const { fullname, email, password, profileImg } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists)
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
  );

  // res.cookie("token", token);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(201).json({
    message: "User Registered Successfully",
    user,
    token,
  });
};

const controllerLogin = async (req, res) => {
  const { email, password } = req.body;

  const isValidUser = await userModel.findOne({ email });

  if (!isValidUser)
    return res.status(404).json({
      message: "User does not exists!",
    });

  const isValidPassword = await bcrypt.compare(password, isValidUser.password);

  if (!isValidPassword)
    return res.status(404).json({
      message: "Invalid User Credential!",
    });

  const token = jwt.sign(
    { id: isValidUser._id, email: isValidUser.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  // res.cookie("token", token);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).json({
    message: "User Login Successfully",
    user: {
      id: isValidUser._id,
      fullname: isValidUser.fullname,
      email: isValidUser.email,
    },
    token,
  });
};

const controllerGetMe = async (req, res) => {
  const userId = req.user.id;

  const user = await userModel.findById(userId);

  res.status(200).json({
    message: "User details fetched Successfully",
    user: {
      fullName: user.fullname,
      email: user.email,
      profileImg: user.profileImg,
    },
  });
};

module.exports = { controllerRegister, controllerLogin, controllerGetMe };
