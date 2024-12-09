require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Use environment variable for MongoDB URI
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("MongoDB URI not provided in environment variables");
  process.exit(1); // Exit if the URI is not found
}

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

// Task Schema and Model (Existing Task Model)
const taskSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const Task = mongoose.model("Task", taskSchema);

// Routine Schema and Model (New Routine Model)
const routineSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  day: { type: String, required: true },
  tasks: [
    {
      time: { type: String, required: true },
      text: { type: String, required: true },
      completed: { type: Boolean, default: false },
    },
  ],
});

const Routine = mongoose.model("Routine", routineSchema);

// Routes

// Fetch tasks for a specific user (Existing Route)
app.get("/tasks", async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }
  try {
    const tasks = await Task.find({ userId });
    res.json(tasks);
  } catch (err) {
    console.error("Error in GET /tasks:", err);
    res.status(500).json({ error: "Failed to fetch tasks", details: err.message });
  }
});

// Add a new task (Existing Route)
app.post("/tasks", async (req, res) => {
  const { userId, text, date } = req.body;

  if (!userId || !text || !date) {
    return res.status(400).json({ error: "Missing fields: userId, text, or date" });
  }

  try {
    const newTask = new Task({ userId, text, date });
    await newTask.save();
    console.log("New task added:", newTask);
    return res.status(201).json(newTask);
  } catch (error) {
    console.error("Error in POST /tasks:", error);
    return res.status(500).json({ error: "Failed to add task", details: error.message });
  }
});

// Update task completion status (Existing Route)
app.patch("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { completed },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(updatedTask);
  } catch (error) {
    console.error("Error in PATCH /tasks/:id:", error);
    res.status(500).json({ error: "Failed to update task", details: error.message });
  }
});

// Delete task (Existing Route)
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error in DELETE /tasks/:id:", error);
    res.status(500).json({ error: "Failed to delete task", details: error.message });
  }
});


// Fetch routines by userId
app.get('/routine', async (req, res) => {
  const { userId } = req.query;

  try {
    const routines = await Routine.find({ userId });
    res.json(routines);
  } catch (error) {
    console.error('Error fetching routines:', error);
    res.status(500).json({ error: 'Error fetching routines' });
  }
});

// Add or update a routine
app.post('/routine', async (req, res) => {
  const { userId, day, tasks } = req.body;
  console.log('Received data:', req.body);

  try {
    let routine = await Routine.findOne({ userId, day });

    if (routine) {
      // Update existing routine
      routine.tasks = tasks;
      await routine.save();
    } else {
      // Create new routine
      routine = new Routine({ userId, day, tasks });
      await routine.save();
    }

    res.status(201).json(routine);
  } catch (error) {
    console.error('Error saving routine:', error);
    res.status(500).json({ error: 'Error saving routine' });
  }
});


app.patch('/routine/:id', async (req, res) => {
  const { id } = req.params;
  const { tasks } = req.body;

  try {
    const routine = await Routine.findById(id);

    if (!routine) {
      return res.status(404).json({ error: 'Routine not found' });
    }

    routine.tasks = tasks;
    await routine.save();

    res.json(routine);
  } catch (error) {
    console.error('Error updating routine:', error);
    res.status(500).json({ error: 'Error updating routine' });
  }
});

app.delete('/deleteRoutine/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find the routine by ID and delete it
    const result = await Routine.findByIdAndDelete(id);

    // If no routine found
    if (!result) {
      return res.status(404).json({ message: 'Routine not found' });
    }

    res.status(200).json({ message: 'Routine deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, try again later' });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
