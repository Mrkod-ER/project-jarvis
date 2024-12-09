import React from "react";
import { FaHeart, FaBullseye, FaClipboardList, FaRegCalendarAlt } from 'react-icons/fa';

const Features = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4 bg-gray-900 py-8 px-4">
      {/* Routine Management Card */}
      <div className="bg-yellow-300 flex-1 h-80 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 relative flex flex-col justify-center text-center">
        <div className="flex items-center space-x-4">
          <div className="bg-white p-4 rounded-full">
            <FaRegCalendarAlt className="text-yellow-500 text-4xl" />
          </div>
          <h3 className="text-4xl font-bold text-gray-800">Routine Management</h3>
        </div>
        <div className="mt-4">
          <p className="text-gray-700 text-lg">Track your daily routine efficiently with our intuitive interface.</p>
        </div>
      </div>

      {/* Health Tracker Card */}
      <div className="bg-green-300 flex-1 h-80 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 relative flex flex-col justify-center text-center">
        <div className="flex items-center space-x-4">
          <div className="bg-white p-4 rounded-full">
            <FaHeart className="text-red-500 text-4xl" />
          </div>
          <h3 className="text-4xl font-bold text-gray-800">Health Tracker ...next update</h3>
        </div>
        <div className="mt-4">
          <p className="text-gray-700 text-lg">Monitor your health and fitness goals with detailed insights.</p>
        </div>
      </div>

      {/* Goals Tracker Card */}
      <div className="bg-blue-300 flex-1 h-80 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 relative flex flex-col justify-center text-center">
        <div className="flex items-center space-x-4">
          <div className="bg-white p-4 rounded-full">
            <FaBullseye className="text-blue-500 text-4xl" />
          </div>
          <h3 className="text-4xl font-bold text-gray-800">Goals Tracker ...next update</h3>
        </div>
        <div className="mt-4">
          <p className="text-gray-700 text-lg">Set, track, and achieve your goals with our powerful tools.</p>
        </div>
      </div>

      {/* To-Do List Card */}
      <div className="bg-pink-300 flex-1 h-80 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 relative flex flex-col justify-center text-center">
        <div className="flex items-center space-x-4">
          <div className="bg-white p-4 rounded-full">
            <FaClipboardList className="text-pink-500 text-4xl" />
          </div>
          <h3 className="text-4xl font-bold text-gray-800">To-Do List</h3>
        </div>
        <div className="mt-4">
          <p className="text-gray-700 text-lg">Keep track of your tasks and to-dos in a user-friendly manner.</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
