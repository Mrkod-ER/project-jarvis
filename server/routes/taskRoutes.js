// server/routes/taskRoutes.js

const express = require("express");
const Task = require("../models/taskModel");

const router = express.Router();

// Fetch tasks for a specific user
router.get("/tasks", async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }
  try {
    const tasks = await Task.find({ userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks", details: err.message });
  }
});

// Add a new task
router.post("/tasks", async (req, res) => {
  const { userId, text, date } = req.body;

  if (!userId || !text || !date) {
    return res.status(400).json({ error: "Missing fields: userId, text, or date" });
  }

  try {
    const newTask = new Task({ userId, text, date });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to add task", details: error.message });
  }
});

// Update a task's completion status
router.patch("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, { completed }, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

// Delete a task by ID
router.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

module.exports = router;
