const taskModel = require("../model/task.model");

const controllerCreateTask = async (req, res) => {
  const { title, description, dueDate, status } = req.body;

  const task = await taskModel.create({
    title: title,
    description: description,
    dueDate: dueDate,
    status: status,
    user: req.user.id,
  });

  res.status(201).json({
    message: "Task added Successfully.",
    task,
  });
};

const controllerDeleteTask = async (req, res) => {
  const { taskId } = req.params;

  const task = await taskModel.findOneAndDelete({
    _id: taskId,
    user: req.user.id,
  });

  if (!task)
    return res.status(401).json({
      message: "Task not found",
    });

  res.status(201).json({
    message: "Task deleted Successfully",
    task,
  });
};

module.exports = { controllerCreateTask, controllerDeleteTask };
