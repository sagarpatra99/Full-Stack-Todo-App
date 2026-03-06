const taskModel = require("../model/task.model");

const controllerCreateTask = async (req, res) => {
  const { title, description, dueDate, status } = req.body;

  const task = await taskModel.create({
    title: title,
    description: description,
    dueDate: dueDate,
    status: status,
  });

  res.status(201).json({
    message: "Task added Successfully.",
    task,
  });
};

module.exports = { controllerCreateTask };
