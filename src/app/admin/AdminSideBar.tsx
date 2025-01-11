'use client'
import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS

import {
  FaTachometerAlt,
  FaTasks,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const AdminSideBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isTasksOpen, setIsTasksOpen] = useState(false); // Added this line to manage task dropdown visibility

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div
      className={`${
        isMenuOpen ? "w-64" : "w-20"
      } h-screen bg-gray-800 text-white flex flex-col transition-all duration-300`}
    >
      {/* Navigation Links */}
      <nav className="flex flex-col mt-4 space-y-2 px-2">
        <a
          href="/dashboard"
          className="flex items-center px-4 py-2 hover:bg-gray-700 rounded"
          data-aos="fade-right"
        >
          <FaTachometerAlt className="w-5 h-5" />
          {isMenuOpen && <span className="ml-4">Dashboard</span>}
        </a>

        {/* Tasks Section */}
        <div>
          <button
            className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-700 rounded"
            onClick={() => setIsTasksOpen(!isTasksOpen)} // Toggle the task section visibility
            data-aos="fade-right"
          >
            <div className="flex items-center">
              <FaTasks className="w-5 h-5" />
              {isMenuOpen && <span className="ml-4">Tasks</span>}
            </div>
            {isMenuOpen && (
              <div>{isTasksOpen ? <FaChevronUp /> : <FaChevronDown />}</div>
            )}
          </button>
          {isTasksOpen && (
            <ul className="ml-8 list-disc space-y-2" data-aos="fade-right" data-aos-delay="200">
              <li className="p-2 rounded-lg bg-blue-500 text-white">
                <span className="font-semibold">Total Tasks:</span> 120
              </li>
              <li className="p-2 rounded-lg bg-green-500 text-white">
                <span className="font-semibold">Tasks Completed:</span> 90
              </li>
              <li className="p-2 rounded-lg bg-yellow-500 text-white">
                <span className="font-semibold">Pending Tasks:</span> 30
              </li>
              <li className="p-2 rounded-lg bg-red-500 text-white">
                <span className="font-semibold">Overdue Tasks:</span> 5
              </li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
};

export default AdminSideBar;
