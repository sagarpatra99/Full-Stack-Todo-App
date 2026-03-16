const jwt = require("jsonwebtoken");
const redis = require("../config/cache");

const identifyUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token)
    return res.status(401).json({
      message: "Token not provided, Unauthorized access!",
    });

  try {
    const isBlacklisted = await redis.get(token);

    if (isBlacklisted)
      return res.status(401).json({
        message: "Invalid token",
      });

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
