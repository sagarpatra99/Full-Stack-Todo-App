const taskModel = require("../model/task.model");

const controllerCreateTask = async (req, res) => {
  try {
    const { title, description, dueDate, status } = req.body;

    const task = await taskModel.create({
      title,
      description,
      dueDate,
      status,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Task added Successfully.",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const controllerDeleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await taskModel.findOneAndDelete({
      _id: taskId,
      user: req.user.id,
    });

    if (!task)
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });

    res.status(200).json({
      success: true,
      message: "Task deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const controllerGetTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status } = req.query;

    const filter = { user: userId };

    if (status) {
      filter.status = status;
    }

    // const skip = (page - 1) * limit;

    const tasks = await taskModel
      .find(filter)
      .sort({ createdAt: -1 })
      // .skip(skip)
      // .limit(Number(limit));

    res.status(200).json({
      success: true,
      message: "Tasks fetched Successfully.",
      // page: Number(page),
      // limit: Number(limit),
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const controllerUpdateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const updates = req.body;

    const task = await taskModel.findOneAndUpdate(
      {
        _id: taskId,
        user: req.user.id,
      },
      updates,
      {
        new: true,
      },
    );

    if (!task)
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });

    res.status(200).json({
      success: true,
      message: "Task updated Successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = {
  controllerCreateTask,
  controllerDeleteTask,
  controllerGetTask,
  controllerUpdateTask,
};
