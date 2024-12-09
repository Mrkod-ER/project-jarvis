'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const RoutineCalendar = () => {
  const [task, setTask] = useState('');
  const [time, setTime] = useState('');
  const [day, setDay] = useState('Monday');
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Retrieve userDetails from localStorage and extract userId
    const userDetails = localStorage.getItem('userDetails');
    if (userDetails) {
      const parsedDetails = JSON.parse(userDetails);
      if (parsedDetails && parsedDetails.id) {
        setUserId(parsedDetails.id);
        fetchRoutine(parsedDetails.id);
      } else {
        console.error('userId not found in userDetails');
      }
    } else {
      console.error('userDetails not found in localStorage');
    }
  }, []);

  const fetchRoutine = async (userId) => {
    try {
      const response = await axios.get(`https://project-jarvis-two.vercel.app/routine`, {
        params: { userId },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching routine:', error);
    }
  };

  const handleTaskSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      console.error('User ID is missing. Cannot add task.');
      return;
    }

    if (!task || !time) {
      console.error('Task or time is missing. Please fill in all fields.');
      return;
    }

    const newTask = { time, text: task, completed: false };
    let dayRoutine = tasks.find((t) => t.day === day);

    if (dayRoutine) {
      dayRoutine.tasks.push(newTask);
    } else {
      dayRoutine = { day, tasks: [newTask] };
      tasks.push(dayRoutine);
    }

    try {
      const response = await axios.post(`https://project-jarvis-two.vercel.app/routine`, {
        userId,
        day,
        tasks: [newTask],
      });

      console.log('Task successfully added:', response.data);
      setTasks([...tasks]);
      setTask('');
      setTime('');
    } catch (error) {
      console.error(
        'Error saving task:',
        error.response?.data || error.message || error
      );
    }
  };

  const handleDeleteTask = async (taskIndex, day) => {
    const dayRoutine = tasks.find((t) => t.day === day);

    if (!dayRoutine || !dayRoutine._id) {
      console.error('Routine for this day not found.');
      return;
    }

    const updatedTasks = tasks.map((t) => {
      if (t.day === day) {
        return {
          ...t,
          tasks: t.tasks.filter((_, index) => index !== taskIndex),
        };
      }
      return t;
    });

    try {
      await axios.patch(`https://project-jarvis-two.vercel.app/routine/${dayRoutine._id}`, {
        tasks: updatedTasks.find((t) => t.day === day)?.tasks || [],
      });
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-semibold mb-6 text-center">Your Daily Routine</h2>

      <form onSubmit={handleTaskSubmit} className="space-y-4 mb-8 w-full max-w-4xl px-6">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-32 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
          />
          <select
            onChange={(e) => setDay(e.target.value)}
            value={day}
            className="w-32 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
          >
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Task
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl px-6">
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((dayOfWeek) => (
          <div key={dayOfWeek} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-100 mb-2">{dayOfWeek}</h3>
            <ul className="space-y-2">
              {tasks
                .filter((task) => task.day === dayOfWeek)
                .flatMap((task) => task.tasks)
                .map((task, idx) => (
                  <li key={idx} className="flex justify-between items-center">
                    <span>
                      {task.time} - {task.text}
                    </span>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteTask(idx, dayOfWeek)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoutineCalendar;
