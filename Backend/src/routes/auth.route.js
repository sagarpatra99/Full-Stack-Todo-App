const express = require("express");
const authRoutes = express.Router();
const controller = require("../controllers/auth.controller");
const identifyUser = require("../middlewares/auth.middleware");

authRoutes.post("/register", controller.controllerRegister);
// authRoutes.get("/verify-email", controller.controllerVerifyEmail);
authRoutes.post("/login", controller.controllerLogin);
authRoutes.get("/get-me", identifyUser, controller.controllerGetMe);
authRoutes.post("/logout", identifyUser, controller.controllerLogoutUser);

module.exports = authRoutes;
