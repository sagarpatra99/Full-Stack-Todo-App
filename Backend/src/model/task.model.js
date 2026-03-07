const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "description is required"],
      trim: true,
    },
    dueDate: {
      type: Date,
      required: [true, "dueDate is required"],
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    user: {
      ref: "user",
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "user id is required for creating an task"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Task", taskSchema);
