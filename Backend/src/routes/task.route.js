const express = require("express");
const controller = require("../controllers/task.controller");
const identifyUser = require("../middlewares/auth.middleware");
const taskRouter = express.Router();

taskRouter.post("/", identifyUser, controller.controllerCreateTask);
taskRouter.delete("/:taskId", identifyUser, controller.controllerDeleteTask);
taskRouter.get("/", identifyUser, controller.controllerGetTask);
taskRouter.patch("/:taskId", identifyUser, controller.controllerUpdateTask);

module.exports = taskRouter;
