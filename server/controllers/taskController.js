const Task = require("../models/Task");

// Create a new task
exports.createTask = async (req, res) => {
  try {
    if (!req.body.title || req.body.title.trim().length < 3) {
      return res
        .status(400)
        .json({ error: "Task title must be at least 3 characters long." });
    }

    const task = await Task.create({ title: req.body.title.trim() });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to create task. " + err.message });
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 }); // Sort by latest
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks. " + err.message });
  }
};

// Update a task (title or completion status)
exports.updateTask = async (req, res) => {
  try {
    const { title, completed } = req.body;
    const updatedData = {};

    if (title) updatedData.title = title.trim();
    if (completed !== undefined) updatedData.completed = completed;

    const task = await Task.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to update task. " + err.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully", task });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task. " + err.message });
  }
};
