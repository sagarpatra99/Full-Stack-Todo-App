const jwt = require("jsonwebtoken");
const blacklistModel = require("../model/blacklist.model")

const identifyUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token)
    return res.status(401).json({
      message: "Token not provided, Unauthorized access!",
    });

  try {
    const isBlacklisted = await blacklistModel.findOne({token});

    if(isBlacklisted) return res.status(401).json({
      message: "Token is invalid. Please login again."
    })

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "User not Authorized!",
    });
  }
};

module.exports = identifyUser;
