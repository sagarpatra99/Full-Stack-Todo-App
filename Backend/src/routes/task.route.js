const express = require("express");
const controller = require("../controllers/task.controller");
const identifyUser = require("../middlewares/auth.middleware");
const taskRouter = express.Router();

taskRouter.post("/create-task", identifyUser, controller.controllerCreateTask);

module.exports = taskRouter;
