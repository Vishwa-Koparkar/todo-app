const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt fields
  },
);

// Create an index for better performance when querying tasks
TaskSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Task", TaskSchema);
