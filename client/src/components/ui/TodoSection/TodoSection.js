"use client";

import React, { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (storedUserDetails?.id) {
      setUserId(storedUserDetails.id);
    } else {
      console.error("User ID not found in local storage");
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchTasks = async () => {
        try {
          const response = await fetch(`https://project-jarvis-two.vercel.app/tasks?userId=${userId}`);
          if (!response.ok) throw new Error("Failed to fetch tasks");
          const data = await response.json();
          setTasks(data);
        } catch (error) {
          console.error("Error fetching tasks:", error.message);
        }
      };
      fetchTasks();
    }
  }, [userId]);

  const addTask = async () => {
    if (!task.trim()) {
      setError("Task cannot be empty!");
      return;
    }

    if (!userId) {
      setError("User ID is missing.");
      return;
    }

    const newTaskData = {
      userId,
      text: task,
      date: today,
    };

    try {
      const response = await fetch("https://project-jarvis-two.vercel.app/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTaskData),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      const newTask = await response.json();
      setTasks([...tasks, newTask]);
      setTask("");
      setError("");
    } catch (error) {
      console.error("Error adding task:", error.message);
      setError("Failed to add task. Please try again.");
    }
  };

  const toggleCompleted = async (taskId, currentStatus) => {
    try {
      const response = await fetch(`https://project-jarvis-two.vercel.app/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !currentStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task status");
      }

      const updatedTask = await response.json();
      setTasks(
        tasks.map((task) =>
          task._id === taskId ? { ...task, completed: updatedTask.completed } : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error.message);
    }
  };

  const removeTask = async (taskId) => {
    try {
      const response = await fetch(`https://project-jarvis-two.vercel.app/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error removing task:", error.message);
    }
  };

  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  const pieData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [completedTasks, pendingTasks],
        backgroundColor: ["#4caf50", "#f44336"],
        hoverBackgroundColor: ["#45a047", "#e53935"],
      },
    ],
  };

  const barData = {
    labels: ["Tasks"],
    datasets: [
      {
        label: "Completed",
        data: [completedTasks],
        backgroundColor: "#4caf50",
      },
      {
        label: "Pending",
        data: [pendingTasks],
        backgroundColor: "#f44336",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-200 p-4 sm:p-8">
      <div className="max-w-3xl lg:max-w-5xl mx-auto shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 bg-gray-700 text-white">
          <h1 className="text-2xl sm:text-3xl font-bold">To-Do List</h1>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Task list section */}
          <div className="flex flex-col bg-gray-900 p-4 sm:p-6 rounded-lg shadow-md min-h-[400px]">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Your To-Do List</h2>
            <ul className="space-y-4 overflow-y-auto max-h-[300px] sm:max-h-[400px]">
              {tasks.length > 0 ? (
                tasks.map((t) => (
                  <li
                    key={t._id}
                    className={`p-4 rounded shadow-sm flex flex-col gap-4 ${
                      t.completed ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    <div className="text-sm sm:text-base font-medium break-words">
                      {t.text}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => toggleCompleted(t._id, t.completed)}
                        className={`py-2 px-4 rounded text-sm sm:text-base ${
                          t.completed ? "bg-green-800 text-white" : "bg-gray-800 text-white"
                        }`}
                      >
                        {t.completed ? "Completed" : "Mark Complete"}
                      </button>
                      <button
                        onClick={() => removeTask(t._id)}
                        className="py-2 px-4 rounded bg-red-800 text-white text-sm sm:text-base"
                      >
                        Remove
                      </button>
                    </div>
                    <span className="text-xs text-gray-300">
                      Added on: {new Date(t.date).toLocaleDateString()}
                    </span>
                  </li>
                ))
              ) : (
                <p className="text-gray-400">No tasks available. Add one!</p>
              )}
            </ul>
          </div>

          {/* Add task section */}
          <div className="flex flex-col bg-gray-900 p-4 sm:p-6 rounded-lg shadow-md min-h-[400px]">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Add a New Task</h2>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter task details"
                className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white text-sm sm:text-base"
              />
              <button
                onClick={addTask}
                className="bg-blue-600 text-white py-2 sm:py-3 rounded hover:bg-blue-700 text-sm sm:text-base"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>

        {/* Task Statistics Section */}
        <div className="p-6 bg-gray-900 rounded-lg shadow-md mt-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Task Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pie Chart Section */}
            <div className="flex flex-col items-center">
              <div className="w-full md:w-48 lg:w-64">
                <Pie
                  data={pieData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                      legend: {
                        position: "bottom",
                        labels: {
                          usePointStyle: true,
                          font: {
                            size: 12,
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
              <p className="text-gray-300 mt-2 text-center text-sm">
                Completed: {completedTasks} | Pending: {pendingTasks}
              </p>
            </div>

            {/* Bar Chart Section */}
            <div className="w-full">
              <Bar
                data={barData}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    tooltip: {
                      callbacks: {
                        label: function (tooltipItem) {
                          return tooltipItem.raw;
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
